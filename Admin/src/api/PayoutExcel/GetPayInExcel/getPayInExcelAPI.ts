import { getPayInExcelEndpoint as endpoint } from "../apiEndpoints";
import { GetPayInExcelProps } from "../getPayTypes";

const getPayInExcelAPI = async ({ header }: GetPayInExcelProps) => {
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

export default getPayInExcelAPI;
