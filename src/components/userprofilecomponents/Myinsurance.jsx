
import sort from '../../Assets/Images/sort.svg';
import arrow from '../../Assets/Images/arrow.alt.down.svg'
import arrowdown from '../../Assets/Images/arrow.download.svg';
import arrowup from '../../Assets/Images/arrow.up.svg';
import share from '../../Assets/Images/share-2.svg';
import More from '../../Assets/Images/More .png';
import { SearchIcon } from '@heroicons/react/outline'
import Userprofilesidebar from '../userprofilesidebar';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getmypriscriptionlist } from '../../Redux/Actions/UserprofileActions';
import FamilyDropdown from './FamilyDropDown';
import { useHistory, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../../application/Router/constants/AppRoutes';

function Myinsurance() {

    const history = useHistory();
    const location = useLocation();

    const dispatch = useDispatch();
    const userData = useSelector(state => state.authReducer.patientData)
    const patientCode = useSelector(state => state.authReducer.patientCode)
    console.log("userData", userData)

    const insuranceinfo = useSelector((state) => state.mypriscription);
    const { mypriscriptionData } = insuranceinfo;

    useEffect(() => {

        dispatch(getmypriscriptionlist(patientCode));

    }, [patientCode]);

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


            {/* breadcrumbs */}
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
                    <a href="/components">myreports</a>
                </li>
            </ul>

            <br />
            <div className="flex justify-between ">
                <div className="lg:block hidden w-3/12 ml-6 mt-2">
                    <Userprofilesidebar></Userprofilesidebar>
                </div>

                <div className="lg:w-8/12 lg:mr-12 mt-5 ">
                    <div className="flex flex-col">
                        <div className="-my-2  sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <FamilyDropdown title={'Get Insurance Info For'} />
                                <div className="lg:w-full mx-2  lg:rounded-md border ">
                                    <div className="flex justify-start my-2 lg:space-x-2">
                                        <SearchIcon className="h-6 w-8 ml-2 text-brand-secondary bg-transparent" />
                                        <input className="text-brand-secondary placeholder-brand-secondary" placeholder="search or filter" />
                                    </div>
                                    <hr classname="border-dash text-black mt-4 h-20 my-2"></hr>
                                    <div className="h-80 lg:w-full w-96 lg:mx-1  overflow-x-scroll hide-scroll-bar">
                                        <table className="lg:min-w-full  divide-y divide-gray-200 lg:px-2 text-gray-400">
                                            <thead className="">
                                                <tr>
                                                    <div className="flex ">
                                                        {/* <input type="radio" className="form-radio mt-2 my-2" name="accountType" value="personal" /> */}
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Description
                                                        </th>

                                                    </div>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Start Date
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        End Date
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Amount
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Action
                                                    </th>

                                                    {/* <th scope="col" className="relative px-6 py-3">
                                                        <span className="sr-only">Edit</span>
                                                    </th> */}
                                                </tr>
                                            </thead>
                                            {/* <tbody className=" divide-y divide-gray-200">
                                                <tr >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">

                                                            <div className=" flex space-x-2">
                                                                <input type="radio" className="form-radio mt-1 mr-2" name="accountType" value="personal" />
                                                                <div className="text-sm font-medium text-gray-500 ">Comprehensive metabolic panel.pdf</div>

                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500 "> 28 March,2021</div>

                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-500 ">
                                                            28 March,2021
                                                        </span>
                                                    </td>


                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-500 ">
                                                            ₹ 3,000/-
                                                        </span>
                                                    </td>
                                            
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <div className="flex space-x-4">
                                                            <img src={share}></img>
                                                            <img src={arrowdown} alt="filter" className="" />
                                                            <img src={More}></img>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody> */}
                                            No Data found
                                        </table>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-2">

                                    <button className="bg-brand-primary text-white p-2 rounded-xl ">Upload Insurance</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Myinsurance;