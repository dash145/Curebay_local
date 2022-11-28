import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import CancelAppointmentPopup from "./CancelAppointmentPopup";
import { useDispatch, useSelector } from "react-redux";
import { deleteAppointment } from "../../Redux/Actions/doctorAction";
import { getLocalTime } from "../../Assets/utils/LocalTimeFormat";

function AppointmentDetailspopup(props) {
  console.log("props", props);
  const dispatch = useDispatch();
  const [isErrorMsg, setErrorMsg] = useState("");
  const {
    updatedAppointment,
    isError,
    isLoading: updating,
    msg,
    errMsg,
    success,
  } = useSelector((state) => state.doctorAppointment);
  const patientCode = useSelector((state) => state.authReducer.patientCode);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const redirectTo = (event) => {
    event.preventDefault();
    props.closePopup();
  };

  const confirmCancelDialog = (e) => {
    e.preventDefault();
    setShowCancelDialog(true);
  };

  const confirmCancelAppointment = (reason) => {
    if (reason == "") {
      setErrorMsg("Please select reason");
      return;
    }
    dispatch(deleteAppointment(props?.appointmentdetails?.id, reason))
      .then((res) => {
        setShowCancelDialog(false);
        setIsLoading(false);
      })
      .catch((err) => setErrorMsg(err?.response?.data?.details[0]));
  };

  // useEffect(()=>{
  //     setIsLoading(updating)
  //     if(!updating){
  //         setShowCancelDialog(false);
  //         if(success)
  //         {
  //             props.appointmentdetails.status = 3;
  //         }
  //     }
  // }, [updating]);
  return (
    // <>
    //     <div
    //         className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    //     >
    //         <div className="relative w-auto my-6 mx-auto max-w-3xl">
    //             {/*content*/}
    //             <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

    //                 {/*body*/}
    //                 <div className="relative p-6 flex-auto">

    //                     <div class="flex justify-between my-2">

    //                         <p class="text-medium font-medium text-2xl  text-brand-secondary ">Appointments Details</p>

    //                         <XIcon onClick={redirectTo} className="h-5 cursor-pointer" />
    //                     </div>
    //                     <hr classname="border-dash text-black w-10 mt-8 h-20 my-2 "></hr>
    //                     <div>
    //                         {/* <div class="flex pt-2 "> */}

    //                         <div className="my-2" >
    //                             <div class="flex justify-between py-6 space-x-10 pr-8">
    //                                 <div class="relative">
    //                                     <div className="flex ">
    //                                         <input autocomplete="off" id="email" name="email" type="text" class="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Patient Name" />
    //                                     </div>
    //                                     <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Patient Name </label>
    //                                 </div>

    //                                 <div class="relative">
    //                                     <div className="flex ">
    //                                         <input autocomplete="off" id="email" name="email" type="text" class="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Consultation Type" />
    //                                     </div>
    //                                     <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Consultation Type </label>
    //                                 </div>

    //                             </div>

    //                             <div class="flex justify-between py-6 space-x-10 pr-8">
    //                                 <div class="relative">
    //                                     <div className="flex ">
    //                                         <input autocomplete="off" id="email" name="email" type="text" class="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Consultation Mode" />
    //                                     </div>
    //                                     <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Consultation Mode  </label>
    //                                 </div>

    //                                 <div class="relative">
    //                                     <div className="flex ">
    //                                         <input autocomplete="off" id="email" name="email" type="text" class="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Status" />
    //                                     </div>
    //                                     <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Status </label>
    //                                 </div>

    //                             </div>

    //                             <div class="flex justify-between py-6 space-x-10   ">
    //                                 <div class="relative">
    //                                     <div className="flex ">
    //                                         <input autocomplete="off" id="email" name="email" type="text" class="peer  w-full h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Date Of Consultattion" />
    //                                     </div>
    //                                     <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Date Of Consultattion </label>
    //                                 </div>

    //                                 <div class="relative ">
    //                                     <div className="flex ">
    //                                         <input autocomplete="off" id="email" name="email" type="text" class="peer w-56  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="EnterTime of Consultation" />
    //                                     </div>
    //                                     <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Time of Consultation </label>
    //                                 </div>

    //                             </div>

    //                             <div class="flex justify-between py-6 space-x-10 pr-8">
    //                                 <div class="relative">
    //                                     <div className="flex ">
    //                                         <input autocomplete="off" id="email" name="email" type="text" class="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Doctor Name" />
    //                                     </div>
    //                                     <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Doctor Name </label>
    //                                 </div>

    //                                 <div class="relative">
    //                                     <div className="flex ">
    //                                         <input autocomplete="off" id="email" name="email" type="text" class="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Description" />
    //                                     </div>
    //                                     <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Description </label>
    //                                 </div>

    //                             </div>

    //                             <div class="flex justify-between py-6 space-x-10 pr-8 ">
    //                                 <div class="relative">
    //                                     <div className="flex ">
    //                                         <input autocomplete="off" id="email" name="email" type="text" class="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Consultation Link" />
    //                                     </div>
    //                                     <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Consultation Link </label>
    //                                 </div>

    //                                 <div class="relative">
    //                                     <div className="flex ">
    //                                         <input autocomplete="off" id="email" name="email" type="text" class="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Consultation Type" />
    //                                     </div>
    //                                     <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Share Link </label>
    //                                 </div>

    //                             </div>

    //                             <div className="flex justify-end ">
    //                                 <button onClick={redirectTo} className="bg-white border border-brand-primary text-brand-secondary p-2 rounded-xl mr-2">Close</button>
    //                                     <button  className="bg-brand-secondary  text-sm text-white font-normal p-3 rounded-xl mr-2">Re-Book</button>

    //                             </div>

    //                         </div>

    //                     </div>

    //                 </div>

    //             </div>
    //         </div>
    //     </div>
    //     <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    // </>

    <>
      <div className="flex justify-center fixed lg:none items-center  overflow-x-scroll hide-scrollbar overflow-y-auto inset-0 z-50 outline-none focus:outline-none">
        <div className=" w-auto my-6 mx-auto max-w-3xl h-64">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative sm:-top-10 flex flex-col md:w-11/12 bg-white outline-none focus:outline-none">
            {/*body*/}
            <div className="relative p-6 flex-auto overflow-y-auto">
              <div className="flex justify-between my-2">
                <p className="text-medium font-medium text-2xl  text-brand-secondary ">
                  Appointments Details
                </p>

                <XIcon onClick={redirectTo} className="h-5 cursor-pointer" />
              </div>
              <hr classname="border-dash text-black w-10 mt-8 h-20 my-2 "></hr>
              <div>
                {/* <div className="flex pt-2 "> */}

                <div className="my-2">
                  <div className="md:flex justify-between items-center py-2 md:py-6 space-y-3 md:spacey-0 md:space-x-10 md:pr-8">
                    <div className="relative md:w-1/2">
                      <div className="flex ">
                        <input
                          autocomplete="off"
                          id="email"
                          name="email"
                          type="text"
                          className="peer w-full  h-10 text-xs  text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="Enter Patient Name"
                          value={props.appointmentdetails.patientName}
                        />
                      </div>
                      <label
                        for="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Patient Name{" "}
                      </label>
                    </div>

                    <div className="relative md:w-1/2">
                      <div className="flex ">
                        <input
                          autocomplete="off"
                          id="email"
                          name="email"
                          type="text"
                          className="peer w-full text-xs h-10   text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="Enter Consultation Type"
                          value={
                            props.appointmentdetails.consultationsType == "V"
                              ? "Video"
                              : props.appointmentdetails.consultationsType ==
                                "A"
                              ? "Audio"
                              : props.appointmentdetails.consultationsType ==
                                "I"
                              ? "Inperson"
                              : "Quick"
                          }
                        />
                      </div>
                      <label
                        for="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Consultation Type{" "}
                      </label>
                    </div>
                  </div>

                  {/* <div className="flex justify-between py-6 space-x-10 pr-8">
                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Consultation Mode" value={props.appointmentdetails.consultationsType == 'V' ? 'Video': props.appointmentdetails.consultationsType == 'A' ? 'Audio' : props.appointmentdetails.consultationsType == 'I' ? 'Inperson' :  'Quick'}  />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Consultation Mode  </label>
                                        </div>

                                       <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Status" value={props.appointmentdetails.status}   />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Status </label>
                                        </div>

                                    </div> */}

                  <div className="md:flex justify-between items-center py-2 md:py-6 space-y-3 md:spacey-0 md:space-x-10 md:pr-8">
                    <div className="relative md:w-1/2">
                      <div className="flex ">
                        <input
                          autocomplete="off"
                          id="email"
                          name="email"
                          type="text"
                          className="peer  w-56 h-10  text-xs text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="Enter Date Of Consultattion"
                          value={getLocalTime(
                            props.appointmentdetails.whenAppointment
                          )}
                        />
                      </div>
                      <label
                        for="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Date Of Consultattion{" "}
                      </label>
                    </div>

                    <div className="relative md:w-1/2">
                      <div className="flex ">
                        <input
                          autocomplete="off"
                          id="email"
                          name="email"
                          type="text"
                          className="peer w-56 md:-ml-5 h-10 text-xs  text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="EnterTime of Consultation"
                          value={props.appointmentdetails.fromTime}
                        />
                      </div>
                      <label
                        for="password"
                        className="absolute left-0 md:-left-5 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Time of Consultation{" "}
                      </label>
                    </div>
                  </div>

                  <div className="md:flex justify-between items-center py-2 md:py-6 space-y-3 md:spacey-0 md:space-x-10 md:pr-8">
                    <div className="relative md:w-1/2">
                      <div className="flex ">
                        <input
                          autocomplete="off"
                          id="email"
                          name="email"
                          type="text"
                          className="peer w-full  h-10 text-xs  text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="Enter Doctor Name"
                          value={props.appointmentdetails.userName}
                        />
                      </div>
                      <label
                        for="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Doctor Name{" "}
                      </label>
                    </div>

                    <div className="relative md:w-1/2">
                      <div className="flex ">
                        <input
                          autocomplete="off"
                          id="email"
                          name="email"
                          type="text"
                          className="peer w-full  h-10 text-xs  text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="Enter Description"
                          value={props.appointmentdetails.consultationsReason}
                        />
                      </div>
                      <label
                        for="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Description{" "}
                      </label>
                    </div>
                  </div>

                  <div className="md:flex justify-between items-center py-2 md:py-6 space-y-3 md:spacey-0 md:space-x-10 md:pr-8">
                    {/* <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Consultation Mode" value={props.appointmentdetails.consultationsType == 'V' ? 'Video': props.appointmentdetails.consultationsType == 'A' ? 'Audio' : props.appointmentdetails.consultationsType == 'I' ? 'Inperson' :  'Quick'}  />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Consultation Mode  </label>
                                        </div> */}

                    <div className="relative md:w-1/2">
                      <div className="flex ">
                        <input
                          autocomplete="off"
                          id="email"
                          name="email"
                          type="text"
                          className="peer w-full  h-10 text-xs  text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="Enter Status"
                          value={
                            props.appointmentdetails.status === 1 ||
                            props.appointmentdetails.status === 14 ||
                            props.appointmentdetails.status === 15
                              ? "Pending"
                              : props.appointmentdetails.status === 3 ||
                                props.appointmentdetails.status === 16
                              ? "Cancelled"
                              : props.appointmentdetails.status === 9
                              ? "Expired"
                              : props.appointmentdetails.status === 2
                              ? "Completed"
                              : null
                          }
                        />
                      </div>
                      <label
                        for="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Status{" "}
                      </label>
                    </div>
                  </div>

                  {/* <div className="flex justify-between py-6 space-x-10 pr-8 ">
                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Consultation Link" />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Consultation Link </label>
                                        </div>


                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Consultation Type" />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Share Link </label>
                                        </div>

                                    </div> */}

                  <div className="flex justify-end">
                    {/* {props.appointmentdetails.allowCancel} */}
                    {props.appointmentdetails.status === 1 &&
                    props.isVisible &&
                    props.appointmentdetails?.isConfirm !== "1" ? (
                      <button
                        onClick={confirmCancelDialog}
                        className="bg-brand-secondary bg-white font-medium  mb-8 mr-2 p-2 rounded-xl text-white"
                      >
                        Cancel This Appointment
                      </button>
                    ) : (
                      ""
                    )}
                    {/* <button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2">Re-Book </button> */}
                  </div>

                  {
                    (props.appointmentdetails.status === 2 ||
                    props.appointmentdetails.status === 3) && (
                      <p className="text-green-600">
                        Your appointment has been{" "}
                        {props.appointmentdetails.status === 3
                          ? "Cancelled"
                          : "Completed"}{" "}
                        Successfully.
                      </p>
                    )}
                  {isError && <p className="text-red-600">{errMsg}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showCancelDialog && (
        <CancelAppointmentPopup
          isErrorMsg={isErrorMsg}
          onCancel={confirmCancelAppointment}
          isLoading={isLoading}
          close={() => {
            setShowCancelDialog(false);
            setErrorMsg("");
          }}
        />
      )}
    </>
  );
}

export default AppointmentDetailspopup;
