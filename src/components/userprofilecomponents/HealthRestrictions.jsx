/* This example requires Tailwind CSS v2.0+ */
import React, { useEffect } from 'react'
import Userprofilesidebar from '../userprofilesidebar';
import steth from '../../Assets/Images/Ellipse 71.png';
import arrow from '../../Assets/Images/arrow.alt.down.svg'
import Dob from '../../Assets/Images/calendar.svg'
import { useHistory, useLocation } from 'react-router-dom';
import { USERPROFILE_ROUTES } from '../../application/Router/constants/UserProfileRoutes';
import close from '../../Assets/Images/closee.svg'
import { APP_ROUTES } from '../../application/Router/constants/AppRoutes';
import { useSelector } from 'react-redux';

function HealthRestriction() {

    const history = useHistory();
    const redirectTo = (event, location) => {
        event.preventDefault();
        history.push(location)
    }
    const goBack = () => {
        history.goBack();
    }


    const userData = useSelector(state => state.authReducer.patientData)
    console.log("userData", userData)

 
    const location = useLocation();

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
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative lg:w-5/12 my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-5 mb-4">
                    
                    <div className="flex justify-between">
                            <p className="text-medium font-medium text-2xl  text-brand-secondary cursor-pointer">Add Health Restrictions</p>
                            <div className="flex space-x-6 cursor-pointer">
                                <img src={close} alt="close" className="w-4" onClick={goBack} />
                            </div>
                        </div>
                        <hr classname="border-dash text-black w-10 mt-8 h-20 my-2 "></hr>
                        <div>
                            <div >
                                {/* <img src={select} alt="select" className="w-4 ml-3 " /> */}
                                <p className="text-black-900 font-medium text-lg mt-4">Personal Details</p>
                            </div>
                            <div className="flex pt-2 ">
                                <div className="w-11/12 " >
                                    <div className="flex justify-between py-6 space-x-10 ">
                                        <div className="relative">
                                            <div className="flex">
                                                {/* <input autocomplete="off" id="email" name="email" type="text" className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Name" /> */}
                                                <select className="lg:w-48  py-2 outline-none peer lg:w-full w-40  border-b-2 border-gray-300 ">
                                                    <option className="py-1  ">Enter Relationship</option>
                                                    <option className="py-1">Option 2</option>
                                                    <option className="py-1">Option 3</option>
                                                </select>

                                            </div>
                                            <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Record For</label>
                                        </div>
                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer lg:w-full w-40  h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="DD/MM/YYYY" />
                                                <img src={Dob} alt="my photo" className="relative right-5" ></img>
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Recorded On </label>
                                        </div>
                                    </div>
                                    <div >
                                        <p className="text-black-900 font-medium text-lg mt-2">Do you have any Health Restrictions?</p>
                                    </div>

                                    <div className=" flex space-x-10">
                                        <div className=" flex space-x-4 items-center py-2">
                                            <input type="radio" className="form-radio mt-1 mr-2" name="accountType" value="personal" />
                                            <div className="text-sm font-medium text-gray-500 ">Yes</div>

                                        </div>
                                        <div className=" flex space-x-4 items-center py-2">
                                            <input type="radio" className="form-radio mt-1 mr-2" name="accountType" value="personal" />
                                            <div className="text-sm font-medium text-gray-500 ">No</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between py-8 space-x-10 ">
                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer lg:w-full w-40  h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Allergy Name" />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Health Restriction Name </label>
                                        </div>

                                        <div className="relative lg:px-2">
                                            <div className="flex">
                                                {/* <input autocomplete="off" id="email" name="email" type="text" className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Name" /> */}
                                                <select className="lg:w-48 w-40 py-2 outline-none peer border-b-2 border-gray-300 ">
                                                    <option className="py-1 text-xs ">Please Select</option>
                                                    <option className="py-1">Option 2</option>
                                                    <option className="py-1">Option 3</option>
                                                </select>

                                            </div>

                                            <label for="email" className="absolute lg:left-3 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Record For</label>
                                        </div>
                                    </div>

                                    <div className="flex justify-between py-6 space-x-10 ">
                                        <div className="relative">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer lg:w-full w-40  h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Doctor Name" />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Doctor Name </label>
                                        </div>
                                        <div className="relative  ">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer lg:w-full w-40  h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="DD/MM/YYYY" />
                                                <img src={Dob} alt="my photo" className="relative right-5" ></img>
                                            </div>
                                            <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">End Date</label>
                                        </div>
                                    </div>

                                    <div className="flex space-x-10 py-8  ">

                                        <div className="relative  ">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer lg:w-full w-40 h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 " placeholder="Enter Information" />

                                            </div>
                                            <label for="password" className=" absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Additonal Notes</label>
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
export default HealthRestriction;
