import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../../context/constant";
import { ICompanyForm } from "../ICompany";
import AddCompanyForm from "./addCompanyForm";
import getCompanyDetailsService from "../../../../api/Company/GetCompanyDetails/getCompanyDetailsService";
import { convertICompanyVMToICompanyForm } from "../../../../api/Company/convertICompanyVMToICompanyForm";

const AddCompany = () => {
  const { companyId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editCompanyDetails, setEditCompanyDetails] = useState<ICompanyForm | undefined>(
    undefined
  );

  useEffect(() => {
    if (!isAdd && companyId) {
      getCompanyDetailsService({ header, companyId })
        .then((CompanyDetails) => {
          const CompanyVMToCompanyForm = convertICompanyVMToICompanyForm(CompanyDetails);
          setEditCompanyDetails(CompanyVMToCompanyForm);
        })
        .catch((error) => {
          console.error("Failed to fetch Company details", error);
        });
    }
  }, [isAdd, companyId]);

  const title = isAdd ? "Add Company" : "Update Company";

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
          <Link to="/Company" className="text-addButton font-bold text-sm">
            Company /
          </Link>
          <span className="text-grey-600 text-sm"> {title}</span>
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>

        <AddCompanyForm
          initialValues={{
            id: isAdd ? "0" : editCompanyDetails?.id || "",
            companyName: isAdd ? "" : editCompanyDetails?.companyName || "",
            createdBy: "Admin",
          }}
        />
      </Paper>
    </div>
  );
};

export default AddCompany;
