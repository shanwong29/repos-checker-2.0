import React from "react";

const PullRequests = props => {
  console.log(props);

  let pullRequests = props.pullRequests.edges.map(el => {
    return (
      <>
        <h4>
          {el.node.title} <span>{el.node.createdAt}</span>
        </h4>
      </>
    );
  });
  return (
    <>
      <h3>Pull Requests</h3>
      {pullRequests}
    </>
  );
};

export default PullRequests;
