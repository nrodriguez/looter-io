import { Page } from 'puppeteer';
import axios from 'axios';
import axiosThrottle from 'axios-request-throttle';

import { Marketplace, TransformedItem } from '../marketplace';
import { SearchParams } from '../search';

export class Poshmark extends Marketplace {
  offset: number;
  limit: number;
  page: Page;
  url: string;
  $: any;

  constructor() {
    super();
    this.url = 'http://www.poshmark.com';
  }

  async search(searchParams: SearchParams): Promise<Array<TransformedItem>> {
    //make api call to scraper
    const options = {
      method: 'GET',
      url: `http://localhost:3000/api/scrape/poshmark`,
      params: {
        page: Number(searchParams.page),
        searchQuery: searchParams.searchQuery,
      },
    };

    try {
      //Setup the throttle for once a second to avoid rate limit
      axiosThrottle.use(axios, { requestsPerSecond: 1 });

      const resp = await axios.request(options as any);

      return this.transformData(resp.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error', error.response, error);
      //We hit a rate limiting error so just silently error
      if (error.statusText === 'Too Many Requests') {
        // eslint-disable-next-line no-console
        console.log('Too many requests');
      }
      return [];
    }
  }

  transformData(results: Array<any>): Array<TransformedItem> {
    // Method is inherited from parent class so even though we don't need it here
    // we have to include it :/
    return results;
  }
}
