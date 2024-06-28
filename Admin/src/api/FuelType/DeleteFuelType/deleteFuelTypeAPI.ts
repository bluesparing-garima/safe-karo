import { deleteFuelTypeEndpoint as endpoint } from "../apiEndpoints";
import { DeleteFuelTypeProps } from "../getFuelTypes";

const deleteFuelTypeAPI = async ({ header, fuelTypeId }: DeleteFuelTypeProps) => {
  return fetch(endpoint(fuelTypeId!), {
    method: "DELETE",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default deleteFuelTypeAPI;
