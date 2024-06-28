const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";

export const getPayInExcelEndpoint = () =>
  API_ENDPOINT_HOST.concat(`/api/pay-in/excel/data`);
export const addPayInExcelEndpoint = () =>
  API_ENDPOINT_HOST.concat(`/api/pay-in/excel`);
export const getPayOutExcelEndpoint = () =>
  API_ENDPOINT_HOST.concat(`/api/pay-out/excel/data`);
export const addPayOutExcelEndpoint = () =>
  API_ENDPOINT_HOST.concat(`/api/pay-out/excel`);
