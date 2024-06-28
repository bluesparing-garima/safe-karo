import editCaseTypeAPI from "./editCaseTypeAPI";
import { AddEditCaseTypeProps } from "../getCaseTypes";

const editCaseTypeService = async ({ header, caseType }: AddEditCaseTypeProps) => {
  return editCaseTypeAPI({
    header,
    caseType,
  })
    .then((caseTypeRecord) => {
      return caseTypeRecord;
    })
    .catch((response) => {
      console.error(`editCaseTypeAPI failed with HTTP status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default editCaseTypeService;
