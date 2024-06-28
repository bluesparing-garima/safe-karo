import editTeamAPI from "./editTeamAPI";
import { AddEditTeamProps } from "../getTeamsTypes";

const editTeamService = async ({ header, team }: AddEditTeamProps) => {
  return editTeamAPI({
    header,
    team,
  })
    .then((teamRecord) => {
      return teamRecord;
    })
    .catch((response) => {
      console.error(`editTeamAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default editTeamService;
