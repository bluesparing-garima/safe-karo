import getLeadByAgentIdAPI from "./getLeadByAgentIdAPI";
import { GetLeadByAgentIdProps } from "../getLeadsTypes";

const getLeadByAgentIdService = async ({
  header,
  partnerId,
}: GetLeadByAgentIdProps) => {
  return getLeadByAgentIdAPI({
    header: header,
    partnerId: partnerId,
  })
    .then((leads) => {
      return leads;
    })
    .catch((response) => {
      console.error(
        `getLeadByAgentIdAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getLeadByAgentIdService;
