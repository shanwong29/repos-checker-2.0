import React, { useState, Fragment } from "react";

const Issue = props => {
  const [activeComment, setActiveComment] = useState("");

  let issue = props.issue.edges.map((el, issueIndex) => {
    let comments = el.node.comments.edges;

    let commentsInfo = comments.map((el, key) => {
      return activeComment === issueIndex ? (
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
        <h4
          onClick={() => {
            if (issueIndex === activeComment) {
              setActiveComment(null);
            } else {
              setActiveComment(issueIndex);
            }
          }}
        >
          Issue Title:
          {el.node.title} <span>{el.node.createdAt}</span>
        </h4>
        {commentsInfo}
      </>
    );
  });
  return <>{issue}</>;
};

export default Issue;
