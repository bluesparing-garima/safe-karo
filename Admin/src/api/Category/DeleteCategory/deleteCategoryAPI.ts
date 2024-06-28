import { deleteCategoryEndpoint as endpoint } from "../apiEndpoints";
import { DeleteCategoryProps } from "../getCategoryTypes";

const deleteCategoryAPI = async ({
  header,
  categoryId,
}: DeleteCategoryProps) => {
  return fetch(endpoint(categoryId!), {
    method: "DELETE",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default deleteCategoryAPI;
