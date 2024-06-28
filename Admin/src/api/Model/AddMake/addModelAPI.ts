import { addModelEndpoint as endpoint } from "../apiEndpoints";
import { AddEditModelProps } from "../getModelsTypes";

const addModelAPI = async ({ header, model }: AddEditModelProps) => {
  return fetch(endpoint(), {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...model,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default addModelAPI;
