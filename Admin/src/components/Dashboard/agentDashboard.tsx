import React from "react";
import Typography from "@mui/material/Typography";
import BarChart from "./components/BarChart";
import StatBox from "./components/StatBox";

const agentDashboard: React.FC = () => {
  return (
    <div className="bg-blue-200 p-7">
      {/* HEADER */}
      {/* <div className="flex justify-between items-center mb-7">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </div> */}

      {/* GRID & CHARTS */}
      <div className="grid grid-cols-6 gap-7 ">
        {/* ROW 1 */}
        <div className="col-span-2 bg-white flex items-center justify-center p-5 rounded-2xl shadow-lg">
          <StatBox
            title="Total Income"
            value="600,000.00"
            change="+2.29%"
            isIncrease={true}
          />
        </div>
        <div className="col-span-2 bg-white flex items-center justify-center p-5 rounded-2xl shadow-lg">
          <StatBox
            title="Total Outcome"
            value="432,000.00"
            change="-1.29%"
            isIncrease={false}
          />
        </div>
        <div className="col-span-2 row-span-2"></div>
          {/* ROW 2 */}
          <div className="col-span-2 bg-white flex items-center justify-center p-5 rounded-2xl shadow-lg">
          <StatBox
            title="Total Income"
            value="600,000.00"
            change="+2.29%"
            isIncrease={true}
          />
        </div>
        <div className="col-span-2 bg-white flex items-center justify-center p-5 rounded-2xl shadow-lg">
          <StatBox
            title="Total Outcome"
            value="432,000.00"
            change="-1.29%"
            isIncrease={false}
          />
        </div>
        <div className="col-span-2 row-span-2"></div>
        {/* ROW 3 */}
        <div className="col-span-6 bg-white rounded-2xl shadow-lg">
          <Typography variant="h5" fontWeight="600" className="px-7 pt-7">
            Sales Quantity
          </Typography>
          <div className="h-64 -mt-5">
            <BarChart isDashboard={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default agentDashboard;
