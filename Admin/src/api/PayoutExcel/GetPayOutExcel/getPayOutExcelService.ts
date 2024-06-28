import getPayOutExcelAPI from "./getPayOutExcelAPI";
import { GetPayOutExcelProps } from "../getPayTypes";

const getPayOutExcelService = async ({ header }: GetPayOutExcelProps) => {
  return getPayOutExcelAPI({
    header: header,
  })
    .then((payOutExcel) => {
      return payOutExcel;
    })
    .catch((response) => {
      console.error(
        `getPayOutExcelAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getPayOutExcelService;
