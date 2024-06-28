/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import addCompanyService from "../../../../api/Company/AddCompany/addCompanyServices";
import editCompanyService from "../../../../api/Company/EditCompany/editCompanyService";
import { ICompanyForm } from "../ICompany";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { ADD, header } from "../../../../context/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { companyPath } from "../../../../sitemap";

export interface addCompanyFormProps {
  initialValues: ICompanyForm;
}

const AddCompanyForm = (props: addCompanyFormProps) => {
  const { initialValues } = props;
  const navigate = useNavigate();
  const location = useLocation() as any;
  const pathName = location.pathname.split("/");
  const isAddEdit = pathName[pathName.length - 1] as string;
  const isAdd = isAddEdit === ADD;

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
    companyName: yup
      .string()
      .required("Company Name is required")
      .min(1, "Company must be at least 1 character")
      .max(100, "Company cannot exceed 100 characters"),
  });

  const validate = validateFormValues(validationSchema);

  const onSubmit = async (company: ICompanyForm) => {
    if (isAdd) {
      callAddCompanyAPI(company);
    } else {
      callEditCompanyAPI(company);
    }
  };

  const navigateToCompanys = (message: string) => {
    navigate(companyPath(), {
      state: message,
    });
  };

  const callAddCompanyAPI = async (company: ICompanyForm) => {
    try {
      const newCompany = await addCompanyService({ header, company });
      navigateToCompanys(`${newCompany.message}`);
    } catch (response) {
      // Handle error
    }
  };

  const callEditCompanyAPI = async (company: ICompanyForm) => {
    try {
      const newCompany = await editCompanyService({ header, company });
      navigateToCompanys(`${newCompany.message}`);
    } catch (response) {
      // Handle error
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({ handleSubmit, submitting, errors }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Field name="companyName">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Enter Company Name"
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
                {isAdd ? "Add Company" : "Update Company"}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

export default AddCompanyForm;
