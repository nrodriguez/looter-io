import Image from 'next/image';
import { TransformedItem } from '../lib/marketplace';
import MerchantBadge from './merchantBadge';

function EmptyResults(): JSX.Element {
  return <section>No Results</section>;
}

function HydratedResults({ searchResults }): JSX.Element {
  return (
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
