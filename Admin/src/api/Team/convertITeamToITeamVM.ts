import dayjs from "dayjs";
import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";
import { ITeams, ITeamsVM } from "../../components/Admin/Team/ITeam";

const convertITeamToITeamVM = (data: ITeams): ITeamsVM => {
  const teamViewModel: ITeamsVM = {
    id: data._id ? data._id : "",
    branchName: data.branchName ? data.branchName : "",
    role: data.role ? data.role : "",
    partnerId: data.partnerId ? data.partnerId : "",
    headRMId: data.headRMId ? data.headRMId : "",
    headRM: data.headRM ? data.headRM : "",
    fullName: data.fullName ? data.fullName : "",
    phoneNumber: data.phoneNumber ? data.phoneNumber : "",
    email: data.email ? data.email : "",
    password: data.password ? data.password : "",
    dateOfBirth: data.dateOfBirth
      ? dayjs(data?.dateOfBirth).format(DAYJS_DISPLAY_FORMAT)
      : "",
    gender: data.gender ? data.gender : "",
    address: data.address ? data.address : "",
    pincode: data.pincode ? data.pincode : "",
    bankName: data.bankName ? data.bankName : "",
    IFSC: data.IFSC ? data.IFSC : "",
    accountHolderName: data.accountHolderName ? data.accountHolderName : "",
    accountNumber: data.accountNumber ? data.accountNumber : "",
    salary: data.salary ? data.salary : 0,
    document: data.document ? data.document : [],
    isActive: data.isActive ? data.isActive : true,
    createdBy: data.createdBy ? data.createdBy : "",
    updatedBy: data.updatedBy ? data.updatedBy : "",
    createdOn: data.createdOn
      ? dayjs(data?.createdOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
    updatedOn: data.updatedOn
      ? dayjs(data?.updatedOn).format(DAYJS_DISPLAY_FORMAT)
      : "",
  };
  return teamViewModel;
};

export default convertITeamToITeamVM;
