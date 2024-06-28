import getMakeDetailsAPI from "./getMakeDetailsAPI";
import { GetMakeDetailsProps } from "../getMakesTypes";
import convertIMakeToIMakeVM from "../convertIMakeToIMakeVM";

const getMakeDetailsService = async ({
  header,
  makeId,
}: GetMakeDetailsProps) => {
  return getMakeDetailsAPI({
    header: header,
    makeId: makeId,
  })
    .then((makeRecord) => {
      const makes = convertIMakeToIMakeVM(makeRecord.data);
      return makes;
    })
    .catch((response) => {
      console.error(
        `getMakeDetailsAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default getMakeDetailsService;
