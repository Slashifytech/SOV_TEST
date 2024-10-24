import React from "react";
import InstituteCard from "./InstituteCard";
import Dnf from "../Dnf";
import { noInstitute } from "../../assets";

const ShortlistComponent = ({ bodyText, headingText, cardData, shortlistInstitute, isLoading }) => {
  const data = cardData?.institutes;

  return (
    <>
      <div className="ml-[17%] pt-16 bg-white border-b-2 border-[#E8E8E8]">
        <span className="flex items-center">
          <span>
            <p className="text-[28px] font-bold text-sidebar mt-6 ml-9">
              {headingText}
            </p>
            <p className="mt-1 mb-6 font-light text-body pr-[20%] ml-9">
              {bodyText}
            </p>
          </span>
        </span>
      </div>

      {isLoading ? (
        <p className="mt-1 font-medium text-body pr-[20%] ml-[19%]">
          Loading...
        </p>
      ) : data && data.length > 0 ? (
        <div className="ml-[19%] mt-6 grid grid-cols-3 mx-6 gap-6">
          {data.map((institute) => (
            <InstituteCard
              key={institute.instituteId._id}
              instituteId={institute.instituteId._id}
              institutename={institute.instituteId.instituteName}
              country={institute.instituteId.country}
              shortlistInstitute={shortlistInstitute}
              status={institute.status}
            />
          ))}
        </div>
      ) : (
        <div className="mt-8 font-medium text-body ml-[25%] mr-[15%]">
          <Dnf
            dnfImg={noInstitute}
            headingText="Start Your Journey!"
            bodyText="Start by searching for colleges and courses, then use filters to refine by country, course, and more for tailored results."
          />
        </div>
      )}
    </>
  );
};

export default ShortlistComponent;
