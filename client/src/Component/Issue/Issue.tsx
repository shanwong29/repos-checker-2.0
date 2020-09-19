import React, { useState, useEffect } from "react";
import Comments from "../Comments/Comments";
import AuthorInfo from "../AuthorInfo/AuthorInfo";
import classes from "./Issue.module.css";
import {
  IssueEdge,
  Actor,
  PullRequestEdge,
} from "../../typescript-types/generated/graphql";

interface Iprops {
  issueEdge: Array<IssueEdge | PullRequestEdge>;
}

const Issue: React.FC<Iprops> = ({ issueEdge }) => {
  console.log("ISSUES");
  const [activeIssue, setActiveIssue] = useState<number | null>(null);
  const [showComments, setShowComments] = useState<boolean>(false);

  useEffect(() => {
    setActiveIssue(null);
  }, [issueEdge]);

  const issueJsx = issueEdge.map((el, issueIndex: number) => {
    const numOfComments: number = el.node?.comments.totalCount || 0;

    const { login, avatarUrl } = el.node?.author as Actor;
    const issueContent = el.node?.bodyHTML;

    const isActiveIssue = activeIssue === issueIndex;

    return (
      <div key={issueIndex} className={classes.issueWrapper}>
        <AuthorInfo
          authorName={login || ""}
          avatarUrl={avatarUrl || ""}
          timeStamp={el.node?.createdAt || ""}
        />
        <div className={classes.issueDetailsWrapper}>
          <h4>{el.node?.title}</h4>

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

              {showComments && <Comments ID={el.node?.id as string} />}

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

  return <React.Fragment>{issueJsx}</React.Fragment>;
};

export default Issue;
