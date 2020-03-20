import React, { Fragment, useState } from "react";
import FormattedDate from "../FormattedDate/FormattedDate";

const IssueComments = props => {
  const [commentQuery, setCommentQuery] = useState("");

  let filteredComments = props.comments.filter(el => {
    return el.node.bodyText.includes(commentQuery);
  });

  filteredComments = filteredComments.map((el, key) => {
    let commentAuthor = el.node.author.login;
    return (
      <Fragment key={key}>
        <div>
          <span>{commentAuthor} &#8226; </span>
          <FormattedDate date={el.node.createdAt} />
        </div>
        <p style={{ color: "grey" }}>{el.node.bodyText}</p>
      </Fragment>
    );
  });

  return props.comments.length ? (
    <>
      <label for="commentQuery">Filter comments by keyword(s): </label>
      <input
        name="commentQuery"
        type="text"
        placeholder="type keyword(s) here..."
        value={commentQuery}
        onChange={event => setCommentQuery(event.target.value)}
      />
      {filteredComments}
    </>
  ) : (
    <h5>No comments for this issue</h5>
  );
};

export default IssueComments;
