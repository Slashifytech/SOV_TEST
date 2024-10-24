import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AgentSidebar from "../components/dashboardComp/AgentSidebar";
import Header from "../components/dashboardComp/Header";
import OffLetterPersonalInfo from "../components/dashboardComp/editfiles/offLetterPersonalInfo";
import { useDispatch, useSelector } from "react-redux";
import { applicationById } from "../features/agentSlice";
import OfferLetterEducationDetails from "../components/dashboardComp/editfiles/OfferLetterEducationDetails";
import IeltsScore from "../components/dashboardComp/editfiles/IeltsScore";
import OfferLetterPreferences from "../components/dashboardComp/editfiles/OfferLetterPreferences";
import TofelScore from "../components/dashboardComp/editfiles/tofelEdit";
import PteScoreEdit from "../components/dashboardComp/editfiles/PteScoreEdit";
import CertificateEdit from "../components/dashboardComp/editfiles/CertificateEdit";
import { toast } from "react-toastify";
import { offerLetterReSubmit } from "../features/generalApi";

const OfferLetterEdit = () => {
  const {applicationDataById}  = useSelector((state)=> state.agent)

  const dispatch = useDispatch();
  const location = useLocation();
  const appId = location.state;
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    dispatch(applicationById(appId));
  }, [dispatch, isUpdated]);
  const handleProfileUpdate = () => {
    setIsUpdated((prev) => !prev);
  };
  const resSubmit = async () => {
    try {
      const section = "offerLetter";
      const res = await offerLetterReSubmit(appId, section);
      dispatch(applicationById(appId));
      toast.success(res.message || "Application Re-Submitted");
    } catch (error) {
      console.log(error);
      toast.error(error.message ||"Something went wrong");
    }
  };

  return (
    <>
      <Header customLink="/agent/shortlist" />
      <div>
        <span className="fixed overflow-y-scroll scrollbar-hide  bg-white">
          <AgentSidebar />
        </span>
      </div>
      <div className="bg-white">
        <span className="flex items-center justify-between pr-7 pt-20 ml-[16.5%] ">
          <span>
            <p className="text-[28px] font-bold text-sidebar mt-6 ml-9">
              Offer Letter Edit
            </p>
            <p className="mt-1 font-light text-body mb-5 ml-9">
              View and Edit your offer Letter
            </p>
          </span>
          {applicationDataById?.status === "rejected" && 
          <span
            onClick={resSubmit}
            className="px-6 py-2 bg-primary rounded-md text-white cursor-pointer"
          >
            Re-Submit
          </span>}
        </span>
      </div>
      <div className="ml-[19.5%] mt-9 mr-6">
        <OffLetterPersonalInfo appId={appId} updatedData={handleProfileUpdate}/>
      </div>
      <div className="ml-[19.5%] mt-9 mr-6">
        <OfferLetterEducationDetails appId={appId} updatedData={handleProfileUpdate}/>
      </div>
      <div className="ml-[19.5%] mt-9 mr-6">
        <OfferLetterPreferences appId={appId} updatedData={handleProfileUpdate}/>
      </div>
      <div className="ml-[19.5%] mt-9 mr-6">
        <IeltsScore appId={appId} updatedData={handleProfileUpdate}/>
      </div>
      <div className="ml-[19.5%] mt-9 mr-6">
        <PteScoreEdit appId={appId} updatedData={handleProfileUpdate}/>
      </div>
      <div className="ml-[19.5%] mt-9 mr-6">
        <TofelScore appId={appId} updatedData={handleProfileUpdate}/>
      </div>
      <div className="ml-[19.5%] mt-9 mr-6">
        <CertificateEdit appId={appId} updatedData={handleProfileUpdate}/>
      </div>
    </>
  );
};

export default OfferLetterEdit;
