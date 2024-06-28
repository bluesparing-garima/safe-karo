import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  DAYJS_DISPLAY_FORMAT,
  SafeKaroUser,
  header,
} from "../../../context/constant";
import { ILeads, ILeadsVM } from "../IAgent";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { leadsAddPath, leadsPath } from "../../../sitemap";
import dayjs from "dayjs";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CountdownTimer from "../../../utils/CountdownTimer";
import getLeadService from "../../../api/Leads/GetLead/getLeadService";
import editLeadService from "../../../api/Leads/EditLead/editLeadService";

const Leads = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState<ILeads[]>([]);
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const GetNewLeads = useCallback(
    () =>
      getLeadService({ header })
        .then((leadDetails) => {
          const newLead = leadDetails.data.filter(
            (lead: any) => lead.leadCreatedBy === ""
          );
          console.log(newLead);
          setLeads(newLead);
        })
        .catch((error) => {
          console.error("Failed to fetch lead details", error);
        }),
    []
  );

  useEffect(() => {
    GetNewLeads();
  }, [GetNewLeads]);

  const navigate = useNavigate();

  const handleAddLeadClick = () => {
    navigate(leadsAddPath());
  };

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<ILeads>[]>(
    () => [
      {
        header: "Timer",
        accessorKey: "createdOn",
        size: 100,
        Cell: ({ cell }) => <CountdownTimer registerDate={cell.getValue()} />,
      },
      {
        accessorKey: "category", //normal accessorKey
        header: "Category",
        size: 100,
      },
      {
        accessorKey: "policyType", //normal accessorKey
        header: "Policy Type",
        size: 100,
      },
      {
        accessorKey: "caseType", //normal accessorKey
        header: "Case Type",
        size: 100,
      },
      {
        header: "Lead Status",
        accessorKey: "status",
        size: 50,
      },
      {
        header: "Status",
        accessorKey: "isActive",
        size: 50,
        Cell: ({ cell }) => {
          const value = cell.getValue<boolean>();
          return value ? (
            <CheckCircleOutlineIcon color="success" />
          ) : (
            <CancelOutlinedIcon color="error" />
          );
        },
      },
      {
        header: "Created On",
        accessorKey: "createdOn",
        size: 50,
      },
    ],
    []
  );

  const parsedData = useMemo(
    () =>
      leads.map(
        (lead: ILeads) =>
          ({
            id: lead._id,
            category: lead.category,
            policyType: lead.policyType,
            caseType: lead.caseType,
            companyName: lead.companyName,
            partnerId: lead.partnerId,
            partnerName: lead.partnerName,
            relationshipManagerId: lead.relationshipManagerId,
            relationshipManagerName: lead.relationshipManagerName,
            documents: lead.documents,
            remarks: lead.remarks,
            status: lead.status,
            isActive: lead.isActive,
            createdOn: dayjs(lead.createdOn).format(DAYJS_DISPLAY_FORMAT),
            updatedOn: dayjs(lead.updatedOn).format(DAYJS_DISPLAY_FORMAT),
          } as ILeadsVM)
      ) ?? [],
    [leads]
  );

  const updateLoading = useCallback(async () => {
    // setIsLoading(true) when leads.length is 0, and setIsLoading(false) when leads.length is > 0
    setIsLoading(false);
  }, []);

  useEffect(() => {
    updateLoading();
  }, [updateLoading]);

  const handleClickAcceptLead = (leadForm: ILeadsVM) => {
    // navigate(leadEditPath(lead.id!));
    leadForm.leadCreatedBy = userData.id;
    leadForm.status = "accepted";
    leadForm.updatedBy = userData.role;
    leadForm.updatedOn = "";
    callEditLeadAPI(leadForm);
  };

  const callEditLeadAPI = async (leadForm: any) => {
    try {
      const newLead = await editLeadService({ header, lead: leadForm });
      if (newLead.status === "success") {
        navigate(leadsPath());
      }
    } catch (response) {
      // Handle error
    }
  };

  return (
    <>
      <div className="bg-blue-200 p-7">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Lead Table
          </Typography>
          <Typography variant="h5" mb={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Link
                  to="/dashboard"
                  className="text-addButton font-bold text-sm"
                >
                  Dashboard /
                </Link>
                <span className="text-grey-600 text-sm"> Lead</span>
              </div>
              {userData.role.toLowerCase() !== "admin" && (
                <Button
                  type="button"
                  className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                  onClick={handleAddLeadClick}
                >
                  Add Lead
                </Button>
              )}
            </div>
            {/* Add a full-width grey line here */}
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <MaterialReactTable
            state={{ isLoading }}
            columns={columns}
            data={parsedData}
            enableRowActions={userData.role.toLowerCase() !== "admin"}
            positionActionsColumn="last"
            renderRowActions={({ row }) => (
              <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <Tooltip title={"Accept Lead"}>
                  <IconButton
                    color="primary"
                    aria-label={"Accept Lead"}
                    component="span"
                    onClick={() => {
                      handleClickAcceptLead(row.original as ILeadsVM);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-5 text-addButton"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
              </div>
            )}
          />
        </Paper>
      </div>
    </>
  );
};

export default Leads;
