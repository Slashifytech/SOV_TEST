import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import AgentReg from "../pages/AgentReg";
import Login from "../pages/Login";
import NewAccount from "../pages/NewAccount";
import StudentReg from "../pages/StudentReg";
import SignUp from "../student/SignUp";
import AgentSignUp from "./../agent/AgentSignUp";
import Home from "./../pages/Home";
import ProtectedAgent from "./ProtectedAgent";
import ProtectedStudent from "./ProtectedStudent";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ChangePassword from "../pages/ChangePassword";
import SuccessPage from "../pages/SuccessPage";
import Dashboard from "../student/Dashboard";
import Shortlist from "../student/Shortlist";
import ApplyOfferLater from "../student/ApplyOfferLater";
import WaitingPage from "../pages/WaitingPage";
import AgentDashboard from "../agent/AgentDashboard";
import StudentsList from "../agent/StudentsList";
import AgentShortlist from "../agent/AgentShortlist";
import Institution from "../agent/Institution";
import StudentAgentProtected from "./StudentAgentProtected";
import StudentProfile from "../agent/StudentProfile";
import Applications from "../agent/Applications";
import ProfileEdit from "../agent/ProfileEdit";
import ApplicationView from "../agent/ApplicationView";
import OfferLetterEdit from "../agent/OfferLetterEdit";
import Approval from "../admin/Approval";
import ApplicationReview from "../admin/ApplicationReview";
import AdminLogin from "../admin/AdminLogin";
import ProtectedAdmin from "./ProtectedAdmin";
import HelpSupport from "../components/HelpSupport";
import AllApplication from "../student/AllApplication";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/change-Pass",
    element: <ChangePassword></ChangePassword>,
  },
  {
    path: "/change-success",
    element: <SuccessPage></SuccessPage>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword></ForgotPassword>,
  },
  {
    path: "/otp-verify",
    element: <OtpVerification></OtpVerification>,
  },
  {
    path: "/new-account",
    element: <NewAccount></NewAccount>,
  },
  {
    path: "/student-signup",
    element: <SignUp></SignUp>,
  },

  {
    path: "/agent-signup",
    element: <AgentSignUp></AgentSignUp>,
  },
  {
    path: "/student-form/:page",
    element: (
      <StudentAgentProtected>
        <StudentReg></StudentReg>
      </StudentAgentProtected>
    ),
  },
  {
    path: "/agent-form/:page",
    element: (
      <ProtectedAgent>
        <AgentReg></AgentReg>
      </ProtectedAgent>
    ),
  },
  {
    path: "/waiting",
    element: (
      // <ProtectedStudent>
      <WaitingPage></WaitingPage>
      // </ProtectedStudent>
    ),
  },
  {
    path: "/student/dashboard",
    element: (
      <ProtectedStudent>
      <Dashboard></Dashboard>
       </ProtectedStudent>
    ),
  },
  {
    path: "/student/application",
    element: (
      <ProtectedStudent>
      <AllApplication></AllApplication>
       </ProtectedStudent>
    ),
  },
  {
    path: "/account/profile-edit",
    element: (
      // <ProtectedStudent>
      <StudentProfile></StudentProfile>
      // </ProtectedStudent>
    ),
  },
  {
    path: "/student/shortlist",
    element: (
      // <ProtectedStudent>
      <AgentShortlist></AgentShortlist>
      // </ProtectedStudent>
    ),
  },
  {
    path: "/help-support",
    element: (
      // <ProtectedStudent>
      <HelpSupport></HelpSupport>
      // </ProtectedStudent>
    ),
  },
  {
    path: "/offerLetter-apply",
    element: (
      <StudentAgentProtected>
      <ApplyOfferLater></ApplyOfferLater>
      </StudentAgentProtected>
    ),
  },

  {
    path: "/agent/dashboard",
    element: (
      <ProtectedAgent>
        <AgentDashboard></AgentDashboard>
       </ProtectedAgent>
    ),
  },
  {
    path: "/agent/student-lists",
    element: (
      <ProtectedAgent>
        <StudentsList></StudentsList>
       </ProtectedAgent>
    ),
    
  },
  {
    path: "/agent/student-profile",
    element: (
      // <StudentAgentProtected>
        <StudentProfile></StudentProfile>
    //  </StudentAgentProtected>
    ),
    
  },
  {
    path: "/student-profile",
    element: (
      //  <StudentAgentProtected>
        <StudentProfile></StudentProfile>
      // </StudentAgentProtected>
    ),
    
  },
  {
    path: "/agent-profile",
    element: (
      // <ProtectedAgent>
        <ProfileEdit></ProfileEdit>
    //  </ProtectedAgent>
    ),
    
  },
  {
    path: "/application-view",
    element: (
      //  <StudentAgentProtected>
        <OfferLetterEdit></OfferLetterEdit>
      // </StudentAgentProtected>
    ),
    
  },
  {
    path: "/agent/applications",
    element: (
      <ProtectedAgent>
        <Applications></Applications>
      </ProtectedAgent>
    ),
    
  },
  {
    path: "/agent/application/lists",
    element: (
      // <ProtectedAgent>
        <ApplicationView></ApplicationView>
      // </ProtectedAgent>
    ),
    
  },
  {
    path: "/offerLetter/edit",
    element: (
      // <ProtectedAgent>
        <OfferLetterEdit></OfferLetterEdit>
      // </ProtectedAgent>
    ),
    
  },
  {
    path: "/account-settings/profile-edit",
    element: (
      // <ProtectedAgent>
        <ProfileEdit></ProfileEdit>
      // </ProtectedAgent>
    ),
    
  },
  {
    path: "/agent/shortlist",
    element: (
      // <ProtectedAgent>
        <AgentShortlist></AgentShortlist>
      // </ProtectedAgent>
    ),
    
  },
  {
    path: "/agent/institution",
    element: (
      <ProtectedAgent>
        <Institution></Institution>
      </ProtectedAgent>
    ),
    
  },
  {
    path: "/admin/approvals",
    element: (
       <ProtectedAdmin>
        <Approval></Approval>
      </ProtectedAdmin>
    ),
    
  },
  {
    path: "/admin/applications-review",
    element: (
       <ProtectedAdmin>
        <ApplicationReview></ApplicationReview>
       </ProtectedAdmin>
    ),
    
  },

  //admin routes
  {
    path: "/admin/role/auth/login",
    element: (
        <AdminLogin></AdminLogin>
    ),
    
  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);
