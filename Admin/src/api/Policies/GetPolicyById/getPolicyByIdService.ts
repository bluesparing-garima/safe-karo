import getPolicyByIdAPI from "./getPolicyByIdAPI";
import { GetPolicyByIdProps } from "../getPoliciesTypes";

const getPolicyByIdService = async ({
  header,
  partnerId,
}: GetPolicyByIdProps) => {
  return getPolicyByIdAPI({
    header: header,
    partnerId: partnerId,
  })
    .then((motorPolicies) => {
      return motorPolicies;
    })
    .catch((response) => {
      console.error(
        `getPolicyByIdAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getPolicyByIdService;
