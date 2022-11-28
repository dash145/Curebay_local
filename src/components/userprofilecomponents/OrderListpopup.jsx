import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

export default function OrderListpopup(props) {
    const [showEditlist, setshowEditlist] = useState(false);
    const redirectTo = (event) => {
        event.preventDefault();
        props.onClose();
    };
    const patientCode = useSelector(state => state.authReducer.patientCode);
    let patient = localStorage.getItem("patientprofile")
    
//     const [fromDate, setfromDate] = useState(moment(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).format("MM/DD/YYYY"))
//   const [toDate, settoDate] = useState(moment(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)).format("MM/DD/YYYY"));
    
    const [fromDate, setfromDate] = useState("")
    const [toDate, settoDate] = useState("")

    const [addlist, setaddlist] = useState({
        "patientId": patientCode,
    //     "fromDate": fromDate,
    //   "toDate": toDate,
    });
    
    const handleChange = (e) => {
        setaddlist({ ...addlist, [e.target.name]: e.target.value });
    };
    
    const save = (e) => {
        props.parentCallback(addlist);
        e.preventDefault();
    };
    
    const cancel = (e) => {
        props.cancelCallback(e);
        e.preventDefault();
    };

    useEffect(() => {
        // if (props?.Editaddress?.id) {
        //   setshowEditlist(true);
        //   console.log("editadrressdata", props);
        // } else {
        //   setshowEditlist(false);
        // }
    }, []);
    
    const changeDate = (e) => {

        setaddlist({ ...addlist, ["fromDate"]: moment(e).format("MM/DD/YYYY") });

        setfromDate(moment(e).format("MM/DD/yyyy"))

        settoDate("")

    }

    

    const changeToDate = (e) => {

        setaddlist({ ...addlist, ["toDate"]: moment(e).format("MM/DD/YYYY") });

        settoDate(moment(e).format("MM/DD/yyyy"))

    }
    
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*body*/}
                        <div className="rounded-lg shadow-lg bg-white-600 w-full h-112 p-5 antialiased justify-between border border-gray-200">
                            <div className="flex justify-between">
                                <h1 className="text-medium font-medium text-2xl text-brand-secondary ">
                                    Filter Orders
                                </h1>
                                <XIcon onClick={redirectTo} className="h-5 cursor-pointer" />
                            </div>
                            <hr className="mt-2"></hr>

                            <div className="flex pt-2 w-full ">
                                <div className="w-full">
                                    <div className="lg:flex justify-between py-6 lg:space-x-10">
                                        <div className="relative mb-6">
                                            <div className="flex">
                                                <input
                                                    autocomplete="off"
                                                    id="orderId"
                                                    name="orderId"
                                                    type="text"
                                                    className="peer text-xs h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                    placeholder="Enter Order ID"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            {/* <input autocomplete="off" id="email" name="email" type="text" value="Enter Name" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" /> */}

                                            <label
                                                for="orderId"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                Order ID
                                            </label>
                                        </div>

                                        <div className="relative mb-6">
                                            <DatePicker
                                                id="fromDate"
                                                name="fromDate"
                                                dropdownMode="select"
                                                showMonthDropdown
                                                showYearDropdown
                                                maxDate={new Date()}
                                                // className="pt-2 text-gray-900 "
                                                dateFormat="yyyy-MM-DD"
                                                value={fromDate}
                                                onSelect={changeDate}
                                                disabledKeyboardNavigation={true}
                                                autoFocus={false}
                                                placeholderText="From Date"
                                                className={
                                                    "peer text-xs h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                }
                                            />
                                            <label for="fromDate" class="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">From Date</label>
                                        </div>

                                        <div className="relative mb-6">
                                            <DatePicker
                                                id="toDate"
                                                name="toDate"
                                                dropdownMode="select"
                                                showMonthDropdown
                                                showYearDropdown
                                                maxDate={new Date()}
                                                minDate={new Date(fromDate)}
                                                // className="pt-2 text-gray-900 "
                                                dateFormat="yyyy-MM-DD"
                                                value={toDate}
                                                onSelect={changeToDate}
                                                disabledKeyboardNavigation={true}
                                                autoFocus={false}
                                                placeholderText="To Date"
                                                className={
                                                    "peer  text-xs h-10 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                }
                                            />
                                            <label for="toDate" class="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">To Date</label>
                                        </div>

                                    </div>
                                    <div className="lg:flex justify-between lg:py-6 lg:space-x-10">
                                        <div className="relative mb-6">
                                            <div className="flex">
                                                <input
                                                    autocomplete="off"
                                                    id="labName"
                                                    name="labName"
                                                    type="text"
                                                    className="peer text-xs h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                    placeholder="Lab Name"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <label
                                                for="hospitalLocation"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                Lab Name
                                            </label>
                                        </div>
                                        <div className="relative mb-6">
                                            <div className="flex">
                                                <select class="peer -mx-1 text-xs h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                    id="procedureStatus"
                                                    name="procedureStatus"
                                                    value={addlist.procedureStatus} onChange={handleChange} >
                                                    <option value="">Select procedure Status</option>
                                                    <option class="py-1" value="1">Ordered</option>
                                                    <option class="py-1" value="2">Completed</option>
                                                    <option class="py-1" value="0">Pending</option>
                                                    <option class="py-1" value="5">Cancelled By Patient</option>
                                                    <option class="py-1" value="6">Cancelled By Diagnostics</option>
                                                </select>
                                            </div>
                                            <label for="procedureStatus" class="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Procedure Status</label>
                                        </div>

                                        <div className="relative mb-6">
                                            <div className="flex">
                                                <select class="peer -mx-1 text-xs h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                    id="status"
                                                    name="status"
                                                    value={addlist.status} onChange={handleChange} >
                                                    <option value="">Select Report Uploaded Status</option>

                                                    <option class="py-1" value="1">Pending </option>
                                                    <option class="py-1" value="2">Uploaded</option>
                                                </select>
                                            </div>
                                            <label for="status" class="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Report Uploaded Status</label>
                                        </div>
                                    </div>

                                    <div className="relative ">
                                        <div className="flex"></div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            onClick={cancel}
                                            className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            onClick={save}
                                            className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
                                        >
                                            Ok
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
