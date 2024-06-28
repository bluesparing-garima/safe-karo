import { getMakeDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetMakeDetailsProps } from "../getMakesTypes";

const getMakeDetailsAPI = async ({ header, makeId }: GetMakeDetailsProps) => {
  return fetch(endpoint(makeId!), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getMakeDetailsAPI;
