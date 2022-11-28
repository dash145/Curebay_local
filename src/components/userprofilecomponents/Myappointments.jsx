/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../../application/Router/constants/AppRoutes";
import FamilyDropdown from './FamilyDropDown';
import AppointmentDetailspopup from "./Appointmentdetailspopup";
// import { getPatientAppointmentList } from "../../Redux/Actions/patientAction";
import RescheduleModal from "../../components/reShedculeModal";
import { removeUpdateSuccess, deleteAppointment } from "../../Redux/Actions/doctorAction";
import Patientprofileupbar from "./Patientprofileupbar";
import Userprofilesidebar from '../userprofilesidebar';
import Patientprofilesidebar from "../Patientprofilesidebar";
import CancelAppointmentPopup from './CancelAppointmentPopup';
import { USERPROFILE_ROUTES } from "../../application/Router/constants/UserProfileRoutes";
import patientService from "../../Redux/services/patientService";
import moment from "moment";
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';

import {getLocalTime} from '../../Assets/utils/LocalTimeFormat'
function Myappointments(props) {

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const [showCancelappointmentpopup, setshowCancelappointmentpopup] = useState(false);

  const [appointmentdetails, setappointmentdetails] = useState();
  const [isHide, setHide] = useState(true);
  const [isErrorMsg, setErrorMsg] = useState("");
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [appointmentlistData, setAppointmentlistData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const history = useHistory();
  const location = useLocation();
  const doctorAppointment = useSelector(state => state.doctorAppointment);
  const { success, isError } = doctorAppointment;
  const patientCode = useSelector(state => state.authReducer.patientCode);
  const [selectedUserCode , setSelectedUserCode] = useState(patientCode)

  const patientdetails = useSelector((state) => state.particularpatientdetails);

  useEffect(() => {

    console.log('locationlocation',JSON.stringify(location.state))
    if (success && showCancelDialog) {
      setShowCancelDialog(false)
    }
    if (isError && showCancelDialog) {
      setError("Something went wrong");
    }
    getPatientAppointment(selectedUserCode)
  }, [success, isError])


  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };

  const redirectToVideo = (event, location,data) => {


    event.preventDefault();
    history.push({ pathname: location, state: data })
  };

  const viewprofile = (e, doct) => {
    e.preventDefault();
    setShowModal(true);
    setappointmentdetails(doct);
  };

  const openModal = (val) => {
    setappointmentdetails(val);
    setHide(false);
  };


  const getPatientAppointment = (code) => {
    console.log(code, "chla");
    let payload = {
      patientId: code,
      photoRequired: "Y"
    }
    setLoading(true)
    patientService.getpatientappointmentlistFilter(payload).then(res => {
      if (res.data) {
        setAppointmentlistData(res.data)
        setLoading(false)

      }
    }).catch(err => {
      setLoading(false)

    })
  };

  const getFamilyMemberAppointment = (patientCode) => {
    setSelectedUserCode(patientCode)
    let payload = {
      patientId: patientCode,
    }
    setLoading(true)

    patientService.getpatientappointmentlistFilter(payload).then(res => {
      if (res.data) {
        setAppointmentlistData(res.data)
        setLoading(false)

      }
    }).catch(err => {
      setLoading(false)

    })
  }

  const onRescheduleModelClose = () => {
    setHide(true);
    // getPatientAppointment();
    dispatch(removeUpdateSuccess());
  };



  const confirmCancelDialog = (e, val) => {
    e.preventDefault();
    setappointmentdetails(val);
    setShowCancelDialog(true);
  }

  const confirmCancelAppointment = (reason) => {
    if (reason == "") {
      setErrorMsg("Please select reason")
      return
    }
    dispatch(deleteAppointment(appointmentdetails?.id, reason)).then((res) => {
      setShowCancelDialog(false)


    }).catch((err) => setErrorMsg(err?.response?.data?.details[0]));

  }

  const isTimeExceed = (data) => {
    let appointmentDate = new Date(`${data.whenAppointment} " " ${data.fromTime}`)
    let isAllowedToCancel = Math.floor((Date.now() - appointmentDate.getTime()) / 1000 / 60)
    console.log(isAllowedToCancel, "esfsdjvpsijvpid")
    if (isAllowedToCancel >= -4) {
      return false
    } else {
      return true
    }
  }

  const gotoHistory = (e) => {
    e.preventDefault();

    if(location.state==undefined){
      history.push(USERPROFILE_ROUTES.MYDETAILS)
    }else{
      history.push('/')
    }

  }
  // useEffect(() => {
  //   getPatientAppointment();
  // }, [patientCode]);

  const handlePayClick = (user) =>{
    console.log(user, "sdvsdouvbdsuovb");
    history.push({pathname: `/doctors/${user.userId}`, search: `?when=${user.whenAppointment}&from=${user.fromTime}&paid=no&id=${user.patientId}&reason=${user.consultationsReason}&rel=${user.relation}&key=${user.id}`})
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
          <a>My Appointments</a>
        </li>
      </ul>

      <br />


      <div className="flex justify-between " style={{ backgroundColor: "#F8F8F8" }}>
        <div className="lg:block hidden w-3/12 ml-6 mt-3">
          <Userprofilesidebar></Userprofilesidebar>
        </div>

        <div className="block lg:w-8/12 w-full  md:mr-4 lg:mr-16 lg:ml-0 mt-6">
          <div className="flex flex-col w-full">
            <p className="text-2xl font-bold text-gray-800 mb-5">My Appointments</p>
            <div className="py-2 px-3 bg-white border border-gray-200 md:h-screen align-middle inline-block w-full sm:px-6 lg:px-8">
              <div className='flex justify-between  lg:items-center items-start mb-4'>
                <FamilyDropdown
                  title={"Get Appointments For"}
                  onSelect={getFamilyMemberAppointment}
                />
                <div className='lg:mt-0 mt-2 hidden sm:block'>
                  <button className="text-black text-xs font-semibold p-2 px-8" style={{ borderRadius: "5px", border: "1px solid #262626" }} onClick={(e) => { gotoHistory(e) }}>Go Back</button>
                </div>

              </div>
              <hr />
              {
                isLoading && appointmentlistData.length === 0 &&
                <div className="flex relative flex-wrap items-center justify-center m-5">
                  <div className="loader " />
                </div>
              }

              {appointmentlistData.length === 0 ? (
                <p className="text-center item-center mt-40 mb-40 text-gray-400 ">
                  No appointments available
                </p>
              ) : (
                <>
                  <div className="block md:shadow w-full p-2  border-b border-gray-200 sm:rounded-lg mb-8 mt-4">
                    <hr className="hidden md:blockborder-dash text-black w-100 mt-4 h-120 my-2"></hr>
                    <div className="h-full md:h-80 w-full md:mx-1 overflow-auto overflow-y-scroll overflow-x-scroll scroll-bar bg-white ring-1 ring-gray-600 ring-opacity-5">
                      <table className="max-w-full h-full md:h-28 md:divide-y md:divide-gray-200 table">
                        <thead className="bg-gray-50">
                          <tr>
                            <div className="flex ">
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-normal  text-neutral-800 uppercase tracking-wider"
                              >
                                Description
                              </th>

                            </div>
                            <th
                              scope="col"
                              className="px-6 py-3 text-center text-xs font-normal text-neutral-800 uppercase tracking-wider"
                            >
                              Doctor Name
                            </th>

                            <th
                              scope="col"
                              className="px-6 py-3 text-center text-xs font-normal text-neutral-800 uppercase tracking-wider"
                            >
                              Type
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-center text-xs font-normal text-neutral-800 uppercase tracking-wider"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-center text-xs font-normal text-neutral-800 uppercase tracking-wider"
                            >
                              Status
                            </th>

                            <th
                              scope="col"
                              className="pr-2 px-6 py-3 text-center text-xs font-normal text-neutral-800 uppercase tracking-wider"
                            >
                              Action
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className=" md:divide-y divide-gray-200">
                          {appointmentlistData.map((user, i) => (
                            <tr className="" key={i}>
                              {/* grid grid-cols-2 gap-4 md:block */}
                              <td data-label="Description" className=" md:px-6 md:py-4">
                                <div className="flex w-auto">
                                  <div className=" flex md:space-x-2"> 
                                    {/* <input
                                        type="radio"
                                        className="hidden md:block form-radio mt-q mr-2"
                                        name="accountType"
                                        value="personal"
                                      /> */}
                                      {user.consultationsReason?.length > 15 ?
                                    <div className="text-xs font-normal text-neutral-800 ">
                                      
                                      {user.consultationsReason.charAt(0).toUpperCase()}{user.consultationsReason.slice(1).slice(1, 30)}<br/>{user.consultationsReason.slice(30, 60)}<br/>{user.consultationsReason.slice(60, 90)}<br/>{user.consultationsReason.slice(90, 100)}
                            
                                    </div>
                                    :
                                    <div className="text-xs font-normal text-neutral-800 ">
                                      
                                      {user.consultationsReason.charAt(0).toUpperCase()}{user.consultationsReason.slice(1)}
                            
                                    </div>
}
                                  </div>
                                </div>
                              </td>
                              <td data-label="Doctor Name" className="md:px-6 md:py-4 md:whitespace-nowrap">
                                <div className="flex  md:justify-start">
                                  <div className=" flex space-x-2">

                                    <div className="text-xs font-normal text-neutral-800 ">
                                      {user.userName}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td data-label="Type" className="md:px-6 md:py-4 md:whitespace-nowrap">
                                <div className="flex md:justify-start text-xs text-neutral-800 ">
                                  {user.consultationsType == 'A' ? 'Audio Consultation' : user.consultationsType == 'V' ? 'Video Consultation' : user.consultationsType == 'Q' ? 'Quick Consultation' : 'In-person Consultation'}
                                </div>
                              </td>
                              <td data-label="Date" className="md:px-6 md:py-4 md:whitespace-nowrap">
                                <div className="flex md:justify-start text-xs text-neutral-800 ">
                                  {getLocalTime(user.createdDate)}
                                </div>
                              </td>
                              <td data-label="Status" className=" md:px-6 md:py-4 whitespace-nowrap text-neutral-800 ">
                                {(user.status === 1 || user.status === 14 || user.status === 15)  ? <div className="text-xs">Pending</div> : (user.status === 3 || user.status === 16) ? <div  className="text-xs">Cancelled</div> : user.status === 9 ? <div  className="text-xs">Expired</div> : user.status === 2 ?<div  className="text-xs">Completed</div> :  <div></div>}
                              </td>


                              <td data-label="Action" className="md:px-6 md:py-4 whitespace-nowrap md:text-right">
                                <div className="grid grid-cols-1 gap-1 mt-1 md:mt-0 md:gap-0 items-start md:flex md:justify-start md:space-x-4  text-xs font-normal md:flex-nowrap">
                                  <button
                                    onClick={(e) => viewprofile(e, user)}
                                    className="w-auto text-left md:w-1/3 md:mr-2 text-brand-secondary hover:text-brand-secondary"
                                  >
                                    View
                                  </button>

                                  { user.status === 15 && <button
                                    onClick={(e) => handlePayClick(user)}
                                    className="w-auto text-left md:w-1/3 md:mr-2 text-brand-secondary hover:text-brand-secondary"
                                  >
                                    Pay
                                  </button>}




                                  {/* {user.status === 2 && */}
                                  <button
                                    onClick={() => history.push({ pathname: APP_ROUTES.POST_CONSULTATION, search: `?id=${user.id}` })}
                                    disabled={user.status !== 2}
                                    className="w-auto text-left md:w-1/3 md:mr-2 disabled:opacity-50 text-brand-secondary hover:text-brand-secondary"
                                  >
                                    Prescription
                                  </button>

                                  { user?.isConfirm !== "1" && <button
                                    onClick={() => openModal(user)}
                                    disabled={user.status !== 1}
                                    className="w-auto text-left md:w-1/3 md:mr-2 disabled:opacity-50 text-brand-secondary hover:text-brand-secondary"
                                  >
                                    Reschedule
                                  </button>}

                                  { user?.isConfirm !== "1" && <button
                                    onClick={(e) => confirmCancelDialog(e, user)}
                                    className="w-auto text-left md:w-1/3 md:mr-2 text-brand-secondary disabled:opacity-50 hover:text-brand-secondary"
                                    disabled={user.status !== 1 || !isTimeExceed(user)}
                                  >
                                    Cancel
                                  </button>}


                                </div>
                              </td>
{/*

                              <td data-label="Action" className="md:px-6 md:py-4 whitespace-nowrap md:text-right">

                              {
                                                            user.status == 8 ? <div></div> : user.status == 2 ?
                                                            <div></div> : user.status == 3 ? <div></div> : user.status == 4 ?
                                                            <div></div> : user.status == 5 ? <div></div> : user.status == 1 ?
                                                                        <div>
                                                                            {user.consultationsType === "V" &&
                                                                                <div onClick={(e) => redirectToVideo(e, APP_ROUTES.VIDEO_CALL, user)}
                                                                                    className="flex flex-col items-center bg-green-200 rounded-lg border border-blue-300 cursor-pointer mr-5">

                                                                                    <div className="text-brand-primary">

                                                                                        <VideoCameraFrontIcon className="h-16" />

                                                                                    </div>
                                                                                    <button
                                                                                        //disabled={checkJoinCallTime(user)}

                                                                                        className=" text-xs  text-brand-primary font-normal px-2 rounded-lg disabled:opacity-50"
                                                                                    >Join</button>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                        : <div></div>
                                                        }
                              </td> */}

                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {/* <div className="flex lg:justify-end">
                  <button
                    onClick={(e) => redirectTo(e, APP_ROUTES.DASHBOARD)}
                    className="bg-brand-secondary  text-white py-3.5 px-6 font-medium rounded-xl mb-8"
                  >
                    Back to Dashboard{" "}
                  </button>
                </div> */}
            </div>
          </div>
        </div>
      </div>

      {!isHide && (
        <RescheduleModal
          data={appointmentdetails}
          onClose={() => onRescheduleModelClose()}
        />
      )}

      {showModal ? (
        <AppointmentDetailspopup
          appointmentdetails={appointmentdetails}
          closePopup={() => {
            setShowModal(!showModal);
            onRescheduleModelClose();
          }}
          isVisible={isTimeExceed(appointmentdetails)}
        ></AppointmentDetailspopup>
      ) : null}
      {showCancelDialog ?
        <CancelAppointmentPopup

          isErrorMsg={isErrorMsg}

          onCancel={confirmCancelAppointment}
          isLoading={isLoading}
          close={() => {
            setShowCancelDialog(false);
            setErrorMsg("");
          }}
        /> : null}
    </>

  );
}
export default Myappointments;
