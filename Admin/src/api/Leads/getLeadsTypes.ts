import { Header } from "../../Auth/IAuth";
import { ILeadForm } from "../../components/Agent/IAgent";

export interface GetLeadsQueryString {
  delete?: boolean;
}
export interface AddEditLeadsProps {
  header: Header;
  lead: ILeadForm;
}

export interface GetLeadsProps {
  header: Header;
}

export interface GetLeadByIdProps {
  header: Header;
  leadId: string;
}
export interface GetLeadByAgentIdProps {
  header: Header;
  partnerId: string;
}
export interface GetLeadByUserIdProps {
  header: Header;
  userId: string;
}
