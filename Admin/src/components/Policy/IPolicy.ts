export interface PolicyTypes {
  activityTypes: string[];
}

export interface IPolicies {
  status: string;
  data?: IPolicy;
  message?: string;
}

export interface IPolicy {
  _id?: string;
  uuid?: string;
  category: string; //motor
  policyType: string; //Package
  caseType: string; //new ,renewal
  productType: string; //two wheeler
  subCategory?: string; //
  companyName: string; //TATA
  broker: string;
  make: string; //company of vehicle
  model: string; //company vechicle model
  fuelType: string; //LPG
  rto: string; //
  vehicleNumber: string;
  seatingCapacity?: number;
  cc: number; //1000cc,2500cc
  weight?: number; //
  ncb: string; //
  policyNumber: string;
  fullName: string;
  emailId: string;
  phoneNumber: number;
  vehicleAge?: string; //matter
  mfgYear: number;
  tenure: number;
  registrationDate: string;
  endDate: string;
  issueDate: string;
  idv: number;
  od: number;
  tp: number;
  netPremium: number;
  finalPremium: number;
  paymentMode: string;
  policyCreatedBy: string;
  documents: any[];
  policyStatus?: string; //booked
  paymentDetails?: string;
  partnerId?: string;
  partnerName?: string;
  relationshipManagerId?: string;
  relationshipManagerName?: string;
  odPercentage?: number;
  tpPercentage?: number;
  odPayoutAmount?: number;
  tpPayoutAmount?: number;
  updatedOn?: any;
  createdOn?: any;
  createdBy?: any;
  updatedby?: any;
}

export interface IPolicyVM {
  id?: string;
  uuid?: string;
  category: string; //motor
  policyType: string; //Package
  caseType: string; //new ,renewal
  productType: string; //two wheeler
  subCategory?: string; //
  companyName: string; //TATA
  broker: string;
  make: string; //company of vehicle
  model: string; //company vechicle model
  fuelType: string; //LPG
  rto: string; //
  vehicleNumber: string;
  seatingCapacity?: number;
  cc: number;
  weight?: number; //100o,2500
  ncb: string; //
  policyNumber: string;
  fullName: string;
  emailId: string;
  phoneNumber: number;
  vehicleAge?: string; //matter
  mfgYear: number;
  tenure: number;
  registrationDate: string;
  endDate: string;
  issueDate: string;
  idv: number;
  od: number;
  tp: number;
  netPremium: number;
  finalPremium: number;
  paymentMode: string;
  policyCreatedBy: string;
  documents: any[];
  policyStatus?: string; //booked
  paymentDetails?: string;
  partnerId?: string;
  partnerName?: string;
  relationshipManagerId?: string;
  relationshipManagerName?: string;
  odPercentage?: number;
  tpPercentage?: number;
  odPayoutAmount?: number;
  tpPayoutAmount?: number;
  updatedOn?: any;
  createdOn?: any;
  createdBy?: any;
  updatedby?: any;
}

export interface IAddEditPolicyForm {
  id?: string;
  category: string; //motor
  policyType: string; //Package
  caseType: string; //new ,renewal
  productType: string; //two wheeler
  subCategory?: string; //
  companyName: string; //TATA
  broker: string;
  make: string; //company of vehicle
  model: string; //company vechicle model
  fuelType: string; //LPG
  rto: string; //
  vehicleNumber: string;
  seatingCapacity?: number;
  cc: number;
  weight?: number; //100o,2500
  ncb: string; //
  policyNumber: string;
  fullName: string;
  emailId: string;
  phoneNumber: number;
  vehicleAge?: string; //matter
  mfgYear: number;
  tenure: number;
  registrationDate: string;
  endDate: string;
  issueDate: string;
  idv: number;
  od: number;
  tp: number;
  netPremium: number;
  finalPremium: number;
  paymentMode: string;
  policyCreatedBy: string;
  documents: any[];
  policyStatus?: string; //booked
  paymentDetails?: string;
  partnerId?: string;
  partnerName?: string;
  relationshipManagerId?: string;
  relationshipManagerName?: string;
  odPercentage?: number;
  tpPercentage?: number;
  odPayoutAmount?: number;
  tpPayoutAmount?: number;
  updatedOn?: any;
  createdOn?: any;
  createdBy?: any;
  updatedby?: any;
}
