import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getSortedSearchResults } from '../lib/search'

export const getServerSideProps: GetServerSideProps = async (params) => {
  const searchResults = await getSortedSearchResults('thanos')
  // eslint-disable-next-line no-console
  console.log('HGERE?')
  return {
    props:  {
      searchResults
    }
  }
}

export const Home = ({ searchResults }): JSX.Element => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <section>
      <h2>
        Hey there
      </h2>
      <blockquote>
        {searchResults}
      </blockquote>
    </section>
  </div>
)

export default Home

