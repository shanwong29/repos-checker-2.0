import React from "react";
import FormattedDate from "../FormattedDate/FormattedDate";

const PullRequests = props => {
  console.log(props);

  let pullRequests = props.pullRequests.edges.map(el => {
    let author = el.node.author.login;
    return (
      <>
        <span>{author} &#8226; </span>
        <FormattedDate date={el.node.createdAt} />
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
