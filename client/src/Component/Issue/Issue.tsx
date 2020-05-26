import React, { useState, useEffect } from "react";
import IssueComments from "../Comments/Comments";
import AuthorInfo from "../AuthorInfo/AuthorInfo";
import classes from "./Issue.module.css";

interface Iprops {
  issue: any;
}

const Issue: React.FC<Iprops> = ({ issue }) => {
  console.log("ISSUES");
  const [activeIssue, setActiveIssue] = useState<number | null>(null);
  const [showComments, setShowComments] = useState<boolean>(false);

  useEffect(() => {
    setActiveIssue(null);
  }, [issue]);

  issue = issue.edges.map((el: any, issueIndex: number) => {
    const comments = el.node.comments.edges;
    const { login, avatarUrl } = el.node.author;
    const issueContent = el.node.bodyHTML;

    const isActiveIssue = activeIssue === issueIndex;

    return (
      <div key={issueIndex} className={classes.issueWrapper}>
        <AuthorInfo
          authorName={login}
          avatarUrl={avatarUrl}
          timeStamp={el.node.createdAt}
        />
        <div className={classes.issueDetailsWrapper}>
          <h4>{el.node.title}</h4>

          {!isActiveIssue && (
            <button
              className={classes.toggleBtn}
              onClick={() => setActiveIssue(issueIndex)}
            >
              &#8853; Read more
            </button>
          )}

          {isActiveIssue && (
            <>
              <div
                className={classes.issueText}
                dangerouslySetInnerHTML={{ __html: issueContent }}
              />

              {!showComments && (
                <button
                  className={classes.toggleBtn}
                  onClick={() => setShowComments(true)}
                >
                  &#128172; Show Comments
                </button>
              )}

              <IssueComments comments={comments} showComments={showComments} />

              <button
                className={classes.toggleBtn}
                onClick={() => {
                  setActiveIssue(null);
                  setShowComments(false);
                }}
              >
                &#8854; Close
              </button>
            </>
          )}
        </div>
      </div>
    );
  });
  return issue;
};

export default Issue;
