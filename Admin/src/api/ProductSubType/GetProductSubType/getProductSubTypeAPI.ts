// getProductSubTypesAPI.ts

import { getProductSubTypeEndpoint as endpoint } from "../apiEndpoints";
import { GetProductSubTypeProps } from "../getProductSubTypes";

const getProductSubTypeAPI = async ({ header }: GetProductSubTypeProps) => {
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

export default getProductSubTypeAPI;
