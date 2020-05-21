import React from "react";

const FormattedDate = ({ timeStamp }) => {
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

  let formattedDate = new Date(timeStamp);
  let date = formattedDate.getDate();
  let monthNum = formattedDate.getMonth();
  let month = monthEng[monthNum];
  let year = formattedDate.getFullYear();
  let hh = String(formattedDate.getHours()).padStart(2, "0");
  let mm = String(formattedDate.getMinutes()).padStart(2, "0");

  return (
    <span>
      {date} {month} {year} {`${hh}:${mm}`}
    </span>
  );
};

export default FormattedDate;
