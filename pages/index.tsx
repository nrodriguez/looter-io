import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/header';
import Search from '../components/search';
import Results from '../components/results';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSortedSearchResults } from '../lib/search';
import { TransformedItem } from '../lib/marketplace';
import { useRouter } from 'next/dist/client/router';
import { SearchQueryContext } from '../contexts/searchQueryContext';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const searchQuery = query.searchQuery as string;
  const searchResults: SearchResults = await getSortedSearchResults(
    searchQuery
  );
  // eslint-disable-next-line no-console
  console.log('Total?', searchResults.length);
  return {
    props: {
      searchResults,
    },
  };
};

type SearchResults = Array<TransformedItem>;

export default function Home({
  searchResults,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
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
    <SearchQueryContext.Provider value={{ searchQuery }}>
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

        <Results searchResults={searchResults} />
      </div>
    </SearchQueryContext.Provider>
  );
}
