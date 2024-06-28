import { getProductEndpoint as endpoint } from "../apiEndpoints";
import { GetProductProps } from "../getProductsTypes";

const getProductsAPI = async ({ header }: GetProductProps) => {
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

export default getProductsAPI;
