import { deleteBranchEndpoint as endpoint } from "../apiEndPoints";
import { DeleteBranchProps } from "../getBranchTypes";

const deleteBranchAPI = async ({ header, branchId }: DeleteBranchProps) => {
  return fetch(endpoint(branchId!), {
    method: "DELETE",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default deleteBranchAPI;
