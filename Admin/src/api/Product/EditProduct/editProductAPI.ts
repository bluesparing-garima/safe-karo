import { editProductEndpoint as endpoint } from "../apiEndpoints";
import { AddEditProductProps } from "../getProductsTypes";

const editProductAPI = async ({ header, product }: AddEditProductProps) => {
  return fetch(endpoint(product.id!), {
    method: "PUT",
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

export default editProductAPI;
