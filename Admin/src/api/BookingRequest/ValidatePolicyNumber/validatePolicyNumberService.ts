import validatePolicyNumberAPI from "./validatePolicyNumberAPI";
import { ValidateBookingRequestProps } from "../getBookingRequestTypes";

const validatePolicyNumberService = async ({
  header,
  policyNumber,
}: ValidateBookingRequestProps) => {
  return validatePolicyNumberAPI({
    header: header,
    policyNumber: policyNumber,
  })
    .then((bookingRequest) => {
      return bookingRequest;
    })
    .catch((response) => {
      console.error(
        `validatePolicyNumberAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default validatePolicyNumberService;
