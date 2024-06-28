import deleteModelAPI from "./deleteModelAPI";
import { DeleteModelProps } from "../getModelsTypes";

const deleteModelService = async ({
  header,
  modelId,
  models,
}: DeleteModelProps) => {
  return deleteModelAPI({
    header,
    modelId,
    models,
  })
    .then(() => {
      const deletedModelIndex = models.findIndex((model) => model._id === modelId);
      //Remove this Why becasue i dont want to call Get API in display layer
      models.splice(deletedModelIndex, 1);
      return models;
    })
    .catch((response) => {
      console.error(
        `deleteModelAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default deleteModelService;
