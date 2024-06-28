import { getQuotationByleadIdEndpoint as endpoint } from "../apiEndpoints";
import { GetQuotationByLeadIdProps } from "../getQuotationTypes";

const getQuotationByLeadIdAPI = async ({ header, leadId }: GetQuotationByLeadIdProps) => {
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

export default getQuotationByLeadIdAPI;
