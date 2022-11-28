import React, { useState, useEffect, useRef, createRef } from "react";
import Count_clinic from "../Assets/Images/count_clinic.svg";
import Count_doctor from "../Assets/Images/count_doctor.svg";
import Count_patients from "../Assets/Images/count_patients.svg";
import Count_specialities from "../Assets/Images/count_specialities.svg";
import Available_Lab_Test from "../Assets/Images/Available Lab Test.svg";
import PartnerHodpitals from "../Assets/Images/Partner Hodpitals.svg";
import Pincodecovered from "../Assets/Images/Pin code icon.svg";
import prescriptionsserved from "../Assets/Images/prescriptions served.svg";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getReportDetails } from "../Redux/Actions/doctorAction";


function Popup() {

  const history = useHistory();
  const dispatch = useDispatch();

  const [reposrtData,setReportData]=useState("")


  useEffect(() => {
    dispatch(getReportDetails()).then((res) => {

      setReportData(res?.data)
  })

},[]);


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 items-center justify-items-center justify-end bg-white m-auto gap-4 w-full md:w-max md:shadow md:border lg:mb-16" style={{borderRadius:"5px"}}>
      {/* <div className="flex grow justify-around"> */}
      <div className="flex flex-col w-11/12 md:w-32 shadow-lg md:shadow-none xl:w-44 text-center rounded-lg px-4 md:px-8 lg:px-0 py-2">
        <img className="h-12 md:h-16 lg:h-12" src={Count_patients} alt="" />
        <div className="text-base sm:text-lg md:text-2xl lg:text-md text-gray-700 font-bold ">{reposrtData?.totalPatients}</div>
        <div className="text-sm text-gray-700 font-bold ">Happy Patients</div>
      </div>

      <div className="flex flex-col w-11/12 md:w-32 shadow-lg md:shadow-none xl:w-44 text-center px-4 md:px-8 lg:px-0 py-2 rounded-lg">
        <img className="h-12 md:h-16 lg:h-12" src={Count_doctor} alt="" />
        <div className="text-base sm:text-lg md:text-2xl lg:text-md text-gray-700 font-bold ">{reposrtData?.totaldoctors}</div>
        <div className="text-sm text-gray-700 font-bold ">Verified Doctors</div>
      </div>
      {/* </div> */}

      {/* <div className="flex grow justify-around"> */}
      <div className="flex flex-col w-11/12 md:w-32 shadow-lg md:shadow-none xl:w-44 text-center mt-3 sm:mt-0 md:mt-0 lg:mt-0 px-4 md:px-8 lg:px-0 py-2 rounded-lg">
        <img className="h-12 md:h-16 lg:h-12" src={Count_specialities} alt="" />
        <div className="text-base sm:text-lg md:text-2xl lg:text-md text-gray-700 font-bold ">{reposrtData?.totalSpecialities}</div>
        <div className="text-sm text-gray-700 font-bold ">Specialities</div>
      </div>

      <div className="flex flex-col w-11/12 md:w-32 shadow-lg md:shadow-none xl:w-44 text-center mt-3 sm:mt-0 md:mt-0 lg:mt-0 px-4 md:px-8 lg:px-0 py-2 rounded-lg">
        <img className="h-12 md:h-16 lg:h-12" src={Available_Lab_Test} alt="" />
        <div className="text-base sm:text-lg md:text-2xl lg:text-md text-gray-700 font-bold ">{reposrtData?.totallabtest?.total}</div>
        <div className="text-sm text-gray-700 font-bold ">Available Lab Test</div>

      </div>

      <div className="flex flex-col w-11/12 md:w-32 shadow-lg md:shadow-none xl:w-44 text-center mt-3 sm:mt-0 md:mt-0 lg:mt-0 px-4 md:px-8 lg:px-0 py-2 rounded-lg">
        <img className="h-12 md:h-16 lg:h-12" src={PartnerHodpitals} alt="" />
        <div className="text-base sm:text-lg md:text-2xl lg:text-md text-gray-700 font-bold ">{reposrtData?.totalHospitals}</div>
        <div className="text-sm text-gray-700 font-bold ">Partner Hospitals</div>
      </div>

      <div className="flex flex-col w-11/12 md:w-32 shadow-lg md:shadow-none xl:w-44 text-center mt-3 sm:mt-0 md:mt-0 lg:mt-0 px-4 md:px-8 lg:px-0 py-2 rounded-lg">
        <img className="h-12 md:h-16 lg:h-12" src={Pincodecovered} alt="" />
        <div className="text-base sm:text-lg md:text-2xl lg:text-md text-gray-700 font-bold ">{reposrtData?.totalZipCodesCovered}</div>
        <div className="text-sm text-gray-700 font-bold ">Pin Codes Covered</div>
      </div>

      <div className="flex flex-col w-11/12 md:w-32 shadow-lg md:shadow-none xl:w-44 text-center mt-3 sm:mt-0 md:mt-0 lg:mt-0 px-4 md:px-8 lg:px-0 py-2 rounded-lg">
        <img className="h-12 md:h-16 lg:h-12" src={prescriptionsserved} alt="" />
        <div className="text-base sm:text-lg md:text-2xl lg:text-md text-gray-700 font-bold ">{reposrtData?.totalPrescriptionServed}</div>
        <div className="text-sm text-gray-700 font-bold ">Prescriptions Served</div>
      </div>
    </div>
  );
}

export default Popup;
