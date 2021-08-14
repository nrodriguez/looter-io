import Image from 'next/image';
import { TransformedItem } from '../lib/marketplace';
import MerchantBadge from './merchantBadge';

function EmptyResults(): JSX.Element {
  return <section>No Results</section>;
}

function HydratedResults({ searchResults }): JSX.Element {
  return (
    <section>
      <div className="w-screen m-10">
        {searchResults.map((item: TransformedItem, index) => (
          <a key={index} target="_blank" href={item.url} rel="noreferrer">
            <div className="item">
              <div className="photo">
                <Image src={item.photoUrl} layout="fill" objectFit="contain" />
              </div>
              <p>{item.name}</p>
              <p>{item.brand}</p>
              <p>{item.price}</p>
              <MerchantBadge merchant={item.merchant} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Results = ({ searchResults }): JSX.Element => {
  if (searchResults.length > 0) {
    return <HydratedResults searchResults={searchResults} />;
  }

  return <EmptyResults />;
};

export default Results;
