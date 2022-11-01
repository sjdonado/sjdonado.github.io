/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */

import * as cheerio from 'cheerio';

const fetchPreviewsFromIframes = async (page) => {
  const iframes = await page.$$('iframe');

  await Promise.all(iframes.map(async (iframe) => {
    const frame = await iframe.contentFrame();
    if (!frame) return;

    const context = await frame.executionContext();
    const outerHTML = await context.evaluate(() => document.querySelector('*')?.outerHTML);
    if (!outerHTML) return;

    const $ = cheerio.load(outerHTML);
    const imgSrc = $('.carousel-track img').attr('data-src');

    await iframe.evaluate((el, preview) => { el.setAttribute('data-preview', preview); }, imgSrc);
  }));
};

export const getPosts = async (page) => {
  await fetchPreviewsFromIframes(page);

  const linkedinPosts = await page.evaluate(async () => {
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
      const media = {
        image: (selector) => toDataURL(selector.src),
        celebration: (selector) => toDataURL(selector.src),
        article: (selector) => selector.href,
        video: (selector) => toDataURL(selector.src),
        document: (selector) => toDataURL(selector.dataset.preview),
      };

      const { type, selector } = [
        { type: 'image', selector: post.querySelector('.update-components-image img') },
        { type: 'celebration', selector: post.querySelector('.feed-shared-celebration img') },
        { type: 'article', selector: post.querySelector('.feed-shared-article a') },
        { type: 'video', selector: post.querySelector('.update-components-linkedin-video video') },
        { type: 'document', selector: post.querySelector('.feed-shared-document__container iframe') },
      ].find((elem) => elem.selector !== null);

      return { type, data: await media[type](selector) };
    };

    const getLinkPost = async (post) => {
      post.querySelector('.feed-shared-control-menu button')?.click();

      await waitForElm(`#${post.id} .option-share-via div`);
      post.querySelector('.option-share-via div')?.click();

      return document.querySelector('.artdeco-toasts_toasts a')?.href;
    };

    const posts = Array.from(document.querySelectorAll('.feed-shared-update-v2'));

    const output = await Promise
      .allSettled(posts.map(async (post) => ({
        date: post.querySelector('span > span.visually-hidden').textContent,
        content: post.querySelector('.break-words')?.textContent.trim(),
        media: await getMedia(post),
        link: await getLinkPost(post),
      })));

    const data = output
      .filter(({ status, reason }) => {
        if (reason) {
          console.error(reason);
        }
        return status === 'fulfilled';
      })
      .map(({ value }) => value);

    return data;
  });

  return linkedinPosts;
};
