import type { NextApiRequest, NextApiResponse } from 'next';
import { TransformedItem } from '../../lib/marketplace';
import { SearchParams, getSortedSearchResults } from '../../lib/search';

async function getSearchResults(searchQuery, pageNumber): Promise<Array<TransformedItem>> {
  console.log('GET MORE RESULTS', searchQuery, pageNumber);
  //Set the initial page number
  if(pageNumber === undefined){
    pageNumber = 1;
  }

  const searchParams: SearchParams = {
    searchQuery,
    page: pageNumber
  };
  
  const searchResults: Array<TransformedItem> = await getSortedSearchResults(searchParams);
  
  // eslint-disable-next-line no-console
  console.log('Total?', searchResults.length);
  return searchResults;
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {searchQuery, page } = req.query;
  const results = await getSearchResults(searchQuery, page);

  res.status(200).json(results);
};
