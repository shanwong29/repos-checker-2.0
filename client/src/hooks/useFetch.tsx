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
      const { data } = await axios.post(url, {
        queryType,
        variables,
      });

      if (data.response) {
        //when no data is found
        setErrorFromGithubApi(data.response.errors[0].message);
        setData(null);
        setErrorFromServer(null);
        setFetchMoreResult(null);
        setIsLoading(false);
        return;
      }

      if (data.repository === null) {
        //when requested repository is private
        const { name } = variables as FetchIssuesOrPrVariables;
        setErrorFromGithubApi(
          `Could not resolve to a Repository with the name '${name}'.`
        );
        setData(null);
        setErrorFromServer(null);
        setFetchMoreResult(null);
        setIsLoading(false);
        return;
      }

      // when data successfully retrieved
      setData(data);
      setErrorFromGithubApi(null);
      setErrorFromServer(null);
      setFetchMoreResult(null);
      setIsLoading(false);
    } catch (err) {
      //error from server
      setErrorFromServer(err);
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
      const { data } = await axios.post(url, {
        queryType,
        variables: { ...variables, cursor: cursor },
      });

      if (data.response) {
        //when no data is found
        setErrorFromGithubApi(data.response.errors[0].message);
        setIsLoading(false);
        return;
      }
      //when more data successfully retrived
      setFetchMoreResult({
        previousData: fetchMoreReqObj.previousData,
        newData: data,
      });
      setIsLoading(false);
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
