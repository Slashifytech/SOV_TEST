import React, { useEffect } from "react";
import Header from "../components/dashboardComp/Header";
import AdminSidebar from "../components/dashboardComp/AdminSidebar";
import TabBar from "../components/dashboardComp/TabBar";
import Pending from "../components/adminComps/Pending";
import { agentStudentApprovals } from "../features/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import Approved from "../components/adminComps/Approved";
import Rejected from "../components/adminComps/Rejected";

const Approval = () => {
  const { approvals } = useSelector((state) => state.admin);
  const {updateState, tabType} = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const tabs = [
    {
      name: "pending",
      label: "Pending",
      component: Pending,
      props: { data: approvals },
    },
    {
      name: "approved",
      label: "Approved",
      component: Approved,
      props: { data: approvals },
    },
    {
      name: "rejected",
      label: "Rejected",
      component: Rejected,
      props: { data: approvals },
    },
  ];

  useEffect(() => {
    dispatch(agentStudentApprovals(tabType));
  }, [dispatch, tabType, updateState]);

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
              Approvals
            </p>
            <p className="mt-1 font-light text-body ml-9">
              Review and Approve Agent and Student Registrations.
            </p>
          </span>
        </span>
      </div>
      <div className=" ">
        <TabBar tabs={tabs} />
      </div>
    </>
  );
};

export default Approval;
