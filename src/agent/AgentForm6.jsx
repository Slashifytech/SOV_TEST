import React, { useEffect, useState } from "react";
import Register from "../components/reusable/Register";
import PhoneInputComponent from "../components/reusable/PhoneInputComponent";
import {
  CountrySelect,
  FormNavigationButtons,
  SelectComponent,
} from "../components/reusable/Input";
import { referenceOptions } from "../constant/data";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { formSixSubmit } from "../features/agentApi";
import { agentInformation } from "../features/agentSlice";
import PopUp from "../components/reusable/PopUp";
import { check } from "../assets";

const referenceTemplate = {
  referenceType: "",
  contactPerson: "",
  institutionName: "",
  contactNumber: "",
  email: "",
  designation: "",
  country: "",
};

const AgentForm6 = ({hide, handleCancel, updatedData}) => {
  const { countryOption } = useSelector((state) => state.general);
  const { agentData } = useSelector((state) => state.agent);
  const getData = agentData?.references || [];
  const [isPopUp, setIsPopUp] = useState(false);

  const [referenceData, setReferenceData] = useState(
    getData.length > 0
      ? getData
      : [{ ...referenceTemplate }, { ...referenceTemplate }]
  );
  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const dispatch = useDispatch();
  const PopUpOpen = () => setIsPopUp(true);
  const PopUpClose = () => setIsPopUp(false);
  const editForm = hide === true ? "edit":null;

  useEffect(() => {
    dispatch(agentInformation());
  }, [dispatch]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    const [index, field] = name.split(".");

    setReferenceData((prevData) => {
      const updatedData = prevData.map((reference, idx) => {
        if (idx === Number(index)) {
          return {
            ...reference,
            [field]: value,
          };
        }
        return reference;
      });
      return updatedData;
    });

    validateField(index, field, value);
  };

  const handlePhoneChange = (index, phoneData) => {
    setReferenceData((prevData) => {
      const updatedData = [...prevData];
      const updatedReference = {
        ...updatedData[index],
        contactNumber: phoneData.number,
      };
      updatedData[index] = updatedReference;
      return updatedData;
    });
    validateField(index, "contactNumber", phoneData.number);
  };

  const validateField = (index, field, value) => {
    let errorMsg = "";

    if (value.trim() === "" && index === 0) {
      errorMsg = "This field is required";
    } else if (field === "email" && value && !emailRegex.test(value)) {
      errorMsg = "Please enter a valid email address";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [`${index}.${field}`]: errorMsg,
    }));
  };

  const validateForm = () => {
    const formErrors = {};
    referenceData.forEach((reference, index) => {
      // Only validate all fields for the first reference
      if (index === 0) {
        Object.keys(reference).forEach((field) => {
          const value = reference[field];
          if (value.trim() === "") {
            formErrors[`${index}.${field}`] = "This field is required";
          } else if (field === "email" && !emailRegex.test(value)) {
            formErrors[`${index}.${field}`] = "Please enter a valid email address";
          }
        });
      } else {
        // For the second reference, only validate non-empty fields
        Object.keys(reference).forEach((field) => {
          const value = reference[field];
          if (value && field === "email" && !emailRegex.test(value)) {
            formErrors[`${index}.${field}`] = "Please enter a valid email address";
          }
        });
      }
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const res = await formSixSubmit(referenceData, editForm);
  
        toast.success(res?.message || "Data added successfully");
       {hide === true ?       updateData():  PopUpOpen()}
      } catch (error) {
        console.log(error);
        toast.error(error?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen font-poppins">
       <div className={`${hide === true? "" : "md:mx-48 sm:mx-10"}`}>

        {referenceData.map((reference, index) => (
          <div key={index}>
            <p className="text-heading font-semibold text-[25px] pt-7">
              {index === 0 ? "First" : "Second"} Reference
            </p>
            <p className="text-secondary font-light text-[14px] pr-[30%]">
              Please provide reference for your company. e.g. banks, other
              education organisations, etc.
            </p>
            <div className={`bg-white rounded-xl  py-4 pb-12  ${hide === true ? "" : "px-8 mt-6"}`}>
              <SelectComponent
               notImp ={true}
                name={`${index}.referenceType`}
                label="Reference Type"
                options={referenceOptions}
                value={reference.referenceType}
                handleChange={handleInput}
                errors={errors[`${index}.referenceType`]}
              />
              <div className="flex items-start justify-between gap-6 w-full">
                <span className="w-[50%]">
                  <Register
                    imp={index === 0 ? "*" : ""}
                    name={`${index}.contactPerson`}
                    type="text"
                    label="Contact Person"
                    handleInput={handleInput}
                    value={reference.contactPerson}
                    errors={errors[`${index}.contactPerson`]}
                  />
                  <Register
                    imp={index === 0 ? "*" : ""}
                    name={`${index}.designation`}
                    type="text"
                    label="Designation"
                    handleInput={handleInput}
                    value={reference.designation}
                    errors={errors[`${index}.designation`]}
                  />
                  <div className="mt-6">
                    <PhoneInputComponent
                     notImp = {true}
                      phoneData={reference.contactNumber}
                      onPhoneChange={(phoneData) =>
                        handlePhoneChange(index, phoneData)
                      }
                      label="Phone"
                    />
                    {errors[`${index}.contactNumber`] && (
                      <p className="text-red-500 text-sm">
                        {errors[`${index}.contactNumber`]}
                      </p>
                    )}
                  </div>
                </span>
                <span className="w-[50%]">
                  <Register
                    imp={index === 0 ? "*" : ""}
                    name={`${index}.institutionName`}
                    type="text"
                    label="Institution Name"
                    handleInput={handleInput}
                    value={reference.institutionName}
                    errors={errors[`${index}.institutionName`]}
                  />
                  <CountrySelect
                  notImp ={true}
                  customClass="bg-input"

                    name={`${index}.country`}
                    label="Country"
                    options={countryOption}
                    value={reference.country}
                    handleChange={handleInput}
                    errors={errors[`${index}.country`]}
                  />
                  <Register
                    imp={index === 0 ? "*" : ""}
                    name={`${index}.email`}
                    type="email"
                    label="Email"
                    handleInput={handleInput}
                    value={reference.email}
                    errors={errors[`${index}.email`]}
                  />
                </span>
              </div>
            </div>
          </div>
        ))}


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
          backLink="/agent-form/5"
          backText="Back"
          buttonText="Submit and Continue"
          handleButtonClick={handleSubmit}
        />}
      </div>
      <PopUp
        src={check}
        PopUpClose={PopUpClose}
        isPopUp={isPopUp}
        text=" You may start exploring SOV Portal. However, for a proper quality review and writing process, allow us up to 24 to 48 hrs to confirm that your application has been successful."
        heading="Your Agent Registration is Complete!"
        text3="All good things take time."
        text4="Thanks for your patience!"
        text1="Thank You for applying to become an official SOV Portal Partner Agent."
      />
    </div>
  );
};

export default AgentForm6;