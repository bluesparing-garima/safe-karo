import { getCompanyEndpoint as endpoint } from "../apiEndPoints";
import { GetCompanyProps } from "../getCompaniesTypes";

const getCompaniesAPI = async ({ header }: GetCompanyProps) => {
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

export default getCompaniesAPI;
