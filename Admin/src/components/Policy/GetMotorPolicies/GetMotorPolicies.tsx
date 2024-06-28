import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  DAYJS_DISPLAY_FORMAT,
  SafeKaroUser,
  header,
} from "../../../context/constant";
//import dayjs from "dayjs";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motorPolicyAddPath, motorPolicyViewPath } from "../../../sitemap";
import { IPolicy, IPolicyVM } from "../IPolicy";
import dayjs from "dayjs";
import getCalculatePayinService from "../../../api/CalcualtePayouts/GetCalculatePayin/getCalculatePayinService";
import ConfirmationDialogBox from "../../../context/ConfirmationDialogBox";
import getCalculatePayOutService from "../../../api/CalcualtePayouts/GetCalculatePayOut/getCalculatePayOutService";
import getMotorPolicyService from "../../../api/Policies/GetMotorPolicy/getMotorPolicyService";
import getPolicyByIdService from "../../../api/Policies/GetPolicyById/getPolicyByIdService";

const GetMotorPolicies = () => {
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;
  const [isLoading, setIsLoading] = useState(false);
  const [motorPolicies, setMotorPolicies] = useState<IPolicy[]>([]);
  const [isDisable, setIsDisable] = useState(false);
  const navigate = useNavigate();
  const handleClickAddMotorPolicy = () => {
    navigate(motorPolicyAddPath());
  };
  const [dialogResponse, setDialogResponse] = useState({
    open: false,
    title: "",
    message: "",
    isView: false,
    isSuccess: false,
    isLoading: false,
  });
  const GetPolicies = useCallback(
    () =>
      getMotorPolicyService({ header })
        .then((motorPolicy) => {
          setMotorPolicies(motorPolicy.data);
        })
        .catch((error) => {
          console.error("Failed to fetch polices details", error);
        }),
    []
  );
  const GetPoliciesById = useCallback(
    () =>
      getPolicyByIdService({ header, partnerId: userData.partnerId })
        .then((bookingRequestDetails) => {
          setMotorPolicies(bookingRequestDetails.data);
        })
        .catch((error) => {
          console.error("Failed to fetch polices details", error);
        }),
    [userData.partnerId]
  );
  useEffect(() => {
    if (userData.role.toLowerCase() === "admin") {
      GetPolicies();
    } else {
      GetPoliciesById();
    }
  }, [GetPolicies, GetPoliciesById, userData.role]);

  //For Update
  // const [forcedRenderCount, setForcedRenderCount] = useState(0);
  // const forceRender = useCallback(
  //   () => setForcedRenderCount(forcedRenderCount + 1),
  //   [forcedRenderCount]
  // );

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<IPolicy>[]>(
    () => [
      {
        accessorKey: "fullName", //normal accessorKey
        header: "Full Name",
        size: 100,
      },
      {
        accessorKey: "policyNumber", //normal accessorKey
        header: "Policy Number",
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
        accessorKey: "category", //normal accessorKey
        header: "Category",
        size: 100,
      },
      {
        accessorKey: "subCategory", //normal accessorKey
        header: "sub Category",
        size: 100,
      },
      {
        accessorKey: "companyName", //normal accessorKey
        header: "Company Name",
        size: 100,
      },
      {
        accessorKey: "vehicleNumber", //normal accessorKey
        header: "Vehicle Number",
        size: 100,
      },
      {
        accessorKey: "broker", //normal accessorKey
        header: "Broker",
        size: 100,
      },
      {
        accessorKey: "make", //normal accessorKey
        header: "Make",
        size: 100,
      },
      {
        accessorKey: "model", //normal accessorKey
        header: "Model",
        size: 100,
      },
      {
        accessorKey: "fuelType", //normal accessorKey
        header: "Fuel Type",
        size: 100,
      },
      {
        accessorKey: "rto", //normal accessorKey
        header: "RTO",
        size: 100,
      },
      {
        accessorKey: "cc", //normal accessorKey
        header: "cc",
        size: 100,
      },
      {
        accessorKey: "seatingCapacity", //normal accessorKey
        header: "Seating Capacity",
        size: 100,
      },
      {
        accessorKey: "ncb", //normal accessorKey
        header: "ncb",
        size: 100,
      },
      {
        accessorKey: "emailId", //normal accessorKey
        header: "Email",
        size: 100,
      },
      {
        accessorKey: "phoneNumber", //normal accessorKey
        header: "Phone Number",
        size: 100,
      },
      {
        accessorKey: "vehicleAge", //normal accessorKey
        header: "Vehicle Age",
        size: 100,
      },
      {
        accessorKey: "mfgYear", //normal accessorKey
        header: "MFG Year",
        size: 100,
      },
      {
        accessorKey: "tenure", //normal accessorKey
        header: "Tenure",
        size: 100,
      },
      {
        accessorKey: "netPremium", //normal accessorKey
        header: "Net Premium",
        size: 100,
      },
      {
        accessorKey: "finalPremium", //normal accessorKey
        header: "Final Premium",
        size: 100,
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
      motorPolicies.map(
        (motorPolicy: IPolicy) =>
          ({
            uuid: motorPolicy.uuid,
            id: motorPolicy._id,
            fullName: motorPolicy.fullName,
            productType: motorPolicy.productType,
            emailId: motorPolicy.emailId,
            weight: motorPolicy.weight,
            broker: motorPolicy.broker,
            policyType: motorPolicy.policyType,
            caseType: motorPolicy.caseType,
            category: motorPolicy.category,
            subCategory: motorPolicy.subCategory,
            companyName: motorPolicy.companyName,
            make: motorPolicy.make,
            model: motorPolicy.model,
            fuelType: motorPolicy.fuelType,
            rto: motorPolicy.rto,
            vehicleNumber: motorPolicy.vehicleNumber,
            seatingCapacity: motorPolicy.seatingCapacity,
            vehicleAge: motorPolicy.vehicleAge,
            ncb: motorPolicy.ncb,
            policyNumber: motorPolicy.policyNumber,
            phoneNumber: motorPolicy.phoneNumber,
            mfgYear: motorPolicy.mfgYear,
            registrationDate: dayjs(motorPolicy.registrationDate).format(
              DAYJS_DISPLAY_FORMAT
            ),
            endDate: dayjs(motorPolicy.endDate).format(DAYJS_DISPLAY_FORMAT),
            issueDate: dayjs(motorPolicy.issueDate).format(
              DAYJS_DISPLAY_FORMAT
            ),
            tenure: motorPolicy.tenure?.toLocaleString(),
            idv: motorPolicy.idv?.toLocaleString(),
            od: motorPolicy.od?.toLocaleString(),
            tp: motorPolicy.tp?.toLocaleString(),
            netPremium: motorPolicy.netPremium?.toLocaleString(),
            finalPremium: motorPolicy.finalPremium?.toLocaleString(),
            cc: motorPolicy.cc,
            paymentMode: motorPolicy.paymentMode,
            policyCreatedBy: motorPolicy.policyCreatedBy,
            createdOn: dayjs(motorPolicy.createdOn).format(
              DAYJS_DISPLAY_FORMAT
            ),
            paymentDetails: motorPolicy.paymentDetails,
            policyStatus: motorPolicy.policyStatus,
            partnerId: motorPolicy.partnerId,
            partnerName: motorPolicy.partnerName,
            odPayoutAmount: motorPolicy.odPayoutAmount,
            odPercentage: motorPolicy.odPercentage,
            tpPayoutAmount: motorPolicy.tpPayoutAmount,
            tpPercentage: motorPolicy.tpPercentage,
            relationshipManagerName: motorPolicy.relationshipManagerName,
            relationshipManagerId: motorPolicy.relationshipManagerId,
            documents: motorPolicy.documents,
            // forceUpdate: forcedRenderCount,
          } as unknown as IPolicyVM)
      ) ?? [],
    [motorPolicies]
  );

  const updateLoading = useCallback(async () => {
    // setIsLoading(true) when motorPolicies.length is 0, and setIsLoading(false) when motorPolicies.length is > 0
    setIsLoading(motorPolicies.length >= 0 ? false : true);
  }, [motorPolicies]);

  useEffect(() => {
    updateLoading();
  }, [updateLoading]);

  const handleClickCalculatePayIn = async (policy: IPolicyVM) => {
    try {
      const newPolicy = await getCalculatePayinService({
        header,
        fuelType: policy.fuelType!,
        policyType: policy.policyType!,
        companyName: policy.companyName!,
        productType: policy.productType!,
        subCategory: policy.subCategory!,
        engine: policy.cc!,
        weight: policy.weight === undefined ? null : policy.weight!,
        ncb: policy.ncb!,
        rto: policy.rto!,
        // insuredType: "School Bus",
        vehicleAge: policy.vehicleAge!,
        caseType: policy.caseType!,
        make: policy.make!,
        model: policy.model!,
      });

      const ODcost = policy.od;
      const TPcost = policy.tp;
      //value form Excel
      const ODpercentage = newPolicy.data.od;
      const TPpercentage = newPolicy.data.tp;
      //Calcuation
      const calculatedODPercentage = (ODcost * ODpercentage) / 100;
      const calculatedTPPercentage = (TPcost * TPpercentage) / 100;

      showErrorDialogBox({
        title: "Calculation",
        message: `
        OD:${newPolicy.data.od}
        TP: ${newPolicy.data.tp}
        Commision: OD: ${calculatedODPercentage}
        Commision: TP: ${calculatedTPPercentage}
        `,
      });

      if (newPolicy.status === "success") {
        navigate("");
      }
      //navigateToPolicies(`${newPolicy.message}`);
    } catch (response) {
      // Handle error
    }
    //navigate(calculatePayInPolicyPath(), { state: policy });
  };

  const handleClickCalculatePayOut = async (policy: IPolicyVM) => {
    try {
      const newPolicy = await getCalculatePayOutService({
        header,
        fuelType: policy.fuelType!,
        policyType: policy.policyType!,
        companyName: policy.companyName!,
        productType: policy.productType!,
        subCategory: policy.subCategory!,
        engine: policy.cc!,
        weight: policy.weight === undefined ? null : policy.weight!,
        ncb: policy.ncb!,
        rto: policy.rto!,
        // insuredType: "School Bus",
        vehicleAge: policy.vehicleAge!,
        caseType: policy.caseType!,
        make: policy.make!,
        model: policy.model!,
      });

      const ODcost = policy.od;
      const TPcost = policy.tp;
      //value form Excel
      const ODpercentage = newPolicy.data.od;
      const TPpercentage = newPolicy.data.tp;
      //Calcuation
      const calculatedODPercentage = (ODcost * ODpercentage) / 100;
      const calculatedTPPercentage = (TPcost * TPpercentage) / 100;

      showErrorDialogBox({
        title: "Calculation",
        message: `
        OD:${newPolicy.data.od}
        TP: ${newPolicy.data.tp}
        Commision: OD: ${calculatedODPercentage}
        Commision: TP: ${calculatedTPPercentage}
        `,
      });

      if (newPolicy.status === "success") {
        navigate("");
      }
      //navigateToPolicies(`${newPolicy.message}`);
    } catch (response) {
      // Handle error
    }
    //navigate(calculatePayInPolicyPath(), { state: policy });
  };

  const handleClickViewPolicy = async (policy: IPolicyVM) => {
    navigate(motorPolicyViewPath(), { state: policy });
  };

  const showErrorDialogBox = ({
    title,
    message,
  }: {
    title: string;
    message: any;
  }) => {
    setIsDisable(false);
    setDialogResponse({
      open: true,
      title: title,
      message: message,
      isView: false,
      isSuccess: false,
      isLoading: false,
    });
  };
  return (
    <>
      <div className="bg-blue-200 p-7">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Motor Policies Table
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
                <span className="text-grey-600 text-sm"> Motor Policies</span>
              </div>
              {userData.role.toLowerCase() === "admin" ? (
                <Button
                  type="button"
                  className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                  onClick={handleClickAddMotorPolicy}
                >
                  Add Motor Policies
                </Button>
              ) : (
                ""
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
            enableRowActions={userData.role.toLowerCase() === "admin"}
            // positionActionsColumn="last"
            renderRowActions={({ row }) =>
              userData.role === "admin" && (
                <div style={{ display: "flex", flexWrap: "nowrap" }}>
                  <Tooltip title={"View Motor Policy"}>
                    <IconButton
                      color="primary"
                      aria-label={"View Motor Policy"}
                      component="span"
                      onClick={() => {
                        handleClickViewPolicy(row.original as IPolicyVM);
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
                          d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                        />
                      </svg>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Calcualte Pay In"}>
                    <IconButton
                      color="primary"
                      aria-label={"Calcualte Pay In"}
                      component="span"
                      onClick={() => {
                        handleClickCalculatePayIn(row.original as IPolicyVM);
                      }}
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
                          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                        />
                      </svg>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Calcualte Pay Out"}>
                    <IconButton
                      color="primary"
                      aria-label={"Calcualte Pay Out"}
                      component="span"
                      onClick={() => {
                        handleClickCalculatePayOut(row.original as IPolicyVM);
                      }}
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
                          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                        />
                      </svg>
                    </IconButton>
                  </Tooltip>
                </div>
              )
            }
          />
          <ConfirmationDialogBox
            dialogResponse={dialogResponse}
            setDialogResponse={setDialogResponse}
          />
        </Paper>
      </div>
    </>
  );
};

export default GetMotorPolicies;
