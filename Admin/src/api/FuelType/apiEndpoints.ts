// FuelTypeEndpoints.ts

const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";


export const addFuelTypeEndpoint = () => API_ENDPOINT_HOST.concat(`/api/fuel-type`);

export const editFuelTypeEndpoint = (fuelTypeId: string) =>
  API_ENDPOINT_HOST.concat(`/api/fuel-type/${fuelTypeId}`);

export const getFuelTypeEndpoint = () => API_ENDPOINT_HOST.concat(`/api/fuel-type`);

export const getFuelTypeDetailsEndpoint = (fuelTypeId: string) =>
  API_ENDPOINT_HOST.concat(`/api/fuel-type/${fuelTypeId}`);

export const deleteFuelTypeEndpoint = (fuelTypeId: string) =>
  API_ENDPOINT_HOST.concat(`/api/fuel-type/${fuelTypeId}`);
