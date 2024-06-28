// CaseTypeEndpoints.ts

const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";


export const addCaseTypeEndpoint = () => API_ENDPOINT_HOST.concat(`/api/case-type`);

export const editCaseTypeEndpoint = (caseTypeId: string) =>
  API_ENDPOINT_HOST.concat(`/api/case-type/${caseTypeId}`);

export const getCaseTypeEndpoint = () => API_ENDPOINT_HOST.concat(`/api/case-type`);

export const getCaseTypeDetailsEndpoint = (caseTypeId: string) =>
  API_ENDPOINT_HOST.concat(`/api/case-type/${caseTypeId}`);

export const deleteCaseTypeEndpoint = (caseTypeId: string) =>
  API_ENDPOINT_HOST.concat(`/api/case-type/${caseTypeId}`);
