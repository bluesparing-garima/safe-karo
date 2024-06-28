import { deleteRoleEndpoint as endpoint } from "../apiEndpoints";
import { DeleteRoleProps } from "../getRolesTypes";

const deleteRoleAPI = async ({ header, roleId }: DeleteRoleProps) => {
  return fetch(endpoint(roleId!), {
    method: "DELETE",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default deleteRoleAPI;
