import getRoleDetailsAPI from "./getRoleDetailsAPI";
import { GetRoleDetailsProps } from "../getRolesTypes";
import convertIRoleToIRoleVM from "../convertIRoleToIRoleVM";

const getRoleDetailsService = async ({
  header,
  roleId,
}: GetRoleDetailsProps) => {
  return getRoleDetailsAPI({
    header: header,
    roleId: roleId,
  })
    .then((roleRecord) => {
      const roles = convertIRoleToIRoleVM(roleRecord.data);
      return roles;
    })
    .catch((response) => {
      console.error(
        `getRoleDetailsAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getRoleDetailsService;
