import puppeteer, { Browser, Page } from 'puppeteer';
import { getLinkPreview } from 'link-preview-js';

import { getChrome } from '../chrome-script';

import { getPosts } from './pages/linkedin';
import { getPictures } from './pages/vsco';

interface LinkPreview {
  title: string;
  description: string;
  images: string[];
}

export interface ScraperUserDefinedOptions {
  sitesUsername: string;
  sessionCookieValue: string;
  timeout?: number;
}

interface ScraperOptions {
  sitesUsername: string;
  sessionCookieValue: string;
  userAgent: string;
  timeout: number;
}

interface LinkedinPostMedia {
  type: string;
  data: string;
}

export interface LinkedinPost {
  date: string;
  content: string;
  media: LinkedinPostMedia;
  link: string;
}

export interface VscoPicture {
  url: string;
  date: number;
  share: string;
}

export class Scraper {
  private browser: Browser | null = null;

  private page: Page | null = null;

  readonly options: ScraperOptions = {
    sitesUsername: '',
    sessionCookieValue: '',
    timeout: 10000,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
  };

  constructor(userDefinedOptions: ScraperUserDefinedOptions) {
    this.options = Object.assign(this.options, userDefinedOptions);
  }

  public async openBrowser() {
    const { endpoint } = await getChrome();

    this.browser = await puppeteer.connect({
      browserWSEndpoint: endpoint,
    });
  }

  public async closeBrowser() {
    this.browser?.close();
  }

  private async createPage(): Promise<Page> {
    if (!this.browser) {
      throw new Error('Browser not set');
    }

    if (this.page) {
      return this.page;
    }

    this.page = await this.browser.newPage();

    const firstPage = (await this.browser.pages())[0];
    await firstPage.close();

    const blockedResources = ['media', 'font', 'texttrack', 'object', 'beacon', 'csp_report', 'imageset'];

    await this.page.setRequestInterception(true);

    this.page.on('request', (req) => {
      if (blockedResources.includes(req.resourceType())) {
        return req.abort();
      }

      return req.continue();
    });

    await this.page.setUserAgent(this.options.userAgent);

    await this.page.setViewport({ width: 1920, height: 1080 });

    return this.page;
  }

  public async fetchLinkedinPosts() {
    const URL = `https://www.linkedin.com/in/${this.options.sitesUsername}/recent-activity/shares/`;

    const page = await this.createPage();

    await page.setCookie({
      name: 'li_at',
      value: this.options.sessionCookieValue,
      domain: '.www.linkedin.com',
    });

    await page.goto(URL);

    const linkedinPosts = await getPosts(page) as LinkedinPost[];

    const articlePostsIndexes = linkedinPosts.reduce((acc: number[], obj: LinkedinPost, idx) => {
      if (obj.media.type === 'article') {
        acc.push(idx);
      }
      return acc;
    }, []);

    await Promise.all(articlePostsIndexes.map(async (postIdx) => {
      const { data: url } = linkedinPosts[postIdx].media;

      const { title, description, images: [image] } = (
        await getLinkPreview(url, { followRedirects: 'follow' })
      ) as LinkPreview;

      Object.assign(linkedinPosts[postIdx].media, {
        type: 'article',
        data: {
          title,
          description,
          image,
          url,
        },
      });
    }));

    return linkedinPosts;
  }

  public async fetchVscoPictures() {
    const URL = `https://vsco.co/${this.options.sitesUsername}/gallery`;

    const page = await this.createPage();

    await page.goto(URL);

    const vscoPictures = await getPictures(page) as VscoPicture[];

    return vscoPictures;
  }
}
