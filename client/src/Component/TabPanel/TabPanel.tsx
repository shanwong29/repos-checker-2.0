import React from "react";
import classes from "./TabPanel.module.css";

interface IProps {
  currentTab: any;
  setCurrentTab: any;
}

const TabPanel: React.FC<IProps> = ({ currentTab, setCurrentTab }) => {
  const tabs = [
    { label: "Pull Requests", representedState: "pullRequests" },
    { label: "Open Issues", representedState: "openIssues" },
    { label: "Closed Issues", representedState: "closedIssues" },
  ];

  const displayTabs = tabs.map((el, i) => {
    let isActive = false;
    if (el.representedState === currentTab) {
      isActive = true;
    }

    return (
      <h4
        className={`${classes.tap} ${isActive && classes.active_tab}`}
        onClick={() => {
          setCurrentTab(el.representedState);
        }}
      >
        {el.label}
      </h4>
    );
  });

  return <div className={classes.tap_wrapper}>{displayTabs}</div>;
};
export default TabPanel;
