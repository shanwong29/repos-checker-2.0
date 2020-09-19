import React, { useState, useEffect } from "react";
import classes from "./App.module.css";
import Issue from "./Component/Issue/Issue";
import TabPanel from "./Component/TabPanel/TabPanel";
import Navbar from "./Component/Navbar/Navbar";
import LoadingCircle from "./Component/LoadingCircle/LoadingCircle";
import useFetch from "./hooks/useFetch";
import { CurrentTabType } from "./typescript-types/enum/CurrentTabType.enum";
import { QueryType } from "./typescript-types/enum/QueryTypes.enum";
import {
  Repository,
  IssueConnection,
  PullRequestConnection,
  IssueEdge,
  IssueState,
} from "./typescript-types/generated/graphql";

const App = () => {
  console.log("APP");

  const [currentTab, setCurrentTab] = useState<CurrentTabType>(
    CurrentTabType.PULL_REQUESTS
  );
  const [reposQuery, setReposQuery] = useState({ owner: "", name: "" });

  const requestDict = {
    PULL_REQUESTS: {
      variables: { ...reposQuery },
      queryType: QueryType.PULL_REQUESTS,
    },
    OPEN_ISSUES: {
      variables: { ...reposQuery, states: [IssueState.Open] },
      queryType: QueryType.ISSUES,
    },

    CLOSED_ISSUES: {
      variables: { ...reposQuery, states: [IssueState.Closed] },
      queryType: QueryType.ISSUES,
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

  let displayData: IssueConnection | PullRequestConnection;
  let endCursor: string | null | undefined;
  let hasNextPage = false;
  let lengthOfEdgesShown = 0;

  if (data) {
    const { issues, pullRequests } = data.repository as Repository;
    displayData = issues || pullRequests;
    // when there is already existing data about the repos
  }

  // if there is fetchmore results
  if (fetchMoreResult) {
    const { issues, pullRequests } = fetchMoreResult.newData
      .repository as Repository;
    const previousEdges = fetchMoreResult.previousData;
    displayData = issues || pullRequests;
    displayData.edges = [
      ...previousEdges,
      ...(displayData.edges as Array<IssueEdge>),
    ];
  }

  //@ts-ignore
  if (displayData) {
    endCursor = displayData.pageInfo.endCursor;
    hasNextPage = displayData.pageInfo.hasNextPage;
    lengthOfEdgesShown = displayData.edges ? displayData.edges.length : 0;
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
            {/* @ts-ignore */}
            <Issue issueEdge={displayData.edges} />
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
                  {/* @ts-ignore */}
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
