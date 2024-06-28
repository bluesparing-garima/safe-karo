import React, { useState } from "react";
import {
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import * as yup from "yup";
import PayOutUploadByExcelData from "./payOutUploadByExcelData";

const PayOutUploadByExcel = () => {
  const title = "Upload PayOut Excel";
  const [excelUploaded, setExcelUploaded] = useState(false);

  const onSubmit = (values: FormValues) => {
    uploadFile(values.file);
  };

  const handleChangeUploadExcel = () => {
    setExcelUploaded(true);
  };

  // // Reset pointsUpdated after fetching updated data
  // useEffect(() => {
  //   if (excelUploaded) {
  //     setExcelUploaded(false);
  //   }
  // }, [excelUploaded]);

  const uploadFile = async (file: File | null) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("excel", file); // Ensure the key 'excel' matches the backend expectation

        const response = await fetch(
          "http://localhost:8000/api/pay-out/excel",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setExcelUploaded(true);
          // You can handle the responseData as needed, e.g., show a success message or update state
        } else {
          throw new Error("Failed to upload file");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle error, e.g., show an error message to the user
      }
    } else {
    }
  };

  interface FormValues {
    file: File | null;
  }

  const schema = yup.object().shape({
    file: yup
      .mixed()
      .required("File is required")
      .test(
        "fileType",
        "Only .xls or .xlsx files are allowed",
        (value) =>
          value &&
          (value.type === "application/vnd.ms-excel" ||
            value.type ===
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
      ),
  });

  const validate = (values: FormValues) => {
    try {
      schema.validateSync(values, { abortEarly: false });
      return {};
    } catch (err) {
      const validationErrors: { [key: string]: string } = {};
      if (err instanceof yup.ValidationError && err.inner) {
        err.inner.forEach((error) => {
          if (error.path) validationErrors[error.path] = error.message;
        });
      }
      return validationErrors;
    }
  };

  return (
    <div className="bg-blue-200 p-2">
      <Paper
        elevation={3}
        style={{ padding: 20, margin: 30, borderRadius: 10 }}
      >
        <Typography className="text-safekaroDarkOrange" variant="h5">
          {title}
        </Typography>
        <Typography variant="h5" mb={2}>
          <Link to="/dashboard" className="text-addButton font-bold text-sm">
            Dashboard {" / "}
          </Link>
          <span className="text-grey-600 text-sm"> {title}</span>
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>
        <Card>
          <CardContent>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              render={({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item lg={8} xs={12}>
                      <Field name="file">
                        {({ input, meta }) => (
                          <div>
                            <Grid item lg={12} xs={12}>
                              <input
                                type="file"
                                style={{
                                  border: "1px solid #c4c4c4",
                                  padding: "5px",
                                  width: "100%",
                                  borderRadius: "5px",
                                }}
                                onChange={(
                                  event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const file = event.target.files
                                    ? event.target.files[0]
                                    : null;
                                  input.onChange(file);
                                }}
                                accept=".xls,.xlsx"
                              />
                              {meta.touched && meta.error && (
                                <span style={{ color: "red" }}>
                                  {meta.error}
                                </span>
                              )}
                            </Grid>
                          </div>
                        )}
                      </Field>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                      <Button
                        type="submit"
                        disabled={submitting}
                        variant="contained"
                        color="primary"
                        className=" w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                      >
                        Upload Excel
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </CardContent>
        </Card>

        <PayOutUploadByExcelData onExcelUploaded={handleChangeUploadExcel} />
      </Paper>
    </div>
  );
};

export default PayOutUploadByExcel;
