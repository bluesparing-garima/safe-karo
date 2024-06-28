import { Header } from "../../Auth/IAuth";
import { IAddEditPolicyForm } from "../../components/Policy/IPolicy";

export interface AddPolicyProps {
  header: Header;
  policy: IAddEditPolicyForm;
}
export interface GetMotorPoliciesProps {
  header?: Header;
}
export interface GetPolicyByNumberProps {
  header?: Header;
  policyNumber: string;
}
export interface GetPolicyByIdProps {
  header?: Header;
  partnerId: string;
}
