import React, { useEffect } from "react";
import AuthorInfo from "../AuthorInfo/AuthorInfo";
import classes from "./Comments.module.css";
import useFetch from "../../hooks/useFetch";

/*By typing our component as an FC, 
the React TypeScripts types allow us to handle children and defaultProps correctly.  */

interface IProps {
  ID: string;
}

const Comments: React.FC<IProps> = ({ ID }) => {
  console.log("Comments");

  const {
    data,
    errorFromGithubApi,
    errorFromServer,
    fetchData,
    fetchMore,
    fetchMoreResult,
  } = useFetch({
    queryType: "comments",
    variables: { ID },
    skip: !ID /*avoid fetching during initial render*/,
  });

  useEffect(() => {
    fetchData();
  }, []);

  let displayComments: any;
  let hasNextPage: any;
  let endCursor: any;
  let totalCount: any;
  if (data) {
    displayComments = data.node.comments;
  }

  if (fetchMoreResult) {
    const oldEdges = fetchMoreResult.previousData;
    displayComments = fetchMoreResult.newData.node.comments;
    displayComments.edges = [...oldEdges, ...displayComments.edges];
  }

  if (displayComments) {
    const { pageInfo } = displayComments;
    hasNextPage = pageInfo.hasNextPage;
    endCursor = pageInfo.endCursor;
    totalCount = displayComments.totalCount;
  }

  const displayElements =
    displayComments &&
    displayComments.edges.map((el: any, key: number) => {
      const { avatarUrl, login } = el.node.author;

      return (
        <div className={classes.eachCommentWrapper} key={key}>
          <AuthorInfo
            authorName={login}
            avatarUrl={avatarUrl}
            timeStamp={el.node.createdAt}
          />

          <div
            className={classes.commentText}
            dangerouslySetInnerHTML={{ __html: el.node.bodyHTML }}
          />
        </div>
      );
    });

  return displayElements ? (
    <div className={classes.commentsWrapper}>
      <h3>Comments ({totalCount})</h3>
      {displayElements}
      {hasNextPage && (
        <button
          className={classes.fetchMoreBtn}
          onClick={() => {
            fetchMore({
              previousData: displayComments.edges,
              cursor: endCursor,
            });
          }}
        >
          View more comments... ({displayComments.edges.length}/{totalCount})
        </button>
      )}
    </div>
  ) : (
    <></>
  );
};

export default Comments;
