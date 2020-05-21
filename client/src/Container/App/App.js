import React, { useState, useEffect, Fragment } from "react";
import classes from "./App.module.css";
import { getData } from "../../service/getData";
import Issue from "../../Component/Issue/Issue";

const App = () => {
  const [currentTab, setCurrentTab] = useState("pullRequests");
  const [reposQuery, setReposQuery] = useState("");
  const [reposData, setReposData] = useState({});
  const [errorFromGithubApi, setErrorFromGithubApi] = useState("");
  const [errorFromServer, setErrorFromServer] = useState("");

  let owner;
  let name;
  if (reposQuery) {
    let query = reposQuery.split("/");
    owner = query[0] && query[0].trim();
    name = query[1] && query[1].trim();
  }
  const handleSearchQuery = (e) => {
    e.preventDefault();
    let queryStr = e.target.queryInput.value;
    setReposQuery(queryStr);
  };

  // const { loading, error, data } = useQuery(
  //   GET_REPOS,
  //   { skip: !owner, variables: { owner, name } },
  //   { errorPolicy: "all" }
  // );

  // let queryStatus = "";

  // if (loading) {
  //   queryStatus = "loading...";
  // }

  // if (error) {
  //   queryStatus = error.graphQLErrors[0].message;
  // }

  // let pullRequests;
  // let openIssues;
  // let closedIssues;

  console.log("data, ", reposData);

  const fetchData = async (path, variables) => {
    try {
      const response = await getData(path, variables);

      if (!response.repository) {
        setErrorFromGithubApi(response.response.errors[0].message);
        setReposData({});
        return;
      }
      setReposData(response);
      setErrorFromGithubApi("");
      setErrorFromServer("");
    } catch (err) {
      //error from server
      console.log("thisiserr", err);
      setErrorFromServer(err);
      setReposData({});
    }
  };

  useEffect(() => {
    if (!owner || !name) {
      return;
    }
    let variables = { name, owner };
    if (currentTab === "openIssues") {
      variables = { name, owner, states: ["OPEN"] };
    } else if (currentTab === "closedIssues") {
      variables = { name, owner, states: ["CLOSED"] };
    }

    let path = `/api/pullRequests`;
    if (currentTab !== "pullRequests") {
      path = `/api/issues`;
    }
    fetchData(path, variables);
  }, [reposQuery, currentTab]);

  let displayData;
  if (reposData.repository) {
    const { issues, pullRequests } = reposData.repository;
    displayData = issues || pullRequests;
  }

  return (
    <div className={classes.App}>
      <h1 className={classes.app_title}>Repos Checker</h1>
      <div className={classes.reposInfo}>
        <form onSubmit={(e) => handleSearchQuery(e)}>
          <label htmlFor="queryInput">Search Repos: </label>
          <input
            name="queryInput"
            type="text"
            placeholder="e.g. google / jax"
          />
          <button>Search</button>
        </form>

        {errorFromGithubApi && <h1>{errorFromGithubApi}</h1>}
        {/* <p>{queryStatus}</p> */}

        {/* {data.length && 
          !queryStatus && <Fragment> */}
        {reposData.repository && (
          <Fragment>
            <h1>{reposData.repository.name}</h1>
            <div className={classes.tap_wrapper}>
              <h4
                className={`${classes.tap} ${
                  currentTab === "pullRequests" && classes.active_tab
                }`}
                onClick={() => {
                  setCurrentTab("pullRequests");
                }}
              >
                Pull Requests
              </h4>
              <h4
                className={`${classes.tap} ${
                  currentTab === "openIssues" && classes.active_tab
                }`}
                onClick={() => {
                  setCurrentTab("openIssues");
                }}
              >
                Open Issues
              </h4>
              <h4
                className={`${classes.tap} ${
                  currentTab === "closedIssues" && classes.active_tab
                }`}
                onClick={() => {
                  setCurrentTab("closedIssues");
                }}
              >
                Closed Issues
              </h4>
            </div>
            <div className={classes.data_wrapper}>
              <Issue issue={displayData} />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default App;
