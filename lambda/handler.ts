import { getData, writeData } from './services/firebase';
import { Scraper } from './scraper';

// eslint-disable-next-line import/prefer-default-export
export const run = async () => {
  try {
    const { sitesUsername, sessionCookieValue } = await getData('public/config');

    const scraper = new Scraper({
      sitesUsername,
      sessionCookieValue,
    });

    const linkedinPosts = await scraper.fetchLinkedinPosts();

    console.log(linkedinPosts);

    await writeData('public/linkedinPosts', linkedinPosts);
  } catch (err) {
    console.log(err);
  }
};
