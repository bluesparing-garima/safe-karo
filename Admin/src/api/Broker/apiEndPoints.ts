// const API_ENDPOINT_HOST: string =
//   process.env.REACT_APP_SAFE_KARO_ADMIN_API_ENDPOINT || "";

const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";

export const addBrokerEndpoint = () => API_ENDPOINT_HOST.concat(`/api/broker`);

export const editBrokerEndpoint = (brokerId: string) =>
  API_ENDPOINT_HOST.concat(`/api/broker/${brokerId}`);

export const getBrokerEndpoint = () => API_ENDPOINT_HOST.concat(`/api/broker`);

export const getBrokerDetailsEndpoint = (brokerId: string) =>
  API_ENDPOINT_HOST.concat(`/api/broker/${brokerId}`);

export const deleteBrokerEndpoint = (brokerId: string) =>
  API_ENDPOINT_HOST.concat(`/api/broker/${brokerId}`);