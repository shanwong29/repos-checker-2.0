import { useEffect, useState } from "react";
import { getData } from "../service/getData";

// interface repository {
//   name: string;
//   owner: string;
//   pullRequests?: any;
//   issues?: any;
// }

const useFetch = (
  reposQuery: string,
  currentTab: "pullRequests" | "openIssues" | "closedIssues"
) => {
  const [reposData, setReposData] = useState<any | null>(null);
  const [errorFromGithubApi, setErrorFromGithubApi] = useState<string | null>(
    null
  );
  const [errorFromServer, setErrorFromServer] = useState<string | null>(null);
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
      setErrorFromServer(null);
      setErrorFromGithubApi(
        "Please provide owner and name of the selected repository."
      );
      return;
    }

    interface variables {
      owner: string;
      name: string;
      states?: ["OPEN"] | ["CLOSED"];
    }
    let variables: variables = { name, owner };
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

  interface variables {
    owner: string;
    name: string;
    states?: ["OPEN"] | ["CLOSED"];
  }

  const fetchData = async (path: string, variables: variables) => {
    // setIsLoading(true);
    try {
      const data = await getData(path, variables);

      if (!data.repository) {
        setErrorFromGithubApi(data.response.errors[0].message);
        setReposData(null);
        setErrorFromServer(null);
        // setIsLoading(false);
        return;
      }
      setReposData(data.repository);
      setErrorFromGithubApi(null);
      setErrorFromServer(null);
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
