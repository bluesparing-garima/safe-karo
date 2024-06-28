import { deleteMakeEndpoint as endpoint } from "../apiEndpoints";
import { DeleteMakeProps } from "../getMakesTypes";

const deleteMakeAPI = async ({ header, makeId }: DeleteMakeProps) => {
  return fetch(endpoint(makeId!), {
    method: "DELETE",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default deleteMakeAPI;
