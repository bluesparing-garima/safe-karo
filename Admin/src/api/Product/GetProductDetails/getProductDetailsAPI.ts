import { getProductDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetProductDetailsProps } from "../getProductsTypes";

const getProductDetailsAPI = async ({ header, productId }: GetProductDetailsProps) => {
  return fetch(endpoint(productId!), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getProductDetailsAPI;
