// const API_ENDPOINT_HOST: string =
//   process.env.REACT_APP_SAFE_KARO_ADMIN_API_ENDPOINT || "";

const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";


export const addModelEndpoint = () => API_ENDPOINT_HOST.concat(`/api/model`);

export const editModelEndpoint = (modelId: string) =>
  API_ENDPOINT_HOST.concat(`/api/model/${modelId}`);

export const getModelEndpoint = () => API_ENDPOINT_HOST.concat(`/api/model`);

export const getModelDetailsEndpoint = (modelId: string) =>
  API_ENDPOINT_HOST.concat(`/api/model/${modelId}`);

export const deleteModelEndpoint = (modelId: string) =>
  API_ENDPOINT_HOST.concat(`/api/model/${modelId}`);