import React, { useEffect, useState } from "react";
import AgentSidebar from "../components/dashboardComp/AgentSidebar";
import Header from "../components/dashboardComp/Header";
import { useDispatch, useSelector } from "react-redux";
import { profileSkeleton } from "../assets";
import AgentProfileEdit from "../components/dashboardComp/editfiles/AgentProfileEdit";
import { useLocation } from "react-router-dom";
import { agentInformation } from "../features/agentSlice";

const ProfileEdit = () => {
  const { agentData } = useSelector((state) => state.agent);
  const location = useLocation();
  const id = location?.state?.id
  const profileData = agentData.length <= 0 ? id : agentData 
  const dispatch = useDispatch();
  const profileView = location?.state?.isprofileView;
  const [profileUpdated, setProfileUpdated] = useState(false);
  useEffect(()=>{
   dispatch(agentInformation())
  },[dispatch, profileUpdated])

  const handleProfileUpdate = () => {
    setProfileUpdated((prev) => !prev); 
  };
  return (
    <>
      {profileView === "/admin/approvals" ||
      profileView === "/admin/applications-review" ? (
        ""
      ) : (
        <Header customLink="/agent/shortlist" />
      )}
      <div>
        <span className="fixed overflow-y-scroll scrollbar-hide  bg-white">
          {profileView === "/admin/approvals" ||
          profileView === "/admin/applications-review" ? (
            ""
          ) : (
            <AgentSidebar />
          )}
        </span>
      </div>
      <div>
        <span className={`flex items-center   bg-white ${profileView === "/admin/approvals" ||
          profileView === "/admin/applications-review"
            ? " mx-44 px-6 mt-10 pt-6"
            : " pl-[18.5%] pt-20" }`}>
          <span>
            <div className="flex items-center gap-4 mt-1 mb-6">
              <img
                src={
                  agentData?.primaryContact?.profilePicture || profileSkeleton
                }
                alt="Profile"
                className="rounded-md w-28 h-28"
                onError={profileSkeleton}
                loading="lazy"
              />
              <span className="flex flex-col">
                <span className="text-sidebar text-[18px] font-medium ">
                  {agentData?.primaryContact?.firstName +
                    " " +
                    agentData?.primaryContact?.lastName || "NA"}
                </span>
                <span className="text-[14px] pt-[1px] text-body font-normal">
                  {agentData?.agentEmail || "NA"}
                </span>
                <span className="text-[14px] text-body font-normal">
                  {agentData?.agentPhone || "NA"}
                </span>
                <span className="text-[14px] text-body font-normal">
                  ID: {agentData?.agId || "NA"}
                </span>
              </span>
            </div>
          </span>
        </span>
        <div className={`${profileView === "/admin/approvals" ||
          profileView === "/admin/applications-review"
            ? " mx-44"
            : " mr-6 mt-6 ml-[18.5%]"}  `}>
          <AgentProfileEdit agentData={agentData} locationPath={location} updateData={handleProfileUpdate}/>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
