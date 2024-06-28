import getLeadByUserIdAPI from "./getLeadByUserIdAPI";
import { GetLeadByUserIdProps } from "../getLeadsTypes";

const getLeadByUserIdService = async ({
  header,
  userId,
}: GetLeadByUserIdProps) => {
  return getLeadByUserIdAPI({
    header: header,
    userId: userId,
  })
    .then((leads) => {
      return leads;
    })
    .catch((response) => {
      console.error(
        `getLeadByUserIdAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getLeadByUserIdService;
