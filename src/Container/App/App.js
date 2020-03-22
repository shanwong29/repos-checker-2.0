import React, { useState } from "react";

import ReposInfo from "../ReposInfo/ReposInfo";
import SearchField from "../../Component/SearchField/SearchField";
import Login from "../../Component/Login/Login";
import classes from "./App.module.css";

const App = () => {
  const accessToken = localStorage.getItem("token");

  const [token, setToken] = useState("");
  const [reposQuery, setReposQuery] = useState("");

  const login = e => {
    e.preventDefault();
    localStorage.setItem("token", token);
    window.location.reload();
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={classes.App}>
      {accessToken && (
        <button className={classes.logoutBtn} onClick={logout}>
          Logout
        </button>
      )}

      <h1 className={classes.app_title}>Repos Checker</h1>

      {accessToken ? (
        <>
          <SearchField reposQuery={reposQuery} setReposQuery={setReposQuery} />
          {reposQuery && <ReposInfo reposQuery={reposQuery} />}
        </>
      ) : (
        <Login token={token} setToken={setToken} login={login} />
      )}
    </div>
  );
};

export default App;
