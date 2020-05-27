import React, { useState, Fragment, useEffect } from "react";
import classes from "./App.module.css";
import Issue from "./Component/Issue/Issue";
import TabPanel from "./Component/TabPanel/TabPanel";
import Navbar from "./Component/Navbar/Navbar";
import useFetch from "./hooks/useFetch";

const App = () => {
  console.log("APP");
  const [currentTab, setCurrentTab] = useState<
    "pullRequests" | "openIssues" | "closedIssues"
  >("pullRequests");
  const [reposQuery, setReposQuery] = useState({ owner: "", name: "" });
  const [reqCursor, setReqCursor] = useState<null | string>(null);

  const RequestDict = {
    pullRequests: {
      variable: { ...reposQuery, cursor: reqCursor },
      path: `/api/pullRequests`,
    },
    openIssues: {
      variable: { ...reposQuery, cursor: reqCursor, states: ["OPEN"] },
      path: `/api/issues`,
    },

    closedIssues: {
      variable: { ...reposQuery, cursor: reqCursor, states: ["CLOSED"] },
      path: `/api/issues`,
    },
  };

  const { variable, path } = RequestDict[currentTab];

  const {
    reposData,
    errorFromGithubApi,
    errorFromServer,
    fetchData,
  } = useFetch(path, variable, {
    skip: !reposQuery.name /*avoid fetching during initial render*/,
  });

  useEffect(() => {
    fetchData();
  }, [reposQuery, currentTab]);

  useEffect(() => {
    console.log(reqCursor);
    fetchData();
  }, [reqCursor]);

  let displayData;
  let endCursor: string;
  let hasNextPage;
  if (reposData) {
    const { issues, pullRequests } = reposData;
    displayData = issues || pullRequests;
    endCursor = displayData.pageInfo.endCursor;
    hasNextPage = displayData.pageInfo.hasNextPage;
    console.log(displayData, displayData.pageInfo.endCursor);
  }

  if (errorFromServer) {
    return <h1>Something goes wrong!</h1>;
  }

  return (
    <>
      <Navbar setReposQuery={setReposQuery} />

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
                  console.log("button", endCursor);
                  setReqCursor(endCursor);
                }}
              >
                Load more...
              </button>
            )}
          </Fragment>
        )}
      </div>
    </>
  );
};

export default App;
