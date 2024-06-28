import { editBranchEndpoint as endpoint } from "../apiEndPoints";
import { AddEditBranchProps } from "../getBranchTypes";

const editBranchAPI = async ({ header, branch }: AddEditBranchProps) => {
  return fetch(endpoint(branch.id!), {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...branch,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default editBranchAPI;
