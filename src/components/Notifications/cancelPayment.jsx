import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import Cheprofileservice from "../../Redux/services/Cheprofileservice";

export default function CancelPayment(props) {
    const dispatch = useDispatch();
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    
    const redirectTo = (event) => {
        event.preventDefault();
        props.onClose();
    };

    const save = (e) => {
       // props.filterNotifications(fromDate, toDate);
        e.preventDefault();
    };
    const cancel = (e) => {
        props.closePopup(e);
        e.preventDefault();
    };

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*body*/}
                        <div className="rounded-lg shadow-lg bg-white-600 w-full h-112 p-5 antialiased justify-between border border-gray-200">
                            <div className="flex justify-between">
                                <h1 className="text-medium font-medium text-2xl text-brand-secondary ">
                                    Cancel Payment
                                </h1>
                                <XIcon onClick={redirectTo} className="h-5 cursor-pointer" />
                            </div>
                            <hr className="mt-2"></hr>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
