//import async from "./components/Async";
import SignUp from "./Auth/signup";
import Dashboard from "./components/Dashboard/dashboard";
import AgentDashboard from "./components/Dashboard/agentDashboard";
import Roles from "./components/Admin/Role/Roles/Roles";
import AddRole from "./components/Admin/Role/AddRole/addRole";
import Products from "./components/Admin/Product/Products/Products";
import AddProduct from "./components/Admin/Product/AddProduct/addProduct";
import AddPolicyType from "./components/Admin/PolicyType/AddPolicyType/AddPolicyType";
import PolicyTypes from "./components/Admin/PolicyType/PolicyTypes/PolicyTypes";
import CaseTypes from "./components/Admin/CaseType/CaseTypes/CaseTypes";
import AddCaseType from "./components/Admin/CaseType/AddCaseType/addCaseType";
import AddMotorPolicy from "./components/Policy/AddPolicy/AddPolicy";
import Signin from "./Auth/signin";
import GetMotorPolicies from "./components/Policy/GetMotorPolicies/GetMotorPolicies";
import PayInUploadByExcel from "./components/Admin/Commision/PayInUploadByExcel/PayInUploadByExcel";
import PayOutUploadByExcel from "./components/Admin/Commision/PayOutUploadByExcel/payOutUploadByExcel";
import CalculatePayIn from "./components/Admin/Commision/CalculatePayIn/CalculatePayIn";
import AddProductSubType from "./components/Admin/ProductSubType/AddProductSubType/AddProductSubType";
import ProductSubTypes from "./components/Admin/ProductSubType/ProductSubTypes/ProductSubTypes";
import AddCompany from "./components/Admin/Company/AddCompany/addCompany";
import Companies from "./components/Admin/Company/Companies/Companies";
import Brokers from "./components/Admin/Broker/Brokers/Brokers";
import AddBroker from "./components/Admin/Broker/AddBroker/addBroker";
import AddBranch from "./components/Admin/Branch/AddBranch/addBranch";
import Branches from "./components/Admin/Branch/Branches/Branches";
import Categories from "./components/Admin/Category/Categories/Categories";
import AddCategory from "./components/Admin/Category/AddCategory/AddCategory";
import AddFuelType from "./components/Admin/FuelType/AddFuelType/addFuelType";
import FuelTypes from "./components/Admin/FuelType/FuelTypes/FuelTypes";
import AddMake from "./components/Admin/Make/AddMake/addMake";
import Makes from "./components/Admin/Make/Makes/Makes";
import Models from "./components/Admin/Model/Models/Models";
import AddModel from "./components/Admin/Model/AddModel/addModel";
import ViewPolicy from "./components/Policy/ViewPolicy/ViewPolicy";
import Teams from "./components/Admin/Team/Teams/Teams";
import AddTeam from "./components/Admin/Team/AddTeam/AddTeam";
import Page403 from "./Auth/Page403";
//import AuthGuards from "./guards/AuthGuards";
import AddBookingRequest from "./components/Booking/AddBookingRequest/AddBookingRequest";
import BookingRequests from "./components/Booking/BookingRequests/BookingRequests";
import AddLead from "./components/Agent/AddLead/AddLead";
import Leads from "./components/Agent/Leads/leads";
import NewLeads from "./components/Agent/Leads/Newleads";
import EditLead from "./components/Agent/EditLead/editLead";
import AddQuotation from "./components/Agent/Quotation/AddQuotation/AddQuotation";
import ViewQuotation from "./components/Agent/Quotation/ViewQuotation/ViewQuotation";
//import Roles from "./components/Role/Roles/Roles";
//import AdminLayout from "./layouts/admin";
// ----------------Dashboard components-----------
// const Roles = async(() => import("./components/Role/Roles/Roles"));
// const Dashboard = async(() => import("./components/Dashboard/dashboard"));

const routes = [
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Signin />,
      },
    ],
  },
  {
    path: "/signup",
    children: [
      {
        path: "",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "dashboard",
    // element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "lead",
    //element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Leads />,
      },
      {
        path: "new",
        element: <NewLeads />,
      },
      {
        path: "add",
        element: <AddLead />,
      },
      {
        path: "/lead/:leadId/edit",
        element: <EditLead />,
      },
      {
        path: "/lead/:leadId/quotation",
        element: <AddQuotation />,
      },
      {
        path: "/lead/:leadId/quotation/view",
        element: <ViewQuotation />,
      },
    ],
  },
  {
    path: "role",
    // element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Roles />,
      },
      {
        path: "add",
        element: <AddRole />,
      },
      {
        path: "/role/:roleId/edit",
        element: <AddRole />,
      },
    ],
  },
  {
    path: "booking",
    // element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <BookingRequests />,
      },
      {
        path: "add",
        element: <AddBookingRequest />,
      },
      {
        path: "/booking/:leadId/new",
        element: <AddBookingRequest />,
      },
    ],
  },
  {
    path: "policytype",
    // element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <PolicyTypes />,
      },
      {
        path: "add",
        element: <AddPolicyType />,
      },
      {
        path: "/policytype/:policyTypeId/edit",
        element: <AddPolicyType />,
      },
    ],
  },
  {
    path: "policy",
    //element: <AdminLayout />,
    children: [
      {
        path: "motor",
        element: <AddMotorPolicy />,
      },
      {
        path: "view",
        element: <ViewPolicy />,
      },
      {
        path: "motorpolicies",
        element: <GetMotorPolicies />,
      },
    ],
  },
  {
    path: "team",
    //element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Teams />,
      },
      {
        path: "add",
        element: <AddTeam />,
      },
      {
        path: "/team/:teamId/edit",
        element: <AddTeam />,
      },
    ],
  },
  {
    path: "productsubtype",
    // element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <ProductSubTypes />,
      },
      {
        path: "add",
        element: <AddProductSubType />,
      },
      {
        path: "/productsubtype/:productSubTypeId/edit",
        element: <AddProductSubType />,
      },
      {
        path: "/productsubtype/add/:productId",
        element: <AddProductSubType />,
      },
    ],
  },
  {
    path: "casetype",
    //element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <CaseTypes />,
      },
      {
        path: "add",
        element: <AddCaseType />,
      },
      {
        path: "/casetype/:caseTypeId/edit",
        element: <AddCaseType />,
      },
    ],
  },
  {
    path: "fueltype",
    //element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <FuelTypes />,
      },
      {
        path: "add",
        element: <AddFuelType />,
      },
      {
        path: "/fueltype/:fuelTypeId/edit",
        element: <AddFuelType />,
      },
    ],
  },
  {
    path: "payin",
    // element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <PayInUploadByExcel />,
      },
    ],
  },
  {
    path: "payout",
    // element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <PayOutUploadByExcel />,
      },
    ],
  },
  {
    path: "calculate",
    // element: <AdminLayout />,
    children: [
      {
        path: "payin",
        element: <CalculatePayIn />,
      },
    ],
  },
  {
    path: "product",
    //element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Products />,
      },
      {
        path: "add",
        element: <AddProduct />,
      },
      {
        path: "/product/:productId/edit",
        element: <AddProduct />,
      },
    ],
  },
  {
    path: "company",
    //element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Companies />,
      },
      {
        path: "add",
        element: <AddCompany />,
      },
      {
        path: "/company/:companyId/edit",
        element: <AddCompany />,
      },
    ],
  },
  {
    path: "broker",
    //element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Brokers />,
      },
      {
        path: "add",
        element: <AddBroker />,
      },
      {
        path: "/broker/:brokerId/edit",
        element: <AddBroker />,
      },
    ],
  },
  {
    path: "branch",
    //element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Branches />,
      },
      {
        path: "add",
        element: <AddBranch />,
      },
      {
        path: "/branch/:branchId/edit",
        element: <AddBranch />,
      },
    ],
  },
  {
    path: "category",
    //element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Categories />,
      },
      {
        path: "add",
        element: <AddCategory />,
      },
      {
        path: "/category/:categoryId/edit",
        element: <AddCategory />,
      },
    ],
  },
  {
    path: "model",
    //element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Models />,
      },
      {
        path: "add",
        element: <AddModel />,
      },
      {
        path: "/model/:modelId/edit",
        element: <AddModel />,
      },
    ],
  },
  {
    path: "make",
    //element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Makes />,
      },
      {
        path: "add",
        element: <AddMake />,
      },
      {
        path: "/make/:makeId/edit",
        element: <AddMake />,
      },
    ],
  },
  {
    path: "agentdashboard",
    //element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <AgentDashboard />,
      },
    ],
  },
  {
    path: "403",
    //element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Page403 />,
      },
    ],
  },
];

export default routes;
