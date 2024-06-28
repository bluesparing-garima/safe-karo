import { editMakeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditMakeProps } from "../getMakesTypes";

const editMakeAPI = async ({ header, make }: AddEditMakeProps) => {
  return fetch(endpoint(make.id!), {
    method: "PUT",
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

export default editMakeAPI;
