// getCaseTypesAPI.ts

import { getCaseTypeEndpoint as endpoint } from "../apiEndpoints";
import { GetCaseTypeProps } from "../getCaseTypes";

const getCaseTypesAPI = async ({ header }: GetCaseTypeProps) => {
  return fetch(endpoint(), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getCaseTypesAPI;
