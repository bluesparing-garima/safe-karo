import getModelDetailsAPI from "./getModelDetailsAPI";
import { GetModelDetailsProps } from "../getModelsTypes";
import convertIModelToIModelVM from "../convertIModelToIModelVM";

const getModelDetailsService = async ({
  header,
  modelId,
}: GetModelDetailsProps) => {
  return getModelDetailsAPI({
    header: header,
    modelId: modelId,
  })
    .then((modelRecord) => {
      const models = convertIModelToIModelVM(modelRecord.data);
      return models;
    })
    .catch((response) => {
      console.error(
        `getModelDetailsAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getModelDetailsService;
