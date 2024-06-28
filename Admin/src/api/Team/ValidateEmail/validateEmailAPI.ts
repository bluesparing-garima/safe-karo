import { valdiateEmailEndpoint as endpoint } from "../apiEndpoints";
import { ValidateEmailProps } from "../getTeamsTypes";

const validateEmailAPI = async ({ header, email }: ValidateEmailProps) => {
  return fetch(endpoint(email!), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default validateEmailAPI;
