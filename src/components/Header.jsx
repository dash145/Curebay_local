/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  ShoppingCartIcon,
  MenuIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import Ambulance from "../Assets/Images/ambulance@2x.svg";
import profile from "../Assets/Images/profile-1@2x.svg";
import Voucher_animated from "../Assets/Images/Voucher animated icon.gif";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import steth from "../Assets/Images/steth.svg";
import med from "../Assets/Images/bg-medicine.svg";
import moment from "moment";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import Dropdown from "./Dropdown";
import newLogo from "../Assets/Images/Logo2.svg";
import { USERPROFILE_ROUTES } from "../application/Router/constants/UserProfileRoutes";
import { getNotification } from "../Redux/Actions/UserprofileActions";
import { useDispatch, useSelector } from "react-redux";
import { secureStorage } from "../Redux/Reducers/authReducer";
import { Logout } from "../Redux/Actions/userActions";
import { getCartDetails } from "../Redux/Actions/cartPlaceOrderAction";
import { APP_CONFIRMATION } from "../config/constant";
import { setAddressString } from "../Redux/Actions/userActions";
import http from "../Redux/services/http-common";
import CartIconWithProduct from "../Assets/Images/cart.svg";
import CouponList from "../Assets/Images/CouponList.svg";
import NavBarSearch from "./navbarSearch";
import userlogo from "../Assets/Images/userlogo.png";

import { getCouponList, getCouponListGen, getCouponListDoctor } from "../Redux/Actions/UserprofileActions";

const navigation = [
  { name: "Home", href: APP_ROUTES.DASHBOARD, current: true },
  { name: "Doctor", href: APP_ROUTES.DOCTORS, current: false },
  { name: "Hospital", href: APP_ROUTES.HOSPITAL, current: false },
  { name: "Medicine", href: APP_ROUTES.PHARMACY_CATEGOTY, current: false },
  { name: "Diagnostics", href: APP_ROUTES.DIAGNOSIS, current: false },
  { name: "Ambulance Service", href: APP_ROUTES.COMINGSOON, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const BrandImage = () => {
  const history = useHistory();
  return (
    <img
      className="block h-9 w-28 md:h-10 ml-1 md:w-auto cursor-pointer"
      src={newLogo}
      alt="Workflow"
      onClick={() => history.push("/")}
    />
  );
};

const Header = (props) => {

  const onBackButtonEvent = (e) => {


    e.preventDefault();
    //if (!finishStatus) {

    if (window?.location?.pathname == "/login") {
      window.history.back()

      // return
    }
    // if (window.confirm(window.location.pathname)) {
    //     setfinishStatus(true)
    //     // your logic
    //     props.history.push("/");
    // } else {
    //     window.history.pushState(null, null, window.location.pathname);
    //     setfinishStatus(false)
    // }
    // }
  }

  // useEffect(() => {
  //   window.history.pushState(null, null, window.location.pathname);
  //   window.addEventListener('popstate', onBackButtonEvent);
  //   return () => {
  //     window.removeEventListener('popstate', onBackButtonEvent);
  //   };
  // }, []);


  const dispatch = useDispatch();
  const history = useHistory();

  const UserData = useSelector((state) => state.authReducer.patientData);
  const userData = useSelector((state) => state.authReducer);
  const { patientData, patientSession, isOpen, index } = userData;
  const notificationdata = useSelector((state) => state.mynotificatons);
  const { notificationData } = notificationdata;
  const address = useSelector((state) => state.authReducer.address);
  const addressinfo = useSelector((state) => state.patientaddresslist);
  const coords = useSelector((state) => state.authReducer.coords);
  const { cartList } = useSelector((state) => state.cartReducer);
  const [couponList, setCouponList] = useState([]);
  const [notificationList, setNotificationList] = useState([]);
  const [screen, setscreen] = useState(window.innerWidth);

  let location = useLocation();
  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };
  useEffect(() => {


    if (UserData && UserData.id) {
      dispatch(getNotification(UserData.code)).then((res) => {
        setNotificationList([...res]);

      });
    }
  }, []);


  useEffect(() => {

    console.log('is Noti hai', JSON.stringify(notificationList))
    if (UserData && UserData.id) {
      dispatch(getCouponList(UserData?.code, 'v_cart'))
    }
  }, []);

  useEffect(() => {
    if (UserData && UserData.id) {
      dispatch(getCouponListDoctor(UserData?.code, 'v_doctor'))

    }


  }, []);


  useEffect(() => {
    setTimeout(() => [dispatch(getCartDetails(UserData.code))], 100);
  }, [UserData]);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {

    dispatch(getCouponListGen(UserData?.code, 'v_all')).then((res) => {
      setCouponList([...res.data.vouchersList]);
    });
  }, []);

  // useEffect(() => {
  // }, [])

  const logout = (e) => {
    localStorage.clear();
    let dataObj = {
      sessionId: patientSession?.id,
      userCode: patientSession?.patientCode,
    };
    dispatch(Logout(dataObj));
    history.push(APP_ROUTES.DASHBOARD);
  };

  function getLocation() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(showPosition);
    } else {
    }
  }
  function showPosition(position) {
    const { coords } = position;
    console.log("coords", coords);
    var coordsObj = {
      lat: coords.latitude,
      long: coords.longitude,
    };
    secureStorage.setItem("coords", coordsObj);
  }

  const cartCount = (list) => {
    let count = 0;
    list?.patientMedicineOrder?.forEach((item) => {
      count = count + item.patientMedicineOrderDetailsList.length;
    });

    list?.patientLabTestsOrder?.forEach((item) => {
      count = count + item.patientLabTestsOrderDetailsList.length;
    });
    //  list?.patientLabTestsOrder.forEach(item => {
    //   count
    //  });
    return count;
  };

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;

      setscreen(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  const sideBardata = [
    {
      text: "Home",
      route: APP_ROUTES.DASHBOARD,
    },
    {
      text: "Doctor",
      route: APP_ROUTES.DOCTORS,
    },
    {
      text: "Hospital",
      route: APP_ROUTES.HOSPITAL,
    },
    {
      text: "Medicine",
      route: APP_ROUTES.PHARMACY_CATEGOTY,
    },
    {
      text: "Diagnostics",
      route: APP_ROUTES.DIAGNOSIS,
    },
    {
      text: "Ambulance Service",
      route: APP_ROUTES.COMINGSOON,
    },

    {
      text: "About CureBay",
      // expand: <AddIcon />,
      routes: [
        { route: APP_ROUTES.ABOUTUS, text: "About Us" },
        { route: APP_ROUTES.MEDIA, text: "Article, Blogs & Press" },
        { route: APP_ROUTES.CONTACTWITHUS, text: "Contact Us" },
        { route: APP_ROUTES.OUR_TEAM, text: "Our Team" },
        { route: APP_ROUTES.DASHBOARD, text: "Career" },
      ],
    },

    {
      text: "Policies",
      // expand: <AddIcon />,
      routes: [
        { route: APP_ROUTES.PRIVACY_POLICY, text: "Privacy Policy" },
        { route: APP_ROUTES.TERMS_AND_CONDITION, text: "Term & condition" },
        { route: APP_ROUTES.REFUND_POLICY, text: "Refund Policy" },
        { route: APP_ROUTES.REFUND_POLICY, text: "Return Policy" },
      ],
    },

    // {
    //     text: 'Feedback',
    //     route: APP_ROUTES.DASHBOARD
    // },
    // {
    //     text: 'Press',
    //     route: APP_ROUTES.MEDIA
    // },
    // {
    //     text: 'Privacy Policy',
    //     route: APP_ROUTES.PRIVACY_POLICY
    // },
    // {
    //     text: 'Term & condition',
    //     route: APP_ROUTES.TERMS_AND_CONDITION
    // },
    // {
    //     text: 'Refund Policy',
    //     route: APP_ROUTES.REFUND_POLICY
    // },
    // {
    //     text: 'Return Policy',
    //     route: APP_ROUTES.REFUND_POLICY
    // },
  ];

  // console.log("coords", coords);

  // console.log("notification list", notificationList);

  console.log("cart count", cartCount(cartList));

  return (
    <div className="sticky top-0 z-50">
      <Disclosure
        as="nav"
        className={`${location.pathname === APP_ROUTES.SIEBAR ||
          location.pathname === APP_ROUTES.MOBILE_SEARCH || location.pathname === APP_ROUTES.MENUBAR
          ? "lg:block hidden"
          : ""
          } bg-white  sticky top-0 z-50`}
      >
        <>
          <div className="mx-auto px-2 lg:px-2 xl:px-6 z-50 shadow-xl">
            <div
              className={`relative  flex items-center justify-between h-16  ${location.pathname === APP_ROUTES.DOCTOR_SEARCH
                ? "shadow-none"
                : ""
                }`}
            >
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-1 md:p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <div
                    onClick={() => history.push(USERPROFILE_ROUTES.SIDEBAR)}
                    className="flex justify-center items-center h-7 w-7 md:h-8 md:w-8"
                    style={{ borderRadius: "3px" }}
                    aria-hidden="true"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.22461 5.97485C3.22461 5.56064 3.5604 5.22485 3.97461 5.22485H19.9746C20.3888 5.22485 20.7246 5.56064 20.7246 5.97485C20.7246 6.38907 20.3888 6.72485 19.9746 6.72485H3.97461C3.5604 6.72485 3.22461 6.38907 3.22461 5.97485V5.97485Z" fill="#3A3A3A" />
                      <path d="M3.22461 11.9749C3.22461 11.5606 3.5604 11.2249 3.97461 11.2249H19.9746C20.3888 11.2249 20.7246 11.5606 20.7246 11.9749C20.7246 12.3891 20.3888 12.7249 19.9746 12.7249H3.97461C3.5604 12.7249 3.22461 12.3891 3.22461 11.9749V11.9749Z" fill="#3A3A3A" />
                      <path d="M3.22461 17.9749C3.22461 17.5606 3.5604 17.2249 3.97461 17.2249H19.9746C20.3888 17.2249 20.7246 17.5606 20.7246 17.9749C20.7246 18.3891 20.3888 18.7249 19.9746 18.7249H3.97461C3.5604 18.7249 3.22461 18.3891 3.22461 17.9749V17.9749Z" fill="#3A3A3A" />
                    </svg>
                  </div>
                </Disclosure.Button>
              </div>
              <div className="flex-shrink-0 flex items-center lg:block hidden">
                <BrandImage />
              </div>
              <div className="flex-shrink-0 flex items-center lg:hidden mx-8 md:mx-10 sm:block ">
                <BrandImage />
              </div>
              <div className="lg:flex-1  lg:flex hidden items-center justify-start sm:items-stretch sm:justify-start pl-10">
                <div className="flex xl:space-x-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={(e) =>
                        !UserData.id &&
                          item.href === USERPROFILE_ROUTES.MYREPORTS
                          ? redirectTo(e, {
                            pathname: APP_ROUTES.LOGIN,
                            state: { background: location, login: true },
                          })
                          : ""
                      }
                      className={classNames(
                        item.current ? "" : "",
                        `${location.pathname === item.href && "text-black-500 font-bold"
                        } px-2 py-2 mx-2 rounded-md hover:text-brand-lightgreen font-medium text-black-500 text-xs lg:text-xs xl:text-sm`
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                      <p
                        className={classNames(
                          item.current ? "" : "",
                          `${location.pathname === item.href &&
                          "border-brand-lightgreen bg-brand-lightgreen border w-7 m-auto"
                          } border border-transparent hover:border hover:border-brand-lightgreen w-7 m-auto `
                        )}
                      ></p>
                    </Link>
                  ))}
                  {/* <Dropdown /> */}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex flex-wrap items-center sm:static sm:inset-auto sm:ml-4 sm:pr-0 xl:space-x-4">
                <div className="flex gap-1 md:gap-2 items-center xl:space-x-3 md:-left-1 xl:left-4 relative">
                  {/* <div className="bg-white lg:flex hidden rounded-full  content-center ring-4 ring-blue-50 ring-opacity-60 gap-5 lg:h-9 lg:w-9 my-1 mx-3">
                  <button onClick={(e) => redirectTo(e, APP_ROUTES.NOT_FOUND)} className="lg:px-1  px-2 text-gray-400">
                    <img src={Ambulance} alt="" className="lg:h-8  lg:w-8 " aria-hidden="true" />
                  </button>
                 </div> */}
                  {UserData.id && (
                    <div>
                      <Menu as="div" className="ml-1  relative rounded-b-2">
                        {({ open }) => (
                          <>
                            <div>
                              <Menu.Button
                                className={`mx-1 py-2 md:p-2 sm:block md:block lg:flex text-sm rounded-full focus:outline-none`}
                              >
                                <span className="sr-only">Open menu</span>

                                {
                                  notificationList?.length > 0 &&

                                      <h1 className="text-size absolute text-center text-xs ml-4 md:ml-7 md:mt-0 lg:ml-4 top-1 font-medium text-white bg-brand-lightgreen rounded-xl h-4 w-4">
                                        {notificationList?.length <=9 ? notificationList?.length:"9+"}
                                      </h1>



                                }

                                <svg width="24" height="26" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M25.707 18.793L23 16.086V12.5C22.9969 10.0218 22.075 7.63285 20.4126 5.79498C18.7502 3.95712 16.4654 2.80093 14 2.55V0.5H12V2.55C9.53457 2.80093 7.24976 3.95712 5.58737 5.79498C3.92498 7.63285 3.0031 10.0218 3 12.5V16.086L0.293 18.793C0.105451 18.9805 5.66374e-05 19.2348 0 19.5V22.5C0 22.7652 0.105357 23.0196 0.292893 23.2071C0.48043 23.3946 0.734784 23.5 1 23.5H8V24.277C7.97825 25.5456 8.4254 26.7777 9.25578 27.737C10.0862 28.6964 11.2414 29.3156 12.5 29.476C13.1952 29.5449 13.8971 29.4676 14.5606 29.249C15.2241 29.0304 15.8345 28.6753 16.3525 28.2066C16.8706 27.7379 17.2848 27.166 17.5685 26.5277C17.8522 25.8893 17.9992 25.1986 18 24.5V23.5H25C25.2652 23.5 25.5196 23.3946 25.7071 23.2071C25.8946 23.0196 26 22.7652 26 22.5V19.5C25.9999 19.2348 25.8946 18.9805 25.707 18.793ZM16 24.5C16 25.2956 15.6839 26.0587 15.1213 26.6213C14.5587 27.1839 13.7956 27.5 13 27.5C12.2044 27.5 11.4413 27.1839 10.8787 26.6213C10.3161 26.0587 10 25.2956 10 24.5V23.5H16V24.5ZM24 21.5H2V19.914L4.707 17.207C4.89455 17.0195 4.99994 16.7652 5 16.5V12.5C5 10.3783 5.84285 8.34344 7.34315 6.84315C8.84344 5.34285 10.8783 4.5 13 4.5C15.1217 4.5 17.1566 5.34285 18.6569 6.84315C20.1571 8.34344 21 10.3783 21 12.5V16.5C21.0001 16.7652 21.1054 17.0195 21.293 17.207L24 19.914V21.5Z" fill="#585858" />
                                </svg>
                              </Menu.Button>
                            </div>
                            <Transition
                              show={open}
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items
                                static
                                className="origin-top-right rounded absolute -right-20 md:right-0 mt-2 w-64 md:w-80 px-4  py-1 h-96 overflow-y-scroll scroll-bar bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                              >
                                {

                                  notificationList?.length > 0 && notificationList?.splice(0,10).map((res, i) => {
                                    //let dateTime = res.date;

                                    let dateTime = res?.date
                                    let subject = res?.subject

                                     console.log('is mmmmmdsnfkj',res.subject)

                                    {/* if (dateTime == undefined)
                                      return */}

                                    return (
                                      <Menu.Item key={i}>

                                          <div className="w-full py-1" style={{ borderBottom: '1px solid rgb(220 219 219)'}}>
                                            <div className="flex px-1 ">
                                              {res.subject === APP_CONFIRMATION ? <div>
                                                <img className="h-12" src={steth} alt="" />
                                              </div> : <img className="h-10" src={med} alt="" />}
                                              <div className="flex justify-between flex-wrap mx-3 my-1 font-montserrat font-normal w-full">
                                                <div className="md:w-1/2">
                                                  <div className="w-full text-sm">
                                                    <span>{res.trigeredToName}</span>
                                                  </div>
                                                  {res.subject === APP_CONFIRMATION ? <div className="md:flex">
                                                    <div className="bg-brand-cerulean mt-1 font-montserrat  text-xs text-white rounded-xl h-4 content-center flex flex-wrap p-1 ">
                                                      {UserData?.firstName?.trim() === res?.patientName?.trim() ? "Self" : "Mother"}
                                                    </div>
                                                    <div>
                                                      <p className="px-1 font-montserrat text-xs font-normal mt-1 ">Online</p>
                                                    </div>
                                                  </div> :
                                                    <div className="w-28  font-rubik text-xs break-words text-gray-600">
                                                      <span>{res?.subject}</span>
                                                    </div>}
                                                </div>
                                                <div className="flex md:w-1/2 " >
                                                  <div className=" font-semibold font-montserrat text-right text-sm w-full">
                                                    <div className="mb-1">
                                                      <span className={`${moment().isAfter(dateTime) ? 'text-red-600  ' : 'text-brand-lightgreen '} text-right font-semibold font-montserrat text-xs`}>
                                                        {dateTime !== '.' ? moment().isSame(moment(dateTime).format('DD/MM/YYYY'), 'date') ? 'Today' : moment().isAfter(dateTime, 'date') ? "Late" : "Upcoming" : ''}
                                                      </span>
                                                    </div>
                                                    {dateTime !== '.' ? < div >
                                                      <p className="font-semibold font-montserrat text-xs ">{moment() !== moment(dateTime, 'dd/MM/YYYY') && (moment(res.date).format('DD/MM/YYYY HH:mm'))} </p>
                                                    </div> : ''}
                                                  </div>
                                                </div>

                                              </div>
                                            </div>
                                          </div>


                                      </Menu.Item>
                                    );
                                  })}
                              </Menu.Items>
                            </Transition>
                          </>
                        )}
                      </Menu>
                    </div>
                  )}
                  {UserData.id && (
                    <div className="relative">
                      <button
                        onClick={(e) => redirectTo(e, APP_ROUTES.MEDICINE_CART)}
                        className="p-2 lg:flex  md:block "
                      >
                        <span className="sr-only">Cart</span>
                        {cartList?.patientMedicineOrder?.length > 0 ||
                          cartList?.patientLabTestsOrder?.length > 0 ? (
                          <div>
                            <h1 className="text-size absolute text-center text-xs ml-5 -mt-1 text-white font-medium bg-brand-lightgreen rounded-xl h-4 w-4">
                              {cartCount(cartList)<=9? cartCount(cartList):"9+"}
                            </h1>
                            <svg width="24" height="22" className="w-6 h-6 md:w-8 md:h-7" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.375 5.62729V7.50229H27.1875V11.2139L25.1074 17.8148H8.78508L6.44133 0.9375H0.9375V2.8125H4.80867L7.15242 19.6898H26.4825L29.0625 11.5023V5.62729H9.375ZM10.3702 21.5827C9.37594 21.5838 8.42277 21.9792 7.71976 22.6823C7.01674 23.3853 6.62129 24.3384 6.62016 25.3327C6.62016 26.3272 7.01524 27.281 7.71851 27.9843C8.42177 28.6876 9.37559 29.0827 10.3702 29.0827C11.3647 29.0827 12.3185 28.6876 13.0218 27.9843C13.7251 27.281 14.1202 26.3272 14.1202 25.3327C14.119 24.3384 13.7236 23.3853 13.0206 22.6822C12.3176 21.9792 11.3644 21.5838 10.3702 21.5827ZM10.3702 27.2077C9.99932 27.2077 9.6368 27.0977 9.32846 26.8917C9.02012 26.6856 8.7798 26.3928 8.63788 26.0502C8.49597 25.7076 8.45884 25.3306 8.53118 24.9669C8.60353 24.6031 8.78211 24.2691 9.04433 24.0068C9.30655 23.7446 9.64065 23.566 10.0044 23.4937C10.3681 23.4213 10.7451 23.4585 11.0877 23.6004C11.4303 23.7423 11.7231 23.9826 11.9292 24.291C12.1352 24.5993 12.2452 24.9618 12.2452 25.3327C12.2446 25.8298 12.0468 26.3063 11.6953 26.6578C11.3438 27.0093 10.8673 27.2071 10.3702 27.2077ZM23.4952 21.5827C22.5009 21.5838 21.5478 21.9792 20.8448 22.6823C20.1417 23.3853 19.7463 24.3384 19.7452 25.3327C19.7452 26.3272 20.1402 27.281 20.8435 27.9843C21.5468 28.6876 22.5006 29.0827 23.4952 29.0827C24.4897 29.0827 25.4435 28.6876 26.1468 27.9843C26.8501 27.281 27.2452 26.3272 27.2452 25.3327C27.244 24.3384 26.8486 23.3853 26.1456 22.6822C25.4426 21.9792 24.4894 21.5838 23.4952 21.5827ZM23.4952 27.2077C23.1243 27.2077 22.7618 27.0977 22.4535 26.8917C22.1451 26.6856 21.9048 26.3928 21.7629 26.0502C21.621 25.7076 21.5838 25.3306 21.6562 24.9669C21.7285 24.6031 21.9071 24.2691 22.1693 24.0068C22.4316 23.7446 22.7656 23.566 23.1294 23.4937C23.4931 23.4213 23.8701 23.4585 24.2127 23.6004C24.5553 23.7423 24.8481 23.9826 25.0542 24.291C25.2602 24.5993 25.3702 24.9618 25.3702 25.3327C25.3696 25.8298 25.1718 26.3063 24.8203 26.6578C24.4688 27.0093 23.9923 27.2071 23.4952 27.2077Z" fill="#585858" />
                            </svg>

                          </div>
                        ) : (
                          //<h1>{cartList?.patientDrugPrescriptionOrder?.length}</h1>
                          <svg width="24" height="22" className="w-6 h-6 md:w-8 md:h-7" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.375 5.62729V7.50229H27.1875V11.2139L25.1074 17.8148H8.78508L6.44133 0.9375H0.9375V2.8125H4.80867L7.15242 19.6898H26.4825L29.0625 11.5023V5.62729H9.375ZM10.3702 21.5827C9.37594 21.5838 8.42277 21.9792 7.71976 22.6823C7.01674 23.3853 6.62129 24.3384 6.62016 25.3327C6.62016 26.3272 7.01524 27.281 7.71851 27.9843C8.42177 28.6876 9.37559 29.0827 10.3702 29.0827C11.3647 29.0827 12.3185 28.6876 13.0218 27.9843C13.7251 27.281 14.1202 26.3272 14.1202 25.3327C14.119 24.3384 13.7236 23.3853 13.0206 22.6822C12.3176 21.9792 11.3644 21.5838 10.3702 21.5827ZM10.3702 27.2077C9.99932 27.2077 9.6368 27.0977 9.32846 26.8917C9.02012 26.6856 8.7798 26.3928 8.63788 26.0502C8.49597 25.7076 8.45884 25.3306 8.53118 24.9669C8.60353 24.6031 8.78211 24.2691 9.04433 24.0068C9.30655 23.7446 9.64065 23.566 10.0044 23.4937C10.3681 23.4213 10.7451 23.4585 11.0877 23.6004C11.4303 23.7423 11.7231 23.9826 11.9292 24.291C12.1352 24.5993 12.2452 24.9618 12.2452 25.3327C12.2446 25.8298 12.0468 26.3063 11.6953 26.6578C11.3438 27.0093 10.8673 27.2071 10.3702 27.2077ZM23.4952 21.5827C22.5009 21.5838 21.5478 21.9792 20.8448 22.6823C20.1417 23.3853 19.7463 24.3384 19.7452 25.3327C19.7452 26.3272 20.1402 27.281 20.8435 27.9843C21.5468 28.6876 22.5006 29.0827 23.4952 29.0827C24.4897 29.0827 25.4435 28.6876 26.1468 27.9843C26.8501 27.281 27.2452 26.3272 27.2452 25.3327C27.244 24.3384 26.8486 23.3853 26.1456 22.6822C25.4426 21.9792 24.4894 21.5838 23.4952 21.5827ZM23.4952 27.2077C23.1243 27.2077 22.7618 27.0977 22.4535 26.8917C22.1451 26.6856 21.9048 26.3928 21.7629 26.0502C21.621 25.7076 21.5838 25.3306 21.6562 24.9669C21.7285 24.6031 21.9071 24.2691 22.1693 24.0068C22.4316 23.7446 22.7656 23.566 23.1294 23.4937C23.4931 23.4213 23.8701 23.4585 24.2127 23.6004C24.5553 23.7423 24.8481 23.9826 25.0542 24.291C25.2602 24.5993 25.3702 24.9618 25.3702 25.3327C25.3696 25.8298 25.1718 26.3063 24.8203 26.6578C24.4688 27.0093 23.9923 27.2071 23.4952 27.2077Z" fill="#585858" />
                          </svg>
                        )}
                      </button>
                    </div>
                  )}

                  {UserData?.id && (
                    <div>
                      <Menu as="div" className="md:ml-3  relative rounded-b-2">
                        {({ open }) => (
                          <>
                            <div>
                              <Menu.Button
                                className={` flex text-sm rounded-full focus:outline-none`}
                              >
                                <span className="sr-only">Open menu</span>
                                {/* <BellIcon className="h-6 w-6 md:h-7 md:w-7 text-brand-primary" /> */}


                                {
                                  couponList?.length > 0 &&


                                  <h1 className="text-size absolute text-center text-xs ml-5 md:ml-7 lg:ml-8 xl:ml-9 -mt-2 md:-mt-1   top-1 font-medium text-white bg-brand-lightgreen rounded-xl h-4 w-4">
                                    {couponList?.length <=9 ? couponList?.length : "9+"}
                                  </h1>


                                }




                                <img
                                  className="block h-7 w-7 lg:h-9 lg:w-12 md:h-10 md:w-auto cursor-pointer"
                                  src={Voucher_animated}
                                  alt="Workflow"

                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              show={open}
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items
                                static
                                className="origin-top-right rounded absolute  right-0 mt-2 w-auto md:w-80 px-1 md:px-4  py-1  overflow-y-scroll scroll-bar bg-white ring-1 ring-black ring-opacity-5 focus:outline-none h-72 "
                              >
                                {couponList?.length > 0 &&
                                  couponList.map((res, i) => {
                                    return (
                                      <Menu.Item key={i}>
                                        <div className="w-auto py-1">
                                          <div className="flex px-1">
                                            <div className="flex justify-between flex-wrap mx-3 my-1  font-normal w-full">
                                              <div className="">
                                                <div
                                                  className="w-full text-sm mb-2"
                                                  style={{
                                                    color: "#005D8D",
                                                    fontWeight: "bold",
                                                  }}
                                                >
                                                  <span>{res.voucherCode}</span>
                                                </div>
                                                <div className="w-52   text-sm">
                                                  <span>
                                                    {res.voucherCampDescription}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </Menu.Item>
                                    );
                                  })}
                              </Menu.Items>
                            </Transition>
                          </>
                        )}
                      </Menu>
                    </div>
                  )}

                  {
                    screen > 500 &&
                    <div className="lg:left-0 left-3 md:left-2 relative">
                      <a
                        href={'https://curebay.com'}
                        target="_blank" rel="noreferrer noopener"
                        className="md:p-2 "
                      >
                        <span className="sr-only">Profile</span>

                        <p className=" gap-2 md:gap-3 text-xs lg:text-xs xl:text-sm mr-4 md:mr-2 lg:mr-0 lg:ml-2  font-medium px-2 md:px-3 lg:px-2  py-2 rounded-lg" style={{ color: "#000", borderWidth: 1, borderColor: '#585858' }}>

                          All About CureBay
                        </p>
                        {/* <UserCircleIcon className="lg:h-7 lg:w-7 w-10 h-10 text-brand-primary" /> */}
                      </a>
                    </div>
                  }



                  {!UserData.id && (
                    <div className="lg:left-0 left-3 md:left-2 relative">
                      <button
                        onClick={(e) =>
                          redirectTo(e, {
                            pathname: APP_ROUTES.LOGIN,
                            state: { background: location, login: true },
                          })
                        }
                        className="md:p-2 "
                      >
                        <span className="sr-only">Profile</span>

                        <p className="flex gap-2 md:gap-3 text-white text-sm font-medium px-2 md:px-4 py-2 rounded-lg" style={{ backgroundColor: "#66B889", color: "#FFFFFF" }}>
                          <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.2923 8.3125C13.6391 8.41146 13.9693 8.54576 14.2829 8.7154C14.5965 8.88504 14.9248 9.14304 15.2679 9.4894C15.611 9.83575 15.9043 10.244 16.1478 10.714C16.3913 11.1841 16.5942 11.7919 16.7565 12.5377C16.9188 13.2834 17 14.1192 17 15.0452C17 16.1337 16.6311 17.065 15.8932 17.839C15.1554 18.613 14.2663 19 13.2259 19H3.77409C2.73372 19 1.84462 18.613 1.10677 17.839C0.368924 17.065 0 16.1337 0 15.0452C0 14.1192 0.0811632 13.2834 0.24349 12.5377C0.405816 11.7919 0.608724 11.1841 0.852214 10.714C1.0957 10.244 1.389 9.83575 1.7321 9.4894C2.0752 9.14304 2.40354 8.88504 2.71712 8.7154C3.03071 8.54576 3.36089 8.41146 3.70768 8.3125C3.12478 7.42894 2.83333 6.46763 2.83333 5.42857C2.83333 4.69345 2.98275 3.99191 3.28158 3.32394C3.5804 2.65597 3.98437 2.07812 4.49349 1.5904C5.0026 1.10268 5.60579 0.715681 6.30306 0.429408C7.00033 0.143136 7.73264 0 8.5 0C9.26736 0 9.99967 0.143136 10.6969 0.429408C11.3942 0.715681 11.9974 1.10268 12.5065 1.5904C13.0156 2.07812 13.4196 2.65597 13.7184 3.32394C14.0173 3.99191 14.1667 4.69345 14.1667 5.42857C14.1667 6.46763 13.8752 7.42894 13.2923 8.3125ZM8.5 1.35714C7.32682 1.35714 6.3252 1.75474 5.49512 2.54994C4.66504 3.34514 4.25 4.30469 4.25 5.42857C4.25 6.55245 4.66504 7.512 5.49512 8.3072C6.3252 9.1024 7.32682 9.5 8.5 9.5C9.67318 9.5 10.6748 9.1024 11.5049 8.3072C12.335 7.512 12.75 6.55245 12.75 5.42857C12.75 4.30469 12.335 3.34514 11.5049 2.54994C10.6748 1.75474 9.67318 1.35714 8.5 1.35714ZM13.2259 17.6429C13.8752 17.6429 14.4304 17.3902 14.8916 16.8848C15.3528 16.3794 15.5833 15.7662 15.5833 15.0452C15.5833 13.3558 15.2937 12.0234 14.7145 11.048C14.1353 10.0725 13.3034 9.56008 12.2188 9.5106C11.1489 10.4083 9.90929 10.8571 8.5 10.8571C7.09071 10.8571 5.85113 10.4083 4.78125 9.5106C3.69661 9.56008 2.86469 10.0725 2.28548 11.048C1.70627 12.0234 1.41667 13.3558 1.41667 15.0452C1.41667 15.7662 1.64724 16.3794 2.1084 16.8848C2.56955 17.3902 3.12478 17.6429 3.77409 17.6429H13.2259Z" fill="white" />
                          </svg>
                          <p>Login / Signup</p>
                        </p>
                        {/* <UserCircleIcon className="lg:h-7 lg:w-7 w-10 h-10 text-brand-primary" /> */}
                      </button>
                    </div>
                  )}






                  <div>
                    {/* Profile dropdown */}
                    <Menu as="div" className="xl:ml-3 relative">
                      {({ open }) =>
                        screen > 800 ? (
                          <>
                            <div>
                              <Menu.Button
                                className={`${!UserData.id && "hidden"
                                  } p-2  flex text-sm rounded-full focus:outline-none`}
                              >
                                <div className="border-1 rounded-full items-center w-11 h-11 flex justify-center  text-white rounded-lg" style={{ border: "1px solid #D7EBF5", backgroundColor: "#EAF8FF" }}>
                                  <span className="font-bold text-black text-lg" style={{ fontFamily: "open sans" }}>
                                    {UserData && UserData.firstName
                                      ? UserData?.firstName[0].toUpperCase()
                                      : ""}
                                  </span>
                                </div>
                              </Menu.Button>
                            </div>

                            <Transition
                              show={open}
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items
                                static
                                className="origin-top-right absolute right-0 mt-2 w-40  py-1 bg-white shadow-xl rounded-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                              >
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to={USERPROFILE_ROUTES.MYDETAILS}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-2 py-2 mx-2 rounded-md hover:text-brand-lightgreen font-medium text-brand-primary  text-sm"
                                      )}
                                    >
                                      My Profile{" "}
                                    </Link>
                                  )}
                                </Menu.Item>

                                <hr />

                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to={USERPROFILE_ROUTES.MYCHANGEPASSWORD}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-2 py-2 mx-2 rounded-md hover:text-brand-lightgreen font-medium text-brand-primary  text-sm"
                                      )}
                                    >
                                      Change Password{" "}
                                    </Link>
                                  )}
                                </Menu.Item>

                                <hr />

                                <Menu.Item>
                                  {({ active }) => (
                                    <p
                                      onClick={() => {
                                        logout();
                                      }}
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 cursor-pointer "
                                          : "",
                                        "block px-4 py-2 text-sm  rounded-md  font-medium text-red-800 "
                                      )}
                                    >
                                      Sign out
                                    </p>
                                  )}
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </>
                        ) : (
                          <>
                            <div>
                              <Menu.Button
                                className={`${!UserData.id && "hidden"
                                  } p-1 flex text-sm rounded-full focus:outline-none`}
                              >
                                <div className="border-1 rounded-full items-center w-9 h-9 flex justify-center  text-white rounded-lg" style={{ border: "1px solid #D7EBF5", backgroundColor: "#EAF8FF" }}>
                                  <span
                                    className="font-bold text-black text-lg"
                                    onClick={() =>
                                      history.push({
                                        pathname: APP_ROUTES.MENUBAR,
                                        calledFrom: "loginPerson",
                                      })
                                    }
                                  >
                                    {UserData && UserData.firstName
                                      ? UserData?.firstName[0].toUpperCase()
                                      : ""}
                                  </span>
                                </div>
                              </Menu.Button>
                            </div>
                          </>
                        )
                      }
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </Disclosure>
      <NavBarSearch
        visible={` ${location.pathname.includes("doctors/") ||
          location.pathname.includes("/order-sucess") ||
          location.pathname.includes("/seeallallergy") ||
          location.pathname.includes("/seeallmedicalhistory") ||
          location.pathname.includes("/seeallsurgicalhistory") ||
          location.pathname.includes("/seeallfamilyhistory") ||
          location.pathname.includes("/seeallsocialhistory") ||
          location.pathname.includes("/seeallmedication") ||

          location.pathname.includes("hospitaldetails/") ||
          location.pathname.includes("allmedicines/") ||
          location.pathname.includes("/packagesineorders") ||
          location.pathname.includes("/allradiology") ||
          location.pathname == APP_ROUTES.FORGET_PASSWORD ||
          location.pathname == APP_ROUTES.LOGIN ||
          location.pathname == APP_ROUTES.DOCTOR_SEARCH ||
          location.pathname == APP_ROUTES.HOSPITAL_SEARCH ||
          location.pathname == APP_ROUTES.LALPATH_LAB ||
          location.pathname == USERPROFILE_ROUTES.MYHELPSUPPORT ||
          location.pathname == USERPROFILE_ROUTES.MYNOTIFICATION ||
          location.pathname == USERPROFILE_ROUTES.MYFEEDBACK ||
          location.pathname == USERPROFILE_ROUTES.MYCHANGEPASSWORD ||
          location.pathname == USERPROFILE_ROUTES.MYADDRESSBOOK ||
          location.pathname == USERPROFILE_ROUTES.MYWALLET ||
          location.pathname == USERPROFILE_ROUTES.MYPAYMENTS ||
          location.pathname == USERPROFILE_ROUTES.PATIENTMEDICINEORDERS ||
          location.pathname == USERPROFILE_ROUTES.MY_ORDERS ||
          location.pathname == USERPROFILE_ROUTES.MYREQUESTS ||
          location.pathname == USERPROFILE_ROUTES.MYAPPOINTMENTS ||
          location.pathname == USERPROFILE_ROUTES.MYVITALS ||
          location.pathname == USERPROFILE_ROUTES.MYLABREPORT ||
          location.pathname == USERPROFILE_ROUTES.MYPRISCRIPTION ||
          location.pathname == APP_ROUTES.MEDICINEDELIVERYORDERDETAILS ||
          location.pathname == APP_ROUTES.MEDICINE ||
          location.pathname == APP_ROUTES.APPOINMENT_CONFIRM ||
          location.pathname == USERPROFILE_ROUTES.MYREPORTS ||
          location.pathname == USERPROFILE_ROUTES.MYMEDICALHISTORY ||
          location.pathname == APP_ROUTES.MEDICINE_ORDERPLACE ||
          location.pathname == APP_ROUTES.HOSPITAL_DETAILS ||
          location.pathname == USERPROFILE_ROUTES.MANAGEPROFILE ||
          location.pathname == USERPROFILE_ROUTES.MYDETAILS ||
          location.pathname == USERPROFILE_ROUTES.PROFILE ||
          location.pathname == APP_ROUTES.PAYMENT ||
          location.pathname == APP_ROUTES.POST_CONSULTATION ||
          location.pathname == APP_ROUTES.MEDICINE_PRODUCT ||
          location.pathname == APP_ROUTES.REFUND_POLICY ||
          location.pathname == APP_ROUTES.TERMS_AND_CONDITION ||
          location.pathname == APP_ROUTES.PRIVACY_POLICY ||
          location.pathname == APP_ROUTES.ABOUTUS ||
          location.pathname == APP_ROUTES.MEDIA ||
          location.pathname == APP_ROUTES.CONTACTWITHUS ||
          location.pathname == APP_ROUTES.OUR_TEAM ||
          location.pathname == APP_ROUTES.HOSPITAL_ENQUIRY ||
          location.pathname == APP_ROUTES.UPLOADED_PRESCRIPTION ||
          location.pathname == APP_ROUTES.COMINGSOON ||
          location.pathname == APP_ROUTES.SIEBAR ||
          location.pathname == APP_ROUTES.MENUBAR ||
          location.pathname == APP_ROUTES.MEDICINE_CART
          ? "hidden" || location.pathname == "/profile/mydetails"
          : ""
          }`}
      />
    </div >
  );
};

export default Header;
