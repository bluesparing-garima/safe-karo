import getCategoriesAPI from "./getCategoriesAPI";
import { GetCategoryProps } from "../getCategoryTypes";

const getCategoriesService = async ({ header }: GetCategoryProps) => {
  return getCategoriesAPI({
    header: header,
  })
    .then((categories) => {
      return categories;
    })
    .catch((response) => {
      console.error(`getCategoriesAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default getCategoriesService;
