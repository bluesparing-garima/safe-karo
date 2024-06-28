import React, { useCallback, useEffect, useState } from "react";
import { Grid, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Typography from "@mui/material/Typography";
import { mockTransactions } from "./data/mockData";
import { DownloadOutlined as DownloadOutlinedIcon } from "@mui/icons-material";
import {
  Email as EmailIcon,
  PointOfSale as PointOfSaleIcon,
  PersonAdd as PersonAddIcon,
  Traffic as TrafficIcon,
} from "@mui/icons-material";
import Header from "./components/Header";
import LineChart from "./components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
import BarChart from "./components/BarChart";
import StatBox from "./components/StatBox";
import ProgressCircle from "./components/ProgressCircle";
import CreditCard from "./components/CreditCard";
import getAdminDashboardService from "../../api/Dashboard/GetAdminDashboard/getAdminDashboardService";
import { SafeKaroUser, header } from "../../context/constant";

const Dashboard: React.FC = () => {
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const [data, setData] = useState<Record<string, number> | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let UserData = storedTheme ? JSON.parse(storedTheme) : storedTheme;

  const GetDashboardCount = useCallback(
    () =>
      getAdminDashboardService({ header })
        .then((dashboardData) => {
          setIsVisible(true);
          setData(dashboardData.data);
        })
        .catch((error) => {
          setIsVisible(false);
          console.error("Failed to fetch product details", error);
        }),
    []
  );
  useEffect(() => {
    GetDashboardCount();
  }, [GetDashboardCount]);
  return (
    <div className="bg-blue-200 p-7">
      {/* HEADER */}
      {/* <div className="flex justify-between items-center mb-7">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </div> */}

      {/* GRID & CHARTS */}

      {UserData.role === "admin" ? (
        <Grid container>
          <Grid item lg={12}>
              <Typography variant="h6">Welcome !</Typography>
            </Grid>
          <Grid item lg={8}>
            
            <Grid item container>
              {isVisible ? (
                <>
                  {data &&
                    Object.entries(data!).map(([key, value]) => (
                      <Grid item lg={4}>
                        <div className="bg-white m-2 p-5 rounded-2xl shadow-lg">
                          <Typography variant="h6">{key!}</Typography>
                          <Typography variant="h4">{value!}</Typography>
                        </div>
                      </Grid>
                    ))}
                </>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
          <Grid item lg={4}>
            {/* <CreditCard /> */}
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item lg={12}>
              <Typography variant="h6">Welcome !</Typography>
            </Grid>
          <Grid item lg={8}>
            
            <Grid item container>
              <Grid item lg={4}>
                <div className="bg-white m-2 p-5 rounded-2xl shadow-lg">
                  <Typography variant="h6">Agent</Typography>
                  <Typography variant="h4">12</Typography>
                </div>
              </Grid>
              <Grid item lg={4}>
                <div className="bg-white m-2 p-5 rounded-2xl shadow-lg">
                  <Typography variant="h6">Manager</Typography>
                  <Typography variant="h4">1</Typography>
                </div>
              </Grid>
              <Grid item lg={4}>
                <div className="bg-white m-2 p-5 rounded-2xl shadow-lg">
                  <Typography variant="h6">Operation</Typography>
                  <Typography variant="h4">10</Typography>
                </div>
              </Grid>
              <Grid item lg={4}>
                <div className="bg-white m-2 p-5 rounded-2xl shadow-lg">
                  <Typography variant="h6">Booking</Typography>
                  <Typography variant="h4">10</Typography>
                </div>
              </Grid>
              <Grid item lg={4}>
                <div className="bg-white m-2 p-5 rounded-2xl shadow-lg">
                  <Typography variant="h6">Policies</Typography>
                  <Typography variant="h4">15</Typography>
                </div>
              </Grid>
              <Grid item lg={4}>
                <div className="bg-white m-2 p-5 rounded-2xl shadow-lg">
                  <Typography variant="h6">lead</Typography>
                  <Typography variant="h4">45</Typography>
                </div>
              </Grid>
              <Grid item lg={4}>
                <div className="bg-white m-2 p-5 rounded-2xl shadow-lg">
                  <Typography variant="h6">Active lead</Typography>
                  <Typography variant="h4">5</Typography>
                </div>
              </Grid>
              <Grid item lg={4}>
                <div className="bg-white m-2 p-5 rounded-2xl shadow-lg">
                  <Typography variant="h6">Issued lead</Typography>
                  <Typography variant="h4">5</Typography>
                </div>
              </Grid>
              <Grid item lg={4}>
                <div className="bg-white m-2 p-5 rounded-2xl shadow-lg">
                  <Typography variant="h6">Close lead</Typography>
                  <Typography variant="h4">5</Typography>
                </div>
              </Grid>
            </Grid>
            
          </Grid>
          <Grid item lg={4}>
              <CreditCard />
            </Grid>
        </Grid>
      )}
      {/* <div className="grid grid-cols-6 gap-7 ">
        <div className="col-span-6 bg-white mt-4 rounded-2xl shadow-lg">
          <Typography variant="h5" fontWeight="600" className="px-7 pt-7">
            Sales Quantity
          </Typography>
          <div className="h-64 -mt-5">
            <BarChart isDashboard={true} />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
