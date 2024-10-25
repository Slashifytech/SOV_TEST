import React, { useEffect, useState } from "react";
import Header from "../components/dashboardComp/Header";
import AdminSidebar from "../components/dashboardComp/AdminSidebar";
import TabBar from "../components/dashboardComp/TabBar";
import Pending from "../components/adminComps/Pending";
import { agentStudentApprovals } from "../features/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import Approved from "../components/adminComps/Approved";
import Rejected from "../components/adminComps/Rejected";
import { IoSearchOutline } from "react-icons/io5";
import { CustomInput } from "../components/reusable/Input";
import Pagination from "../components/dashboardComp/Pagination";

const Approval = () => {
  const { approvals } = useSelector((state) => state.admin);
  const approvalData = [
    ...(approvals?.agents || []),
    ...(approvals?.students || []),
  ];
  const { updateState, tabType } = useSelector((state) => state.admin);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [isTypeFilter, setIsFilterType] = useState("");
  const [page, setPage] = useState(1);
  const totalUsersCount = approvals?.totalRecords || 0;
  const currentPage = approvals?.currentPage;
  const totalPagesCount = approvals?.totalPages;

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value));
    setPage(1);
  };
  const perPageOptions = [];
  for (let i = 10; i <= Math.min(totalUsersCount, 100); i += 10) {
    perPageOptions.push(i);
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const handleTypeFilter = (e) => {
    setIsFilterType(e.target.value);
    setPage(1);
  };
  const dispatch = useDispatch();
  const tabs = [
    {
      name: "pending",
      label: "Pending",
      component: Pending,
      props: { data: approvalData },
    },
    {
      name: "approved",
      label: "Approved",
      component: Approved,
      props: { data: approvalData },
    },
    {
      name: "rejected",
      label: "Rejected",
      component: Rejected,
      props: { data: approvalData },
    },
  ];

  useEffect(() => {

      dispatch(
        agentStudentApprovals({
          tabType,
          search,
          page,
          perPage,
          isTypeFilter,
          updateState,
        })
      );
    
  }, [dispatch, tabType, search, page, perPage, isTypeFilter, updateState]);

  return (
    <>
      <Header customLink="/agent/shortlist" />
      <div>
        <span className="fixed overflow-y-scroll scrollbar-hide  bg-white">
          <AdminSidebar />
        </span>
      </div>
      <div className=" bg-white">
        <span className="flex items-center pt-16 md:ml-[16.5%] sm:ml-[22%]  ">
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

      <span className="flex flex-row items-center mb-3 m-6 mt-6 sm:ml-[27%] md:ml-[19%] ">
        {" "}
        <span className="text-body">Show</span>
        <select
          className="ml-3 border px-2 py-1 w-10 h-11 rounded outline-none"
          value={perPage}
          onChange={handlePerPageChange}
        >
          {perPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="px-3 text-body">entries</span>
        <select
          className="ml-3 border px-2 py-1 w-40 h-11 rounded outline-none"
          onChange={handleTypeFilter}
          value={isTypeFilter}
        >
          <option value="" className="text-body">
            User Type
          </option>
          <option value="student">Student</option>
          <option value="company">Agent</option>
        </select>
        <span className="flex flex-row items-center ml-9 ">
          <CustomInput
            className="h-11 md:w-80 sm:w-48 rounded-md text-body  placeholder:px-3 pl-7 border border-[#E8E8E8] outline-none"
            type="text"
            placeHodler="Search by user Name & user Id"
            name="search"
            value={search}
            onChange={handleSearchChange}
          />
          <span className="absolute pl-2 text-[20px] text-body">
            <IoSearchOutline />
          </span>
        </span>
      </span>

      <div className="sm:ml-14 md:ml-0">
        <TabBar tabs={tabs} />
      </div>
      <div className="mt-12 mb-10">
        <Pagination
          currentPage={currentPage}
          hasNextPage={currentPage * perPage < totalUsersCount}
          hasPreviousPage={currentPage > 1}
          onPageChange={handlePageChange}
          totalPagesCount={totalPagesCount}
        />
      </div>
    </>
  );
};

export default Approval;
