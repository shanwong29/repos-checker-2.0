import React from "react";

const SearchField = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <label for="reposQuery">Search Repos: </label>
      <input
        name="reposQuery"
        type="text"
        placeholder="e.g. nuwave/lighthouse"
        value={props.reposQuery}
        onChange={event => props.setReposQuery(event.target.value)}
      />
      <button>Search</button>
    </form>
  );
};

export default SearchField;
