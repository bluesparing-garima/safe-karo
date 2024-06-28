//const API_ENDPOINT_HOST: string =
// process.env.REACT_APP_SAFE_KARO_ADMIN_API_ENDPOINT || "";

const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";

export const addPolicyEndpoint = () =>
  API_ENDPOINT_HOST.concat(`/api/policy/motor`);

export const editPolicyEndpoint = (policyId: string) =>
  API_ENDPOINT_HOST.concat(`/api/policy/motor/${policyId}`);
export const getPolicyEndpoint = () =>
  API_ENDPOINT_HOST.concat(`/api/policy/motor`);
export const getPolicyByNumberEndpoint = (policyNumber: string) =>
  API_ENDPOINT_HOST.concat(
    `/api/policy/motor/validatePolicyNumber/?policyNumber=${policyNumber}`
  );
export const getPolicyByPartnerEndpoint = (partnerId: string) =>
  API_ENDPOINT_HOST.concat(`/api/policy/motor/${partnerId}`);
