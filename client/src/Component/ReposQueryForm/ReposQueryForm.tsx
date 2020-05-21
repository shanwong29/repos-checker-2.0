import React from "react";
import classes from "./ReposQueryForm.module.css";

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
      <label htmlFor="queryInput">Search Repos:</label>
      <div className={classes.form}>
        <input
          className={classes.input}
          name="queryInput"
          type="text"
          placeholder=" "
        />
        <span className={classes.placeholder}>e.g. google / jax</span>
        <button className={classes.submitBtn} type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default ReposQueryForm;
