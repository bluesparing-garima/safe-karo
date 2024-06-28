// const API_ENDPOINT_HOST: string =
//   process.env.REACT_APP_SAFE_KARO_ADMIN_API_ENDPOINT || "";

const API_ENDPOINT_HOST = "http://localhost:8000";
//const API_ENDPOINT_HOST = "https://safe-karo-api.onrender.com";


export const addTeamEndpoint = () => API_ENDPOINT_HOST.concat(`/api/user-profile`);
export const getRMListEndpoint = (role:string) => API_ENDPOINT_HOST.concat(`/api/user-profile/byRole?role=${role}`);

export const editTeamEndpoint = (teamId: string) =>
  API_ENDPOINT_HOST.concat(`/api/user-profile/${teamId}`);

export const getTeamEndpoint = () => API_ENDPOINT_HOST.concat(`/api/user-profile`);

export const getTeamDetailsEndpoint = (teamId: string) =>
  API_ENDPOINT_HOST.concat(`/api/user-profile/${teamId}`);

export const deleteTeamEndpoint = (teamId: string) =>
  API_ENDPOINT_HOST.concat(`/api/user-profile/${teamId}`);

export const valdiateEmailEndpoint = (emailId: string) =>
  API_ENDPOINT_HOST.concat(`/api/user-profile/check-email?email=${emailId}`);