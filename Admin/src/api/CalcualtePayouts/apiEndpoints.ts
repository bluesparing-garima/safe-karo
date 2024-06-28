const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";


export const getCalcuatePayInEndpoint = (
  fuelType: string,
  policyType: string,
  companyName: string,
  productType: string,
  subCategory: string,
  engine: number,
  weight: number,
  ncb: string,
  rto: string,
  //insuredType: string,
  caseType: string,
  make: string,
  model: string,
  vehicleAge: string
) =>
  API_ENDPOINT_HOST.concat(
    `/api/calculate/pay-in?fuelType=${fuelType}&productType=${productType}&subCategory=${subCategory}
    &engine=${engine}&weight=${weight}&ncb=${ncb}&policyType=${policyType}&rto=${rto}&caseType=${caseType}
    &companyName=${companyName}&make=${make}&model=${model}&vehicleAge=${vehicleAge}`
  );

export const getCalcuatePayOutEndpoint = (
  fuelType: string,
  policyType: string,
  companyName: string,
  productType: string,
  subCategory: string,
  engine: number,
  weight: number,
  ncb: string,
  rto: string,
  //insuredType: string,
  caseType: string,
  make: string,
  model: string,
  vehicleAge: string
) =>
  API_ENDPOINT_HOST.concat(
    `/api/calculate/pay-out?fuelType=${fuelType}&productType=${productType}&subCategory=${subCategory}&engine=${engine}&weight=${weight}&ncb=${ncb}&policyType=${policyType}&rto=${rto}&caseType=${caseType}&companyName=${companyName}&make=${make}&model=${model}&vehicleAge=${vehicleAge}`
  );
