import React, { useState } from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import ReposInfo from "./Component/ReposInfo/ReposInfo";
import SearchField from "./Component/SearchField/SearchField";
import Login from "./Component/Login/Login";
import "./App.css";

const App = props => {
  const accessToken = localStorage.getItem("token");

  const httpLink = new HttpLink({
    uri: "https://api.github.com/graphql",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });

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
        <ApolloProvider client={client}>
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
        </ApolloProvider>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
