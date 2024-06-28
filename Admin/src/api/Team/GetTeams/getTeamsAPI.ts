import { getTeamEndpoint as endpoint } from "../apiEndpoints";
import { GetTeamProps } from "../getTeamsTypes";

const getTeamsAPI = async ({ header }: GetTeamProps) => {
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

export default getTeamsAPI;
