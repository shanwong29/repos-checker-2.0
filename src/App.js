import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import Login from "./Component/Login/Login";
import "./App.css";

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

const App = props => {
  return (
    <>
      {accessToken ? (
        <ApolloProvider client={client}>
          <div className="App">
            <h1>Repos Checker</h1>

            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        </ApolloProvider>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
