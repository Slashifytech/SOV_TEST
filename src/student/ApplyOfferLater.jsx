import React, { useEffect, useState } from "react";
import Header from "../components/dashboardComp/Header";
import { useLocation } from "react-router-dom";
import Register from "../components/reusable/Register";
import PhoneInputComponent from "../components/reusable/PhoneInputComponent";
import {
  CountrySelect,
  CustomInput,
  InstituteComponent,
  SelectComponent,
} from "../components/reusable/Input";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "../components/reusable/DragAndDrop";
import { toast } from "react-toastify";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../utils/fireBase";
import OfferLetterPop from "../components/dashboardComp/OfferLetterPop";
import { FiUpload } from "react-icons/fi";
import { getInstituteOption, studentById } from "../features/generalSlice";
import FormSection, {
  ScoreInputForm,
} from "../components/reusable/FormSection";
import { intakeOption } from "../constant/data";
import { getStudentDataById, newOfferLetter } from "../features/generalApi";
import AgentSidebar from "../components/dashboardComp/AgentSidebar";
import PopUp from "../components/reusable/PopUp";
import { greenTick } from "../assets";
import { RiDeleteBin6Line } from "react-icons/ri";

const initialPersonalInfo = {
  fullName: "",
  email: "",
  phoneNumber: "",
  address: {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  },
};
const initialIELTS = {
  reading: "",
  speaking: "",
  writing: "",
  listening: "",
  overallBand: "",
};
const initialPTES = {
  reading: "",
  speaking: "",
  writing: "",
  listening: "",
  overallBand: "",
};
const initialTOEFL = {
  reading: "",
  speaking: "",
  writing: "",
  listening: "",
  overallBand: "",
};
const initialPreferences = {
  country: "",
  institution: "",
  course: "",
  offerLetterPrice: "",
  intake: "",
};
const initialdocumentDetails = {
  urls: [],
};

const educationLevels = {
  diploma: ["markSheet10"],
  underGraduate: ["markSheet10", "markSheet12"],
  postGraduate: ["markSheet10", "markSheet12", "markSheetUnderGraduate"],
  diplomaPG: [
    "markSheet10",
    "markSheet12",
    "markSheetUnderGraduate",
    "markSheetPostGraduate",
  ],
  certificationCourse: [
    "markSheet10",
    "markSheet12",
    "markSheetUnderGraduate",
    "markSheetPostGraduate",
  ],
};

const initialEducationDetails = {
  educationLevel: "",
  markSheet10: "",
  markSheet12: "",
  markSheetUnderGraduate: "",
  markSheetPostGraduate: "",
};

const ApplyOfferLater = () => {
  const location = useLocation();
  const studentId = location?.state?.id || location?.state;
  const { courses } = useSelector((state) => state.general);
  const { countryOption, studentData, prefCountryOption} = useSelector(
    (state) => state.general
  );
  const prefCountry = location?.state?.prefCountry;
  const prefInstitute = location?.state?.prefInstitute;
  const { instituteOption } = useSelector((state) => state.general);
  const [isFileType, seFileType] = useState();
  const dispatch = useDispatch();
  const [isPopUp, setIsPopUp] = useState(false);
  const [isConfirmPopUp, setIsConfirmPopUp] = useState(false);
  const [offerLater, setOfferLater] = useState({
    personalInformation: { ...initialPersonalInfo },
    educationDetails: { ...initialEducationDetails },
    preferences: { ...initialPreferences },
    certificate: { ...initialdocumentDetails },
    PTE: { ...initialPTES },
    TOEFL: { ...initialTOEFL },
    IELTS: { ...initialIELTS },
  });

  const [selectedEducation, setSelectedEducation] = useState("");
  const [errors, setErrors] = useState({});

  const [resetDoc, setResetDoc] = useState(false);
  const [resetSecondDoc, setResetSecondDoc] = useState(false);

  useEffect(() => {
    dispatch(studentById(studentId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getInstituteOption(offerLater?.preferences?.country));
  }, [dispatch, offerLater?.preferences?.country]);
  const PopUpOpen = () => {
    setResetDoc(false);
    setIsPopUp(true);
  };
  const PopUpClose = () => {
    setIsPopUp(false);
  };
  const confirmPopUpOpen = () => {
    setIsConfirmPopUp(true);
  };
  const confirmPopUpClose = () => {
    setIsConfirmPopUp(false);
  };
  // General input change handler
  const handleInput = (e, sectionType) => {
    const { name, value, type } = e.target;

    // Split the name by dots (e.g., personalInformation.address.street)
    const nameParts = name.split(".");

    // Check if the input type is 'radio' to handle education level
    if (type === "radio") {
      setSelectedEducation(value);
      setOfferLater({
        ...offerLater,
        educationDetails: { ...initialEducationDetails, educationLevel: value },
      });
    }

    // Update nested object fields
    setOfferLater((prevState) => {
      let updatedState = { ...prevState };

      // Use the nameParts array to drill down into the state and set the value
      let stateLevel = updatedState;
      for (let i = 0; i < nameParts.length - 1; i++) {
        stateLevel = stateLevel[nameParts[i]];
      }

      // Set the value at the correct key
      stateLevel[nameParts[nameParts.length - 1]] = value;

      return updatedState;
    });
  };

  const validateFields = () => {
    const errors = {};

    // Full name validation (only alphabets and spaces allowed)
    if (!offerLater.personalInformation.fullName?.trim()) {
      errors.fullName = "Full name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(offerLater.personalInformation.fullName)) {
      errors.fullName = "Full name can only contain alphabets and spaces.";
    }

    // Email validation (valid format)
    if (!offerLater.personalInformation.email) {
      errors.email = "Email is required.";
    } else if (
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
        offerLater.personalInformation.email
      )
    ) {
      errors.email = "Invalid email format.";
    }

    // Phone number validation
    if (!offerLater.personalInformation.phoneNumber) {
      errors.phoneNumber = "Phone number is required.";
    }

    // Address validation
    if (!offerLater.personalInformation.address.street?.trim()) {
      errors.street = "Street address is required.";
    }
    if (!offerLater.personalInformation.address.city?.trim()) {
      errors.city = "City is required.";
    }
    if (!offerLater.personalInformation.address.state?.trim()) {
      errors.state = "State is required.";
    }
    if (!offerLater.personalInformation.address.postalCode?.trim()) {
      errors.postalCode = "Postal Code is required.";
    }
    if (!offerLater.personalInformation.address.country?.trim()) {
      errors.country = "Country is required.";
    }

    // Education Details validation
    if (!offerLater.educationDetails.educationLevel) {
      errors.educationLevel = "Education level is required.";
    }
    // } else {
    //   const requiredMarkSheets =
    //     educationLevels[offerLater.educationDetails.educationLevel];
    //   const uploadedMarkSheets = offerLater.educationDetails.markSheet;

    //   if (requiredMarkSheets.length !== uploadedMarkSheets.length) {
    //     errors.markSheet = `Please upload all required documents for ${offerLater.educationDetails.educationLevel}.`;
    //   }
    // }

    // Preferences validation
    if (!offerLater.preferences.country?.trim()) {
      errors.prefCountry = "Preferred country is required.";
    }
    if (!offerLater.preferences.institution?.trim()) {
      errors.prefInstitution = "Preferred institution is required.";
    }
    if (!offerLater.preferences.course?.trim()) {
      errors.prefCourse = "Preferred course is required.";
    }
    if (!offerLater.preferences.intake?.trim()) {
      errors.prefIntake = "Preferred intake is required.";
    }
    if (!offerLater.preferences.offerLetterPrice?.trim()) {
      errors.prefOfferLetter = "Preferred offer Letter is required.";
    }

    const isTOEFLFilled = Object.values(offerLater.TOEFL).some(
      (val) => val.trim() !== ""
    );
    const isIELTSFilled = Object.values(offerLater.IELTS).some(
      (val) => val.trim() !== ""
    );
    const isPTEFilled = Object.values(offerLater.PTE).some(
      (val) => val.trim() !== ""
    );

    if (!isTOEFLFilled && !isIELTSFilled && !isPTEFilled) {
      errors.testScore =
        "At least one test score (TOEFL, IELTS, or PTE) is required.";
    }
    return errors;
  };

  // Handle phone number separatel
  const handlePhoneChange = (phoneNumber) => {
    setOfferLater((prevState) => ({
      ...prevState,
      personalInformation: {
        ...prevState.personalInformation,
        phoneNumber: phoneNumber.number,
      },
    }));
  };

  const handleFilePopupOpen = (fileType) => {
    seFileType(fileType);
    PopUpOpen();
  };
  const handleFileUpload = async (files, uploadType) => {
    if (!files || files.length === 0) return;

    let uploadedUrls = [];

    for (const file of files) {
      const storageRef = ref(storage, `uploads/${file.name}`);

      try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        uploadedUrls.push(downloadURL);
        toast.success(`${file.name} uploaded successfully!`);
      } catch (error) {
        toast.error(`Error uploading ${file.name}. Please try again.`);
      }
    }
    if (uploadType === "certificate" && uploadedUrls.length > 0) {
      setOfferLater((prevData) => ({
        ...prevData,
        certificate: {
          urls: [...(prevData.certificate.urls || []), ...uploadedUrls],
        },
      }));
    } else {
      if (uploadedUrls.length > 0) {
        setOfferLater((prevState) => ({
          ...prevState,
          educationDetails: {
            ...prevState.educationDetails,
            [uploadType]: uploadedUrls[0],
          },
        }));
      }
    }
  };

  const deleteFile = async (fileUrl, uploadType) => {
    if (!fileUrl) return;

    const storageRef = ref(storage, fileUrl);

    try {
      await deleteObject(storageRef);
      toast.success("File deleted successfully!");

      if (uploadType === "certificate") {
        setOfferLater((prevData) => ({
          ...prevData,
          certificate: {
            ...prevData.certificate,
            urls: "",
          },
        }));
        setResetUpload(true);
      } else {
        setOfferLater((prevState) => ({
          ...prevState,
          educationDetails: {
            ...prevState.educationDetails,
            [uploadType]: "",
          },
        }));
        setResetSecondDoc(true);
      }
    } catch (error) {
      toast.error("Error deleting file. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields();

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form is valid");
    } else {
      setErrors(validationErrors);
      toast.error(validationErrors || "Form contains errors");
      console.log("Form has errors", validationErrors);
      return; // Stop the submission process if there are validation errors
    }

    try {
      const convertToNumber = (scoreData) => {
        return {
          reading: Number(scoreData.reading),
          speaking: Number(scoreData.speaking),
          writing: Number(scoreData.writing),
          listening: Number(scoreData.listening),
          overallBand: Number(scoreData.overallBand),
        };
      };

      const certificateUrls = Array.isArray(offerLater.certificate.urls)
        ? offerLater.certificate.urls // Use existing array if valid
        : offerLater.certificate.urls
        ? [offerLater.certificate.urls]
        : [];

      // Prepare payload
      const updatedOfferLater = {
        ...offerLater,
        certificate: {
          url: certificateUrls,
        },
        studentInformationId: studentId,
        educationDetails: {
          educationLevel: selectedEducation,
          markSheet10: offerLater.educationDetails.markSheet10,
          markSheet12: offerLater.educationDetails.markSheet12,
          markSheetUnderGraduate:
            offerLater.educationDetails.markSheetUnderGraduate,
          markSheetPostGraduate:
            offerLater.educationDetails.markSheetPostGraduate,
        },
      };

      if (
        offerLater.TOEFL &&
        Object.values(offerLater.TOEFL).some((val) => val)
      ) {
        updatedOfferLater.toefl = convertToNumber(offerLater.TOEFL);
      }

      if (offerLater.PTE && Object.values(offerLater.PTE).some((val) => val)) {
        updatedOfferLater.ptes = convertToNumber(offerLater.PTE);
      }

      if (
        offerLater.IELTS &&
        Object.values(offerLater.IELTS).some((val) => val)
      ) {
        updatedOfferLater.ieltsScore = convertToNumber(offerLater.IELTS);
      }

      // Delete temporary score data (TOEFL, PTE, IELTS) from updatedOfferLater
      delete updatedOfferLater.TOEFL;
      delete updatedOfferLater.PTE;
      delete updatedOfferLater.IELTS;

      // Submit the form
      const res = await newOfferLetter(updatedOfferLater);
      confirmPopUpOpen();
      toast.success(res?.message || "Form Submitted");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    if (studentData) {
      setOfferLater((prevState) => ({
        ...prevState,
        preferences: {
          ...prevState.preferences, // Spread previous preferences state to retain other fields
          country: prefCountry || "",
          institution: prefInstitute || "",
        },
        personalInformation: {
          ...prevState.personalInformation, // Spread previous personalInformation state to retain other fields
          fullName:
            (studentData?.personalInformation?.firstName || "") +
            " " +
            (studentData?.personalInformation?.lastName || ""),
          email: studentData?.personalInformation?.email || "",
          phoneNumber: studentData?.personalInformation?.phone?.phone || "",
          address: {
            ...prevState.personalInformation?.address, // Spread previous address state
            street: studentData?.residenceAddress?.address || "",
            city: studentData?.residenceAddress?.city || "",
            state: studentData?.residenceAddress?.state || "",
            postalCode: studentData?.residenceAddress?.zipcode || "",
            country: studentData?.residenceAddress?.country || "",
          },
        },
      }));
    }
  }, [studentData]);
  return (
    <>
      <Header
        icon={location.pathname === "/student/shortlist" ? <FaStar /> : null}
      />
      <div>
        <span className="fixed overflow-y-scroll scrollbar-hide pt-6 bg-white ">
          <AgentSidebar />
        </span>
        <div className="ml-[17%] pt-16 pb-8 bg-white border-b-2 border-[#E8E8E8]  ">
          <span className="flex items-center">
            <p className="text-[28px] font-bold text-sidebar mt-6 ml-9">
              Apply Offer Letter
            </p>
          </span>
        </div>
        <div className="ml-[30%] mr-[15%]">
          <div className="bg-white rounded-xl px-8 py-4 pb-12 mt-8 ">
            <span className="font-bold text-[25px] text-secondary ">
              Personal Information
            </span>
            <Register
              imp="*"
              name="personalInformation.fullName"
              type="text"
              label="Full Name"
              handleInput={handleInput}
              value={offerLater.personalInformation.fullName}
              errors={errors.fullName}
            />
            <Register
              imp="*"
              name="personalInformation.email"
              type="email"
              label="Email"
              handleInput={handleInput}
              value={offerLater.personalInformation.email}
              errors={errors.email}
            />
            <div className="mt-5">
              <PhoneInputComponent
                label="Phone Number"
                phoneData={offerLater.personalInformation.phoneNumber}
                onPhoneChange={(phoneData) => {
                  handlePhoneChange(phoneData);
                }}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 mt-2  text-sm">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
            <Register
              label="Address"
              imp="*"
              name="personalInformation.address.street"
              value={offerLater.personalInformation.address.street}
              handleInput={handleInput}
              placeHolder="Address"
              errors={errors.street}
            />
            <Register
              imp="*"
              name="personalInformation.address.state"
              type="text"
              label="Province/State"
              handleInput={handleInput}
              value={offerLater.personalInformation.address.state}
              errors={errors.state}
            />
            <Register
              imp="*"
              name="personalInformation.address.city"
              type="text"
              label="City/Town"
              handleInput={handleInput}
              value={offerLater.personalInformation.address.city}
              errors={errors.city}
            />
            <Register
              imp="*"
              name="personalInformation.address.postalCode"
              type="number"
              label="Postal/Zip Code"
              handleInput={handleInput}
              value={offerLater.personalInformation.address.postalCode}
              errors={errors.postalCode}
            />
            <CountrySelect
              name="personalInformation.address.country"
              label="Country"
              customClass="bg-input"
              options={countryOption}
              value={offerLater.personalInformation.address.country}
              handleChange={handleInput}
            />
            {errors.country && (
              <p className="text-red-500 mt-1 text-sm">{errors.country}</p>
            )}
          </div>

          <div className="bg-white  rounded-xl px-8 py-4 pb-12 mt-6">
            <span className="font-bold text-[25px] text-secondary  ">
              Education Details
            </span>
            <div className="grid grid-cols-3 mt-4 gap-6 text-body">
              {Object.keys(educationLevels).map((level) => (
                <span
                  key={level}
                  className="flex items-center gap-4 border border-[#CFCFD7] rounded-md py-3 w-52 justify-evenly"
                >
                  {level.replace(/([A-Z])/g, " $1")}{" "}
                  {/* Convert camelCase to readable format */}
                  <CustomInput
                    type="radio"
                    label={level}
                    value={level}
                    name="educationLevel"
                    onChange={handleInput}
                    checked={selectedEducation === level}
                  />
                </span>
              ))}
            </div>
            {selectedEducation && (
              <div className="mt-6">
                {educationLevels[selectedEducation].map((fileType) => (
                  <div
                    key={fileType}
                    className="flex flex-col justify-center items-center border-2 border-dashed border-body rounded-md py-9 mt-9 mb-4"
                  >
                    <button
                      className="text-black flex items-center"
                      onClick={() => handleFilePopupOpen(fileType)}
                    >
                      <FiUpload className="mr-2 text-primary text-[29px]" />
                    </button>
                    <p className="mt-6">
                      {fileType.replace("markSheet", "Marksheet ")}
                    </p>

                    {/* Display uploaded file */}
                    {offerLater.educationDetails[fileType] && (
                      <div className="mt-4 flex items-center">
                        <a
                          href={offerLater.educationDetails[fileType]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary rounded-sm px-6 py-2 border border-greyish"
                        >
                          View Uploaded Document
                        </a>
                        <button
                          onClick={() =>
                            deleteFile(
                              offerLater.educationDetails[fileType],
                              fileType
                            )
                          }
                          className="ml-4 text-red-500 text-[21px]"
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Error Display */}
            {Object.keys(errors).length > 0 && (
              <div className="mt-6">
                {Object.values(errors).map((error, index) => (
                  <p key={index} className="text-red-500">
                    {error}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className="bg-white rounded-xl px-8 py-4 pb-12 mt-6">
            <span className="font-bold text-[25px] text-secondary ">
              Preferences
            </span>
            <CountrySelect
              name="preferences.country"
              label="Country"
              customClass="bg-input"
              options={prefCountryOption}
              value={offerLater.preferences.country}
              handleChange={handleInput}
            />
            {errors.prefCountry && (
              <p className="text-red-500 mt-1 text-sm">{errors.prefCountry}</p>
            )}

            <InstituteComponent
              name="preferences.institution"
              label="Institute"
              customClass="bg-input"
              options={offerLater.preferences.country ? instituteOption : []}
              value={offerLater.preferences.institution}
              handleChange={handleInput}
            />
            {errors.prefInstitution && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.prefInstitution}
              </p>
            )}

            <SelectComponent
              name="preferences.course"
              label="Course"
              options={courses}
              value={offerLater.preferences.course}
              handleChange={handleInput}
            />
            {errors.prefCourse && (
              <p className="text-red-500 mt-1 text-sm">{errors.prefCourse}</p>
            )}
            <Register
              imp="*"
              name="preferences.offerLetterPrice"
              type="text"
              label="Offer letter price in USD"
              handleInput={handleInput}
              value={offerLater.preferences.offerLetterPrice}
              errors={errors.prefOfferLetter}
            />

            <SelectComponent
              name="preferences.intake"
              label="Intake"
              options={intakeOption}
              value={offerLater.preferences.intake}
              handleChange={handleInput}
            />
            {errors.prefIntake && (
              <p className="text-red-500 mt-1 text-sm">{errors.prefIntake}</p>
            )}
          </div>
          <div className="px-8 bg-white">
            {errors.testScore && (
              <p className="text-red-500 mt-1 text-md">{errors.testScore}</p>
            )}
            <ScoreInputForm
              namePrefix="IELTS"
              handleInput={handleInput}
              scoreType="IELTS Score"
              scoreData={offerLater.IELTS}
              errors={errors.IELTS}
            />
            <ScoreInputForm
              namePrefix="PTE"
              handleInput={handleInput}
              scoreType="PTE Score"
              scoreData={offerLater.PTE}
              errors={errors.PTE}
            />
            <ScoreInputForm
              namePrefix="TOEFL"
              handleInput={handleInput}
              scoreType="TOEFL Score"
              scoreData={offerLater.TOEFL}
              errors={errors.TOEFL}
            />
          </div>
          <div className="bg-white rounded-xl px-8 py-4 pb-12 mt-6">
            <span className="font-bold text-[25px] text-secondary ">
              Upload Documents
            </span>
            <p className="text-[15px] mt-3 text-body">
              IELTS/PTE/TOEFL/Certificate*
            </p>
            <div className="flex flex-col justify-center items-center border-2 border-dashed border-body rounded-md py-9 mt-9 mb-4">
              <button
                className="text-black flex items-center"
                onClick={() => handleFilePopupOpen("certificate")}
              >
                <FiUpload className="mr-2 text-primary text-[29px]" />
              </button>
              <p>Upload Certificates</p>
            </div>

            {Array.isArray(offerLater.certificate.urls) &&
              offerLater.certificate.urls?.length > 0 && (
                <div className="mt-4">
                  <p className="text-secondary font-semibold">
                    Uploaded Documents:
                  </p>
                  <ul>
                    {offerLater.certificate?.urls
                      .filter(
                        (url) =>
                          typeof url === "string" && url.startsWith("http")
                      )
                      .map((url, index) => (
                        <li key={index} className="flex items-center mt-2">
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline"
                          >
                            Uploaded Document
                          </a>
                          <button
                            onClick={() => deleteFile(url, "certificate")}
                            className="ml-4 text-red-500"
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
          </div>
          <div className="flex justify-end mb-12">
            <span
              onClick={handleSubmit}
              className="bg-primary text-white font-poppins rounded-md px-6 py-2 cursor-pointer"
            >
              Submit
            </span>
          </div>
        </div>
      </div>

      <OfferLetterPop
        isPopUp={isPopUp}
        docLabel="Upload Marksheet"
        resetDoc={resetDoc}
        PopUpClose={PopUpClose}
        setResetDoc={setResetDoc}
        handleFileUpload={(files) => handleFileUpload(files, isFileType)}
        uploadedFiles={offerLater.educationDetails[selectedEducation]}
        // handleDeleteFile={(fileUrl) => deleteFile(fileUrl, isFileType)}
        errors={errors}
        onSubmit={() => {
          console.log("Form Submitted");
        }}
      />

      <PopUp
        src={greenTick}
        PopUpClose={confirmPopUpClose}
        isPopUp={isConfirmPopUp}
        heading="Offer Letter Form Submitted"
        text1="Thank you for completing the form. We'll review your information and process your request soon.
Check your email and portal for updates.."
        // text3="All good things take time."
        // text4="Thanks for your patience!"
        // text="You may start exploring SOV Portal. However, for a proper quality review and writing process, allow us up to 24 to 48 hours to confirm that your application has been successful."
      />
    </>
  );
};

export default ApplyOfferLater;
