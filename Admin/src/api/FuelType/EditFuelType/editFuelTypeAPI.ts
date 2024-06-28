import { editFuelTypeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditFuelTypeProps } from "../getFuelTypes";

const editFuelTypeAPI = async ({ header, fuelType }: AddEditFuelTypeProps) => {
  return fetch(endpoint(fuelType.id!), {
    method: "PUT",
    headers: header,
    body: JSON.stringify({
      ...fuelType,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default editFuelTypeAPI;
