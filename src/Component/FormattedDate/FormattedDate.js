import React from "react";

const FormattedDate = props => {
  let monthEng = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec"
  };

  let formattedDate = new Date(props.date);
  let date = formattedDate.getDate();
  let monthNum = formattedDate.getMonth();
  let month = monthEng[monthNum];
  let year = formattedDate.getFullYear();
  let time = props.date.slice(11, 16);

  return (
    <span>
      {date} {month} {year} {time}
    </span>
  );
};

export default FormattedDate;
