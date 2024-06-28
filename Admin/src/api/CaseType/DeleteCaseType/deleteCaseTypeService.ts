import deleteCaseTypeAPI from "./deleteCaseTypeAPI";
import { DeleteCaseTypeProps } from "../getCaseTypes";

const deleteCaseTypeService = async ({ header, caseTypeId, caseTypes }: DeleteCaseTypeProps) => {
  return deleteCaseTypeAPI({
    header,
    caseTypeId,
    caseTypes,
  })
    .then(() => {
      const deletedCaseTypeIndex = caseTypes.findIndex((caseType) => caseType._id === caseTypeId);
      caseTypes.splice(deletedCaseTypeIndex, 1);
      return caseTypes;
    })
    .catch((response) => {
      console.error(`deleteCaseTypeAPI failed with HTTP status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default deleteCaseTypeService;
