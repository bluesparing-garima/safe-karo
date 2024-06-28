import editProductAPI from "./editProductAPI";
import { AddEditProductProps } from "../getProductsTypes";

const editProductService = async ({ header, product }: AddEditProductProps) => {
  return editProductAPI({
    header,
    product,
  })
    .then((productRecord) => {
      return productRecord;
    })
    .catch((response) => {
      console.error(`editProductAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default editProductService;
