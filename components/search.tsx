import { SearchIcon } from '@heroicons/react/outline';

type Props = {
  searchQuery: string;
  setSearchQuery: (str: string) => void;
  refreshData: () => void;
};

const SearchBar: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  refreshData,
}: Props) => {
  async function handleKeyDown(event) {
    if (event.key === 'Enter') {
      setSearchQuery(event.target.value);
      refreshData();
    }
  }

  async function handleClick(event) {
    setSearchQuery(event.currentTarget.getAttribute('data-value-search-input'));
    refreshData();
  }

  async function handleChange(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <div className="flex max-w-lg min-w-0 pl-2 bg-white border-2 rounded-full max-h-10">
      <SearchIcon
        className="h-8 text-gray-700"
        data-value-search-input={searchQuery}
        onClick={(e) => handleClick(e)}
      />
      <input
        className="w-11/12 px-5 pr-16 text-sm text-gray-700 bg-white focus:outline-none"
        type="text"
        name="search"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => {
          handleChange(e);
        }}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
      />
    </div>
  );
};

export default SearchBar;
