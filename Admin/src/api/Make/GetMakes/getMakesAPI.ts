import { getMakeEndpoint as endpoint } from "../apiEndpoints";
import { GetMakeProps } from "../getMakesTypes";

const getMakesAPI = async ({ header }: GetMakeProps) => {
  return fetch(endpoint(), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getMakesAPI;
