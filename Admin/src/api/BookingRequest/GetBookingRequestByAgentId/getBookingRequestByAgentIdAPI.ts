import { getBookingRequestbyAgentIdEndpoint as endpoint } from "../apiEndPoints";
import { GetBookingRequestByAgentIdProps } from "../getBookingRequestTypes";

const getBookingRequestByAgentIdAPI = async ({
  header,
  partnerId,
}: GetBookingRequestByAgentIdProps) => {
  return fetch(endpoint(partnerId), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getBookingRequestByAgentIdAPI;
