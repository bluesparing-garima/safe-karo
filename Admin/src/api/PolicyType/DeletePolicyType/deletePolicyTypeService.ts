import deletePolicyTypeAPI from "./deletePolicyTypeAPI";
import { DeletePolicyTypeProps } from "../getPolicyTypes";

const deletePolicyTypeService = async ({
  header,
  policyTypeId,
  policyTypes,
}: DeletePolicyTypeProps) => {
  return deletePolicyTypeAPI({
    header,
    policyTypeId,
    policyTypes,
  })
    .then(() => {
      const deletedPolicyTypeIndex = policyTypes.findIndex(
        (policyType) => policyType._id === policyTypeId
      );
      policyTypes.splice(deletedPolicyTypeIndex, 1);
      return policyTypes;
    })
    .catch((response) => {
      console.error(
        `deletePolicyTypeAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default deletePolicyTypeService;
