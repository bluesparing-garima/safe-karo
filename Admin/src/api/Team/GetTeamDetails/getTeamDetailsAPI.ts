import { getTeamDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetTeamDetailsProps } from "../getTeamsTypes";

const getTeamDetailsAPI = async ({ header, teamId }: GetTeamDetailsProps) => {
  return fetch(endpoint(teamId!), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getTeamDetailsAPI;
