import { getLeadEndpoint as endpoint } from "../apiEndpoints";
import { GetLeadsProps } from "../getLeadsTypes";

const getLeadAPI = async ({ header }: GetLeadsProps) => {
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

export default getLeadAPI;
