import React, { useEffect, useState } from "react";
import { getData } from "../service/getData";

const useFetch = (reposQuery, currentTab) => {
  const [reposData, setReposData] = useState(null);
  const [errorFromGithubApi, setErrorFromGithubApi] = useState("");
  const [errorFromServer, setErrorFromServer] = useState("");
  //   const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!reposQuery) {
      return;
    }

    let owner;
    let name;
    const query = reposQuery.split("/");
    owner = query[0] && query[0].trim();
    name = query[1] && query[1].trim();

    if (!owner || !name) {
      setReposData(null);
      setErrorFromServer("");
      setErrorFromGithubApi(
        "Please provide owner and name of the selected repository."
      );
      return;
    }

    let variables = { name, owner };
    if (currentTab === "openIssues") {
      variables = { name, owner, states: ["OPEN"] };
    } else if (currentTab === "closedIssues") {
      variables = { name, owner, states: ["CLOSED"] };
    }

    let path = `/api/pullRequests`;
    if (currentTab !== "pullRequests") {
      path = `/api/issues`;
    }
    fetchData(path, variables);
  }, [reposQuery, currentTab]);

  const fetchData = async (path, variables) => {
    // setIsLoading(true);
    try {
      const response = await getData(path, variables);

      if (!response.repository) {
        setErrorFromGithubApi(response.response.errors[0].message);
        setReposData(null);
        setErrorFromServer("");
        // setIsLoading(false);
        return;
      }
      setReposData(response.repository);
      setErrorFromGithubApi("");
      setErrorFromServer("");
      //   setIsLoading(false);
    } catch (err) {
      //error from server
      setErrorFromServer(err);
      setReposData(null);
      //   setIsLoading(false);
    }
  };

  //   return { reposData, errorFromGithubApi, errorFromServer, isLoading };
  return { reposData, errorFromGithubApi, errorFromServer };
};

export default useFetch;
