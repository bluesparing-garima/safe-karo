// import dayjs from "dayjs";
// import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";

import { ILeadForm, ILeadsVM } from "../../components/Agent/IAgent";

export const convertILeadVMToILeadForm = (lead: ILeadsVM): ILeadForm => {
  const leadForm: ILeadForm = {
    id: lead.id!,
    category: lead.category!,
    policyType: lead.policyType!,
    caseType: lead.caseType!,
    companyName: lead.companyName!,
    partnerId: lead.partnerId!,
    partnerName: lead.partnerName!,
    relationshipManagerId: lead.relationshipManagerId!,
    relationshipManagerName: lead.relationshipManagerName!,
    documents: lead.documents!,
    leadCreatedBy: lead.leadCreatedBy!,
    remarks: lead.remarks!,
    status: lead.status!,
    updatedBy: lead.updatedBy!,
    createdBy: lead.createdBy!,
    // points: lead.points
    //   ? convertLocaleStringToNumber(lead.points!)
    //   : 0,
    isActive: !!lead.isActive,
    // createdOn: dayjs(lead?.createdOn).format(DAYJS_DISPLAY_FORMAT),
  };
  return leadForm;
};
