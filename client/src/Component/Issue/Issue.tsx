import React, { useState, useEffect } from "react";
import Comments from "../Comments/Comments";
import AuthorInfo from "../AuthorInfo/AuthorInfo";
import classes from "./Issue.module.css";

interface Iprops {
  issue: any;
}

const Issue: React.FC<Iprops> = ({ issue }) => {
  console.log("Issue, ", issue);
  console.log("ISSUES");
  const [activeIssue, setActiveIssue] = useState<number | null>(null);
  const [showComments, setShowComments] = useState<boolean>(false);

  useEffect(() => {
    setActiveIssue(null);
  }, [issue]);

  console.log(issue.totalCount);

  issue = issue.edges.map((el: any, issueIndex: number) => {
    // const comments = el.node.comments.edges;
    const numOfComments = el.node.comments.totalCount;

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
              onClick={() => {
                setActiveIssue(issueIndex);
                setShowComments(false);
              }}
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

              {showComments && <Comments ID={el.node.id} />}

              <div className={classes.btnWrapper}>
                {!showComments && (
                  <>
                    <button
                      className={
                        numOfComments
                          ? classes.toggleBtn
                          : classes.toggleBtnDisabled
                      }
                      onClick={() => setShowComments(true)}
                      disabled={!numOfComments}
                    >
                      &#128172; Comments ({numOfComments})
                    </button>
                    |
                  </>
                )}

                <button
                  className={classes.toggleBtn}
                  onClick={() => {
                    setActiveIssue(null);
                    setShowComments(false);
                  }}
                >
                  &#8854; Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  });
  return issue;
};

export default Issue;
