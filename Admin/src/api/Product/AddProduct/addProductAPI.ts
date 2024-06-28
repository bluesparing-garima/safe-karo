import { addProductEndpoint as endpoint } from "../apiEndpoints";
import { AddEditProductProps } from "../getProductsTypes";

const addProductAPI = async ({ header, product }: AddEditProductProps) => {
  return fetch(endpoint(), {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...product,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default addProductAPI;
