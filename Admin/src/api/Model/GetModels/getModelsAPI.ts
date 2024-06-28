import { getModelEndpoint as endpoint } from "../apiEndpoints";
import { GetModelProps } from "../getModelsTypes";

const getModelsAPI = async ({ header }: GetModelProps) => {
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

export default getModelsAPI;
