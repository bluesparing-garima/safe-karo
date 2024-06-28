// const API_ENDPOINT_HOST: string =
//   process.env.REACT_APP_SAFE_KARO_ADMIN_API_ENDPOINT || "";

const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";


export const addMakeEndpoint = () => API_ENDPOINT_HOST.concat(`/api/make`);

export const editMakeEndpoint = (makeId: string) =>
  API_ENDPOINT_HOST.concat(`/api/make/${makeId}`);

export const getMakeEndpoint = () => API_ENDPOINT_HOST.concat(`/api/make`);

export const getMakeDetailsEndpoint = (makeId: string) =>
  API_ENDPOINT_HOST.concat(`/api/make/${makeId}`);

export const deleteMakeEndpoint = (makeId: string) =>
  API_ENDPOINT_HOST.concat(`/api/make/${makeId}`);