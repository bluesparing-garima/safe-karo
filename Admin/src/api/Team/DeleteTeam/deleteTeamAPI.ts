import { deleteTeamEndpoint as endpoint } from "../apiEndpoints";
import { DeleteTeamProps } from "../getTeamsTypes";

const deleteTeamAPI = async ({ header, teamId }: DeleteTeamProps) => {
  return fetch(endpoint(teamId!), {
    method: "DELETE",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default deleteTeamAPI;
