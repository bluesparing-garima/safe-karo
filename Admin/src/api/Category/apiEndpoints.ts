// const API_ENDPOINT_HOST: string =
//   process.env.REACT_APP_SAFE_KARO_ADMIN_API_ENDPOINT || "";

const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";


export const addCategoryEndpoint = () => API_ENDPOINT_HOST.concat(`/api/category`);

export const editCategoryEndpoint = (categoryId: string) =>
  API_ENDPOINT_HOST.concat(`/api/category/${categoryId}`);

export const getCategoryEndpoint = () => API_ENDPOINT_HOST.concat(`/api/category`);

export const getCategorytDetailsEndpoint = (categoryId: string) =>
  API_ENDPOINT_HOST.concat(`/api/category/${categoryId}`);

export const deleteCategoryEndpoint = (categoryId: string) =>
  API_ENDPOINT_HOST.concat(`/api/category/${categoryId}`);