import { addLeadEndpoint as endpoint } from "../apiEndpoints";
import { AddEditLeadsProps } from "../getLeadsTypes";

const addLeadsAPI = async ({ header, lead }: AddEditLeadsProps) => {
  return fetch(endpoint(), {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...lead,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default addLeadsAPI;
