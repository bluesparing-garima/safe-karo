import deleteCategoryAPI from "./deleteCategoryAPI";
import { DeleteCategoryProps } from "../getCategoryTypes";

const deleteCategoryService = async ({
  header,
  categoryId,
  categories,
}: DeleteCategoryProps) => {
  return deleteCategoryAPI({
    header,
    categoryId,
    categories,
  })
    .then(() => {
      const deletedCategoryIndex = categories.findIndex((category) => category._id === categoryId);
      //Remove this Why becasue i dont want to call Get API in display layer
      categories.splice(deletedCategoryIndex, 1);
      return categories;
    })
    .catch((response) => {
      console.error(
        `deleteCategoryAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default deleteCategoryService;
