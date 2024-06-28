import addCategoryAPI from "./addCategoryAPI";
import { AddEditCategoryProps } from "../getCategoryTypes";

const addCategoryServices = async ({
  header,
  category,
}: AddEditCategoryProps) => {
  return addCategoryAPI({
    header: header,
    category: category,
  })
    .then((newCategory) => {
      return newCategory;
    })
    .catch((response) => {
      console.error(
        `addCategoryAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default addCategoryServices;
