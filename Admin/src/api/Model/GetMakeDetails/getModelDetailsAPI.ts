import { getModelDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetModelDetailsProps } from "../getModelsTypes";

const getModelDetailsAPI = async ({ header, modelId }: GetModelDetailsProps) => {
  return fetch(endpoint(modelId!), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getModelDetailsAPI;
