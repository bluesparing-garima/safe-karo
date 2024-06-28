import { editCompanyEndpoint as endpoint } from "../apiEndPoints";
import { AddEditCompanyProps } from "../getCompaniesTypes";

const editCompanyAPI = async ({ header, company }: AddEditCompanyProps) => {
  return fetch(endpoint(company.id!), {
    method: "PUT",
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

export default editCompanyAPI;
