import currency from 'currency.js';
import { SearchParams } from './search';

export type TransformedItem = {
  name: string;
  photoUrl: string;
  price: string;
  originalPrice: string;
  brand: string;
  merchant: string;
  url: string;
};

export abstract class Marketplace {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  abstract search(searchParams: SearchParams): Promise<Array<TransformedItem>>;
  abstract transformData(rawResults: Array<any>): Array<TransformedItem>;

  transformPrice(originalPrice: string): string {
    return currency(originalPrice).format();
  }
}
