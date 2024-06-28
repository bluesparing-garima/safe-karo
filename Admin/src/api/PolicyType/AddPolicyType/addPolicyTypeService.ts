import addPolicyTypeAPI from "./addPolicyTypeAPI";
import { AddEditPolicyTypeProps } from "../getPolicyTypes";

const addPolicyTypeService = async ({ header, policyType }: AddEditPolicyTypeProps) => {
  return addPolicyTypeAPI({
    header: header,
    policyType: policyType,
  })
    .then((newPolicyType) => {
      return newPolicyType;
    })
    .catch((response) => {
      console.error(`addPolicyTypeAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default addPolicyTypeService;
