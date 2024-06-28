import { getCompanytDetailsEndpoint as endpoint } from "../apiEndPoints";
import { GetCompanyDetailsProps } from "../getCompaniesTypes";

const getCompanyDetailsAPI = async ({ header, companyId }: GetCompanyDetailsProps) => {
  return fetch(endpoint(companyId!), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getCompanyDetailsAPI;
