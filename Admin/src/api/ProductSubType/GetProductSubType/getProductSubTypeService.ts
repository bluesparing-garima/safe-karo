// getProductSubTypeService.ts

import { GetProductSubTypeProps } from "../getProductSubTypes";
import getProductSubTypeAPI from "./getProductSubTypeAPI";

const getProductSubTypeService = async ({ header }: GetProductSubTypeProps) => {
  return getProductSubTypeAPI({
    header,
  })
    .then((productSubTypes) => {
      return productSubTypes;
    })
    .catch((response) => {
      console.error(
        `getProductSubTypeAPI failed with HTTP status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getProductSubTypeService;
