/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */

export const getPosts = async (page) => {
  const linkedinPosts = await page.evaluate(async () => {
    const posts = Array.from(document.querySelectorAll('.feed-shared-update-v2'));

    const waitForElm = (selector) => new Promise((resolve) => {
      if (document.querySelector(selector)) {
        resolve();
      }

      const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });

    const toDataURL = (url) => new Promise((res) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          res(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });

    const getMedia = async (post) => {
      const imageSelector = post.querySelector('.feed-shared-image img');
      const celebrationSelector = post.querySelector('.feed-shared-celebration img');
      const articleSelector = post.querySelector('.feed-shared-article a');
      const videoSelector = post.querySelector('.feed-shared-linkedin-video__container video');
      const documentSelector = post.querySelector('.feed-shared-document__container iframe');

      const media = {
        image: imageSelector ? await toDataURL(imageSelector.src) : null,
        celebration: celebrationSelector ? await toDataURL(celebrationSelector.src) : null,
        article: articleSelector?.href,
        video: videoSelector ? await toDataURL(videoSelector.src) : null,
        // TODO: get real preview (iframe context bloqued)
        document: documentSelector?.contentWindow ? await toDataURL('https://images.credly.com/size/680x680/images/efbdc0d6-b46e-4e3c-8cf8-2314d8a5b971/GCC_badge_python_1000x1000.png') : null,
      };

      return Object.entries(media).map(([type, data]) => ({
        type,
        data,
      })).find((obj) => obj.data != null);
    };

    const getLinkPost = async (post) => {
      post.querySelector('.feed-shared-control-menu button')?.click();

      await waitForElm(`#${post.id} .option-share-via div`);
      post.querySelector('.option-share-via div')?.click();

      return document.querySelector('.artdeco-toasts_toasts a')?.href;
    };

    const data = await Promise.all(posts.map(async (post) => ({
      date: post.querySelector('span > span.visually-hidden').textContent,
      content: post.querySelector('.break-words')?.textContent.trim(),
      media: await getMedia(post),
      link: await getLinkPost(post),
    })));

    return data;
  });

  return linkedinPosts;
};
