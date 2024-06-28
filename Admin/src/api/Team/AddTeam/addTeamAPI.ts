import { addTeamEndpoint as endpoint } from "../apiEndpoints";
import { AddEditTeamProps } from "../getTeamsTypes";

const addTeamAPI = async ({ header, team }: AddEditTeamProps) => {
  return fetch(endpoint(), {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...team,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default addTeamAPI;
