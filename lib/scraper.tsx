import { Page } from 'puppeteer';
import { SearchParams } from './search';

export type scrapedResult = {
  marketplace: string;
};

export abstract class Scraper {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  abstract scrape(searchParams: SearchParams): Promise<Array<scrapedResult>>;

  abstract login(page: Page): Promise<void>;

  abstract search(page: Page, searchParams: SearchParams): Promise<Array<any>>;
}
