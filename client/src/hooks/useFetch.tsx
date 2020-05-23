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
  dependecies: any,
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
  }, [...dependecies]);

  const fetchData = async () => {
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
