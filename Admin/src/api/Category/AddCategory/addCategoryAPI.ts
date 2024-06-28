import { addCategoryEndpoint as endpoint } from "../apiEndpoints";
import { AddEditCategoryProps } from "../getCategoryTypes";

const addCategoryAPI = async ({ header, category }: AddEditCategoryProps) => {
  return fetch(endpoint(), {
    method: "POST",
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

export default addCategoryAPI;
