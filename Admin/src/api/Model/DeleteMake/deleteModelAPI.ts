import { deleteModelEndpoint as endpoint } from "../apiEndpoints";
import { DeleteModelProps } from "../getModelsTypes";

const deleteModelAPI = async ({ header, modelId }: DeleteModelProps) => {
  return fetch(endpoint(modelId!), {
    method: "DELETE",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default deleteModelAPI;
