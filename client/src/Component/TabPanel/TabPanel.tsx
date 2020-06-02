import React from "react";
import classes from "./TabPanel.module.css";

interface IProps {
  currentTab: "pullRequests" | "openIssues" | "closedIssues";
  setCurrentTab: any;
}

const TabPanel: React.FC<IProps> = ({ currentTab, setCurrentTab }) => {
  console.log("PANEL");
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
      <button
        key={i}
        className={`${isActive ? classes.activeTab : classes.normalTap}`}
        onClick={() => {
          setCurrentTab(el.representedState);
        }}
      >
        {el.label}
      </button>
    );
  });

  return <div className={classes.tapWrapper}>{displayTabs}</div>;
};
export default TabPanel;
