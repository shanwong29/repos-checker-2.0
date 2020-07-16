import { useState } from "react";
import axios from "axios";
import { config } from "../constants";

const url = config.url.API_URL;

interface FetchIssuesOrPrVariables {
  owner: string;
  name: string;
  states?: any;
}

interface FetchCommentsVariables {
  ID: string;
}

interface useFetchReqObj {
  queryType: string;
  variables: FetchIssuesOrPrVariables | FetchCommentsVariables;
  skip: boolean;
}

const useFetch = (useFetchReqObj: useFetchReqObj) => {
  console.log("USEFETCH");
  const { queryType, variables, skip } = useFetchReqObj;

  const [data, setData] = useState<any | null>(null);
  const [errorFromGithubApi, setErrorFromGithubApi] = useState<string | null>(
    null
  );
  const [errorFromServer, setErrorFromServer] = useState<string | null>(null);
  const [fetchMoreResult, setFetchMoreResult] = useState<any | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    if (skip) {
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(url, {
        queryType,
        variables,
      });
      setIsLoading(false);

      if (res.data.response) {
        //when no data is found
        setErrorFromGithubApi(res.data.response.errors[0].message);
        setData(null);
        setErrorFromServer(null);
        setFetchMoreResult(null);
        return;
      }

      if (res.data.repository === null) {
        //when requested repository is private
        const { name } = variables as FetchIssuesOrPrVariables;
        setErrorFromGithubApi(
          `Could not resolve to a Repository with the name '${name}'.`
        );
        setData(null);
        setErrorFromServer(null);
        setFetchMoreResult(null);
        return;
      }

      // when data successfully retrieved
      setData(res.data);
      setErrorFromGithubApi(null);
      setErrorFromServer(null);
      setFetchMoreResult(null);
    } catch (err) {
      //error from server
      setErrorFromServer(err);
      setErrorFromGithubApi(null);
      setFetchMoreResult(null);
      setData(null);
      setIsLoading(false);
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
      setIsLoading(true);
      const res = await axios.post(url, {
        queryType,
        variables: { ...variables, cursor: cursor },
      });

      setIsLoading(false);

      if (res.data.response) {
        //when no data is found
        setErrorFromGithubApi(res.data.response.errors[0].message);
        return;
      }
      //when more data successfully retrived
      else {
        setFetchMoreResult({
          previousData: fetchMoreReqObj.previousData,
          newData: res.data,
        });
        return;
      }
    } catch (err) {
      //error from server
      setErrorFromServer(err);
      setIsLoading(false);
    }
  };

  return {
    data,
    errorFromGithubApi,
    errorFromServer,
    fetchData,
    fetchMore,
    fetchMoreResult,
    isLoading,
  };
};

export default useFetch;
