import puppeteer, { Browser, Page } from 'puppeteer';

import { getChrome } from '../chrome-script';
import { getPosts, getIframeImage } from './pages/linkedin';

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

interface LinkedinPost {
  date: string;
  content: string;
  media: LinkedinPostMedia
  link: string;
}

export class Scraper {
  private browser: Browser | null = null;

  readonly options: ScraperOptions = {
    sitesUsername: '',
    sessionCookieValue: '',
    timeout: 10000,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
  };

  constructor(userDefinedOptions: ScraperUserDefinedOptions) {
    this.options = Object.assign(this.options, userDefinedOptions);
  }

  private async openBrowser() {
    const { endpoint } = await getChrome();

    this.browser = await puppeteer.connect({
      browserWSEndpoint: endpoint,
    });
  }

  private async closeBrowser() {
    this.browser?.close();
  }

  private async createPage(): Promise<Page> {
    if (!this.browser) {
      throw new Error('Browser not set');
    }

    const page = await this.browser.newPage();

    const firstPage = (await this.browser.pages())[0];
    await firstPage.close();

    const blockedResources = ['image', 'media', 'font', 'texttrack', 'object', 'beacon', 'csp_report', 'imageset'];

    await page.setRequestInterception(true);

    page.on('request', (req) => {
      if (blockedResources.includes(req.resourceType())) {
        return req.abort();
      }

      return req.continue();
    });

    await page.setUserAgent(this.options.userAgent);

    return page;
  }

  public async fetchLinkedinPosts() {
    await this.openBrowser();

    const URL = `https://www.linkedin.com/in/${this.options.sitesUsername}/recent-activity/shares/`;

    const page = await this.createPage();

    await page.setCookie({
      name: 'li_at',
      value: this.options.sessionCookieValue,
      domain: '.www.linkedin.com',
    });

    await page.goto(URL);

    const linkedinPosts = await getPosts(page) as LinkedinPost[];

    await Promise.all(linkedinPosts.filter(({ media }) => media.type === 'document').map(async (post) => {
      const iframe = page.frames()[post.media.data + 1];

      const img = await getIframeImage(iframe);

      Object.assign(post.media, { type: post.media.type, data: img });
    }));

    await this.closeBrowser();

    return linkedinPosts;
  }
}
