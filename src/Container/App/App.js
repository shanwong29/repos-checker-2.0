import React, { useState } from "react";

import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import ReposInfo from "../ReposInfo/ReposInfo";
import SearchField from "../SearchField/SearchField";
import Login from "../../Component/Login/Login";
import classes from "./App.module.css";

const App = () => {
  const accessToken = localStorage.getItem("storedToken") || "";

  const [token, setToken] = useState(accessToken);
  const [reposQuery, setReposQuery] = useState("");

  const login = (e, input) => {
    e.preventDefault();
    localStorage.setItem("storedToken", input.value);
    setToken(input.value);
  };

  const logout = () => {
    localStorage.clear();
    setToken("");
    setReposQuery("");
  };

  const httpLink = new HttpLink({
    uri: "https://api.github.com/graphql",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <div className={classes.App}>
        {token && (
          <button className={classes.logoutBtn} onClick={logout}>
            Logout
          </button>
        )}

        <h1 className={classes.app_title}>Repos Checker</h1>

        {token ? (
          <>
            <SearchField
              reposQuery={reposQuery}
              setReposQuery={setReposQuery}
            />
            {reposQuery && <ReposInfo reposQuery={reposQuery} />}
          </>
        ) : (
          <Login token={token} setToken={setToken} login={login} />
        )}
      </div>
    </ApolloProvider>
  );
};

export default App;
