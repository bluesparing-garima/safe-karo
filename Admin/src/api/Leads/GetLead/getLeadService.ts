import getLeadAPI from "./getLeadAPI";
import { GetLeadsProps } from "../getLeadsTypes";

const getLeadService = async ({ header }: GetLeadsProps) => {
  return getLeadAPI({
    header: header,
  })
    .then((leads) => {
      return leads;
    })
    .catch((response) => {
      console.error(
        `getLeadAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getLeadService;
