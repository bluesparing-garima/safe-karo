// getCaseTypeService.ts

import getCaseTypesAPI from "./getCaseTypesAPI";
import { GetCaseTypeProps } from "../getCaseTypes";

const getCaseTypeService = async ({ header }: GetCaseTypeProps) => {
  return getCaseTypesAPI({
    header,
  })
    .then((caseTypes) => {
      return caseTypes;
    })
    .catch((response) => {
      console.error(`getCaseTypesAPI failed with HTTP status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default getCaseTypeService;
