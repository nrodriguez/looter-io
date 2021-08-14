import { createContext } from 'react';

type SearchQueryContext = {
  searchQuery: string;
};

const searchQueryContextDefaultValues: SearchQueryContext = {
  searchQuery: '',
};

export const SearchQueryContext = createContext<SearchQueryContext>(
  searchQueryContextDefaultValues
);
