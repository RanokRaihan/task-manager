import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
const TaskSearch = ({ setSearchString }) => {
  const [searchInput, setSearchInput] = useState("");

  // on submitting the form
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchString(searchInput);
  };
  return (
    <div className="p-2 flex justify-end">
      <form onSubmit={handleSearch}>
        <div className="flex">
          <div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[440px]">
            <input
              type="search"
              id="search-dropdown"
              className="z-20 block w-full bg-gray-800 px-4 py-2 pr-10 focus:outline-none"
              placeholder="Search Task"
              required
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-0 h-full rounded-e-lg text-white md:right-4"
            >
              <FaMagnifyingGlass />
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskSearch;
