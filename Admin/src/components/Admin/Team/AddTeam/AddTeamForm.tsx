/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { FormControl, Autocomplete } from "@mui/material";
import addTeamService from "../../../../api/Team/AddTeam/addTeamService";
import { ITeamForm, ITeams } from "../ITeam";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import {
  ADD,
  header,
  Document,
  MAX_FILE_SIZE,
} from "../../../../context/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { teamPath } from "../../../../sitemap";
import editTeamService from "../../../../api/Team/EditTeam/editTeamService";
import useGetBranches from "../../../../Hooks/Branch/useGetBranches";
import useGetRoles from "../../../../Hooks/Role/useGetRoles";
import useGetRMList from "../../../../Hooks/RM/useGetRMList";
import { ConvertToBase64 } from "../../../../utils/ConvertToBase64";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import validateEmailService from "../../../../api/Team/ValidateEmail/validateEmailService";
export interface addPolicyTypeFormProps {
  initialValues: ITeamForm;
}

const AddTeamForm = (props: addPolicyTypeFormProps) => {
  const [documents, setDocuments] = useState<Document[]>([
    { docName: "", file: "" },
  ]);
  const [teamErrors, setErrors] = useState<{ docName: string; file: string }[]>(
    [{ docName: "", file: "" }]
  );
  const { initialValues } = props;

  let [branches] = useGetBranches({ header: header });
  let [roles] = useGetRoles({ header: header });
  let [headRMs] = useGetRMList({
    header: header,
    role: "Relationship Manager",
  });
  const [selectedRMName, setSelectedRMName] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [selectedRMId, setSelectedRMId] = useState("");
  const [filteredHeadRM, setFilteredHeadRM] = useState<ITeams[]>([]);
  const [selectedRole, setSelectedRole] = useState<any>();
  const [selectedBranch, setSelectedBranch] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation() as any;
  const pathName = location.pathname.split("/");
  const isAddEdit = pathName[pathName.length - 1] as string;
  const isAdd = isAddEdit === ADD;
  const [rmErrorMessage, setRMErrorMessage] = useState("");
  useEffect(() => {
    if (!isAdd) {
      const pageloaddocument: any[] = initialValues?.document!;

      if (pageloaddocument.length > 0) {
        setDocuments(pageloaddocument);
      }
    }
  }, [isAdd, initialValues.document]);

  useEffect(() => {
    if (!isAdd) {
      setSelectedRole(initialValues.role!);
      setFilteredHeadRM(headRMs);
      setSelectedRMId(initialValues.headRMId!);
      setSelectedRMName(initialValues.headRM!);
    } else {
      setFilteredHeadRM([]);
    }
  }, [initialValues, isAdd, headRMs]);

  useEffect(() => {
    if (selectedRole !== undefined) {
      if (selectedRole === "Relationship Manager") {
        setFilteredHeadRM([]);
      } else {
        setSelectedRole(selectedRole?.roleName!);
        setFilteredHeadRM(headRMs);
      }
    }
  }, [selectedRole, headRMs]);

  const handleChangeBranch = async (e: any) => {
    setSelectedBranch(e.branchName);
  };
  const validateDocument = (document: Document, index: number) => {
    const isValidDocName = document.docName.trim() !== "";
    const isValidFile = document.file.trim() !== "";
    validateField(index, "docName", document.docName);
    validateField(index, "file", document.file);
    return isValidDocName && isValidFile;
  };

  const validateField = (index: number, name: string, value: string) => {
    const newErrors = [...teamErrors];
    if (name === "docName" || name === "file") {
      newErrors[index] = {
        ...newErrors[index],
        [name]: value.trim() === "" ? `${name} cannot be empty` : "",
      };
    }
    setErrors(newErrors);
  };
  const onSubmit = async (team: ITeamForm) => {
    const formValid = documents.every((doc, index) =>
      validateDocument(doc, index)
    );
    if (team.role.roleName.toLowerCase() === "relationship manager") {
      if (formValid) {
        team.branchName = selectedBranch;
        team.role = team.role.roleName!;
        team.document = documents;
        team.headRMId = selectedRMId === undefined ? "" : selectedRMId;
        team.headRM = selectedRMName;
        if (isAdd) {
          callAddTeamAPI(team);
        } else {
          callEditTeamAPI(team);
        }
      }
    } else {
      if (!selectedRMId) {
        setRMErrorMessage("Select Partner or RM");
      } else if (formValid) {
        setRMErrorMessage("");
        team.branchName = selectedBranch;
        team.role = team.role.roleName!;
        team.document = documents;
        team.headRMId = selectedRMId === undefined ? "" : selectedRMId;
        team.headRM = selectedRMName;
        if (isAdd) {
          callAddTeamAPI(team);
        } else {
          callEditTeamAPI(team);
        }
      }
    }
  };

  const navigateToTeams = (message: string) => {
    navigate(teamPath(), {
      state: message,
    });
  };

  const callAddTeamAPI = async (team: ITeamForm) => {
    try {
      const newTeam = await addTeamService({ header, team });
      navigateToTeams(`${newTeam.message}`);
    } catch (response) {
      // Handle error
    }
  };

  const callEditTeamAPI = async (team: ITeamForm) => {
    try {
      const newTeam = await editTeamService({ header, team });
      navigateToTeams(`${newTeam.message}`);
    } catch (response) {
      // Handle error
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    //const { name, value } = event.target;
    // const newDocuments = [...documents];
    // newDocuments[index] = { ...newDocuments[index], [name]: value };
    // setDocuments(newDocuments);

    // validateField(index, name, value);
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileSize = file.size;
      const newErrors = [...teamErrors];
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

  // handle DocName change
  const handleChangeDocumentName = (docName: string, index: any) => {
    const updatedDocuments = documents.map((doc, i) =>
      i === index ? { ...doc, docName: docName } : doc
    );
    setDocuments(updatedDocuments);
  };

  const handleClickDeleteDocument = (index: any) => {
    setDocuments((prevDocuments) =>
      prevDocuments.filter((_, i) => i !== index)
    );
  };

  const handleClickAddDocument = () => {
    setDocuments([...documents, { docName: "", file: "" }]);
  };

  const handleSelectRMChange = async (e: any) => {
    setSelectedRMId(e._id!);
    setSelectedRMName(e.fullName!);
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

  const checkEmailExists = async (e: any) => {
    const email = e.target.value;
    try {
      const emailCheck = await validateEmailService({
        header,
        email,
      });
      if (emailCheck.status === "success") {
        setEmailErrorMessage("Email already exist");
        return true;
      } else {
        setEmailErrorMessage(" ");
        return false;
      }
    } catch {
      console.error("error");
      return false;
    }
  };

  const validationSchema = yup.object().shape({
    // email: yup
    //   .string()
    //   .email("Invalid email format")
    //   .test(
    //     "checkEmailExists",
    //     "Email already exists",
    //     async function (value: any) {
    //       if (!value) {
    //         return true; // Skip validation if the email is empty
    //       }
    //       const exists = await checkEmailExists(value);
    //       return !exists; // Return true if email does not exist, false otherwise
    //     }
    //   ),
    fullName: yup
      .string()
      .required("Full Name is required")
      .min(1, "Name must be at least 1 character")
      .max(100, "Name cannot exceed 100 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(1, "Name must be at least 1 character"),
    phoneNumber: yup
      .string()
      .required("Mobile Number is required")
      .min(1, "Mobile NUmber must be at least 1 character"),
    email: yup
      .string()
      .required("Email is required")
      .min(1, "email must be at least 1 character"),
    gender: yup
      .string()
      .required("gender is required")
      .min(1, "gender must be at least 1 character"),
    address: yup
      .string()
      .required("address is required")
      .min(1, "address must be at least 1 character"),
    pincode: yup
      .string()
      .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
      .required("Pincode is required")
      .min(1, "address must be at least 1 character"),
    bankName: yup
      .string()
      .required("Bank Name is required")
      .min(1, "bankName must be at least 1 character"),
    IFSC: yup
      .string()
      .required("IFSC is required")
      .min(1, "IFSC must be at least 1 character"),
    accountHolderName: yup
      .string()
      .required("Account Holder Name is required")
      .min(1, "Account Holder Name must be at least 1 character"),
    accountNumber: yup
      .string()
      .required("accountNumber is required")
      .min(1, "accountNumber must be at least 1 character"),
    salary: yup
      .string()
      .required("salary is required")
      .min(1, "salary must be at least 1 character"),
    role: yup.object().nullable().required("Role is required"),
    branchName: yup.object().nullable().required("Branch Name is required"),
  });
  const validate = validateFormValues(validationSchema);
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({ handleSubmit, submitting, errors }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Field name="branchName">
                {({ input, meta }) => (
                  <div>
                    <FormControl fullWidth size="small">
                      <Autocomplete
                        {...input}
                        id="branchName"
                        value={
                          input.value !== undefined
                            ? input.value
                            : initialValues.branchName || null
                        }
                        options={branches} // Replace with your options array
                        getOptionLabel={(option) =>
                          typeof option === "string"
                            ? option
                            : option.branchName || ""
                        }
                        onChange={(event, newValue) => {
                          input.onChange(newValue);
                          handleChangeBranch(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label=" Select Branch"
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
              <Field name="role">
                {({ input, meta }) => (
                  <div>
                    <FormControl fullWidth size="small">
                      <Autocomplete
                        {...input}
                        id="role"
                        value={
                          input.value !== undefined
                            ? input.value
                            : initialValues.role || null
                        }
                        options={roles} // Replace with your options array
                        getOptionLabel={(option) =>
                          typeof option === "string"
                            ? option
                            : option.roleName || ""
                        }
                        onChange={(event, newValue) => {
                          input.onChange(newValue);
                          setSelectedRole(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label=" Select Role"
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
            {filteredHeadRM && filteredHeadRM.length > 0 && (
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Field name="headRM">
                  {({ input, meta }) => (
                    <div>
                      <FormControl fullWidth size="small">
                        <Autocomplete
                          {...input}
                          id="headRM"
                          value={
                            input.value !== undefined
                              ? input.value
                              : initialValues.headRM || null
                          }
                          getOptionLabel={(option) =>
                            typeof option === "string"
                              ? option
                              : option.fullName || ""
                          }
                          options={filteredHeadRM} // Replace with your options array
                          onChange={(event, newValue) => {
                            input.onChange(newValue);
                            handleSelectRMChange(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=" Select headRM"
                              className="rounded-sm w-full"
                              size="small"
                              variant="outlined"
                              error={meta.touched && !!meta.error}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        />
                        {rmErrorMessage && (
                          <div style={{ color: "red" }}>{rmErrorMessage}</div>
                        )}
                      </FormControl>
                    </div>
                  )}
                </Field>
              </Grid>
            )}
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Field name="fullName">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Enter Full Name"
                    variant="outlined"
                    size="small"
                    className="rounded-sm w-full"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Field name="phoneNumber">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Enter Mobile Number"
                    variant="outlined"
                    size="small"
                    className="rounded-sm w-full"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Field name="email">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    id="email"
                    label="Enter Email"
                    type="email"
                    variant="outlined"
                    size="small"
                    className="rounded-sm w-full"
                    onChangeCapture={checkEmailExists}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
              {emailErrorMessage && (
                <div style={{ color: "red" }}>{emailErrorMessage}</div>
              )}
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Field name="password">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Enter Password"
                    variant="outlined"
                    size="small"
                    className="rounded-sm w-full"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Field name="gender">
                {({ input, meta }) => (
                  <div>
                    <FormControl fullWidth size="small">
                      <Autocomplete
                        {...input}
                        id="gender"
                        value={
                          input.value !== undefined
                            ? input.value
                            : initialValues.gender || null
                        }
                        options={["Male", "Female", "Other"]} // Your options for gender
                        onChange={(event, newValue) => {
                          input.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Gender"
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
              <Field name="salary">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Enter Salary"
                    variant="outlined"
                    size="small"
                    className="rounded-sm w-full"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Field name="address">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Enter Address"
                    multiline
                    rows={3}
                    variant="outlined"
                    size="small"
                    className="rounded-sm w-full"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Field name="pincode">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Enter Pincode"
                    variant="outlined"
                    size="small"
                    className="rounded-sm w-full"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Field name="dateOfBirth">
                {({ input, meta }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disableFuture
                      label="Date of Birth"
                      value={input.value || new Date()} // Initialize the value if it's undefined
                      onChange={(date) => input.onChange(date)}
                      renderInput={(params: any) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              </Field>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Field name="bankName">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Enter Bank Name"
                    variant="outlined"
                    size="small"
                    className="rounded-sm w-full"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Field name="IFSC">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Enter IFSC"
                    variant="outlined"
                    size="small"
                    className="rounded-sm w-full"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Field name="accountHolderName">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Enter Account Holder Name"
                    variant="outlined"
                    size="small"
                    className="rounded-sm w-full"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Field name="accountNumber">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Enter Account Number"
                    variant="outlined"
                    size="small"
                    className="rounded-sm w-full"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
            </Grid>

            <Grid item md={12} mt={2}>
              <Button variant="outlined" onClick={handleClickAddDocument}>
                Add More Document
              </Button>
              <Typography variant="body1" gutterBottom mr={4}>
                {"Image should be 100x100 pixels and must be <= 256KB."}
              </Typography>
            </Grid>
            <Grid item md={12}>
              {documents.map((doc, index) => (
                <Grid item key={index} md={11} xs={12}>
                  <Grid container spacing={2} mt={1}>
                    <Grid item lg={4} md={4} sm={4} xs={12}>
                      <Autocomplete
                        value={doc.docName}
                        onChange={(e, newValue) =>
                          handleChangeDocumentName(newValue!, index)
                        }
                        options={[
                          "image",
                          "adharCardFront",
                          "adharCardBack",
                          "panCard",
                          "qualification",
                          "bankProof",
                          "experience",
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

                      {teamErrors[index]?.docName && (
                        <span>{teamErrors[index].docName}</span>
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

                      {teamErrors[index]?.file && (
                        <span style={{ color: "red" }}>
                          {teamErrors[index].file}
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
                            onClick={() => handleClickDeleteDocument(index)}
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
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                disabled={submitting}
                variant="contained"
                color="primary"
                className=" w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
              >
                {isAdd ? "Add Team" : "Update Team"}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

export default AddTeamForm;
