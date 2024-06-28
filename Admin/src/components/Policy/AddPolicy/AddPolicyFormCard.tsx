import AddPolicyForm from "./AddPolicyForm";

const AddPolicyFormCard = () => {
 
  return (
    <>
      <AddPolicyForm
        initialValues={{
          policyType: "",
          caseType: "",
          category: "motor",
          subCategory: "",
          companyName: "",
          productType: "",
          broker: "",
          make: "",
          model: "",
          fuelType: "",
          rto: "",
          seatingCapacity: 0,
          cc: 0,
          weight: 0,
          ncb: "",
          vehicleNumber: "",
          policyNumber: "",
          fullName: "",
          emailId: "",
          phoneNumber: 0,
          mfgYear: 2020,
          tenure: 1,
          issueDate: "",
          endDate: "",
          registrationDate: "",
          idv: 0,
          od: 0,
          tp: 0,
          netPremium: 0,
          finalPremium: 0,
          paymentMode: "",
          policyCreatedBy: "",
          documents: [],
          paymentDetails: "",
          partnerId: "",
          partnerName: "",
          relationshipManagerId: "",
          policyStatus: "booked",
          relationshipManagerName: "",
          createdBy: "",
          //   rcFront: "",
          //   rcBack: "",
          //   previousPolicy: "",
          //   survey: "",
          //   puc: "",
          //   fitness: "",
          //   propsal: "",
          //   currentPolicy: "",
          //   other: "",
        }}
      />
    </>
  );
};

export default AddPolicyFormCard;
