import sort from "../../Assets/Images/sort.svg";
import arrow from "../../Assets/Images/arrow.alt.down.svg";
import arrowdown from "../../Assets/Images/arrow.download.svg";
import arrowup from "../../Assets/Images/arrow.up.svg";
import share from "../../Assets/Images/share-2.svg";
import More from "../../Assets/Images/More .png";
import {
  DotsVerticalIcon,
  PlusIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Patientprofileupbar from "./Patientprofileupbar";
import Patientprofilesidebar from "../Patientprofilesidebar";
import FamilyDropdown from "../../components/userprofilecomponents/FamilyDropDown";
import { getPatientmedicationlist } from "../../Redux/Actions/UserprofilehealthrecordAction";
import Addmedication from "./Addmedication";
import Userprofilesidebar from "../userprofilesidebar";
import moment from "moment";
import {getLocalTime} from '../../Assets/utils/LocalTimeFormat'



function Seeallmedication() {
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  const medicationlist = useSelector((state) => state.allmedicationlist);
  const { medicationData } = medicationlist;

  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };

  const [showmedicationpopup, setshowmedicationpopup] = useState(false);
  const [editmedication, seteditmedication] = useState();

  const addmedication = (event, data) => {
    event.preventDefault();
    setshowmedicationpopup(true);
    seteditmedication(data);
  };
  const patientCode = useSelector((state) => state.authReducer.patientCode);

  const [isPatientCode,setPatientCode]=useState(patientCode)

  useEffect(() => {
    // let patient = localStorage.getItem("patientprofile")
    // console.log("patient", patientCode)

    dispatch(getPatientmedicationlist(patientCode));
  }, [dispatch]);

  const loadPaymentFor = (patientCode)=>{

    setPatientCode(patientCode)
    dispatch(getPatientmedicationlist(patientCode));
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
          <a>Medications History</a>
        </li>
      </ul>

      <div class="flex justify-between " style={{ backgroundColor: "#F8F8F8"}}>
        <div class="lg:block hidden w-3/12 ml-6 mt-6">
          <Userprofilesidebar></Userprofilesidebar>
        </div>

        <div class="hidden lg:block lg:w-8/12 lg:mr-16 ml-4 lg:ml-16 mt-6">
          <div className="flex flex-col">
            <div className="-my-2 sm:-mx-6 lg:-mx-8">
            <p className="mt-3 text-medium font-bold text-2xl text-gray-800">Medications History</p>
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 bg-white mt-4 border border-gray-200">
                <FamilyDropdown title="Get Medications For"   onSelect={loadPaymentFor}/>
                <div className="shadow mx-2 overflow-hidden border-b border-gray-200 sm:rounded-lg ">
                  {/* <div class="flex justify-start my-2 space-x-2">
                                        <SearchIcon className="h-6 w-8 ml-2 text-brand-secondary" />
                                        <input className="text-brand-secondary placeholder-brand-secondary bg-transparent" placeholder="search or filter" />
                                    </div> */}
                  <hr classname="border-dash text-black mt-4 h-20 my-2"></hr>
                  <div className="h-80 lg:w-full w-96 lg:mx-1  overflow-auto overflow-y-scroll scroll-bar bg-white ring-1 ring-gray-600 ring-opacity-5">
                    <table className="lg:min-w-full  divide-y divide-gray-200 lg:px-2 ">
                      <thead className="bg-gray-50">
                        <tr>
                          <div className="flex ">
                            {/* <input type="radio" class="form-radio mt-2 my-2" name="accountType" value="personal" /> */}
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Drugname
                            </th>
                          </div>

                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Dosage
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            From Date
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            To Date
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Action
                          </th>

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
                        {medicationData.map((user, i) => (
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
                                    {user.drugName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap">
                              <div className="text-sm text-gray-500 ">
                                {user.dosage}
                              </div>
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap">
                              <span className="text-sm text-gray-500 ">
                                {getLocalTime(user?.startCreatedTime)?.split(" ")[0]}
                              </span>
                            </td>

                            <td className="px-6 py-2 whitespace-nowrap">
                              <span className="text-sm text-gray-500 ">
                                {getLocalTime(user?.endCreatedTime)?.split(" ")[0]}
                              </span>
                            </td>

                            {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">Upcoming</td> */}
                            <td className="px-6 py-2 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex space-x-2">
                                {/* <img src={arrowdown} alt="filter" className="" />
                                                                <img src={More}></img> */}
                                <PlusIcon
                                  onClick={(e) => addmedication(e, "")}
                                  className="h-6  fill-brand-secondary cursor-pointer"
                                />
                                <DotsVerticalIcon
                                  onClick={(e) => addmedication(e, user)}
                                  className="cursor-pointer text-gray-secondary h-6  relative left-3"
                                />
                              </div>
                            </td>
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
        {showmedicationpopup ? (
          <Addmedication
            editmedication={editmedication}
            closePopup={() => setshowmedicationpopup(!showmedicationpopup)}
          ></Addmedication>
        ) : null}
      </div>

      <div
        className="lg:hidden text-center -mt-6 mb-4 text-medium font-medium my-2 text-2xl "
        style={{ color: "#00A884" }}
      >
        My Medication
      </div>
      <div className="lg:hidden w-full flex md:justify-center">
        <FamilyDropdown title="Get Medication For" className="lg:hidden" />
      </div>
      {medicationData.map((user, i) => (
        <div className="w-full md:w-9/12 m-auto lg:hidden px-2 py-1" key={i}>
          <div className="flex flex-col md:w-11/12 m-auto">
            <div className="flex flex-col gap-4 border-2 mb-3 rounded-lg border-gray-300 h-auto p-4 ">
              <div className="flex justify-between items-center">
                <span className="w-1/2 text-xs font-medium text-gray-700 uppercase">
                  Drug Name :
                </span>
                <span className="w-1/2 text-sm font-medium text-gray-500 ">
                  {user.drugName}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="w-1/2 text-xs font-medium text-gray-700 uppercase">
                  Dosage :
                </span>
                <span className="w-1/2 text-sm font-medium text-gray-500 ">
                  {user.dosage}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="w-1/2 text-xs font-medium text-gray-700 uppercase">
                  Date :
                </span>
                <span className="w-1/2 text-sm font-medium text-gray-500 ">
                  {getLocalTime(user?.givenDate)?.split(" ")[0]}
                </span>
              </div>
              <div className="flex w-full justify-end">
                <div className="flex space-x-2">
                  {/* <img src={arrowdown} alt="filter" className="" />
                                                                <img src={More}></img> */}
                  <PlusIcon
                    onClick={(e) => addmedication(e, "")}
                    className="h-6  fill-brand-secondary text-green-500 cursor-pointer"
                  />
                  <DotsVerticalIcon
                    onClick={(e) => addmedication(e, user)}
                    className="cursor-pointer text-gray-secondary text-green-500 h-6  relative left-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
export default Seeallmedication;
