import React from "react";
//import { useTranslation } from "react-i18next";
import { Typography, Paper } from "@mui/material";
import AddLeadFormCard from "./AddLeadForm";

import { Link } from "react-router-dom";
const AddLead = () => {
  const title = "Add Lead";
  return (
    <>
      <div className="bg-blue-200 p-7">
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography
            variant="h5"
            className="text-safekaroDarkOrange"
            gutterBottom
            display="inline"
          >
            {title}
          </Typography>
          <Typography variant="h5" mb={2}>
            <Link to="/dashboard" className="text-addButton font-bold text-sm">
              Dashboard {" / "}
            </Link>
            <Link to="/lead" className="text-addButton font-bold text-sm">
              Lead /
            </Link>
            <span className="text-grey-600 text-sm">{title}</span>
            {/* Add a full-width grey line here */}
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>

          <AddLeadFormCard
            initialValues={{
              category: "Motor",
              policyType: "",
              caseType: "",
              companyName: "",
              partnerId: "",
              partnerName: "",
              relationshipManagerId: "",
              relationshipManagerName: "",
              status: "",
              leadCreatedBy: "",
              documents: [],
              remarks: "",
              isActive: true,
              createdBy: "",
            }}
          />
        </Paper>
      </div>
    </>
  );
};

export default AddLead;
