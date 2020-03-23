import React from "react";

const SearchField = ({ setReposQuery }) => {
  let createdRef = "";

  const handleQuerySubmit = (e, input) => {
    e.preventDefault();
    setReposQuery(input.value);
  };

  return (
    <form onSubmit={e => handleQuerySubmit(e, createdRef)}>
      <label htmlFor="reposQuery">Search Repos: </label>
      <input
        name="reposQuery"
        type="text"
        placeholder="e.g. nuwave/lighthouse"
        ref={domEl => {
          createdRef = domEl;
        }}
      />
      <button>Search</button>
    </form>
  );
};

export default SearchField;
