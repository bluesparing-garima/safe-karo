import getFuelTypeDetailsAPI from "./getFuelTypeDetailsAPI";
import { GetFuelTypeDetailsProps } from "../getFuelTypes";
import convertIFuelTypeToIFuelTypeVM from "../convertIFuelTypeToIFuelTypeVM";

const getFuelTypeDetailsService = async ({
  header,
    fuelTypeId,
}: GetFuelTypeDetailsProps) => {
  return getFuelTypeDetailsAPI({
    header: header,
    fuelTypeId: fuelTypeId,
  })
    .then((FuelTypeRecord) => {
      const fuelTypes = convertIFuelTypeToIFuelTypeVM(FuelTypeRecord.data);
      return fuelTypes;
    })
    .catch((response) => {
      console.error(
        `getFuelTypeDetailsAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getFuelTypeDetailsService;
