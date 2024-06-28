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
import React, { useEffect, useState } from "react";
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
import useGetProducts from "../../../Hooks/Product/useGetProducts";
import useGetProductSubTypes from "../../../Hooks/Product/useGetProductSubTypes";
import { IProductSubTypes } from "../../Admin/ProductSubType/IProductSubTypes";
import { IProducts } from "../../Admin/Product/IProduct";
import {
  policyCreatedBy,
  policyCreatedByAdmin,
} from "../../Policy/IPolicyData";
import useGetPartners from "../../../Hooks/Partner/useGetPartners";
import { ConvertToBase64 } from "../../../utils/ConvertToBase64";
import addBookingRequestService from "../../../api/BookingRequest/AddBookingRequest/addBookingRequestService";
import { bookingRequestsPath } from "../../../sitemap";
import { IBookingRequestForm } from "../IBookingRequests";
import { useNavigate, useParams } from "react-router-dom";
import { FORM_ERROR, setIn } from "final-form";
import * as yup from "yup";
import validatePolicyNumberService from "../../../api/BookingRequest/ValidatePolicyNumber/validatePolicyNumberService";

export interface addBookingRequestFormProps {
  initialValues: IBookingRequestForm;
}

const AddBookingRequestFormCard = (props: addBookingRequestFormProps) => {
  let { initialValues } = props;
  const { leadId } = useParams();

  const [policyErrorMessage, setPolicyErrorMessage] = useState("");
  const [documents, setDocuments] = useState<Document[]>([
    { docName: "", file: "" },
  ]);
  const [errors, setErrors] = useState<{ docName: string; file: string }[]>([
    { docName: "", file: "" },
  ]);

  const navigate = useNavigate();
  let [policyTypes] = useGetPolicyTypes({ header: header });
  let [caseTypes] = useGetCaseTypes({ header: header });
  let [companies] = useGetCompanies({ header: header });
  let [products] = useGetProducts({ header: header });
  let [productSubTypes] = useGetProductSubTypes({ header: header });
  let [partners] = useGetPartners({ header: header, role: "Agent" });
  let [relationshipManagers] = useGetPartners({
    header: header,
    role: "Relationship Manager",
  });
  const [selectedProduct, setSelectedProduct] = useState<IProducts>();
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    IProductSubTypes[]
  >([]);
  const [selectedPolicyCreatedBy, setSelectedPolicyCreatedBy] = useState();
  const [selectedPartnerName, setSelectedPartnerName] = useState("");
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [selectedRMName, setSelectedRMName] = useState("");
  const [selectedRMId, setSelectedRMId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;

  useEffect(() => {
    if (selectedProduct) {
      const ProductId = selectedProduct._id;
      const subCategory = productSubTypes.filter(
        (sub) => sub.productId === ProductId
      );
      if (subCategory.length > 0) {
        setFilteredSubcategories(subCategory);
      } else {
        setFilteredSubcategories([]);
      }
    } else {
      setFilteredSubcategories(productSubTypes);
    }
  }, [selectedProduct, productSubTypes]);

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

  const handleSelectPolicyCreatedBy = (event: any, newValue: any) => {
    setSelectedPolicyCreatedBy(newValue.label);
  };

  const handleSelectPartnerChange = async (e: any) => {
    setSelectedPartnerId(e._id!);
    setSelectedPartnerName(e.fullName!);
    setSelectedRMId(e.headRMId!);
    setSelectedRMName(e.headRM!);
  };

  const handleSelectRMChange = async (e: any) => {
    setSelectedRMId(e._id!);
    setSelectedRMName(e.fullName!);
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
  // const handleFileInputChange = (e: any, i: any) => {
  //   if (e.target.value) {
  //     var file = e.target.files[0];
  //     const fileSize = e.target.files[0].size;
  //     if (fileSize > MAX_FILE_SIZE) {
  //       setErrorMessage("Image is incorrect size.");
  //     } else {
  //       setErrorMessage("");
  //       ConvertToBase64(file)
  //         .then((result) => {
  //           file["base64"] = result;
  //           const name = "file";
  //           const value = file.base64;
  //           const list: any = [...documents];
  //           list[i][name] = value;
  //           setDocuments(list);

  //           //setDocumentImages(file.base64);
  //           // initialValues.image = file.base64;
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //         });
  //     }
  //   }
  // };
  const bindValues = (bookingForm: any, form: any) => {
    bookingForm.relationshipManagerId =
      userData.role === "admin"
        ? selectedRMId
        : bookingForm.policyCreatedBy.value === "Direct"
        ? userData.headRMId
        : selectedRMId;
    bookingForm.relationshipManagerName =
      userData.role === "admin"
        ? selectedRMName
        : bookingForm.policyCreatedBy.value === "Direct"
        ? userData.headRM
        : selectedRMName;
    bookingForm.partnerId =
      userData.role === "admin"
        ? selectedPartnerId
        : bookingForm.policyCreatedBy.value === "Direct"
        ? userData.partnerId
        : selectedPartnerId;
    bookingForm.partnerName =
      userData.role === "admin"
        ? selectedPartnerName
        : bookingForm.policyCreatedBy.value === "Direct"
        ? userData.name
        : selectedPartnerName;
    bookingForm.productType = bookingForm.productType.productName;
    bookingForm.policyType = bookingForm.policyType.policyType;
    bookingForm.caseType = bookingForm.caseType.caseType;
    bookingForm.subCategory = bookingForm.subCategory.productSubType
      ? bookingForm.subCategory.productSubType
      : null;
    bookingForm.companyName = bookingForm.companyName.companyName;
    bookingForm.policyCreatedBy = bookingForm.policyCreatedBy.value;
    bookingForm.document = documents;
    bookingForm.createdBy = userData.role;
    bookingForm.bookingCreatedBy = userData.id;
    console.log("bookingForm", bookingForm);
    callAddBookingRequestAPI(bookingForm, form);
  };

  const onSubmit = (bookingForm: any, form: any) => {
    //validate conditions
    const formValid = documents.every((doc, index) =>
      validateDocument(doc, index)
    );
    if (leadId) {
      bookingForm.relationshipManagerId = initialValues.relationshipManagerId;
      bookingForm.relationshipManagerName =
        initialValues.relationshipManagerName;
      bookingForm.partnerId = initialValues.partnerId;
      bookingForm.partnerName = initialValues.partnerName;
      bookingForm.productType = bookingForm.productType.productName;
      bookingForm.policyType = bookingForm.policyType.policyType;
      bookingForm.caseType = bookingForm.caseType.caseType;
      bookingForm.subCategory = bookingForm.subCategory.productSubType
        ? bookingForm.subCategory.productSubType
        : null;
      bookingForm.companyName = bookingForm.companyName.companyName;
      bookingForm.policyCreatedBy = "Partner";
      bookingForm.document = documents;
      bookingForm.createdBy = userData.role;
      bookingForm.bookingCreatedBy = userData.id;
      //console.log("bookingForm lead", bookingForm);
      callAddBookingRequestAPI(bookingForm, form);
    } else {
      if (bookingForm.policyCreatedBy.value === "admin") {
        if (!selectedRMId) {
          setPolicyErrorMessage("Select Partner or RM");
        } else if (formValid) {
          // Submit form
          bindValues(bookingForm, form);
        }
      } else if (bookingForm.policyCreatedBy.value !== "Direct") {
        setPolicyErrorMessage("");
        if (!selectedRMId) {
          setPolicyErrorMessage("Select Partner or RM");
        } else if (formValid) {
          // Submit form
          setPolicyErrorMessage("");
          bindValues(bookingForm, form);
        }
      } else {
        if (formValid) {
          // Submit form
          setPolicyErrorMessage("");
          bindValues(bookingForm, form);
        }
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
  const callAddBookingRequestAPI = async (
    bookingRequest: IBookingRequestForm,
    form: any
  ) => {
    try {
      const newBookingPolicy = await addBookingRequestService({
        header,
        bookingRequest,
      });
      if (newBookingPolicy.status === "success") {
        navigate(bookingRequestsPath());
      } else {
        return { [FORM_ERROR]: `error` };
      }
      //navigateToPolicies(`${newBookingPolicy.message}`);
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
    policyNumber: yup
      .string()
      .required("Policy Number is required")
      .min(1, "Policy Number must be at least 1 character")
      .max(100, "policyNumber cannot exceed 100 characters"),
    policyType: yup.object().nullable().required("Policy Type is required"),
    caseType: yup.object().nullable().required("Case Type is required"),
    productType: yup.object().nullable().required("Product Type is required"),
    companyName: yup.object().nullable().required("Company Name is required"),
    // policyCreatedBy: yup
    //   .object()
    //   .nullable()
    //   .required("Policy Created By is required"),
    // documents: yup.array().of(
    //   yup.object().shape({
    //     docName: yup.string().required("Document Name is required"),
    //     file: yup
    //       .mixed()
    //       .required("File is required")
    //       .test("fileSize", "File size must be less than 2MB", (value) => {
    //         return value && value.size <= MAX_FILE_SIZE;
    //       }),
    //   })
    // ),
  });

  const addValidate = validateFormValues(validationSchema);

  const handleChangePolicyNumber = async (e: any) => {
    const policyNumber = e.target.value;
    try {
      const newPolicy = await validatePolicyNumberService({
        header,
        policyNumber,
      });
      if (newPolicy.exist) {
        setPolicyErrorMessage(newPolicy.message);
      } else {
        setPolicyErrorMessage("");
      }
    } catch {
      console.error("error");
    }
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
                      {policyErrorMessage && (
                        <div style={{ color: "red" }}>{policyErrorMessage}</div>
                      )}
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="policyNumber">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            id="policyNumber"
                            size="small"
                            fullWidth
                            label="Enter Policy Number"
                            onChangeCapture={handleChangePolicyNumber}
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
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
                                id="caseType"
                                options={caseTypes} // Replace with your options array
                                value={
                                  input.value !== undefined
                                    ? input.value
                                    : initialValues.caseType || null
                                }
                                getOptionLabel={(option) =>
                                  typeof option === "string"
                                    ? option
                                    : option.caseType || ""
                                }
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
                      <Field name="productType">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                id="productType"
                                value={
                                  input.value !== undefined
                                    ? input.value
                                    : initialValues.productType || null
                                }
                                getOptionLabel={(option) =>
                                  typeof option === "string"
                                    ? option
                                    : option.productName || ""
                                }
                                options={products} // Replace with your Dynamic API
                                onChange={(event, newValue) => {
                                  input.onChange(newValue);
                                  setSelectedProduct(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label=" Select Product"
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
                    {filteredSubcategories &&
                      filteredSubcategories.length > 0 && (
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                          <Field name="subCategory">
                            {({ input, meta }) => (
                              <div>
                                <FormControl fullWidth size="small">
                                  <Autocomplete
                                    {...input}
                                    id="subCategory"
                                    value={input.value || null}
                                    getOptionLabel={(option) =>
                                      option.productSubType
                                    }
                                    onChange={(event, newValue) =>
                                      input.onChange(newValue)
                                    }
                                    options={filteredSubcategories}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label=" Select Sub Category"
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
                      )}
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="companyName">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                id="companyName"
                                value={
                                  input.value !== undefined
                                    ? input.value
                                    : initialValues.companyName || null
                                }
                                getOptionLabel={(option) =>
                                  typeof option === "string"
                                    ? option
                                    : option.companyName || ""
                                }
                                options={companies} // Replace with your options array
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
                    {!leadId ? (
                      <>
                        <Grid item lg={4} md={4} sm={6} xs={12}>
                          <Field name="policyCreatedBy">
                            {({ input, meta }) => (
                              <div>
                                <FormControl fullWidth size="small">
                                  <Autocomplete
                                    {...input}
                                    getOptionLabel={(option) => option.label}
                                    value={input.value || null}
                                    options={
                                      userData.role.toLowerCase() === "admin"
                                        ? policyCreatedByAdmin
                                        : policyCreatedBy
                                    } // Replace with your options array
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
                        {selectedPolicyCreatedBy &&
                          selectedPolicyCreatedBy === "Partner" && (
                            <Grid item lg={4} md={4} sm={6} xs={12}>
                              <Field name="partnerName">
                                {({ input, meta }) => (
                                  <div>
                                    <FormControl fullWidth size="small">
                                      <Autocomplete
                                        {...input}
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
                                            helperText={
                                              meta.touched && meta.error
                                            }
                                          />
                                        )}
                                      />
                                    </FormControl>
                                  </div>
                                )}
                              </Field>
                            </Grid>
                          )}

                        {selectedPolicyCreatedBy &&
                          selectedPolicyCreatedBy ===
                            "Relationship Manager" && (
                            <Grid item lg={4} md={4} sm={6} xs={12}>
                              <Field name="relationshipManagerId">
                                {({ input, meta }) => (
                                  <div>
                                    <FormControl fullWidth size="small">
                                      <Autocomplete
                                        {...input}
                                        getOptionLabel={(option) =>
                                          option.fullName
                                        }
                                        value={input.value || null}
                                        options={relationshipManagers} // Replace with your options array
                                        onChange={(event, newValue) => {
                                          input.onChange(newValue);
                                          handleSelectRMChange(newValue);
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            className="rounded-sm w-full"
                                            size="small"
                                            label="Select Relationship Manager"
                                            variant="outlined"
                                            error={meta.touched && !!meta.error}
                                            helperText={
                                              meta.touched && meta.error
                                            }
                                          />
                                        )}
                                      />
                                    </FormControl>
                                  </div>
                                )}
                              </Field>
                            </Grid>
                          )}
                      </>
                    ) : (
                      ""
                    )}
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
                        <Grid item key={index} md={11} xs={12}>
                          <Grid container spacing={2}>
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
export default AddBookingRequestFormCard;
