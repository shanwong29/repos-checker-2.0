import React, { useState } from "react";
import FormattedDate from "../../Component/FormattedDate/FormattedDate";
import classes from "./IssueComments.module.css";

const IssueComments = ({ comments }) => {
  const [commentQuery, setCommentQuery] = useState("");

  let filteredComments = comments.filter(el => {
    return el.node.bodyText.includes(commentQuery);
  });

  filteredComments = filteredComments.map((el, key) => {
    let commentAuthor = el.node.author.login;
    return (
      <div className={classes.each_comment_wrapper} key={key}>
        <span>{commentAuthor} &#8226; </span>
        <FormattedDate timeStamp={el.node.createdAt} />

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
        onChange={event => setCommentQuery(event.target.value)}
      />
      {filteredComments}
    </div>
  ) : (
    <p className={classes.each_comment_wrapper}>No comments for this issue</p>
  );
};

export default IssueComments;
