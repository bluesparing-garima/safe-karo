import getMotorPolicyAPI from "./getMotorPolicyAPI";
import { GetMotorPoliciesProps } from "../getPoliciesTypes";

const getMotorPolicyService = async ({ header }: GetMotorPoliciesProps) => {
  return getMotorPolicyAPI({
    header: header,
  })
    .then((motorPolicies) => {
      return motorPolicies;
    })
    .catch((response) => {
      console.error(`getMotorPolicyAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default getMotorPolicyService;
