import { deletePolicyTypeEndpoint as endpoint } from "../apiEndpoints";
import { DeletePolicyTypeProps } from "../getPolicyTypes";

const deletePolicyTypeAPI = async ({ header, policyTypeId }: DeletePolicyTypeProps) => {
  return fetch(endpoint(policyTypeId!), {
    method: "DELETE",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default deletePolicyTypeAPI;
