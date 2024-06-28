import { AddPolicyProps } from "../getPoliciesTypes";
import addPolicyAPI from "./addPolicyAPI";

const addPolicyService = async ({ header, policy }: AddPolicyProps) => {
  return addPolicyAPI({
    header: header,
    policy: policy,
  })
    .then((newPolicy) => {
      return newPolicy;
    })
    .catch((response) => {
      console.error(
        `addPolicyAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default addPolicyService;
