import { addFuelTypeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditFuelTypeProps } from "../getFuelTypes";

const addFuelTypeAPI = async ({ header, fuelType }: AddEditFuelTypeProps) => {
  try {
    const response = await fetch(endpoint(), {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        ...fuelType,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Server responded with error:", errorResponse);
      return Promise.reject(response);
    }

    return response.json();
  } catch (error) {
    console.error("Failed to call addFuelTypeAPI:", error);
    return Promise.reject(error);
  }
};

export default addFuelTypeAPI;

