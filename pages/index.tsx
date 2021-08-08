import Head from 'next/head'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { getSortedSearchResults } from '../lib/search'
import { TransformedItem } from '../lib/marketplace'

export const getServerSideProps: GetServerSideProps = async (context) => {
  // eslint-disable-next-line no-console
  console.log('QUERY', context.query)
  const searchResults: Array<TransformedItem> = await getSortedSearchResults(
    'thanos'
  )
  // eslint-disable-next-line no-console
  console.log('HGERE?', searchResults[0], searchResults.length)
  return {
    props: {
      searchResults,
    },
  }
}

export default function Home({ searchResults }): JSX.Element {
  return (
    <div className="container">
      <Head>
        <title>LooterIO Search Results</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <h2>Hey there</h2>
        <section>
          <p>{searchResults[0].name}</p>
          <div>
            {searchResults.map((item, index) => (
              <div key={index} className="item">
                <div className="photo">
                  <Image
                    src={item.photoUrl}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <p>{item.name}</p>
                <p>{item.brand}</p>
                <p>{item.price}</p>
                <p>{item.merchant}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  )
}
