import addProductSubTypeAPI from "./addProductSubTypeAPI";
import { AddEditProductSubTypeProps } from "../getProductSubTypes";

const addProductSubTypeService = async ({ header, productSubType }: AddEditProductSubTypeProps) => {
  try {
    const newProductSubType = await addProductSubTypeAPI({
      header,
      productSubType,
    });
    return newProductSubType;
  } catch (response) {
    console.error(`addProductSubTypeAPI failed with HTTP status`);
    // You can provide additional handling here, such as showing user-friendly error messages
    return Promise.reject(response);
  }
};

export default addProductSubTypeService;
