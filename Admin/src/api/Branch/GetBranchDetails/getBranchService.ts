import getBranchDetailsAPI from "./getBranchAPI";
import { GetBranchDetailsProps } from "../getBranchTypes";
import convertIBranchToIBranchVM from "../convertIBranchToIBranchVM";

const getBranchDetailsService = async ({
  header,
  branchId,
}: GetBranchDetailsProps) => {
  return getBranchDetailsAPI({
    header: header,
    branchId: branchId,
  })
    .then((branchRecord) => {
      const branches = convertIBranchToIBranchVM(branchRecord.data);
      return branches;
    })
    .catch((response) => {
      console.error(
        `getBranchDetailsAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getBranchDetailsService;
