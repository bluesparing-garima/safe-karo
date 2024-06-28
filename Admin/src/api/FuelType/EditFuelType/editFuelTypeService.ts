import editFuelTypeAPI from "./editFuelTypeAPI";
import { AddEditFuelTypeProps } from "../getFuelTypes";

const editFuelTypeService = async ({ header, fuelType }: AddEditFuelTypeProps) => {
  return editFuelTypeAPI({
    header,
    fuelType,
  })
    .then((fuelTypeRecord) => {
      return fuelTypeRecord;
    })
    .catch((response) => {
      console.error(`editFuelTypeAPI failed with HTTP status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default editFuelTypeService;
