import React, { useState } from "react";
import { profileSkeleton } from "../../assets";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import YesNoPopUp from "../reusable/YesNoPopUp";
import { toast } from "react-toastify";

const StudentCards = ({
  name,
  email,
  mobile,
  id,
  application,
  deleteStudentData,
  profile,
  title,
  link,
  stId,
  defaultId,
  status,
  page,
}) => {
  const [isFuncOpen, setIsFuncOpen] = useState(false);
  const closeFunc = () => {
    setIsFuncOpen(false);
  };
  const openFunc = () => {
    setIsFuncOpen(true);
  };
  const messagefunc = () => toast.info("Please complete the profile first");
  
  return (
    <>
      <div className="bg-white border border-[#E8E8E8] py-4 px-4 rounded-md font-poppins  w-full">
      
        <div className="flex items-center gap-4 mt-1">
          <img
            src={profile || profileSkeleton}
            alt="Profile"
            className="rounded-md w-28 h-28"
            onError={profileSkeleton}
            loading="lazy"
          />
          <span className="flex flex-col">
            <span className="text-primary font-medium text-[13px]">
              {application || 0} Applications
            </span>
            <span className="text-sidebar text-[14px] font-medium ">
              {name?.slice(0, 24) || "NA"}
            </span>
            <span className="text-[13px] pt-[1px] text-body font-normal">
              {email || "NA"}
            </span>
            <span className="flex flex-row justify-between gap-4 items-center w-full">
            <span className="text-[13px] text-body font-normal">
              {mobile || "NA"}
            </span>
            <span>
            {stId ? (
              <span className="text-[13px] underline text-green-500 font-normal  px-1">
                Completed
              </span>
            ) : (
              <Link
                to={`/student-form/${page}`}
                state={{ passPage: "passPage", id:defaultId }}
                className="text-[13px] underline text-yellow-500 font-normal  px-1 cursor-pointer"
              >
                Pending
              </Link>
            )}
            </span>
            </span>
            <span className="text-[13px] text-body font-normal">
              ID: {stId || "NA"}
            </span>
            <span
              onClick={() => openFunc()}
              className=" underline text-red-500 font-normal absolute  top-2 px-1 text-[20px] right-4 cursor-pointer"
            >
              <RiDeleteBin6Line />
            </span>
      
          </span>
        </div>
        {stId ? (
          <span className="flex flex-row items-center mt-4 gap-4 w-full">
            <Link
              to={link}
              state={defaultId}
              className="border w-1/2 border-[#E8E8E8] px-6 py-1 text-[14px] text-center cursor-pointer rounded-sm"
            >
              See Details
            </Link>
            <Link
              to="/offerLetter-apply"
              state={defaultId}
              className="text-primary border w-1/2 border-primary text-center text-[14px] rounded-sm cursor-pointer px-6 py-1"
            >
              Apply Now
            </Link>
          </span>
        ) : (
          <span className="flex flex-row items-center mt-4 gap-4 w-full">
            <Link
              onClick={messagefunc}
              className="border w-1/2 border-[#E8E8E8] px-6 py-1 text-[14px] text-center cursor-pointer rounded-sm"
            >
              See Details
            </Link>
            <Link
              onClick={messagefunc}
              className="text-primary border w-1/2 border-primary text-center text-[14px] rounded-sm cursor-pointer px-6 py-1"
            >
              Apply Now
            </Link>
          </span>
        )}
      </div>
      <YesNoPopUp
        isFuncOpen={isFuncOpen}
        closeFunc={closeFunc}
        handleFunc={() => {
          deleteStudentData(defaultId.id);
        }}
        questionText="Are you sure to delete the student ?"
      />
    </>
  );
};

export default StudentCards;
