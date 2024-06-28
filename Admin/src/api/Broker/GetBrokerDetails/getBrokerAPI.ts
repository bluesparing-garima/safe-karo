import { getBrokerDetailsEndpoint as endpoint } from "../apiEndPoints";
import { GetBrokerDetailsProps } from "../getBrokersTypes";

const getBrokerDetailsAPI = async ({ header, brokerId }: GetBrokerDetailsProps) => {
  return fetch(endpoint(brokerId!), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getBrokerDetailsAPI;
