import addBrokerAPI from "./addBrokerAPI";
import { AddEditBrokerProps } from "../getBrokersTypes";

const addBrokerService = async ({ header, broker }: AddEditBrokerProps) => {
  return addBrokerAPI({
    header: header,
    broker: broker,
  })
    .then((newBroker) => {
      return newBroker;
    })
    .catch((response) => {
      console.error(`addBrokerAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default addBrokerService;
