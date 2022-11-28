/* This example requires Tailwind CSS v2.0+ */
import React, { useEffect } from 'react'
import Userprofilesidebar from '../userprofilesidebar';
import { XIcon } from '@heroicons/react/outline'
import { useHistory, useLocation } from 'react-router-dom';
import { USERPROFILE_ROUTES } from '../../application/Router/constants/UserProfileRoutes';

function AppointmentDetails(props) {
    const history = useHistory();
    useEffect(() => {
        console.log("apptdetails", props)
        console.log(props.location.state.detail.consultationsReason);
    }, []);

    const redirectTo = (event, location) => {
        event.preventDefault();
        history.push(location)
    }

    return (
        <>

<ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base pl-10 pt-5">
                <li className="inline-flex items-center">
                    <a href="/">Home</a>
                    <svg
                        className="h-5 w-auto text-brand-secondary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </li>
                <li className="inline-flex items-center">
                    <a href="/components">Profile</a>
                    <svg
                        className="h-5 w-auto text-brand-secondary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </li>


                <li className="inline-flex items-center">
                    <a href="/components">My appointments</a>
                    <svg
                        className="h-5 w-auto text-brand-secondary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </li>
            </ul>
            <div className="flex justify-between ">
            <div className="lg:block hidden w-3/12 ml-6 mt-2">
                    <Userprofilesidebar></Userprofilesidebar>
                </div>
                <div className="lg:w-8/12  lg:mr-8 mt-5">
                    <div className="rounded-lg shadow-lg bg-white-600 w-2/3 h-112 p-5 mb-4 antialiased justify-between border border-gray-200">

                        <div className="flex justify-between my-2">
                            <p className="text-medium font-medium text-2xl  text-brand-secondary ">Appointments Details</p>
                            <XIcon  onClick={(e) => redirectTo(e, USERPROFILE_ROUTES.MYAPPOINTMENTS)} className="h-5 cursor-pointer" />
                        </div>
                        <hr classname="border-dash text-black w-10 mt-8 h-80 my-2 "></hr>
                        <div>
                            {/* <div className="flex pt-2 "> */}
                                <div className="my-2" >
                                    <div className="flex justify-between py-6 space-x-10 pr-8">
                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Patient Name" value={props.location.state.detail.patientName} />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Patient Name </label>
                                        </div>


                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Consultation Type" value={props.location.state.detail.consultationsType} />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Consultation Type </label>
                                        </div>

                                    </div>

                                    <div className="flex justify-between py-6 space-x-10 pr-8">
                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Consultation Mode" value={props.location.state.detail.consultationsType} />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Consultation Mode  </label>
                                        </div>


                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Status" value={props.location.state.detail.status} />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Status </label>
                                        </div>

                                    </div>

                                    <div className="flex justify-between py-6   ">
                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer  w-56 h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Date Of Consultation"  value={props.location.state.detail.whenAppointment} />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Date Of Consultation </label>
                                        </div>


                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-56  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="EnterTime of Consultation"  value={props.location.state.detail.fromTime}/>
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Time of Consultation </label>
                                        </div>

                                    </div>




                                    <div className="flex justify-between py-6 space-x-10 pr-8">
                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Doctor Name"  value={props.location.state.detail.userName} />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Doctor Name </label>
                                        </div>


                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Description"  value={props.location.state.detail.consultationsReason} />
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
                                        <button  onClick={(e) => redirectTo(e, USERPROFILE_ROUTES.MYAPPOINTMENTS)} className="bg-white text-brand-secondary p-2 rounded-xl mr-2">Cancel</button>
                                        <button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2">Re-Book </button>
                                    </div>


                                </div>














                            {/* </div> */}





                        </div>





                    </div>

                </div>
            </div>

        </>
    )
}
export default AppointmentDetails;
