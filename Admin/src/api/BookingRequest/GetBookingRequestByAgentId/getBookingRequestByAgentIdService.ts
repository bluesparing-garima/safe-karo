import getBookingRequestByAgentIdAPI from "./getBookingRequestByAgentIdAPI";
import { GetBookingRequestByAgentIdProps } from "../getBookingRequestTypes";

const getBookingRequestByAgentIdService = async ({
  header,
  partnerId,
}: GetBookingRequestByAgentIdProps) => {
  return getBookingRequestByAgentIdAPI({
    header: header,
    partnerId: partnerId,
  })
    .then((bookingRequestes) => {
      return bookingRequestes;
    })
    .catch((response) => {
      console.error(
        `getBookingRequestByAgentIdAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getBookingRequestByAgentIdService;
