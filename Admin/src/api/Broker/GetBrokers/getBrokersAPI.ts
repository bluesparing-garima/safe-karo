import { getBrokerEndpoint as endpoint } from "../apiEndPoints";
import { GetBrokerProps } from "../getBrokersTypes";

const getBrokersAPI = async ({ header }: GetBrokerProps) => {
  return fetch(endpoint(), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getBrokersAPI;
