import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../../context/constant";
import { IPolicyTypeForm } from "../IPolicyType";
import AddPolicyTypeForm from "./AddPolicyTypeForm";
import { convertIPolicyTypeVMToIPolicyTypeForm } from "../../../../api/PolicyType/convertIPolicyTypeVMToIPolicyTypeForm";
import getPolicyTypeDetailsService from "../../../../api/PolicyType/GetPolicyTypeDetails/getPolicyTypeDetailsService";

const AddPolicyType = () => {
  const { policyTypeId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editPolicyTypeDetails, setEditPolicyTypeDetails] = useState<IPolicyTypeForm | undefined>(
    undefined
  );

  useEffect(() => {
    if (!isAdd && policyTypeId) {
        getPolicyTypeDetailsService({ header, policyTypeId })
        .then((policyTypeDetails) => {
          const policyTypeVMToPolicyTypeForm = convertIPolicyTypeVMToIPolicyTypeForm(policyTypeDetails);
          setEditPolicyTypeDetails(policyTypeVMToPolicyTypeForm);
        })
        .catch((error) => {
          console.error("Failed to fetch policyType details", error);
        });
    }
  }, [isAdd, policyTypeId]);

  const title = isAdd ? "Add Policy Type" : "Update Policy Type";

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
          <Link to="/policytype" className="text-addButton font-bold text-sm">
            Policy Types /
          </Link>
          <span className="text-grey-600 text-sm"> {title}</span>
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>

        <AddPolicyTypeForm
          initialValues={{
            id: isAdd ? "0" : editPolicyTypeDetails?.id || "",
            policyType: isAdd ? "" : editPolicyTypeDetails?.policyType || "",
            createdBy: "Admin",
          }}
        />
      </Paper>
    </div>
  );
};

export default AddPolicyType;
