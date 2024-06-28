import editCategoryAPI from "./editCategoryAPI";
import { AddEditCategoryProps } from "../getCategoryTypes";

const editCategoryService = async ({ header, category }: AddEditCategoryProps) => {
  return editCategoryAPI({
    header,
    category,
  })
    .then((categoryRecord) => {
      return categoryRecord;
    })
    .catch((response) => {
      console.error(`editCategoryAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default editCategoryService;
