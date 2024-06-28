import getBookingRequestByIdAPI from "./getBookingRequestByIdAPI";
import { GetBookingRequestByIdProps } from "../getBookingRequestTypes";

const getBookingRequestByIdService = async ({
  header,
  userId,
}: GetBookingRequestByIdProps) => {
  return getBookingRequestByIdAPI({
    header: header,
    userId: userId,
  })
    .then((bookingRequestes) => {
      return bookingRequestes;
    })
    .catch((response) => {
      console.error(
        `getBookingRequestByIdAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getBookingRequestByIdService;
