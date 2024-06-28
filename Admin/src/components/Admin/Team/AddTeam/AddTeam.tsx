import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../../context/constant";
import { ITeamForm } from "../ITeam";
import AddTeamForm from "./AddTeamForm";
import { convertITeamVMToITeamForm } from "../../../../api/Team/convertITeamVMToITeamForm";
import getTeamDetailsService from "../../../../api/Team/GetTeamDetails/getTeamDetailsService";

const AddTeam = () => {
  const { teamId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editTeamDetails, setEditTeamDetails] = useState<ITeamForm | undefined>(
    undefined
  );

  useEffect(() => {
    if (!isAdd && teamId) {
      getTeamDetailsService({ header, teamId })
        .then((teamDetails) => {
          const teamVMToTeamForm = convertITeamVMToITeamForm(teamDetails);
          setEditTeamDetails(teamVMToTeamForm);
        })
        .catch((error) => {
          console.error("Failed to fetch team details", error);
        });
    }
  }, [isAdd, teamId]);

  const title = isAdd ? "Add Team" : "Update Team";

  return (
    <div className="bg-blue-200 p-7">
      <Paper
        elevation={3}
        style={{ padding: 20, margin: 30, borderRadius: 10 }}
      >
        <Typography className="text-safekaroDarkOrange" variant="h5">
          {title}
        </Typography>
        <Typography variant="h5" mb={2}>
          <Link to="/dashboard" className="text-addButton font-bold text-sm">
            Dashboard {" / "}
          </Link>
          <Link to="/team" className="text-addButton font-bold text-sm">
            Teams /
          </Link>
          <span className="text-grey-600 text-sm"> {title}</span>
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>

        <AddTeamForm
          initialValues={{
            id: isAdd ? "0" : editTeamDetails?.id || "",
            branchName: isAdd ? "" : editTeamDetails?.branchName || "",
            partnerId: isAdd ? "" : editTeamDetails?.partnerId || "",
            role: isAdd ? "" : editTeamDetails?.role || "",
            headRMId: isAdd ? "" : editTeamDetails?.headRMId || "",
            headRM: isAdd ? "" : editTeamDetails?.headRM || "",
            bankName: isAdd ? "" : editTeamDetails?.bankName || "",
            fullName: isAdd ? "" : editTeamDetails?.fullName || "",
            phoneNumber: isAdd ? "" : editTeamDetails?.phoneNumber || "",
            email: isAdd ? "" : editTeamDetails?.email || "",
            dateOfBirth: isAdd ? "" : editTeamDetails?.dateOfBirth || "",
            gender: isAdd ? "" : editTeamDetails?.gender || "",
            address: isAdd ? "" : editTeamDetails?.address || "",
            pincode: isAdd ? "" : editTeamDetails?.pincode || "",
            password: isAdd ? "" : editTeamDetails?.password || "",
            IFSC: isAdd ? "" : editTeamDetails?.IFSC || "",
            accountHolderName: isAdd
              ? ""
              : editTeamDetails?.accountHolderName || "",
            accountNumber: isAdd ? "" : editTeamDetails?.accountNumber || "",
            salary: isAdd ? 10000 : editTeamDetails?.salary || 0,
            document: isAdd ? [] : editTeamDetails?.document || [],
            isActive: isAdd ? true : editTeamDetails?.isActive || true,
            createdBy: "Admin",
            updatedBy: "Admin",
          }}
        />
      </Paper>
    </div>
  );
};

export default AddTeam;
