import { ImCross } from "react-icons/im";
const SearchResultHeading = ({ searchString, setSearchString }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <p>showing search result for:</p>
      <button
        className="flex flex-row gap-1 items-center justify-between bg-green-500 text-white px-2 rounded-lg"
        onClick={() => setSearchString("")}
      >
        {searchString}
        <ImCross color="red" />
      </button>
    </div>
  );
};

export default SearchResultHeading;
