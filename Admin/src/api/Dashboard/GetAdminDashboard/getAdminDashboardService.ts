import getAdminDashboardAPI from "./getAdminDashboardAPI";
import { getAdminDashboardProps } from "../getDashbaordTypes";
const getAdminDashboardService = async ({ header }: getAdminDashboardProps) => {
  return getAdminDashboardAPI({
    header: header,
  })
    .then((dashboard) => {
      return dashboard;
    })
    .catch((response) => {
      console.error(
        `getAdminDashboardAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getAdminDashboardService;
