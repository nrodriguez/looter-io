import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../components/header';
import SearchBar from '../components/search';
import Results from '../components/results';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Search } from '../lib/search';
import { TransformedItem } from '../lib/marketplace';
import { useRouter } from 'next/dist/client/router';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const searchQuery = query.searchQuery as string;

  const search = new Search({offset: 0});
  const searchResults: SearchResults = await search.getSortedSearchResults({
    searchQuery,
    page: 1
  });
  // eslint-disable-next-line no-console
  console.log('Total?', searchResults.length);
  return {
    props: {
      searchResults,
      search
    },
  };
};

type SearchResults = Array<TransformedItem>;

function Home({ searchResults }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

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
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          refreshData={refreshData}
        />
      </div>

      <Results 
        searchResults={searchResults} 
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default Home;