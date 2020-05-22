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
      <img src={avatarUrl} alt={authorName} className={classes.profilePic} />
      <strong>{authorName} &#8226; </strong>
      <span>{getFormattedDate(timeStamp)}</span>
    </>
  );
};

export default AuthorBasicInfo;
