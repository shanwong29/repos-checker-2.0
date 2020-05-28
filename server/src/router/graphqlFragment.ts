const authorFragment = `
fragment authorInfo on Actor {
  login
  avatarUrl
}
`;

const pageInfoFragment = `
fragment pageInfoData on PageInfo {
  endCursor
  hasNextPage
}
`;

const commentFragment = `
fragment commentInfo on IssueCommentConnection {
  totalCount
  pageInfo {
    ...pageInfoData
  }
  edges {
    node {
      author {
        ...authorInfo
      }
      createdAt
      bodyHTML
    }
  }
}
${authorFragment}
${pageInfoFragment}`;

export { commentFragment, pageInfoFragment, authorFragment };
