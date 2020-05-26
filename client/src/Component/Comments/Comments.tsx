import React from "react";
import AuthorInfo from "../AuthorInfo/AuthorInfo";
import classes from "./Comments.module.css";

/*By typing our component as an FC, 
the React TypeScripts types allow us to handle children and defaultProps correctly.  */

interface IProps {
  comments: any;
  showComments: boolean;
}

const Comments: React.FC<IProps> = ({ comments, showComments }) => {
  console.log("Comments");

  comments = comments.map((el: any, key: number) => {
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

  return (
    <div className={classes.commentsWrapper}>
      {showComments ? (
        <>
          <h3>Comments ({comments.length})</h3>
          {comments}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Comments;
