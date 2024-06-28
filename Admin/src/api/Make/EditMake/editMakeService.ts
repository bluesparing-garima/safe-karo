import editMakeAPI from "./editMakeAPI";
import { AddEditMakeProps } from "../getMakesTypes";

const editMakeService = async ({ header, make }: AddEditMakeProps) => {
  return editMakeAPI({
    header,
    make,
  })
    .then((makeRecord) => {
      return makeRecord;
    })
    .catch((response) => {
      console.error(`editMakeAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default editMakeService;
