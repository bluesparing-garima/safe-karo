import getCaseTypeDetailsAPI from "./getCaseTypeDetailsAPI";
import { GetCaseTypeDetailsProps } from "../getCaseTypes";
import convertICaseTypeToICaseTypeVM from "../convertICaseTypetoICaseTypeVM";

const getCaseTypeDetailsService = async ({
  header,
    caseTypeId,
}: GetCaseTypeDetailsProps) => {
  return getCaseTypeDetailsAPI({
    header: header,
    caseTypeId: caseTypeId,
  })
    .then((CaseTypeRecord) => {
      const caseTypes = convertICaseTypeToICaseTypeVM(CaseTypeRecord.data);
      return caseTypes;
    })
    .catch((response) => {
      console.error(
        `getCaseTypeDetailsAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getCaseTypeDetailsService;
