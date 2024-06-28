import getRMListAPI from "./getRMListAPI";
import { GetRMListProps } from "../getTeamsTypes";

const getRMListService = async ({ header, role }: GetRMListProps) => {
  return getRMListAPI({
    header: header,
    role: role,
  })
    .then((rmRecord) => {
      return rmRecord;
    })
    .catch((response) => {
      console.error(
        `getRMListAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getRMListService;
