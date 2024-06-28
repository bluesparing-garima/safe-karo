import addBranchAPI from "./addBranchAPI";
import { AddEditBranchProps } from "../getBranchTypes";

const addBranchService = async ({ header, branch }: AddEditBranchProps) => {
  return addBranchAPI({
    header: header,
    branch: branch,
  })
    .then((newBranch) => {
      return newBranch;
    })
    .catch((response) => {
      console.error(`addBranchAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default addBranchService;
