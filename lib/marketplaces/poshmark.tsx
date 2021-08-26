import puppeteer from 'puppeteer';
import { Marketplace, TransformedItem } from '../marketplace';
import { SearchParams } from '../search';

type PoshmarkItem = {
  title: string;
  price: number;
  marketingPrice: any;
  thumbnailImages: string;
  itemWebUrl: string;
};

export class Poshmark extends Marketplace {
  offset: number;
  limit: number;

  constructor() {
    super();
    this.url = 'http://www.poshmark.com';
  }

  async search(searchParams: SearchParams): Promise<Array<TransformedItem>> {
    const results = [];
  }

  transformData(rawResults: Array<any>): Array<TransformedItem> {
    return rawResults;
    // return rawResults.map((item: EbayItem) => {
    //   return {
    //     name: item.title,
    //     photoUrl: item.thumbnailImages[0].imageUrl,
    //     price: this.transformPrice(item.price.value),
    //     originalPrice: '', //item.marketingPrice.originalPrice.value,
    //     brand: '',
    //     merchant: 'EBay',
    //     url: item.itemWebUrl,
    //   };
    // });
  }
}
