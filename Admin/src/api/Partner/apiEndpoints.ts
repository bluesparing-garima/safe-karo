// const API_ENDPOINT_HOST: string =
//   process.env.REACT_APP_SAFE_KARO_ADMIN_API_ENDPOINT || "";

const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";


export const addPartnerEndpoint = () =>
  API_ENDPOINT_HOST.concat(`/api/partner`);

export const editPartnerEndpoint = (partnerId: string) =>
  API_ENDPOINT_HOST.concat(`/api/partner/${partnerId}`);

export const getPartnerEndpoint = (role: string) =>
  API_ENDPOINT_HOST.concat(`/api/user-profile/byRole?role=${role}`);

export const getPartnerDetailsEndpoint = (partnerId: string) =>
  API_ENDPOINT_HOST.concat(`/api/partner/${partnerId}`);

export const deletePartnerEndpoint = (partnerId: string) =>
  API_ENDPOINT_HOST.concat(`/api/partner/${partnerId}`);
