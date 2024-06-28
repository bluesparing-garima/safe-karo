import getCalculatePayOutAPI from "./getCalculatePayOutAPI";
import { GetCalculateTypeProps } from "../geCalculateTypes";

const getCalculatePayOutService = async (props: GetCalculateTypeProps) => {
  return getCalculatePayOutAPI(props)
    .then((calculatedPayOutRecord) => {
      return calculatedPayOutRecord;
    })
    .catch((response) => {
      console.error(
        `getCalculatePayOutAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getCalculatePayOutService;
