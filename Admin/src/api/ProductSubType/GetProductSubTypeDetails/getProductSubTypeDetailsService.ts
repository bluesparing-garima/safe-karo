import getProductSubTypeDetailsAPI from "./getProductSubTypeDetailsAPI";
import { GetProductSubTypeDetailsProps } from "../getProductSubTypes";
import convertIProductSubTypeToIProductSubTypeVM from "../convertIProductSubTypeToIProductSubTypeVM";

const getProductSubTypeDetailsService = async ({
  header,
    productSubTypeId,
}: GetProductSubTypeDetailsProps) => {
  return getProductSubTypeDetailsAPI({
    header: header,
    productSubTypeId: productSubTypeId,
  })
    .then((ProductSubTypeRecord) => {
      const productSubTypes = convertIProductSubTypeToIProductSubTypeVM(ProductSubTypeRecord.data);
      return productSubTypes;
    })
    .catch((response) => {
      console.error(
        `getProductSubTypeDetailsAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getProductSubTypeDetailsService;
