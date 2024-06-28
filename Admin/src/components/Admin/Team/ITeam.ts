export interface ITeamForm {
  id?: string;
  branchName?: string;
  role: any;
  partnerId?: string;
  headRMId?: string;
  headRM?: string;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  password?: string;
  pincode?: string;
  bankName?: string;
  IFSC?: string;
  accountHolderName?: string;
  accountNumber?: string;
  salary?: number;
  document?: any[];
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
}

export interface ITeamsVM {
  id?: string;
  branchName?: string;
  role?: string;
  partnerId?: string;
  headRMId?: string;
  headRM?: string;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  pincode?: string;
  bankName?: string;
  IFSC?: string;
  accountHolderName?: string;
  accountNumber?: string;
  password?: string;
  salary?: number;
  document?: any[];
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
  forceUpdate?: number;
}
export interface ITeams {
  _id?: string;
  branchName?: string;
  role?: string;
  partnerId?: string;
  headRMId?: string;
  headRM?: string;
  fullName?: string;
  phoneNumber?: string;
  password?: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  pincode?: string;
  bankName?: string;
  IFSC?: string;
  accountHolderName?: string;
  accountNumber?: string;
  salary?: number;
  document?: any[];
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  updatedOn?: string;
  updatedBy?: string;
}

export interface ITeam {
  status: string;
  data: ITeams[];
  message: string;
}
