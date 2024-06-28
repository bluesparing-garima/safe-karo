import React, { useEffect, useState } from "react";
//import { useTranslation } from "react-i18next";
import { Typography, Paper, Card, CardContent, Grid } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../context/constant";
import { ILeadForm } from "../IAgent";
import { convertILeadVMToILeadForm } from "../../../api/Leads/convertILeadVMToILeadForm";
import getLeadByIdService from "../../../api/Leads/GetLeadById/getLeadByIdService";
import EditLeadForm from "./editLeadForm";

const EditLead = () => {
  const title = "Edit Lead";
  const { leadId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editLeadDetails, setEditLeadDetails] = useState<ILeadForm>();
  const [leadDocuments, setLeadDocuments] = useState([
    { docName: "", file: "" },
  ]);

  useEffect(() => {
    if (!isAdd && leadId) {
      getLeadByIdService({ header, leadId })
        .then((leadDetails) => {
          const leadVMToLeadForm = convertILeadVMToILeadForm(leadDetails.data);
          setEditLeadDetails(leadVMToLeadForm);
        })
        .catch((error) => {
          console.error("Failed to fetch Lead details", error);
        });
    }
  }, [isAdd, leadId, leadDocuments]);

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
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={4}>
                  <Typography
                    variant="subtitle1"
                    className="text-addButton"
                    component="h2"
                    sx={{ mb: 0 }}
                  >
                    {"Policy Type"}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {editLeadDetails?.policyType!}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="subtitle1"
                    className="text-addButton"
                    component="h2"
                    sx={{ mb: 0 }}
                  >
                    {"Case Type"}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {editLeadDetails?.caseType}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="subtitle1"
                    className="text-addButton"
                    component="h2"
                    sx={{ mb: 0 }}
                  >
                    {"Company Name"}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {editLeadDetails?.companyName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    className="text-addButton"
                    component="h2"
                    sx={{ mb: 0 }}
                  >
                    {"Remarks"}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {editLeadDetails?.remarks}
                  </Typography>
                </Grid>
                <hr className="my-4" />
                <Grid item lg={12} xs={12}>
                  <Typography
                    variant="subtitle1"
                    className="text-addButton"
                    component="h2"
                    sx={{ mb: 0 }}
                  >
                    {"Document"}
                  </Typography>

                  <Grid container mb={2}>
                    {editLeadDetails?.documents?.map((doc: any, index: any) => (
                      <Grid key={index} item md={4}>
                        <Typography
                          variant="subtitle2"
                          className="text-addButton"
                          component="h2"
                          sx={{ mb: 2 }}
                        >
                          {doc.docName}
                        </Typography>

                        {doc.file && (
                          <img
                            src={doc.file}
                            alt={doc.docName}
                            style={{
                              maxWidth: "200px",
                              maxHeight: "200px",
                            }}
                          />
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>

              <EditLeadForm
                initialValues={{
                  id: isAdd ? "0" : editLeadDetails?.id || "",
                  category: isAdd ? "" : editLeadDetails?.category || "",
                  policyType: isAdd ? "" : editLeadDetails?.policyType || "",
                  caseType: isAdd ? "" : editLeadDetails?.caseType || "",
                  companyName: isAdd ? "" : editLeadDetails?.companyName || "",
                  partnerId: isAdd ? "" : editLeadDetails?.partnerId || "",
                  partnerName: isAdd ? "" : editLeadDetails?.partnerName || "",
                  relationshipManagerId: isAdd
                    ? ""
                    : editLeadDetails?.relationshipManagerId || "",
                  relationshipManagerName: isAdd
                    ? ""
                    : editLeadDetails?.relationshipManagerName || "",
                  remarks: isAdd ? "" : editLeadDetails?.remarks || "",
                  status: isAdd ? "" : editLeadDetails?.status || "",
                  leadCreatedBy: isAdd
                    ? ""
                    : editLeadDetails?.leadCreatedBy || "",
                  documents: isAdd ? [] : editLeadDetails?.documents || [],
                  isActive: isAdd ? true : editLeadDetails?.isActive || true,
                  createdBy: "Admin",
                  updatedBy: "Admin",
                }}
              />
            </CardContent>
          </Card>
        </Paper>
      </div>
    </>
  );
};

export default EditLead;
