import React from "react";
import Count_clinic from "../Assets/Images/count_clinic.svg";
import Count_doctor from "../Assets/Images/count_doctor.svg";
import Count_patients from "../Assets/Images/count_patients.svg";
import Count_specialities from "../Assets/Images/count_specialities.svg";

function PopupMobile() {
  return (
    <div className="flex flex-wrap lg:flex lg:justify-around mb-8">
      {/* <div className="flex grow justify-around"> */}
      <div className="h-40 ml-2 mt-3 lg:h-60 w-40 lg:w-60  flex flex-col text-center shadow-xl rounded-lg px-6 lg:px-20 py-8">
        <img className="h-16" src={Count_patients} alt="" />
        <div className="text-2xl text-gray-700 font-medium  mt-1">20,000+</div>
        <div className="text-xs w-full text-gray-700 font-medium ">Happy Patients</div>
      </div>

      <div className="h-40 lg:h-60 mt-3 w-40 ml-6 lg:w-60 flex flex-col  text-center shadow-xl px-6 lg:px-20 py-8 rounded-lg">
        <img className="h-16" src={Count_doctor} alt="" />
        <div className="text-2xl text-gray-700 font-medium  mt-1">2,000+</div>
        <div className="text-xs w-full text-gray-700 font-medium ">Verified Doctors</div>
      </div>
      {/* </div> */}

      {/* <div className="flex grow justify-around"> */}
      <div className="h-40 ml-2 lg:h-60 w-40 mt-3 lg:w-60  flex flex-col text-center shadow-xl px-6 lg:px-20 py-8 rounded-lg">
        <img className="h-16" src={Count_specialities} alt="" />
        <div className="text-2xl text-gray-700 font-medium  mt-1">25+</div>
        <div className="text-xs w-full text-gray-700 font-medium ">Specialities</div>
      </div>

      <div className="h-40 lg:h-60 w-40 mt-3 ml-6 lg:w-60  flex flex-col text-center shadow-xl px-6 lg:px-20 py-8 rounded-lg">
        <img className="h-16" src={Count_clinic} alt="" />
        <div className="text-2xl text-gray-700 font-medium  mt-1">4.5/5</div>
        <div className="text-xs w-full text-gray-700 font-medium ">App Rating</div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default PopupMobile;
