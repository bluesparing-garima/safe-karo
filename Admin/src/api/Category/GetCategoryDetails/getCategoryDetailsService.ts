import getCategoryDetailsAPI from "./getCategoryDetailsAPI";
import { GetCategoryDetailsProps } from "../getCategoryTypes";
import convertICategoryToICategoryVM from "../convertICategoryToICategoryVM";

const getCategoryDetailsService = async ({
  header,
  categoryId,
}: GetCategoryDetailsProps) => {
  return getCategoryDetailsAPI({
    header: header,
    categoryId: categoryId,
  })
    .then((productRecord) => {
      const products = convertICategoryToICategoryVM(productRecord.data);
      return products;
    })
    .catch((response) => {
      console.error(
        `getCategoryDetailsAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getCategoryDetailsService;
