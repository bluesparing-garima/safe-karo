import editBrokerAPI from "./editBrokerAPI";
import { AddEditBrokerProps } from "../getBrokersTypes";

const editBrokerService = async ({ header, broker }: AddEditBrokerProps) => {
  return editBrokerAPI({
    header,
    broker,
  })
    .then((brokerRecord) => {
      return brokerRecord;
    })
    .catch((response) => {
      console.error(`editBrokerAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default editBrokerService;
