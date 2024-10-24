import apiurl from "../util";


export const StudentPersnalInfo = async (payload, edit) => {
  try {
    const response = await apiurl.post(
      "/studentinformation/personal-information",
      payload,{
        params:{
          edit
        }
      }
    );
    console.log(response?.data)
    localStorage.setItem("form", response?.data?.data?._id);
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
export const studentPreference = async (payload, formId, edit) => {
  try {
    const response = await apiurl.patch(
      `/studentinformation/preference/${formId}`,
      payload,{
        params:{
          edit
        }
      }
    );
    return response.data;
  }catch (error) {
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
export const studentAddress = async (payload, formId, edit) => {
  try {
    const response = await apiurl.patch(
      `/studentinformation/residence-address/${formId}`,
      payload,{
        params:{
          edit
        }
      }
    );
    return response.data;
  }catch (error) {
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

export const getStudentInfo = async (studentId) => {
  try {
    const response = await apiurl.get(
      `/studentinformation/student-information/${studentId}`);
    return response.data;
  }catch (error) {
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
export const getPersonalInfo = async (studentId) => {
  try {
    const response = await apiurl.get(
      `/studentinformation/student-information/${studentId}`);
    return response.data;
  }catch (error) {
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
export const verifyEmail = async(email, otp) =>{
 try{
 const res = apiurl.post('/auth/verify-student',{
  email: email,
  otp: otp,
  type: "3"
 })
 return res
 }catch(error){
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
}
