import sort from "../../Assets/Images/sort.svg";
import arrow from "../../Assets/Images/arrow.alt.down.svg";
import arrowdown from "../../Assets/Images/arrow.download.svg";
import arrowup from "../../Assets/Images/arrow.up.svg";
import share from "../../Assets/Images/share-2.svg";
import More from "../../Assets/Images/More .png";
import { SearchIcon } from "@heroicons/react/outline";
import React, { useState, useEffect, useRef } from "react";
import Userprofilesidebar from "../userprofilesidebar";
import { useDispatch, useSelector } from "react-redux";
import { getmypriscriptionlist } from "../../Redux/Actions/UserprofileActions";
import FamilyDropdown from "./FamilyDropDown";
import { useHistory, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../../application/Router/constants/AppRoutes";
import moment from "moment";
import http from "../../Redux/services/http-common";
import { encodeBase64File } from "../../helper/filebase64";
import { viewImage, DownloadImage } from "../../helper/ImageDownload";
import { getPatientAppointmentList } from "../../Redux/Actions/patientAction";
import { USERPROFILE_ROUTES } from "../../application/Router/constants/UserProfileRoutes";
import {getLocalTime} from '../../Assets/utils/LocalTimeFormat'


function Mypriscription() {
  const dispatch = useDispatch();
  const [appointmentlistData , setAppointmentListData] = useState([])
  const userData = useSelector((state) => state.authReducer.patientData);
  const patientCode = useSelector((state) => state.authReducer.patientCode);
  // const patientappointmentlist = useSelector(
  //   (state) => state.patientappointmentlist
  // );
  // const { appointmentlistData, isLoading } = patientappointmentlist;
  // const { patientDrugPrescriptionList, patientLabTestsList } = mypriscriptionData;
  const history = useHistory();

  useEffect(() => {
    let payload = {
      patientId: patientCode,
      status: 2,
    };
    dispatch(getPatientAppointmentList(payload)).then(res =>{
      setAppointmentListData(res)
    }).catch(err =>{
      console.log("error");
    })
  }, [patientCode]);

  const openFile = (data) => {
    let pdfWindow = window.open("");
    pdfWindow.document.write(
      "<iframe width='100%' height='100%' src='data:" +
      data.documentType +
      ";base64, " +
      encodeURI(data.document) +
      "'></iframe>"
    );
  };

  const gotoHistory = (e) => {
    e.preventDefault();
    history.push(USERPROFILE_ROUTES.MYDETAILS)
  }

  const loadprescriptionFor = (patient) =>{
    let payload = {
      patientId: patient,
      status: 2,
    };
    dispatch(getPatientAppointmentList(payload)).then(res =>{
      setAppointmentListData(res)
    }).catch(err =>{
      console.log("error");
    });
  }
console.log(appointmentlistData, "dsidoosdvsoidv");

  return (
    <>
      {/* breadcrumbs */}
      <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base mt-8 mb-2">
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
          <a >My Prescription</a>
        </li>
      </ul>

      <br />
      <div className="flex justify-between " style={{backgroundColor:"#F8F8F8"}}>
        <div className="lg:block hidden w-3/12 ml-6 mt-3">
          <Userprofilesidebar></Userprofilesidebar>
        </div>

        <div className="w-11/12 lg:w-7/12 xl:w-8/12 mx-auto lg:mr-12 mt-5 md:block block">
          <div className="flex flex-col">
            <p className="text-2xl font-bold text-gray-800 mb-5">My Prescription</p>
              <div className="py-2 bg-white align-middle inline-block min-w-full sm:px-6 lg:px-8 md:h-screen">
              <div className='flex justify-between  lg:items-center items-start mb-4'>
                <FamilyDropdown title="Get Prescription For" onSelect={loadprescriptionFor} />
                <div className='lg:mt-0 mt-2 hidden sm:block'>
                  <button className="text-black text-xs font-semibold p-2 px-8" style={{borderRadius:"5px",border:"1px solid #262626"}} onClick={(e) => { gotoHistory(e) }}>Go Back</button>
                </div>

                </div>
                <hr/>
                <div className="md:shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-4">
                  {/* <div className="flex justify-start my-2 space-x-2 shadow md:shadow-none">
                    <SearchIcon className="h-6 w-8 ml-2 text-brand-secondary" />
                    <input
                      className="text-brand-secondary  outline-none placeholder-brand-secondary bg-transparent"
                      placeholder="search or filter"
                    />
                  </div> */}
                  <hr classname="border-dash text-black mt-4 h-20 my-2"></hr>
                  <div className="h-full md:h-80 w-full sm:rounded-lg overflow-auto overflow-y-scroll scroll-bar bg-white ring-1 ring-gray-600 ring-opacity-5 custom-scroll ">


                  {

                    appointmentlistData?.length>0 ?

                  
                    <table className="w-full h-full md:h-28 md:divide-y md:divide-gray-200 table">
                      <thead className="bg-gray-50">
                        <tr>
                          <div className="flex justify-start">
                            <th
                              scope="col"
                              className="px-6 py-3 md:text-left text-xs font-normal text-black uppercase tracking-wider"
                            >
                              Reason for Consultation
                            </th>
                          </div>
                          <th
                            scope="col"
                            className="px-6 py-3 md:text-left text-xs font-normal text-black uppercase tracking-wider"
                          >
                            Doctor Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 md:text-left text-xs font-normal text-black uppercase tracking-wider"
                          >
                            Date
                          </th>

                          <th
                            scope="col"
                            className="pr-2 px-6 py-3 md:text-left text-xs font-normal text-black uppercase tracking-wider"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className=" md:divide-y divide-gray-200">
                        {appointmentlistData.length ? appointmentlistData.map((user, i) => (
                          <>
                          {user.status === 2 ? (
                          <tr>
                            <td data-label="Reason for Consultation" key={i} className="md:px-6 md:py-4">
                              <div className="flex justify-start items-center">
                                <div className=" flex md:space-x-2">
                                  {/* <input
                                    type="radio"
                                    class="form-radio mt-q mr-2 hidden md:block"
                                    name="accountType"
                                    value="personal"
                                  /> */}
                                  <div className="text-xs font-normal text-black ">
                                    {user.consultationsReason.charAt(0).toUpperCase()}{user.consultationsReason.slice(1)}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td data-label="Doctor Name" className="md:px-6 md:py-4 md:whitespace-nowrap">
                              <div className="flex md:justify-start items-center">
                                <div className=" flex space-x-2">
                                  <div className="text-xs font-normal text-black ">
                                    {user.userName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td data-label="Date" className="md:px-6 md:py-4 md:whitespace-nowrap">
                              <div className="flex md:justify-start text-xs text-black ">
                                {getLocalTime(user.createdDate)}

                              </div>
                            </td>
                            <td data-label="Action" className="md:px-6 md:py-4 whitespace-nowrap md:text-right text-xs font-normal">
                              <div className="flex md:justify-start space-x-4">


                                  <button
                                    onClick={() =>
                                      history.push({
                                        pathname: APP_ROUTES.POST_CONSULTATION,
                                        search: `?id=${user.id}`
                                      })
                                    }
                                    className="flex md:justify-start text-brand-secondary hover:text-brand-secondary"
                                  >
                                    Prescription
                                  </button>

                              </div>
                            </td>
                          </tr>
                          ):
                          <></>
                        }

                          </>
                        )): <></>}
                      </tbody>
                    </table>

                    :<div className="flex justify-center self-center mt-32 text-gray-400">
                      No Prescription available
                    </div>

                    }
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Mypriscription;
