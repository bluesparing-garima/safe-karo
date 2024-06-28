import { Header } from "../../Auth/IAuth";
import { IQuotationForm } from "../../components/Agent/IAgent";

export interface AddEditQuotationProps {
  header: Header;
  quotation: IQuotationForm;
}

export interface GetQuotationProps {
  header?: Header;
}

export interface GetQuotationByLeadIdProps {
  header?: Header;
  leadId:string;
}