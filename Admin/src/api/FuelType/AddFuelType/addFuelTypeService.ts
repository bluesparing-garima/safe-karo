import addFuelTypeAPI from "./addFuelTypeAPI";
import { AddEditFuelTypeProps } from "../getFuelTypes";

const addFuelTypeService = async ({ header, fuelType }: AddEditFuelTypeProps) => {
  try {
    const newFuelType = await addFuelTypeAPI({
      header,
      fuelType,
    });
    return newFuelType;
  } catch (response) {
    console.error(`addFuelTypeAPI failed with HTTP status`);
    // You can provide additional handling here, such as showing user-friendly error messages
    return Promise.reject(response);
  }
};

export default addFuelTypeService;
