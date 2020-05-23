import React, { useState } from "react";
import AuthorInfo from "../AuthorInfo/AuthorInfo";
import classes from "./Comments.module.css";

/*By typing our component as an FC, 
the React TypeScripts types allow us to handle children and defaultProps correctly.  */

interface IProps {
  comments: any;
}

const Comments: React.FC<IProps> = ({ comments }) => {
  console.log("Comments");
  const [commentQuery, setCommentQuery] = useState("");

  let filteredComments = comments.filter((el: any) => {
    return el.node.bodyHTML.includes(commentQuery);
  });

  filteredComments = filteredComments.map((el: any, key: number) => {
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
      {comments.length ? (
        <>
          <h4>Comments:</h4>
          <label htmlFor="commentQuery">Filter comments by keyword(s): </label>
          <input
            className={classes.filter}
            name="commentQuery"
            type="text"
            placeholder="type keyword(s) here..."
            value={commentQuery}
            onChange={(event) => setCommentQuery(event.target.value)}
          />
          {filteredComments}
        </>
      ) : (
        <p>No comments for this issue</p>
      )}
    </div>
  );
};

export default Comments;
