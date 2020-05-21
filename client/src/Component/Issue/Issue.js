import React, { useState, Fragment } from "react";
import IssueComments from "../IssueComments/IssueComments";
import FormattedDate from "../FormattedDate/FormattedDate";

import classes from "./Issue.module.css";

const Issue = ({ issue }) => {
  const [activeIssue, setActiveIssue] = useState("");

  issue = issue.edges.map((el, issueIndex) => {
    let comments = el.node.comments.edges;
    let issueAuthor = el.node.author.login;
    let issueText = el.node.bodyText;

    return (
      <Fragment key={issueIndex}>
        <div
          className={`info_wrapper ${classes.issue}`}
          onClick={() => {
            if (issueIndex === activeIssue) {
              setActiveIssue(null);
            } else {
              setActiveIssue(issueIndex);
            }
          }}
        >
          <span>{issueAuthor} &#8226; </span>
          <FormattedDate timeStamp={el.node.createdAt} />

          <h4>{el.node.title}</h4>

          {activeIssue === issueIndex && (
            <p className={classes.issue_text}>{issueText}</p>
          )}
        </div>

        {activeIssue === issueIndex && (
          <IssueComments comments={comments} issueAuthor={issueAuthor} />
        )}
      </Fragment>
    );
  });
  return <>{issue}</>;
};

export default Issue;
