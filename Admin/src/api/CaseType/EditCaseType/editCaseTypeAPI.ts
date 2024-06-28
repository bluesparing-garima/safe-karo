import { editCaseTypeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditCaseTypeProps } from "../getCaseTypes";

const editCaseTypeAPI = async ({ header, caseType }: AddEditCaseTypeProps) => {
  return fetch(endpoint(caseType.id!), {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...caseType,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default editCaseTypeAPI;
