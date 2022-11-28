import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
//import { getspeciality } from "../../Redux/Actions/doctAction";
//import { getallhospitallist, gethospitallist } from "../../Redux/Actions/HospitalAction";
//import hospitalservice from "../../Redux/services/hospitalservice";
import "react-datepicker/dist/react-datepicker.css";
//import DatePicker from "react-datepicker";
//import moment from "moment";
import Cheprofileservice from "../../Redux/services/Cheprofileservice";

export default function ViewNotification(props) {
    const dispatch = useDispatch();

    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();

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

    const save = (e) => {
        props.filterNotifications(fromDate, toDate);
        e.preventDefault();
    };
    const cancel = (e) => {
        props.closePopup(e);
        e.preventDefault();
    };

    useEffect(() => {
        if (props.notification) {
            let payload = props.notification;
            payload.status = 0;
            console.log('Payload : ' + JSON.stringify(payload));
            Cheprofileservice.updateNotification(payload).then((res) => {
                console.log(res);
                props.read(payload.id);
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
                                    View Notification
                                </h1>
                                <XIcon onClick={redirectTo} className="h-5 cursor-pointer" />
                            </div>
                            <hr className="mt-2"></hr>

                            <div className="flex pt-2 w-full ">
                                <div className="w-full">
                                    <div className="lg:flex justify-between py-2 lg:space-x-10">
                                        <div className="relative">
                                            <div className="flex">
                                                <label
                                                    id="from"
                                                    name="from"
                                                    className="peer h-10 mt-1 w-full border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"

                                                >
                                                    {props.notification.trigeredByName}
                                                </label>
                                            </div>
                                            <label
                                                for="firstName"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                From
                                            </label>
                                        </div>
                                    </div>

                                    <div className="lg:flex justify-between py-2 lg:space-x-10">
                                        <div className="relative">
                                            <div className="flex">
                                                <label
                                                    id="subject"
                                                    name="subject"
                                                    className="peer h-10 mt-1 w-full border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"

                                                >
                                                    {props.notification.subject}
                                                </label>
                                            </div>
                                            <label
                                                for="subject"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                Subject
                                            </label>
                                        </div>
                                    </div>

                                    <div className="lg:flex justify-between py-2 lg:space-x-10">
                                        <div className="relative">
                                            <div className="flex">
                                                <label
                                                    id="description"
                                                    name="description"
                                                    className="peer h-10 mt-1 w-full border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"

                                                >
                                                    {props.notification.content}
                                                </label>
                                            </div>
                                            <label
                                                for="description"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                Description
                                            </label>
                                        </div>
                                    </div>

                                    <div className="relative py-6">
                                        <div className="flex"></div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            onClick={cancel}
                                            className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
                                        >
                                            Close
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
