import editCompanyAPI from "./editCompanyAPI";
import { AddEditCompanyProps } from "../getCompaniesTypes";

const editCompanyService = async ({ header, company }: AddEditCompanyProps) => {
  return editCompanyAPI({
    header,
    company,
  })
    .then((companyRecord) => {
      return companyRecord;
    })
    .catch((response) => {
      console.error(`editCompanyAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default editCompanyService;
