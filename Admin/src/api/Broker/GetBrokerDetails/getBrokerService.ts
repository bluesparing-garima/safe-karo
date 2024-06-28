import getBrokerDetailsAPI from "./getBrokerAPI";
import { GetBrokerDetailsProps } from "../getBrokersTypes";
import convertIBrokerToIBrokerVM from "../convertBrokerToIBrokerVM";

const getBrokerDetailsService = async ({
  header,
  brokerId,
}: GetBrokerDetailsProps) => {
  return getBrokerDetailsAPI({
    header: header,
    brokerId: brokerId,
  })
    .then((brokerRecord) => {
      const brokers = convertIBrokerToIBrokerVM(brokerRecord.data);
      return brokers;
    })
    .catch((response) => {
      console.error(
        `getBrokerDetailsAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getBrokerDetailsService;
