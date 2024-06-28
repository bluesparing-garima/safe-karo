import { getCaseTypeDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetCaseTypeDetailsProps } from "../getCaseTypes";

const getCaseTypeDetailsAPI = async ({ header, caseTypeId }: GetCaseTypeDetailsProps) => {
  return fetch(endpoint(caseTypeId!), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getCaseTypeDetailsAPI;
