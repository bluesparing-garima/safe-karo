import getBranchesAPI from "./getBranchesAPI";
import { GetBranchProps } from "../getBranchTypes";

const getBranchService = async ({ header }: GetBranchProps) => {
  return getBranchesAPI({
    header: header,
  })
    .then((branches) => {
      return branches;
    })
    .catch((response) => {
      console.error(`getBranchesAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default getBranchService;
