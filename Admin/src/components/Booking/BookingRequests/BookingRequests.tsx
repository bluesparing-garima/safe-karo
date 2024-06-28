import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
//import dayjs from "dayjs";
import { Button, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { bookingRequestsAddPath } from "../../../sitemap";
import dayjs from "dayjs";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import getBookingRequestService from "../../../api/BookingRequest/GetBookingRequest/getBookingRequestService";
import { IBookingRequests, IBookingRequestsVM } from "../IBookingRequests";
import {
  DAYJS_DISPLAY_FORMAT,
  SafeKaroUser,
  header,
} from "../../../context/constant";
import getBookingRequestByIdService from "../../../api/BookingRequest/GetBookingRequestById/getBookingRequestByIdService";
import CountdownTimer from "../../../utils/CountdownTimer";
import getBookingRequestByAgentIdService from "../../../api/BookingRequest/GetBookingRequestByAgentId/getBookingRequestByAgentIdService";

const BookingRequests = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookingRequests, setBookingRequests] = useState<IBookingRequests[]>(
    []
  );
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;

  const GetBookingRequests = useCallback(
    () =>
      getBookingRequestService({ header })
        .then((bookingRequestDetails) => {
          setBookingRequests(bookingRequestDetails.data);
        })
        .catch((error) => {
          console.error("Failed to fetch product details", error);
        }),
    []
  );

  const GetBookingByIdRequests = useCallback(
    () =>
      getBookingRequestByIdService({ header, userId: userData.id })
        .then((bookingRequestDetails) => {
          setBookingRequests(bookingRequestDetails.data);
        })
        .catch((error) => {
          console.error("Failed to fetch Booking details", error);
        }),
    [userData.id]
  );
  const GetBookingByAgentIdRequests = useCallback(
    () =>
      getBookingRequestByAgentIdService({
        header,
        partnerId: userData.partnerId,
      })
        .then((bookingRequestDetails) => {
          setBookingRequests(bookingRequestDetails.data);
        })
        .catch((error) => {
          console.error("Failed to fetch Agent Booking details", error);
        }),
    [userData.partnerId]
  );
  useEffect(() => {
    if (userData.role.toLowerCase() === "operation") {
      GetBookingByIdRequests();
    } else if (userData.role.toLowerCase() === "agent") {
      GetBookingByAgentIdRequests();
    } else {
      GetBookingRequests();
    }
  }, [
    GetBookingRequests,
    GetBookingByAgentIdRequests,
    GetBookingByIdRequests,
    userData.role,
  ]);

  const navigate = useNavigate();
  const handleAddBookingRequestClick = () => {
    navigate(bookingRequestsAddPath());
  };

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<IBookingRequests>[]>(
    () => [
      {
        header: "Timer",
        accessorKey: "createdOn",
        Cell: ({ cell }) => <CountdownTimer registerDate={cell.getValue()} />,
        size: 200,
      },
      {
        accessorKey: "policyNumber", //normal accessorKey
        header: "Policy Number",
        size: 200,
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
        accessorKey: "productType", //normal accessorKey
        header: "Product",
        size: 100,
      },
      {
        accessorKey: "subCategory", //normal accessorKey
        header: "Sub Category",
        size: 100,
      },
      {
        accessorKey: "companyName", //normal accessorKey
        header: "Company Name",
        size: 100,
      },
      {
        accessorKey: "bookingStatus", //normal accessorKey
        header: "Booking Status",
        size: 100,
      },
      {
        accessorKey: "partnerName", //normal accessorKey
        header: "Partner Name",
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
      bookingRequests.map(
        (bookingRequest: IBookingRequests) =>
          ({
            id: bookingRequest._id,
            policyNumber: bookingRequest.policyNumber,
            category: bookingRequest.category,
            policyType: bookingRequest.policyType,
            caseType: bookingRequest.caseType,
            productType: bookingRequest.productType,
            subCategory: bookingRequest.subCategory,
            companyName: bookingRequest.companyName,
            partnerId: bookingRequest.partnerId,
            partnerName: bookingRequest.partnerName,
            document: bookingRequest.document,
            bookingStatus: bookingRequest.bookingStatus,
            isActive: bookingRequest.isActive,
            createdOn: dayjs(bookingRequest.createdOn).format(
              DAYJS_DISPLAY_FORMAT
            ),
            updatedOn: dayjs(bookingRequest.updatedOn).format(
              DAYJS_DISPLAY_FORMAT
            ),
          } as IBookingRequestsVM)
      ) ?? [],
    [bookingRequests]
  );

  const updateLoading = useCallback(async () => {
    // setIsLoading(true) when bookingRequests.length is 0, and setIsLoading(false) when bookingRequests.length is > 0
    setIsLoading(false);
  }, []);

  useEffect(() => {
    updateLoading();
  }, [updateLoading]);

  return (
    <>
      <div className="bg-blue-200 p-7">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Booking Request Table
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

                <span className="text-grey-600 text-sm"> Booking Request</span>
              </div>
              {userData.role.toLowerCase() !== "booking" ? (
                <Button
                  type="button"
                  className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                  onClick={handleAddBookingRequestClick}
                >
                  Add Booking Request
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
          />
        </Paper>
      </div>
    </>
  );
};

export default BookingRequests;
