import editBranchAPI from "./editBranchAPI";
import { AddEditBranchProps } from "../getBranchTypes";

const editBranchService = async ({ header, branch }: AddEditBranchProps) => {
  return editBranchAPI({
    header,
    branch,
  })
    .then((branchRecord) => {
      return branchRecord;
    })
    .catch((response) => {
      console.error(`editBranchAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default editBranchService;
