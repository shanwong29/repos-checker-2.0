import axios from "axios";

export const getData = async (apiPath, object) => {
  const response = await axios.post(`${apiPath}`, object);

  console.log(response, "aciox");

  return response.data;
};
