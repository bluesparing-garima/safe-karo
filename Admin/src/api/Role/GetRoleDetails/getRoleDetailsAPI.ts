import { getRoleDetailsEndpoint as endpoint } from "../apiEndpoints";
import { GetRoleDetailsProps } from "../getRolesTypes";

const getRoleDetailsAPI = async ({ header, roleId }: GetRoleDetailsProps) => {
  return fetch(endpoint(roleId!), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getRoleDetailsAPI;
