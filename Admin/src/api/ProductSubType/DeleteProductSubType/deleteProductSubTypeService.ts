import deleteProductSubTypeAPI from "./deleteProductSubTypeAPI";
import { DeleteProductSubTypeProps } from "../getProductSubTypes";

const deleteProductSubTypeService = async ({ header, productSubTypeId, productSubTypes }: DeleteProductSubTypeProps) => {
  return deleteProductSubTypeAPI({
    header,
    productSubTypeId,
    productSubTypes,
  })
    .then(() => {
      const deletedProductSubTypeIndex = productSubTypes.findIndex((productSubType) => productSubType._id === productSubTypeId);
      productSubTypes.splice(deletedProductSubTypeIndex, 1);
      return productSubTypes;
    })
    .catch((response) => {
      console.error(`deleteProductSubTypeAPI failed with HTTP status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default deleteProductSubTypeService;
