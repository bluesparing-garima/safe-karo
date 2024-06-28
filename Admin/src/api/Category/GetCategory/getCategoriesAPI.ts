import { getCategoryEndpoint as endpoint } from "../apiEndpoints";
import { GetCategoryProps } from "../getCategoryTypes";

const getCategoriesAPI = async ({ header }: GetCategoryProps) => {
  return fetch(endpoint(), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getCategoriesAPI;
