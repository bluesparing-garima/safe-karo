import getLeadByIdAPI from "./getLeadByIdAPI";
import { GetLeadByIdProps } from "../getLeadsTypes";

const getLeadByIdService = async ({ header, leadId }: GetLeadByIdProps) => {
  return getLeadByIdAPI({
    header: header,
    leadId: leadId,
  })
    .then((leads) => {
      return leads;
    })
    .catch((response) => {
      console.error(
        `getLeadByIdAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getLeadByIdService;
