/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import addBrokerService from "../../../../api/Broker/AddBroker/addBrokerService";
import editBrokerService from "../../../../api/Broker/EditBroker/editBrokerService";
import { IBrokerForm } from "../IBroker";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { ADD, header } from "../../../../context/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { brokerPath } from "../../../../sitemap";

export interface addPolicyTypeFormProps {
  initialValues: IBrokerForm;
}

const AddPolicyTypeForm = (props: addPolicyTypeFormProps) => {
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
    brokerName: yup
      .string()
      .required("Broker Name is required")
      .min(1, "Broker must be at least 1 character")
      .max(100, "Broker cannot exceed 100 characters"),
  });

  const validate = validateFormValues(validationSchema);

  const onSubmit = async (broker: IBrokerForm) => {
    if (isAdd) {
      callAddBrokerAPI(broker);
    } else {
      callEditBrokerAPI(broker);
    }
  };

  const navigateToBrokers = (message: string) => {
    navigate(brokerPath(), {
      state: message,
    });
  };

  const callAddBrokerAPI = async (broker: IBrokerForm) => {
    try {
      const newBroker = await addBrokerService({ header, broker });
      navigateToBrokers(`${newBroker.message}`);
    } catch (response) {
      // Handle error
    }
  };

  const callEditBrokerAPI = async (broker: IBrokerForm) => {
    try {
      const newBroker = await editBrokerService({ header,broker });
      navigateToBrokers(`${newBroker.message}`);
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
              <Field name="brokerName">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    label="Enter Broker Name"
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
                {isAdd ? "Add Broker" : "Update Broker"}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

export default AddPolicyTypeForm;
