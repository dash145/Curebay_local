import {
  DotsVerticalIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import Userprofilesidebar from "../userprofilesidebar";
import { useDispatch, useSelector } from "react-redux";

import { useHistory, useLocation } from "react-router-dom";
import FamilyDropdown from "../../components/userprofilecomponents/FamilyDropDown";
import { getFilteredPatientallergylist, getPatientallergylist } from "../../Redux/Actions/UserprofileActions";
import { USERPROFILE_ROUTES } from "../../application/Router/constants/UserProfileRoutes";
import AddAllergy from "../AddAllergy";
import moment from "moment";
import { getLocalTime } from '../../Assets/utils/LocalTimeFormat'
import Patientprofileupbar from "./Patientprofileupbar";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import FilterMedicalHistory from "./FilterMedicalHistory";



function Seeallallergy() {

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [showaddallergypopup, setshowaddallergypopup] = useState(false);
  const [editallergy, seteditallergy] = useState();

  const patientDetails = useSelector((state) => state.particularpatientdetails);
  const patientCode = useSelector((state) => state.authReducer.patientCode);

  const [isPatientCode, setPatientCode] = useState(patientCode)

  const [showFilter, setshowfilter] = useState(false);

  const addallergy = (event, data) => {
    event.preventDefault();
    setshowaddallergypopup(true);
    seteditallergy(data);
  };

  const patientallergylist = useSelector((state) => state.allallergylistM);
  const { allergyData } = patientallergylist;

  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };

  const getMedicalHistoryFunc = () => {

    dispatch(getPatientallergylist(patientCode));
  };

  useEffect(() => {
    getMedicalHistoryFunc();
  }, [dispatch]);

  useEffect(() => {
    getMedicalHistoryFunc();
  }, [patientDetails.memberCode]);

  const filter = (event) => {
    event.preventDefault();
    setshowfilter(true);
  };

  const closeFilter = () => {
    setshowfilter(false);
  }

  const filterData = (fromDate, toDate) => {
    if (fromDate && toDate) {
      dispatch(getFilteredPatientallergylist(isPatientCode, fromDate, toDate));
    } else {
      dispatch(getPatientallergylist(isPatientCode));
    }
    setshowfilter(false);
  }

  const loadPaymentFor = (patientCode) => {
    setPatientCode(patientCode)
    dispatch(getPatientallergylist(patientCode));
  }

  return (
    <>
      {/* breadcrumbs */}
      <Patientprofileupbar></Patientprofileupbar>
      <ul class="lg:flex hidden text-brand-secondary text-sm lg:text-base pl-10 pt-2">
        <li class="inline-flex items-center">
          <a href="/">Home</a>
          <svg
            class="h-5 w-auto text-brand-secondary"
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
        <li class="inline-flex items-center">
          <a href="/profile/mydetails"> Profile</a>
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


        <li class="inline-flex items-center">
          <a href="/profile/mymedicalhistory"> Medical History</a>
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
          <a >Allergies</a>
        </li>
      </ul>

      <div class="lg:flex justify-between -mt-14 md:mt-0" style={{ backgroundColor: "#F8F8F8" }}>
        <div class="lg:block hidden w-3/12 ml-6 mt-6">
          <Userprofilesidebar></Userprofilesidebar>
        </div>

        <div class="lg:w-8/12 lg:mr-16 md:ml-20 mt-6">
          <div className="flex flex-col">
            <div className="-my-2 sm:-mx-4 lg:-mx-8">
              <p className="mt-5 md:mt-3 ml-2 md:ml-0 text-medium font-bold text-2xl text-gray-800">Allergy Details</p>
              <div className="py-2 align-middle inline-block w-full sm:px-6 lg:px-8 bg-white mt-4 border border-gray-200">
                {/* <div className=" -mt-4 mb-6 text-center text-medium font-medium my-2 text-2xl " style={{ color: "#00A884" }}>
                  My Allergy Details
                </div> */}
                <FamilyDropdown title="Get Allergies For" onSelect={loadPaymentFor} />


                <>
                  <div className="shadow hidden md:block mx-2 overflow-hidden border-b border-gray-200 sm:rounded-lg ">
                    {/* <div class="flex justify-start my-2 space-x-2">
                                                    <SearchIcon className="h-6 w-8 ml-2 text-brand-secondary" />
                                                    <input className="text-brand-secondary placeholder-brand-secondary bg-transparent" placeholder="search or filter" />
                                                </div> */}
                    <div class="flex justify-end my-2 space-x-2">
                      {/*<SearchIcon className="h-6 w-8 ml-2 text-brand-secondary" />
                                                    <input className="text-brand-secondary placeholder-brand-secondary bg-transparent" placeholder="search or filter" />*/}
                      <button
                        onClick={filter}
                        class="bg-brand-secondary  rounded text-white mx-2 h-9 w-9"
                      >
                        <FontAwesomeIcon icon={faFilter} />
                      </button>
                    </div>
                    <hr classname="border-dash text-black mt-4 h-20 my-2"></hr>

                    {
                      allergyData.length === 0 ?
                        <div className="w-full h-52 flex my-auto  justify-center items-center" >
                          <p className="text-center    text-gray-400 ">
                            No allergies
                          </p>
                        </div>
                        :
                        <div className="h-80 lg:w-full lg:w-96 lg:mx-1  overflow-x-scroll">
                          <table className="lg:min-w-full  divide-y divide-gray-200 lg:px-2 ">
                            <thead className="bg-gray-50">
                              <tr>
                                <div className="flex ">
                                  {/* <input type="radio" class="form-radio mt-2 my-2" name="accountType" value="personal" /> */}
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Drug allergies
                                  </th>
                                </div>

                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  chemical allergies
                                </th>

                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  food allergies
                                </th>

                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Date
                                </th>
                                {/* <th
                                                                    scope="col"
                                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                >
                                                                    Action
                                                                </th> */}

                                {/* <th
                                                        scope="col"
                                                        className="pr-2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Action
                                                    </th> */}
                                {/* <th scope="col" className="relative px-6 py-3">
                                                        <span className="sr-only">Edit</span>
                                                    </th> */}
                              </tr>
                            </thead>


                            <tbody className="bg-white divide-y divide-gray-200">
                              <>
                                {allergyData.map((user, i) => (
                                  <tr className="border-b border-gray-200" key={i}>
                                    <td className="px-6 py-2 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <div className=" flex space-x-2">
                                          <input
                                            type="radio"
                                            class="form-radio mt-1 mr-2"
                                            name="accountType"
                                            value="personal"
                                          />

                                          <div className="text-sm font-medium text-gray-500 ">
                                            {user.drugAllergy?.slice(0, 25)}<br />{user.drugAllergy?.slice(25, 51)}
                                          </div>

                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-2 whitespace-nowrap">

                                      <div className="text-sm text-gray-500 ">

                                        {user.chemicalAllergy?.slice(0, 25)}<br />{user.chemicalAllergy?.slice(25, 51)}


                                      </div>

                                    </td>
                                    <td className="px-6 py-2 whitespace-nowrap">

                                      {user.foodAllergy?.length > 25 ?

                                        <div className="text-sm text-gray-500 ">
                                          {user.foodAllergy?.slice(0, 25)}<br />{user.foodAllergy?.slice(25, 51)}
                                        </div>
                                        :
                                        <div className="text-sm text-gray-500 ">
                                          {user.foodAllergy}
                                        </div>
                                      }

                                    </td>
                                    <td className="px-6 py-2 whitespace-nowrap">
                                      <span className="text-sm text-gray-500 ">
                                        {getLocalTime(user.givenDate).split(" ")[0]}
                                      </span>
                                    </td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">Upcoming</td> */}
                                    <td className="px-6 py-2 whitespace-nowrap text-right text-sm font-medium">
                                      <div className="flex space-x-2">
                                        {/*<PlusIcon onClick={(e) => addallergy(e, '')} className="h-6  fill-brand-secondary cursor-pointer" />*/}
                                        <PencilIcon
                                          onClick={(e) => addallergy(e, user)}
                                          className="cursor-pointer text-gray-secondary h-6  relative left-3"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </>
                            </tbody>
                          </table>
                        </div>
                    }
                  </div>
                  <div className="md:hidden">
                    <div>
                      {allergyData.map((user, i) => (
                        <div className="h-auto p-4 border-2 mb-3 rounded-lg border-gray-300" key={i}>
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex w-10/12 items-center">
                              {/* <p className=" text-gray-700 font-medium text-medium">
                                  Date :
                                </p> */}
                              <span className="font-medium text-gray-700 ">
                                {getLocalTime(user.givenDate)}
                              </span>
                            </div>
                            <div className="w-auto flex items-center gap-2 mr-1">
                              <span className="text-small font-medium text-green-500 " onClick={(e) => addallergy(e, user)}>
                                Edit
                              </span>
                              <PencilIcon
                                onClick={(e) => addallergy(e, user)}
                                className="w-auto cursor-pointer text-gray-secondary h-5 text-green-500"
                              />
                            </div>
                          </div>

                          <div className="flex justify-between items-center mb-1">
                            <p className="w-1/2  text-gray-700 font-medium text-medium">
                              Drug Allergy :
                            </p>
                            <span className=" w-1/2 font-medium text-gray-500 ">
                              {user.drugAllergy}
                            </span>
                          </div>

                          <div className="flex justify-between items-center mb-1">
                            <p className="w-1/2  text-gray-700 font-medium">
                              Chemical Allergy :
                            </p>
                            {user.chemicalAllergy ? (
                              <span className=" w-1/2 font-medium text-gray-500 ">
                                {user.chemicalAllergy}
                              </span>
                            ) : (
                              <span className=" w-1/2 font-medium text-gray-500 ">
                                NA
                              </span>
                            )}
                            {/* <span className=" w-1/2 font-medium text-gray-500 ">
                              {user.chemicalAllergy}
                              </span> */}
                          </div>

                          <div className="flex justify-between items-center mb-1">
                            <p className="w-1/2  text-gray-700 font-medium">
                              Food Allergy :
                            </p>
                            <span className=" w-1/2 font-medium text-gray-500 ">
                              {user.foodAllergy}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>

                {/* <div className="flex justify-end mt-2">

                                    <button className="bg-brand-secondary  text-white py-3.5 px-6 font-medium rounded-xl mb-8">Upload Priscription </button>
                                </div> */}
              </div>
            </div>
          </div>
        </div>

        {showaddallergypopup ? (
          <AddAllergy
            editallergy={editallergy}
            closePopup={() => setshowaddallergypopup(!showaddallergypopup)}
          ></AddAllergy>
        ) : null}

        {showFilter && (
          <FilterMedicalHistory
            title="Allergy Details"
            filterData={filterData}
            closePopup={closeFilter}
            onClose={closeFilter} />
        )
        }
      </div>
    </>
  );
}
export default Seeallallergy;

// import React, {useEffect } from 'react'
// import { SearchIcon } from '@heroicons/react/outline'
// import Userprofilesidebar from '../userprofilesidebar';
// import { useSelector } from 'react-redux';
// import { useHistory, useLocation } from 'react-router-dom';
// import { APP_ROUTES } from '../../application/Router/constants/AppRoutes';
// import FamilyDropdown from './FamilyDropDown';

// function Seeallallergy() {
//     const history = useHistory();
//     const location = useLocation();
//     const userData = useSelector(state => state.authReducer.patientData)
//     console.log("userData", userData)

//     const patientallergylist = useSelector((state) => state.allergylist);
//     const { allergyData } = patientallergylist;

//     useEffect(() => {
//         if (!userData?.id) {
//             history.push({ pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } });
//         }
//     }, [history,location,userData.id]);

//     return (
//         <>

//             {/* breadcrumbs */}
//             <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base pl-10 pt-5">
//                 <li className="inline-flex items-center">
//                     <a href="/">Home</a>
//                     <svg
//                         className="h-5 w-auto text-brand-secondary"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                     >
//                         <path
//                             fill-rule="evenodd"
//                             d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                             clip-rule="evenodd"
//                         ></path>
//                     </svg>
//                 </li>
//                 <li className="inline-flex items-center">
//                     <a href="/components">Profile</a>
//                     <svg
//                         className="h-5 w-auto text-brand-secondary"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                     >
//                         <path
//                             fill-rule="evenodd"
//                             d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                             clip-rule="evenodd"
//                         ></path>
//                     </svg>
//                 </li>
//                 <li className="inline-flex items-center">
//                     <a href="/components">seeallallergies</a>
//                 </li>
//             </ul>
//             <br />
//             <div className="flex justify-between ">
//                 <div className="lg:block hidden lg:w-3/12 w-full ml-6 mt-2">
//                     <Userprofilesidebar></Userprofilesidebar>
//                 </div>

//                 <div className="lg:w-8/12 w-full lg:mr-12 ml-4 mt-2 ">
//                     <div className="flex flex-col">
//                         <div className="lg:-mx-8">
//                             <div className=" align-middle inline-block  sm:px-6 lg:px-8 ">
//                                 {/* <div className="flex justify-between mt-2 pl-4 my-4">
//                                     <div className="flex pr-2">
//                                         <p className="text-medium font-medium text-2xl  text-brand-secondary">Get Reports For</p>
//                                         <div className="h-10 w-40 border border-gray-200 p-2 ml-4  rounded-lg flex space-x-6">
//                                             <select className="w-full   outline-none">
//                                                 <option className="py-1 text-sm text-green-600">{userData.firstName}</option>
//                                                 <option className="py-1">Option 1</option>
//                                                 <option className="py-1">Option 2</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                 </div> */}
//                                  <FamilyDropdown  title={'Get Allergies For'} />
//                                 <div className="lg:w-full lg:shadow-md lg:rounded-md border ">
//                                     <div className="flex justify-start my-2 lg:space-x-2">
//                                         <SearchIcon className="h-6 w-8 ml-2 text-brand-secondary" />
//                                         <p className="text-brand-secondary"> search or filter</p>
//                                     </div>

//                                     <hr classname="border-dash text-black mt-4 h-20 my-2"></hr>
//                                     <div className="h-80 overflow-x-scroll">
//                                         <table className="lg:min-w-full  divide-y divide-gray-200 lg:px-2 ">
//                                             <thead className="bg-gray-50">
//                                                 <tr>
//                                                     <th scope="col" className="lg:px-6 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                         Drugallergies
//                                                     </th>

//                                                     <th
//                                                         scope="col"
//                                                         className="lg:px-6 px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                                     >
//                                                         Chemicalallergies
//                                                     </th>
//                                                     <th
//                                                         scope="col"
//                                                         className="lg:px-6 px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                                     >
//                                                         Date
//                                                     </th>
//                                                     {/* <th scope="col" className="relative lg:px-6  py-3">
//                                                         <span className="sr-only">Edit</span>
//                                                     </th> */}
//                                                 </tr>
//                                             </thead>
//                                             <tbody className="bg-white  divide-y divide-gray-200 ">

//  {allergyData.slice(0, 10).map((user, i) => (
//                                                 <tr >
//                                                     <td className="lg:px-6 px-2 w-10 px-2 py-4 lg:whitespace-nowrap">
//                                                         <div className="flex lg:space-x-6">
//                                                             <input type="radio" className="form-radio mt-2 mr-2" name="accountType" value="personal" />
//                                                             <div className="text-sm  font-medium text-gray-500 ">{user.drugAllergy}</div>
//                                                         </div>
//                                                     </td>
//                                                     <td className="lg:px-6 px-2 py-4 lg:whitespace-nowrap">
//                                                         <div className="text-sm text-gray-500 ">{user.chemicalAllergy}</div>

//                                                     </td>
//                                                     <td className="lg:px-6 px-2 py-4 lg:whitespace-nowrap">
//                                                         <span className="text-sm text-gray-500 ">
//                                                             {user.givenDate}
//                                                         </span>
//                                                     </td>
//                                                 </tr>
//                                                      ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );

// }
// export default Seeallallergy;
