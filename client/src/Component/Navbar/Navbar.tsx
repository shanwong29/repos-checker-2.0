import React, { useState } from "react";
import classes from "./Navbar.module.css";

interface IProps {
  setReposQuery: (value: { owner: string; name: string }) => void;
}

const Navbar: React.FC<IProps> = ({ setReposQuery }) => {
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
        "* Please provide owner and name of the selected repository."
      );
      return;
    }
    setReposQuery({ owner, name });
    setInputWarning("");
  };

  return (
    <>
      <nav className={classes.nav}>
        <span className={classes.logo}>
          <i className="fab fa-github-alt"></i> Repos Checker
        </span>
        <div>
          <a
            className={classes.link}
            href="https://developer.github.com/v4/"
            target="_blank"
            rel="noopener noreferrer"
          >
            API
          </a>
          <a
            className={classes.link}
            href="https://github.com/shanwong29/repos-checker-2.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Code
          </a>
        </div>
      </nav>
      <div className={classes.formWrapper}>
        <form className={classes.form} onSubmit={(e) => handleSearchQuery(e)}>
          <input
            className={classes.input}
            name="queryInput"
            type="text"
            placeholder=" "
          />
          <span className={classes.placeholder}>e.g. google / go-github</span>
          <button className={classes.submitBtn} type="submit">
            Search
          </button>
        </form>

        {inputWarning && <p className={classes.inputWarning}>{inputWarning}</p>}
      </div>
    </>
  );
};

export default Navbar;
