import { getBookingRequestbyIdEndpoint as endpoint } from "../apiEndPoints";
import { GetBookingRequestByIdProps } from "../getBookingRequestTypes";

const getBookingRequestByIdAPI = async ({ header,userId }: GetBookingRequestByIdProps) => {
  return fetch(endpoint(userId), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getBookingRequestByIdAPI;
