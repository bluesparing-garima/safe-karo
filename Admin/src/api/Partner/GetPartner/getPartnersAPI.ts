import { getPartnerEndpoint as endpoint } from "../apiEndpoints";
import { GetPartnerProps } from "../getPartnersTypes";

const getPartnersAPI = async ({ header,role }: GetPartnerProps) => {
  return fetch(endpoint(role!), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getPartnersAPI;
