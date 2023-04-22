package main

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path"
	"time"

	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing/object"

	"github.com/imroc/req/v3"

	"github.com/PuerkitoBio/goquery"
)

var (
  devtoApiKey = os.Getenv("DEVTO_API_KEY")
  gitRemoteUrl = os.Getenv("GIT_REMOTE_URL")
)

type DevtoResponse struct {
  Title       string `json:"title"`
  Url         string `json:"url"`
}

type DevtoError struct {
  Error       string `json:"error"`
}

type DevtoMetaData struct {
  Image       string `json:"image"`
}

type DevtoArticleItem struct {
  Title       string `json:"title"`
  Link        string `json:"link"`
  ImageURL    string `json:"imageURL"`
}

type DevtoArticles struct {
  Id          string `json:"id"`
  Title       string `json:"title"`
  Type        string `json:"type"`
  Items       []DevtoArticleItem `json:"items"`
}

func FetchMetaTags(url string) (DevtoMetaData, error) {
  var metaData DevtoMetaData

	response, err := http.Get(url)
	if err != nil {
		log.Fatal("Failed to fetch webpage:", err)
		return metaData, err
	}
	defer response.Body.Close()

	doc, err := goquery.NewDocumentFromReader(response.Body)
	if err != nil {
		log.Fatal("Failed to parse HTML:", err)
		return metaData, err
	}

	metaData.Image = doc.Find("meta[property='og:image']").First().AttrOr("content", "")

  return metaData, nil
}

func FetchPublishedArticles() ([]DevtoResponse, error) {
  var (
    articles []DevtoResponse
    errMsg DevtoError
  )

  client := req.C()

  resp, err := client.R().
    SetHeader("Accept", "application/json").
    SetHeader("api-key", devtoApiKey).
    SetSuccessResult(&articles).
    SetErrorResult(&errMsg).
    EnableDump().
    Get("https://dev.to/api/articles/me/published")

  if err != nil {
    return articles, err
  }

  if resp.IsErrorState() { // Status code >= 400.
    return articles, errors.New(errMsg.Error)
  }

  return articles, nil
}

func UpdateAndPushArticlesToGitRepo(devtoArticleItems []DevtoArticleItem) error {
  repoPath := "/tmp/repo"
  devtoArticlesJsonPath := "src/data/sections/devto-articles.json"
  devtoArticlesJsonAbsPath := path.Join(repoPath, devtoArticlesJsonPath)

  r, err := git.PlainClone(repoPath, false, &git.CloneOptions{
    URL:      gitRemoteUrl,
    Depth:    1,
    Progress: os.Stdout,
  })
  if err != nil {
    return err
  }

  data, err := ioutil.ReadFile(devtoArticlesJsonAbsPath)
	if err != nil {
    return err
	}

  devtoArticles := &DevtoArticles{}
  err = json.Unmarshal(data, &devtoArticles)
	if err != nil {
    return err
	}

  devtoArticles.Items = devtoArticleItems

  devtoArticlesJson, err := json.MarshalIndent(devtoArticles, "", "  ")
  if err != nil {
    log.Fatalf("Failed to marshal JSON: %v", err)
  }

  err = ioutil.WriteFile(devtoArticlesJsonAbsPath, devtoArticlesJson, 0664)
  if err != nil {
    return err
  }

  worktree, err := r.Worktree()
  if err != nil {
    return err
  }

  _, err = worktree.Add(devtoArticlesJsonPath)
  if err != nil {
    return err
  }

  _, err = worktree.Commit("[auto] chore: Update dev.to articles", &git.CommitOptions{
    Author: &object.Signature{
      Name: "Scraping Bot",
      Email: "sjdonado@uninorte.edu.co",
      When:  time.Now(),
    },
  })
  if err != nil {
    return err
  }

  err = r.Push(&git.PushOptions{ Progress: os.Stdout })
  if err != nil {
    return err
  }

  return nil
}

func FetchAndUpdateArticlesPreviews(w http.ResponseWriter, r *http.Request) {
  articles, err := FetchPublishedArticles()
  if err != nil {
    log.Fatalf("Failed to fetch published articles: %v", err)
  }

  var articlesPreviews[] DevtoArticleItem

  for _, article := range articles {
    metaData, err := FetchMetaTags(article.Url)
    if err != nil {
      log.Fatalf("Failed to fetch HTML meta tags for article '%s': %v", article.Url, err)
    }

    articlesPreviews = append(articlesPreviews, DevtoArticleItem{
      Title: article.Title,
      Link: article.Url,
      ImageURL: metaData.Image,
    })
  }

  err = UpdateAndPushArticlesToGitRepo(articlesPreviews)
  if err != nil {
    log.Fatalf("Failed to push articles to git repo: %v", err)
  }

  w.WriteHeader(http.StatusOK)
  w.Write([]byte("Successfully updated dev.to articles previews."))
}

func main() {
  http.HandleFunc("/", FetchAndUpdateArticlesPreviews)

  go func() {
		log.Fatal(http.ListenAndServe(":8080", nil))
	}()

	log.Println("Server is up and running on :8080")

	// Keep the main goroutine alive
	select {}
}
