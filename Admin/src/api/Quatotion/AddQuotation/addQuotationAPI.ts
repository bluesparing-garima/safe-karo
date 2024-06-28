import { addQuotationEndpoint as endpoint } from "../apiEndpoints";
import { AddEditQuotationProps } from "../getQuotationTypes";

const addQuotationAPI = async ({ header, quotation }: AddEditQuotationProps) => {
  return fetch(endpoint(), {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...quotation,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default addQuotationAPI;
