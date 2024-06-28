/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import addRoleService from "../../../../api/Role/AddRole/addRoleService";
import editRoleService from "../../../../api/Role/EditRole/editRoleService";
import { IRoleForm } from "../IRole";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { ADD, header } from "../../../../context/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { rolesPath } from "../../../../sitemap";

export interface addPolicyTypeFormProps {
  initialValues: IRoleForm;
}

const AddRoleForm = (props: addPolicyTypeFormProps) => {
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
    roleName: yup
      .string()
      .required("Role Name is required")
      .min(1, "Role must be at least 1 character")
      .max(100, "Role cannot exceed 100 characters"),
  });

  const validate = validateFormValues(validationSchema);

  const onSubmit = async (role: IRoleForm) => {
    if (isAdd) {
      callAddRoleAPI(role);
    } else {
      callEditRoleAPI(role);
    }
  };

  const navigateToRoles = (message: string) => {
    navigate(rolesPath(), {
      state: message,
    });
  };

  const callAddRoleAPI = async (role: IRoleForm) => {
    try {
      const newRole = await addRoleService({ header, role });
      navigateToRoles(`${newRole.message}`);
    } catch (response) {
      // Handle error
    }
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
            <Grid item sm={12}>
              <Field name="roleName">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Enter Role Name"
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
                {isAdd ? "Add Role" : "Update Role"}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

export default AddRoleForm;
