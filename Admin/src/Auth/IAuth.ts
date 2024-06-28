export type Header = {
  "Content-Type": string;
  "Access-Token": string;
  "Id-Token": string;
  "Refresh-Token": string;
};

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp {
  name: string;
  email: string;
  role:string;
  partnerId?:string;
  password: string;
  phoneNumber: string;
  confirmPassword?: string;
}
