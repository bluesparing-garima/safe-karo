import deleteCompanyAPI from "./deleteCompanyAPI";
import { DeleteCompanyProps } from "../getCompaniesTypes";

const deleteCompanyService = async ({
  header,
  companyId,
  companies,
}: DeleteCompanyProps) => {
  return deleteCompanyAPI({
    header,
    companyId,
    companies,
  })
    .then(() => {
      const deletedCompanyIndex = companies.findIndex((company) => company._id === companyId);
      //Remove this Why becasue i dont want to call Get API in display layer
      companies.splice(deletedCompanyIndex, 1);
      return companies;
    })
    .catch((response) => {
      console.error(
        `deleteCompanyAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default deleteCompanyService;
