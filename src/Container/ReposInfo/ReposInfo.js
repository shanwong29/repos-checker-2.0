import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import PullRequests from "../../Component/PullRequests/PullRequests";
import Issue from "../../Component/Issue/Issue";

const GET_REPOS = gql`
  query {
    repository(owner: "sindresorhus", name: "awesome") {
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
            bodyText
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

const ReposInfo = props => {
  const [currentTab, setCurrentTab] = useState("pullRequests");

  const { loading, error, data } = useQuery(GET_REPOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let { pullRequests, openIssues, closedIssues } = data.repository;

  return (
    <>
      <h1>{data.repository.name}</h1>
      <div>
        <button
          onClick={() => {
            setCurrentTab("pullRequests");
          }}
        >
          Pull Requests
        </button>
        <button
          onClick={() => {
            setCurrentTab("openIssues");
          }}
        >
          Open Issues
        </button>
        <button
          onClick={() => {
            setCurrentTab("closedIssues");
          }}
        >
          Closed Issues
        </button>
      </div>
      {currentTab === "pullRequests" && (
        <PullRequests pullRequests={pullRequests} />
      )}
      {currentTab === "openIssues" && <Issue issue={openIssues} />}
      {currentTab === "closedIssues" && <Issue issue={closedIssues} />}
    </>
  );
};

export default ReposInfo;
