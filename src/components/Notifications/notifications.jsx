/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from 'react'
//import stethescope from '../../Assets/Images/circle_stethescope.svg';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Userprofilesidebar from '../userprofilesidebar';
//import { getcheadminnotifications } from '../../Redux/Actions/CheprofileAction';
import moment from 'moment';
import NotificationsFilter from './filter-notification';
import Cheprofileservice from '../../Redux/services/Cheprofileservice';
import ViewNotification from './view-notification';
import Patientprofilesidebar from '../Patientprofilesidebar';
//import { propTypes } from 'react-bootstrap/esm/Image';
import Patientprofileupbar from '../userprofilecomponents/Patientprofileupbar';
import { Dropdown } from 'react-bootstrap'
import { MenuIcon } from '@heroicons/react/outline'

function Notifications() {


    const params = useParams();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const [loginObj, setLoginObj] = useState(JSON.parse(localStorage.getItem("loginObj")));
    const [notificationsList, setNotificationsList] = useState([]);
    const [selectedNotification, setSelectedNotification] = useState();
    const [showFilter, setShowFilter] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showall, setshowall] = useState(true);
    const [clearall, setclearall] = useState(false);

    const patientCode = useSelector(state => state.authReducer.patientCode);

    const cheadminnotifications = useSelector((state) => state.cheadminnotifications);
    const { cheadminnotificationsData } = cheadminnotifications;


    const redirectTo = (event, location) => {
        event.preventDefault();
        history.push(location);
    };

    const clear = (e) => {
        e.preventDefault();
        setshowall(false)
        setclearall(true)
    };

    const show = (e) => {
        e.preventDefault();
        setshowall(true)
        setclearall(false)
    };

    useEffect(() => {
        console.log(loginObj);
        let payload = {
            status: 1
        }
        loadNotifications(payload);
        //dispatch(getcheadminnotifications(UserData.code))
        //console.log(cheadminnotificationsData)

    }, [
        dispatch
    ]);

    const loadNotifications = (payload) => {

        // if (loginObj.user.roleCode == 'CHE') {
        //     const hospitalid = localStorage.getItem("hospitalid");
        //     const locationid = localStorage.getItem("locationid");
        //     payload.CHEId = hospitalid;
        //     payload.CHELocationId = locationid;
        //     if (params.type == 'patient') {
        //         const activePatient = JSON.parse(localStorage.getItem('activePatient'));
        //         if (activePatient) {
        //             payload.patientCode = activePatient.code
        //         }
        //     } else if (params.type == 'che') {
        //         //payload.trigeredTo = loginObj.user.code
        //     }
        // } else {
        //     payload.trigeredTo = loginObj.user.code
        // }
        // Cheprofileservice.getNotification(payload).then((res) => {
        //     if (res.data) {
        //         setNotificationsList(res.data)
        //     }
        //     console.log(res.data);
        // }, (err) => {
        //     console.log(err);
        // });

        // payload.CHEId = "AKSHARA";
        // payload.CHELocationId = "AKSHARA";
        payload.trigeredTo = patientCode

        Cheprofileservice.getNotification(payload).then((res) => {
            if (res.data) {
                setNotificationsList(res.data)
            }
            console.log(res.data);
        }, (err) => {
            console.log(err);
        })
    }

    const openFilter = () => {
        setShowFilter(true);
    }

    const closeFilter = () => {
        setShowFilter(false);
    }

    const changeSelectedNotification = (e) => {
        if (e.target.value) {
            setSelectedNotification(JSON.parse(e.target.value));
        }
    }

    const viewNotification = () => {
        console.log(selectedNotification);
        if (selectedNotification) {
            console.log('Called Inside');
            setShowNotification(true);
        }
    }

    const closeViewNotification = () => {
        setShowNotification(false);
    }

    const filterNotifications = (fromDate, toDate, patient) => {
        let payload = {}
        if (fromDate) {
            payload.fromDate = fromDate;
        }
        if (toDate) {
            payload.toDate = toDate;
        }
        if (patient) {
            payload.patientCode = patient;
        }
        loadNotifications(payload);
        setShowFilter(false);
    }

    const updateStatus = (id) => {
        notificationsList.find((x) => x.id == id).status = 0;
        console.log(notificationsList);
        setNotificationsList(notificationsList);
    }

    // console.log(UserData, "UserData")
    return (
        <>

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
                    <a href="/profile/notifications/:type">Profile</a>
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
                    <a href="/profile/notifications/:type">Notifications</a>

                    <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                    ></path>

                </li>

            </ul>
            <br />
            {params.type == 'patient' && (
                <>
                    <Userprofilesidebar></Userprofilesidebar>

                </>
            )}
            <div class="flex">
                <div class="lg:block hidden w-3/12 ml-6 mt-3">
                    <Userprofilesidebar></Userprofilesidebar>
                </div>
                <div class="w-full lg:w-3/4   lg:mr-16 lg:ml-0 mt-6">
                    <div className="flex w-full">
                        <div className="-my-2 sm:-mx-4 lg:-mx-6 w-full">
                            <div className="py-2 align-middle inline-block w-full sm:px-6 lg:px-8">
                                <div class="flex justify-between my-3">
                                    <p class="md:flex lg:block text-gray-700 text-base font-medium "><div className="hidden md:block lg:hidden relative  mr-4 ml-2 top-0" >
                                        <Dropdown>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="z-10" >
                                                <Userprofilesidebar />
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>Notifications </p>
                                    <div class="flex justify-between">
                                        <p onClick={openFilter} class="text-xs text-brand-secondary font-medium  cursor-pointer">Filter</p>
                                        <p onClick={viewNotification} class="text-xs ml-5 text-brand-secondary font-medium  cursor-pointer">View</p>
                                    </div>
                                </div>
                                {/* <p class="text-xs text-gray-600 font-medium  pt-4">Today</p> */}
                                <div class="w-full h-112 lg:mb-2 mb-16 antialiased justify-between">
                                    <div className="h-96 overflow-y-scroll hide-scroll-bar shadow w-full  border-b border-gray-200 sm:rounded-lg mb-8 ">
                                        <hr classname="border-dash text-black w-10 mt-4 h-20 my-2"></hr>
                                        <div className="h-96 w-full lg:mx-1  overflow-y-scroll overflow-x-scroll hide-scroll-bar">
                                            <table className=" h-28 divide-y divide-gray-200">
                                                <thead className="50">
                                                    <tr>

                                                        <th className="py-2 px-2">
                                                            <input id="radio2" type="radio" name="radio" className="hidden" />
                                                        </th>
                                                        <div className="flex ">
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                            >
                                                                Date
                                                            </th>

                                                            {/* <img src={arrowdown} alt="filter" className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" /> */}
                                                        </div>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            From
                                                        </th>

                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Subject
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                            Content
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">

                                                    {notificationsList.map((user, i) => (
                                                        <tr key={i} className={"cursor-pointer" + (user.status == 1 ? " font-medium" : "")}>
                                                            <td className="py-2 px-2">
                                                                <input id="radio2" type="radio" name="radio" value={JSON.stringify(user)} onChange={changeSelectedNotification} />
                                                            </td>
                                                            <td className="py-4 whitespace-nowrap text-sm text-gray-500 ">{moment(user.date).format('DD-MM-yyyy')}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">{user.trigeredByName}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">{user.subject}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">{user.content.substring(0, 50)}</td>
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
                {showFilter && (
                    <NotificationsFilter
                        onClose={closeFilter}
                        closePopup={closeFilter}
                        patientFilter={params.type == 'che' ? true : false}
                        filterNotifications={filterNotifications}></NotificationsFilter>
                )}
                {showNotification && (
                    <ViewNotification
                        onClose={closeViewNotification}
                        closePopup={closeViewNotification}
                        notification={selectedNotification}
                        read={updateStatus}></ViewNotification>
                )}
            </div>
        </>
        // <>
        //     {params.type == 'patient' && (
        //         <>
        //             <Userprofilesidebar></Userprofilesidebar>
        //             <ul class="lg:flex hidden text-brand-secondary text-sm lg:text-base pl-10 pt-2">
        //                 <li class="inline-flex items-center">
        //                     <a href="/">Home</a>
        //                     <svg
        //                         class="h-5 w-auto text-brand-secondary"
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
        //                 <li class="inline-flex items-center">
        //                     <a href="/components"> Profile</a>

        //                 </li>

        //             </ul>
        //         </>
        //     )}
        //     <div class="flex">
        //         {params.type == 'patient' && (
        //             <div class="lg:block hidden w-3/12 ml-6 mt-3">
        //                 <Userprofilesidebar></Userprofilesidebar>
        //             </div>
        //         )}
        //         {params.type == 'che' && (
        //             <div class="lg:block hidden w-3/12 ml-6 mt-3">
        //                 <Userprofilesidebar></Userprofilesidebar>
        //             </div>
        //         )}
        //         <div class="w-full lg:w-3/4   lg:mr-16 lg:ml-0 mt-6">
        //             <div className="flex w-full">
        //                 <div className="-my-2 sm:-mx-4 lg:-mx-6 w-full">
        //                     <div className="py-2 align-middle inline-block w-full sm:px-6 lg:px-8">
        //                         <div class="flex justify-between my-3">
        //                             <p class="md:flex lg:block text-gray-700 text-base font-medium "><div className="hidden md:block lg:hidden relative  mr-4 ml-2 top-0" >
        //                                 <Dropdown>
        //                                     <Dropdown.Toggle variant="success" id="dropdown-basic">
        //                                         <MenuIcon className="block h-6 w-6" aria-hidden="true" />

        //                                     </Dropdown.Toggle>

        //                                     <Dropdown.Menu className="z-10" >
        //                                         {params.type == 'patient' &&
        //                                             <Patientprofilesidebar />
        //                                         }
        //                                         {params.type == 'che' &&
        //                                             <Userprofilesidebar />

        //                                         }
        //                                     </Dropdown.Menu>
        //                                 </Dropdown>
        //                             </div>Notifications </p>
        //                             <div class="flex justify-between">
        //                                 <p onClick={openFilter} class="text-xs text-brand-secondary font-medium  cursor-pointer">Filter</p>
        //                                 <p onClick={viewNotification} class="text-xs ml-5 text-brand-secondary font-medium  cursor-pointer">View</p>
        //                             </div>



        //                             {/* showall && <p onClick={clear} class="text-xs text-brand-secondary font-medium ">Hide All</p> }
        //                 { clearall &&  <p onClick={show} class="text-xs text-brand-secondary font-medium ">show all</p> */}

        //                         </div>

        //                         {/* <p class="text-xs text-gray-600 font-medium  pt-4">Today</p> */}
        //                         <div class="w-full h-112 lg:mb-2 mb-16 antialiased justify-between">
        //                             <div className="h-96 overflow-y-scroll hide-scroll-bar shadow w-full  border-b border-gray-200 sm:rounded-lg mb-8 ">
        //                                 <hr classname="border-dash text-black w-10 mt-4 h-20 my-2"></hr>
        //                                 <div className="h-96 w-full lg:mx-1  overflow-y-scroll overflow-x-scroll hide-scroll-bar">
        //                                     <table className=" h-28 divide-y divide-gray-200">
        //                                         <thead className="50">
        //                                             <tr>

        //                                                 <th className="py-2 px-2">
        //                                                     <input id="radio2" type="radio" name="radio" className="hidden" />
        //                                                 </th>
        //                                                 <div className="flex ">
        //                                                     <th
        //                                                         scope="col"
        //                                                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        //                                                     >
        //                                                         Date
        //                                                     </th>

        //                                                     {/* <img src={arrowdown} alt="filter" className=" py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" /> */}
        //                                                 </div>
        //                                                 <th
        //                                                     scope="col"
        //                                                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        //                                                 >
        //                                                     From
        //                                                 </th>

        //                                                 {params.type == 'che' && (
        //                                                     <th
        //                                                         scope="col"
        //                                                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        //                                                     >
        //                                                         Patient Name
        //                                                     </th>
        //                                                 )}


        //                                                 <th
        //                                                     scope="col"
        //                                                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        //                                                 >
        //                                                     Subject
        //                                                 </th>
        //                                                 <th
        //                                                     scope="col"
        //                                                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        //                                                 >
        //                                                     Content
        //                                                 </th>
        //                                             </tr>
        //                                         </thead>
        //                                         <tbody className="divide-y divide-gray-200">

        //                                             {notificationsList.map((user, i) => (
        //                                                 <tr className={"cursor-pointer" + (user.status == 1 ? " font-medium" : "")}>
        //                                                     <td className="py-2 px-2">
        //                                                         <input id="radio2" type="radio" name="radio" value={JSON.stringify(user)} onChange={changeSelectedNotification} />
        //                                                     </td>
        //                                                     <td className="py-4 whitespace-nowrap text-sm text-gray-500 ">{moment(user.date).format('DD-MM-yyyy')}</td>
        //                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">{user.trigeredByName}</td>
        //                                                     {params.type == 'che' && (
        //                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
        //                                                             {user.patientName}
        //                                                         </td>
        //                                                     )}
        //                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">{user.subject}</td>
        //                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">{user.content.substring(0, 50)}</td>
        //                                                     {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">{user.serviceName}</td> */}

        //                                                 </tr>
        //                                             ))}


        //                                         </tbody>
        //                                     </table>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         {showFilter && (
        //             <NotificationsFilter
        //                 onClose={closeFilter}
        //                 closePopup={closeFilter}
        //                 patientFilter={params.type == 'che' ? true : false}
        //                 filterNotifications={filterNotifications}></NotificationsFilter>
        //         )}
        //         {showNotification && (
        //             <ViewNotification
        //                 onClose={closeViewNotification}
        //                 closePopup={closeViewNotification}
        //                 notification={selectedNotification}
        //                 read={updateStatus}></ViewNotification>
        //         )}
        //     </div>
        // </>
    )
}
export default Notifications;
