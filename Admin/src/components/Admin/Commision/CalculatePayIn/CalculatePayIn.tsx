import { Typography, Paper } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import CalculatePayInForm from "./CalculatePayInForm";

const CalculatePayIn = () => {
  const title = "Calculate Pay In";
  const location = useLocation() as any;
  const SelectedPolicyDetails = location.state;
  return (
    <>
      <div className="bg-blue-200 p-7">
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography
            variant="h5"
            className="text-safekaroDarkOrange"
            gutterBottom
            display="inline"
          >
            {title}
          </Typography>
          <Typography variant="h5" mb={2}>
            <Link to="/dashboard" className="text-addButton font-bold text-sm">
              Dashboard {" / "}
            </Link>
            <Link
              to="/policy/motorpolicies"
              className="text-addButton font-bold text-sm"
            >
              Policies /
            </Link>
            <span className="text-grey-600 text-sm">{title}</span>
            {/* Add a full-width grey line here */}
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>

          <CalculatePayInForm
            initialValues={{
              id: SelectedPolicyDetails._id,
              policyType: SelectedPolicyDetails.policyType,
              productType: SelectedPolicyDetails.productType,
              caseType: SelectedPolicyDetails.caseType,
              category: SelectedPolicyDetails.category,
              subCategory: SelectedPolicyDetails.subCategory,
              companyName: SelectedPolicyDetails.companyName,
              broker: SelectedPolicyDetails.broker,
              make: SelectedPolicyDetails.make,
              model: SelectedPolicyDetails.model,
              fuelType: SelectedPolicyDetails.fuelType,
              rto: SelectedPolicyDetails.rto,
              seatingCapacity: SelectedPolicyDetails.seatingCapacity,
              cc: SelectedPolicyDetails.cc,
              ncb: SelectedPolicyDetails.ncb,
              vehicleNumber: SelectedPolicyDetails.vehicleNumber,
              policyNumber: SelectedPolicyDetails.policyNumber,
              fullName: SelectedPolicyDetails.fullName,
              emailId: SelectedPolicyDetails.emailId,
              phoneNumber: SelectedPolicyDetails.phoneNumber,
              mfgYear: SelectedPolicyDetails.mfgYear,
              tenure: SelectedPolicyDetails.tenure,
              issueDate: SelectedPolicyDetails.issueDate,
              endDate: SelectedPolicyDetails.endDate,
              registrationDate: SelectedPolicyDetails.registrationDate,
              idv: SelectedPolicyDetails.idv,
              od: SelectedPolicyDetails.od,
              tp: SelectedPolicyDetails.tp,
              netPremium: SelectedPolicyDetails.netPremium,
              finalPremium: SelectedPolicyDetails.finalPremium,
              paymentMode: SelectedPolicyDetails.paymentMode,
              policyCreatedBy: SelectedPolicyDetails.policyCreatedBy,
              documents: SelectedPolicyDetails.documents,
              weight: SelectedPolicyDetails.weight,
              policyStatus: SelectedPolicyDetails.policyStatus,
            }}
          />
        </Paper>
      </div>
    </>
  );
};

export default CalculatePayIn;
