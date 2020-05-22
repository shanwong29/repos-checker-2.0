import React, { useState, Fragment } from "react";
import IssueComments from "../Comments/Comments";
import { getFormattedDate } from "../../service/getFormattedDate";
import ReactHtmlParser from "react-html-parser";

import classes from "./Issue.module.css";

interface Iprops {
  issue: any;
}

const Issue: React.FC<Iprops> = ({ issue }) => {
  const [activeIssue, setActiveIssue] = useState<number | null>(null);

  issue = issue.edges.map((el: any, issueIndex: number) => {
    let comments = el.node.comments.edges;
    let issueAuthor = el.node.author.login;
    let issueContent = el.node.bodyHTML;

    let shouldBottomBeRounded = false;
    if (issueIndex === issue.edges.length - 1 && issueIndex !== activeIssue) {
      shouldBottomBeRounded = true;
    }

    return (
      <Fragment key={issueIndex}>
        <div
          className={`${
            shouldBottomBeRounded ? classes.roundedIssue : classes.normalIssue
          }`}
          onClick={() => {
            if (issueIndex === activeIssue) {
              setActiveIssue(null);
            } else {
              setActiveIssue(issueIndex);
            }
          }}
        >
          <span>{issueAuthor} &#8226; </span>
          <span>{getFormattedDate(el.node.createdAt)}</span>

          <h4>{el.node.title}</h4>

          {activeIssue === issueIndex && (
            <div className={classes.issueText}>
              {ReactHtmlParser(issueContent)}
            </div>
          )}
        </div>

        {activeIssue === issueIndex && <IssueComments comments={comments} />}
      </Fragment>
    );
  });
  return <div className={classes.dataWrapper}>{issue}</div>;
};

export default Issue;
