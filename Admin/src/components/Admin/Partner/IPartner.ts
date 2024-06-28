export interface IPartnerForm {
  id?: string;
  name?: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
}

export interface IPartnersVM {
  id?: string;
  name?: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
  forceUpdate?: number;
}
export interface IPartners {
  _id?: string;
  name?: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}

export interface IPartner {
  status: string;
  data: IPartners[];
  message: string;
}
