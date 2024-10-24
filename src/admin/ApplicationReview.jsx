import React, { useEffect } from "react";
import Header from "../components/dashboardComp/Header";
import AdminSidebar from "../components/dashboardComp/AdminSidebar";
import TabBar from "../components/dashboardComp/TabBar";
import Pending from "../components/adminComps/Pending";
import { useDispatch, useSelector } from "react-redux";
import { applicationForApproval } from "../features/adminSlice";
import { CustomInput } from "../components/reusable/Input";
import { IoSearchOutline } from "react-icons/io5";
import Approved from "../components/adminComps/Approved";
import Rejected from "../components/adminComps/Rejected";

const ApplicationReview = () => {
    const {applications} = useSelector((state)=>state.admin);
    const typeData = useSelector((state)=>state.admin.tabType)
      const dispatch = useDispatch();


    useEffect(()=>{
       dispatch(applicationForApproval(typeData));
    },[dispatch, typeData])
  const tabs = [
    {
      name: "pending",
      label: "Pending",
      component: Pending,
      props: { data: applications },
    },
    {
      name: "approved",
      label: "Approved",
      component: Approved,
      props: { data: applications },
    },
    {
      name: "rejected",
      label: "Rejected",
      component: Rejected,
      props: { data: applications },
    },
  ];
  return (
    <>
      <Header customLink="/agent/shortlist" />
      <div>
        <span className="fixed overflow-y-scroll scrollbar-hide pt-6 bg-white">
          <AdminSidebar />
        </span>
      </div>
      <div className=" bg-white">
        <span className="flex items-center pt-16 ml-[16.5%]  ">
          <span>
            <p className="text-[28px] font-bold text-sidebar mt-6 ml-9">
              Application Review
            </p>
            <p className="mt-1 font-light text-body ml-9 pr-[30%]">
              Review your agents and students applications here. Stay updated on
              their status and view detailed forms for each submission.
            </p>
          </span>
        </span>
      </div>
      <span className="flex flex-row items-center mb-3 ml-[19.5%] mt-6">
        {" "}
        <span className="text-body">Show</span>
        <select
          className="ml-3 border px-2 py-1 w-10 h-11 rounded outline-none"></select>
        {/* //   value={perPage}
        //   onChange={handlePerPageChange}
        // >
        //   {perPageOptions.map((option) => (
        //     <option key={option} value={option}>
        //       {option}
        //     </option>
        //   ))}
        </select> */}
        <span className="px-3 text-body">entries</span>
        <select
          className="ml-3 border px-2 py-1 w-40 h-11 rounded outline-none"
        //   value={perPage}
        //   onChange={handlePerPageChange}
        >
          <option value="">Application Type</option>
          <option value="">Student</option>
          <option>Agent</option>
        </select>
        <span className="flex flex-row items-center relative ml-9">
          <CustomInput
            className="h-11 w-80 rounded-md text-body placeholder:px-3 pl-7 border border-[#E8E8E8] outline-none"
            type="text"
            placeholder="Search Student, Phone Number, & Email"
            // name="search"
            // value={search}
            // onChange={handleSearchChange}
          />
          <span className="absolute pl-2 text-[20px] text-body">
            <IoSearchOutline />
          </span>
        </span>
      </span>
      <div className=" ">
        <TabBar tabs={tabs} />
      </div>
    </>
  );
};

export default ApplicationReview;
