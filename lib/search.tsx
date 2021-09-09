import { EBay } from './marketplaces/ebay';
import { Mercari } from './marketplaces/mercari';
import currency from 'currency.js';
import { Poshmark } from './marketplaces/poshmark';

export type SearchParams = {
  searchQuery: string;
  page: number;
  limit: number;
  offset: number;
};

export type Offset = {
  offset: number;
};

export function defaultLimit(): number {
  return 50;
}

export async function getSortedSearchResults(
  searchParams: SearchParams
): Promise<any> {
  if (searchParams.searchQuery) {
    const mercari = new Mercari();
    const mercariResults = await mercari.search(searchParams);

    const ebay = new EBay();
    const ebayResults = await ebay.search(searchParams);

    const poshmark = new Poshmark();
    const poshmarkResults = await poshmark.search(searchParams);

    const combinedResults = [
      ...mercariResults,
      ...ebayResults,
      ...poshmarkResults,
    ];

    //We're gonna sort the results by price for now. Low to High
    const sortedResults = combinedResults.sort(
      (a, b) => currency(a.price).value - currency(b.price).value
    );

    return sortedResults;
  }

  return [];
}
