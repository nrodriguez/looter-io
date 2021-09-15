// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Page, Browser } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

export default class HeadlessBrowser {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  page: Page;
  browser: Browser;

  async setBrowser(): Promise<void> {
    puppeteer.use(StealthPlugin);

    const browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      ignoreDefaultArgs: ['--disable-extensions'],
      executablePath: '/usr/bin/google-chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    });

    this.browser = browser;
  }

  getBrowser(): Browser {
    return this.browser;
  }

  async getPage(): Promise<Page> {
    const page = await this.browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    return page;
  }
}
