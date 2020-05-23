import { useEffect, useState } from "react";
import { getData } from "../service/getData";

interface variables {
  owner: string;
  name: string;
  states?: ["OPEN"] | ["CLOSED"];
}

interface skipObj {
  skip: boolean;
}

const useFetch = (
  path: string,
  variables: any,
  reposQuery: any,
  currentTab: any,
  reqCursor: string,
  shouldBeSkipped?: skipObj
) => {
  console.log("USEFETCH");

  const [reposData, setReposData] = useState<any | null>(null);
  const [errorFromGithubApi, setErrorFromGithubApi] = useState<string | null>(
    null
  );
  const [errorFromServer, setErrorFromServer] = useState<string | null>(null);
  //   const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (shouldBeSkipped && shouldBeSkipped.skip) {
      return;
    }

    fetchData();
  }, [reposQuery, currentTab]);

  useEffect(() => {
    if (shouldBeSkipped && shouldBeSkipped.skip) {
      return;
    }
    fetchData2();
  }, [reqCursor]);

  const fetchData = async () => {
    // setIsLoading(true);

    console.log("FETCHING DATA 1 ");

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

  const fetchData2 = async () => {
    // setIsLoading(true);
    console.log("FETCHING DATA 2");

    let newVariable = { ...variables, cursor: reqCursor };

    try {
      const data = await getData(path, newVariable);

      if (!data.repository) {
        setErrorFromGithubApi(data.response.errors[0].message);
        // setReposData(null);
        // setErrorFromServer(null);
        // setIsLoading(false);
        return;
      }

      let oldData = reposData;

      // console.log(oldData, oldData.pullRequests.edges);

      let query = "issues";
      if (currentTab === "pullRequests") {
        query = "pullRequests";
      }

      oldData[query].pageInfo.endCursor =
        data.repository[query].pageInfo.endCursor;

      // console.log(data.repository[query].pageInfo.hasNextPage);

      let pullReqArr = oldData[query].edges;
      let newData = data.repository;
      let newPullReqArr = newData[query].edges;

      // console.log(pullReqArr, newPullReqArr);

      oldData[query].edges = [...pullReqArr, ...newPullReqArr];

      // console.log(oldData, "?");

      setReposData({ ...oldData });
      setErrorFromGithubApi(null);
      setErrorFromServer(null);
      //   setIsLoading(false);
    } catch (err) {
      //error from server
      console.log(err);
      setErrorFromServer(err);
      // setReposData(null);
      //   setIsLoading(false);
    }
  };

  //   return { reposData, errorFromGithubApi, errorFromServer, isLoading };
  return { reposData, errorFromGithubApi, errorFromServer };
};

export default useFetch;
