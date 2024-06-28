import getTeamsAPI from "./getTeamsAPI";
import { GetTeamProps } from "../getTeamsTypes";

const getTeamService = async ({ header }: GetTeamProps) => {
  return getTeamsAPI({
    header: header,
  })
    .then((teams) => {
      return teams;
    })
    .catch((response) => {
      console.error(`getTeamsAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default getTeamService;
