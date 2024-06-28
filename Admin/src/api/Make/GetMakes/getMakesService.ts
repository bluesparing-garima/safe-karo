import getMakesAPI from "./getMakesAPI";
import { GetMakeProps } from "../getMakesTypes";

const getMakesService = async ({ header }: GetMakeProps) => {
  return getMakesAPI({
    header: header,
  })
    .then((makes) => {
      return makes;
    })
    .catch((response) => {
      console.error(`getMakesAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default getMakesService;
