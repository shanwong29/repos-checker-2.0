import React from "react";
import { getFormattedDate } from "../../service/getFormattedDate";
import classes from "./AuthorInfo.module.css";

interface IProps {
  authorName: any;
  avatarUrl: any;
  timeStamp: any;
}

const AuthorBasicInfo: React.FC<IProps> = ({
  authorName,
  avatarUrl,
  timeStamp,
}) => {
  return (
    <>
      <a
        className={classes.link}
        href={`https://github.com/${authorName}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={avatarUrl} alt={authorName} className={classes.profilePic} />
        <strong>{authorName}</strong>
      </a>
      <span> &#8226; {getFormattedDate(timeStamp)}</span>
    </>
  );
};

export default AuthorBasicInfo;
