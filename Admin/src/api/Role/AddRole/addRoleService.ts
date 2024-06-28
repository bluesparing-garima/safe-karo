import addRoleAPI from "./addRoleAPI";
import { AddEditRoleProps } from "../getRolesTypes";

const addRoleService = async ({ header, role }: AddEditRoleProps) => {
  return addRoleAPI({
    header: header,
    role: role,
  })
    .then((newRole) => {
      return newRole;
    })
    .catch((response) => {
      console.error(`addRoleAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default addRoleService;
