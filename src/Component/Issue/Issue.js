import React, { useState } from "react";
import IssueComments from "../IssueComments/IssueComments";
import FormattedDate from "../FormattedDate/FormattedDate";

const Issue = props => {
  const [activeIssue, setActiveIssue] = useState("");

  let issue = props.issue.edges.map((el, issueIndex) => {
    let comments = el.node.comments.edges;
    let issueAuthor = el.node.author.login;

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
          <span>{issueAuthor} &#8226; </span>
          <FormattedDate date={el.node.createdAt} />

          <h4>{el.node.title}</h4>
        </div>
        {activeIssue === issueIndex ? (
          <IssueComments comments={comments} issueAuthor={issueAuthor} />
        ) : (
          <></>
        )}
      </>
    );
  });
  return <>{issue}</>;
};

export default Issue;
