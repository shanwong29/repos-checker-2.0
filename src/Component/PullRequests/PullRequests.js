import React from "react";
import FormattedDate from "../FormattedDate/FormattedDate";

const PullRequests = ({ pullRequests }) => {
  pullRequests = pullRequests.edges.map((el, index) => {
    let author = el.node.author.login;
    return (
      <div className="info_wrapper" key={index}>
        <span>{author} &#8226; </span>
        <FormattedDate timeStamp={el.node.createdAt} />
        <h4>{el.node.title}</h4>
      </div>
    );
  });
  return pullRequests;
};

export default PullRequests;
