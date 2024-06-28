import getPolicyByNumberAPI from "./getPolicyByNumberAPI";
import { GetPolicyByNumberProps } from "../getPoliciesTypes";

const getPolicyByNumberService = async ({
  header,
  policyNumber,
}: GetPolicyByNumberProps) => {
  return getPolicyByNumberAPI({
    header: header,
    policyNumber: policyNumber,
  })
    .then((policy) => {
      return policy;
    })
    .catch((response) => {
      console.error(
        `getPolicyByNumberAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getPolicyByNumberService;
