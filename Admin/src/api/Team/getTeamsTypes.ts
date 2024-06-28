import { Header } from "../../Auth/IAuth";
import { ITeamForm, ITeams } from "../../components/Admin/Team/ITeam";

export interface AddEditTeamProps {
  header: Header;
  team: ITeamForm;
}

export interface GetTeamProps {
  header?: Header;
}

export interface GetTeamDetailsProps {
  header?: Header;
  teamId?: string;
}

export interface DeleteTeamProps {
  header?: Header;
  teamId?: string;
  teams: ITeams[];
}
export interface GetRMListProps {
  header?: Header;
  role:string;
}

export interface ValidateEmailProps {
  header?: Header;
  email:string;
}
