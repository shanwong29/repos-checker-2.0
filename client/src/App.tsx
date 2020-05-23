import React, { useState, Fragment } from "react";
import classes from "./App.module.css";

import Issue from "./Component/Issue/Issue";
import TabPanel from "./Component/TabPanel/TabPanel";
import ReposQueryForm from "./Component/ReposQueryForm/ReposQueryForm";
import useFetch from "./hooks/useFetch";

const App = () => {
  console.log("APP");
  const [currentTab, setCurrentTab] = useState<
    "pullRequests" | "openIssues" | "closedIssues"
  >("pullRequests");
  const [reposQuery, setReposQuery] = useState({ owner: "", name: "" });
  const [reqCursor, setReqCursor] = useState("");

  const RequestDict = {
    pullRequests: { variable: { ...reposQuery }, path: `/api/pullRequests` },
    openIssues: {
      variable: { ...reposQuery, states: ["OPEN"] },
      path: `/api/issues`,
    },

    closedIssues: {
      variable: { ...reposQuery, states: ["CLOSED"] },
      path: `/api/issues`,
    },
  };

  const { variable, path } = RequestDict[currentTab];

  const { reposData, errorFromGithubApi, errorFromServer } = useFetch(
    path,
    variable,
    reposQuery,
    currentTab,
    reqCursor,
    { skip: !reposQuery.name }
  );

  let displayData;
  let endCursor: string;
  let hasNextPage;
  if (reposData) {
    const { issues, pullRequests } = reposData;
    displayData = issues || pullRequests;
    endCursor = displayData.pageInfo.endCursor;
    hasNextPage = displayData.pageInfo.hasNextPage;
  }

  if (errorFromServer) {
    return <h1>Something goes wrong!</h1>;
  }

  return (
    <div className={classes.App}>
      <h1 className={classes.appTitle}>Repos Checker</h1>
      <ReposQueryForm setReposQuery={setReposQuery} />
      <div className={classes.reposInfo}>
        {/* {isLoading && <p>loading...</p>} */}
        {errorFromGithubApi && <p>{errorFromGithubApi}</p>}
        {reposData && (
          <Fragment>
            <h1>{reposData.name}</h1>
            <TabPanel currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <Issue issue={displayData} />
            {hasNextPage && (
              <button
                onClick={() => {
                  setReqCursor(endCursor);
                }}
              >
                Load more...
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default App;
