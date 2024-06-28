import { addBookingRequestEndpoint as endpoint } from "../apiEndPoints";
import { AddEditBookingRequestProps } from "../getBookingRequestTypes";

const addBookingRequestAPI = async ({ header, bookingRequest }: AddEditBookingRequestProps) => {
  return fetch(endpoint(), {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...bookingRequest,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default addBookingRequestAPI;
