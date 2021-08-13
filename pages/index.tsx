import Head from 'next/head';
// import { GetServerSideProps } from 'next';
// import { getSortedSearchResults } from '../lib/search';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { useState } from 'react';
import Header from '../components/header';
import Search from '../components/search';
import Results from '../components/results';

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // eslint-disable-next-line no-console
//   console.log('QUERY', context);
//   const searchResults: Array<TransformedItem> = await getSortedSearchResults(
//     'thanos'
//   );
//   // eslint-disable-next-line no-console
//   console.log('Total?', searchResults.length);
//   return {
//     props: {
//       searchResults,
//     },
//   };
// };

export default function Home({ searchResults }: AppProps): JSX.Element {
  const [results, setResults] = useState([]);
  return (
    <div className="container">
      <Head>
        <title>LooterIO Search Results</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <Search 
        results={results}
        setResults={setResults}
      />
      <Results 
        results={results}
      />
    </div>
  );
}
