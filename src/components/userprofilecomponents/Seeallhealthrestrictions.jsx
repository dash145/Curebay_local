import React, { useEffect } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import Userprofilesidebar from '../userprofilesidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getmypriscriptionlist, patientlabtestOrderlists, patientlabtestOrderreportlists } from '../../Redux/Actions/UserprofileActions';
import { useHistory, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../../application/Router/constants/AppRoutes';
import FamilyDropdown from './FamilyDropDown';
import { PlusIcon, DotsVerticalIcon } from '@heroicons/react/outline'
import { USERPROFILE_ROUTES } from '../../application/Router/constants/UserProfileRoutes';

function Seeallhealthrestrictions() {
    const history = useHistory();
    const location = useLocation();

    const dispatch = useDispatch();
    const userData = useSelector(state => state.authReducer.patientData)
    const medicationhistorylist = useSelector((state) => state.medicationhistory);
    const { medicationhistoryData } = medicationhistorylist;
   
    const redirectTo = (event, location) => {
        event.preventDefault();
        history.push(location);
    }


    useEffect(() => {

        dispatch(getmypriscriptionlist(userData.code));
        dispatch(patientlabtestOrderlists(userData.code));
        dispatch(patientlabtestOrderreportlists("363017082021081900996"))

    }, [dispatch,userData.code]);


    useEffect(() => {
        if (!userData?.id) {
            history.push({ pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } });
        }
    }, [history, location,userData?.id]);


    return (
        <>


            {/* breadcrumbs */}
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
                    <a href="/components">myreports</a>
                </li>
            </ul>
            <br />
            <div className="flex justify-between ">
                <div className="lg:block hidden lg:w-3/12 w-full ml-6 mt-2">
                    <Userprofilesidebar></Userprofilesidebar>
                </div>

                <div className="lg:w-8/12 w-full lg:mr-12 ml-4 mt-2 ">
                    <div className="flex flex-col">
                        <div className="lg:-mx-8">
                            <div className="py-2 align-middle inline-block  sm:px-6 lg:px-8">
                                {/* <div className="flex justify-between mt-2 pl-4 my-4">
                                    <div className="flex pr-2">
                                        <p className="text-medium font-medium text-2xl  text-brand-secondary">Get Reports For</p>
                                        <div className="h-10 w-40 border border-gray-200 p-2 ml-4  rounded-lg flex space-x-6">
                                            <select className="w-full   outline-none">
                                                <option className="py-1 text-sm text-green-600">{userData.firstName}</option>
                                                <option className="py-1">Option 1</option>
                                                <option className="py-1">Option 2</option>
                                            </select>
                                        </div>
                                    </div>
                                </div> */}
                                <FamilyDropdown title={'Get Health Restrictions For'} />
                                <div className="lg:w-full lg:shadow-md lg:rounded-md border ">
                                    <div className="flex justify-start my-2 lg:space-x-2">
                                        <SearchIcon className="h-6 w-8 ml-2 text-brand-secondary" />
                                        <p className="text-brand-secondary"> search or filter</p>
                                    </div>

                                    <hr classname="border-dash text-black mt-4 h-20 my-2"></hr>
                                    <div className="h-80 overflow-x-scroll">
                                        <table className="lg:min-w-full  divide-y divide-gray-200 lg:px-2 ">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="lg:px-6 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Drugname
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="lg:px-6 px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Dosage
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="lg:px-6 px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Date
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="lg:px-6 px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Action
                                                    </th>
                                                    <th scope="col" className="relative lg:px-6  py-3">
                                                        <span className="sr-only">Edit</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white  divide-y divide-gray-200 ">

                                                {medicationhistoryData.slice(0, 10).map((user, i) => (
                                                    <tr key={i}>
                                                        <td className="lg:px-6 px-2 w-10 px-2 py-4 lg:whitespace-nowrap">
                                                            <div className="flex lg:space-x-6">
                                                                <input type="radio" className="form-radio mt-2 mr-2" name="accountType" value="personal" />
                                                                <div className="text-sm  font-medium text-gray-500 ">{user.drugName}</div>
                                                            </div>
                                                        </td>
                                                        <td className="lg:px-6 px-2 py-4 lg:whitespace-nowrap">
                                                            <div className="text-sm text-gray-500 ">{user.dosage}</div>

                                                        </td>
                                                        <td className="lg:px-6 px-2 py-4 lg:whitespace-nowrap">
                                                            <span className="text-sm text-gray-500 ">
                                                                {user.givenDate}
                                                            </span>
                                                        </td>
                                                        <td className="lg:px-6 px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="flex lg:space-x-4 space-x-2">
                                                                {/* <img src={share}></img>
                                                            <img src={arrowdown} alt="filter" className="" />
                                                            <img src={More}></img> */}

                                                                <PlusIcon onClick={(e) => redirectTo(e, USERPROFILE_ROUTES.HEALTHRESTRICTIONS)} className="h-5  fill-brand-secondary cursor-pointer" />
                                                                <DotsVerticalIcon onClick={(e) => redirectTo(e, USERPROFILE_ROUTES.HEALTHRESTRICTIONS)} className="cursor-pointer text-gray-secondary h-6  relative left-3" />

                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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
export default Seeallhealthrestrictions;