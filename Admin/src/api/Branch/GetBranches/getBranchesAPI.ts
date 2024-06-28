import { getBranchEndpoint as endpoint } from "../apiEndPoints";
import { GetBranchProps } from "../getBranchTypes";

const getBranchesAPI = async ({ header }: GetBranchProps) => {
  return fetch(endpoint(), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getBranchesAPI;
