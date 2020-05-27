import React, { useEffect } from "react";
import AuthorInfo from "../AuthorInfo/AuthorInfo";
import classes from "./Comments.module.css";
import useFetch from "../../hooks/useFetch";

/*By typing our component as an FC, 
the React TypeScripts types allow us to handle children and defaultProps correctly.  */

interface IProps {
  // comments: any;
  ID: string;
}

const Comments: React.FC<IProps> = ({ ID }) => {
  console.log("Comments,", ID);

  let cursor = null;

  const { data, errorFromGithubApi, errorFromServer, fetchData } = useFetch(
    "/api/comments",
    { ID, cursor },
    {
      skip: !ID /*avoid fetching during initial render*/,
    }
  );

  useEffect(() => {
    console.log("here");
    fetchData();
  }, []);

  let comments;

  if (data) {
    comments = data.node.comments.edges;
  }
  console.log(data, errorFromGithubApi, errorFromServer);

  comments =
    comments &&
    comments.map((el: any, key: number) => {
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

  return comments ? (
    <div className={classes.commentsWrapper}>
      <h3>Comments ({comments.length})</h3>
      {comments}
    </div>
  ) : (
    <></>
  );
};

export default Comments;
