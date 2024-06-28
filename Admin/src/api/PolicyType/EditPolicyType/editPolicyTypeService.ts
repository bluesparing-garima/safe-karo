import { AddEditPolicyTypeProps } from "../getPolicyTypes";
import editPolicyTypeAPI from "./editPolicyTypeAPI";

const editPolicyTypeService = async ({ header, policyType }: AddEditPolicyTypeProps) => {
  return editPolicyTypeAPI({
    header,
    policyType,
  })
    .then((policyTypeRecord) => {
      return policyTypeRecord;
    })
    .catch((response) => {
      console.error(`editPolicyTypeAPI failed with http status = ${response.status}`);
      return Promise.reject(response);
    });
};

export default editPolicyTypeService;
