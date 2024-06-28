import { editModelEndpoint as endpoint } from "../apiEndpoints";
import { AddEditModelProps } from "../getModelsTypes";

const editModelAPI = async ({ header, model }: AddEditModelProps) => {
  return fetch(endpoint(model.id!), {
    method: "PUT",
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

export default editModelAPI;
