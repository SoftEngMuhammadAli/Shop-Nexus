import React from "react";

const SearchBar = ({
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
  buttonText = "Search",
}) => {
  return (
    <div className="flex w-full md:max-w-xl items-center bg-white shadow rounded-lg overflow-hidden">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="px-4 py-2 w-full outline-none"
      />
      <button
        onClick={onSearch}
        className="bg-blue-600 text-white px-5 py-2 hover:bg-blue-700 transition"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SearchBar;
