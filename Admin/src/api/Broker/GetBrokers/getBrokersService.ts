import getBrokersAPI from "./getBrokersAPI";
import { GetBrokerProps } from "../getBrokersTypes";

const getBrokerService = async ({ header }: GetBrokerProps) => {
  return getBrokersAPI({
    header: header,
  })
    .then((brokers) => {
      return brokers;
    })
    .catch((response) => {
      console.error(`getBrokersAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default getBrokerService;
