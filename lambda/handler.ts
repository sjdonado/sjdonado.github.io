import { getData, writeData } from './services/firebase';
import { LinkedinPost, Scraper, VscoPicture } from './scraper';

export interface Section {
  id: string;
  title: string;
  type: string;
  items: LinkedinPost[] | VscoPicture[];
}

export const run = async () => {
  try {
    const {
      config: { sitesUsername, sessionCookieValue },
      site: { sections },
    } = await getData('public');

    const scraper = new Scraper({
      sitesUsername,
      sessionCookieValue,
    });

    const linkedinSection = sections.find((section: Section) => section.id === 'linkedin-posts');
    const vscoSection = sections.find((section: Section) => section.id === 'vsco-pictures');

    await scraper.openBrowser();

    const linkedinPosts = await scraper.fetchLinkedinPosts();
    const vscoPictures = await scraper.fetchVscoPictures();

    await scraper.closeBrowser();

    Object.assign(linkedinSection, { ...linkedinSection, items: linkedinPosts });
    Object.assign(vscoSection, { ...vscoSection, items: vscoPictures });

    await writeData('public/site/sections', sections);
  } catch (err) {
    console.error(err);
  }
};
