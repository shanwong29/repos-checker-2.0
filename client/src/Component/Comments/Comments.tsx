import React, { useState } from "react";
import AuthorInfo from "../AuthorInfo/AuthorInfo";
import classes from "./Comments.module.css";
import ReactHtmlParser from "react-html-parser";

/*By typing our component as an FC, 
the React TypeScripts types allow us to handle children and defaultProps correctly.  */

interface IProps {
  comments: any;
}

const Comments: React.FC<IProps> = ({ comments }) => {
  const [commentQuery, setCommentQuery] = useState("");

  let filteredComments = comments.filter((el: any) => {
    return el.node.bodyHTML.includes(commentQuery);
  });

  filteredComments.sort((a: any, b: any) => {
    let dateA = new Date(a.node.createdAt);
    let dateB = new Date(b.node.createdAt);
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
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

        <div className={classes.commentText}>
          {ReactHtmlParser(el.node.bodyHTML)}
        </div>
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
