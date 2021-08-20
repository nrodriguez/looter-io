import Image from 'next/image';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TransformedItem } from '../lib/marketplace';
import MerchantBadge from './merchantBadge';

function EmptyResults(): JSX.Element {
  return <section>No Results</section>;
}

function HydratedResults({ initialSearchResults, searchQuery }): JSX.Element {
  const [searchResults, setSearchResults] = useState(initialSearchResults);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  
  const getMoreResults = async () => {
    console.log("API CALL");
    setPage(page+1);
    const res = await fetch(`/api/search-results?searchQuery=${searchQuery}&page=${page}`);
    const newSearchResults = await res.json();
  
    console.log("GET MORE RESULTS", newSearchResults.length, page);
    
    console.log(searchResults[0], newSearchResults[0]);
    setSearchResults((searchResults) => [...searchResults, ...newSearchResults]);
  };
  
  return (
    <section className="flex justify-center mt-10">
      <InfiniteScroll
        dataLength={searchResults.length}
        next={getMoreResults}
        hasMore={true}
        loader={<h4> Loading...</h4>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        <div className="grid grid-cols-5 gap-20">
          {searchResults.map((item: TransformedItem, index) => (
            <a
              key={index}
              target="_blank"
              href={item.url}
              rel="noreferrer"
              className="item-container"
            >
              <div className="item">
                <Image
                  src={item.photoUrl}
                  // layout="fill"
                  objectFit="contain"
                  height="200"
                  width="200"
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
    return <HydratedResults 
      initialSearchResults={searchResults} 
      searchQuery={searchQuery}
    />;
  }

  return <EmptyResults />;
};

export default Results;