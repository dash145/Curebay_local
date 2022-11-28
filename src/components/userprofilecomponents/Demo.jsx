import React, { useEffect } from 'react';
import { XIcon } from '@heroicons/react/outline'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { USERPROFILE_ROUTES } from '../../application/Router/constants/UserProfileRoutes';

function Demo(props) {

    const location = useLocation();
    const history = useHistory();
    const redirectTo = (event) => {
        event.preventDefault();
        // history.push(USERPROFILE_ROUTES.MYAPPOINTMENTS)
        history.goBack()
    };
    useEffect(() => {
        console.log("demodata", props)
        console.log(props.show)
    }, []);

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative lg:w-auto my-6 mx-auto lg:max-w-3xl w-11/12 ">
                    {/*content*/}
                    <div className="border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                        {/*body*/}
                        <div className="relative p-6 flex-auto">

                            <div className="flex justify-between my-2">

                                <p className="text-medium font-medium text-2xl  text-brand-secondary ">Appointments Details</p>

                                <XIcon onClick={() => { props.onHide() }} className="h-5 cursor-pointer" />
                            </div>
                            <hr classname="border-dash text-black w-10 mt-8 h-20 my-2 "></hr>
                            <div>
                                {/* <div className="flex pt-2 "> */}
                                <div className="my-2" >
                                    <div className="flex justify-between py-6 lg:space-x-10 space-x-4 pr-8">
                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Patient Name" value={props.appointmentdetails.patientName} />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Patient Name </label>
                                        </div>


                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="" value={props.appointmentdetails.consultationsType==="V" ?"Video" :"In Persons"} />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Consultation Type </label>
                                        </div>

                                    </div>

                                    <div className="flex justify-between py-6 lg:space-x-10 space-x-4 pr-8">
                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Consultation Mode" value={props.appointmentdetails.consultationsType} />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Consultation Mode  </label>
                                        </div>


                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Status" value={props.appointmentdetails.status} />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Status </label>
                                        </div>

                                    </div>

                                    <div className="flex justify-between py-6   ">
                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer  w-56 h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Date Of Consultattion" value={props.appointmentdetails.whenAppointment} />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Date Of Consultattion </label>
                                        </div>


                                        <div className="relative lg:-mr-3 -ml-14">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer lg:w-56 w-36  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="EnterTime of Consultation" value={props.appointmentdetails.fromTime} />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Time of Consultation </label>
                                        </div>

                                    </div>




                                    <div className="flex justify-between py-6 space-x-10 pr-8">
                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Doctor Name" value={props.appointmentdetails.userName} />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Doctor Name </label>
                                        </div>


                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Description" value={props.appointmentdetails.consultationsReason} />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Description </label>
                                        </div>

                                    </div>



                                    <div className="flex justify-between py-6 space-x-10 pr-8 ">
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

                                    </div>

                                    <div className="flex justify-end">
                                        <button onClick={() => props.onHide()} className="bg-white text-brand-secondary p-2 rounded-xl mr-2">Close</button>
                                        {/* <button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2">Re-Book </button> */}
                                    </div>


                                </div>




















                            </div>























                        </div>

                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default Demo;