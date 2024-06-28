import { getPolicyByPartnerEndpoint as endpoint } from "../apiEndpoints";
import { GetPolicyByIdProps } from "../getPoliciesTypes";

const getPolicyByIdAPI = async ({ header, partnerId }: GetPolicyByIdProps) => {
  return fetch(endpoint(partnerId), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getPolicyByIdAPI;
