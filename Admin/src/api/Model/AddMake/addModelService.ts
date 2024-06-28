import addModelAPI from "./addModelAPI";
import { AddEditModelProps } from "../getModelsTypes";

const addModelService = async ({ header, model }: AddEditModelProps) => {
  return addModelAPI({
    header: header,
    model: model,
  })
    .then((newModel) => {
      return newModel;
    })
    .catch((response) => {
      console.error(`addModelAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default addModelService;
