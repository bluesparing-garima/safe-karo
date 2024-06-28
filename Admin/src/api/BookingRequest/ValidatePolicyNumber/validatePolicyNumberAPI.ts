import { validateBookingRequestEndpoint as endpoint } from "../apiEndPoints";
import { ValidateBookingRequestProps } from "../getBookingRequestTypes";

const validatePolicyNumberAPI = async ({
  header,
  policyNumber,
}: ValidateBookingRequestProps) => {
  return fetch(endpoint(policyNumber), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default validatePolicyNumberAPI;
