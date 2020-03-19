import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

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
      issues(states: OPEN, last: 5) {
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

  return <h1>{data.repository.id}</h1>;
};

export default ReposInfo;
