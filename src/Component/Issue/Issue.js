import React, { useState, Fragment } from "react";

const Issue = props => {
  const [activeIssue, setActiveIssue] = useState("");

  let issue = props.issue.edges.map((el, issueIndex) => {
    let comments = el.node.comments.edges;

    let commentsInfo = comments.map((el, key) => {
      return activeIssue === issueIndex ? (
        <Fragment key={key}>
          <p style={{ color: "grey" }}>
            {el.node.bodyText} <span>{el.node.createdAt}</span>
          </p>
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
          <span>{el.node.createdAt}</span>
          <h4>{el.node.title}</h4>
        </div>
        {commentsInfo}
      </>
    );
  });
  return <>{issue}</>;
};

export default Issue;
