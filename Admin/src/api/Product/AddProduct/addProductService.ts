import addProductAPI from "./addProductAPI";
import { AddEditProductProps } from "../getProductsTypes";

const addProductService = async ({ header, product }: AddEditProductProps) => {
  return addProductAPI({
    header: header,
    product: product,
  })
    .then((newProduct) => {
      return newProduct;
    })
    .catch((response) => {
      console.error(`addProductAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default addProductService;
