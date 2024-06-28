import addCaseTypeAPI from "./addCaseTypeAPI";
import { AddEditCaseTypeProps } from "../getCaseTypes";

const addCaseTypeService = async ({ header, caseType }: AddEditCaseTypeProps) => {
  try {
    const newCaseType = await addCaseTypeAPI({
      header,
      caseType,
    });
    return newCaseType;
  } catch (response) {
    console.error(`addCaseTypeAPI failed with HTTP status`);
    // You can provide additional handling here, such as showing user-friendly error messages
    return Promise.reject(response);
  }
};

export default addCaseTypeService;
