import { editProductSubTypeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditProductSubTypeProps } from "../getProductSubTypes";

const editProductSubTypeAPI = async ({ header, productSubType }: AddEditProductSubTypeProps) => {
  return fetch(endpoint(productSubType.id!), {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...productSubType,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default editProductSubTypeAPI;
