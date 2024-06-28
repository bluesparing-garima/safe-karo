import deleteMakeAPI from "./deleteMakeAPI";
import { DeleteMakeProps } from "../getMakesTypes";

const deleteMakeService = async ({
  header,
  makeId,
  makes,
}: DeleteMakeProps) => {
  return deleteMakeAPI({
    header,
    makeId,
    makes,
  })
    .then(() => {
      const deletedMakeIndex = makes.findIndex((make) => make._id === makeId);
      //Remove this Why becasue i dont want to call Get API in display layer
      makes.splice(deletedMakeIndex, 1);
      return makes;
    })
    .catch((response) => {
      console.error(
        `deleteMakeAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default deleteMakeService;
