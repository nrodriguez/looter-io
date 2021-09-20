import Image from 'next/image';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TransformedItem } from '../lib/marketplace';
import { defaultLimit } from '../lib/search';
import MerchantBadge from './merchantBadge';

function calculateOffset(page: number, offset: number, limit: number): number {
  let newOffset: number;

  if (Number(page) === 1) {
    newOffset = 0;
  } else {
    newOffset = offset + limit;
  }
  return newOffset;
}

function EmptyResults(): JSX.Element {
  return <section>No Results</section>;
}

function dupeCheck(
  initialResults: Array<TransformedItem>,
  newResults: Array<TransformedItem>
): boolean {
  const originalFirstItem = initialResults[0];
  const newResultsFirstItem = newResults[0];
  return originalFirstItem == newResultsFirstItem;
}

function HydratedResults({ initialSearchResults, searchQuery }): JSX.Element {
  const [searchResults, setSearchResults] = useState(initialSearchResults);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const limit = defaultLimit(); //Hardcoded here till I can find a better place

  const getMoreResults = async () => {
    const newPage = page + 1;
    const newOffset = calculateOffset(newPage, offset, limit);
    setPage(newPage);
    setOffset(newOffset);

    const res = await fetch(
      `/api/search-results?searchQuery=${searchQuery}&page=${newPage}&offset=${newOffset}&limit=${limit}`
    );
    const newSearchResults = await res.json();

    //We check for dupe to verify if there are no new results
    //If there are dupes then we're just returning the same set of results
    const isDupe = dupeCheck(searchResults, newSearchResults);

    if (isDupe) {
      setHasMore(false);
    } else {
      setSearchResults((searchResults) => [
        ...searchResults,
        ...newSearchResults,
      ]);
    }
  };

  if (initialSearchResults[0] !== searchResults[0]) {
    //Reset the values for a new search
    setSearchResults(initialSearchResults);
    setPage(1);
    setOffset(calculateOffset(1, 0, defaultLimit()));
  }

  return (
    <section className="flex justify-center mt-10 md:ml-10">
      <InfiniteScroll
        dataLength={searchResults.length}
        next={getMoreResults}
        hasMore={hasMore}
        loader={<h4> Loading...</h4>}
        endMessage={<h4>Nothing more to show</h4>}
        hasChildren={true}
      >
        <div className="grid grid-cols-2 gap-10 text-center text sm:gap-20 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {searchResults.map((item: TransformedItem, index) => (
            <a
              key={index}
              target="_blank"
              href={item.url}
              rel="noreferrer"
              className="max-w-full item-container"
            >
              <div className="item">
                <Image
                  src={item.photoUrl}
                  objectFit="contain"
                  height="200"
                  width="200"
                  layout="responsive"
                />
                <p>{item.name}</p>
                <p>{item.brand}</p>
                <p>{item.price}</p>
                <MerchantBadge merchant={item.merchant} />
              </div>
            </a>
          ))}
        </div>
      </InfiniteScroll>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Results = ({ searchResults, searchQuery }): JSX.Element => {
  if (searchResults.length > 0) {
    return (
      <HydratedResults
        initialSearchResults={searchResults}
        searchQuery={searchQuery}
      />
    );
  }

  return <EmptyResults />;
};

export default Results;
