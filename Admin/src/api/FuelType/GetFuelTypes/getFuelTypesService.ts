// getFuelTypeService.ts

import getFuelTypesAPI from "./getFuelTypesAPI";
import { GetFuelTypeProps } from "../getFuelTypes";

const getFuelTypeService = async ({ header }: GetFuelTypeProps) => {
  return getFuelTypesAPI({
    header,
  })
    .then((fuelTypes) => {
      return fuelTypes;
    })
    .catch((response) => {
      console.error(`getFuelTypesAPI failed with HTTP status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default getFuelTypeService;
