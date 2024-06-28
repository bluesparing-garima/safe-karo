import addBookingRequestAPI from "./addBookingRequestAPI";
import { AddEditBookingRequestProps } from "../getBookingRequestTypes";

const addBookingRequestService = async ({ header, bookingRequest }: AddEditBookingRequestProps) => {
  return addBookingRequestAPI({
    header: header,
    bookingRequest: bookingRequest,
  })
    .then((newBookingRequest) => {
      return newBookingRequest;
    })
    .catch((response) => {
      console.error(`addBookingRequestAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default addBookingRequestService;
