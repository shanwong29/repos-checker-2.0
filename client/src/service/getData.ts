import axios from "axios";

interface variables {
  owner: string;
  name: string;
  states?: ["OPEN"] | ["CLOSED"];
}

export const getData = async (apiPath: string, variables: variables) => {
  const { data } = await axios.post(`${apiPath}`, variables);

  return data;
};
