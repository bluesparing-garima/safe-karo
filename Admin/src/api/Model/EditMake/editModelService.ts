import editModelAPI from "./editModelAPI";
import { AddEditModelProps } from "../getModelsTypes";

const editModelService = async ({ header, model }: AddEditModelProps) => {
  return editModelAPI({
    header,
    model,
  })
    .then((modelRecord) => {
      return modelRecord;
    })
    .catch((response) => {
      console.error(`editModelAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default editModelService;
