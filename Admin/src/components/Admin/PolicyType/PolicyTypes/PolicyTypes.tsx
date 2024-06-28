import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  DAYJS_DISPLAY_FORMAT_TABLES,
  header,
} from "../../../../context/constant";
import { IPolicyTypeForm, IPolicyTypes, IPolicyTypesVM } from "../IPolicyType";
//import dayjs from "dayjs";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { policyTypeEditPath, policyTypeAddPath } from "../../../../sitemap";
import deletePolicyTypeService from "../../../../api/PolicyType/DeletePolicyType/deletePolicyTypeService";
import useGetPolicyTypes from "../../../../Hooks/Policy/useGetPolicyTypes";
import dayjs from "dayjs";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import editPolicyTypeService from "../../../../api/PolicyType/EditPolicyType/editPolicyTypeService";
import { convertIPolicyTypeVMToIPolicyTypeForm } from "../../../../api/PolicyType/convertIPolicyTypeVMToIPolicyTypeForm";
import getPolicyTypeService from "../../../../api/PolicyType/GetPolicyType/getPolicyTypeService";
const PolicyTypes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [policyTypes, setPolicyTypes] = useState<IPolicyTypes[]>([]);
  const navigate = useNavigate();
  const handleAddPolicyTypeClick = () => {
    navigate(policyTypeAddPath());
  };
  const [forcedRenderCount, setForcedRenderCount] = useState(0);
  const forceRender = useCallback(
    () => setForcedRenderCount(forcedRenderCount + 1),
    [forcedRenderCount]
  );
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<IPolicyTypes>[]>(
    () => [
      {
        accessorKey: "policyType", //normal accessorKey
        header: "Policy Type",
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
        dateSetting: {
          format: "dd/MM/yyyy",
        },
      },
    ],
    []
  );

  const parsedData = useMemo(
    () =>
      policyTypes.map(
        (PolicyType: IPolicyTypes) =>
          ({
            id: PolicyType._id,
            policyType: PolicyType.policyType,
            isActive: PolicyType.isActive,
            createdOn: dayjs(PolicyType.createdOn).format(
              DAYJS_DISPLAY_FORMAT_TABLES
            ),
            forceUpdate: forcedRenderCount,
          } as IPolicyTypesVM)
      ) ?? [],
    [policyTypes, forcedRenderCount]
  );

  const updateLoading = useCallback(async () => {
    // setIsLoading(true) when policyTypes.length is 0, and setIsLoading(false) when policyTypes.length is > 0
    setIsLoading(false);
  }, []);

  useEffect(() => {
    updateLoading();
  }, [updateLoading]);

  const handleClickDeletePolicyType = (PolicyType: IPolicyTypesVM) => {
    policyTypeDeleteApiCall(PolicyType.id!);
  };
  const handleClickEditPolicy = (PolicyType: IPolicyTypesVM) => {
    navigate(policyTypeEditPath(PolicyType.id!));
  };

  const policyTypeDeleteApiCall = async (policyTypeId: string) => {
    setIsLoading(true);
    deletePolicyTypeService({ header, policyTypeId, policyTypes })
      .then((refreshedPolicyTypes) => {
        setPolicyTypes(refreshedPolicyTypes);
        forceRender();
      })
      .catch((response: any) => {})
      .finally(() => {
        updateLoading();
      });
  };
  const getPolicyTypes = useCallback(
    () =>
      getPolicyTypeService({ header })
        .then((policyTypesDetails) => {
          setPolicyTypes(policyTypesDetails.data);
        })
        .catch((error) => {
          console.error("Failed to fetch product details", error);
        }),
    []
  );
  useEffect(() => {
    getPolicyTypes();
  }, [getPolicyTypes]);
  const callUpdatepolicyTypeAPI = async (policyType: IPolicyTypesVM) => {
    var convertPolicyTypeVMToPolicyTypeForm =
      convertIPolicyTypeVMToIPolicyTypeForm(policyType);

    const policyTypeData: IPolicyTypeForm = {
      id: convertPolicyTypeVMToPolicyTypeForm.id,
      policyType: convertPolicyTypeVMToPolicyTypeForm.policyType,
      isActive: !convertPolicyTypeVMToPolicyTypeForm.isActive,
    };

    editPolicyTypeService({ header, policyType: policyTypeData })
      .then(() => {
        getPolicyTypes();
      })
      .catch((response) => {})
      .finally(() => {
        updateLoading();
      });
  };

  const handleClickChangeStatus = (policyType: IPolicyTypesVM) => {
    callUpdatepolicyTypeAPI(policyType);
  };
  return (
    <>
      <div className="bg-blue-200 p-7">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Policy Type Table
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
                <span className="text-grey-600 text-sm"> Policy Types</span>
              </div>
              <Button
                type="button"
                className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                onClick={handleAddPolicyTypeClick}
              >
                Add Policy Type
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
                <Tooltip title={"Edit PolicyType"}>
                  <IconButton
                    color="primary"
                    aria-label={"Edit PolicyType"}
                    component="span"
                    onClick={() => {
                      handleClickEditPolicy(row.original as IPolicyTypesVM);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-5 text-policyTypeButton"
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
                      handleClickChangeStatus(row.original as IPolicyTypesVM)
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
                <Tooltip title={"Delete PolicyType"}>
                  <IconButton
                    color="primary"
                    aria-label={"Delete PolicyType"}
                    component="span"
                    onClick={() =>
                      handleClickDeletePolicyType(
                        row.original as IPolicyTypesVM
                      )
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

export default PolicyTypes;