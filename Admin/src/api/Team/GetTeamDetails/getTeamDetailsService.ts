import getTeamDetailsAPI from "./getTeamDetailsAPI";
import { GetTeamDetailsProps } from "../getTeamsTypes";
import convertITeamToITeamVM from "../convertITeamToITeamVM";

const getTeamDetailsService = async ({
  header,
  teamId,
}: GetTeamDetailsProps) => {
  return getTeamDetailsAPI({
    header: header,
    teamId: teamId,
  })
    .then((teamRecord) => {
      const teams = convertITeamToITeamVM(teamRecord.data);
      return teams;
    })
    .catch((response) => {
      console.error(
        `getTeamDetailsAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getTeamDetailsService;
