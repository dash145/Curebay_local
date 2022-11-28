/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from 'react'
import stethescope from '../Assets/Images/circle_stethescope.svg';
// import pills from '../Assets/Images/circle_pill.svg';
// import tube from '../Assets/Images/circle_tube.svg';
// import more from '../Assets/Images/More .svg';
// import load from '../Assets/Images/load.svg';
import { useHistory, useLocation } from 'react-router-dom';
// import { USERPROFILE_ROUTES } from '../application/Router/constants/UserProfileRoutes';
// import { data } from 'autoprefixer';
// import newLogo from '../Assets/Images/newLogo.png'
// import { XIcon, } from '@heroicons/react/outline'

import { useDispatch, useSelector } from 'react-redux';
// import UserMobile from './userMobile';
import Userprofilesidebar from './userprofilesidebar';
import { getcheadminnotifications } from '../Redux/Actions/CheprofileAction';
import moment from 'moment';

function CheNotification() {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const [showall, setshowall] = useState(true);
    const [clearall, setclearall] = useState(false);

    const UserData = useSelector(state => state.authReducer.userData);

    const cheadminnotifications = useSelector((state) => state.cheadminnotifications);
    const { cheadminnotificationsData } = cheadminnotifications;

    console.log("history", history)
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

        dispatch(getcheadminnotifications(UserData.code))
        console.log(cheadminnotificationsData)


    }, [
        dispatch
    ]);




    return (
        <>
            <div class="flex justify-between">
                {/* <div class="flex space-x-4"> */}
                <div class="lg:block hidden w-3/12 ml-6 mt-3">
                    <Userprofilesidebar></Userprofilesidebar>
                </div>


                <div class="md:w-11/12 m-auto lg:w-8/12 lg:mr-16 mt-8 ">
                    <div class="md:rounded-lg lg:shadow-sm lg:bg-white-600 md:mb-2 lg:mb-0 w-full px-2 lg:p-3 lg:mb-2 lg:antialiased md:border md:border-gray-200">
                        <div class="flex justify-between">
                            <p class="text-gray-700 text-base font-medium ">Notification </p>


                            {showall && <p onClick={clear} class="text-xs text-brand-secondary font-medium ">Hide All</p>}
                            {clearall && <p onClick={show} class="text-xs text-brand-secondary font-medium ">show all</p>}

                        </div>

                        {/* <p class="text-xs text-gray-600 font-medium  pt-4">Today</p> */}

                        {
                            showall ?

                                <div>
                                    {cheadminnotificationsData.slice(0, 8).map((user, i) => (

                                        <div>

                                            <div class="flex justify-between pt-2">
                                                <div class="flex space-x-3">
                                                    <img src={stethescope} alt="stethescope" />
                                                    <div class="pt-1">
                                                        <p class="text-sm text-gray-600 ">{user.content} </p>
                                                        <p class="text-xs text-gray-500 ">{moment(new Date(user.date)).format("DD/MM/YYYY HH:mm:ss")}</p>
                                                    </div>
                                                </div>
                                                {/* <img src={more} alt="more" /> */}

                                            </div>
                                            <hr class="m-2" />
                                        </div>
                                    ))}
                                </div> : null
                        }


                        {/* <p class="text-xs text-gray-600 font-medium  pt-4">Yesterday</p> */}






                    </div>

                    {/* <div class="flex justify-center space-x-2 pt-3">
                        <img src={load} alt="load" class="w-4" />
                        <p class="text-xs text-gray-400">Loading More</p>
                    </div> */}
                </div>



                {/* </div> */}





            </div>
        </>
    )
}
export default CheNotification;
