import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHistory, useLocation } from "react-router-dom";
import Patientprofileupbar from "./Patientprofileupbar";
import Patientprofilesidebar from "../Patientprofilesidebar";
import FamilyDropdown from "../../components/userprofilecomponents/FamilyDropDown";
import { getfilteredmedicalhistory, getmedicalhistory } from "../../Redux/Actions/UserprofilehealthrecordAction";
import Addmedicalhistory from "./Addmedicalhistory";
import Userprofilesidebar from "../userprofilesidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import FilterMedicalHistory from "./FilterMedicalHistory";
import moment from 'moment'
import { getLocalTime } from '../../Assets/utils/LocalTimeFormat'


function Seeallmedicalhistory() {

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [showFilter, setshowfilter] = useState(false);
  const medicalhitorylist = useSelector((state) => state.allmedicalhistorylist);
  const { medicalhistoryData } = medicalhitorylist;

  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };

  const filter = (event) => {
    event.preventDefault();
    setshowfilter(true);
  };

  const closeFilter = () => {
    setshowfilter(false);
  }

  const [showmedicalhistorypopup, setshowmedicalhistorypopup] = useState(false);

  const [editmedicalhistory, seteditmedicalhistory] = useState();

  const patientDetails = useSelector((state) => state.particularpatientdetails);
  const patientCode = useSelector((state) => state.authReducer.patientCode);

  const addmedicalhistory = (event, data) => {
    event.preventDefault();
    setshowmedicalhistorypopup(true);
    seteditmedicalhistory(data);
  };



  const [isPatientCode, setPatientCode] = useState(patientCode)
  const getMedicalHistoryFunc = () => {
    let patient = localStorage.getItem("patientprofile");
    console.log("patient", patientCode);

    dispatch(getmedicalhistory(patientCode));
  };


  const loadPaymentFor = (patientCode) => {

    setPatientCode(patientCode)
    dispatch(getmedicalhistory(patientCode));
  }

  useEffect(() => {
    getMedicalHistoryFunc();
  }, [dispatch]);

  useEffect(() => {
    getMedicalHistoryFunc();
  }, [patientDetails.memberCode]);


  const filterData = (fromDate, toDate) => {
    if (fromDate && toDate) {
      dispatch(getfilteredmedicalhistory(isPatientCode, fromDate, toDate));
    } else {
      dispatch(getmedicalhistory(isPatientCode));
    }
    setshowfilter(false);
  }
  return (
    <>
      <Patientprofileupbar></Patientprofileupbar>
      {/* breadcrumbs */}
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
          <a href="/profile/mymedicalhistory"> Medical History</a>
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
          <a>Get Medical History</a>
        </li>
      </ul>

      <div class="flex justify-between " style={{ backgroundColor: "#F8F8F8" }}>
        <div class="lg:block hidden w-3/12 ml-6 mt-6">
          <Userprofilesidebar></Userprofilesidebar>
        </div>

        <div class="hidden lg:block lg:w-8/12 lg:mr-16 ml-4 lg:ml-20 mt-6">
          <div className="flex flex-col">
            <div className="-my-2 sm:-mx-6 lg:-mx-8">
              <p className="mt-3 text-medium font-bold text-2xl text-gray-800">Medical History</p>
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 bg-white mt-4 border border-gray-200 ">
                <FamilyDropdown title="Get Medical history For" onSelect={loadPaymentFor} />
                <div className="shadow mx-2 overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
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
                  <div className="h-80 lg:w-full w-96 lg:mx-1  overflow-x-scroll hide-scroll-bar">
                    <table className="lg:min-w-full  divide-y divide-gray-200 lg:px-2 ">
                      <thead className="bg-gray-50">
                        <tr>
                          {/* <div className="flex "> */}
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Patientname
                          </th>

                          {/* </div> */}

                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Drescription
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
                        {medicalhistoryData.map((user, i) => (
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
                                    {user.patientName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap">
                              {user.description?.length > 30 ?
                                <div className="w-11/12 md:w-auto text-sm truncate text-gray-500 ">{user.description?.slice(0, 30)}<br />{user.description?.slice(30, 60)}<br />{user.description?.slice(60, 90)}<br />{user.description?.slice(90, 101)}</div>
                                :
                                <div className="w-11/12 md:w-auto text-sm truncate text-gray-500 ">{user.description}</div>
                              }
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap">
                              <span className="text-sm text-gray-500 ">
                                {getLocalTime(user.givenDate).split(" ")[0]}
                              </span>
                            </td>
                            {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">Upcoming</td> */}
                            {/* <td className="px-6 py-2 whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="flex space-x-2">


                                                                <PlusIcon onClick={(e)=>addmedicalhistory(e, '')} className="h-6  fill-brand-secondary cursor-pointer" />
                                                                <DotsVerticalIcon onClick={(e)=>addmedicalhistory(e, user)} className="cursor-pointer text-gray-secondary h-6  relative left-3" />

                                                            </div>
                                                        </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* <div className="flex justify-end mt-2">

                                    <button className="bg-brand-secondary  text-white py-3.5 px-6 font-medium rounded-xl mb-8">Upload Priscription </button>
                                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:hidden px-2 py-1">
          <div
            className="lg:hidden text-center -mt-6 mb-4 text-medium font-medium my-2 text-2xl "
            style={{ color: "#00A884" }}
          >
            My Medical History
          </div>
          <div className="lg:hidden w-full flex md:justify-center">
            <FamilyDropdown title="" onSelect={loadPaymentFor} />
          </div>
          {medicalhistoryData.map((user, i) => (
            <div className="flex flex-col md:w-11/12 m-auto" key={i}>
              <div className="flex flex-col gap-4 border-2 mb-3 rounded-lg border-gray-300 h-auto p-4 ">
                <div className="flex justify-between items-center">
                  <span className="w-1/2 text-xs font-medium text-gray-700 uppercase">
                    Patient Name :
                  </span>
                  <span className="w-1/2 text-sm font-medium text-gray-500 ">
                    {user.patientName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="w-1/2 text-xs font-medium text-gray-700 uppercase">
                    Description :
                  </span>
                  <span className="w-1/2 text-sm font-medium text-gray-500 ">
                    {user.description}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="w-1/2 text-xs font-medium text-gray-700 uppercase">
                    Date :
                  </span>
                  <span className="w-1/2 text-sm font-medium text-gray-500 ">
                    {getLocalTime(user.givenDate)?.split(" ")[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {showFilter && (
          <FilterMedicalHistory
            title="Medical History"
            filterData={filterData}
            closePopup={closeFilter}
            onClose={closeFilter} />
        )}
        {showmedicalhistorypopup ? (
          <Addmedicalhistory
            editmedicalhistory={editmedicalhistory}
            closePopup={() =>
              setshowmedicalhistorypopup(!showmedicalhistorypopup)
            }
          ></Addmedicalhistory>
        ) : null}
      </div>
    </>
  );
}
export default Seeallmedicalhistory;

// import React, { useEffect } from 'react'
// import { SearchIcon } from '@heroicons/react/outline'
// import Userprofilesidebar from '../userprofilesidebar';
// import { useDispatch, useSelector } from 'react-redux';
// import { getmypriscriptionlist } from '../../Redux/Actions/UserprofileActions';
// import { useHistory, useLocation } from 'react-router-dom';
// import { APP_ROUTES } from '../../application/Router/constants/AppRoutes';
// import FamilyDropdown from './FamilyDropDown';
// import { USERPROFILE_ROUTES } from '../../application/Router/constants/UserProfileRoutes';
// import { PlusIcon, DotsVerticalIcon } from '@heroicons/react/outline'

// function Seeallmedicalhistory() {
//     const history = useHistory();
//     const location = useLocation();

//     const dispatch = useDispatch();
//     const userData = useSelector(state => state.authReducer.patientData)

//     const medicalhistorylist = useSelector((state) => state.medicalhistory);
//     const { medicalhistoryData } = medicalhistorylist;

//     const redirectTo = (event, location) => {
//         event.preventDefault();
//         history.push(location);
//     }

//     useEffect(() => {

//         dispatch(getmypriscriptionlist(userData.code));
//     }, [userData.code]);

//     useEffect(() => {
//         if (!userData?.id) {
//             history.push({ pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } });
//         }
//     }, [userData.id, history, location]);

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
//                     <a href="/components">myreports</a>
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
//                             <div className="py-2 align-middle inline-block  sm:px-6 lg:px-8">
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
//                                 <FamilyDropdown title={'Get Medical history For'} />
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
//                                                         patientname
//                                                     </th>

//                                                     <th
//                                                         scope="col"
//                                                         className="lg:px-6 px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                                     >
//                                                         description
//                                                     </th>
//                                                     <th
//                                                         scope="col"
//                                                         className="lg:px-6 px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                                     >
//                                                         Date
//                                                     </th>
//                                                     <th
//                                                         scope="col"
//                                                         className="lg:px-6 px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                                     >
//                                                         Action
//                                                     </th>
//                                                     <th scope="col" className="relative lg:px-6  py-3">
//                                                         <span className="sr-only">Edit</span>
//                                                     </th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody className="bg-white  divide-y divide-gray-200 ">

//                                                 {medicalhistoryData.slice(0, 10).map((user, i) => (
//                                                     <tr >
//                                                         <td className="lg:px-6 px-2 w-10 px-2 py-4 lg:whitespace-nowrap">
//                                                             <div className="flex lg:space-x-6">
//                                                                 <input type="radio" className="form-radio mt-2 mr-2" name="accountType" value="personal" />
//                                                                 <div className="text-sm  font-medium text-gray-500 ">{user.patientName}</div>
//                                                             </div>
//                                                         </td>
//                                                         <td className="lg:px-6 px-2 py-4 lg:whitespace-nowrap">
//                                                             <div className="text-sm text-gray-500 ">{user.description}</div>

//                                                         </td>
//                                                         <td className="lg:px-6 px-2 py-4 lg:whitespace-nowrap">
//                                                             <span className="text-sm text-gray-500 ">
//                                                                 {user.givenDate}
//                                                             </span>
//                                                         </td>
//                                                         <td className="lg:px-6 px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                                             <div className="flex lg:space-x-4 space-x-2">
//                                                                 {/* <img src={share}></img>
//                                                             <img src={arrowdown} alt="filter" className="" />
//                                                             <img src={More}></img> */}
//                                                                 <PlusIcon onClick={(e) => redirectTo(e, USERPROFILE_ROUTES.ADD_MEDICAL)} className="h-5  fill-brand-secondary cursor-pointer" />
//                                                                 <DotsVerticalIcon onClick={(e) => redirectTo(e, USERPROFILE_ROUTES.ADD_MEDICAL)} className="cursor-pointer text-gray-secondary h-6  relative left-3" />
//                                                             </div>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
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
// export default Seeallmedicalhistory;
