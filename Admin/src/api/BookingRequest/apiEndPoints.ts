// const API_ENDPOINT_HOST: string =
//   process.env.REACT_APP_SAFE_KARO_ADMIN_API_ENDPOINT || "";

const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";

export const addBookingRequestEndpoint = () =>
  API_ENDPOINT_HOST.concat(`/api/booking-request`);
export const getBookingRequestEndpoint = () =>
  API_ENDPOINT_HOST.concat(`/api/booking-request`);
export const validateBookingRequestEndpoint = (policyNumber: string) =>
  API_ENDPOINT_HOST.concat(
    `/api/booking-request/validatePolicyNumber?policyNumber=${policyNumber}`
  );
export const getBookingRequestbyIdEndpoint = (userId: string) =>
  API_ENDPOINT_HOST.concat(`/api/booking-request/created-by/${userId}`);

export const getBookingRequestbyAgentIdEndpoint = (partnerId: string) =>
  API_ENDPOINT_HOST.concat(`/api/booking-request/partner/${partnerId}`);
