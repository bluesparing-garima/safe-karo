export interface ILeadForm {
  id?: string;
  category: string; //motor
  policyType: string; //Package
  caseType: string; //new ,renewal
  companyName: string; //TATA
  partnerId?: string;
  partnerName?: string;
  relationshipManagerId?: string;
  relationshipManagerName?: string;
  documents?: any[];
  leadCreatedBy: string;
  remarks?: string;
  status: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
}

export interface ILead {
  status: string;
  data?: ILeads;
  message?: string;
}

export interface ILeads {
  _id?: string;
  category: string; //motor
  policyType: string; //Package
  caseType: string; //new ,renewal
  companyName: string; //TATA
  partnerId?: string;
  partnerName?: string;
  relationshipManagerId?: string;
  relationshipManagerName?: string;
  documents?: any[];
  remarks?: string;
  status?: string;
  isActive?: boolean;
  leadCreatedBy: string;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}
export interface ILeadsVM {
  id?: string;
  category: string; //motor
  policyType: string; //Package
  caseType: string; //new ,renewal
  companyName: string; //TATA
  partnerId?: string;
  partnerName?: string;
  relationshipManagerId?: string;
  relationshipManagerName?: string;
  documents?: any[];
  remarks?: string;
  leadCreatedBy: string;
  status: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}

export interface IQuotation {
  status: string;
  data?: IQuotations;
  message?: string;
}
export interface IQuotations {
  id?: string;
  leadId?: string;
  partnerId?: string;
  partnerName?: string;
  //relationshipManagerId?: string;
  //relationshipManagerName?: string;
  quotationImage?: string;
  comments: string; //motor
  status: string;
  isActive?: boolean;
  createdBy?: string;
}
export interface IQuotationForm {
  id?: string;
  leadId?: string;
  partnerId?: string;
  partnerName?: string;
  //relationshipManagerId?: string;
  //relationshipManagerName?: string;
  quotationImage?: string;
  comments: string; //motor
  status: string;
  isActive?: boolean;
  createdBy?: string;
}
