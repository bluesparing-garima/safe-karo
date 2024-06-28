import { addRoleEndpoint as endpoint } from "../apiEndpoints";
import { AddEditRoleProps } from "../getRolesTypes";

const addRoleAPI = async ({ header, role }: AddEditRoleProps) => {
  return fetch(endpoint(), {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...role,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default addRoleAPI;
