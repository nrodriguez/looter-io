import { SearchIcon } from '@heroicons/react/outline';
import { TransformedItem } from '../lib/marketplace';

import { useState } from 'react';
import { getSortedSearchResults } from '../lib/search';

function Search(): JSX.Element {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);

  async function getResults(){
    // eslint-disable-next-line no-console
    console.log('QUERY', searchInput);
    const searchResults: Array<TransformedItem> = await getSortedSearchResults(
      'thanos'
    );
    // eslint-disable-next-line no-console
    console.log('Total?', searchResults.length);
    
    setResults(searchResults);
  }
  
  async function handleKeyDown(event) {
    if(event.key === 'Enter'){
     setSearchInput(event.target.value);
     await getResults();
    }
  }
  
  async function handleClick(event){
    setSearchInput(event.currentTarget.getAttribute('data-value-search-input'));
    await getResults();
  }
  
  async function handleChange(event) {
    setSearchInput(event.target.value);
  }
  
  console.log(searchInput, results);
  return (
    <div className="flex items-center max-w-xs pl-2 bg-white border-2 rounded-full">
      <SearchIcon 
        className='h-8 text-gray-700'
        data-value-search-input={searchInput} 
        onClick={(e) => handleClick(e)}
      />
      <input 
        className="px-5 pr-16 text-sm text-gray-700 focus:outline-none"
        type="text" 
        name="search" 
        placeholder="Search"
        value={searchInput}
        onChange={(e) => {handleChange(e);}}
        onKeyDown={(e) => {handleKeyDown(e);}}
      />
    </div>
  );
}

export default Search;