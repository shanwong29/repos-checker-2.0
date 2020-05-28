import express from "express";
require("dotenv").config();
import { GraphQLClient } from "graphql-request";
import {
  commentFragment,
  authorFragment,
  pageInfoFragment,
} from "./router/graphqlFragment";

const PORT = 5000;

const app: express.Application = express();

app.use(express.json());

const endPoint = "https://api.github.com/graphql";

export const client = new GraphQLClient(endPoint, {
  headers: { Authorization: `Bearer ${process.env.GITHUB_API_KEY}` },
});

app.post("/api/pullRequests", async (req, res, next) => {
  const query = ` 
  query($owner: String!, $name: String!, $cursor:String) {
    repository(owner: $owner, name: $name) {
      name
			owner {
			  login
			}
      pullRequests(first: 5, after: $cursor, orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        pageInfo {
          ...pageInfoData
        }
        edges {
          cursor
          node {
            id
            title
            createdAt
            bodyHTML
            author {
              ...authorInfo
            }
            comments {
              totalCount
            }
          }
        }
      }
    }
  }
  ${authorFragment}
  ${pageInfoFragment}
  `;

  try {
    const data = await client.request(query, req.body);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

app.post("/api/issues", async (req, res, next) => {
  const query = `
  query($owner: String!, $name: String!, $states:	[IssueState!], $cursor:String) {
    repository(owner: $owner, name: $name) {
      name
			owner {
			  login
			}
      issues(states:$states, first: 5, after: $cursor,orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        pageInfo {
          ...pageInfoData
        }
        edges {
          cursor
          node {
            id
            title
            createdAt
            bodyHTML
            author {
              ...authorInfo
            }
            comments {
              totalCount
            }
          }
        }
      }
    }
  }
  ${authorFragment}
  ${pageInfoFragment}
  `;

  try {
    const data = await client.request(query, req.body);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

app.post("/api/comments", async (req, res) => {
  const query = `
    query ($ID: ID!, $cursor: String) {
      node(id: $ID) {
        ... on PullRequest {
          comments(first: 5, after: $cursor) {
            ...commentInfo
          }
        }
        ... on Issue {
          comments(first: 5, after: $cursor) {
            ...commentInfo
          }
        }
      }
    }
  
    ${commentFragment}
    `;

  try {
    const data = await client.request(query, req.body);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

// // const pullRequests = require("./router/pullRequests");
// // app.use("/api/pullRequests", pullRequests);
// // const issues = require("./router/issues");
// // app.use("/api/issues", issues);
// const comments = require("./router/comments");
// app.use("/api/comments", comments);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

/*
 

*/
