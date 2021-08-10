import { EBay } from './marketplaces/ebay';
import { Mercari } from './marketplaces/mercari';
import currency from 'currency.js';

export async function getSortedSearchResults(
  queryParams: string
): Promise<any> {
  const mercari = new Mercari();
  const mercariResults = await mercari.search(queryParams);

  const ebay = new EBay();
  const ebayResults = await ebay.search(queryParams);

  const combinedResults = [...mercariResults, ...ebayResults];

  //We're gonna sort the results by price for now. Low to High
  const sortedResults = combinedResults.sort(
    (a, b) => currency(a.price).value - currency(b.price).value
  );

  return sortedResults;
}
