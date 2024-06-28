import getCalculatePayinAPI from "./getCalculatePayinAPI";
import { GetCalculateTypeProps } from "../geCalculateTypes";

const getCalculatePayinService = async (props: GetCalculateTypeProps) => {
  return getCalculatePayinAPI(props)
    .then((calculatedPayInRecord) => {
      return calculatedPayInRecord;
    })
    .catch((response) => {
      console.error(
        `getCalculatePayinAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getCalculatePayinService;
