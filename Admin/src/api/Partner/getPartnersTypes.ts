import { Header } from "../../Auth/IAuth";
import { IPartnerForm, IPartners } from "../../components/Admin/Partner/IPartner";

export interface AddEditPartnerProps {
  header: Header;
  partner: IPartnerForm;
}

export interface GetPartnerProps {
  header?: Header;
  role?:string;
}

export interface GetPartnerDetailsProps {
  header?: Header;
  partnerId?: string;
}

export interface DeletePartnerProps {
  header?: Header;
  partnerId?: string;
  partners: IPartners[];
}
