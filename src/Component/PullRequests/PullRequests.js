import React from "react";

const PullRequests = props => {
  console.log(props);

  let pullRequests = props.pullRequests.edges.map(el => {
    let author = el.node.author.login;
    return (
      <>
        <span>{author}</span>
        <span>{el.node.createdAt}</span>
        <h4>{el.node.title}</h4>
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
