import getPolicyTypeDetailsAPI from "./getPolicyTypeDetailsAPI";
import { GetPolicyTypeDetailsProps } from "../getPolicyTypes";
import convertIPolicyTypeToIPolicyTypeVM from "../convertIPolicyTypeToIPolicyTypeVM";

const getPolicyTypeDetailsService = async ({
  header,
  policyTypeId,
}: GetPolicyTypeDetailsProps) => {
  return getPolicyTypeDetailsAPI({
    header: header,
    policyTypeId: policyTypeId,
  })
    .then((policyTypeRecord) => {
      const policyTypes = convertIPolicyTypeToIPolicyTypeVM(policyTypeRecord.data);
      return policyTypes;
    })
    .catch((response) => {
      console.error(
        `getPolicyTypeDetailsAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getPolicyTypeDetailsService;
