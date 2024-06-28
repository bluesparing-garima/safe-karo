const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";


export const addQuotationEndpoint = () =>
  API_ENDPOINT_HOST.concat(`/api/lead-quotation`);

export const getQuotationByleadIdEndpoint = (leadId: string) =>
  API_ENDPOINT_HOST.concat(`/api/lead-quotation?leadId=${leadId}`);
