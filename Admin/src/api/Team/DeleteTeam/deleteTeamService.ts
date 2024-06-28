import deleteTeamAPI from "./deleteTeamAPI";
import { DeleteTeamProps } from "../getTeamsTypes";

const deleteTeamService = async ({
  header,
  teamId,
  teams,
}: DeleteTeamProps) => {
  return deleteTeamAPI({
    header,
    teamId,
    teams,
  })
    .then(() => {
      const deletedTeamIndex = teams.findIndex((team) => team._id === teamId);
      //Remove this Why becasue i dont want to call Get API in display layer
      teams.splice(deletedTeamIndex, 1);
      return teams;
    })
    .catch((response) => {
      console.error(
        `deleteTeamAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default deleteTeamService;
