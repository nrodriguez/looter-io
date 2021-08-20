import type { NextApiRequest, NextApiResponse } from 'next';
import { TransformedItem } from '../../lib/marketplace';
import { SearchParams, Search } from '../../lib/search';

async function getSearchResults(searchQuery, pageNumber): Promise<Array<TransformedItem>> {
  //Set the initial page number
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  const searchParams: SearchParams = {
    searchQuery,
    page: pageNumber
  };
  
  const search = new Search();
  const searchResults: Array<TransformedItem> = await search.getSortedSearchResults(searchParams);
  
  // eslint-disable-next-line no-console
  console.log('Total?', searchResults.length);
  return searchResults;
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {searchQuery, page } = req.query;
  const results = await getSearchResults(searchQuery, page);

  res.status(200).json(results);
};
