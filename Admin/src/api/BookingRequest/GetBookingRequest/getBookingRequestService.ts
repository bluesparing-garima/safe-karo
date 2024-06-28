import getBookingRequestAPI from "./getBookingRequestAPI";
import { GetBookingRequestProps } from "../getBookingRequestTypes";

const getBookingRequestService = async ({ header }: GetBookingRequestProps) => {
  return getBookingRequestAPI({
    header: header,
  })
    .then((bookingRequestes) => {
      return bookingRequestes;
    })
    .catch((response) => {
      console.error(`getBookingRequestAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default getBookingRequestService;
