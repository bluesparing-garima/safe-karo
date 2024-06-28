import getModelsAPI from "./getModelsAPI";
import { GetModelProps } from "../getModelsTypes";

const getModelsService = async ({ header }: GetModelProps) => {
  return getModelsAPI({
    header: header,
  })
    .then((makes) => {
      return makes;
    })
    .catch((response) => {
      console.error(`getModelsAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default getModelsService;
