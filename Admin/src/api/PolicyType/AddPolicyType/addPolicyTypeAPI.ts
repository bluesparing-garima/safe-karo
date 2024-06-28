import { addPolicyTypeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditPolicyTypeProps } from "../getPolicyTypes";

const addPolicyTypeAPI = async ({ header, policyType }: AddEditPolicyTypeProps) => {
  return fetch(endpoint(), {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...policyType,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default addPolicyTypeAPI;
