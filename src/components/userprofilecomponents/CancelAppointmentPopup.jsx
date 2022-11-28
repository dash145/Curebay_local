import React, { useEffect, useState } from "react";
import AddinsurancePopup from "./Addinsurancepopup";
import { useHistory, useLocation } from 'react-router-dom';

function CancelAppointmentPopup(props) {
  const location = useLocation();
  const history = useHistory();

  const [reason,setReason]=useState("")
  const [selectReason,setSelectReason]=useState(false)
  
  const [showrescheduleappointment, setshowrescheduleappointment] =
    useState(false);
  
    const redirectTo = (event) => {
        event.preventDefault();
        props.closePopup();
    };

  const redirect = (event) => {
    event.preventDefault();
    setshowrescheduleappointment(true);
  };

  const direction = (event, location) => {
    event.preventDefault();
    history.push(location);
  };

  const handleChange = (e) => { 
    setReason(e.target.value)
};

const onCancelBtn=()=>{

  // if(reason=="" || reason=="Choose Your Reason"){
  //   setSelectReason(true)
  //   return
  // }

  // setSelectReason(false)

  props.onCancel(reason)
  
}


  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*body*/}
            <div class="rounded-lg shadow-lg bg-white-600 w-full h-112 p-5 antialiased justify-between border border-gray-200">
              <p class="text-medium font-medium text-2xl  text-center ">
                Are you sure you want to{" "}
              </p>
              <p class="text-medium font-medium text-2xl  text-center ">
                {" "}
                cancel your appointment?
              </p>

              <div class="flex justify-center mt-2 mb-4 px-2 ">
                <div class="flex pr-2">
                  {/* <p class="text-medium font-medium text-2xl  text-brand-secondary" >Choose Your R</p> */}
                  <div class="h-10 w-64 border border-gray-200 p-2 ml-4  mt-2 rounded-lg flex space-x-6">
                    <select class="w-full   outline-none" onChange={(e)=> handleChange(e)}>
                      <option class="py-1 text-sm text-green-600">
                        {"Choose Your Reason"}
                      </option>
                      <option class="py-1 text-sm text-green-600">
                        {"Booked another Appointment"}
                      </option>
                      <option class="py-1 text-sm text-green-600">
                        {"Other"}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-4 py-4">
                <button
                  onClick={props.close}
                  disabled={props.isLoading}
                  className="bg-white border border-brand-primary text-brand-secondary p-2 rounded-xl mr-2 disabled:opacity-50"
                >
                  No, Go Back
                </button>
                <button
                  onClick={()=>onCancelBtn()}
                  disabled={props.isLoading}
                  className="bg-brand-secondary  text-sm text-white font-normal rounded-xl py-2 px-3 mr-2 disabled:opacity-50"
                >
                  Yes, Continue
                </button>
              </div>
              {
                props.isErrorMsg &&
                <div>
              <p class="text-red-600  text-sm  text-center ">
                {" "}
              {props.isErrorMsg}
              </p>
              </div>
              }

              
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

      {showrescheduleappointment ? (
        <AddinsurancePopup
          closePopup={() =>
            setshowrescheduleappointment(!showrescheduleappointment)
          }
        ></AddinsurancePopup>
      ) : null}
    </>
  );
}

export default CancelAppointmentPopup;
