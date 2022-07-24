/* eslint-disable no-plusplus */
/* eslint-disable no-undef */

export const getPosts = async (page) => {
  const linkedinPosts = await page.evaluate(async () => {
    const posts = Array.from(document.querySelectorAll('.feed-shared-update-v2'));
    let iframes = 0;

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

    const getMedia = (post) => {
      const media = {
        image: post.querySelector('.feed-shared-image img')?.src,
        celebration: post.querySelector('.feed-shared-celebration img')?.src,
        article: post.querySelector('.feed-shared-article a')?.href,
        video: post.querySelector('.feed-shared-linkedin-video__container video')?.src,
        document: post.querySelector('.feed-shared-document__container iframe')?.contentWindow ? iframes++ : null,
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
      media: getMedia(post),
      link: await getLinkPost(post),
    })));

    return data;
  });

  return linkedinPosts;
};

export const getIframeImage = async (iframe) => {
  const img = await iframe.evaluate(() => document.querySelector('img')?.src);

  return img;
};
