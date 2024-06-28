import getCompanyDetailsAPI from "./getCompanyDetailsAPI";
import { GetCompanyDetailsProps } from "../getCompaniesTypes";
import convertICompanyToICompanyVM from "../convertICompanyToICompanyVM";

const getCompanyDetailsService = async ({
  header,
  companyId,
}: GetCompanyDetailsProps) => {
  return getCompanyDetailsAPI({
    header: header,
    companyId: companyId,
  })
    .then((companyRecord) => {
      const companies = convertICompanyToICompanyVM(companyRecord.data);
      return companies;
    })
    .catch((response) => {
      console.error(
        `getCompanyDetailsAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getCompanyDetailsService;
