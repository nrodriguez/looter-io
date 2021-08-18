import Image from 'next/image';
import { TransformedItem } from '../lib/marketplace';
import MerchantBadge from './merchantBadge';
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from 'react';
import { getSortedSearchResults } from '../lib/search';
import { SearchParams } from '../lib/search';
import { getServerSideProps } from '../pages/index';

async function getMoreResults(searchQuery, pageNumber, setPageNumber): Promise<Array<TransformedItem>> {
  console.log('GET MORE RESULTS', searchQuery, pageNumber);
  //Set the initial page number
  if(pageNumber === undefined){
    setPageNumber(1);
  }
  const thing = await getServerSideProps(searchQuery);
  console.log('{{{{{}}}}}', thing);
  const searchParams: SearchParams = {
    searchQuery,
    page: pageNumber
  };
  
  const searchResults: Array<TransformedItem> = await getSortedSearchResults(searchParams);
  //Set the next page number
  setPageNumber(pageNumber++);
  
  // eslint-disable-next-line no-console
  console.log('Total?', searchResults.length);
  return searchResults;
}

function EmptyResults(): JSX.Element {
  return <section>No Results</section>;
}

function HydratedResults({ searchResults, searchQuery }): JSX.Element {
  const [hasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(true);
  
  return (
    <InfiniteScroll
      dataLength={searchResults.length}
      next={() => getMoreResults(searchQuery, pageNumber, setPageNumber)}
      hasMore={hasMore}
      loader={<h3> Loading...</h3>}
      endMessage={<h4>Nothing more to show</h4>}
    >
      <section className="flex justify-center mt-10">
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
      </section>
    </InfiniteScroll>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Results = ({ searchResults, searchQuery }): JSX.Element => {
  if (searchResults.length > 0) {
    return <HydratedResults 
      searchResults={searchResults}
      searchQuery={searchQuery}
    />;
  }

  return <EmptyResults />;
};

export default Results;
