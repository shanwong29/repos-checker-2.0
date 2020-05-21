import React, { useState } from "react";
import { getFormattedDate } from "../../service/getFormattedDate";
import classes from "./Comments.module.css";

const Comments = ({ comments }) => {
  const [commentQuery, setCommentQuery] = useState("");

  let filteredComments = comments.filter((el) => {
    return el.node.bodyText.includes(commentQuery);
  });

  filteredComments.sort((a, b) => {
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

  filteredComments = filteredComments.map((el, key) => {
    let commentAuthor = el.node.author.login;
    return (
      <div className={classes.each_comment_wrapper} key={key}>
        <span>{commentAuthor} &#8226; </span>
        <span>{getFormattedDate(el.node.createdAt)}</span>

        <p className={classes.comment_text}>{el.node.bodyText}</p>
      </div>
    );
  });

  return comments.length ? (
    <div className={classes.comments_wrapper}>
      <h4>Comments:</h4>
      <label htmlFor="commentQuery">Filter comments by keyword(s): </label>
      <input
        name="commentQuery"
        type="text"
        placeholder="type keyword(s) here..."
        value={commentQuery}
        onChange={(event) => setCommentQuery(event.target.value)}
      />
      {filteredComments}
    </div>
  ) : (
    <p className={classes.each_comment_wrapper}>No comments for this issue</p>
  );
};

export default Comments;
