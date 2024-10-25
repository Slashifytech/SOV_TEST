import React, { useEffect, useState } from "react";
import { educationLevelOption, titleOption } from "../constant/data";
import Register from "../components/reusable/Register";
import {
  CountrySelect,
  FormNavigationButtons,
  InstituteComponent,
  SelectComponent,
} from "../components/reusable/Input";
import { studentPreference } from "../features/studentApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getInstituteOption } from "../features/generalSlice";
import { getStudentData, studentInfo } from "../features/studentSlice";
import PopUp from "../components/reusable/PopUp";
import { check } from "../assets";

const Form3 = ({
  customClass,
  hide,
  handleCancel,
  studentFormId,
  updateData,
}) => {
  const { prefCountryOption } = useSelector((state) => state.general);
  const { courses } = useSelector((state) => state.general);
  const { instituteOption } = useSelector((state) => state.general);
  const studentInfoData = useSelector((state) => state.student.studentInfoData);
  const studentData = useSelector((state) => state.student.studentInformation);
  const studentInformation = hide ? studentInfoData : studentData;
  const dispatch = useDispatch();
  const formId = studentInformation?.data?._id;
  const preference = studentInformation?.data?.preferences;
  const studentId = localStorage.getItem("form");
  const [isPopUp, setIsPopUp] = useState(false);
  const editForm = hide === true ? "edit" : null;
  const submitId = hide ? formId : studentId;
  const role = localStorage.getItem('role');
  const [preferenceData, setPreferenceData] = useState({
    preferredCountry: "",
    preferredState: "",
    preferredProgram: "",
    preferredLevelOfEducation: "",
    preferredInstitution: "",
  });

  const [errors, setErrors] = useState({
    preferredCountry: "",
    preferredState: "",
    preferredProgram: "",
    preferredLevelOfEducation: "",
    preferredInstitution: "",
  });
  const PopUpOpen = () => {
    setIsPopUp(true);
  };
  const PopUpClose = () => {
    setIsPopUp(false);
  };
  useEffect(() => {
    if (hide === true) {
      dispatch(studentInfo(studentFormId));
    }
    if (hide === false) {
      dispatch(getStudentData(studentId));
    }
  }, [dispatch]);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setPreferenceData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
    setErrors((prevErrors) => {
      const { [name]: removedError, ...restErrors } = prevErrors;
      return restErrors;
    });
  };

  useEffect(() => {
    dispatch(getInstituteOption(preferenceData.preferredCountry));
  }, [dispatch, preferenceData.preferredCountry]);

  const validateFields = () => {
    const newErrors = {};

    if (!preferenceData.preferredCountry) {
      newErrors.preferredCountry = "Preferred Country is required.";
    }
    if (!preferenceData.preferredState) {
      newErrors.preferredState = "Preferred State is required.";
    }
    if (!preferenceData.preferredProgram) {
      newErrors.preferredProgram = "Preferred Program is required.";
    }
    if (!preferenceData.preferredLevelOfEducation) {
      newErrors.preferredLevelOfEducation =
        "Preferred Level of Education is required.";
    }
    if (!preferenceData.preferredInstitution) {
      newErrors.preferredInstitution = "Preferred Institution is required.";
    }

    setErrors(newErrors);

    // Return true if there are no errors, otherwise false
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    if (preference) {
      setPreferenceData(preference);
    }
  }, [preference]);
  const handleSubmit = async () => {
    if (validateFields()) {
      try {
        const res = await studentPreference(preferenceData, submitId, editForm);
        toast.success(
          res?.message || "Personal Information Submitted successfully"
        );

        {
          hide === true ? updateData() : PopUpOpen();
        }
        localStorage.removeItem("form");

        console.log(res);
      } catch (error) {
        console.log(error);
        toast.error(error.message || error);
      }
    } else {
      toast.error("Please fill in all required fields correctly.");
    }
  };

  return (
    <div className="min-h-screen ">
      <div className={`${customClass}`}>
        {hide === true ? (
          ""
        ) : (
          <>
            <p className="text-heading font-semibold text-[30px] pt-7">
              Preferences
            </p>
            <p className="text-secondary font-normal text-[14px] ">
              Specify preferred study destinations, fields of study, and
              colleges of interest.
            </p>
          </>
        )}
        <div
          className={`bg-white rounded-xl ${
            hide === true ? "-mt-3" : " px-8 py-6 pb-12 mt-6"
          }`}
        >
          <CountrySelect
            name="preferredCountry"
            label="Preferred Country"
            customClass="bg-input"
            options={prefCountryOption}
            value={preferenceData.preferredCountry}
            handleChange={handleInput}
          />
          {errors.preferredCountry && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.preferredCountry}
            </p>
          )}

          <Register
            imp="*"
            name="preferredState"
            type="text"
            label="Preferred State"
            handleInput={handleInput}
            value={preferenceData.preferredState}
            errors={errors.preferredState}
          />

          <InstituteComponent
            name="preferredInstitution"
            label="Preferred Institution"
            customClass="bg-input"
            options={instituteOption}
            value={preferenceData.preferredInstitution}
            handleChange={handleInput}
          />
          {errors.preferredInstitution && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.preferredInstitution}
            </p>
          )}

          <SelectComponent
            name="preferredProgram"
            label="Preferred Program"
            options={courses}
            value={preferenceData.preferredProgram}
            handleChange={handleInput}
          />
          {errors.preferredProgram && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.preferredProgram}
            </p>
          )}

          <SelectComponent
            name="preferredLevelOfEducation"
            label="Preferred Level of Education"
            options={educationLevelOption}
            value={preferenceData.preferredLevelOfEducation}
            handleChange={handleInput}
          />
          {errors.preferredLevelOfEducation && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.preferredLevelOfEducation}
            </p>
          )}
        </div>
        {hide === true ? (
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
          </div>
        ) : (
          <FormNavigationButtons
            backLink="/student-form/2"
            backText="Back"
            buttonText="Submit and Continue"
            handleButtonClick={handleSubmit}
          />
        )}
      </div>
      <PopUp
        src={check}
        PopUpClose={PopUpClose}
        isPopUp={isPopUp}
        heading={role === "2" ? "Successfully Registered" : "Your Student Registration is Complete!"}
        text1={
          role === "2"
            ? "Student successfully registered! You can now manage their profile and take further actions directly from your portal. Continue to streamline their study journey with ease."
            : "Thank You for applying to become an official SOV Portal Partner Student."
        }
        text3={role !=="2" &&"All good things take time."}
        text4={role !=="2" &&"Thanks for your patience!"}
        text={role !=="2" && "You may start exploring SOV Portal. However, for a proper quality review and writing process, allow us up to 24 to 48 hours to confirm that your application has been successful."
        }/>
    </div>
  );
};

export default Form3;
