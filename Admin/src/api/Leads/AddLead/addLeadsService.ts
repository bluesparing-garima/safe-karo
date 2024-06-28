import addLeadsAPI from "./addLeadsAPI";
import { AddEditLeadsProps } from "../getLeadsTypes";

const addLeadsService = async ({ header, lead }: AddEditLeadsProps) => {
  return addLeadsAPI({
    header: header,
    lead: lead,
  })
    .then((newLead) => {
      return newLead;
    })
    .catch((response) => {
      console.error(`addLeadsAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default addLeadsService;
