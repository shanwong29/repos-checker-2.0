import React, { useState } from "react";
import classes from "./ReposQueryForm.module.css";

interface IProps {
  setReposQuery: (value: { owner: string; name: string }) => void;
}

const ReposQueryForm: React.FC<IProps> = ({ setReposQuery }) => {
  const [inputWarning, setInputWarning] = useState("");

  console.log("FORMS");
  const handleSearchQuery = (e: any) => {
    e.preventDefault();
    let queryStr = e.target.queryInput.value;

    const query = queryStr.split("/");
    const owner = query[0] && query[0].trim();
    const name = query[1] && query[1].trim();

    if (!owner || !name) {
      setInputWarning(
        "Please provide owner and name of the selected repository."
      );
      return;
    }
    setReposQuery({ owner, name });
    setInputWarning("");
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

      {inputWarning && <p>{inputWarning}</p>}
    </form>
  );
};

export default ReposQueryForm;
