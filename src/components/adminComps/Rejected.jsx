import React, { useEffect } from "react";
import AdminCard from "./adminCard";
import { toast } from "react-toastify";
import {
  changeApprovalStatus,
  chngeApplicationStatus,
} from "../../features/adminApi";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTabType } from "../../features/adminSlice";

const Rejected = ({ data }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabType("rejected"));
  }, [dispatch]);

  const applications = data?.applications;

  return (
    <div className="mt-4">
      {location.pathname === "/admin/applications-review" ? (
        applications?.length > 0 ? (
          applications.map((application, index) => (
            <div key={index}>
              <AdminCard
                userType={application?.userType}
                apId={application?.applicationId}
                isApproval={false}
                newStatus="approved"
                name={application.fullName}
                userId={application?.customUserId}
                applicationType={application?.type}
                description={`${application?.fullName}`}
                currentStatus="rejected"
                rejectionMessage={application?.message}
              />
            </div>
          ))
        ) : (
          <div>No applications found.</div>
        )
      ) : data?.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            <AdminCard
              userType={item?.type === "agent" ? "Agent" : "Student"}
              userId={item?.agId ? item?.agId : item?.stId}
              isApproval={true}
              newStatus="completed"
              id={item?._id}
              linkTwo="/agent-profile"
              linkOne="/student-profile"
              rejectStatus="rejected"
              name={`${item?.firstName} ${item?.lastName}` || "Unknown User"}
              description={
                `${item?.firstName} ${
                  item?.lastName
                } has requested to register as an ${
                  item?.type === "agent" ? "agent" : "student"
                } on SOV portal` || "Unknown User"
              }
              currentStatus="rejected"
              rejectionMessage={item?.message}
            />
          </div>
        ))
      ) : (
        <div>No applications or combined data found.</div>
      )}
    </div>
  );
};

export default Rejected;
