import deleteBranchAPI from "./deleteBranchAPI";
import { DeleteBranchProps } from "../getBranchTypes";

const deleteBranchService = async ({
  header,
  branchId,
  branches,
}: DeleteBranchProps) => {
  return deleteBranchAPI({
    header,
    branchId,
    branches,
  })
    .then(() => {
      const deletedBranchIndex = branches.findIndex((branch) => branch._id === branchId);
      //Remove this Why becasue i dont want to call Get API in display layer
      branches.splice(deletedBranchIndex, 1);
      return branches;
    })
    .catch((response) => {
      console.error(
        `deleteBranchAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default deleteBranchService;
