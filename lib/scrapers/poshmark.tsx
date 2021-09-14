import HeadlessBrowser from '../headless-browser';
import { Mixin } from 'ts-mixer';
import { scrapedResult, Scraper } from '../scraper';
import { Page } from 'puppeteer';
import * as cheerio from 'cheerio';
import { SearchParams } from '../search';

export default class PoshmarkScraper extends Mixin(Scraper, HeadlessBrowser) {
  constructor() {
    super();
  }

  async scrape(searchParams: SearchParams): Promise<Array<scrapedResult>> {
    let browser;

    try {
      const headlessBrowser = new HeadlessBrowser();

      await headlessBrowser.setBrowser();

      browser = await headlessBrowser.getBrowser();

      const page = await headlessBrowser.getPage();

      await page.setDefaultNavigationTimeout(130000);

      const results = await this.search(page, searchParams);

      await browser.close();

      return results;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('ERRO', error);
      await browser.close();
      return [];
    }
  }

  async search(page: Page, searchParams: SearchParams): Promise<Array<any>> {
    const { page: searchPage, searchQuery } = searchParams;

    await page.goto(
      `https://poshmark.com/search?query=${searchQuery}&max_id=${searchPage}`
    );

    const pageData = await page.evaluate(() => {
      return {
        html: document.documentElement.innerHTML,
      };
    });

    const $ = cheerio.load(pageData.html);

    const elements = $('#content div.tile')
      .toArray()
      .map((item) => {
        const itemDetails = $(item).find('.item__details');
        const name = $(itemDetails).find('a.tile__title');
        const imgSrc =
          $(item).find('.card img').data('src') ||
          $(item).find('.card img').attr('src');

        return {
          url: `https://poshmark.com${$(name).attr('href')}`,
          photoUrl: imgSrc,
          name: $(name).text().trim(),
          price: $(itemDetails).find('span.p--t--1').text().trim(),
          originalPrice: $(itemDetails).find('span.p--l--1').text().trim(),
          merchant: 'Poshmark',
        };
      });

    return elements;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(page: Page): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  }

  // async login(page:Page): Promise<void>{
  //   try{
  //     await page.goto('https://poshmark.com/');
  //     console.log("PAGE LOADED");

  //     await page.bringToFront();
  //     await page.click('.header__login-signup a[data-et-name=intro_tap_login]');
  //     await page.waitForNavigation();

  //     const username = process.env.POSHMARK_USERNAME;
  //     const password = process.env.POSHMARK_PASSWORD;
  //     await page.type('#login_form_username_email', username);
  //     await page.type('#login_form_password', password);
  //     await page.click('#email-login-form > form > div.form__actions.br--none.p--t--0.jc--sb > button[data-et-name=login]');

  //     console.log("CAPTCHA CHECK");
  //     //Check for captcha
  //     await this.checkCaptcha(page);

  //     console.log("LOOK FOR CAPTCHA DONE");
  //     await page.waitForNavigation();
  //     const loggedInSelector = '#app > header > nav.header--fixed > div > ul > li.ps--r.header__account-info-list__item > div > div:nth-child(2) > div > ul > li:nth-child(1) > a';
  //     await page.waitForSelector(loggedInSelector,  { timeout: 10000 });

  //     console.log('LOGGED IN');
  //   } catch(error){
  //     if (error.message.includes("Navigation timeout")) {
  //       console.log("Page timed out");
  //     } else {
  //       throw error;
  //     }
  //   }
  // }
}
