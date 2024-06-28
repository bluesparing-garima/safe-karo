import editProductSubTypeAPI from "./editProductSubTypeAPI";
import { AddEditProductSubTypeProps } from "../getProductSubTypes";

const editProductSubTypeService = async ({ header, productSubType }: AddEditProductSubTypeProps) => {
  return editProductSubTypeAPI({
    header,
    productSubType,
  })
    .then((productSubTypeRecord) => {
      return productSubTypeRecord;
    })
    .catch((response) => {
      console.error(`editProductSubTypeAPI failed with HTTP status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default editProductSubTypeService;
