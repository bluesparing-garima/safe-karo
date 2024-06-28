// const API_ENDPOINT_HOST: string =
//   process.env.REACT_APP_SAFE_KARO_ADMIN_API_ENDPOINT || "";

const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";


export const addRoleEndpoint = () => API_ENDPOINT_HOST.concat(`/api/roles`);

export const editRoleEndpoint = (roleId: string) =>
  API_ENDPOINT_HOST.concat(`/api/roles/${roleId}`);

export const getRoleEndpoint = () => API_ENDPOINT_HOST.concat(`/api/roles`);

export const getRoleDetailsEndpoint = (roleId: string) =>
  API_ENDPOINT_HOST.concat(`/api/roles/${roleId}`);

export const deleteRoleEndpoint = (roleId: string) =>
  API_ENDPOINT_HOST.concat(`/api/roles/${roleId}`);