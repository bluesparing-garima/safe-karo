import getRolesAPI from "./getRolesAPI";
import { GetRoleProps } from "../getRolesTypes";

const getRoleService = async ({ header }: GetRoleProps) => {
  return getRolesAPI({
    header: header,
  })
    .then((roles) => {
      return roles;
    })
    .catch((response) => {
      console.error(`getRolesAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default getRoleService;
