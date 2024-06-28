import { editBrokerEndpoint as endpoint } from "../apiEndPoints";
import { AddEditBrokerProps } from "../getBrokersTypes";

const editBrokerAPI = async ({ header, broker }: AddEditBrokerProps) => {
  return fetch(endpoint(broker.id!), {
    method: "PUT",
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

export default editBrokerAPI;
