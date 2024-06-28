import {
  Autocomplete,
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { FormControl } from "@mui/material";
import { ConvertToBase64 } from "../../../utils/ConvertToBase64";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { Field, Form } from "react-final-form";
import { setIn } from "final-form";
import { IAddEditPolicyForm } from "../IPolicy";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import addPolicyService from "../../../api/Policies/AddPolicy/addPolicyService";
import {
  MAX_FILE_SIZE,
  SafeKaroUser,
  Document,
  header,
} from "../../../context/constant";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { motorPolicyPath } from "../../../sitemap";
import { useNavigate } from "react-router-dom";
import { FORM_ERROR } from "final-form";
import useGetProductSubTypes from "../../../Hooks/Product/useGetProductSubTypes";
import useGetPolicyTypes from "../../../Hooks/Policy/useGetPolicyTypes";
import useGetCaseTypes from "../../../Hooks/CaseType/useGetCaseTypes";
import useGetProducts from "../../../Hooks/Product/useGetProducts";
import useGetBrokers from "../../../Hooks/Broker/useGetBrokers";
import useGetCompanies from "../../../Hooks/Company/useGetCompanies";
import useGetFuelTypes from "../../../Hooks/FuelType/useGetFuelTypes";
import {
  paymentModes,
  policyCreatedBy,
  policyCreatedByAdmin,
} from "../IPolicyData";
import useGetMakes from "../../../Hooks/Make/useGetMakes";
import useGetModels from "../../../Hooks/Model/useGetModels";
import useGetPartners from "../../../Hooks/Partner/useGetPartners";
import { IProducts } from "../../Admin/Product/IProduct";
import { IProductSubTypes } from "../../Admin/ProductSubType/IProductSubTypes";
import { IModels } from "../../Admin/Model/IModel";
import { IMakes } from "../../Admin/Make/IMake";
import getPolicyByNumberService from "../../../api/Policies/GetPolicyByNumber/getPolicyByNumberService";
import { Dayjs } from "dayjs";

export interface AddPolicyFormProps {
  initialValues: IAddEditPolicyForm;
}

// Custom validation function for vehicle number format
const validateVehicleNumber = (value: any) => {
  // Regular expression for vehicle number format (assuming Indian vehicle number format)
  const vehicleNumberRegex = /^[A-Z]{2}\d{2}-[A-Z]{2}-\d{4}$/;
  if (!value) {
    return "Vehicle number is required";
  } else if (!vehicleNumberRegex.test(value)) {
    return "Please enter a valid vehicle number (e.g., AB12-CD-1234)";
  }
  return undefined; // No validation error
};

const AddPolicyForm = (props: AddPolicyFormProps) => {
  let storedTheme: any = localStorage.getItem("user") as SafeKaroUser | null;
  let userData = storedTheme ? JSON.parse(storedTheme) : storedTheme;

  const [documents, setDocuments] = useState<Document[]>([
    { docName: "", file: "" },
  ]);
  const [errors, setErrors] = useState<{ docName: string; file: string }[]>([
    { docName: "", file: "" },
  ]);
  let [policyTypes] = useGetPolicyTypes({ header: header });
  let [relationshipManagers] = useGetPartners({
    header: header,
    role: "Relationship Manager",
  });
  let [partners] = useGetPartners({ header: header, role: "Agent" });
  let [caseTypes] = useGetCaseTypes({ header: header });
  let [makes] = useGetMakes({ header: header });
  let [models] = useGetModels({ header: header });
  let [fuelTypes] = useGetFuelTypes({ header: header });
  let [brokers] = useGetBrokers({ header: header });
  let [companies] = useGetCompanies({ header: header });
  let [products] = useGetProducts({ header: header });
  let [productSubTypes] = useGetProductSubTypes({ header: header });
  const [isVisibile, setIsVisibile] = useState(false);
  const [selectedPartnerName, setSelectedPartnerName] = useState("");
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [selectedRMName, setSelectedRMName] = useState("");
  const [selectedRMId, setSelectedRMId] = useState("");
  const navigate = useNavigate();
  const [selectedPaymentMode, setSelectedPaymentMode] = useState();
  const [selectedPolicyCreatedBy, setSelectedPolicyCreatedBy] = useState();
  const [selectedProduct, setSelectedProduct] = useState<IProducts>();
  const [selectedMake, setSelectedMake] = useState<IMakes>();
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    IProductSubTypes[]
  >([]);
  const [filteredSubModels, setFilteredSubModels] = useState<IModels[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [policyErrorMessage, setPolicyErrorMessage] = useState("");
  const [rmErrorMessage, setRMErrorMessage] = useState("");
  const { initialValues } = props;

  const handleFileInputChange = (event: any, index: any) => {
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

  // Function to calculate the difference in years
  const calculateYearDifference = (
    startDate: Dayjs,
    endDate: Dayjs
  ): number => {
    let yearsDifference = endDate.year() - startDate.year();

    // Adjust the yearsDifference if the endDate is before the startDate in the current year
    const monthDifference = endDate.month() - startDate.month();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && endDate.date() < startDate.date())
    ) {
      yearsDifference--;
    }

    return yearsDifference;
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

  const bindValues = async (policyForm: any) => {
    const yearDifference = calculateYearDifference(
      policyForm.registrationDate,
      policyForm.issueDate
    );

    if (yearDifference <= 0) {
      policyForm.vehicleAge = "0 year";
    } else if (yearDifference >= 1 && yearDifference <= 2) {
      policyForm.vehicleAge = "1-2 year";
    } else if (yearDifference >= 3 && yearDifference <= 5) {
      policyForm.vehicleAge = "3-5 year";
    } else if (yearDifference > 5) {
      policyForm.vehicleAge = ">5 year";
    } else {
      policyForm.vehicleAge = null;
    }
    policyForm.relationshipManagerId =
      userData.role === "admin"
        ? selectedRMId
        : policyForm.policyCreatedBy.value === "Direct"
        ? userData.headRMId
        : selectedRMId;
    policyForm.relationshipManagerName =
      userData.role === "admin"
        ? selectedRMName
        : policyForm.policyCreatedBy.value === "Direct"
        ? userData.headRM
        : selectedRMName;
    policyForm.partnerId =
      userData.role === "admin"
        ? selectedPartnerId
        : policyForm.policyCreatedBy.value === "Direct"
        ? userData.partnerId
        : selectedPartnerId;
    policyForm.partnerName =
      userData.role === "admin"
        ? selectedPartnerName
        : policyForm.policyCreatedBy.value === "Direct"
        ? userData.name
        : selectedPartnerName;

    policyForm.productType = policyForm.productType.productName;
    policyForm.createdBy = userData.name;
    policyForm.policyType = policyForm.policyType.policyType;
    //policyForm.vehicleAge = policyForm.vehicleAge.value;
    policyForm.caseType = policyForm.caseType.caseType;
    policyForm.subCategory = policyForm.subCategory.productSubType
      ? policyForm.subCategory.productSubType
      : null;
    policyForm.companyName = policyForm.companyName.companyName;
    policyForm.broker = policyForm.broker.brokerName;
    policyForm.make = policyForm.make.makeName;
    policyForm.model = policyForm.model.modelName;
    policyForm.fuelType = policyForm.fuelType.fuelType;
    policyForm.ncb = policyForm.ncb.value;
    policyForm.paymentMode = policyForm.paymentMode.value;
    policyForm.policyCreatedBy = policyForm.policyCreatedBy.value;
    policyForm.documents = documents;
    policyForm.rto = policyForm.vehicleNumber.substring(0, 4);
    callAddPolicyAPI(policyForm);
  };

  const onSubmit = async (policyForm: any, form: any) => {
    //validate conditions
    const formValid = documents.every((doc, index) =>
      validateDocument(doc, index)
    );

    if (policyForm.policyCreatedBy.value === "admin") {
      if (!selectedRMId) {
        setRMErrorMessage("Select Partner or RM");
      } else if (formValid) {
        // Submit form
        bindValues(policyForm);
      }
    } else if (policyForm.policyCreatedBy.value !== "Direct") {
      setPolicyErrorMessage("");
      if (!selectedRMId) {
        setRMErrorMessage("Select Partner or RM");
      } else if (formValid) {
        // Submit form
        bindValues(policyForm);
      }
    } else {
      if (formValid) {
        // Submit form
        bindValues(policyForm);
      }
    }
  };

  const callAddPolicyAPI = async (policy: IAddEditPolicyForm) => {
    try {
      const newPolicy = await addPolicyService({ header, policy });
      if (newPolicy.status === "success") {
        navigate(motorPolicyPath());
      } else {
        return { [FORM_ERROR]: `${newPolicy.message}` };
      }
      //navigateToPolicies(`${newPolicy.message}`);
    } catch (response) {
      // Handle error
      return { [FORM_ERROR]: `${"message"}` };
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
    if (selectedMake) {
      const MakeId = selectedMake._id;
      setFilteredSubModels(models.filter((sub) => sub.makeId === MakeId));
    } else {
      setFilteredSubModels(models);
    }
  }, [selectedMake, models]);

  useEffect(() => {
    if (selectedProduct) {
      const ProductId = selectedProduct._id;
      if (selectedProduct.productName === "Goods carrying vehicle") {
        setIsVisibile(true);
      } else {
        setIsVisibile(false);
      }
      setFilteredSubcategories(
        productSubTypes.filter((sub) => sub.productId === ProductId)
      );
    } else {
      setFilteredSubcategories(productSubTypes);
    }
  }, [selectedProduct, productSubTypes]);

  // Validationon textbox
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
      }, {}) as any;

      return errors;
    }
  };

  const addValidationSchema = yup.object({
    policyNumber: yup
      .string()
      .trim()
      .nullable()
      .required("Policy Number is required")
      .min(1, "Policy Number must be at least 1 character")
      .max(100, "Policy Number cannot exceed 100 characters"),
    mfgYear: yup.number().required("MFG Year is required").nullable(),
    tenure: yup.number().required("Tenure is required").nullable(),
    cc: yup.string().required("CC is required").nullable(),
    tp: yup.number().required("TP is required").nullable(),
    od: yup.number().required("OD is required").nullable(),
    idv: yup.number().required("IDV is required").nullable(),
    netPremium: yup.number().required("Net Premium is required").nullable(),
    finalPremium: yup.number().required("Final Premium is required").nullable(),
    fullName: yup
      .string()
      .trim()
      .nullable()
      .required("Full Name is required")
      .min(1, "Full Name must be at least 1 character")
      .max(100, "Full Name cannot exceed 100 characters"),
    emailId: yup
      .string()
      .trim()
      .nullable()
      .required("EmailId is required")
      .min(1, "EmailId must be at least 1 character"),
    phoneNumber: yup.number().required("Phone Number is required").nullable(),
    registrationDate: yup
      .string()
      .required("Registration Date is required")
      .nullable(),
    endDate: yup.string().required("End Date is required").nullable(),
    issueDate: yup.string().required("Issue Date is required").nullable(),
    policyType: yup.object().nullable().required("Policy Type is required"),
    caseType: yup.object().nullable().required("Case Type is required"),
    productType: yup.object().nullable().required("Product Type is required"),
    companyName: yup.object().nullable().required("Broker is required"),
    make: yup.object().nullable().required("Make is required"),
    model: yup.object().nullable().required("Model is required"),
    fuelType: yup.object().nullable().required("Fuel Type is required"),
    paymentMode: yup.object().nullable().required("Payment Mode is required"),
    ncb: yup.object().nullable().required("NCB is required"),
    broker: yup.object().nullable().required("Company Name is required"),
    policyCreatedBy: yup
      .object()
      .nullable()
      .required("Policy Created By is required"),
  });

  const addValidate = validateFormValues(addValidationSchema);

  const handleSelectPolicyCreatedBy = (event: any, newValue: any) => {
    setSelectedPolicyCreatedBy(newValue.label);
  };

  const handleSelectPaymentMode = (event: any, newValue: any) => {
    setSelectedPaymentMode(newValue.label);
  };

  const handleSelectPartnerChange = async (e: any) => {
    setSelectedPartnerId(e._id!);
    setSelectedPartnerName(e.fullName!);
    setSelectedRMId(e.headRMId!);
    setSelectedRMName(e.headRM!);
    setRMErrorMessage("");
  };
  const handleSelectRMChange = async (e: any) => {
    setSelectedRMId(e._id!);
    setSelectedRMName(e.fullName!);
  };

  const handleChangePolicyNumber = async (e: any) => {
    const policyNumber = e.target.value;
    try {
      const newPolicy = await getPolicyByNumberService({
        header,
        policyNumber,
      });
      if (newPolicy.exist === true) {
        setPolicyErrorMessage(newPolicy.message);
      } else {
        setPolicyErrorMessage("");
      }
    } catch {
      console.error("eror");
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
              render={({ handleSubmit, submitError }) => (
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="policyNumber">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            size="small"
                            fullWidth
                            label="Enter Policy Number"
                            variant="outlined"
                            onChangeCapture={handleChangePolicyNumber}
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                      {policyErrorMessage && (
                        <div style={{ color: "red" }}>{policyErrorMessage}</div>
                      )}
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="policyType">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                value={input.value || null}
                                options={policyTypes} // Replace with your options array
                                getOptionLabel={(option) => option.policyType}
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
                      <Field name="productType">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                value={input.value || null}
                                options={products} // Replace with your Dynamic API
                                getOptionLabel={(option) => option.productName}
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
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="broker">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                value={input.value || null}
                                options={brokers} // Replace with your options array
                                getOptionLabel={(option) => option.brokerName}
                                onChange={(event, newValue) => {
                                  input.onChange(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label=" Select Broker"
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
                      <Field name="make">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                value={input.value || null}
                                options={makes} // Replace with your options array
                                getOptionLabel={(option) => option.makeName}
                                onChange={(event, newValue) => {
                                  input.onChange(newValue);
                                  setSelectedMake(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label=" Select Make"
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
                    {filteredSubModels && filteredSubModels.length > 0 && (
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Field name="model">
                          {({ input, meta }) => (
                            <div>
                              <FormControl fullWidth size="small">
                                <Autocomplete
                                  {...input}
                                  value={input.value || null}
                                  options={filteredSubModels} // Replace with your options array
                                  getOptionLabel={(option) => option.modelName}
                                  onChange={(event, newValue) => {
                                    input.onChange(newValue);
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label=" Select Model"
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
                      <Field name="fuelType">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                value={input.value || null}
                                options={fuelTypes} // Replace with your options array
                                getOptionLabel={(option) => option.fuelType}
                                onChange={(event, newValue) => {
                                  input.onChange(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label=" Select Fuel Type"
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
                      <Field name="registrationDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disableFuture
                              label="Registration Date"
                              value={input.value || null} // Initialize the value if it's undefined
                              onChange={(date) => input.onChange(date)}
                              renderInput={(params: any) => (
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  {...params}
                                  error={meta.touched && !!meta.error}
                                  helperText={meta.touched && meta.error}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        )}
                      </Field>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="issueDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Issue Date"
                              value={input.value || null} // Initialize the value if it's undefined
                              onChange={(date) => input.onChange(date)}
                              renderInput={(params: any) => (
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  {...params}
                                  error={meta.touched && !!meta.error}
                                  helperText={meta.touched && meta.error}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        )}
                      </Field>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="endDate">
                        {({ input, meta }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disablePast
                              label="End Date"
                              value={input.value || null} // Initialize the value if it's undefined
                              onChange={(date) => input.onChange(date)}
                              renderInput={(params: any) => (
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  {...params}
                                  error={meta.touched && !!meta.error}
                                  helperText={meta.touched && meta.error}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        )}
                      </Field>
                    </Grid>

                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field
                        name="vehicleNumber"
                        validate={validateVehicleNumber}
                      >
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            size="small"
                            label="Enter Vehicle Number"
                            variant="outlined"
                            className="rounded-sm w-full"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>

                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="mfgYear">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            fullWidth
                            size="small"
                            type="number"
                            label="Enter MFG Year"
                            className="rounded-sm w-full"
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                    {/* <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="vehicleAge">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                value={input.value || null}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, newValue) =>
                                  input.onChange(newValue)
                                }
                                options={[
                                  { label: "0 years", value: "0" },
                                  { label: "1-2 years", value: "1-2year" },
                                  { label: "3-5 years", value: "3-5year" },
                                  { label: ">5 years", value: ">5" },
                                ]} // Replace with your options array
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Select Vechile Age"
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
                    </Grid> */}
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="tenure">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            fullWidth
                            size="small"
                            type="number"
                            label="Enter Tenure"
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>

                    {isVisibile ? (
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Field name="weight">
                          {({ input, meta }) => (
                            <TextField
                              {...input}
                              size="small"
                              label="Enter Weight"
                              type="number"
                              fullWidth
                              variant="outlined"
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        </Field>
                      </Grid>
                    ) : (
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Field name="seatingCapacity">
                          {({ input, meta }) => (
                            <TextField
                              {...input}
                              size="small"
                              fullWidth
                              type="number"
                              label="Enter Seating Capacity"
                              variant="outlined"
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        </Field>
                      </Grid>
                    )}
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="cc">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            size="small"
                            label="Enter CC"
                            fullWidth
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>

                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="idv">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            size="small"
                            fullWidth
                            label="Enter IDV"
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="od">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            size="small"
                            fullWidth
                            label="Enter OD"
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="tp">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            size="small"
                            fullWidth
                            label="Enter TP"
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="ncb">
                        {({ input, meta }) => (
                          <div>
                            <FormControl fullWidth size="small">
                              <Autocomplete
                                {...input}
                                value={input.value || null}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, newValue) =>
                                  input.onChange(newValue)
                                }
                                options={[
                                  { label: "Yes", value: "yes" },
                                  { label: "No", value: "no" },
                                ]} // Replace with your options array
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Select NCB"
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
                      <Field name="netPremium">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            size="small"
                            fullWidth
                            type="number"
                            label="Enter Net Premium"
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={12}>
                      <Field name="finalPremium">
                        {({ input, meta }) => (
                          <TextField
                            {...input}
                            size="small"
                            type="number"
                            label="Enter Final Premium"
                            fullWidth
                            variant="outlined"
                            error={meta.touched && Boolean(meta.error)}
                            helperText={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </Grid>

                    <>
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Field name="fullName">
                          {({ input, meta }) => (
                            <TextField
                              {...input}
                              size="small"
                              label="Enter Full Name"
                              className="rounded-sm w-full"
                              variant="outlined"
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Field name="emailId">
                          {({ input, meta }) => (
                            <TextField
                              {...input}
                              size="small"
                              fullWidth
                              label="Enter Email Id"
                              className="rounded-sm w-full"
                              variant="outlined"
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
                              fullWidth
                              size="small"
                              label="Enter Phone Number"
                              className="rounded-sm w-full"
                              variant="outlined"
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item lg={4} md={4} sm={6} xs={12}>
                        <Field name="paymentMode">
                          {({ input, meta }) => (
                            <div>
                              <FormControl fullWidth size="small">
                                <Autocomplete
                                  {...input}
                                  value={input.value || null}
                                  getOptionLabel={(option) => option.label}
                                  onChange={(event, newValue) => {
                                    input.onChange(newValue);
                                    handleSelectPaymentMode(event, newValue);
                                  }}
                                  options={paymentModes} // Replace with your options array
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      className="rounded-sm w-full"
                                      size="small"
                                      label=" Select Payment Mode"
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
                      {selectedPaymentMode &&
                        selectedPaymentMode !== "Cash" && (
                          <Grid item lg={4} md={4} sm={6} xs={12}>
                            <Field name="paymentDetails">
                              {({ input, meta }) => (
                                <TextField
                                  {...input}
                                  size="small"
                                  fullWidth
                                  label="Enter Payment Details"
                                  variant="outlined"
                                  error={meta.touched && Boolean(meta.error)}
                                  helperText={meta.touched && meta.error}
                                />
                              )}
                            </Field>
                          </Grid>
                        )}
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
                        selectedPolicyCreatedBy === "Relationship Manager" && (
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
                      <Grid item md={12} mt={2}>
                        {rmErrorMessage && (
                          <div style={{ color: "red" }}>{rmErrorMessage}</div>
                        )}
                        <Button
                          variant="outlined"
                          onClick={handleClickAddDocument}
                        >
                          Add More Document
                        </Button>
                        <Typography variant="body1" gutterBottom mr={4}>
                          {
                            "Image should be 100x100 pixels and must be <= 256KB."
                          }
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
                    </>
                  </Grid>
                  <Grid container spacing={2} mt={2}>
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
      </React.Fragment>
    </>
  );
};

export default AddPolicyForm;
