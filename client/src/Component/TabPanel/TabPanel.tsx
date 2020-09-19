import React from "react";
import classes from "./TabPanel.module.css";
import { CurrentTabType } from "../../typescript-types/enum/CurrentTabType.enum";

interface IProps {
  currentTab: CurrentTabType;
  setCurrentTab: any;
}

const TabPanel: React.FC<IProps> = ({ currentTab, setCurrentTab }) => {
  console.log("PANEL");
  const tabs = [
    { label: "Pull Requests", representedState: CurrentTabType.PULL_REQUESTS },
    { label: "Open Issues", representedState: CurrentTabType.OPEN_ISSUES },
    { label: "Closed Issues", representedState: CurrentTabType.CLOSED_ISSUES },
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
