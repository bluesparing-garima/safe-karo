import { deleteBrokerEndpoint as endpoint } from "../apiEndPoints";
import { DeleteBrokerProps } from "../getBrokersTypes";

const deleteBrokerAPI = async ({ header, brokerId }: DeleteBrokerProps) => {
  return fetch(endpoint(brokerId!), {
    method: "DELETE",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default deleteBrokerAPI;
