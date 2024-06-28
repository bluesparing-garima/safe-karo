/* eslint-disable react-hooks/rules-of-hooks */
import {
  TextField,
  Button,
  Grid,
  FormControl,
  Autocomplete,
} from "@mui/material";
import editRoleService from "../../../../api/Role/EditRole/editRoleService";
import { IRoleForm } from "../../Role/IRole";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { header } from "../../../../context/constant";
import { useNavigate } from "react-router-dom";
import { rolesPath } from "../../../../sitemap";
import CustomAutocomplete from "../../../../utils/CustomAutocomplete";
import {
  caseTypes,
  categoryTypes,
  companiesName,
  fuelTypes,
  makes,
  models,
  policyTypes,
  subCategoryTypes,
} from "../../../Policy/IPolicyData";
import { useEffect, useState } from "react";
import { IPolicyVM } from "../../../Policy/IPolicy";

export interface viewPolicyFormProps {
  initialValues: IPolicyVM;
}

const CalculatePayInForm = (props: viewPolicyFormProps) => {
  const { initialValues } = props;
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [filteredSubcategories, setFilteredSubcategories] =
    useState(subCategoryTypes);

  useEffect(() => {
    if (initialValues.category) {
      setSelectedCategory(initialValues.category);
    }
  }, [initialValues]);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredSubcategories(
        subCategoryTypes.filter((sub) => sub.id === selectedCategory)
      );
    } else {
      setFilteredSubcategories(subCategoryTypes);
    }
  }, [selectedCategory]);

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
    roleName: yup
      .string()
      .required("Role Name is required")
      .min(1, "Role must be at least 1 character")
      .max(100, "Role cannot exceed 100 characters"),
  });

  const validate = validateFormValues(validationSchema);

  const onSubmit = async (role: IRoleForm) => {
    callEditRoleAPI(role);
  };

  const navigateToRoles = (message: string) => {
    navigate(rolesPath(), {
      state: message,
    });
  };

  const callEditRoleAPI = async (role: IRoleForm) => {
    try {
      const newRole = await editRoleService({ header, role });
      navigateToRoles(`${newRole.message}`);
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
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Field
                name="policyType"
                component={CustomAutocomplete}
                options={policyTypes}
                label="Select Policy Type"
              />
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Field
                name="caseType"
                component={CustomAutocomplete}
                options={caseTypes}
                label="Select Case Type"
              />
            </Grid>
            <Grid item xs={4}>
              <Field name="category">
                {({ input, meta }) => (
                  <div>
                    <FormControl fullWidth size="small">
                      <Autocomplete
                        {...input}
                        value={input.value || null}
                        options={categoryTypes} // Replace with your options array
                        getOptionLabel={(option) => option.label}
                        onChange={(event, newValue) => {
                          input.onChange(newValue);
                          setSelectedCategory(newValue.id);
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
            {filteredSubcategories.length > 0 && (
              <Grid item xs={4}>
                <Field name="subCategory">
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
                          options={filteredSubcategories}
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
            )}
            <Grid item xs={4}>
              <Field
                name="companyName"
                component={CustomAutocomplete}
                options={companiesName}
                label="Select Company Name"
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="make"
                component={CustomAutocomplete}
                options={makes}
                label="Select Make"
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="model"
                component={CustomAutocomplete}
                options={models}
                label="Select Model"
              />
            </Grid>
            <Grid item xs={4}>
              <Field
                name="fuelType"
                component={CustomAutocomplete}
                options={fuelTypes}
                label="Select Fuel Type"
              />
            </Grid>
            <Grid item xs={4}>
              <Field name="ncb">
                {({ input, meta }) => (
                  <div>
                    <FormControl fullWidth size="small">
                      <Autocomplete
                        {...input}
                        value={input.value || null}
                        getOptionLabel={(option) => option.label}
                        onChange={(event, newValue) => input.onChange(newValue)}
                        options={[
                          { label: "Yes", value: "Yes" },
                          { label: "No", value: "No" },
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
            <Grid item xs={4}>
              <Field
                name="fuelType"
                component={CustomAutocomplete}
                options={fuelTypes}
                label="Select RTO"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                disabled={submitting}
                variant="contained"
                color="primary"
                className=" w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
              >
                {"Calculate PayIn"}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

export default CalculatePayInForm;
