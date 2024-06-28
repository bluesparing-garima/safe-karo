import { AddPolicyProps } from "../getPoliciesTypes";
import editPolicyAPI from "./editPolicyAPI";

const editPolicyService = async ({ header, policy }: AddPolicyProps) => {
  return editPolicyAPI({
    header: header,
    policy: policy,
  })
    .then((newPolicy) => {
      return newPolicy;
    })
    .catch((response) => {
      console.error(
        `editPolicyAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default editPolicyService;
