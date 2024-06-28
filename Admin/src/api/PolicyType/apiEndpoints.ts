// const API_ENDPOINT_HOST: string =
//   process.env.REACT_APP_SAFE_KARO_ADMIN_API_ENDPOINT || "";

const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";


export const addPolicyTypeEndpoint = () =>
  API_ENDPOINT_HOST.concat(`/api/policy-type`);

export const editPolicyTypeEndpoint = (policyTypeId: string) =>
  API_ENDPOINT_HOST.concat(`/api/policy-type/${policyTypeId}`);

export const getPolicyTypeEndpoint = () =>
  API_ENDPOINT_HOST.concat(`/api/policy-type`);

export const getPolicyTypeDetailsEndpoint = (policyTypeId: string) =>
  API_ENDPOINT_HOST.concat(`/api/policy-type/${policyTypeId}`);

export const deletePolicyTypeEndpoint = (policyTypeId: string) =>
  API_ENDPOINT_HOST.concat(`/api/policy-type/${policyTypeId}`);
