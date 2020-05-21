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
  query($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
			owner {
			  login
			}
      pullRequests(last: 5, orderBy: {field: CREATED_AT, direction: ASC}) {
        edges {
          node {
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
  query($owner: String!, $name: String!, $states:	[IssueState!]) {
    repository(owner: $owner, name: $name) {
      id
      name
			owner {
			  login
			}
      issues(states:$states, last: 5, orderBy: {field: CREATED_AT, direction: ASC}) {
        edges {
          node {
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
