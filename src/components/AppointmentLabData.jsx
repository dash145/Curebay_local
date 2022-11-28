import React, { useState, useEffect } from 'react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import noDataFound from "../Assets/Images/No data-found.svg";
import { APP_ROUTES } from '../application/Router/constants/AppRoutes'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Menu } from '@headlessui/react'
import RescheduleModal from '../components/reShedculeModal';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import AppointmentDetailspopup from './userprofilecomponents/Appointmentdetailspopup';
import { getPatientAppointmentList } from '../Redux/Actions/patientAction';
import { removeUpdateSuccess, deleteAppointment } from "../Redux/Actions/doctorAction";
import CancelAppointmentPopup from './userprofilecomponents/CancelAppointmentPopup';
import {getPatientLabTestsList} from '../Redux/Actions/UserprofileActions'
function AppointmentLabData(props) {
    const history = useHistory();
    const [screen, setscreen] = useState(window.innerWidth);
    const [isHide, setHide] = useState(true);
    const [ap_Data, setData] = useState({});
    const [appointmentdetails, setappointmentdetails] = useState();
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [isErrorMsg, setErrorMsg] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [data, setLabData] = useState([])
    const userData = useSelector((state) => state.authReducer.patientData);
    const patientappointmentlist = useSelector((state) => state.patientappointmentlist);
    const { appointmentlistData, isLoading } = patientappointmentlist;
    const myordersinfo = useSelector((state) => state.myorders);
    const { MyordersData } = myordersinfo;
    const patientCode = useSelector(state => state.authReducer.patientCode);

    const dispatch = useDispatch();

    const redirectTo = (event, location, data) => {
        event.preventDefault();
        history.push({ pathname: location, state: data })
    }

    const { type } = props;
    const openModal = (val) => {
        setData(val)
        setTimeout(() => {
            setHide(false);
        }, (1500));
    }

    const confirmCancelDialog = (e, val) => {
        e.preventDefault();
        setappointmentdetails(val);
        setShowCancelDialog(true);
    }

    console.log(data, "datatabaskh")
    // console.log("azxsdcvf", user)

    console.log("apppppppp", patientappointmentlist);

    useEffect(() => {
        const updateWindowDimensions = () => {
            const newWidth = window.innerWidth;

            setscreen(newWidth);
        };

        window.addEventListener("resize", updateWindowDimensions);
        return () => window.removeEventListener("resize", updateWindowDimensions);
    }, []);

    useEffect(() =>{
        dispatch(getPatientLabTestsList(userData.code)).then((data) =>{
            let result = data?.filter(item => item.procedureStatus !== -1)
            setLabData(result)
          })
    },[])

    console.log(MyordersData, "MyordersDatashvsdouihvsd");

    return (
        <>
        <div>
                    {data.filter(x => type === "appointment" ? x?.whenAppointment >= moment().format('MM/DD/yyyy') : x?.patientLabTestsOrderDetailsList?.length > 0).filter(x => x.status !== 2).slice(0, 2).map((user, i) => (
                        <div key={i}>
                            {user.status == 3 || user.status == 4 || user.status == 5 || user.status == 9 ?
                                <div className="hidden"></div>
                                :
                                <div className="flex items-center gap-2 py-2 px-4">
                                    <div>
                                        <img className="h-12" src={props.img} alt="" />
                                    </div>
                                    <div className="flex items-center justify-around lg:justify-between flex-wrap msx-3 my-1  font-normal w-full">
                                        <div className="">
                                            <div className="w-32 truncate text-sm">
                                                {type === "appointment" ? <span>{user.userSalutation}{user.userName}</span> : <span>{user?.patientLabTestsOrderDetailsList[0]?.labTestName}</span>}
                                            </div>
                                            <div className="flex ">
                                                <div className="bg-brand-cerulean mt-1   text-sm text-white rounded-xl h-4 content-center flex flex-wrap p-2 ">
                                                    {'Self'}
                                                </div>
                                                <div>
                                                    {type === "appointment" ? <p className="px-1  font-normal text-sm">{user.consultationsType === "V" ? 'Online' : "InPerson"}</p> : ''}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap " >
                                            <div className=" flex font-semibold  text-right text-sm">
                                                <div className=" flex mb-1">
                                                    {type === "appointment" ? <span className="flex text-brand-lightgreen text-right font-semibold  text-sm">


                                                        {
                                                            user.status == 8 ? "" : user.status == 2 ?
                                                                "" : user.status == 3 ? "" : user.status == 4 ?
                                                                    "" : user.status == 5 ? "" : user.status == 1 ?
                                                                        <div onClick={(e) => redirectTo(e, APP_ROUTES.VIDEO_CALL, user)}
                                                                            className="flex flex-col items-center bg-green-200 rounded-lg border border-blue-300 cursor-pointer mr-5">
                                                                            <div className="text-brand-primary">
                                                                                <VideoCameraFrontIcon className="h-16" />
                                                                            </div>
                                                                            <button
                                                                                //disabled={checkJoinCallTime(user)}

                                                                                className=" text-xs  text-brand-primary font-normal px-2 rounded-lg disabled:opacity-50"
                                                                            >Join</button>
                                                                        </div>
                                                                        : ""
                                                        }
                                                        <div className="flex flex-col items-center mr-2">
                                                            {/* {moment().format('DD/MM/yyyy') === user.whenAppointment ? 'Today' : moment().format('DD/MM/yyyy') } */}
                                                            <p>{user.whenAppointment}</p>
                                                            <div className="text-xs mx-2 text-gray-800">
                                                                {type === "appointment" ? <p > {moment(user.fromTime, 'hh:mm').format("hh:mm A")}</p> : <p > {moment(user?.preferDateTime, 'yyyy-MM-DD HH:mm:ss').format("hh:mm A")}</p>}

                                                            </div>
                                                        </div>
                                                    </span> : <span className="text-brand-lightgreen text-right font-semibold  ">
                                                        {moment().isSame(user?.patientLabTestsOrderDetailsList[0]?.preferDateTime, 'date') ? 'Today' : 'Upcoming'}
                                                    </span>}
                                                </div>
                                                {/* <div className="text-xs">
                                        {type === "appointment" ? <p > {moment(user.fromTime, 'hh:mm').format("hh:mm A")}</p> : <p > {moment(user?.preferDateTime, 'yyyy-MM-DD HH:mm:ss').format("hh:mm A")}</p>}
                                    </div> */}
                                            </div>
                                            <div>
                                                <Menu as="div" className="lg:block relative">
                                                    {({ open }) => (
                                                        <>
                                                            {type === "appointment" &&
                                                                <div>
                                                                    <div>
                                                                        <Menu.Button className={` py-2 flex text-sm rounded-full focus:outline-none`}>
                                                                            <DotsVerticalIcon className="cursor-pointer text-gray-secondary h-6 mt-2 relative left-3" />
                                                                        </Menu.Button>
                                                                    </div>
                                                                    {type === "appointment" && open &&
                                                                        <Menu.Items static className="z-10 origin-top-right absolute right-0 p-2 top-0 mr-2 rounded-md shadow-xl py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none border border-blue-200 w-48">
                                                                            {moment().format('DD/MM/yyyy') === user.whenAppointment && moment().subtract(5, 'minutes').format("hh:mm A") === moment(user.fromTime, 'hh:mm').format("hh:mm A") && < Menu.Item tabIndex={1} className=" my-1 cursor-pointer" onClick={(e) => redirectTo(e, APP_ROUTES.VIDEO_CALL, user)}>
                                                                                <p>Join Now</p>
                                                                            </Menu.Item>}
                                                                            <Menu.Item onClick={() => openModal(user)} tabIndex={2} className="text-brand-primary border-b my-1 cursor-pointer">
                                                                                <p>Reschedule</p>
                                                                            </Menu.Item>
                                                                            <Menu.Item onClick={(e) => confirmCancelDialog(e, user)} tabIndex={2} className="text-red-900 border-b my-1 cursor-pointer">
                                                                                <p>Cancel</p>
                                                                            </Menu.Item>
                                                                        </Menu.Items>
                                                                    }
                                                                </div>
                                                            }
                                                        </>
                                                    )}
                                                </Menu>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {i !== 1 && <hr className="mx-3" />}
                        </div>
                    ))
                    }
                </div>

           
        </>
    );
}

export default AppointmentLabData


// {screen > 1245 ?
//     <div>
//         {data.filter(x => type === "appointment" ? x?.whenAppointment >= moment().format('MM/DD/yyyy') : x?.patientLabTestsOrderDetailsList?.length > 0).filter(x => x.status !== 2).slice(0, 2).map((user, i) => (
//             <div key={i}>
//                 {user.status == 3 || user.status == 4 || user.status == 5 || user.status == 9 ?
//                     <div className="hidden"></div>
//                     :
//                     <div className="flex items-center gap-2 py-2 px-4">
//                         <div>
//                             <img className="h-12" src={props.img} alt="" />
//                         </div>
//                         <div className="flex items-center justify-around lg:justify-between flex-wrap msx-3 my-1  font-normal w-full">
//                             <div className="">
//                                 <div className="w-32 truncate text-sm">
//                                     {type === "appointment" ? <span>{user.userSalutation}{user.userName}</span> : <span>{user?.patientLabTestsOrderDetailsList[0]?.labTestName}</span>}
//                                 </div>
//                                 <div className="flex ">
//                                     <div className="bg-brand-cerulean mt-1   text-sm text-white rounded-xl h-4 content-center flex flex-wrap p-2 ">
//                                         {'Self'}
//                                     </div>
//                                     <div>
//                                         {type === "appointment" ? <p className="px-1  font-normal text-sm">{user.consultationsType === "V" ? 'Online' : "InPerson"}</p> : ''}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="flex flex-wrap " >
//                                 <div className=" flex font-semibold  text-right text-sm">
//                                     <div className=" flex mb-1">
//                                         {type === "appointment" ? <span className="flex text-brand-lightgreen text-right font-semibold  text-sm">


//                                             {
//                                                 user.status == 8 ? "" : user.status == 2 ?
//                                                     "" : user.status == 3 ? "" : user.status == 4 ?
//                                                         "" : user.status == 5 ? "" : user.status == 1 ?
//                                                             <div onClick={(e) => redirectTo(e, APP_ROUTES.VIDEO_CALL, user)}
//                                                                 className="flex flex-col items-center bg-green-200 rounded-lg border border-blue-300 cursor-pointer mr-5">
//                                                                 <div className="text-brand-primary">
//                                                                     <VideoCameraFrontIcon className="h-16" />
//                                                                 </div>
//                                                                 <button
//                                                                     //disabled={checkJoinCallTime(user)}

//                                                                     className=" text-xs  text-brand-primary font-normal px-2 rounded-lg disabled:opacity-50"
//                                                                 >Join</button>
//                                                             </div>
//                                                             : ""
//                                             }
//                                             <div className="flex flex-col items-center mr-2">
//                                                 {/* {moment().format('DD/MM/yyyy') === user.whenAppointment ? 'Today' : moment().format('DD/MM/yyyy') } */}
//                                                 <p>{user.whenAppointment}</p>
//                                                 <div className="text-xs mx-2 text-gray-800">
//                                                     {type === "appointment" ? <p > {moment(user.fromTime, 'hh:mm').format("hh:mm A")}</p> : <p > {moment(user?.preferDateTime, 'yyyy-MM-DD HH:mm:ss').format("hh:mm A")}</p>}

//                                                 </div>
//                                             </div>
//                                         </span> : <span className="text-brand-lightgreen text-right font-semibold  ">
//                                             {moment().isSame(user?.patientLabTestsOrderDetailsList[0]?.preferDateTime, 'date') ? 'Today' : 'Upcoming'}
//                                         </span>}
//                                     </div>
//                                     {/* <div className="text-xs">
//                             {type === "appointment" ? <p > {moment(user.fromTime, 'hh:mm').format("hh:mm A")}</p> : <p > {moment(user?.preferDateTime, 'yyyy-MM-DD HH:mm:ss').format("hh:mm A")}</p>}
//                         </div> */}
//                                 </div>
//                                 <div>
//                                     <Menu as="div" className="lg:block relative">
//                                         {({ open }) => (
//                                             <>
//                                                 {type === "appointment" &&
//                                                     <div>
//                                                         <div>
//                                                             <Menu.Button className={` py-2 flex text-sm rounded-full focus:outline-none`}>
//                                                                 <DotsVerticalIcon className="cursor-pointer text-gray-secondary h-6 mt-2 relative left-3" />
//                                                             </Menu.Button>
//                                                         </div>
//                                                         {type === "appointment" && open &&
//                                                             <Menu.Items static className="z-10 origin-top-right absolute right-0 p-2 top-0 mr-2 rounded-md shadow-xl py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none border border-blue-200 w-48">
//                                                                 {moment().format('DD/MM/yyyy') === user.whenAppointment && moment().subtract(5, 'minutes').format("hh:mm A") === moment(user.fromTime, 'hh:mm').format("hh:mm A") && < Menu.Item tabIndex={1} className=" my-1 cursor-pointer" onClick={(e) => redirectTo(e, APP_ROUTES.VIDEO_CALL, user)}>
//                                                                     <p>Join Now</p>
//                                                                 </Menu.Item>}
//                                                                 <Menu.Item onClick={() => openModal(user)} tabIndex={2} className="text-brand-primary border-b my-1 cursor-pointer">
//                                                                     <p>Reschedule</p>
//                                                                 </Menu.Item>
//                                                                 <Menu.Item onClick={(e) => confirmCancelDialog(e, user)} tabIndex={2} className="text-red-900 border-b my-1 cursor-pointer">
//                                                                     <p>Cancel</p>
//                                                                 </Menu.Item>
//                                                             </Menu.Items>
//                                                         }
//                                                     </div>
//                                                 }
//                                             </>
//                                         )}
//                                     </Menu>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 }
//                 {i !== 1 && <hr className="mx-3" />}
//             </div>
//         ))
//         }
//     </div>
//     :
//     <div>
//         {screen > 400 ?
//             <div>
//                 {data.filter(x => type === "appointment" ? x?.whenAppointment >= moment().format('MM/DD/yyyy') : x?.patientLabTestsOrderDetailsList?.length > 0).filter(x => x.status !== 2).slice(0, 2).map((user, i) => (
//                     <div key={i}>
//                         {user.status == 3 ?
//                             <div className="hidden"></div>
//                             :
//                             <div className="flex items-center gap-2 py-2 px-4">
//                                 <div>
//                                     <img className="h-12" src={props.img} alt="" />
//                                 </div>
//                                 <div className="flex items-center justify-around lg:justify-between flex-wrap msx-3 my-1  font-normal w-full">
//                                     <div className="flex flex-col w-auto">

//                                         <div className="w-32 truncate text-sm">
//                                             {type === "appointment" ? <span>{user.userSalutation}{user.userName}</span> : <span>{user?.patientLabTestsOrderDetailsList[0]?.labTestName}</span>}
//                                         </div>
//                                         <p className="text-brand-lightgreen text-sm font-semibold" >{user.whenAppointment}</p>
//                                         <div className="text-xs mx-2 text-gray-800">
//                                             {type === "appointment" ? <p className=""> {moment(user.fromTime, 'hh:mm').format("hh:mm A")}</p> : <p className=""> {moment(user?.preferDateTime, 'yyyy-MM-DD HH:mm:ss').format("hh:mm A")}</p>}

//                                         </div>

//                                     </div>
//                                     <div className="flex flex-wrap " >
//                                         <div className=" flex font-semibold  text-right text-sm">
//                                             <div className=" flex mb-1">
//                                                 {type === "appointment" ? <span className="flex text-brand-lightgreen text-right font-semibold  text-sm">


//                                                     {
//                                                         user.status == 8 ? "" : user.status == 2 ?
//                                                             "" : user.status == 3 ? "" : user.status == 4 ?
//                                                                 "" : user.status == 5 ? "" : user.status == 1 ?
//                                                                     <div onClick={(e) => redirectTo(e, APP_ROUTES.VIDEO_CALL, user)}
//                                                                         className="flex flex-col items-center bg-green-200 rounded-lg border border-blue-300 cursor-pointer mr-2">
//                                                                         <div className="text-brand-primary">
//                                                                             <VideoCameraFrontIcon className="h-16" />
//                                                                         </div>
//                                                                         <button
//                                                                             //disabled={checkJoinCallTime(user)}

//                                                                             className=" text-xs  text-brand-primary font-normal px-2 rounded-lg disabled:opacity-50"
//                                                                         >Join</button>
//                                                                     </div>
//                                                                     : ""
//                                                     }
//                                                     <div className="flex flex-col items-center mr-2">
//                                                         {/* {moment().format('DD/MM/yyyy') === user.whenAppointment ? 'Today' : moment().format('DD/MM/yyyy') } */}
//                                                         <div className="">
//                                                             <div className="flex justify-center bg-brand-cerulean mt-1   text-sm text-white rounded-xl h-4 content-center flex-wrap py-2 px-1">
//                                                                 {'self'}
//                                                             </div>
//                                                             <div>
//                                                                 {type === "appointment" ? <p className="px-1  font-normal text-sm">{user.consultationsType === "V" ? 'Online' : "InPerson"}</p> : ''}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </span> : <span className="text-brand-lightgreen text-right font-semibold  ">
//                                                     {moment().isSame(user?.patientLabTestsOrderDetailsList[0]?.preferDateTime, 'date') ? 'Today' : 'Upcoming'}
//                                                 </span>}
//                                             </div>
//                                             {/* <div className="text-xs">
//                             {type === "appointment" ? <p > {moment(user.fromTime, 'hh:mm').format("hh:mm A")}</p> : <p > {moment(user?.preferDateTime, 'yyyy-MM-DD HH:mm:ss').format("hh:mm A")}</p>}
//                         </div> */}
//                                         </div>
//                                         <div>
//                                             <Menu as="div" className="lg:block relative">
//                                                 {({ open }) => (
//                                                     <>
//                                                         {type === "appointment" &&
//                                                             <div>
//                                                                 <div>
//                                                                     <Menu.Button className={` py-2 flex text-sm rounded-full focus:outline-none`}>
//                                                                         <DotsVerticalIcon className="cursor-pointer text-gray-secondary h-6 mt-2 relative left-3" />
//                                                                     </Menu.Button>
//                                                                 </div>
//                                                                 {type === "appointment" && open &&
//                                                                     <Menu.Items static className="z-10 origin-top-right absolute right-0 p-2 top-0 mr-2 rounded-md shadow-xl py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none border border-blue-200 w-48">
//                                                                         {moment().format('DD/MM/yyyy') === user.whenAppointment && moment().subtract(5, 'minutes').format("hh:mm A") === moment(user.fromTime, 'hh:mm').format("hh:mm A") && < Menu.Item tabIndex={1} className=" my-1 cursor-pointer" onClick={(e) => redirectTo(e, APP_ROUTES.VIDEO_CALL, user)}>
//                                                                             <p>Join Now</p>
//                                                                         </Menu.Item>}
//                                                                         <Menu.Item onClick={() => openModal(user)} tabIndex={2} className="text-brand-primary border-b my-1 cursor-pointer">
//                                                                             <p>Reschedule</p>
//                                                                         </Menu.Item>
//                                                                         <Menu.Item onClick={(e) => confirmCancelDialog(e, user)} tabIndex={2} className="text-red-900 border-b my-1 cursor-pointer">
//                                                                             <p>Cancel</p>
//                                                                         </Menu.Item>
//                                                                     </Menu.Items>
//                                                                 }
//                                                             </div>
//                                                         }
//                                                     </>
//                                                 )}
//                                             </Menu>

//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         }
//                         {i !== 1 && <hr className="mx-3" />}
//                     </div>
//                 ))
//                 }
//             </div>
//             :
//             <div>
//                 {data.filter(x => type === "appointment" ? x?.whenAppointment >= moment().format('MM/DD/yyyy') : x?.patientLabTestsOrderDetailsList?.length > 0).filter(x => x.status !== 2).slice(0, 2).map((user, i) => (
//                     <div key={i}>
//                         {user.status == 3 ?
//                             <div className="hidden"></div>
//                             :
//                             <div className="flex items-center gap-2 py-2 px-4">
//                                 <div>
//                                     <img className="h-12" src={props.img} alt="" />
//                                 </div>
//                                 <div className="md:flex items-center justify-around lg:justify-between flex-wrap msx-3 my-1  font-normal w-full">
//                                     <div className="flex flex-col w-1/3">

//                                         <div className="w-52 md:w-32 truncate text-sm">
//                                             {type === "appointment" ? <span>{user.userSalutation}{user.userName}</span> : <span>{user?.patientLabTestsOrderDetailsList[0]?.labTestName}</span>}
//                                         </div>
//                                         <p className="text-brand-lightgreen text-xs font-semibold" >{user.whenAppointment}</p>
//                                         <div className="text-xs mx-1 text-gray-800">
//                                             {type === "appointment" ? <p className=""> {moment(user.fromTime, 'hh:mm').format("hh:mm A")}</p> : <p className=""> {moment(user?.preferDateTime, 'yyyy-MM-DD HH:mm:ss').format("hh:mm A")}</p>}

//                                         </div>

//                                     </div>
//                                     <div className="flex flex-wrap " >
//                                         <div className=" flex font-semibold  text-right text-sm">
//                                             <div className=" flex mb-1">
//                                                 {type === "appointment" ? <span className="flex text-brand-lightgreen text-right font-semibold  text-xs">


//                                                     {
//                                                         user.status == 8 ? "" : user.status == 2 ?
//                                                             "" : user.status == 3 ? "" : user.status == 4 ?
//                                                                 "" : user.status == 5 ? "" : user.status == 1 ?
//                                                                     <div onClick={(e) => redirectTo(e, APP_ROUTES.VIDEO_CALL, user)}
//                                                                         className="flex flex-col items-center  rounded-lg   cursor-pointer mr-2">
//                                                                         <div className="text-brand-primary">
//                                                                             <VideoCameraFrontIcon className="h-12" />
//                                                                         </div>
//                                                                         <button
//                                                                             //disabled={checkJoinCallTime(user)}

//                                                                             className=" text-xs  text-brand-primary font-normal px-2 rounded-lg disabled:opacity-50"
//                                                                         >Join</button>
//                                                                     </div>
//                                                                     : ""
//                                                     }
//                                                     <div className="flex flex-col items-center mr-2">
//                                                         {/* {moment().format('DD/MM/yyyy') === user.whenAppointment ? 'Today' : moment().format('DD/MM/yyyy') } */}
//                                                         <div className="">
//                                                             <div className="flex justify-center bg-brand-cerulean mt-1   text-xs text-white rounded-xl h-4 content-center flex-wrap py-2 px-0">
//                                                                 {'self'}
//                                                             </div>
//                                                             <div>
//                                                                 {type === "appointment" ? <p className="px-1  font-normal text-xs">{user.consultationsType === "V" ? 'Online' : "InPerson"}</p> : ''}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </span> : <span className="text-brand-lightgreen text-right font-semibold  ">
//                                                     {moment().isSame(user?.patientLabTestsOrderDetailsList[0]?.preferDateTime, 'date') ? 'Today' : 'Upcoming'}
//                                                 </span>}
//                                             </div>
//                                             {/* <div className="text-xs">
//                             {type === "appointment" ? <p > {moment(user.fromTime, 'hh:mm').format("hh:mm A")}</p> : <p > {moment(user?.preferDateTime, 'yyyy-MM-DD HH:mm:ss').format("hh:mm A")}</p>}
//                         </div> */}
//                                         </div>
//                                         <div>
//                                             <Menu as="div" className="lg:block relative">
//                                                 {({ open }) => (
//                                                     <>
//                                                         {type === "appointment" &&
//                                                             <div>
//                                                                 <div>
//                                                                     <Menu.Button className={` py-2 flex text-sm rounded-full focus:outline-none`}>
//                                                                         <DotsVerticalIcon className="cursor-pointer text-gray-secondary h-6 mt-2 relative left-3" />
//                                                                     </Menu.Button>
//                                                                 </div>
//                                                                 {type === "appointment" && open &&
//                                                                     <Menu.Items static className="z-10 origin-top-right absolute right-0 p-2 top-0 mr-2 rounded-md shadow-xl py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none border border-blue-200 w-48">
//                                                                         {moment().format('DD/MM/yyyy') === user.whenAppointment && moment().subtract(5, 'minutes').format("hh:mm A") === moment(user.fromTime, 'hh:mm').format("hh:mm A") && < Menu.Item tabIndex={1} className=" my-1 cursor-pointer" onClick={(e) => redirectTo(e, APP_ROUTES.VIDEO_CALL, user)}>
//                                                                             <p>Join Now</p>
//                                                                         </Menu.Item>}
//                                                                         <Menu.Item onClick={() => openModal(user)} tabIndex={2} className="text-brand-primary border-b my-1 cursor-pointer">
//                                                                             <p>Reschedule</p>
//                                                                         </Menu.Item>
//                                                                         <Menu.Item onClick={(e) => confirmCancelDialog(e, user)} tabIndex={2} className="text-red-900 border-b my-1 cursor-pointer">
//                                                                             <p>Cancel</p>
//                                                                         </Menu.Item>
//                                                                     </Menu.Items>
//                                                                 }
//                                                             </div>
//                                                         }
//                                                     </>
//                                                 )}
//                                             </Menu>

//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         }
//                         {i !== 1 && <hr className="mx-3" />}
//                     </div>
//                 ))
//                 }
//             </div>
//         }
//     </div>
// }




// {!isHide && <RescheduleModal data={ap_Data} onClose={() => setHide(true)} />}

// {showModal ? (
//     <AppointmentDetailspopup
//         appointmentdetails={appointmentdetails}
//         closePopup={() => {
//             setShowModal(!showModal);
//             onRescheduleModelClose();
//         }}
//         isVisible={isTimeExceed(appointmentdetails)}
//     ></AppointmentDetailspopup>
// ) : null}
// {showCancelDialog ?
//     <CancelAppointmentPopup
   
//         onCancel={ confirmCancelAppointment}
//         onClickOnReason={onClickOnReason()}
//         isLoading={isLoading}
//         isErrorMsg={isErrorMsg}
//         close={() => { setShowCancelDialog(false);
//         setErrorMsg("");
//          }}

        
//     /> : null}
