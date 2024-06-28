import { editPolicyEndpoint as endpoint } from "../apiEndpoints";
import { AddPolicyProps } from "../getPoliciesTypes";

const editPolicyAPI = async ({ header, policy }: AddPolicyProps) => {
  return fetch(endpoint(policy.id!), {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...policy,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default editPolicyAPI;
