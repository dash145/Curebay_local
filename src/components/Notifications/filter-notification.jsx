import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
//import { getspeciality } from "../../Redux/Actions/doctAction";
//import { getallhospitallist, gethospitallist } from "../../Redux/Actions/HospitalAction";
//import hospitalservice from "../../Redux/services/hospitalservice";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import patientService from "../../Redux/services/patientService";

export default function NotificationsFilter(props) {
    const dispatch = useDispatch();

    const [patientsList, setPatientsList] = useState([]);
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [patient, setPatient] = useState();

    const redirectTo = (event) => {
        event.preventDefault();
        props.onClose();
    };

    const [filterlist, setfilterlist] = useState({});
    const handleChange = (e) => {
        console.log(e);
        return;
        setfilterlist({ ...filterlist, [e.target.name]: e.target.value });
        if (e.target.name == 'hospital') {
            //getHospitalLocations(e.target.value);
        }
    };

    const patientChanged = (e) => {
        setPatient(e.target.value);
    }

    const save = (e) => {
        props.filterNotifications(fromDate, toDate, patient);
        e.preventDefault();
    };
    const cancel = (e) => {
        props.closePopup(e);
        e.preventDefault();
    };

    useEffect(() => {
        if (props.patientFilter) {
            const hospitalid = localStorage.getItem("hospitalid");
            const locationid = localStorage.getItem("locationid");
            let payload = {
                hospitalId: hospitalid,
                locationId: locationid,
                status: 2
            }
            patientService.getallactivePatientdetails(payload).then((res) => {
                if (res.data) {
                    setPatientsList(res.data)
                    console.log(res.data.length)
                }
            }, (err) => {
                console.log(err);
            })
        }
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
                                <h1 className="text-medium font-medium text-2xl text-brand-secondary ">
                                    Filter Notifications
                                </h1>
                                <XIcon onClick={redirectTo} className="h-5 cursor-pointer" />
                            </div>
                            <hr className="mt-2"></hr>

                            <div className="flex pt-2 w-full ">
                                <div className="w-full">
                                    <div className="lg:flex justify-between py-6 lg:space-x-10">
                                        <div className="relative">
                                            <div className="flex">
                                                <DatePicker
                                                    dateFormat={"DD/MM/yyyy"}
                                                    placeholderText="Select From Date"
                                                    name="fromDate"
                                                    className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                    onChange={(date) => {
                                                        setFromDate(moment(date).format("MM/DD/yyyy"))
                                                    }}
                                                    value={fromDate ? moment(fromDate).format('DD/MM/yyyy') : ''}
                                                />
                                            </div>
                                            <label
                                                for="firstName"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                From Date
                                            </label>
                                        </div>
                                    </div>

                                    <div className="lg:flex justify-between py-6 lg:space-x-10">
                                        <div className="relative">
                                            <div className="flex">
                                                <DatePicker
                                                    dateFormat={"DD/MM/yyyy"}
                                                    placeholderText="Select To Date"
                                                    name="toDate"
                                                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                    onChange={(date) => {
                                                        setToDate(moment(date).format("MM/DD/yyyy"))
                                                    }}
                                                    value={toDate ? moment(toDate).format('DD/MM/yyyy') : ''}
                                                />
                                            </div>
                                            <label
                                                for="firstName"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                To Date
                                            </label>
                                        </div>
                                    </div>

                                    {props.patientFilter && (
                                        <div className="lg:flex justify-between py-6 lg:space-x-10">
                                            <div className="relative">
                                                <div className="flex">
                                                    <select
                                                        id="patient"
                                                        name="patient"
                                                        onChange={patientChanged}
                                                        className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600">
                                                        {
                                                            patientsList.length === 0 ? <option className="py-1 text-sm text-green-600" value="all"> All Patients </option> :
                                                                <>
                                                                    <option className="py-1 text-sm text-green-600" value="all"> All Patients </option>
                                                                    {patientsList.map((res, i) => (
                                                                        <option key={i} className="py-1 text-sm text-green-600" value={res.code}>{res.name}</option>
                                                                    ))}
                                                                </>}
                                                    </select>
                                                </div>
                                                <label
                                                    for="firstName"
                                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                                >
                                                    Patient
                                                </label>
                                            </div>
                                        </div>
                                    )}

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
