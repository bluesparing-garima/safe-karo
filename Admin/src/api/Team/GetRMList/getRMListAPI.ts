import { getRMListEndpoint as endpoint } from "../apiEndpoints";
import { GetRMListProps } from "../getTeamsTypes";

const getRMListAPI = async ({ header,role }: GetRMListProps) => {
  return fetch(endpoint(role), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getRMListAPI;
