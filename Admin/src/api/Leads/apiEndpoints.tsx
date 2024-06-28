// Lead API Endpoints
//const API_ENDPOINT_HOST: string =
// process.env.REACT_APP_SAFE_KARO_ADMIN_API_ENDPOINT || "";

const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";

export const addLeadEndpoint = () =>
  API_ENDPOINT_HOST.concat(`/api/lead-generate`);

export const editLeadEndpoint = (leadId: string) =>
  API_ENDPOINT_HOST.concat(`/api/lead-generate/${leadId}`);

export const getLeadByIdEndpoint = (leadId: string) =>
  API_ENDPOINT_HOST.concat(`/api/lead-generate/${leadId}`);

export const getLeadEndpoint = () =>
  API_ENDPOINT_HOST.concat(`/api/lead-generate`);

export const getLeadByAgentIdEndpoint = (partnerId: string) =>
  API_ENDPOINT_HOST.concat(`/api/lead-generate/partner-id/${partnerId}`);

export const getLeadByUserIdEndpoint = (userId: string) =>
  API_ENDPOINT_HOST.concat(`/api/lead-generate/created-by/${userId}`);
