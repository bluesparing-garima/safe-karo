import { getLeadByUserIdEndpoint as endpoint } from "../apiEndpoints";
import { GetLeadByUserIdProps } from "../getLeadsTypes";

const getLeadByUserIdAPI = async ({ header, userId }: GetLeadByUserIdProps) => {
  return fetch(endpoint(userId), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getLeadByUserIdAPI;
