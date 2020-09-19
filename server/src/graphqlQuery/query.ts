import { commentFragment, authorFragment, pageInfoFragment } from "./fragment";

interface GraphqlObj {
  [key: string]: string;
}

const graphqlQueries: GraphqlObj = {
  PULL_REQUESTS: ` 
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
    `,

  ISSUES: `
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
    `,

  COMMENTS: `
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
    `,
};

export { graphqlQueries };
