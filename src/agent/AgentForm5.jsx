import React, { useEffect, useState } from "react";
import Register from "../components/reusable/Register";
import { advertiseOption, socialMediaOption } from "../constant/data";
import {
  CheckboxGroup,
  FormNavigationButtons,
} from "../components/reusable/Input";
import { formFiveSubmit } from "../features/agentApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { agentInformation } from "../features/agentSlice";

const AgentForm5 = ({hide, handleCancel, updateData}) => {
  const { agentData } = useSelector((state) => state.agent);
  const getData = agentData?.companyOperations;
  const [operationsData, setOperationData] = useState({
    numberOfCounselors: "",
    averageExperienceYears: "",
    advertisementMethods: [], 
    socialMediaPlatforms: [], 
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const editForm = hide === true ? "edit":null;

  useEffect(() => {
    dispatch(agentInformation());
  }, [dispatch]);
  // Handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;

    // Convert to integer for specific fields
    const newValue =
      name === "numberOfCounselors" || name === "averageExperienceYears"
        ? parseInt(value, 10) || "" 
        : value;

    setOperationData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    // Clear error if input is valid
    if (newValue !== "" && !isNaN(newValue)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };
  // Validate form fields
  const validateFields = () => {
    let formErrors = {};

    if (!operationsData.numberOfCounselors) {
      formErrors.numberOfCounselors = "Number of counselors is required.";
    }

    if (!operationsData.averageExperienceYears) {
      formErrors.averageExperienceYears = "Average experience is required.";
    }

    if (operationsData.advertisementMethods.length === 0) {
      formErrors.advertisementMethods =
        "Please select at least one advertisement method.";
    }

    if (operationsData.socialMediaPlatforms.length === 0) {
      formErrors.socialMediaPlatforms =
        "Please select at least one social media platform.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleCheckboxGroup = (newSelectedValues) => {
    setOperationData((prev) => ({
      ...prev,
      advertisementMethods: newSelectedValues, // Updated field
    }));
    if (errors.advertisementMethods) {
      setErrors((prev) => ({ ...prev, advertisementMethods: "" }));
    }
  };

  const handleCheckbox = (newSelectedValues) => {
    setOperationData((prev) => ({
      ...prev,
      socialMediaPlatforms: newSelectedValues, // Updated field
    }));
    if (errors.socialMediaPlatforms) {
      setErrors((prev) => ({ ...prev, socialMediaPlatforms: "" }));
    }
  };
  //getData
  useEffect(() => {
    if (getData) {
      setOperationData(getData);
    }
  }, [getData]);

  // Submit form
  const handleSubmit = async () => {
    if (validateFields()) {
      try {
        const res = await formFiveSubmit(operationsData, editForm);

        toast.success(res?.message || "Data added successfully");
        {hide === true ? updateData() : 
        navigate("/agent-form/6", { state: "passPage" })}
      } catch (error) {
        console.log(error);
        toast.error(error?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen font-poppins">
      <div className={`${hide === true? "" : "md:mx-48 sm:mx-10"}`}>
      {hide === true ? "" : <>
        <p className="text-heading font-semibold text-[25px] pt-7">
          Company Operations
        </p></>}
        <div className="bg-white rounded-xl px-8 py-4 pb-12 mt-6">
          <Register
            imp="*"
            name="numberOfCounselors"
            type="text"
            label="How many counselors do you have?"
            handleInput={handleInput}
            value={operationsData.numberOfCounselors}
            errors={errors.numberOfCounselors}
          />
          {errors.numberOfCounselors && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.numberOfCounselors}
            </p>
          )}

          <Register
            imp="*"
            name="averageExperienceYears"
            type="text"
            label="On average, how many years of relevant experience do your counselors have?"
            handleInput={handleInput}
            value={operationsData.averageExperienceYears}
            errors={errors.averageExperienceYears}
          />
          {errors.averageExperienceYears && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.averageExperienceYears}
            </p>
          )}

          <div className="text-secondary text-[14px] mt-6">
            How do you advertise your services?*
          </div>
          <CheckboxGroup
            options={advertiseOption}
            onChange={handleCheckboxGroup}
            customClass="flex flex-wrap justify-start items-start"
            inputClass="mt-1"
            bindClass="flex items-start w-60 mt-6"
            value={operationsData.advertisementMethods}
          />
          {errors.advertisementMethods && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.advertisementMethods}
            </p>
          )}

          <div className="text-secondary text-[14px] mt-6">Social Media</div>
          <CheckboxGroup
            options={socialMediaOption}
            onChange={handleCheckbox}
            customClass="flex flex-wrap justify-start items-start"
            inputClass="mt-1"
            bindClass="flex items-start w-60 mt-6"
            value={operationsData.socialMediaPlatforms}
          />
          {errors.socialMediaPlatforms && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.socialMediaPlatforms}
            </p>
          )}
        </div>
        {hide === true ?
        <div className="flex justify-end mt-9 gap-4 ">
            <button
              className="border border-greyish text-black px-4 py-2 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-primary text-white px-6 py-2 rounded"
              onClick={() => {
                handleSubmit();
                handleCancel();
              }}
            >
              Save
            </button> 
            </div> :  
        <FormNavigationButtons
          backLink="/agent-form/4"
          backText="Back"
          buttonText="Submit and Continue"
          handleButtonClick={handleSubmit}
        />}
      </div>
    </div>
  );
};

export default AgentForm5;