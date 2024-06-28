import addMakeAPI from "./addMakeAPI";
import { AddEditMakeProps } from "../getMakesTypes";

const addMakeService = async ({ header, make }: AddEditMakeProps) => {
  return addMakeAPI({
    header: header,
    make: make,
  })
    .then((newMake) => {
      return newMake;
    })
    .catch((response) => {
      console.error(`addMakeAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default addMakeService;
