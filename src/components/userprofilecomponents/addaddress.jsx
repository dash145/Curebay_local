import React, { useState, useEffect } from 'react'
import Userprofilesidebar from '../userprofilesidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientfamilymembers, getPatientDetails, addingpatientaddress } from '../../Redux/Actions/UserprofileActions';
import { XIcon } from '@heroicons/react/outline'
import { APP_ROUTES } from '../../application/Router/constants/AppRoutes';
import { USERPROFILE_ROUTES } from '../../application/Router/constants/UserProfileRoutes';
import { useHistory, useLocation } from 'react-router-dom';


function Addaddress(props) {

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.authReducer.patientData)
    console.log("userData", userData)

    const patientinfo = useSelector((state) => state.patientinfo);
    const { patientinfoData } = patientinfo
  
    const [showEditaddress] = useState(false);

    const redirectTo = (event) => {
        event.preventDefault();
        history.push(USERPROFILE_ROUTES.ADDADDRESS);
    };


    useEffect(() => {
        if (!userData?.id) {
            history.push({ pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } });
        }
        
    }, [history,location,userData.id]);



    const [addaddress, setaddaddress] = useState({
        patientId: patientinfoData.code,
        address1: "",
        address2: "",
        mobile: "",
        type: "Address",
        isDefault: 1,
        pinCode: "",
        state: "",
        city: "",
        country: "India",
        status: 1,
        createdDat: "2021-06-12 11:47:03",
        modifiedDate: "2021-07-21 04:47:00",
        createdBy: patientinfoData.code,
        modifiedBy: patientinfoData.code
    })

    useEffect(() => {
        dispatch(getPatientfamilymembers(userData.code));
        dispatch(getPatientDetails(userData.code));
    }, [dispatch,userData.code]);

    const handleChange = (e) => {
        setaddaddress({ ...addaddress, [e.target.name]: e.target.value });
    };


    const saveaddaddress = (e) => {
        e.preventDefault();
        dispatch(addingpatientaddress(addaddress))
        history.push(USERPROFILE_ROUTES.ADDADDRESS)
    }

    return (
        <>
            <ul className="flex text-brand-secondary text-sm lg:text-base pl-10 pt-5">
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
                    <a href="/components">My profile</a>
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
                <div className="w-3/12 ml-6 mt-2">
                    <Userprofilesidebar></Userprofilesidebar>
                </div>

                <div className="w-8/12 mr-12 mt-5 ">
                    <div>
                        <div className="rounded-lg shadow-lg bg-white-600 w-full h-112 p-5 antialiased justify-between border border-gray-200">
                            <div className="flex justify-between">

                                {
                                    showEditaddress ? <h1 className="text-medium font-medium text-2xl text-brand-secondary ">Edit Address</h1> :
                                        <h1 className="text-medium font-medium text-2xl text-brand-secondary ">Add New Address</h1>
                                }
                                {/* <h1 className="text-medium font-medium text-2xl text-brand-secondary ">Add New Address</h1> */}
                                <XIcon onClick={redirectTo} className="h-5 cursor-pointer" />
                            </div>
                            <hr className="mt-2"></hr>

                            <div className="flex pt-2 w-full ">
                                <div className="w-full" >
                                    <div className="lg:flex justify-between py-6">
                                        <div className="relative mb-6">
                                            <div className="flex">
                                                <input autocomplete="off" id="address1" name="address1" type="text" className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Street Name" value={addaddress.address1} onChange={handleChange} />
                                            </div>
                                            {/* <input autocomplete="off" id="email" name="email" type="text" value="Enter Name" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" /> */}

                                            <label for="address1" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">House Number/Street Name</label>
                                        </div>
                                        <div className="relative mb-6">
                                            <div className="flex">
                                                <input autocomplete="off" id="address2" name="address2" type="text" className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter address" value={addaddress.address2} onChange={handleChange} />

                                            </div>
                                            <label for="address2" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Address </label>
                                        </div>
                                        <div className="relative ">
                                            <div className="flex">
                                                <input autocomplete="off" id="pinCode" name="pinCode" type="number" className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Pincode" value={addaddress.pinCode} onChange={handleChange} />
                                            </div>
                                            <label for="pinCode" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Pincode</label>
                                        </div>

                                        {/* {showinput ? <input autocomplete="off" id="email" name="email" type="text" value="hello" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" /> : null}   */}
                                    </div>
                                    <div className="lg:flex justify-between lg:py-6">
                                        <div className="relative mb-6">
                                            <div className="flex">
                                                <input autocomplete="off" id="city" name="city" type="text" className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter City" value={addaddress.city} onChange={handleChange} />

                                            </div>
                                            {/* <input autocomplete="off" id="email" name="email" type="text" value="Enter Name" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" /> */}

                                            <label for="city" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">City</label>
                                        </div>
                                        <div className="relative mb-6">
                                            <div className="flex">
                                                <input autocomplete="off" id="state" name="state" type="text" className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter State" value={addaddress.state} onChange={handleChange}/>

                                            </div>
                                            <label for="state" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">State </label>
                                        </div>
                                        <div className="relative mb-6">
                                            <div className="flex">
                                                <input autocomplete="off" id="mobile" name="mobile" type="number" className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Mobile Number" value={addaddress.mobile} onChange={handleChange} />

                                            </div>
                                            <label for="mobile" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Mobile</label>
                                        </div>
                                        {/* {showinput ? <input autocomplete="off" id="email" name="email" type="text" value="hello" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" /> : null}   */}
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="submit" onClick={saveaddaddress} className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2">Save </button>
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

export default Addaddress;