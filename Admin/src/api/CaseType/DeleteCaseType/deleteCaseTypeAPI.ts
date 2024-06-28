import { deleteCaseTypeEndpoint as endpoint } from "../apiEndpoints";
import { DeleteCaseTypeProps } from "../getCaseTypes";

const deleteCaseTypeAPI = async ({ header, caseTypeId }: DeleteCaseTypeProps) => {
  return fetch(endpoint(caseTypeId!), {
    method: "DELETE",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default deleteCaseTypeAPI;
