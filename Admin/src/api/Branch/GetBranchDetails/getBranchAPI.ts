import { getBranchDetailsEndpoint as endpoint } from "../apiEndPoints";
import { GetBranchDetailsProps } from "../getBranchTypes";

const getBranchDetailsAPI = async ({ header, branchId }: GetBranchDetailsProps) => {
  return fetch(endpoint(branchId!), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getBranchDetailsAPI;
