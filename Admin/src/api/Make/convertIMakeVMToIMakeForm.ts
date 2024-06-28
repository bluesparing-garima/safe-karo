// import dayjs from "dayjs";
// import { DAYJS_DISPLAY_FORMAT } from "../../context/constant";

import { IMakeForm, IMakesVM } from "../../components/Admin/Make/IMake";

export const convertIMakeVMToIMakeForm = (make: IMakesVM): IMakeForm => {
  const makeForm: IMakeForm = {
    id: make.id!,
    makeName: make.makeName!,
    updatedBy: make.updatedBy!,
    isActive: !!make.isActive,
    createdBy: make.createdBy!,
  };
  return makeForm;
};
