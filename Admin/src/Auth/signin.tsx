/* eslint-disable react-hooks/rules-of-hooks */
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { Button, Grid } from "@mui/material";
import { FORM_ERROR } from "final-form";
import { ISignIn } from "./IAuth";
import { SafeKaroUser, header } from "../context/constant";
import getTeamDetailsService from "../api/Team/GetTeamDetails/getTeamDetailsService";

const signin = () => {
  const navigate = useNavigate();
  const validate = (values: ISignIn) => {
    const errors: Partial<ISignIn> = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };
  const onSubmit = async (signInData: ISignIn) => {
    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        headers: header,
        method: "POST",
        body: JSON.stringify({
          ...signInData,
        }),
      });

      const responseData = await response.json();
      let loginData: SafeKaroUser | null = null;
      if (responseData.status === "success") {
        if (responseData.role !== "admin") {
          getTeamDetailsService({
            header,
            teamId: responseData.partnerId,
          }).then((bookingRequestDetails) => {
            responseData.headRMId = bookingRequestDetails.headRMId;
            responseData.headRM = bookingRequestDetails.headRM;

            loginData = {
              ...responseData,
              headRMId: bookingRequestDetails.headRMId,
              headRM: bookingRequestDetails.headRM,
            };

            console.log("not admin", loginData);
            localStorage.setItem("user", JSON.stringify(loginData));
          });

          if (responseData.role.toLowerCase() === "agent") {
            navigate("/agentdashboard");
          } else {
            navigate("/dashboard");
          }
        } else {
          loginData = {
            ...responseData,
            headRMId: "",
            headRM: "",
          };
          console.log("admin", loginData);
          localStorage.setItem("user", JSON.stringify(loginData));

          navigate("/dashboard");
        }
        console.log();
      } else {
        return { [FORM_ERROR]: `${responseData.message}` };
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error, e.g., show an error message to the user
    }
    // Simulate a server error for demonstration
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/4 xl:w-6/12 p-3 sm:p-6">
          <div>
            <img src={logo} className="w-32 mx-auto" alt="" />
          </div>
          <div className="mt-4 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>
            <div className="w-full flex-1">
              <div className="my-4 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"></div>
              </div>

              <div className="mx-auto max-w-xs">
                <Form
                  onSubmit={onSubmit}
                  validate={validate}
                  render={({ handleSubmit, submitError }) => (
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                          <div className="mb-2">
                            <label
                              htmlFor="email"
                              className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                              Email
                            </label>
                            <Field name="email">
                              {({ input, meta }) => (
                                <div>
                                  <input
                                    {...input}
                                    type="email"
                                    placeholder="Email"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                  />
                                  {meta.error && meta.touched && (
                                    <span className="text-safekaroDarkOrange">
                                      {meta.error}
                                    </span>
                                  )}
                                </div>
                              )}
                            </Field>
                          </div>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                          <div className="mb-2">
                            <label
                              htmlFor="password"
                              className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                              Password
                            </label>
                            <Field name="password">
                              {({ input, meta }) => (
                                <div>
                                  <input
                                    {...input}
                                    type="password"
                                    placeholder="Password"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                  />
                                  {meta.error && meta.touched && (
                                    <span className="text-safekaroDarkOrange">
                                      {meta.error}
                                    </span>
                                  )}
                                </div>
                              )}
                            </Field>
                          </div>
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12}>
                          {submitError && (
                            <div className="error text-safekaroDarkOrange">
                              {submitError}
                            </div>
                          )}
                        </Grid>
                        <Button
                          type="submit"
                          className="mt-5 ml-4 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        >
                          <svg
                            className="w-6 h-6 -ml-2"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                            <path d="M20 8v6M23 11h-6" />
                          </svg>
                          <span className="ml-3">Sign In</span>
                        </Button>
                      </Grid>
                    </form>
                  )}
                />
              </div>

              <div className="my-4 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  If you don't have account{" "}
                  <a href="/#/signup" className="text-safekaroDarkOrange">
                    Sign Up
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center mt-8">
                <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="/4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="/34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="/fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="/ea4335"
                      />
                    </svg>
                  </div>
                  <span className="ml-4">Sign In with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default signin;
