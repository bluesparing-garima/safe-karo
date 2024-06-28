import { addCaseTypeEndpoint as endpoint } from "../apiEndpoints";
import { AddEditCaseTypeProps } from "../getCaseTypes";

const addCaseTypeAPI = async ({ header, caseType }: AddEditCaseTypeProps) => {
  try {
    const response = await fetch(endpoint(), {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        ...caseType,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Server responded with error:", errorResponse);
      return Promise.reject(response);
    }

    return response.json();
  } catch (error) {
    console.error("Failed to call addCaseTypeAPI:", error);
    return Promise.reject(error);
  }
};

export default addCaseTypeAPI;

