import getPartnersAPI from "./getPartnersAPI";
import { GetPartnerProps } from "../getPartnersTypes";

const getPartnersService = async ({ header, role }: GetPartnerProps) => {
  return getPartnersAPI({
    header: header,
    role: role,
  })
    .then((partners) => {
      return partners;
    })
    .catch((response) => {
      console.error(
        `getPartnersAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getPartnersService;
