import React, { useState, Fragment } from "react";
import classes from "./App.module.css";

import Issue from "./Component/Issue/Issue";
import TabPanel from "./Component/TabPanel/TabPanel";
import ReposQueryForm from "./Component/ReposQueryForm/ReposQueryForm";
import useFetch from "./hooks/useFetch";

const App = () => {
  const [currentTab, setCurrentTab] = useState("pullRequests");
  const [reposQuery, setReposQuery] = useState("");
  const {
    reposData,
    errorFromGithubApi,
    errorFromServer,
    // isLoading,
  } = useFetch(reposQuery, currentTab);

  let displayData;
  if (reposData) {
    const { issues, pullRequests } = reposData;
    displayData = issues || pullRequests;
  }

  if (errorFromServer) {
    return <h1>Something goes wrong!</h1>;
  }

  return (
    <div className={classes.App}>
      <h1 className={classes.app_title}>Repos Checker</h1>
      <ReposQueryForm setReposQuery={setReposQuery} />
      <div className={classes.reposInfo}>
        {/* {isLoading && <p>loading...</p>} */}
        {errorFromGithubApi && <p>{errorFromGithubApi}</p>}
        {reposData && (
          <Fragment>
            <h1>{reposData.name}</h1>
            <TabPanel currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <Issue issue={displayData} />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default App;
