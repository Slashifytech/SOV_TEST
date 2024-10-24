import React from "react";

const Dnf = ({headingText, bodyText, dnfImg,isButton, buttonText}) => {
  return (
    <>
        <div className="bg-white mx-28  mb-20 pt-12 pb-12 flex flex-col  justify-center items-center rounded-md ">
          <img src={dnfImg} alt="img" className="w-44 h-44" />
          <p className="text-sidebar font-semibold mt-3 text-[24px]">
       {headingText}
          </p>
          <p className=" text-body font-normal mt-3 px-20 text-[15px] text-center">
           {bodyText}
          </p>
{isButton === true &&
          <span className="bg-primary text-white rounded-md px-6 py-2 mt-6 cursor-pointer">{buttonText}</span>
}
        </div>
    </>
  );
};

export default Dnf;
