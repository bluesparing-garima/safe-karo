import { getFuelTypeDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetFuelTypeDetailsProps } from "../getFuelTypes";

const getFuelTypeDetailsAPI = async ({ header, fuelTypeId }: GetFuelTypeDetailsProps) => {
  return fetch(endpoint(fuelTypeId!), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getFuelTypeDetailsAPI;
