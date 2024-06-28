import getQuotationByLeadIdAPI from "./getQuotationByLeadIdAPI";
import { GetQuotationByLeadIdProps } from "../getQuotationTypes";

const getQuotationByLeadIdService = async ({
  header,
  leadId,
}: GetQuotationByLeadIdProps) => {
  return getQuotationByLeadIdAPI({
    header: header,
    leadId: leadId,
  })
    .then((leads) => {
      return leads;
    })
    .catch((response) => {
      console.error(
        `getQuotationByLeadIdAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getQuotationByLeadIdService;
