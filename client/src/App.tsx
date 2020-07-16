import React, { useState, useEffect } from "react";
import classes from "./App.module.css";
import Issue from "./Component/Issue/Issue";
import TabPanel from "./Component/TabPanel/TabPanel";
import Navbar from "./Component/Navbar/Navbar";
import LoadingCircle from "./Component/LoadingCircle/LoadingCircle";
import useFetch from "./hooks/useFetch";

const App = () => {
  console.log("APP");

  const [currentTab, setCurrentTab] = useState<
    "pullRequests" | "openIssues" | "closedIssues"
  >("pullRequests");
  const [reposQuery, setReposQuery] = useState({ owner: "", name: "" });

  const requestDict = {
    pullRequests: {
      variables: { ...reposQuery },
      queryType: "pullRequests",
    },
    openIssues: {
      variables: { ...reposQuery, states: ["OPEN"] },
      queryType: "issues",
    },

    closedIssues: {
      variables: { ...reposQuery, states: ["CLOSED"] },
      queryType: "issues",
    },
  };

  const { variables, queryType } = requestDict[currentTab];

  const {
    data,
    errorFromGithubApi,
    errorFromServer,
    fetchData,
    fetchMore,
    fetchMoreResult,
    isLoading,
  } = useFetch({
    queryType,
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

  // if there is fetchmore results
  if (fetchMoreResult) {
    const { issues, pullRequests } = fetchMoreResult.newData.repository;
    const previousEdges = fetchMoreResult.previousData;
    displayData = issues || pullRequests;
    displayData.edges = [...previousEdges, ...displayData.edges];
  }

  // when there is already existing data about the repos
  if (displayData) {
    endCursor = displayData.pageInfo.endCursor;
    hasNextPage = displayData.pageInfo.hasNextPage;
    lengthOfEdgesShown = displayData.edges.length;
  }

  if (errorFromServer) {
    return <h1>Something goes wrong!</h1>;
  }

  return (
    <>
      {isLoading && <LoadingCircle />}
      <Navbar setReposQuery={setReposQuery} />

      <div className={classes.reposInfo}>
        {errorFromGithubApi && <p>{errorFromGithubApi}</p>}
        {data && (
          <>
            <h1>
              {data.repository.owner.login} / {data.repository.name}
            </h1>
            <TabPanel currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <Issue issue={displayData} />
            {hasNextPage && (
              <div className={classes.fetchMoreBtnWrapper}>
                <button
                  className={classes.fetchMoreBtn}
                  onClick={() => {
                    fetchMore({
                      previousData: displayData.edges,
                      cursor: endCursor,
                    });
                  }}
                >
                  Load more... ({lengthOfEdgesShown}/{displayData.totalCount})
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default App;
