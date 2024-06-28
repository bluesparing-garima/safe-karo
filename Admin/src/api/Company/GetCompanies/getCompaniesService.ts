import getCompaniesAPI from "./getCompaniesAPI";
import { GetCompanyProps } from "../getCompaniesTypes";

const getCompaniesService = async ({ header }: GetCompanyProps) => {
  return getCompaniesAPI({
    header: header,
  })
    .then((companies) => {
      return companies;
    })
    .catch((response) => {
      console.error(
        `getCompaniesAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getCompaniesService;
