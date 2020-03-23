import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import PullRequests from "../../Component/PullRequests/PullRequests";
import Issue from "../Issue/Issue";

import classes from "./ReposInfo.module.css";

const GET_REPOS = gql`
  query($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      owner {
        login
      }
      pullRequests(last: 5) {
        edges {
          node {
            author {
              login
            }
            title
            createdAt
          }
        }
      }
      openIssues: issues(states: OPEN, last: 5) {
        edges {
          node {
            ...issueInfo
          }
        }
      }
      closedIssues: issues(states: CLOSED, last: 5) {
        edges {
          node {
            ...issueInfo
          }
        }
      }
    }
  }

  fragment issueInfo on Issue {
    title
    createdAt
    bodyText
    author {
      login
    }
    comments(last: 5) {
      edges {
        node {
          author {
            login
          }
          createdAt
          bodyText
        }
      }
    }
  }
`;

const ReposInfo = ({ reposQuery }) => {
  reposQuery = reposQuery.split("/");
  const owner = reposQuery[0] && reposQuery[0].trim();
  const name = reposQuery[1] && reposQuery[1].trim();

  const [currentTab, setCurrentTab] = useState("pullRequests");

  const { loading, error, data } = useQuery(
    GET_REPOS,
    {
      variables: { owner, name }
    },
    { errorPolicy: "all" }
  );

  if (loading) return <p className={classes.reposInfo}>Loading...</p>;

  if (error) {
    return error.graphQLErrors.map(({ message }, i) => (
      <p className={classes.reposInfo} key={i}>
        {message}
      </p>
    ));
  }

  let { pullRequests, openIssues, closedIssues } = data.repository;

  return (
    <div className={classes.reposInfo}>
      <h1>{data.repository.name}</h1>
      <div className={classes.tap_wrapper}>
        <h4
          className={`${classes.tap} ${currentTab === "pullRequests" &&
            classes.active_tab}`}
          onClick={() => {
            setCurrentTab("pullRequests");
          }}
        >
          Pull Requests
        </h4>
        <h4
          className={`${classes.tap} ${currentTab === "openIssues" &&
            classes.active_tab}`}
          onClick={() => {
            setCurrentTab("openIssues");
          }}
        >
          Open Issues
        </h4>
        <h4
          className={`${classes.tap} ${currentTab === "closedIssues" &&
            classes.active_tab}`}
          onClick={() => {
            setCurrentTab("closedIssues");
          }}
        >
          Closed Issues
        </h4>
      </div>
      {currentTab === "pullRequests" && (
        <PullRequests pullRequests={pullRequests} />
      )}
      {currentTab === "openIssues" && <Issue issue={openIssues} />}
      {currentTab === "closedIssues" && <Issue issue={closedIssues} />}
    </div>
  );
};

export default ReposInfo;
