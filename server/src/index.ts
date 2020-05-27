import express from "express";
require("dotenv").config();
import { GraphQLClient } from "graphql-request";

const PORT = 5000;

const app: express.Application = express();

app.use(express.json());

const endPoint = "https://api.github.com/graphql";

const client = new GraphQLClient(endPoint, {
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
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            title
            createdAt
            bodyHTML
            author {
              login
              avatarUrl
            }
            comments {
              totalCount
            }
          }
        }
      }
     
    }
  }`;

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
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            title
            createdAt
            bodyHTML
            author {
              login
              avatarUrl
            }
            comments {
              totalCount
            }
          }
        }
      }
    }
  }`;

  try {
    const data = await client.request(query, req.body);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

app.post("/api/comments", async (req, res, next) => {
  const query = `
  query ($ID: ID!, $cursor:String) {
    node(id: $ID) {
      ... on PullRequest {
        comments(first: 10, after:$cursor) {
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
          edges {
            node {
              author {
                login
                avatarUrl
              }
              createdAt
              bodyHTML
            }
          }
        }
      }
      ... on Issue {
        comments(first: 10, after:$cursor) {
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
          edges {
            node {
              author {
                login
                avatarUrl
              }
              createdAt
              bodyHTML
            }
          }
        }
      }
    }
  }`;

  try {
    const data = await client.request(query, req.body);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

/*

*/
