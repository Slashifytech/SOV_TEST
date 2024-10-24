import React from "react";
import Header from "../components/dashboardComp/Header";
import Sidebar from "../components/dashboardComp/Sidebar";
import InstituteCard, {
  StatusComp,
} from "./../components/dashboardComp/InstituteCard";
import { CountrySelect, CustomInput, InstituteComponent, SelectComponent } from "../components/reusable/Input";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { educationLevelOption } from "../constant/data";

const Dashboard = () => {
    const { prefCountryOption } = useSelector((state) => state.general);
  const { instituteOption } = useSelector((state) => state.general);
  return (
    <>
      <Header />
      <div className="">
        <span className="fixed overflow-y-scroll scrollbar-hide pt-6 bg-white ">
          <Sidebar />
        </span>
        <div className="ml-[17%] pt-8 bg-white">
        
          <StatusComp />
          <span className="flex items-center">
            <span>
              <p className="text-[28px] font-bold text-sidebar mt-6 ml-9">
                {" "}
                Explore: Collages & Universities
              </p>
              <p className="mt-1     font-light text-body pr-[20%] ml-9">
                All you need to know about university fees, courses, deadlines,
                scholarships and more.
              </p>
            </span>
            <span>
              <span className="flex flex-row items-center relative ml-9">
                {" "}
                <CustomInput
                  className="h-11 w-80 rounded-md  placeholder:px-3 pl-9 border border-[#E8E8E8] outline-none"
                  type="text"
                  placeHodler="Search by Universities"
                />
                <span className="absolute pl-2 text-[20px] text-body">
                  {" "}
                  <IoSearchOutline />
                </span>
              </span>
            </span>
          </span>
          <span className="grid grid-cols-3 gap-8 pr-80 ml-9 ">
          <CountrySelect
            name="preferredCountry"
            label="Preferred Country"
            options={prefCountryOption}
          />
            <InstituteComponent
            name="preferredInstitution"
            label="Preferred Institution"
            options={instituteOption}
          />
            <SelectComponent
            name="preferredLevelOfEducation"
            label="Preferred Level of Education"
            options={educationLevelOption}
          />

          </span>
      
        </div>
        <div className="ml-[19%] mt-6 grid grid-cols-3 mx-6 gap-6">
        <InstituteCard/>
        <InstituteCard/>

        <InstituteCard/>

    </div>
      </div>
      
    </>
  );
};

export default Dashboard;
