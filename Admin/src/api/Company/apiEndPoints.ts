// const API_ENDPOINT_HOST: string =
//   process.env.REACT_APP_SAFE_KARO_ADMIN_API_ENDPOINT || "";

const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";


export const addCompanyEndpoint = () => API_ENDPOINT_HOST.concat(`/api/company`);

export const editCompanyEndpoint = (companyId: string) =>
  API_ENDPOINT_HOST.concat(`/api/company/${companyId}`);

export const getCompanyEndpoint = () => API_ENDPOINT_HOST.concat(`/api/company`);

export const getCompanytDetailsEndpoint = (companyId: string) =>
  API_ENDPOINT_HOST.concat(`/api/company/${companyId}`);

export const deleteCompanyEndpoint = (companyId: string) =>
  API_ENDPOINT_HOST.concat(`/api/company/${companyId}`);