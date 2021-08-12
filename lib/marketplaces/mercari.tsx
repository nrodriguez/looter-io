import { Marketplace, TransformedItem } from '../marketplace';
import axios from 'axios';
import axiosThrottle from 'axios-request-throttle';

type MercariItem = {
  name: string;
  photos: [
    {
      thumbnail: string;
    }
  ];
  price: string;
  originalPrice: string;
  brand: {
    name: string;
  };
  url: string;
};

export class Mercari extends Marketplace {
  async search(queryParams: string): Promise<Array<TransformedItem>> {
    const options = {
      method: 'GET',
      url: 'https://mercari.p.rapidapi.com/Mercari/Search',
      params: { page: '1', query: queryParams },
      headers: {
        'x-rapidapi-key': process.env.RAPID_API_KEY,
        'x-rapidapi-host': 'mercari.p.rapidapi.com',
      },
    };

    try {
      //Setup the throttle for once a second to avoid rate limit
      axiosThrottle.use(axios, { requestsPerSecond: 1 });

      const resp = await axios.request(options as any);
      return this.transformData(resp.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error', error.response);
      //We hit a rate limiting error so just silently error
      if (error.statusText === 'Too Many Requests') {
        // eslint-disable-next-line no-console
        console.log('Too many requests');
      }
      return [];
    }
  }

  transformData(rawResults: Array<any>): Array<TransformedItem> {
    return rawResults.map((item: MercariItem) => {
      return {
        name: item.name,
        photoUrl: item.photos[0].thumbnail, //.split("?")[0],
        price: this.transformPrice(item.price),
        originalPrice: this.transformPrice(item.originalPrice),
        brand: item.brand.name,
        merchant: 'mercari',
        url: item.url,
      };
    });
  }
}
