import React, { useState, Fragment, useEffect } from "react";
import classes from "./App.module.css";
import Issue from "./Component/Issue/Issue";
import TabPanel from "./Component/TabPanel/TabPanel";
import Navbar from "./Component/Navbar/Navbar";
import useFetch from "./hooks/useFetch";
import { pullRequestsQuery, issuesQuery } from "./graphqlQuery/query";

const App = () => {
  console.log("APP");
  const [currentTab, setCurrentTab] = useState<
    "pullRequests" | "openIssues" | "closedIssues"
  >("pullRequests");
  const [reposQuery, setReposQuery] = useState({ owner: "", name: "" });

  const RequestDict = {
    pullRequests: {
      variables: { ...reposQuery },
      query: pullRequestsQuery,
    },
    openIssues: {
      variables: { ...reposQuery, states: ["OPEN"] },
      query: issuesQuery,
    },

    closedIssues: {
      variables: { ...reposQuery, states: ["CLOSED"] },
      query: issuesQuery,
    },
  };

  const { variables, query } = RequestDict[currentTab];

  const {
    data,
    errorFromGithubApi,
    errorFromServer,
    fetchData,
    fetchMore,
    fetchMoreResult,
  } = useFetch({
    query,
    variables,
    skip: !reposQuery.name /*avoid fetching during initial render*/,
  });

  useEffect(() => {
    fetchData();
  }, [reposQuery, currentTab]);

  let displayData: any;
  let endCursor: string;
  let hasNextPage;
  let lengthOfEdgesShown;

  if (data) {
    const { issues, pullRequests } = data.repository;
    displayData = issues || pullRequests;
  }

  if (fetchMoreResult) {
    const { issues, pullRequests } = fetchMoreResult.newData.repository;
    const previousEdges = fetchMoreResult.previousData;
    displayData = issues || pullRequests;
    displayData.edges = [...previousEdges, ...displayData.edges];
  }

  if (displayData) {
    endCursor = displayData.pageInfo.endCursor;
    hasNextPage = displayData.pageInfo.hasNextPage;
    lengthOfEdgesShown = displayData.edges.length;
  }

  // console.log(displayData, displayData.pageInfo.endCursor);

  if (errorFromServer) {
    return <h1>Something goes wrong!</h1>;
  }

  return (
    <>
      <Navbar setReposQuery={setReposQuery} />

      <div className={classes.reposInfo}>
        {/* {isLoading && <p>loading...</p>} */}
        {errorFromGithubApi && <p>{errorFromGithubApi}</p>}
        {data && (
          <Fragment>
            <h1>{data.repository.name}</h1>
            <TabPanel currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <Issue issue={displayData} />
            {hasNextPage && (
              <button
                onClick={() => {
                  fetchMore({
                    previousData: displayData.edges,
                    cursor: endCursor,
                  });
                }}
              >
                Load more... ({lengthOfEdgesShown}/{displayData.totalCount})
              </button>
            )}
          </Fragment>
        )}
      </div>
    </>
  );
};

export default App;
