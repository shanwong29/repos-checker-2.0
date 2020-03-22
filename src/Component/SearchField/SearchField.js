import React from "react";

const SearchField = props => {
  let createdRef = "";
  return (
    <form onSubmit={e => props.handleSubmit(e, createdRef)}>
      <label for="reposQuery">Search Repos: </label>
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
