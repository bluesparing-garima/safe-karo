import { editLeadEndpoint as endpoint } from "../apiEndpoints";
import { AddEditLeadsProps } from "../getLeadsTypes";

const editLeadAPI = async ({ header, lead }: AddEditLeadsProps) => {
  return fetch(endpoint(lead.id!), {
    method: "PUT",
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

export default editLeadAPI;
