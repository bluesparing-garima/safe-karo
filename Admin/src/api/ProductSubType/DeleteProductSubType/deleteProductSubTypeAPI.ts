import { deleteProductSubTypeEndpoint as endpoint } from "../apiEndpoints";
import { DeleteProductSubTypeProps } from "../getProductSubTypes";

const deleteProductSubTypeAPI = async ({ header, productSubTypeId }: DeleteProductSubTypeProps) => {
  return fetch(endpoint(productSubTypeId!), {
    method: "DELETE",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default deleteProductSubTypeAPI;
