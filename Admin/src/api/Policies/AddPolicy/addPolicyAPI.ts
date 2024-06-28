import { addPolicyEndpoint as endpoint } from "../apiEndpoints";
import { AddPolicyProps } from "../getPoliciesTypes";

const addPolicyAPI = async ({ header, policy }: AddPolicyProps) => {
  return fetch(endpoint(), {
    method: "POST",
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

export default addPolicyAPI;
