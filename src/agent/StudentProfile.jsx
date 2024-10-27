import React, { useEffect, useState } from "react";
import AgentSidebar from "../components/dashboardComp/AgentSidebar";
import Header from "../components/dashboardComp/Header";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { studentById } from "../features/generalSlice";
import { profileSkeleton } from "../assets";
import TabBar from "../components/dashboardComp/TabBar";
import studentEdit from "../components/dashboardComp/editfiles/studentEdit";
import { StatusComp } from "../components/dashboardComp/InstituteCard";
import Loader from "../components/Loader";
import { getStudentById } from "../features/adminSlice";

const StudentProfile = () => {
  const role = localStorage.getItem("role");
  const studentData =
    role === "0"
      ? useSelector((state) => state.admin.getStudentDataById)
      : useSelector((state) => state.general.studentData);
  const location = useLocation();
  console.log(location);
  const dispatch = useDispatch();
  const studentId = location?.state?.id;
  const profileView = location.state?.isprofileView;
  const [isLoading, setIsLoading] = useState(true);
  const [profileUpdated, setProfileUpdated] = useState(false);
  useEffect(() => {
    if (role === "0") {
      dispatch(getStudentById(studentId));
    }

    dispatch(studentById(studentId));
  }, [dispatch, profileUpdated]);

  const handleProfileUpdate = () => {
    setProfileUpdated((prev) => !prev);
  };

  const tabs = [
    {
      name: "profile",
      label: "Profile",
      component: studentEdit,
      props: {
        data: studentData?.studentInformation,
        profileView: profileView,
        updateData: handleProfileUpdate,
        studentId: studentId,
      },
    },
  ];
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {profileView === "/admin/approvals" ||
      profileView === "/admin/applications-review" ? (
        ""
      ) : (
        <>
          <Header customLink="/agent/shortlist" />
          <div>
            <span className="fixed overflow-y-scroll scrollbar-hide  bg-white">
              <AgentSidebar />
            </span>
          </div>{" "}
        </>
      )}
      {isLoading ? (
        <div className="w-1 ml-[50%] mt-52">
          <Loader />
        </div>
      ) : (
        <>
          <div>
            {profileView === "/admin/approvals" ||
            profileView === "/admin/applications-review" ? (
              ""
            ) : (
              <div className="pt-20 md:ml-[17.5%] sm:pl-[25%] bg-white">
                <StatusComp
                  statusOne={
                    studentData?.studentInformation?.pageCount === 3
                      ? "done"
                      : "pending"
                  }
                  statusTwo={studentData?.flag ? "done" : "current"}
                />
              </div>
            )}

            <span
              className={`flex items-center   bg-white ${
                profileView === "/admin/approvals" ||
                profileView === "/admin/applications-review"
                  ? " mx-44 px-6 mt-10 pt-6 pb-10"
                  : " pl-[19.5%] pt-10"
              }`}
            >
              <span>
                <div className="flex items-center gap-4 mt-1 md:ml-0 sm:ml-[17%] ">
                  <img
                    src={
                      studentData?.studentInformation?.personalInformation
                        ?.profilePicture || profileSkeleton
                    }
                    alt="Profile"
                    className="rounded-md w-28 h-28"
                    onError={profileSkeleton}
                    loading="lazy"
                  />
                  <span className="flex flex-col">
                    {/* <span className="text-primary font-medium text-[13px]">
                      {studentData?.personalInformation?.applicationCount || 0}{" "}
                      Applications
                    </span> */}
                    <span className="text-sidebar text-[18px] font-medium ">
                      {studentData?.studentInformation?.personalInformation
                        ?.firstName +
                        " " +
                        studentData?.studentInformation?.personalInformation
                          ?.lastName || "NA"}
                    </span>
                    <span className="text-[14px] pt-[1px] text-body font-normal">
                      {studentData?.studentInformation?.personalInformation
                        ?.email || "NA"}
                    </span>
                    <span className="text-[14px] text-body font-normal">
                      {studentData?.studentInformation?.personalInformation
                        ?.phone?.phone || "NA"}
                    </span>
                    <span className="text-[14px] text-body font-normal">
                      ID: {studentData?.studentInformation?.stId || "NA"}
                    </span>
                  </span>
                </div>
              </span>
            </span>
            <div className ="ml-[9%]">
              <TabBar tabs={tabs} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StudentProfile;
