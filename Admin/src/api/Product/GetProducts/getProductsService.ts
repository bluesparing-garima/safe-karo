import getProductsAPI from "./getProductsAPI";
import { GetProductProps } from "../getProductsTypes";

const getProductService = async ({ header }: GetProductProps) => {
  return getProductsAPI({
    header: header,
  })
    .then((products) => {
      return products;
    })
    .catch((response) => {
      console.error(`getProductsAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default getProductService;
