import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../components/header';
import Search from '../components/search';
import Results from '../components/results';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSortedSearchResults } from '../lib/search';
import { TransformedItem } from '../lib/marketplace';
import { useRouter } from 'next/dist/client/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSWR from 'swr';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const searchQuery = query.searchQuery as string;
  const searchResults: SearchResults = await getSortedSearchResults({
    searchQuery,
    page: 1
  });
  // eslint-disable-next-line no-console
  console.log('Total?', searchResults.length);
  return {
    props: {
      searchResults,
    },
  };
};

type SearchResults = Array<TransformedItem>;

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function Home({
  searchResults,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore] = useState(true);
  const router = useRouter();


  const getMoreResults = async () => {
    // const [page, setPage] = useState(1);
    const { data, error } = useSWR(
      `/api/search-results?searchQuery=${searchQuery}&page=1`, 
      fetcher
    );

    // if (error) return <div>{error.message}</div>;
    
    // console.log('DATA', data);
    // setPage(page + 1);
    console.log("GET MORE RESULTS", data);
    return [];
  };

  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(
      {
        pathname: router.asPath,
        query: { searchQuery },
      },
      `${router.asPath}`
    );
  };

  return (
    <div className="container h-screen">
      <Head>
        <title>LooterIO Search Results</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="justify-center w-screen">
        <Header />
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          refreshData={refreshData}
        />
      </div>

      <InfiniteScroll
        dataLength={searchResults.length}
        next={getMoreResults}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        <Results searchResults={searchResults} />
      </InfiniteScroll>
    </div>
  );
}
