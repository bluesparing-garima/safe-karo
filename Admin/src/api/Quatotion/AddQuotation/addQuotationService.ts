import addQuotationAPI from "./addQuotationAPI";
import { AddEditQuotationProps } from "../getQuotationTypes";

const addQuotationService = async ({ header, quotation }: AddEditQuotationProps) => {
  return addQuotationAPI({
    header: header,
    quotation: quotation,
  })
    .then((newQuotation) => {
      return newQuotation;
    })
    .catch((response) => {
      console.error(`addQuotationAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default addQuotationService;
