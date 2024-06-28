import { getLeadByIdEndpoint as endpoint } from "../apiEndpoints";
import { GetLeadByIdProps } from "../getLeadsTypes";

const getLeadByIdAPI = async ({ header, leadId }: GetLeadByIdProps) => {
  return fetch(endpoint(leadId), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getLeadByIdAPI;
