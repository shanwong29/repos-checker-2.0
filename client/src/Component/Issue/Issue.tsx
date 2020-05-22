import React, { useState, useEffect, Fragment } from "react";
import IssueComments from "../Comments/Comments";
import AuthorInfo from "../AuthorInfo/AuthorInfo";
import classes from "./Issue.module.css";

interface Iprops {
  issue: any;
}

const Issue: React.FC<Iprops> = ({ issue }) => {
  const [activeIssue, setActiveIssue] = useState<number | null>(null);

  useEffect(() => {
    setActiveIssue(null);
  }, [issue]);

  issue = issue.edges.map((el: any, issueIndex: number) => {
    const comments = el.node.comments.edges;
    const { login, avatarUrl } = el.node.author;
    const issueContent = el.node.bodyHTML;

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
          <AuthorInfo
            authorName={login}
            avatarUrl={avatarUrl}
            timeStamp={el.node.createdAt}
          />

          <h4>{el.node.title}</h4>
        </div>
        {activeIssue === issueIndex && (
          <div
            className={classes.issueText}
            dangerouslySetInnerHTML={{ __html: issueContent }}
          />
        )}

        {activeIssue === issueIndex && <IssueComments comments={comments} />}
      </Fragment>
    );
  });
  return <div className={classes.dataWrapper}>{issue}</div>;
};

export default Issue;
