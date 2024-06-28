import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import useGetPolicyTypes from "../../../Hooks/Policy/useGetPolicyTypes";
import {
  MAX_FILE_SIZE,
  Document,
  SafeKaroUser,
  header,
} from "../../../context/constant";
import useGetCaseTypes from "../../../Hooks/CaseType/useGetCaseTypes";
import useGetCompanies from "../../../Hooks/Company/useGetCompanies";
import { ConvertToBase64 } from "../../../utils/ConvertToBase64";
import { leadsPath } from "../../../sitemap";
import { ILeadForm } from "../IAgent";
import { useNavigate } from "react-router-dom";
import { FORM_ERROR, setIn } from "final-form";
import * as yup from "yup";
import addLeadsService from "../../../api/Leads/AddLead/addLeadsService";
import { policyCreatedByAdmin } from "../../Policy/IPolicyData";
import useGetPartners from "../../../Hooks/Partner/useGetPartners";

export interface addLeadRequestFormProps {
  initialValues: ILeadForm;
}

const AddLeadFormCard = (props: addLeadRequestFormProps) => {
  let { initialValues } = props;
  const [leadErrorMessage, setLeadErrorMessage] = useState("");
  const [documents, setDocuments] = useState<Document[]>([
    { docName: "", file: "" },
  ]);
  const [errors, setErrors] = useState<{ docName: string; file: string }[]>([
    { docName: "", file: "" },
  ]);

  const navigate = useNavigate();
  let [partners] = useGetPartners({ header: header, role: "Agent" });
  let [policyTypes] = useGetPolicyTypes({ header: header });
  let [caseTypes] = useGetCaseTypes({ header: header });
  let [companies] = useGetCompanies({ header: header });
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPolicyCreatedBy, setSelectedPolicyCreatedBy] = useState();
  const [selectedPartnerName, setSelectedPartnerName] = useState("");
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [selectedRMName, setSelectedRMName] = useState("");
  const [selectedRMId, setSelectedRMId] = useState("");

  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;

  // handle DocName change
  const handleChangeDocumentName = (docName: string, index: any) => {
    const updatedDocuments = documents.map((doc, i) =>
      i === index ? { ...doc, docName: docName } : doc
    );
    setDocuments(updatedDocuments);
  };

  const handleClickAddDocument = () => {
    setDocuments([...documents, { docName: "", file: "" }]);
  };

  const handleClickDeleteDocument = (index: any) => {
    setDocuments((prevDocuments) =>
      prevDocuments.filter((_, i) => i !== index)
    );
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileSize = file.size;
      const newErrors = [...errors];
      if (fileSize > MAX_FILE_SIZE) {
        setErrorMessage("Image is incorrect size.");
      } else {
        setErrorMessage("");
        ConvertToBase64(file)
          .then((result) => {
            const newDocuments = [...documents];
            newDocuments[index] = { ...newDocuments[index], file: result };
            setDocuments(newDocuments);
            // Clear the error if the file is valid
            if (newErrors[index]) {
              newErrors[index].file = "";
            }
            setErrors(newErrors);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  const onSubmit = (leadForm: any, form: any) => {
    //validate conditions
    const formValid = documents.every((doc, index) =>
      validateDocument(doc, index)
    );

    if (formValid) {
      // Submit form
      setLeadErrorMessage("");
      leadForm.relationshipManagerId =
        userData.role.toLowerCase() === "agent"
          ? userData.headRMId
          : selectedRMId;
      leadForm.relationshipManagerName =
        userData.role.toLowerCase() === "agent"
          ? userData.headRM
          : selectedRMName;
      leadForm.partnerId =
        userData.role.toLowerCase() === "agent"
          ? userData.partnerId
          : selectedPartnerId;
      leadForm.partnerName =
        userData.role.toLowerCase() === "agent"
          ? userData.name
          : selectedPartnerName;
      leadForm.policyType = leadForm.policyType.policyType;
      leadForm.caseType = leadForm.caseType.caseType;
      leadForm.companyName = leadForm.companyName.companyName;
      leadForm.documents = documents;
      leadForm.createdBy = userData.role;
      leadForm.leadCreatedBy =
        userData.role.toLowerCase() === "agent" ? "" : userData.id;
      leadForm.status =
        userData.role.toLowerCase() === "agent" ? "Requested" : "Accepted";
      callAddLeadAPI(leadForm, form);
    }
  };

  const validateDocument = (document: Document, index: number) => {
    const isValidDocName = document.docName.trim() !== "";
    const isValidFile = document.file.trim() !== "";
    validateField(index, "docName", document.docName);
    validateField(index, "file", document.file);
    return isValidDocName && isValidFile;
  };

  const validateField = (index: number, name: string, value: string) => {
    const newErrors = [...errors];
    if (name === "docName" || name === "file") {
      newErrors[index] = {
        ...newErrors[index],
        [name]: value.trim() === "" ? `${name} cannot be empty` : "",
      };
    }
    setErrors(newErrors);
  };
  const callAddLeadAPI = async (lead: ILeadForm, form: any) => {
    try {
      const newLead = await addLeadsService({
        header,
        lead,
      });
      if (newLead.status === "success") {
        navigate(leadsPath());
      } else {
        return { [FORM_ERROR]: `error` };
      }
      //navigateToPolicies(`${newLead.message}`);
    } catch (response) {
      // Handle error
      setDocuments([{ docName: "", file: "" }]);
      return { [FORM_ERROR]: `error` };
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
    policyType: yup.object().nullable().required("Policy Type is required"),
    caseType: yup.object().nullable().required("Case Type is required"),
    companyName: yup.object().nullable().required("Company Name is required"),
  });

  const addValidate = validateFormValues(validationSchema);
  const handleSelectPolicyCreatedBy = (event: any, newValue: any) => {
    setSelectedPolicyCreatedBy(newValue.label);
  };

  const handleSelectPartnerChange = async (e: any) => {
    setSelectedPartnerId(e._id!);
    setSelectedPartnerName(e.fullName!);
    setSelectedRMId(e.headRMId!);
    setSelectedRMName(e.headRM!);
  };

  return (
    <>
      <React.Fragment>
        <Card>
          <CardContent>
            <Form
              mt={3}
              onSubmit={onSubmit}
              initialValues={initialValues}
              validate={addValidate}
              render={({ handleSubmit, submitError, submitting }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      {leadErrorMessage && (
                        <div style={{ color: "red" }}>{leadErrorMessage}</div>
                      )}
                    </Grid>

                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="policyType">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                id="policyType"
                                value={
                                  input.value !== undefined
                                    ? input.value
                                    : initialValues.policyType || null
                                }
                                options={policyTypes} // Replace with your options array
                                getOptionLabel={(option) =>
                                  typeof option === "string"
                                    ? option
                                    : option.policyType || ""
                                }
                                onChange={(event, newValue) => {
                                  input.onChange(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label=" Select Policy Type"
                                    className="rounded-sm w-full"
                                    size="small"
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
                      <Field name="caseType">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                value={input.value || null}
                                options={caseTypes} // Replace with your options array
                                getOptionLabel={(option) => option.caseType}
                                onChange={(event, newValue) => {
                                  input.onChange(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label=" Select Case Type"
                                    className="rounded-sm w-full"
                                    size="small"
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
                      <Field name="companyName">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                value={input.value || null}
                                options={companies} // Replace with your options array
                                getOptionLabel={(option) => option.companyName}
                                onChange={(event, newValue) => {
                                  input.onChange(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label=" Select Company Name"
                                    className="rounded-sm w-full"
                                    size="small"
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
                    {userData.role.toLowerCase() === "operation" ? (
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Field name="policyCreatedBy">
                          {({ input, meta }) => (
                            <div>
                              <FormControl fullWidth size="small">
                                <Autocomplete
                                  {...input}
                                  getOptionLabel={(option) => option.label}
                                  value={input.value || null}
                                  options={policyCreatedByAdmin} // Replace with your options array
                                  onChange={(event, newValue) => {
                                    input.onChange(newValue);
                                    handleSelectPolicyCreatedBy(
                                      event,
                                      newValue
                                    );
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      className="rounded-sm w-full"
                                      size="small"
                                      label="Select Made by"
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
                    ) : (
                      ""
                    )}
                    {selectedPolicyCreatedBy &&
                      selectedPolicyCreatedBy === "Partner" && (
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                          <Field name="partnerName">
                            {({ input, meta }) => (
                              <div>
                                <FormControl fullWidth size="small">
                                  <Autocomplete
                                    {...input}
                                    // getOptionLabel={(option) =>
                                    //   option.
                                    // }
                                    value={input.value || null}
                                    getOptionLabel={(option) =>
                                      `${option.fullName} - ${option.partnerId}`
                                    }
                                    options={partners} // Replace with your options array
                                    onChange={(event, newValue) => {
                                      input.onChange(newValue);
                                      handleSelectPartnerChange(newValue);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        className="rounded-sm w-full"
                                        size="small"
                                        label="Select Partners"
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
                      )}
                    <Grid item sm={12}>
                      <Field name="remarks">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            label="Enter Remarks"
                            variant="outlined"
                            multiline
                            rows={4}
                            className="rounded-sm w-full"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item md={12} mt={2}>
                      <Button
                        variant="outlined"
                        onClick={handleClickAddDocument}
                      >
                        Add More Document
                      </Button>
                      <Typography variant="body1" gutterBottom mr={4}>
                        {"Image should be <= 2MB."}
                      </Typography>
                    </Grid>
                    <Grid item md={12}>
                      {documents.map((doc, index) => (
                        <Grid container spacing={2} mt={1}>
                          <Grid item lg={4} md={4} sm={4} xs={12}>
                            <Autocomplete
                              value={doc.docName}
                              onChange={(e, newValue) =>
                                handleChangeDocumentName(newValue!, index)
                              }
                              options={[
                                "RC Front",
                                "RC Back",
                                "Pervious Policy",
                                "Survey",
                                "PUC",
                                "Fitness",
                                "Proposal",
                                "Current Policy",
                                "other",
                                // Add more document names as needed
                              ]}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  className="rounded-sm w-full"
                                  size="small"
                                  label="Select Document"
                                  fullWidth
                                  variant="outlined"
                                />
                              )}
                            />

                            {errors[index]?.docName && (
                              <span>{errors[index].docName}</span>
                            )}
                          </Grid>
                          <Grid item lg={4} md={4} sm={4} xs={12}>
                            <input
                              id={`file ${index}`}
                              type="file"
                              onChange={(e) => handleFileInputChange(e, index)}
                              style={{
                                border: "1px solid #c4c4c4",
                                padding: "5px",
                                width: "100%",
                                borderRadius: "5px",
                              }}
                            />
                            {errors[index]?.file && (
                              <span style={{ color: "red" }}>
                                {errors[index].file}
                              </span>
                            )}
                          </Grid>

                          <Grid item lg={4} md={4} sm={4} xs={4}>
                            <span style={{ color: "red" }}>{errorMessage}</span>
                            {documents.length !== 1 && (
                              <Tooltip title={"Delete Image"}>
                                <IconButton
                                  color="primary"
                                  aria-label={"Delete Image"}
                                  component="span"
                                  onClick={() =>
                                    handleClickDeleteDocument(index)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="size-6"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                  </svg>
                                </IconButton>
                              </Tooltip>
                            )}
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} mt={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      {submitError && (
                        <div className="error text-safekaroDarkOrange">
                          {submitError}
                        </div>
                      )}
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={submitting}
                      >
                        submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </CardContent>
        </Card>
      </React.Fragment>
    </>
  );
};
export default AddLeadFormCard;
