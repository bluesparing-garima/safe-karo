import React, { useEffect, useState } from "react";
//import { useTranslation } from "react-i18next";
import {
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  Autocomplete,
  Button,
} from "@mui/material";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Field, Form } from "react-final-form";
import {
  ADD,
  MAX_FILE_SIZE,
  SafeKaroUser,
  header,
  policyStatusAgent,
  policyStatusOperation,
} from "../../../../context/constant";
import { ConvertToBase64 } from "../../../../utils/ConvertToBase64";
import { ILeadForm, IQuotationForm } from "../../IAgent";
import { convertILeadVMToILeadForm } from "../../../../api/Leads/convertILeadVMToILeadForm";
import getLeadByIdService from "../../../../api/Leads/GetLeadById/getLeadByIdService";
import addQuotationService from "../../../../api/Quatotion/AddQuotation/addQuotationService";
import { bookingRequestNewPath, leadsPath } from "../../../../sitemap";

const AddQuotation = () => {
  const title = "Add Comment";
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;

  const navigate = useNavigate();
  const { leadId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editLeadDetails, setEditLeadDetails] = useState<ILeadForm>();
  const [errorMessage, setErrorMessage] = useState("");
  const [base64, setBase64] = useState<string | null>(null);
  useEffect(() => {
    if (!isAdd && leadId) {
      getLeadByIdService({ header, leadId })
        .then((leadDetails) => {
          const leadVMToLeadForm = convertILeadVMToILeadForm(leadDetails.data);
          setEditLeadDetails(leadVMToLeadForm);
        })
        .catch((error) => {
          console.error("Failed to fetch Leads details", error);
        });
    }
  }, [isAdd, leadId]);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileSize = file.size;
      if (fileSize > MAX_FILE_SIZE) {
        setErrorMessage("Image is incorrect size.");
      } else {
        setErrorMessage("");
        ConvertToBase64(file)
          .then((result) => {
            setBase64(result);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  const onSubmit = (quotationForm: any, form: any) => {
    // quotationForm.relationshipManagerId = userData.headRMId;
    // quotationForm.relationshipManagerName = userData.headRM;
    quotationForm.leadId = leadId;
    quotationForm.partnerId = userData.partnerId;
    quotationForm.partnerName = userData.name;
    quotationForm.createdBy = userData.role;
    quotationForm.quotationImage = base64;
    quotationForm.status = quotationForm.status.value;
    callAddQuotationAPI(quotationForm, form);
  };

  const callAddQuotationAPI = async (
    quotationForm: IQuotationForm,
    form: any
  ) => {
    try {
      const newQuotation = await addQuotationService({
        header,
        quotation: quotationForm,
      });
      if (newQuotation.status === "success") {
        navigate(leadsPath());
      }
    } catch (response) {
      // Handle error
    }
  };

  const handleClickBooking = () => {
    navigate(bookingRequestNewPath(leadId!));
  };

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
              <Form
                mt={3}
                onSubmit={onSubmit}
                //initialValues={initialValues}
                //validate={addValidate}
                render={({ handleSubmit, submitError, submitting }) => (
                  <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
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
                      <Grid item xs={3}>
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
                      <Grid item xs={3}>
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
                      <Grid item xs={3}>
                        <Typography
                          variant="subtitle1"
                          className="text-addButton"
                          component="h2"
                          sx={{ mb: 0 }}
                        >
                          {"Status"}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {editLeadDetails?.status}
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
                          {"Documents"}
                        </Typography>

                        <Grid container>
                          {editLeadDetails?.documents?.map(
                            (doc: any, index: any) => (
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
                            )
                          )}
                        </Grid>
                      </Grid>
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Field name="status">
                          {({ input, meta }) => (
                            <div>
                              <FormControl fullWidth size="small">
                                <Autocomplete
                                  {...input}
                                  getOptionLabel={(option) => option.label}
                                  value={input.value || null}
                                  options={
                                    userData.role.toLowerCase() === "agent"
                                      ? policyStatusAgent
                                      : policyStatusOperation
                                  } // Replace with your options array
                                  onChange={(event, newValue) => {
                                    input.onChange(newValue);
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      className="rounded-sm w-full"
                                      size="small"
                                      label="Select Lead Status"
                                      variant="outlined"
                                      error={meta.touched && !!meta.error}
                                      helperText={meta.touched && meta.error}
                                    />
                                  )}
                                />
                              </FormControl>
                            </div>
                          )}
                        </Field>
                      </Grid>
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <input
                          id={`file`}
                          type="file"
                          onChange={(e) => handleFileInputChange(e)}
                          style={{
                            border: "1px solid #c4c4c4",
                            padding: "5px",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                        />
                        <span style={{ color: "red" }}>{errorMessage}</span>
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Field name="comments">
                          {({ input, meta }) => (
                            <TextField
                              {...input}
                              id="comments"
                              size="small"
                              fullWidth
                              label="Enter Comment"
                              variant="outlined"
                              multiline
                              rows={6}
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        </Field>
                      </Grid>

                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        {submitError && (
                          <div className="error text-safekaroDarkOrange">
                            {submitError}
                          </div>
                        )}
                        <Button variant="contained" type="submit">
                          submit
                        </Button>

                        {userData.role.toLowerCase() === "operation" ? (
                          <>
                            {editLeadDetails &&
                              editLeadDetails.status === "Payment Verified" && (
                                <Button
                                  style={{ marginLeft: "20px" }}
                                  variant="contained"
                                  onClick={handleClickBooking}
                                >
                                  Request for Booking
                                </Button>
                              )}
                          </>
                        ) : (
                          ""
                        )}
                      </Grid>
                    </Grid>
                  </form>
                )}
              />
            </CardContent>
          </Card>
        </Paper>
      </div>
    </>
  );
};

export default AddQuotation;
