import { getPolicyTypeEndpoint as endpoint } from "../apiEndpoints";
import { GetPolicyTypeProps } from "../getPolicyTypes";

const getPolicyTypeAPI = async ({ header }: GetPolicyTypeProps) => {
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

export default getPolicyTypeAPI;
