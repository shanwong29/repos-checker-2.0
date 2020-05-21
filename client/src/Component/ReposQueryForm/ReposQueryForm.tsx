import React from "react";

interface IProps {
  setReposQuery: (value: string) => void;
}

const ReposQueryForm: React.FC<IProps> = ({ setReposQuery }) => {
  const handleSearchQuery = (e: any) => {
    e.preventDefault();
    let queryStr = e.target.queryInput.value;
    setReposQuery(queryStr);
  };
  return (
    <form onSubmit={(e) => handleSearchQuery(e)}>
      <label htmlFor="queryInput">Search Repos: </label>
      <input name="queryInput" type="text" placeholder="e.g. google / jax" />
      <button type="submit">Search</button>
    </form>
  );
};

export default ReposQueryForm;
