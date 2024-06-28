import { editCategoryEndpoint as endpoint } from "../apiEndpoints";
import { AddEditCategoryProps } from "../getCategoryTypes";

const editCategoryAPI = async ({ header, category }: AddEditCategoryProps) => {
  return fetch(endpoint(category.id!), {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...category,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default editCategoryAPI;
