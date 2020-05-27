import { useState } from "react";
// import { getData } from "../service/getData";
import axios from "axios";
interface variables {
  owner: string;
  name: string;
  cursor?: string | null;
  states?: ["OPEN"] | ["CLOSED"];
}

interface skipObj {
  skip: boolean;
}

const useFetch = (path: string, variables: any, shouldBeSkipped?: skipObj) => {
  console.log("USEFETCH");

  const [reposData, setReposData] = useState<any | null>(null);
  const [errorFromGithubApi, setErrorFromGithubApi] = useState<string | null>(
    null
  );
  const [errorFromServer, setErrorFromServer] = useState<string | null>(null);
  //   const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    // setIsLoading(true);
    console.log("before skip");

    if (shouldBeSkipped && shouldBeSkipped.skip) {
      return;
    }

    console.log("FETCHING DATA 1 ");

    const { cursor } = variables;
    let existingData = reposData;

    try {
      // const data = await getData(path, variables);
      const { data } = await axios.post(`${path}`, variables);

      if (!data.repository) {
        //when no data is found
        setErrorFromGithubApi(data.response.errors[0].message);
        setReposData(null);
        setErrorFromServer(null);
        // setIsLoading(false);
        return;
      }
      //when data is successfully fetched
      if (cursor) {
        //when request is loading more data...

        let query = "issues";
        if (path === "/api/pullRequests") {
          query = "pullRequests";
        }

        let existIssues = existingData[query].edges;
        let newIssues = data.repository[query].edges;

        data.repository[query].edges = [...existIssues, ...newIssues];

        setReposData({ ...data.repository });
        setErrorFromGithubApi(null);
        setErrorFromServer(null);
        return;
        //   setIsLoading(false);
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

  return { reposData, errorFromGithubApi, errorFromServer, fetchData };
};

export default useFetch;
