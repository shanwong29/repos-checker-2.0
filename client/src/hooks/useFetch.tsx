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

  const [data, setData] = useState<any | null>(null);
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
    let existingData = data;

    try {
      // const data = await getData(path, variables);
      const { data } = await axios.post(`${path}`, variables);
      console.log("result", data);
      if (data.response) {
        //when no data is found
        setErrorFromGithubApi(data.response.errors[0].message);
        setData(null);
        setErrorFromServer(null);
        // setIsLoading(false);
        return;
      }
      //when data is successfully fetched
      // if (cursor) {
      //   //when request is loading more data...

      //   let query = "issues";
      //   if (path === "/api/pullRequests") {
      //     query = "pullRequests";
      //   }

      //   let existIssues = existingData.repository[query].edges;
      //   let newIssues = data.repository[query].edges;

      //   data.repository[query].edges = [...existIssues, ...newIssues];

      //   setData(data);
      //   setErrorFromGithubApi(null);
      //   setErrorFromServer(null);
      //   return;
      //   //   setIsLoading(false);
      // }
      setData(data);
      setErrorFromGithubApi(null);
      setErrorFromServer(null);
      //   setIsLoading(false);
    } catch (err) {
      //error from server
      setErrorFromServer(err);
      setData(null);
      //   setIsLoading(false);
    }
  };

  interface objReq {
    previousData: any;
  }

  const fetchMore = async (objReq: objReq) => {
    // setIsLoading(true);
    if (shouldBeSkipped && shouldBeSkipped.skip) {
      return;
    }

    console.log("useFetchmore ", objReq.previousData);

    console.log("FETCHING more ");

    const { cursor } = variables;
    let existingData = data;

    try {
      const { data } = await axios.post(`${path}`, variables);
      console.log("result", data);
      if (data.response) {
        //   //when no data is found
        setErrorFromGithubApi(data.response.errors[0].message);
        //   // setIsLoading(false);
        return;
      }
      //when more data is successfully fetched
      let query = "issues";
      if (path === "/api/pullRequests") {
        query = "pullRequests";
      }

      let existIssues = existingData.repository[query].edges;
      let newIssues = data.repository[query].edges;

      data.repository[query].edges = [...existIssues, ...newIssues];

      setData(data);
      setErrorFromGithubApi(null);
      setErrorFromServer(null);
      //   setIsLoading(false);
      return;
    } catch (err) {
      //error from server
      setErrorFromServer(err);
      // setData(null);
      //   setIsLoading(false);
    }
  };

  return { data, errorFromGithubApi, errorFromServer, fetchData, fetchMore };
};

export default useFetch;
