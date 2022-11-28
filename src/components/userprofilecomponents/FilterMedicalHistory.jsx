import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";

export default function FilterMedicalHistory(props) {
   
    const dispatch = useDispatch();

    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();

    const redirectTo = (event) => {
        event.preventDefault();
        props.onClose();
    };

    const save = (e) => {
        props.filterData(fromDate, toDate);
        e.preventDefault();
    };
    const cancel = (e) => {
        props.closePopup(e);
        e.preventDefault();
    };

    useEffect(() => {

    }, []);

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*body*/}
                        <div className="rounded-lg shadow-lg bg-white-600 w-full h-112 p-5 antialiased justify-between border border-gray-200">
                            <div className="flex justify-between">
                                <h1 className="text-medium font-medium text-xl text-brand-secondary ">
                                    Filter {props.title}
                                </h1>
                                {/* <XIcon onClick={redirectTo} className="h-5 cursor-pointer" /> */}
                            </div>
                            <hr className="mt-2"></hr>

                            <div className="flex pt-2 w-full ">
                                <div className="w-full">

                                    <div className="lg:flex justify-between py-6 lg:space-x-10">
                                        <div className="relative w-52">
                                            <div className="flex">
                                                <DatePicker
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    dateFormat={"DD/MM/yyyy"}
                                                    placeholderText="Select From Date"
                                                    name="fromDate"
                                                    maxDate={new Date()}
                                                    className="peer text-xs h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                    onChange={(date) => {
                                                        setFromDate(moment(date).format("MM/DD/yyyy"))
                                                    }}
                                                    value={fromDate ? moment(fromDate).format('DD/MM/yyyy') : ''}
                                                />
                                            </div>
                                            <label
                                                for="firstName"
                                                className="absolute left-0 -top-3.5 text-gray-600  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm text-xs"
                                            >
                                                From Date
                                            </label>
                                        </div>
                                    </div>

                                    <div className="lg:flex justify-between py-6 lg:space-x-10">
                                        <div className="relative w-52">
                                            <div className="flex">
                                                <DatePicker
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    dateFormat={"DD/MM/yyyy"}
                                                    placeholderText="Select To Date"
                                                    name="toDate"
                                                    minDate={new Date(fromDate)}
                                                    className="peer text-xs h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                    onChange={(date) => {
                                                        setToDate(moment(date).format("MM/DD/yyyy"))
                                                    }}
                                                    value={toDate ? moment(toDate).format('DD/MM/yyyy') : ''}
                                                />
                                            </div>
                                            <label
                                                for="firstName"
                                                className="absolute left-0 -top-3.5 text-gray-600  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm text-xs"
                                            >
                                                To Date
                                            </label>
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
