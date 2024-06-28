import { addMakeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditMakeProps } from "../getMakesTypes";

const addMakeAPI = async ({ header, make }: AddEditMakeProps) => {
  return fetch(endpoint(), {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...make,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default addMakeAPI;
