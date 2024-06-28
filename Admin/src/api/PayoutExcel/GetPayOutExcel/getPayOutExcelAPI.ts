import { getPayOutExcelEndpoint as endpoint } from "../apiEndpoints";
import { GetPayOutExcelProps } from "../getPayTypes";

const getPayOutExcelAPI = async ({ header }: GetPayOutExcelProps) => {
  return fetch(endpoint(), {
    method: "GET",
    headers: header,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  });
};

export default getPayOutExcelAPI;
