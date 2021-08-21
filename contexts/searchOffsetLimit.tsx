import React from 'react';

const SearchOffsetContext = React.createContext(0);

export const SearchOffsetProvider = SearchOffsetContext.Provider;

export const SearchOffsetConsumer = SearchOffsetContext.Consumer;

export default SearchOffsetContext;