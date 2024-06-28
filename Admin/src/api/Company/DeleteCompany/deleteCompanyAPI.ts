import { deleteCompanyEndpoint as endpoint } from "../apiEndPoints";
import { DeleteCompanyProps } from "../getCompaniesTypes";

const deleteCompanyAPI = async ({ header, companyId }: DeleteCompanyProps) => {
  return fetch(endpoint(companyId!), {
    method: "DELETE",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default deleteCompanyAPI;
