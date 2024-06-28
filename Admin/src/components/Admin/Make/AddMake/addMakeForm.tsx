/* eslint-disable react-hooks/rules-of-hooks */
import {
  TextField,
  Button,
  Grid,
} from "@mui/material";
import addMakeService from "../../../../api/Make/AddMake/addMakeService";
import editMakeService from "../../../../api/Make/EditMake/editMakeService";
import { IMakeForm } from "../IMake";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";
import * as yup from "yup";
import { ADD, header } from "../../../../context/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { makePath } from "../../../../sitemap";

export interface addMakeFormProps {
  initialValues: IMakeForm;
}

const AddMakeForm = (props: addMakeFormProps) => {
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
    makeName: yup
      .string()
      .required("Make Name is required")
      .min(1, "Make must be at least 1 character")
      .max(100, "Make cannot exceed 100 characters"),
  });

  const validate = validateFormValues(validationSchema);

  const onSubmit = async (make: IMakeForm) => {
    if (isAdd) {
      callAddMakeAPI(make);
    } else {
      callEditMakeAPI(make);
    }
  };

  const navigateToMakes = (message: string) => {
    navigate(makePath(), {
      state: message,
    });
  };

  const callAddMakeAPI = async (make: IMakeForm) => {
    try {
      const newMake = await addMakeService({ header, make });
      navigateToMakes(`${newMake.message}`);
    } catch (response) {
      // Handle error
    }
  };

  const callEditMakeAPI = async (make: IMakeForm) => {
    try {
      const newMake = await editMakeService({ header, make });
      navigateToMakes(`${newMake.message}`);
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
              <Field name="makeName">
                {({ input, meta }) => (
                  <TextField
                    {...input}
                    size="small"
                    label="Enter Make Name"
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
                {isAdd ? "Add Make" : "Update Make"}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

export default AddMakeForm;
