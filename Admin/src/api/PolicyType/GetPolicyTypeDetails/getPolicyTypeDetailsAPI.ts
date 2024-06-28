import { getPolicyTypeDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetPolicyTypeDetailsProps } from "../getPolicyTypes";

const getPolicyTypeDetailsAPI = async ({ header, policyTypeId }: GetPolicyTypeDetailsProps) => {
  return fetch(endpoint(policyTypeId!), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getPolicyTypeDetailsAPI;
