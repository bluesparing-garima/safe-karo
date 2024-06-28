import addTeamAPI from "./addTeamAPI";
import { AddEditTeamProps } from "../getTeamsTypes";

const addTeamService = async ({ header, team }: AddEditTeamProps) => {
  return addTeamAPI({
    header: header,
    team: team,
  })
    .then((newTeam) => {
      return newTeam;
    })
    .catch((response) => {
      console.error(`addTeamAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default addTeamService;
