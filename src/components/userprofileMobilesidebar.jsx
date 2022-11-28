import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { USERPROFILE_ROUTES } from '../application/Router/constants/UserProfileRoutes';
import newLogo from '../Assets/Images/Logo2.svg'
import { XIcon, } from '@heroicons/react/outline'
import { useDispatch, useSelector } from 'react-redux';
import UserMobile from './userMobile';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import { Logout, checkOpen } from '../Redux/Actions/userActions';
import AddIcon from '@mui/icons-material/Add';

import manageprofilelogo from '../Assets/Images/manageprofilelogo.png';
import mydetailslogo from '../Assets/Images/mydetailslogo.png';
import myhealthrecordslogo from '../Assets/Images/myhealthrecordslogo.png';
import myrequestlogo from '../Assets/Images/myrecordslogo.png';
import myorderslogo from '../Assets/Images/myorderslogo.png';
import mypaymentslogo from '../Assets/Images/mypaymentslogo.png';
import walletlogo from '../Assets/Images/walletlogo.png';
import myaddressbooklogo from '../Assets/Images/myaddressbooklogo.png';
import myfeedbacklogo from '../Assets/Images/myfeedbacklogo.png';
import pluslogo from '../Assets/Images/pluslogo.png';
import MinusIconProfile from '../Assets/Images/MinusIconProfile.svg';

import changedPassword from '../Assets/Images/changedPassword.png';
import signout from '../Assets/Images/signout.png';



function UserProfileMobilesidebar() {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.authReducer);
    const { patientData, patientSession, isOpen, index } = userData;

    const [screen, setscreen] = React.useState(window.innerWidth)
    const [sideBardataWeb, setSideBardataWeb] = React.useState([
        {
            logo: mydetailslogo,
            text: 'My Details',
            route: USERPROFILE_ROUTES.MYDETAILS
        },
        {
            logo: manageprofilelogo,
            text: 'Manage Profile',
            route: USERPROFILE_ROUTES.MANAGEPROFILE
        },
        // {
        //     text: 'Health Records',
        //     route: USERPROFILE_ROUTES.MYREPORTS
        // },
        {
            logo: myhealthrecordslogo,
            text: 'My Health Records',
            expand: index==2?MinusIconProfile:pluslogo,
            routes: [
                { route: USERPROFILE_ROUTES.MYMEDICALHISTORY, text: 'Medical History' },
                { route: USERPROFILE_ROUTES.MYREPORTS, text: 'My Reports' },
                { route: USERPROFILE_ROUTES.MYPRISCRIPTION, text: 'My Prescription' },
                { route: USERPROFILE_ROUTES.MYLABREPORT, text: 'My Lab Report' },
                { route: USERPROFILE_ROUTES.MYVITALS, text: 'My Vitals' },
                { route: USERPROFILE_ROUTES.MYAPPOINTMENTS, text: 'My Appointments' },
                // { route: USERPROFILE_ROUTES.MYINSURANCE, text: 'My Insurance' }
            ]
        },
        // {
        //     text: 'My Appointments',
        //     route: USERPROFILE_ROUTES.MYAPPOINTMENTS
        // },
        // {
        //     text: 'My Vitals',
        //     route: USERPROFILE_ROUTES.MYVITALS
        // },
        {
            logo: myrequestlogo,
            text: 'My Requests',
            route: USERPROFILE_ROUTES.MYREQUESTS
        },
        {
            logo: myorderslogo,
            text: 'My Orders',
            expand: index==4?MinusIconProfile:pluslogo,
            routes: [
                { route: USERPROFILE_ROUTES.MY_ORDERS, text: 'Lab Orders' },
                { route: USERPROFILE_ROUTES.PATIENTMEDICINEORDERS, text: 'Medicine Orders' },
                { route: USERPROFILE_ROUTES.PATIENTMEPACKAGEORDERS, text: 'My Packages' },
            ]
        },
        {
            logo: mypaymentslogo,
            text: 'My Payments',
            route: USERPROFILE_ROUTES.MYPAYMENTS
        },

        {
            logo: walletlogo,
            text: 'CureBay Wallet',
            route: USERPROFILE_ROUTES.MYWALLET
        },

        {
            logo: myaddressbooklogo,
            text: 'My Address Book',
            route: USERPROFILE_ROUTES.MYADDRESSBOOK
        },

        {
            logo: myfeedbacklogo,
            text: 'Feedback',
            route: USERPROFILE_ROUTES.MYFEEDBACK
        },
        {
            logo: changedPassword,
            text: 'Change Password',
            route: USERPROFILE_ROUTES.MYCHANGEPASSWORD
        },
        // {
        //     text: 'My Notification',
        //     route: USERPROFILE_ROUTES.MYNOTIFICATION
        // },
        // {
        //     text: 'Help & Support',
        //     route: USERPROFILE_ROUTES.MYHELPSUPPORT
        // },
    ]
)


    React.useEffect(() => {
        const updateWindowDimensions = () => {
            const newWidth = window.innerWidth;
            setscreen(newWidth);
        };
        window.addEventListener("resize", updateWindowDimensions);
        return () => window.removeEventListener("resize", updateWindowDimensions)
    }, []);

    const redirectTo = (event, location, val) => {
        event.preventDefault();
        let d = {
            isOpen: val ? val : false,
            index: val ? index : 0
        }
        dispatch(checkOpen(d))
        history.push(location);
        if(screen <= 790 && location == "/profile/mydetails"){
          window.location.reload();
        }
    };


    const logout = (e) => {
        localStorage.clear();
        let dataObj = {
            sessionId: patientSession?.id,
            userCode: patientSession?.patientCode
        }
        dispatch(Logout(dataObj));
        history.push(APP_ROUTES.DASHBOARD)
    };

    const goBack = (e) => {
        e.preventDefault();
        history.goBack();
    };

    const [sideBardata, setSideBardata] = React.useState([


        {
            text: 'Home',
            route: APP_ROUTES.DASHBOARD
        },
        {
            text: 'Doctor',
            route: APP_ROUTES.DOCTORS
        },
        {
            text: 'Hospital',
            route: APP_ROUTES.HOSPITAL
        },
        {
            text: 'Medicine',
            route: APP_ROUTES.PHARMACY_CATEGOTY
        },
        {
            text: 'Diagnostics',
            route: APP_ROUTES.DIAGNOSIS
        },
        {
            text: 'Allied Services',
            route: APP_ROUTES.COMINGSOON
        },

        {
            text: 'About CureBay',
            expand: pluslogo,
            routes: [
                { route: APP_ROUTES.ABOUTUS, text: 'About Us' },
                { route: APP_ROUTES.MEDIA, text: 'Article, Blogs & Press' },
                { route: APP_ROUTES.CONTACTWITHUS, text: 'Contact Us' },
                { route: APP_ROUTES.OUR_TEAM, text: 'Our Team' },
                // { route: APP_ROUTES.DASHBOARD, text: 'Career' },
            ]
        },

        {
            text: 'Policies',
            expand: pluslogo,
            routes: [
                { route: APP_ROUTES.PRIVACY_POLICY, text: 'Privacy Policy' },
                { route: APP_ROUTES.TERMS_AND_CONDITION, text: 'Term & condition' },
                { route: APP_ROUTES.REFUND_POLICY, text: 'Return & Refund Policy' },
                // { route: APP_ROUTES.REFUND_POLICY, text: 'Return Policy' },

            ]
        },


    ])

    const setIndex = (i) => {


        console.log('isPosjjj',i)

        if(i==2){
            sideBardataWeb[i].expand=!isOpen? MinusIconProfile:pluslogo
            sideBardataWeb[4].expand=pluslogo
        } else if(i==4) {
            sideBardataWeb[i].expand=!isOpen? MinusIconProfile:pluslogo
            sideBardataWeb[2].expand=pluslogo
        }

    //     else if(i==6){
    //       sideBardata[i].expand=!isOpen? MinusIconProfile:pluslogo
    //       sideBardata[7].expand=pluslogo
    //   } else if(i==7) {
    //     sideBardata[i].expand=!isOpen? MinusIconProfile:pluslogo
    //     sideBardata[6].expand=pluslogo
    //   }




        let d = {
            isOpen: !isOpen,
            index: i
        }
        dispatch(checkOpen(d))

        setSideBardataWeb([...sideBardataWeb])
        // setSideBardata([...sideBardata])
    }

    useEffect(() => {
        console.log("location.pathname", location.pathname, USERPROFILE_ROUTES.MYREPORTS)
        if (location.pathname === USERPROFILE_ROUTES.MYREPORTS) {
            // setIndex(3)
            let d = {
                isOpen: true,
                index: 2
            }
            dispatch(checkOpen(d))
        }
        if (location.pathname === USERPROFILE_ROUTES.MYPRISCRIPTION) {
            // setIndex(3)
            let d = {
                isOpen: true,
                index: 2
            }
            dispatch(checkOpen(d))
        }
    }, [])

    return (
        <>
            <div className="">
                <div className="-ml-4 -mr-2 lg:hidden flex justify-between bg-white shadow-lg  sticky top-0 z-50 p-2">
                    <img src={newLogo} alt="" className="w-40" />
                    <XIcon className="h-10 curson-pointer" onClick={goBack} />
                </div>
                <div className="w-full mr-1 mt-2">
                    {location.calledFrom === "loginPerson" ? <UserMobile data={userData} /> : null}



                    {/* {patientData.id ? */}
                    <div className=" lg:bg-white-600 w-full  lg:p-3 lg:mb-2 lg:antialiased h-custom" style={{ width: "304px",  background: "white" }}>

                        <div className='w-full flex justify-start ml-3 my-3'>
                            <p className='font-bold text-lg'>My Account</p>

                        </div>

                        <hr className="w-11/12 mb-5 mt-2 ml-3" style={{color:"#D8DEE7"}}/>

                        {(screen > 500 ? sideBardataWeb : location.calledFrom === "loginPerson" ? sideBardataWeb : sideBardataWeb).map((res, i) => {
                            console.log(res.route , location.pathname , "dsohseoihvvsoihos");
                            return (
                                <>
                                    <div key={i} className="flex justify-between content-center -my-2">
                                        {

                                            screen > 500 && res.text !== "Change Password" &&
                                            <>

                                                <div onClick={(e) => { res.route ? redirectTo(e, res.route, false) : setIndex(i) }} style={{ color: "#262626" }} className={`${res.route === location.pathname ? " flex bg-blue-50 font-normal text-sm items-center justify-between cursor-pointer leading-5 w-full py-2 px-2 rounded-md my-3" : 'flex w-full font-normal text-sm items-center justify-between cursor-pointer leading-5 px-2 py-2 my-3'}`}>
                                                    <div className='flex'>
                                                        <img src={res.logo} alt="" className='h-4 ml-2 mr-3' style={{ color: "black" }} />
                                                        <p>{res.text}</p>
                                                    </div>
                                                    <div>
                                                        <img onClick={(e) => { res.route ? redirectTo(e, res.route, false) : setIndex(i) }} className={`${res.route == location.pathname ? ' lg:font-medium hidden font-thin text-lg  my-2 cursor-pointer h-4 w-4' : 'text-gray-800 lg:font-medium font-thin text-lg  lg:my-2 my-3 cursor-pointer'}`} src={  res.expand} alt="" />
                                                    </div>

                                                </div>
                                                {/* <img onClick={(e) => { res.route ? redirectTo(e, res.route, false) : setIndex(i) }} className={`${res.route === location.pathname ? 'text-green-500 lg:font-medium font-thin text-lg  my-2 cursor-pointer h-4 w-4' : 'text-gray-800 lg:font-medium font-thin text-lg lg:  lg:my-2 my-3 cursor-pointer'}`} src={res.expand} alt=""/> */}



                                                {/* <p onClick={(e) => { res.route ? redirectTo(e, res.route, false) : setIndex(i) }} className={`${res.route === location.pathname ? 'text-green-500 lg:font-medium font-thin text-lg  my-2 cursor-pointer' : 'text-gray-800 lg:font-medium font-thin text-lg lg:  lg:my-2 my-3 cursor-pointer'}`} >{res.expand}</p> */}

                                            </>

                                        }

                                        {

                                            screen <= 500 &&
                                            <>

                                                <div onClick={(e) => {res.route ? redirectTo(e, res.route, false) : setIndex(i) }} style={{ color: "#262626" }} className={`${res.route === location.pathname ? " flex  font-normal text-sm items-center justify-between cursor-pointer leading-5 w-full py-2 px-2 rounded-md my-3" : 'flex w-full font-normal text-lg items-center justify-between cursor-pointer leading-5 px-2 py-2 my-3'}`}>
                                                    <div className='flex  items-center'>
                                                        {/* <p className="" style={{color:"#797970"}}>{res.icon}</p> */}
                                                        <img src={res.logo} alt="" className='h-4 w-4 ml-2 mr-3 ' style={{ color: "black" }} />
                                                        <p>{res.text}</p>
                                                    </div>
                                                    <div>
                                                        <img onClick={(e) => { res.route ? redirectTo(e, res.route, false) : setIndex(i) }} className={`${res.route === location.pathname ? 'bg-white lg:font-medium font-thin text-lg  my-2 cursor-pointer h-4 w-4' : 'bg-white text-gray-800 lg:font-medium font-thin text-lg  lg:my-2 my-3 cursor-pointer'}`} src={res.expand} alt="" />
                                                    </div>

                                                </div>

                                                {/* <p onClick={(e) => { res.route ? redirectTo(e, res.route, false) : setIndex(i) }} className={`${res.route === location.pathname ? 'text-green-500 lg:font-medium font-semibold text-lg  my-2 cursor-pointer' : 'text-gray-800 lg:font-medium font-semibold text-lg lg:  lg:my-2 my-3 cursor-pointer'}`} >{res.text}</p> */}

                                                {/* <p onClick={(e) => { res.route ? redirectTo(e, res.route, false) : setIndex(i) }} className={`${res.route === location.pathname ? 'text-green-500 lg:font-medium font-thin text-lg  my-2 cursor-pointer' : 'text-gray-800 lg:font-medium font-thin text-lg lg:  lg:my-2 my-3 cursor-pointer'}`} >{res.expand}</p> */}

                                            </>

                                        }

                                    </div>

                                    {isOpen && index === i && < div x-show="dropdownOpen" className="ml-16 bg-hideblue cursor-pointer bg-white" style={{backgroundColor: "#FFFFFF"}}>
                                        {res?.routes?.map((data, j) => (
                                            <p style={{backgroundColor: "#FFFFFF"}} key={j} onClick={(e) => {redirectTo(e, data.route, true) }} className={`${location.pathname === data.route ? 'bg-hideblue font-bold text-gray-800 text-sm  my-2' : 'bg-hideblue text-gray-800 font-normal text-sm my-2'}`}>{data.text}</p>
                                        ))}
                                    </div>}

                                    {

                                        screen > 500 && res.text !== "Feedback" && res.text !== "My Address Book" &&
                                        <>

                                        </>


                                    }

                                    {

                                        screen < 500 &&
                                        <>

                                        </>


                                    }



                                </>

                            )
                        })}

                        {screen < 500 ?
                            <>
                                {
                                    patientData.id &&
                                    <>

                                        <div className="flex cursor-pointer ml-3 content-center ">
                                            <img className="mt-3 " src={signout} alt="" style={{height:"23px"}} />
                                            <p onClick={() => logout()} className="text-red-700 text-semibold font-normal text-lg ml-2 my-2  ">Sign Out</p>
                                        </div>
                                    </>
                                }
                            </> : <>  </>
                        }

                    </div>

                </div>

            </div>

        </>
    )
}
export default UserProfileMobilesidebar;
