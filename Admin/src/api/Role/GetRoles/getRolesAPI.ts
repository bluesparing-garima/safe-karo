import { getRoleEndpoint as endpoint } from "../apiEndpoints";
import { GetRoleProps } from "../getRolesTypes";

const getRolesAPI = async ({ header }: GetRoleProps) => {
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

export default getRolesAPI;
