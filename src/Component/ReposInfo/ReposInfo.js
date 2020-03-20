import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import PullRequests from "../pullRequests/pullRequests";
import Issue from "../Issue/Issue";

const GET_REPOS = gql`
  query {
    repository(owner: "sindresorhus", name: "awesome") {
      id
      name
      pullRequests(last: 5) {
        edges {
          node {
            title
            createdAt
          }
        }
      }
      openIssue: issues(states: OPEN, last: 5) {
        edges {
          node {
            ...issueInfo
          }
        }
      }
      closedIssue: issues(states: CLOSED, last: 5) {
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
    comments(last: 5) {
      edges {
        node {
          createdAt
          bodyText
        }
      }
    }
  }
`;

const ReposInfo = props => {
  const { loading, error, data } = useQuery(GET_REPOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let { pullRequests, openIssue, closedIssue } = data.repository;

  return (
    <>
      <h1>{data.repository.name}</h1>
      <PullRequests pullRequests={pullRequests} />
      <h3>Open Issue:</h3>
      <Issue issue={openIssue} />
      <h3>Closed Issue:</h3>
      <Issue issue={closedIssue} />
    </>
  );
};

export default ReposInfo;
