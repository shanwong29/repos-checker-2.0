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
  const [fetchMoreResult, setFetchMoreResult] = useState<any | null>(null);
  //   const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    // setIsLoading(true);
    console.log("before skip");

    if (shouldBeSkipped && shouldBeSkipped.skip) {
      return;
    }

    console.log("FETCHING DATA 1 ");

    try {
      const { data } = await axios.post(`${path}`, variables);

      if (data.response) {
        //when no data is found
        setErrorFromGithubApi(data.response.errors[0].message);
        setData(null);
        setErrorFromServer(null);
        setFetchMoreResult(null);
        // setIsLoading(false);
        return;
      }

      setData(data);
      setErrorFromGithubApi(null);
      setErrorFromServer(null);
      setFetchMoreResult(null);
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
    cursor: any;
  }

  const fetchMore = async (objReq: objReq) => {
    // setIsLoading(true);
    if (shouldBeSkipped && shouldBeSkipped.skip) {
      return;
    }

    console.log("useFetchmore ", objReq.previousData);

    const { cursor } = objReq;

    try {
      const { data } = await axios.post(`${path}`, {
        ...variables,
        cursor: cursor,
      });

      if (data.response) {
        //when no data is found
        setErrorFromGithubApi(data.response.errors[0].message);
        // setIsLoading(false);
        return;
      }
      //when more data successfully retrived
      setFetchMoreResult({ previousData: objReq.previousData, newData: data });
    } catch (err) {
      //error from server
      setErrorFromServer(err);
      // setData(null);
      //   setIsLoading(false);
    }
  };

  return {
    data,
    errorFromGithubApi,
    errorFromServer,
    fetchData,
    fetchMore,
    fetchMoreResult,
  };
};

export default useFetch;
