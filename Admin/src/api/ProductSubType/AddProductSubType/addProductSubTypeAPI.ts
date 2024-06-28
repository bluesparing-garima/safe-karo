import { addProductSubTypeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditProductSubTypeProps } from "../getProductSubTypes";

const addProductSubTypeAPI = async ({ header, productSubType }: AddEditProductSubTypeProps) => {
  try {
    const response = await fetch(endpoint(), {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        ...productSubType,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Server responded with error:", errorResponse);
      return Promise.reject(response);
    }

    return response.json();
  } catch (error) {
    console.error("Failed to call addProductSubTypeAPI:", error);
    return Promise.reject(error);
  }
};

export default addProductSubTypeAPI;

