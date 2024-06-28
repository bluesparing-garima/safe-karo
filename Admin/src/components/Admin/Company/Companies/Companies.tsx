import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { DAYJS_DISPLAY_FORMAT, header } from "../../../../context/constant";
import useGetCompanies from "../../../../Hooks/Company/useGetCompanies";
import { ICompanies, ICompaniesVM, ICompanyForm } from "../ICompany";
//import dayjs from "dayjs";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { companyAddPath, companyEditPath } from "../../../../sitemap";
import dayjs from "dayjs";
import deleteCompanyService from "../../../../api/Company/DeleteCompany/deleteCompanyService";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import getCompaniesService from "../../../../api/Company/GetCompanies/getCompaniesService";
import { convertICompanyVMToICompanyForm } from "../../../../api/Company/convertICompanyVMToICompanyForm";
import editCompanyService from "../../../../api/Company/EditCompany/editCompanyService";
const Companies = () => {
  const [isLoading, setIsLoading] = useState(false);
  let [companyData, setCompanyData] = useState<ICompanies[]>([]);
  const navigate = useNavigate();
  const handleClickAddCompany = () => {
    navigate(companyAddPath());
  };
  const [forcedRenderCount, setForcedRenderCount] = useState(0);
  const forceRender = useCallback(
    () => setForcedRenderCount(forcedRenderCount + 1),
    [forcedRenderCount]
  );
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<ICompanies>[]>(
    () => [
      {
        accessorKey: "companyName", //normal accessorKey
        header: "Company Name",
        size: 200,
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
      companyData.map(
        (company: ICompanies) =>
          ({
            id: company._id,
            companyName: company.companyName,
            isActive: company.isActive,
            createdOn: dayjs(company.createdOn).format(DAYJS_DISPLAY_FORMAT),
            updatedOn: dayjs(company.updatedOn).format(DAYJS_DISPLAY_FORMAT),
            forceUpdate: forcedRenderCount,
          } as ICompaniesVM)
      ) ?? [],
    [companyData, forcedRenderCount]
  );

  const updateLoading = useCallback(async () => {
    // setIsLoading(true) when companies.length is 0, and setIsLoading(false) when companies.length is > 0
    setIsLoading(companyData.length >= 0 ? false : true);
  }, [companyData]);

  useEffect(() => {
    updateLoading();
  }, [updateLoading]);

  const handleClickDeleteCompany = (company: ICompaniesVM) => {
    companyDeleteApiCall(company.id!);
  };
  const handleClickEditCompany = (company: ICompaniesVM) => {
    navigate(companyEditPath(company.id!));
  };
  const GetCompanies = useCallback(
    () =>
      getCompaniesService({ header })
        .then((companyDetails) => {
          setCompanyData(companyDetails.data);
        })
        .catch((error) => {
          console.error("Failed to fetch product details", error);
        }),
    []
  );
  useEffect(() => {
    GetCompanies();
  }, [GetCompanies]);
  const callUpdateCompanyAPI = async (company: ICompaniesVM) => {
    var convertCompanyVMToCompanyForm =
      convertICompanyVMToICompanyForm(company);

    const companyData: ICompanyForm = {
      id: convertCompanyVMToCompanyForm.id,
      companyName: convertCompanyVMToCompanyForm.companyName,
      isActive: !convertCompanyVMToCompanyForm.isActive,
    };

    editCompanyService({ header, company: companyData })
      .then(() => {
        GetCompanies();
      })
      .catch((response) => {})
      .finally(() => {
        updateLoading();
      });
  };

  const handleClickChangeStatus = (company: ICompaniesVM) => {
    callUpdateCompanyAPI(company);
  };
  const companyDeleteApiCall = async (companyId: string) => {
    setIsLoading(true);
    deleteCompanyService({ header, companyId, companies: companyData })
      .then((refreshedCompanies) => {
        setCompanyData(refreshedCompanies);
        forceRender();
        // setSnackbarResponse({
        //   open: true,
        //   message: `company deleted successfully.`,
        // });
      })
      .catch((response: any) => {
        // setSnackbarResponse({
        //   open: true,
        //   message: `Unable to delete company. Please retry your request. HTTP status code: ${response.status}`,
        // });
      })
      .finally(() => {
        updateLoading();
      });
  };
  return (
    <>
      <div className="bg-blue-200 p-7">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Company Table
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
                <span className="text-grey-600 text-sm"> Company</span>
              </div>
              <Button
                type="button"
                className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                onClick={handleClickAddCompany}
              >
                Add Company
              </Button>
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
            enableRowActions
            positionActionsColumn="last"
            renderRowActions={({ row }) => (
              <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <Tooltip title={"Edit Company"}>
                  <IconButton
                    color="primary"
                    aria-label={"Edit Company"}
                    component="span"
                    onClick={() => {
                      handleClickEditCompany(row.original as ICompaniesVM);
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Change Status"}>
                  <IconButton
                    color="primary"
                    aria-label={"Change Status"}
                    component="span"
                    onClick={() =>
                      handleClickChangeStatus(row.original as ICompaniesVM)
                    }
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
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Delete Company"}>
                  <IconButton
                    color="primary"
                    aria-label={"Delete Company"}
                    component="span"
                    onClick={() =>
                      handleClickDeleteCompany(row.original as ICompaniesVM)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-5 text-safekaroDarkOrange"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
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

export default Companies;