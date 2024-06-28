import getProductDetailsAPI from "./getProductDetailsAPI";
import { GetProductDetailsProps } from "../getProductsTypes";
import convertIProductToIProductVM from "../convertIProductToIProductVM";

const getProductDetailsService = async ({
  header,
  productId,
}: GetProductDetailsProps) => {
  return getProductDetailsAPI({
    header: header,
    productId: productId,
  })
    .then((productRecord) => {
      const products = convertIProductToIProductVM(productRecord.data);
      return products;
    })
    .catch((response) => {
      console.error(
        `getProductDetailsAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getProductDetailsService;
