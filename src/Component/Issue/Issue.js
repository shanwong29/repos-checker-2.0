import React, { useState, Fragment } from "react";

const Issue = props => {
  const [activeIssue, setActiveIssue] = useState("");

  let issue = props.issue.edges.map((el, issueIndex) => {
    let comments = el.node.comments.edges;
    let issueAuthor = el.node.author.login;

    let commentsInfo = comments.map((el, key) => {
      let commentAuthor = el.node.author.login;
      return activeIssue === issueIndex ? (
        <Fragment key={key}>
          <div>
            {commentAuthor} {el.node.createdAt}
          </div>
          <p style={{ color: "grey" }}>{el.node.bodyText}</p>
        </Fragment>
      ) : (
        <></>
      );
    });

    return (
      <>
        <div
          onClick={() => {
            if (issueIndex === activeIssue) {
              setActiveIssue(null);
            } else {
              setActiveIssue(issueIndex);
            }
          }}
        >
          <span>
            {issueAuthor}
            {el.node.createdAt}
          </span>
          <h4>{el.node.title}</h4>
        </div>
        {commentsInfo}
      </>
    );
  });
  return <>{issue}</>;
};

export default Issue;
