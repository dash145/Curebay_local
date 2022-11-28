/* This example requires Tailwind CSS v2.0+ */
import React, { useEffect } from 'react'
import Userprofilesidebar from '../userprofilesidebar';
import steth from '../../Assets/Images/Ellipse 71.png';
import arrow from '../../Assets/Images/arrow.alt.down.svg'
import Dob from '../../Assets/Images/calendar.svg'
import { USERPROFILE_ROUTES } from '../../application/Router/constants/UserProfileRoutes';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { APP_ROUTES } from '../../application/Router/constants/AppRoutes';

function Addinsurance() {

    const history = useHistory();
    const redirectTo = (event, location) => {
        event.preventDefault();
        history.push(location)
    }


    const location = useLocation();

    const userData = useSelector(state => state.authReducer.patientData)
    console.log("userData", userData)

    useEffect(() => {
        if (userData?.id) {
            console.log("patientinfo", userData.code)

        }
        else {
            history.push({ pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } });
        }

    }, []);



    return (
     


        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-5/12 my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-5 mb-4">

                   

                            <div className="flex justify-between">

                                <p className="text-medium font-medium text-2xl  text-brand-secondary ">Add Insurance</p>

                                <p onClick={(e) => redirectTo(e, USERPROFILE_ROUTES.MYVITALS)} className="text-sm text-blue-900 font-medium pr-4 py-4">x</p>
                            </div>

                            <hr classname="border-dash text-black w-10 mt-4 h-20 my-2"></hr>

                            <div>




                                <div className="flex pt-2 ">


                                    <div className="w-11/12  " >

                                        <div className="">
                                            <p className="text-black-900 font-medium text-lg mt-4">Details</p>
                                        </div>

                                        <div className="flex justify-between py-6 space-x-10 ">
                                            <div className="relative">
                                                <div className="flex">
                                                    {/* <input autocomplete="off" id="email" name="email" type="text" className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Name" /> */}
                                                    <select className="w-48  py-2 outline-none peer text-gray-600 border-b-2 border-gray-300 ">
                                                        <option className="py-1  ">Enter Relationship</option>
                                                        <option className="py-1">Option 2</option>
                                                        <option className="py-1">Option 3</option>
                                                    </select>

                                                </div>


                                                <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Record For</label>
                                            </div>


                                            <div className="relative">
                                                <div className="flex ">
                                                    <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="DD/MM/YYYY" />
                                                    <img src={Dob} alt="my photo" ></img>



                                                </div>
                                                <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Recorded On </label>
                                            </div>

                                        </div>




                                        <div className="flex  py-6 space-x-28 ">
                                            <div className="relative">
                                                <div className="flex">
                                                    <input autocomplete="off" id="email" name="email" type="text" className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Amount" />


                                                </div>


                                                <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Sum Assured </label>
                                            </div>


                                            <div className="relative">
                                                <div className="flex ">
                                                    <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Please Select" />




                                                </div>
                                                <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Record Name </label>
                                            </div>

                                        </div>






                                        <div className="flex  py-6 space-x-28 ">
                                            <div className="relative">
                                                <div className="flex">
                                                    <input autocomplete="off" id="email" name="email" type="text" className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Record Id" />


                                                </div>


                                                <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Record ID </label>
                                            </div>


                                            <div className="relative">
                                                <div className="flex ">
                                                    <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter End Date" />
                                                    <img src={Dob} alt="my photo" ></img>




                                                </div>
                                                <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">End Date </label>
                                            </div>

                                        </div>






                                     


                                        <div className="flex  py-6 space-x-28 ">
                                            <div className="relative">
                                                <div className="flex">
                                                    <input autocomplete="off" id="email" name="email" type="text" className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Information" />


                                                </div>


                                                <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Additional Notes  </label>
                                            </div>




                                        </div>









                                        <div className="flex justify-end">

                                            <button onClick={(e) => redirectTo(e, USERPROFILE_ROUTES.MYVITALS)} className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2">Save Data </button>
                                        </div>


                                    </div>














                                </div>





                            </div>





                       






                    </div>



                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}
export default Addinsurance;
