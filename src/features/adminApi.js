import apiurl from "../util";

export const getAllApplicationforApproval = async (typeData) => {
    try {
      const response = await apiurl.get(`/admin/all/applications`,{
        params:{
          status: typeData
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "Error while submitting the form"
        );
      } else if (error.request) {
        throw new Error("No response from server. Please try again later.");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  };
  export const getAllApproval = async (typeData) => {
    try {
      const response = await apiurl.get(`/admin/all/student-agent-data`,{
        params:{
          status: typeData
        }
      });
      return response.data?.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "Error while submitting the form"
        );
      } else if (error.request) {
        throw new Error("No response from server. Please try again later.");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  };
  export const chngeApplicationStatus = async (id, status, section, message) => {
    try {
      const response = await apiurl.patch(`/admin/change-application-status/${id}`, { status, section, message},
   );
      return response.data?.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "Error while submitting the form"
        );
      } else if (error.request) {
        throw new Error("No response from server. Please try again later.");
      } else {
        throw new Error("An unexpected error occurred", error);
      }
    }
  };
  export const changeApprovalStatus = async (id, status, type, message) => {
    try {
      const response = await apiurl.patch(`/admin/change-page-status/${id}`, {status, type, message});
      return response.data?.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "Error while submitting the form"
        );
      } else if (error.request) {
        throw new Error("No response from server. Please try again later.");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  };
  export const adminLogin = async (role, email, password) => {
    try {
      const response = await apiurl.post(`/auth/admin/login`,{role, email, password});
      localStorage.setItem("userAuthToken", response?.data?.data?.accessToken);
      return response.data?.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "Error while submitting the form"
        );
      } else if (error.request) {
        throw new Error("No response from server. Please try again later.");
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  };