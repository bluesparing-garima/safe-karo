// getProductSubTypesAPI.ts
import { getProductSubTypeDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetProductSubTypeDetailsProps } from "../getProductSubTypes";

const getProductSubTypeDetailsAPI = async ({ header, productSubTypeId }: GetProductSubTypeDetailsProps) => {
  return fetch(endpoint(productSubTypeId!), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getProductSubTypeDetailsAPI;
