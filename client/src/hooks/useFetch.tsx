import { useState } from "react";
import axios from "axios";

interface FetchIssuesOrPrVariables {
  owner: string;
  name: string;
  states?: any;
}

interface FetchCommentsVariables {
  ID: string;
}

interface useFetchReqObj {
  query: string;
  variables: FetchIssuesOrPrVariables | FetchCommentsVariables;
  skip: boolean;
}

const useFetch = (useFetchReqObj: useFetchReqObj) => {
  console.log("USEFETCH");
  const { query, variables, skip } = useFetchReqObj;

  const [data, setData] = useState<any | null>(null);
  const [errorFromGithubApi, setErrorFromGithubApi] = useState<string | null>(
    null
  );
  const [errorFromServer, setErrorFromServer] = useState<string | null>(null);
  const [fetchMoreResult, setFetchMoreResult] = useState<any | null>(null);

  const fetchData = async () => {
    if (skip) {
      return;
    }

    try {
      const { data } = await axios.post(`/api`, {
        query,
        variables,
      });

      if (data.response) {
        //when no data is found
        setErrorFromGithubApi(data.response.errors[0].message);
        setData(null);
        setErrorFromServer(null);
        setFetchMoreResult(null);
        return;
      }

      // when data successfully retrieved
      setData(data);
      setErrorFromGithubApi(null);
      setErrorFromServer(null);
      setFetchMoreResult(null);
    } catch (err) {
      //error from server
      setErrorFromServer(err);
      setData(null);
    }
  };

  interface FetchMoreReqObj {
    previousData: any;
    cursor: any;
  }

  const fetchMore = async (fetchMoreReqObj: FetchMoreReqObj) => {
    if (skip) {
      return;
    }

    const { cursor } = fetchMoreReqObj;

    try {
      const { data } = await axios.post(`/api`, {
        query,
        variables: { ...variables, cursor: cursor },
      });

      if (data.response) {
        //when no data is found
        setErrorFromGithubApi(data.response.errors[0].message);
        return;
      }
      //when more data successfully retrived
      setFetchMoreResult({
        previousData: fetchMoreReqObj.previousData,
        newData: data,
      });
    } catch (err) {
      //error from server
      setErrorFromServer(err);
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
