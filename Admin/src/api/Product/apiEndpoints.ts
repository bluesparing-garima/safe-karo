// const API_ENDPOINT_HOST: string =
//   process.env.REACT_APP_SAFE_KARO_ADMIN_API_ENDPOINT || "";

const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";


export const addProductEndpoint = () => API_ENDPOINT_HOST.concat(`/api/product`);

export const editProductEndpoint = (productId: string) =>
  API_ENDPOINT_HOST.concat(`/api/product/${productId}`);

export const getProductEndpoint = () => API_ENDPOINT_HOST.concat(`/api/product`);

export const getProductDetailsEndpoint = (productId: string) =>
  API_ENDPOINT_HOST.concat(`/api/product/${productId}`);

export const deleteProductEndpoint = (productId: string) =>
  API_ENDPOINT_HOST.concat(`/api/product/${productId}`);