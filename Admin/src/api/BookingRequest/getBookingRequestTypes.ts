import { Header } from "../../Auth/IAuth";
import {
  IBookingRequestForm,
  IBookingRequests,
} from "../../components/Booking/IBookingRequests";

export interface AddEditBookingRequestProps {
  header: Header;
  bookingRequest: IBookingRequestForm;
}

export interface GetBookingRequestProps {
  header?: Header;
}
export interface GetBookingRequestByAgentIdProps {
  header?: Header;
  partnerId: string;
}
export interface GetBookingRequestByIdProps {
  header?: Header;
  userId: string;
}
export interface ValidateBookingRequestProps {
  header?: Header;
  policyNumber: string;
}
export interface GetBookingRequestDetailsProps {
  header?: Header;
  bookingRequestId?: string;
}

export interface DeleteBookingRequestProps {
  header?: Header;
  bookingRequestId?: string;
  bookingRequestes: IBookingRequests[];
}
