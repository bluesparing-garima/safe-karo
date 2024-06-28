import addCompanyAPI from "./addCompanyAPI";
import { AddEditCompanyProps } from "../getCompaniesTypes";

const addCompanyService = async ({ header, company }: AddEditCompanyProps) => {
  return addCompanyAPI({
    header: header,
    company: company,
  })
    .then((newCompany) => {
      return newCompany;
    })
    .catch((response) => {
      console.error(`addCompanyAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default addCompanyService;
