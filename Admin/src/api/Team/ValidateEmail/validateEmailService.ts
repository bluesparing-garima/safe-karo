import validateEmailAPI from "./validateEmailAPI";
import { ValidateEmailProps } from "../getTeamsTypes";

const validateEmailService = async ({ header, email }: ValidateEmailProps) => {
  return validateEmailAPI({
    header: header,
    email: email,
  })
    .then((teamRecord) => {
      return teamRecord;
    })
    .catch((response) => {
      console.error(
        `validateEmailAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default validateEmailService;
