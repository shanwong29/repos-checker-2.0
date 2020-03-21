import React, { useState } from "react";

import ReposInfo from "./Component/ReposInfo/ReposInfo";
import SearchField from "./Component/SearchField/SearchField";
import Login from "./Component/Login/Login";
import "./App.css";

const App = props => {
  const accessToken = localStorage.getItem("token");

  const [reposQuery, setReposQuery] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    console.log(reposQuery);
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      {accessToken ? (
        <div className="App">
          <button className="" onClick={logout}>
            Logout
          </button>
          <h1>Repos Checker</h1>
          <SearchField
            reposQuery={reposQuery}
            setReposQuery={setReposQuery}
            handleSubmit={handleSubmit}
          />

          <ReposInfo />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
