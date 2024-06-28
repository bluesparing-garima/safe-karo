import { editPolicyTypeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditPolicyTypeProps } from "../getPolicyTypes";

const editPolicyTypeAPI = async ({ header, policyType }: AddEditPolicyTypeProps) => {
  return fetch(endpoint(policyType.id!), {
    method: "PUT",
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

export default editPolicyTypeAPI;
