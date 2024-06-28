import { editRoleEndpoint as endpoint } from "../apiEndpoints";
import { AddEditRoleProps } from "../getRolesTypes";

const editRoleAPI = async ({ header, role }: AddEditRoleProps) => {
  return fetch(endpoint(role.id!), {
    method: "PUT",
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

export default editRoleAPI;
