import { getPolicyEndpoint as endpoint } from "../apiEndpoints";
import { GetMotorPoliciesProps } from "../getPoliciesTypes";

const getMotorPolicyAPI = async ({ header }: GetMotorPoliciesProps) => {
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

export default getMotorPolicyAPI;
