import { addBranchEndpoint as endpoint } from "../apiEndPoints";
import { AddEditBranchProps } from "../getBranchTypes";

const addBranchAPI = async ({ header, branch }: AddEditBranchProps) => {
  return fetch(endpoint(), {
    method: "POST",
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

export default addBranchAPI;
