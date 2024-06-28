import { deleteProductEndpoint as endpoint } from "../apiEndpoints";
import { DeleteProductProps } from "../getProductsTypes";

const deleteProductAPI = async ({ header, productId }: DeleteProductProps) => {
  return fetch(endpoint(productId!), {
    method: "DELETE",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default deleteProductAPI;
