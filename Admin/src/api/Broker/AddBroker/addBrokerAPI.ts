import { addBrokerEndpoint as endpoint } from "../apiEndPoints";
import { AddEditBrokerProps } from "../getBrokersTypes";

const addBrokerAPI = async ({ header, broker }: AddEditBrokerProps) => {
  return fetch(endpoint(), {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      ...broker,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default addBrokerAPI;
