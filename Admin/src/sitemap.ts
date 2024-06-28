// Roles
export const rolesPath = () => `/role`;
export const rolesAddPath = () => `/role/add`;
export const roleEditPath = (roleId: string) => `/role/${roleId}/edit`;
//Products
export const productPath = () => "/product";
export const productAddPath = () => "/product/add";
export const productEditPath = (productId: string) =>
  `/product/${productId}/edit`;
//Makes
export const makePath = () => "/make";
export const makeAddPath = () => "/make/add";
export const makeEditPath = (makeId: string) => `/make/${makeId}/edit`;
//MOdels
export const modelPath = () => "/model";
export const modelAddPath = () => "/model/add";
export const modelEditPath = (modelId: string) => `/model/${modelId}/edit`;
//Company
export const companyPath = () => "/company";
export const companyAddPath = () => "/company/add";
export const companyEditPath = (companyId: string) =>
  `/company/${companyId}/edit`;

//Broker
export const brokerPath = () => "/broker";
export const brokerAddPath = () => "/broker/add";
export const brokerEditPath = (brokerId: string) => `/broker/${brokerId}/edit`;

//Branch
export const branchPath = () => "/branch";
export const branchAddPath = () => "/branch/add";
export const branchEditPath = (branchId: string) => `/branch/${branchId}/edit`;
// PolicyTypes
export const policyTypePath = () => `/policytype`;
export const policyTypeAddPath = () => `/policytype/add`;
export const policyTypeEditPath = (policyTypeId: string) =>
  `/policytype/${policyTypeId}/edit`;

// CaseTypes
export const caseTypesPath = () => `/caseType`;
export const caseTypesAddPath = () => `/caseType/add`;
export const caseTypesEditPath = (caseTypeId: string) =>
  `/caseType/${caseTypeId}/edit`;

// FuelTypes
export const fuelTypesPath = () => `/fuelType`;
export const fuelTypesAddPath = () => `/fuelType/add`;
export const fuelTypesEditPath = (fuelTypeId: string) =>
  `/fuelType/${fuelTypeId}/edit`;

// Product Types
export const productSubTypesPath = () => `/productsubtype`;
export const productSubTypesDirectAddPath = (productId: string) =>
  `/productsubtype/add/${productId}`;
export const productSubTypesAddPath = () => `/productsubtype/add`;
export const productSubTypeEditPath = (productSubTypeId: string) =>
  `/productsubtype/${productSubTypeId}/edit`;

//Policies
export const motorPolicyAddPath = () => `/policy/motor`;
export const motorPolicyViewPath = () => `/policy/view`;
export const motorPolicyPath = () => `/policy/motorpolicies`;

export const calculatePayInPolicyPath = () => `/calculate/payin`;
// Product Types
export const categoryPath = () => `/category`;
export const categoryAddPath = () => `/category/add`;
export const categoryEditPath = (categoryId: string) =>
  `/category/${categoryId}/edit`;

// Team Types
export const teamPath = () => `/team`;
export const teamAddPath = () => `/team/add`;
export const teamEditPath = (teamId: string) => `/team/${teamId}/edit`;

export const bookingRequestsPath = () => `/booking`;
export const bookingRequestsAddPath = () => `/booking/add`;
export const bookingRequestEditPath = (bookingRequestId: string) =>
  `/booking/${bookingRequestId}/edit`;
export const bookingRequestNewPath = (leadId: string) =>
  `/booking/${leadId}/new`;

export const leadsPath = () => `/lead`;
export const leadsAddPath = () => `/lead/add`;
export const leadEditPath = (leadId: string) => `/lead/${leadId}/edit`;
export const QuotationAddPath = (leadId: string) => `/lead/${leadId}/quotation`;
export const QuotationViewPath = (leadId: string) =>
  `/lead/${leadId}/quotation/view`;
