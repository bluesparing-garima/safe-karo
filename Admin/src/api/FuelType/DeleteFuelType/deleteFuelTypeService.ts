import deleteFuelTypeAPI from "./deleteFuelTypeAPI";
import { DeleteFuelTypeProps } from "../getFuelTypes";

const deleteFuelTypeService = async ({ header, fuelTypeId, fuelTypes }: DeleteFuelTypeProps) => {
  return deleteFuelTypeAPI({
    header,
    fuelTypeId,
    fuelTypes,
  })
    .then(() => {
      const deletedFuelTypeIndex = fuelTypes.findIndex((fuelType) => fuelType._id === fuelTypeId);
      fuelTypes.splice(deletedFuelTypeIndex, 1);
      return fuelTypes;
    })
    .catch((response) => {
      console.error(`deleteFuelTypeAPI failed with HTTP status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default deleteFuelTypeService;
