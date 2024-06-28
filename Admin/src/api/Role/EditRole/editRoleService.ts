import editRoleAPI from "./editRoleAPI";
import { AddEditRoleProps } from "../getRolesTypes";

const editRoleService = async ({ header, role }: AddEditRoleProps) => {
  return editRoleAPI({
    header,
    role,
  })
    .then((roleRecord) => {
      return roleRecord;
    })
    .catch((response) => {
      console.error(`editRoleAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default editRoleService;
