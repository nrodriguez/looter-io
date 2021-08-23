import type { NextApiRequest, NextApiResponse } from 'next';
import { TransformedItem } from '../../lib/marketplace';
import { getSortedSearchResults, SearchParams } from '../../lib/search';

async function getSearchResults(
  searchQuery,
  pageNumber,
  offset,
  limit
): Promise<Array<TransformedItem>> {
  //Set the initial page number
  if (pageNumber === undefined) {
    pageNumber = 1;
  }

  const searchParams: SearchParams = {
    searchQuery,
    page: Number(pageNumber),
    offset: Number(offset),
    limit: Number(limit),
  };
  const searchResults: Array<TransformedItem> = await getSortedSearchResults(
    searchParams
  );

  return searchResults;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { searchQuery, page, offset, limit } = req.query;
  const results = await getSearchResults(searchQuery, page, offset, limit);

  res.status(200).json(results);
};
