import editLeadAPI from "./editLeadAPI";
import { AddEditLeadsProps } from "../getLeadsTypes";

const editLeadService = async ({ header, lead }: AddEditLeadsProps) => {
  return editLeadAPI({
    header,
    lead,
  })
    .then((leadRecord) => {
      return leadRecord;
    })
    .catch((response) => {
      console.error(`editLeadAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default editLeadService;
