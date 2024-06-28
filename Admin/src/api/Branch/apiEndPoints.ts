// const API_ENDPOINT_HOST: string =
//   process.env.REACT_APP_SAFE_KARO_ADMIN_API_ENDPOINT || "";

const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";

export const addBranchEndpoint = () => API_ENDPOINT_HOST.concat(`/api/branches`);

export const editBranchEndpoint = (branchId: string) =>
  API_ENDPOINT_HOST.concat(`/api/branches/${branchId}`);

export const getBranchEndpoint = () => API_ENDPOINT_HOST.concat(`/api/branches`);

export const getBranchDetailsEndpoint = (branchId: string) =>
  API_ENDPOINT_HOST.concat(`/api/branches/${branchId}`);

export const deleteBranchEndpoint = (branchId: string) =>
  API_ENDPOINT_HOST.concat(`/api/branches/${branchId}`);