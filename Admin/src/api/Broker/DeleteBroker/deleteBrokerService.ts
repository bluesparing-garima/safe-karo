import deleteBrokerAPI from "./deleteBrokerAPI";
import { DeleteBrokerProps } from "../getBrokersTypes";

const deleteBrokerService = async ({
  header,
  brokerId,
  brokers,
}: DeleteBrokerProps) => {
  return deleteBrokerAPI({
    header,
    brokerId,
    brokers,
  })
    .then(() => {
      const deletedBrokerIndex = brokers.findIndex((broker) => broker._id === brokerId);
      //Remove this Why becasue i dont want to call Get API in display layer
      brokers.splice(deletedBrokerIndex, 1);
      return brokers;
    })
    .catch((response) => {
      console.error(
        `deleteBrokerAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default deleteBrokerService;
