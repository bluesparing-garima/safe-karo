import React, { useEffect, useState } from "react";
//import { useTranslation } from "react-i18next";
import {
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  TextField,
  Autocomplete,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Form } from "react-final-form";
import {
  MAX_FILE_SIZE,
  SafeKaroUser,
  header,
  Document,
  ADD,
} from "../../../context/constant";
import { ConvertToBase64 } from "../../../utils/ConvertToBase64";
import { ILeadForm } from "../IAgent";
import editLeadService from "../../../api/Leads/EditLead/editLeadService";
import { leadsPath } from "../../../sitemap";

export interface addLeadRequestFormProps {
  initialValues: ILeadForm;
}

const EditLeadForm = (props: addLeadRequestFormProps) => {
  const { initialValues } = props;
  const navigate = useNavigate();
  const location = useLocation() as any;
  const pathName = location.pathname.split("/");
  const isAddEdit = pathName[pathName.length - 1] as string;
  const isAdd = isAddEdit === ADD;

  //console.log()
  const { leadId } = useParams();
  const [errors, setErrors] = useState<{ docName: string; file: string }[]>([
    { docName: "", file: "" },
  ]);
  const [documents, setDocuments] = useState<Document[]>([
    { docName: "", file: "" },
  ]);

  const [errorMessage, setErrorMessage] = useState("");
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;

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
  const onSubmit = (leadForm: any, form: any) => {
    // editLeadDetails
    const formValid = documents.every((doc, index) =>
      validateDocument(doc, index)
    );

    if (formValid) {
      leadForm.id = leadId;
      leadForm.category = initialValues?.category;
      leadForm.policyType = initialValues?.policyType;
      leadForm.caseType = initialValues?.caseType;
      leadForm.companyName = initialValues?.companyName;
      leadForm.partnerId = initialValues?.partnerId;
      leadForm.partnerName = initialValues?.partnerName;
      leadForm.relationshipManagerId = initialValues?.relationshipManagerId;
      leadForm.relationshipManagerName = initialValues?.relationshipManagerName;
      leadForm.leadCreatedBy = initialValues?.leadCreatedBy;
      leadForm.remarks = initialValues?.remarks;
      leadForm.status = "requested";
      leadForm.updatedBy = userData.role;
      leadForm.documents = documents;
      callEditLeadAPI(leadForm);
    }
  };

  const callEditLeadAPI = async (leadForm: any) => {
    try {
      const newLead = await editLeadService({ header, lead: leadForm });
      if (newLead.status === "success") {
        navigate(leadsPath());
      }
    } catch (response) {
      // Handle error
    }
  };

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
  useEffect(() => {
    const pageloaddocument: any[] = initialValues?.documents!;

    if (pageloaddocument.length > 0) {
      setDocuments(pageloaddocument);
    }
  }, [initialValues.documents]);

  return (
    <>
      <div className="bg-blue-200 p-1">
        <Paper elevation={3} style={{ padding: 20 }}>
          <Card>
            <CardContent>
              <Typography
                variant="h5"
                className="text-safekaroDarkOrange"
                gutterBottom
                display="inline"
              >
                Update Documents
              </Typography>
              <Form
                mt={3}
                onSubmit={onSubmit}
                initialValues={initialValues}
                //validate={addValidate}
                render={({ handleSubmit, submitError, submitting }) => (
                  <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
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
                                onChange={(e) =>
                                  handleFileInputChange(e, index)
                                }
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
                              <span style={{ color: "red" }}>
                                {errorMessage}
                              </span>
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
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        {submitError && (
                          <div className="error text-safekaroDarkOrange">
                            {submitError}
                          </div>
                        )}
                        <Button variant="contained" type="submit">
                          submit
                        </Button>
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

export default EditLeadForm;
