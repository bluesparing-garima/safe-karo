import { getPolicyByNumberEndpoint as endpoint } from "../apiEndpoints";
import { GetPolicyByNumberProps } from "../getPoliciesTypes";

const getPolicyByNumberAPI = async ({
  header,
  policyNumber,
}: GetPolicyByNumberProps) => {
  return fetch(endpoint(policyNumber), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getPolicyByNumberAPI;
