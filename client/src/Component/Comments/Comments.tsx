import React, { useEffect } from "react";
import AuthorInfo from "../AuthorInfo/AuthorInfo";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
import classes from "./Comments.module.css";
import useFetch from "../../hooks/useFetch";
import { QueryType } from "../../typescript-types/enum/QueryTypes.enum";
import { IssueCommentConnection } from "../../typescript-types/generated/graphql";

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
    isLoading,
  } = useFetch({
    queryType: QueryType.COMMENTS,
    variables: { ID },
    skip: !ID /*avoid fetching during initial render*/,
  });

  useEffect(() => {
    fetchData();
  }, []);

  let displayComments: IssueCommentConnection | null = null;
  let hasNextPage = false;
  let endCursor: string | null | undefined = null;
  let totalCount = 0;
  if (data) {
    displayComments = data.node.comments as IssueCommentConnection;
  }

  if (fetchMoreResult) {
    const oldEdges = fetchMoreResult.previousData;
    displayComments = fetchMoreResult.newData.node
      .comments as IssueCommentConnection;
    //@ts-ignore
    displayComments.edges = [...oldEdges, ...displayComments.edges];
  }

  if (displayComments) {
    const { pageInfo } = displayComments;
    hasNextPage = pageInfo.hasNextPage;
    endCursor = pageInfo.endCursor;
    totalCount = displayComments.totalCount;
  }

  const displayElements = displayComments ? (
    //@ts-ignore
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
    })
  ) : (
    <div></div>
  );

  return (
    <>
      {isLoading && <LoadingCircle />}

      <div className={classes.commentsWrapper}>
        <h3>Comments ({totalCount})</h3>
        {displayElements}
        {hasNextPage && (
          <button
            className={classes.fetchMoreBtn}
            onClick={() => {
              fetchMore({
                //@ts-ignore
                previousData: displayComments.edges,
                cursor: endCursor,
              });
            }}
          >
            View more comments... (
            {
              //@ts-ignore
              displayComments.edges.length
            }
            /{totalCount})
          </button>
        )}
      </div>
    </>
  );
};

export default Comments;
