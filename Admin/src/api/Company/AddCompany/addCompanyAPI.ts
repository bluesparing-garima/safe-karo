import { addCompanyEndpoint as endpoint } from "../apiEndPoints";
import { AddEditCompanyProps } from "../getCompaniesTypes";

const addCompanyAPI = async ({ header, company }: AddEditCompanyProps) => {
  return fetch(endpoint(), {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...company,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default addCompanyAPI;
