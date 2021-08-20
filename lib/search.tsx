import { EBay } from './marketplaces/ebay';
import { Mercari } from './marketplaces/mercari';
import currency from 'currency.js';

export type SearchParams = {
  searchQuery: string,
  page: number
};

export type LimitOffset = {
  offset: number,
  limit: number
};

export class Search {
  offset: number;
  limit: number;

  constructor({offset}) {
    this.offset = offset;
    this.limit = 50;
  }

  calculateLimitAndOffset(page: number): LimitOffset {
    let offset: number;
    const limit = this.limit;
    console.log('EBAY OFF', this.offset);
    if(Number(page) === 1){
      offset = 0;
    } else {
      offset = this.offset + this.limit;
      console.log('NEW OFF', offset);
      this.offset = offset;
      console.log('EBAY OFF2', this.offset);
    }
  
    return {
      offset,
      limit
    };
  }
  
  async getSortedSearchResults(searchParams: SearchParams): Promise<any> {
    if (searchParams.searchQuery) {
      console.log(searchParams);

      const limitAndOffset = this.calculateLimitAndOffset(searchParams.page);
      
      const mercari = new Mercari();
      const mercariResults = await mercari.search(searchParams);
  
      
      const ebay = new EBay(limitAndOffset);
      const ebayResults = await ebay.search(searchParams);
  
      const combinedResults = [...mercariResults, ...ebayResults];
  
      //We're gonna sort the results by price for now. Low to High
      const sortedResults = combinedResults.sort(
        (a, b) => currency(a.price).value - currency(b.price).value
      );
  
      return sortedResults;
    }
  
    return [];
  }
}


