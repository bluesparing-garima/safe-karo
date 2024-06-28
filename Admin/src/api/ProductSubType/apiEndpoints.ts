// ProductSubTypeEndpoints.ts

const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";


export const addProductSubTypeEndpoint = () => API_ENDPOINT_HOST.concat(`/api/product-type`);

export const editProductSubTypeEndpoint = (productSubTypeId: string) =>
  API_ENDPOINT_HOST.concat(`/api/product-type/${productSubTypeId}`);

export const getProductSubTypeEndpoint = () => API_ENDPOINT_HOST.concat(`/api/product-type`);

export const getProductSubTypeDetailsEndpoint = (productSubTypeId: string) =>
  API_ENDPOINT_HOST.concat(`/api/product-type/${productSubTypeId}`);

export const deleteProductSubTypeEndpoint = (productSubTypeId: string) =>
  API_ENDPOINT_HOST.concat(`/api/product-type/${productSubTypeId}`);
