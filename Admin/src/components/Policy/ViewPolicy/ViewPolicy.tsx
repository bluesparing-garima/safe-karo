/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IAddEditPolicyForm, IPolicyVM } from "../IPolicy";
import { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import editPolicyService from "../../../api/Policies/EditPolicy/editPolicyService";
import { header } from "../../../context/constant";
import { motorPolicyPath } from "../../../sitemap";
import * as yup from "yup";
import { setIn } from "final-form";

const ViewPolicy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const policy: IPolicyVM = location.state as IPolicyVM;
  const [documents, setDocuments] = useState([{ docName: "", file: "" }]);

  useEffect(() => {
    if (policy.documents.length > 0) {
      setDocuments(policy.documents);
    }
  });

  const onSubmit = async (policyForm: IAddEditPolicyForm) => {
    const ODcost = policy.od;
    const TPcost = policy.tp;
    //value form Excel
    const ODpercentage = policyForm?.odPercentage!;
    const TPpercentage = policyForm?.tpPercentage!;

    //Calcuation
    const calculatedODPercentage = (ODcost * ODpercentage) / 100;
    const calculatedTPPercentage = (TPcost * TPpercentage) / 100;

    policy.odPayoutAmount = calculatedODPercentage;
    policy.tpPayoutAmount = calculatedTPPercentage;
    policy.odPercentage = policyForm?.odPercentage!;
    policy.tpPercentage = policyForm?.tpPercentage!;

    try {
      const newRole = await editPolicyService({ header, policy });
      if (newRole.status === "success") {
        navigate(motorPolicyPath());
      }
    } catch (response) {
      // Handle error
    }
  };

  // To be passed to React Final Form
  const validateFormValues = (schema: any) => async (values: any) => {
    if (typeof schema === "function") {
      schema = schema();
    }
    try {
      await schema.validate(values, { abortEarly: false });
    } catch (err: any) {
      const errors = err.inner.reduce((formError: any, innerError: any) => {
        return setIn(formError, innerError.path, innerError.message);
      }, {});

      return errors;
    }
  };
  const validationSchema = yup.object().shape({
    odPercentage: yup.number().required("OD Perimum is required"),
    tpPercentage: yup.number().required("TP Perimum is required"),
  });

  const validate = validateFormValues(validationSchema);

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
            {"View Policy"}
          </Typography>
          <Typography variant="h5" mb={2}>
            <Link to="/dashboard" className="text-addButton font-bold text-sm">
              Dashboard {" / "}
            </Link>
            <Link
              to="/policy/motorpolicies"
              className="text-addButton font-bold text-sm"
            >
              Policy /
            </Link>
            <span className="text-grey-600 text-sm">{"View Policy"}</span>
            {/* Add a full-width grey line here */}
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>

          <Card>
            <CardContent>
              <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, submitting, errors }) => (
                  <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                      <Grid item sm={6}>
                        <Field name="odPercentage">
                          {({ input, meta }) => (
                            <TextField
                              {...input}
                              label="Enter OD Percentage"
                              variant="outlined"
                              type="number"
                              className="rounded-sm w-full"
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item sm={6}>
                        <Field name="tpPercentage">
                          {({ input, meta }) => (
                            <TextField
                              {...input}
                              type="number"
                              label="Enter TP Percentage"
                              variant="outlined"
                              className="rounded-sm w-full"
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          disabled={submitting}
                          variant="contained"
                          color="primary"
                          className=" w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                        >
                          Update Policy
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                )}
              />
            </CardContent>
          </Card>

          <Grid container mt={2}>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Policy Status"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.policyStatus}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                Policy Number
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.policyNumber}
              </Typography>
            </Grid>
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
                {policy.policyType}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Product"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.productType}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Sub Category"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.subCategory}
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
                {policy.caseType}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Make"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.make}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Model"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.model}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Fuel Type"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.fuelType}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"RTO"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.rto}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Vehicle Number"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.vehicleNumber}
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
                {policy.companyName}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Seating Capacity"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.seatingCapacity}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"CC"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.cc}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Weight"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.weight}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"NCB"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.ncb}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Full Name"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.fullName}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Email Id"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.emailId}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Phone Number"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.phoneNumber}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Vehicle Age"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.vehicleAge}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"MFG Year"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.mfgYear}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Tenure"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.tenure}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Registration Date"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.registrationDate}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"End Date"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.endDate}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Issue Date"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.issueDate}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"IDV"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.idv}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"OD"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.od}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"TP"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.tp}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Net Premium"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.netPremium}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Final Premium"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.finalPremium}
              </Typography>
            </Grid>
            {policy.odPercentage && (
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className="text-addButton"
                  component="h2"
                  sx={{ mb: 0 }}
                >
                  {"OD Percentage"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {policy.odPercentage}
                </Typography>
              </Grid>
            )}
            {policy.tpPercentage && (
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className="text-addButton"
                  component="h2"
                  sx={{ mb: 0 }}
                >
                  {"TP Percentage"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {policy.tpPercentage}
                </Typography>
              </Grid>
            )}
            {policy.odPayoutAmount && (
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className="text-addButton"
                  component="h2"
                  sx={{ mb: 0 }}
                >
                  {"OD Payout"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {policy.odPayoutAmount}
                </Typography>
              </Grid>
            )}
            {policy.tpPayoutAmount && (
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className="text-addButton"
                  component="h2"
                  sx={{ mb: 0 }}
                >
                  {"TP Payout"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {policy.tpPayoutAmount}
                </Typography>
              </Grid>
            )}
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Payment Mode"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.paymentMode}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Payment Details"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.paymentDetails}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Policy Created By"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.policyCreatedBy}
              </Typography>
            </Grid>

            {policy.policyCreatedBy === "Partner" && (
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className="text-addButton"
                  component="h2"
                  sx={{ mb: 0 }}
                >
                  {"Partner Name"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {policy.partnerName}
                </Typography>
              </Grid>
            )}
            {policy.policyCreatedBy === "Relationship Manager" && (
              <Grid item xs={4}>
                <Typography
                  variant="subtitle1"
                  className="text-addButton"
                  component="h2"
                  sx={{ mb: 0 }}
                >
                  {"Relationship Manager Name"}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {policy.relationshipManagerName}
                </Typography>
              </Grid>
            )}
            <Grid item xs={4}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Policy Created On"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {policy.createdOn}
              </Typography>
            </Grid>

            <hr className="my-4" />
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                className="text-addButton"
                component="h2"
                sx={{ mb: 0 }}
              >
                {"Documents"}
              </Typography>

              <ul>
                {documents.map((doc, index) => (
                  <li key={index}>
                    <Typography
                      variant="subtitle1"
                      className="text-addButton"
                      component="h2"
                      sx={{ mb: 0 }}
                    >
                      {doc.docName}
                    </Typography>

                    {doc.file && (
                      <div>
                        <img
                          src={doc.file}
                          alt={doc.docName}
                          style={{ maxWidth: "200px", maxHeight: "200px" }}
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
};

export default ViewPolicy;
