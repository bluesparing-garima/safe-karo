// getFuelTypesAPI.ts

import { getFuelTypeEndpoint as endpoint } from "../apiEndpoints";
import { GetFuelTypeProps } from "../getFuelTypes";

const getFuelTypesAPI = async ({ header }: GetFuelTypeProps) => {
  return fetch(endpoint(), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getFuelTypesAPI;
