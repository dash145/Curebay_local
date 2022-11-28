/* This example requires Tailwind CSS v2.0+ */
import React, { useEffect } from 'react'
import Userprofilesidebar from '../userprofilesidebar';
import { useHistory, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../../application/Router/constants/AppRoutes';
import { useSelector } from 'react-redux';

function Support() {


    const history = useHistory();
    const location = useLocation();



    const userData = useSelector(state => state.authReducer.patientData)
  

    // useEffect(() => {
     
    //     if (!userData?.id) {
    //         history.push({ pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } });
    //     }
    // }, [history, userData.id, location]);

    return (
        <>
            <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base pl-4 pt-5">
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
                    <a href="/support">Profile</a>
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
                    <a href="/support">Help & Support</a>

                    <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                    ></path>

                </li>

            </ul>
            <br />

            <div className="flex justify-between ">
                <div className="lg:block hidden w-3/12 ml-6 mt-2">
                    <Userprofilesidebar></Userprofilesidebar>
                </div>

                <div className="lg:w-8/12 w-full lg:mr-12 mt-5 ">
                    <div className="lg:rounded-lg bg-white-600 w-full h-112 p-5  justify-between lg:border border-gray-200">
                        <div>
                            <h1 className="text-medium font-medium text-2xl ">Support</h1>
                        </div>
                        <div>
                            <h1 className="text-medium font-normal text-lg  mt-2">To report an issues:</h1>
                        </div>
                        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                            <div className="relative pt-2">
                                <input autocomplete="off" id="email" name="email" type="text" className="peer  h-10 lg:w-6/12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Your Email" />
                                <label for="email" className="absolute left-0 -top-3.5 text-green-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-green-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-green-600 peer-focus:text-sm">Email Address</label>
                            </div>
                            <div className="relative pt-4">
                                <input autocomplete="off" id="password" name="password" type="text" className="peer  h-10 lg:w-6/12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Your Query" />
                                <label for="password" className="absolute left-0 -top-3.5 text-blue-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-blue-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm pt-3">Enter Your Query</label>
                            </div>
                            <div>
                                <h1 className="text-medium font-normal text-lg  mt-2">Note : for any Query You can call us at +91-8335 000 999</h1>
                            </div>
                            <div className="flex lg:justify-end">
                                <button className="bg-white text-brand-secondary p-2 rounded-xl mr-2">Clear</button>
                                <button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Support;
