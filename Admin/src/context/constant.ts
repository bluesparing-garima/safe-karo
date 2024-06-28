export const ADD = "add";
export const UPDATE = "update";

// Standard Date/Time format
export const DATE_TIME_FORMAT = "MMM dd, yyyy, hh:mm a";
export const DATE_FORMAT = "MMM dd, yyyy";
export const DAYJS_FORMAT = "YYYY-MM-DD HH:mm";
export const DAY_FORMAT = "YYYY-MM-DD";
// Jul 19, 2023, 07:00 AM
export const DAYJS_DISPLAY_FORMAT_TABLES = "MMM DD, YYYY";
export const DAYJS_DISPLAY_FORMAT = "MMM DD, YYYY, hh:mm a";
export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
export type SafeKaroContextType = {
  user: SafeKaroUser;
  header: Header;
};
export interface Document {
  docName: string;
  file: string;
}
export const header: any = {
  "Content-Type": "application/json",
  "Access-Token": "",
  "Id-Token": "",
  "Refresh-Token": "",
};
export type SafeKaroUser = {
  isLoggedIn: boolean;
  id: string;
  name: string;
  email: string;
  role: string;
  partnerId: string; //object ID
  headRMId: string; //object ID
  headRM: string; //object ID
  // accessToken: string;
  idToken: string;
  // refreshToken: string;
};

export type Header = {
  "Content-Type": string;
  "Access-Token": string;
  "Id-Token": string;
  "Refresh-Token": string;
};

export const policyStatusAgent = [
  { label: "Changes Required", value: "Changes Required" },
  { label: "Payment Request", value: "Payment Request" },
  { label: "Payment Done", value: "Payment Done" },
];

export const policyStatusOperation = [
  { label: "Doc Pending", value: "Doc Pending" },
  { label: "Quotation Sent", value: "Quotation Sent" },
  { label: "Payment Link Sent", value: "Payment Pending" },
  { label: "Payment Verified", value: "Payment Verified" },
  { label: "Booking", value: "Booking" },
];
