import { getLeadByAgentIdEndpoint as endpoint } from "../apiEndpoints";
import { GetLeadByAgentIdProps } from "../getLeadsTypes";

const getLeadByAgentIdAPI = async ({
  header,
  partnerId,
}: GetLeadByAgentIdProps) => {
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

export default getLeadByAgentIdAPI;
