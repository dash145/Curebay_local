//import Userprofilesidebar from '../../components/userprofilesidebar';

import React, { useState, useEffect } from "react";
import Patientprofilesidebar from "../Patientprofilesidebar";
import Patientprofileupbar from "./Patientprofileupbar";
import Userprofilesidebar from "../userprofilesidebar";
import { Link, useHistory, useLocation } from "react-router-dom";
import bethanyhospital from "../../Assets/Images/bethanyhospital.svg";
import { APP_ROUTES } from "../../application/Router/constants/AppRoutes";
import { getPatientMyRequests } from "../../Redux/Actions/UserprofileActions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Dropdown } from "react-bootstrap";
import { MenuIcon } from "@heroicons/react/outline";
import FamilyDropdown from './FamilyDropDown';

import { getLocalTime } from '../../Assets/utils/LocalTimeFormat'



function PatientprofileMyrequests() {
  const history = useHistory();

  const location = useLocation();

  const [showaddmemberpopup, setshowaddmemberpopup] = useState(false);

  const [show, setshow] = useState(true);

  const patientCode = useSelector((state) => state.authReducer.patientCode);

  const redirectTo = (event, code) => {
    event.preventDefault();
    history.push({
      pathname: `/HospitalBiodetails/${code.preferredHospitalAndClinics}`,
      state: code,
    });
    // history.push(location)
  };

  const dispatch = useDispatch();

  const viewnow = (event, code) => {
    event.preventDefault();
    // setshowaddmemberpopup(true)
    history.push({
      pathname: APP_ROUTES.ORDER_DETAILS,
      state: code,
    });
  };

  const myrequestpatient = useSelector((state) => state.myrequestpatient);
  const { patientrequestData, isLoading } = myrequestpatient;

  useEffect(() => {
    console.log("sdfnkdsnfjk", JSON.stringify(patientrequestData));
    let patient = localStorage.getItem("patientprofile");
    dispatch(getPatientMyRequests(patientCode));
  }, [dispatch]);

  const loadRequestFor = (code) => {
    dispatch(getPatientMyRequests(code));
  }

  return (
    <>
      <Patientprofileupbar></Patientprofileupbar>

      <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base mb-2 mt-0">
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
          <a href="/profile/mydetails">Profile</a>
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
          <a>My Request</a>
        </li>
      </ul>

      <br />

      <div class="flex justify-between " style={{ background: "#F8F8F8" }}>
        <div class="lg:block hidden w-3/12 ml-6 mt-3">
          <Userprofilesidebar></Userprofilesidebar>
        </div>
        <div class="lg:w-8/12 w-full lg:mr-16 lg:mt-6 ">
          <div className="mx-2">
            <div class="flex justify-between">
              <p class="flex text-medium font-bold text-2xl text-gray-800 mb-6">
                <div className="hidden lg:hidden relative  mr-4 ml-2 top-0">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="z-10">
                      <Userprofilesidebar />
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                My Requests
              </p>
            </div>
            {isLoading && patientrequestData.length === 0 && (
              <div className="flex relative flex-wrap items-center justify-center m-5">
                <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
              </div>
            )}

            <div className="bg-white  px-3 py-5 border border-gray-200">
              <div className='flex justify-between lg:items-center items-start'>
                <FamilyDropdown title="Get Request For" onSelect={loadRequestFor} />
              </div>
              {patientrequestData.length === 0 && !isLoading ? (
                <p className="text-center item-center mt-20 mb-20  text-gray-400 ">
                  No Request Available
                </p>
              ) : (
                <div className="bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 px-3 py-5 border border-gray-200">

                  {patientrequestData
                    .sort((a, b) => {
                      return (
                        moment(b.createdDate, "yyyy-MM-DD HH:mm:ss") -
                        moment(a.createdDate, "yyyy-MM-DD HH:mm:ss")
                      );
                    })
                    .map((user, i) => (
                      // <div class="rounded-lg shadow-lg bg-white-600 w-full h-112 p-5 antialiased justify-between border border-gray-200 mt-2 lg:pb-4 mb-10">

                      <div class="md:flex">
                        <div class="w-full pt-0 px-3 border border-gray-200 rounded-lg">
                          <div class="flex flex-col items-center mt-5">
                            <div
                              class="lg:w-1/3 flex sm:grid-cols-1"
                              style={{ height: "100px", width: "100px" }}
                            >
                              <img
                                src={
                                  user.hospitalPhoto
                                    ? process.env.REACT_APP_IMG_BASEURL + user.hospitalPhoto
                                    : bethanyhospital
                                }
                                alt="img1"
                                className="h-full w-full rounded-lg"
                              />
                            </div>
                            <p class="text-lg font-bold">{user.hospitalName}</p>
                            <div class="flex pr-5">
                              <p class="text-sm pt-1 text-brand-lightgreen font-medium  ">
                                Enquiry Form Submitted
                              </p>
                            </div>
                          </div>

                          <div className="w-full">
                            <p class="text-xs text-gray-800 pt-2 my-2 flex justify-between ">
                              <span className="w-20 md:w-1/2">Name{" "}</span>
                              <span className="text-xs text-gray-400 pl-2 md:pl-4 font-light w-1/2 md:w-4/12">
                                {user.name}
                              </span>
                            </p>

                            <p class="text-xs text-gray-800 my-2 flex justify-between ">
                              <span className="w-20 md:w-1/2">Request Id{" "}</span>
                              <span className="text-xs text-gray-400 pl-2 md:pl-4 font-light w-1/2 md:w-4/12">
                                {user.id}
                              </span>
                            </p>

                            <p class="text-xs text-gray-800 my-2 flex justify-between ">
                              <span className="w-20 md:w-1/2">Requested On{" "}</span>
                              <span className="text-xs text-gray-400 pl-2 md:pl-4 font-light w-1/2 md:w-4/12">
                                {getLocalTime(user.createdDate)}
                              </span>
                            </p>

                            <p class="text-xs text-gray-800 my-2 flex justify-between ">
                              <span className="w-20 md:w-1/2">Notes{" "}</span>
                              <span className="text-xs text-gray-400 pl-2 md:pl-4 font-light w-1/2 md:w-4/12">
                                {user.notes1}
                              </span>
                            </p>

                            {user.procedurePlannedStartDate != null && (
                              <p class="text-xs text-gray-800 my-2 flex justify-between ">
                                <span className="w-20 md:w-1/2">Planned Date of visit</span>
                                <span className="text-xs text-gray-400 pl-2 md:pl-4 font-light w-1/2 md:w-4/12">
                                  {user?.procedurePlannedDate != null ? getLocalTime(
                                    user?.procedurePlannedDate
                                  ).split(" ")[0] : ""}
                                </span>
                              </p>
                            )}

                            <p class="text-xs text-gray-800 my-2 flex justify-between ">
                              <span className="w-20 md:w-1/2">Approximate Amount for Procedure{" "}</span>
                              <span className="text-xs text-gray-400 pl-2 md:pl-4 font-light w-1/2 md:w-4/12">
                                <span></span> INR {user.quotatedAmount}
                              </span>
                            </p>

                            <p class="text-xs text-gray-800 my-2 flex justify-between ">
                              <span className="w-20 md:w-1/2">Procedure{" "}</span>
                              <span className="text-xs text-gray-400 pl-2 md:pl-4 font-light w-1/2 md:w-4/12">
                                {user.procedureName.length > 35
                                  ? `${user.procedureName.substring(0, 35)}…`
                                  : user.procedureName}
                              </span>
                            </p>


                              <p class="text-xs text-gray-800 pb-4 my-2 flex justify-between ">
                                <span className="w-20 md:w-1/2">Status{" "}</span>
                                <span className="text-xs text-gray-400 pl-2 md:pl-4 font-light w-1/2 md:w-4/12">

                                  {user.statusName}

                                </span>
                              </p>

                          </div>

                          {/*
                                                    <div class="flex justify-between pt-4">
                                                        <div class="flex space-x-3 mt-2">
                                                            <p class="text-base font-medium text-gray-600">Booking Amount : </p>
                                                            <p class="text-xl font-medium text-brand-lightgreen">₹6346.00</p>
                                                        </div>
                                                        <div>
                                                            <button onClick={(e) => redirectTo(e, APP_ROUTES.HOSPITAL_DETAILS)} className="bg-white border border-brand-primary text-gray-800 p-2 rounded-xl mr-2">View Details</button>
                                                            <button onClick={(e) => redirectTo(e, PATIENTPROFILE_ROUTES.MYREQUESTDETAILS)} className="bg-brand-secondary  text-sm text-white font-normal p-3 rounded-xl mr-2">Book Now</button>
                                                        </div>
                                                    </div> */}
                          {/* <div class="flex justify-end pt-4">
                                                                <div class="flex space-x-3 mt-2">
                                                                    <p class="text-base font-medium text-gray-600">Booking Amount : </p>
                                                            <p class="text-xl font-medium text-brand-lightgreen">₹6346.00</p>
                                                                </div>
                                                                <div>
                                                                    <button onClick={(e) => redirectTo(e, user)} className="bg-white border border-brand-primary text-gray-800 p-2 rounded-xl mr-2">View Details</button>
                                                                    <button onClick={(e) => redirectTo(e, PATIENTPROFILE_ROUTES.MYREQUESTDETAILS)} className="bg-brand-secondary  text-sm text-white font-normal p-3 rounded-xl mr-2">Book Now</button>
                                                                </div>
                                                            </div> */}
                        </div>
                      </div>

                      // </div>
                    ))}
                </div>
              )}
            </div>

            <div className="mb-20"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientprofileMyrequests;
