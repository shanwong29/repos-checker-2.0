import React, { Fragment } from "react";

const IssueComments = props => {
  let commentsInfo = props.comments.map((el, key) => {
    let commentAuthor = el.node.author.login;
    return (
      <Fragment key={key}>
        <div>
          {commentAuthor} {el.node.createdAt}
        </div>
        <p style={{ color: "grey" }}>{el.node.bodyText}</p>
      </Fragment>
    );
  });

  return commentsInfo;
};

export default IssueComments;
