import deleteRoleAPI from "./deleteRoleAPI";
import { DeleteRoleProps } from "../getRolesTypes";

const deleteRoleService = async ({
  header,
  roleId,
  roles,
}: DeleteRoleProps) => {
  return deleteRoleAPI({
    header,
    roleId,
    roles,
  })
    .then(() => {
      const deletedRoleIndex = roles.findIndex((role) => role._id === roleId);
      //Remove this Why becasue i dont want to call Get API in display layer
      roles.splice(deletedRoleIndex, 1);
      return roles;
    })
    .catch((response) => {
      console.error(
        `deleteRoleAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default deleteRoleService;
