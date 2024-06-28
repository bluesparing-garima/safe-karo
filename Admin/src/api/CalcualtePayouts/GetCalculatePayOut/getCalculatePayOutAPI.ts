import { getCalcuatePayOutEndpoint as endpoint } from "../apiEndpoints";
import { GetCalculateTypeProps } from "../geCalculateTypes";

const getCalculatePayOutAPI = async (props: GetCalculateTypeProps) => {
  return fetch(
    endpoint(
      props.fuelType!,
      props.policyType!,
      props.companyName!,
      props.productType!,
      props.subCategory!,
      props.engine!,
      props.weight!,
      props.ncb!,
      props.rto!,
     // props.insuredType!,
      props.caseType!,
      props.make!,
      props.model!,
      props.vehicleAge!,
    ),
    {
      method: "GET",
      headers: props.header,
    }
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getCalculatePayOutAPI;
