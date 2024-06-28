import getPayInExcelAPI from "./getPayInExcelAPI";
import { GetPayInExcelProps } from "../getPayTypes";

const getPayInExcelService = async ({ header }: GetPayInExcelProps) => {
  return getPayInExcelAPI({
    header: header,
  })
    .then((payInExcel) => {
      return payInExcel;
    })
    .catch((response) => {
      console.error(
        `getPayInExcelAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getPayInExcelService;
