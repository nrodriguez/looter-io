import { TransformedItem } from "../lib/marketplace";
import Image from 'next/image';

function EmptyResults(){
  return <section>No Results</section>;
}

function HydratedResults(searchResults){
  return (
    <section>
      <p>{searchResults[0].name}</p>
      <div>
        {searchResults.map((item, index) => (
          <a key={index} target="_blank" href={item.url} rel="noreferrer">
            <div className="item">
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
          </a>
        ))}
      </div>
    </section>
  );
}

function Results(searchResults: Array<TransformedItem>): JSX.Element {
  console.log("RESL", searchResults);
  if(searchResults.length > 0){
    return <HydratedResults />;
  }

  return <EmptyResults />; 
}

export default Results;