import { getCategorytDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetCategoryDetailsProps } from "../getCategoryTypes";

const getCategoryDetailsAPI = async ({ header, categoryId }: GetCategoryDetailsProps) => {
  return fetch(endpoint(categoryId!), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getCategoryDetailsAPI;
