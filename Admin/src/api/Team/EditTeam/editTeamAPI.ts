import { editTeamEndpoint as endpoint } from "../apiEndpoints";
import { AddEditTeamProps } from "../getTeamsTypes";

const editTeamAPI = async ({ header, team }: AddEditTeamProps) => {
  return fetch(endpoint(team.id!), {
    method: "PUT",
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

export default editTeamAPI;
