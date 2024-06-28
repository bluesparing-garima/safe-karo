import getPolicyTypeAPI from "./getPolicyTypeAPI";
import { GetPolicyTypeProps } from "../getPolicyTypes";

const getPolicyTypeService = async ({ header }: GetPolicyTypeProps) => {
  return getPolicyTypeAPI({
    header: header,
  })
    .then((policyTypes) => {
      return policyTypes;
    })
    .catch((response) => {
      console.error(
        `getPolicyTypeAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getPolicyTypeService;
