export interface IBookingRequest {
    status: string;
    data?: IBookingRequest;
    message?: string;
  }
  
  export interface IBookingRequests {
    _id?: string;
    uuid?: string;
    policyNumber: string;
    category: string; //motor,non motor
    policyType: string;//Package 
    caseType: string; //new ,renewal
    productType: string;//two wheeler
    subCategory?: string;//
    companyName: string;//TATA
    partnerId: string;//
    partnerName: string;//
    relationshipManagerId?: string;
    relationshipManagerName?: string;
    bookingStatus: string;//
    bookingCreatedBy: string;//creating by lgin user
    document: any[];  
    isActive?:any;
    updatedOn?: any;
    createdOn?: any;
    createdBy?: any;
    updatedby?: any;
  }
  
  export interface IBookingRequestsVM {
    id?: string;
    uuid?: string;
    policyNumber: string;
    category: string; //motor,non motor
    policyType: string;//Package 
    caseType: string; //new ,renewal
    productType: string;//two wheeler
    subCategory?: string;//
    companyName: string;//TATA
    partnerId: string;//
    partnerName: string;//
    relationshipManagerId?: string;
    relationshipManagerName?: string;
    bookingStatus: string;//
    bookingCreatedBy: string;//creating by lgin user
    document: any[];  
    isActive?:any;
    updatedOn?: any;
    createdOn?: any;
    createdBy?: any;
    updatedby?: any;
  }
  
  export interface IBookingRequestForm {
    policyNumber: string;
    category: string; //motor,non motor
    policyType: string;//Package 
    caseType: string; //new ,renewal
    productType: string;//two wheeler
    subCategory?: string;//
    companyName: string;//TATA
    partnerId: string;//
    partnerName: string;//
    relationshipManagerId?: string;
    relationshipManagerName?: string;
    bookingStatus: string;//
    bookingCreatedBy: string;//creating by lgin user
    document: any[];  
    isActive?:any;
    updatedOn?: any;
    createdOn?: any;
    createdBy?: any;
    updatedby?: any;
  }
  