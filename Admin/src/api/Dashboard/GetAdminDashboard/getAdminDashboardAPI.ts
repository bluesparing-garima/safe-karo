import { getDashboardEndpoint as endpoint } from "../apiEndPoints";
import { getAdminDashboardProps } from "../getDashbaordTypes";

const getAdminDashboardAPI = async ({ header }: getAdminDashboardProps) => {
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

export default getAdminDashboardAPI;
