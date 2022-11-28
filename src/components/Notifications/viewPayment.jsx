import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import DatePicker from "react-datepicker";
import { getBillingDetails } from "../../Redux/Actions/payment";

import moment from 'moment';

import {getLocalTime} from '../../Assets/utils/LocalTimeFormat'

export default function ViewPaymet(props) {

    const dispatch = useDispatch();
    const [billDetail, setBillDetail] = useState([]);
    const [billdetails, setBillDetails] = useState([]);

    const redirectTo = (event) => {
        event.preventDefault();
        props.onClose();
    };

    const cancel = (e) => {
        props.closePopup(e);
        e.preventDefault();
    };

    useEffect(() => {
        // dispatch(getBillingDetails(props.selection.txnId));
    },[props]);

    const getBillingDetail = useSelector((state) => state.billingDetails);
    let { isLoading, billingData, isError } = getBillingDetail;

    // useEffect(() => {
    //     if(Array.isArray(billingData)) {
    //         setBillDetail(billingData);
    //     }
    //     setBillDetails({
    //         patientId : billingData[0]?.patientId,
    //         patientName : billingData[0]?.patientName,
    //         patientGender : billingData[0]?.patientGender === 'F' ? 'Female' : 'Male',
    //         patientMobileNumber : billingData[0]?.patientMobileNumber,
    //         totalAmount : billingData[0]?.totalAmount
    //     });
    // }, [billingData]);




    console.log(props , "sdvsdvosdnisdnv")
    return (
        <>
           <div
            className="flex justify-center fixed lg:none items-center  overflow-x-scroll hide-scrollbar overflow-y-auto inset-0 z-50 outline-none focus:outline-none"
        >
            <div className=" w-auto my-6 mx-auto max-w-3xl h-64">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative sm:-top-10 flex flex-col w-full bg-white outline-none focus:outline-none">

                    {/*body*/}
                    <div className="relative p-6 flex-auto overflow-y-auto">

                            <div className="flex justify-between my-2">

                                <p className="text-medium font-medium text-xl  text-black ">View Bill To Patient</p>

                                <XIcon onClick={() => props.onClose()} className="h-5 cursor-pointer" />
                            </div>
                            {/* <hr className="border-dash text-black w-10 mt-8 h-20 my-2 "></hr> */}
                            <div>


                                <div className="my-2" >
                                    <div className="md:flex justify-between items-center py-2 md:py-6 space-y-3 md:spacey-0 md:space-x-10 md:pr-8">
                                        <div className="relative md:w-1/2 mt-0 md:mt-4">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10 text-xs  text-black focus:outline-none focus:borer-rose-600" placeholder=""  value={props?.selection?.serviceName} />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Transaction Type</label>
                                        </div>


                                        <div className="relative md:w-1/2">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10 text-xs  text-black focus:outline-none focus:borer-rose-600" placeholder="" value={props?.selection?.txnId } />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Transaction ID</label>
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
                                        <div className="relative w-1/2 mt-0 md:mt-4">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer  w-56 h-10 text-xs  text-black focus:outline-none focus:borer-rose-600" placeholder="" value={props?.selection?.totalAmount} />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Total Amount</label>
                                        </div>


                                        <div className="relative w-1/2">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-56  h-10 text-xs  text-black focus:outline-none focus:borer-rose-600" placeholder="" value={getLocalTime(props?.selection?.createdDate)   }  />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Date of Payment</label>
                                        </div>

                                    </div>




                                    <div className="md:flex justify-between items-center py-2 md:py-6 space-y-3 md:spacey-0 md:space-x-10 md:pr-8">
                                        <div className="relative w-1/2">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10 text-xs  text-black focus:outline-none focus:borer-rose-600" placeholder=""  value={props?.selection?.payMode} />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Payment Mode</label>
                                        </div>


                                        {/* <div className="relative w-1/2">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Description"  value={props.appointmentdetails.consultationsReason} />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Cancel Payment
 </label>
                                        </div> */}

                                    </div>

                                    {/* <div className="md:flex justify-between items-center py-2 md:py-6 space-y-3 md:spacey-0 md:space-x-10 md:pr-8">
                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Consultation Mode" value={props.appointmentdetails.consultationsType == 'V' ? 'Video': props.appointmentdetails.consultationsType == 'A' ? 'Audio' : props.appointmentdetails.consultationsType == 'I' ? 'Inperson' :  'Quick'}  />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Consultation Mode  </label>
                                        </div>

                                        <div className="relative w-1/2">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Status" value={props.appointmentdetails.status === 1 ? "Pending" : props.appointmentdetails.status === 3?"Cancelled":"Completed"}   />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Status </label>
                                        </div>

                                    </div> */}



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
                                         <button onClick={props.openRecept} className="bg-brand-secondary bg-white font-medium  mb-8 mr-2 p-2 rounded text-white cursor-pointer">Download receipt</button>
                                    </div>

                                    {/* {success && props.appointmentdetails.status !==1 && (
                                        <p className="text-green-600">
                                        your appointment has been {props.appointmentdetails.status === 3?"Cancelled": "Completed"} Successfully.
                                        </p>
                                    )}
                                    {isError && <p className="text-red-600">{errMsg}</p>} */}
                                </div>




                            </div>


                    </div>

                </div>
            </div>
        </div>
        </>
    );
}
