/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect, useRef } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { secureStorage } from "../Redux/Reducers/authReducer";
import LocateIcon from "../Assets/Images/locate.svg";
import HomeIcon from "../Assets/Images/home.svg";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import Mapp from "./mapp";
import {
  patientaddresslists,
  getPatientDetails,
} from "../Redux/Actions/UserprofileActions";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setLatLong,
  setAddressString,
  setSearchString,
  actioncustomPinCode,
} from "../Redux/Actions/userActions";
import http from "../Redux/services/http-common";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import "../Assets/css/custom-style.scss";

// import {
//   esgetDoctorslist,
//   getDoctorslist,
//   getDoctorspecialitylist,
// } from "../Redux/Actions/doctorAction";
import doctorService from "../Redux/services/doctorService";
import hospitalservice from "../Redux/services/hospitalservice";
import Diagnosticsservice from "../Redux/services/Diagnosticsservice";
import { Dialog } from "primereact/dialog";
import { gethospitallist } from "../Redux/Actions/hospitalpageActions";
// import { Input } from "@mui/material";
import { useLocation } from "react-router-dom";
import { debounce } from "lodash";
// import {ClickAwayListener} from ''

import "../Assets/css/custom-style.scss";
import axios from "axios";
function SearchBar(props) {
  const history = useHistory();
  const prevScrollY = useRef(0);
  const menuRef = useRef();
  const locationDropdownRef = useRef(null);
  const inputRef = useRef(null);
  const userData = useSelector((state) => state.authReducer.patientData);
  const search = useSelector((state) => state.authReducer.search);
  const address = useSelector((state) => state.authReducer.address);
  const pincodelocation = useSelector(
    (state) => state.authReducer.pincodelocation
  );

  const [mapOpen, setMapOpen] = useState(false);
  const [allOpen, setAllOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedAll, setSelectedAll] = useState("All");
  const [isTextSelected, setIsTextSelected] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const dispatch = useDispatch();

  const patientinfo = useSelector((state) => state.patientinfo);
  const { patientinfoData, isLoading, isSuccess } = patientinfo;
  const addressinfo = useSelector((state) => state.patientaddresslist);
  const { patientaddressinfoData } = addressinfo;
  const commonHealtList = useSelector((state) => state.doctspecialitylist);
  const { doctspecialityData } = commonHealtList;
  const [searchData, setSearchData] = useState();
  const coords = useSelector((state) => state.authReducer.coords);
  const [text, setSearchText] = useState("");
  const [newPinCode, setPinCode] = useState("");
  const [bannerHeight, setBannerHeight] = useState(0);
  const [error, setError] = useState({
    isMMILoading: false,
    locationError: "",
  });
  const [open, setOpen] = useState(false);

  const [navigate, setNavigate] = useState("all");

  const location = useLocation();
  const [banner, setBanner] = useState("");
  const [searchedLabtest, setSearchedLabtest] = useState([]);

  useEffect(() => {
    console.log("Location changed", location);
    setBanner(location.pathname);
  }, [location]);

  // const history = useHistory()

  useEffect(() => {
    return history.listen((location) => {
      //  console.log(`You changed the page to: ${location.pathname}`)
      setSearchText("");
    });
  }, [history]);

  // useEffect(() => {

  //   handleSavedAddressClick()
  // }, [patientinfoData]);

  useEffect(() => {
    if (userData) {
      dispatch(getPatientDetails(userData.code)).then((res) => {
        if (res?.pinCode && pincodelocation != "map") {
          let city = res?.city;
          let pinCode = res.pinCode;
          dispatch(setAddressString(city));
          const pincodePackage = require("pincode-lat-long");
          let coords = pincodePackage.getlatlong(pinCode);
          // console.log(coords ,"dvjsdbvsbovdf")
          if (coords == undefined) {
            setError({
              locationError: "Please use valid pincode in profile",
            });
            sessionStorage.setItem("customPinCode", "751009");
            return;
          }
          if (!sessionStorage.getItem("customPinCode")) {
            console.log(
              sessionStorage.getItem("customPinCode"),
              "sdfsdosdhofusduo"
            );
            sessionStorage.setItem("customPinCode", pinCode);
          }

          // dispatch(
          //   actioncustomPinCode({
          //     pincode: pinCode,
          //     location: "profileaddress",
          //   })
          // );
        } else {
          if (!sessionStorage.getItem("customPinCode")) {
            sessionStorage.setItem("customPinCode", "751009");
          }
        }
        // }
      });

      dispatch(patientaddresslists(userData.code));
    }
  }, [userData.code]);

  const selectedText = (val, code, e) => {
    console.log(val, "safsdihovshdiovs");
    setSearchOpen(!searchOpen);
    setSearchText(val);
    redirectTo(e, val);
    // if(banner !== "/"){
    //   clearTimeout(timer)
    // }
    // dispatch(setSearchString({ string: val, drop: selectedAll, code: code }))
  };

  useEffect(() => {
    const handleOutSideClick = (e) => {
      if (!menuRef?.current?.contains(e.target)) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      window.addEventListener("mousedown", handleOutSideClick);
    } else {
      window.removeEventListener("mousedown", handleOutSideClick);
    }
  }, [searchOpen]);

  const debouncedSearch = React.useRef(
    debounce(async (e, location) => {

      if (e.target.value.length > 2 && !isTextSelected) {
        console.log(location.pathname, "sdvhsdouhvuosdbvoudsb");
        if (location.pathname === "/") {
          //all api call

          let api_list = [];

          let api_list_doctor = [];
          let api_list_hospital = [];
          let api_list_lab = [];
          let api_list_medicine = [];
          let res = await doctorService
            .esgetDoctorslist(coords, e.target.value, 1, 20)
          // .then((res) => {
          console.log("1", "sdvsdvdsobvosdbvod");
          res?.data?.map((search) => {
            api_list_doctor.push({
              code: search?.userId,
              text: search?.userName,
              symptoms: search?.symptoms,
              specialities: search?.specialities,
            });
          });



          let res1 = await hospitalservice
            .esgetHopitalslist(coords, e.target.value, 1, 20)
          // .then((res) => {
          console.log("2", "sdvsdvdsobvosdbvod");
          res1?.data?.map((search) => {
            console.log("searchxx", search);
            api_list_hospital.push({
              code: search?.code,
              text: search?.hospitalName,
            });
          });


          let res2 = await axios
            .get(
              `${process.env.REACT_APP_ELASTIC_BASEURL}labtest?latitude=${coords.lat}&longitude=${coords.long}&freeTextSearch=${e.target.value}`
            )
          // .then((res) => {
          console.log("3", "sdvsdvdsobvosdbvod");

          let data = res2?.data?.map((search) => {
            console.log("searchxx", search);
            api_list_lab.push({
              code: search?.labTestCode,
              text: search?.labTestName,
            });
          });



          ///////////// Medicines///////////////

          let res3 = await axios
            .get(
              `${process.env.REACT_APP_ELASTIC_BASEURL}medicine?freeTextSearch=${e.target.value}&pageNo=1&pageSize=20`
            )
          // .then((res) => {
          console.log("4", "sdvsdvdsobvosdbvod");

          res3?.data.map((search) => {
            console.log("searchxx", search);
            api_list_medicine.push({
              code: search?.id,
              text: search?.medicineName,
              symptoms: "",
            });
          });

          console.log(api_list, api_list.length, "api_list");

          // if (searchData?.length && api_list_medicine.length > 0) {
          //   setSearchData(...searchData, api_list_medicine);
          // } else if (api_list_medicine.length > 0) {
          //   setSearchData(api_list_medicine);
          // }
          // });

          //  });
          // });
          api_list = [...api_list_doctor, ...api_list_hospital, ...api_list_lab, ...api_list_medicine]
          setSearchData(api_list)
        } else if (location.pathname === "/all") {
          let api_list = [];

          let api_list_doctor = [];
          let api_list_hospital = [];
          let api_list_lab = [];
          let api_list_medicine = [];
          let res = await doctorService
            .esgetDoctorslist(coords, e.target.value, 1, 20)
          // .then((res) => {
          console.log("1", "sdvsdvdsobvosdbvod");
          res?.data?.map((search) => {
            api_list_doctor.push({
              code: search?.userId,
              text: search?.userName,
              symptoms: search?.symptoms,
              specialities: search?.specialities,
            });
          });



          let res1 = await hospitalservice
            .esgetHopitalslist(coords, e.target.value, 1, 20)
          // .then((res) => {
          console.log("2", "sdvsdvdsobvosdbvod");
          res1?.data?.map((search) => {
            console.log("searchxx", search);
            api_list_hospital.push({
              code: search?.code,
              text: search?.hospitalName,
            });
          });


          let res2 = await axios
            .get(
              `${process.env.REACT_APP_ELASTIC_BASEURL}labtest?latitude=${coords.lat}&longitude=${coords.long}&freeTextSearch=${e.target.value}`
            )
          // .then((res) => {
          console.log("3", "sdvsdvdsobvosdbvod");

          let data = res2?.data?.map((search) => {
            console.log("searchxx", search);
            api_list_lab.push({
              code: search?.labTestCode,
              text: search?.labTestName,
            });
          });



          ///////////// Medicines///////////////

          let res3 = await axios
            .get(
              `${process.env.REACT_APP_ELASTIC_BASEURL}medicine?freeTextSearch=${e.target.value}&pageNo=1&pageSize=20`
            )
          // .then((res) => {
          console.log("4", "sdvsdvdsobvosdbvod");

          res3?.data.map((search) => {
            console.log("searchxx", search);
            api_list_medicine.push({
              code: search?.id,
              text: search?.medicineName,
              symptoms: "",
            });
          });

          console.log(api_list, api_list.length, "api_list");

          // if (searchData?.length && api_list_medicine.length > 0) {
          //   setSearchData(...searchData, api_list_medicine);
          // } else if (api_list_medicine.length > 0) {
          //   setSearchData(api_list_medicine);
          // }
          // });

          //  });
          // });
          api_list = [...api_list_doctor, ...api_list_hospital, ...api_list_lab, ...api_list_medicine]
          setSearchData(api_list)
        } else if (location.pathname === "/doctors") {
          //doctor api call

          doctorService
            .esgetDoctorslist(coords, e.target.value, 1, 20)
            .then((res) => {
              let data = res?.data.map((search) => {
                console.log("searchxx", search);
                return {
                  code: search?.code,
                  text: search?.userName,
                  // symptoms: search?.symptoms,
                  specialities: search?.specialities,

                  // code: search?.code,
                  // text: search?.userName,
                  // symptoms: search?.symptoms,
                };
              });
              console.log(data, "dsjvhsuovhsdouvhsd");

              setSearchData(data);
            });
        } else if (location.pathname === "/hospital") {
          //hospital api call;
          hospitalservice
            .esgetHopitalslist(coords, e.target.value, 1, 20)
            .then((res) => {
              let data = res?.data.map((search) => {
                console.log("searchxx", search);
                return {
                  code: search?.code,
                  text: search?.hospitalName,
                  // symptoms: search?.symptoms,
                };
              });
              console.log(data, "dsjvhsuovhsdouvhsd");

              setSearchData(data);
            });
        } else if (location.pathname === "/diagnosis") {
          // debugger
          //diagnostics api call
          axios
            .get(
              `${process.env.REACT_APP_ELASTIC_BASEURL}labtest?latitude=${coords.lat}&longitude=${coords.long}&freeTextSearch=${e.target.value}`
            )
            .then((res) => {
              let data = res?.data.map((search) => {
                console.log("searchxx", search);
                return {
                  code: search?.code,
                  text: search?.labTestName,
                  symptoms: search?.symptoms,
                };
              });
              console.log(data, "dsjvhsuovhsdouvhsd");

              setSearchData(data);
              setSearchedLabtest(data);
            });
        } else if (
          location.pathname === "/pharmacycategory" ||
          location.pathname === "/allmedicines"
        ) {
          // debugger
          //diagnostics api call
          axios
            .get(
              `${process.env.REACT_APP_ELASTIC_BASEURL}medicine?freeTextSearch=${e.target.value}&pageNo=1&pageSize=20`
            )
            .then((res) => {
              let data = res?.data.map((search) => {
                console.log("searchxx", search);
                return {
                  code: search?.id,
                  text: search?.medicineName,
                  symptoms: "",
                };
              });
              console.log(data, "dsjvhsuovhsdouvhsd", location.pathname);

              setSearchData(data);
              // setSearchedLabtest(data);
            });
        }

        setSearchOpen(true);
      } else {
        setSearchOpen(false);
      }

      setMapOpen(false);
      setIsTextSelected(false);
    }, 300)
  ).current;

  const onSearchText = (e) => {
    console.log(e.target.value, "qqqqqqqqqqqqqqqqqqqq", e.target.value.length);
    console.log("dsjvhsuovhsdouvhsdhg", location.pathname);
    console.log("loca", location);

    setSearchText(e.target.value);
    setSearchData([])

    debouncedSearch(e, location);
  };

  console.log(
    searchData,
    searchData?.length,
    "sdisdhovdshiovhsod",
    isTextSelected,
    searchOpen,
    text.length
  );

  const removeText = (e, text) => {
    // e.preventDefault();
    setAllOpen(false);
    setSearchText("");
  };

  const redirectTo = (e, text) => {
    if (text.length == 0) return;

    e.preventDefault();
    setMapOpen(false);
    setIsTextSelected(true);
    setAllOpen(false);
    setSearchOpen(true);
    setSearchText("");
    console.log(banner, "dfshfisdhoushv");
    if (location.pathname == "/") {
      if (text) {
        history.push({
          pathname: APP_ROUTES.ALL_SEARCH,
          search: `?search_query=${text}`,
        });
      } else {
        history.push({ pathname: APP_ROUTES.ALL_SEARCH });
      }
    } else if (location.pathname === "/hospital") {
      if (text) {
        history.push({
          pathname: APP_ROUTES.HOSPITAL,
          search: `?search_query=${text}`,
        });
      } else {
        history.push({ pathname: APP_ROUTES.HOSPITAL });
      }
      // })
    } else if (location.pathname === "/doctors") {
      doctorService.esgetDoctorslist(coords, text, 1, 20).then((res) => {
        let data = res?.data.map((search) => {
          console.log("searchxx", search);
          return {
            code: search?.code,
            text: search?.userName,
            symptoms: search?.symptoms,
          };
        });
        console.log(data, "dsjvhsuovhsdouvhsd");
        setSearchData([]);
        setSearchData(data);
      });
      if (text) {
        history.push({
          pathname: APP_ROUTES.DOCTORS,
          search: `?search_query=${text}`,
        });
      } else {
        history.push({ pathname: APP_ROUTES.DOCTORS });
      }
      // })
    } else if (location.pathname === "/all") {
      if (text) {
        history.push({
          pathname: APP_ROUTES.ALL_SEARCH,
          search: `?search_query=${text}`,
        });
      } else {
        history.push({ pathname: APP_ROUTES.ALL_SEARCH });
      }
    } else if (location.pathname === "/diagnosis") {
      if (text) {
        history.push({
          pathname: APP_ROUTES.DIAGNOSIS,
          search: `?search_query=${text}`,
        });
      } else {
        history.push({ pathname: APP_ROUTES.DIAGNOSIS });
      }
    } else if (
      location.pathname === "/pharmacycategory" ||
      location.pathname === "/allmedicines"
    ) {
      if (text) {
        history.push({
          pathname: APP_ROUTES.MEDICINE_ALL_PRODUCTS,
          search: `?search_query=${text}`,
        });
      } else {
        history.push({ pathname: APP_ROUTES.MEDICINE_ALL_PRODUCTS });
      }
      // })
    }
  };

  var customClass;
  customClass= "absolute w-full md:w-7/12 lg:w-7/12 -top-1 md:top-0 lg:top-15 flex flex-wrap justify-center mt-2 p-3 lg:p-6 "
  var isIOS = (function () {

    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    return isIOS ;

  })();

  function getLocation() {
    setError({
      isMMILoading: true,
      locationError: "",
    });
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      console.log(result, "vdsihdsouhgsdougfdsou");
      if (result.state === "granted") {
        if (window.navigator.geolocation) {
          window.navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          console.log("dsfjsdihfoisdhfosdhofi", window.navigator);
        }
      } else if (result.state === "prompt") {
        // showButtonToEnableMap();
      } else if (result.state === "denied") {
        setError({
          locationError: "Please allow browser to detect location",
          isMMILoading: false,
        });
      }
      // Don't do anything if the permission was denied.
    });
  }
  console.log("pincodelocation", pincodelocation);

  function showPosition(position) {
    const { coords } = position;
    console.log("dsfjsdihfoisdhfosdhofi", position);
    var coordsObj = {
      lat: coords.latitude,
      long: coords.longitude,
    };
    dispatch(setLatLong(coordsObj));
    var apiUrl = "MMI/accesstoken";
    http.get(apiUrl).then((response) => {
      let data = response.data;
      // const res = await http.get(
      //   `https://apis.mapmyindia.com/advancedmaps/v1/${data.access_token}/rev_geocode?lat=${coords.latitude}&lng=${coords.longitude}`
      // );
      axios
        .get(
          `https://apis.mapmyindia.com/advancedmaps/v1/${data.access_token}/rev_geocode?lat=${coords.latitude}&lng=${coords.longitude}`
        )
        .then((res) => {
          if (!res.data.results[0].pincode) {
            sessionStorage.setItem("customPinCode", "751009");
            // dispatch(
            //   actioncustomPinCode({
            //     pincode: "751009",
            //     location: "current",
            //   })
            // )
            setError({
              isMMILoading: false,
              locationError: "Not able to detect your location.",
            });
            setOpen(false);
          } else {
            sessionStorage.setItem(
              "customPinCode",
              res.data.results[0].pincode
            );
            // dispatch(
            //   actioncustomPinCode({
            //     pincode: res.data.results[0].pincode,
            //     location: "current",
            //   })
            // )
            setError({
              isMMILoading: false,
            });
            setOpen(false);
          }
        })
        .catch((err) => {
          setError({
            locationError: "Error occured in MMI",
            isMMILoading: false,
          });
        });
      // let addressString = res.data.results[0]?.city;
      // dispatch(setAddressString(addressString));
    });
    secureStorage.setItem("coords", coordsObj);
    // setMapOpen(!mapOpen);
  }

  const setLocation = () => {
    setMapOpen(!mapOpen);
  };

  const handleSavedAddressClick = () => {
    setError({
      locationError: "",
    });

    if (patientinfoData?.pinCode) {
      let address1 = patientinfoData?.address1;
      let address2 = patientinfoData?.address2;
      let city = patientinfoData?.city;
      let pinCode = patientinfoData?.pinCode;
      const pincodePackage = require("pincode-lat-long");
      let coords = pincodePackage.getlatlong(pinCode);
      // console.log(coords ,"dvjsdbvsbovdf")
      if (coords == undefined) {
        setError({
          locationError: "Please use valid pincode",
        });
        return;
      }
      let coordsObj = {
        lat: coords.lat,
        long: coords.long,
      };
      dispatch(setLatLong(coordsObj));
      dispatch(setAddressString(city));
      sessionStorage.setItem("customPinCode", pinCode);
      // dispatch(
      //   actioncustomPinCode({ pincode: pinCode, location: "profileaddress" })
      // );
      setOpen(false);

      // setLocation();
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && !scroll) {
        setScroll(true);
      }
      if (currentScrollY < 5) {
        setScroll(false);
      }

      prevScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const closeOpenMenus = (e) => {
    if (
      locationDropdownRef.current &&
      open &&
      !locationDropdownRef.current.contains(e.target)
    ) {
      setOpen(false);
      setError({
        locationError: "",
      });
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", closeOpenMenus);
    return () => window.removeEventListener("mousedown", closeOpenMenus);
  }, [open]);

  const [scroll, setScroll] = useState(false);

  console.log(text.length, "dsvieoidvhpisvpew", address);

  const onFocused = () => {
    setIsReadOnly(false);
  };

  const handlePinCodeChange = (e) => {
    const re = /^[0-9]*$/; //rules
    if (re.test(e.target.value)) {
      e.target.value.length <= 6 && setPinCode(e.target.value);
    }

    if (e.target.value.length == 0) {
      setError("");
      return;
    }

    if (e.target.value.length == 6) {
      const pincode = require("pincode-lat-long");
      let coords = pincode.getlatlong(e.target.value);
      console.log(coords, "dvjsdbvsbovdf");
      if (coords == undefined) {
        setError({
          locationError: "Please add valid pincode",
        });
        return;
      }
      setOpen(false);
      setError({
        locationError: "",
      });
      let coordsObj = {
        lat: coords.lat,
        long: coords.long,
      };
      dispatch(setLatLong(coordsObj));
      sessionStorage.setItem("customPinCode", e.target.value);
      // dispatch(
      //   actioncustomPinCode({
      //     pincode: e.target.value,
      //     location: "searchbar",
      //   })
      // );
    }
    console.log(e.target.value, "sdvnsoidhvoshvod");
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (


      <div
        className={
          "containerMargin  "
          // +
          // (isBackgroundPresent(banner))
        }
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
      // style = {isBackgroundPresent(banner) === "noscrolleffect" ? {top : `${bannerHeight >= -120 ? bannerHeight : 0}px` , height: `${240 + bannerHeight}px`} : {} }
      >
        <div className={` ${props.visible} flex justify-center sticky top-16 lg:top-10 z-10 ${location.pathname == "/" ? "pb-0 sm:pb-0" : "pb-20 sm:pb-0"}`}>
          <div className={isIOS?  customClass : "absolute w-full md:w-7/12 lg:w-7/12 lg:top-15 flex flex-wrap justify-center mt-2 p-3 lg:p-6 " }>
            <div
              onClick={() => {
                setMapOpen(!mapOpen);
                setSearchOpen(false);
              }}
              className={
                !scroll
                  ? "hidden w-full md:mx-10 text-brand-secondary mb-2 flex "
                  : "hidden"
              }
            >
              <LocationMarkerIcon className="h-5 mr-2 relative" />
              <p className=" relative text-base">Home - {address}</p>
            </div>
            <div className="relative bg-white flex items-center rounded-lg py-3 pl-3 w-full max-w-2xl h-12 justify-between border border-gray-200">
              {/* <ClickAwayListener onClickAway={handleClickAway}> */}
              <div>
                <button
                  // onClick={() => {
                  //   setMapOpen(!mapOpen);
                  //   setSearchOpen(false);
                  // }}
                  className="no"
                  onClick={handleClick}
                >
                  <div className=" flex text-left relative items-center top-0.5 ">
                    {/* <p className="text-gray-600 text-xs  font-medium">Location</p> */}
                    <LocationMarkerIcon
                      style={{
                        height: "15px",
                        color: "#5dbb63",
                        marginRight: "10px",
                      }}
                    />
                    <p className="text-sm  font-semibold text-black-700">
                      {sessionStorage.getItem("customPinCode")}
                    </p>
                  </div>
                </button>
                {open ? (
                  <div
                    ref={locationDropdownRef}
                    style={{
                      minHeight: "fit-content",
                      zIndex: 10,
                      boxShadow: "0 6px 12px -4px rgb(11 18 25 / 20%)",
                      borderRadius: "5px",
                    }}
                    className="block md:w-80  absolute bg-white top-12 bottom-0 left-0 px-2 py-2"
                  >
                    <div className="px-1 py-1 ">
                      <div>
                        <h1 className=" text-base font-medium">
                          Where do you want the delivery?
                        </h1>
                        <span
                          style={{ color: "#0b121980", fontSize: "14px" }}
                          className=""
                        >
                          Get access to your Addresses and Orders
                        </span>
                        <div
                          className={`${patientinfoData?.address1 === null ||
                              patientinfoData?.address2 === null ||
                              patientinfoData?.address1 === undefined ||
                              patientinfoData?.address2 === undefined ||
                              patientinfoData?.city === undefined ||
                              patientinfoData?.pinCode === undefined
                              ? "hidden"
                              : "block"
                            }`}
                        >
                          <div
                            className="cursor-pointer  w-40 px-4 mt-2 py-2 border rounded ml-0 mb-1"
                            onClick={handleSavedAddressClick}
                          >
                            <p className="text-black  text-xs font-normal ">
                              {patientinfoData?.address1 +
                                ", " +
                                patientinfoData?.address2 +
                                ", " +
                                patientinfoData?.city +
                                ", " +
                                patientinfoData?.pinCode}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-1 py-1">
                      <div>
                        <h1 className=" text-base font-medium">Enter Pincode</h1>
                        <span
                          style={{ color: "#0b121980", fontSize: "14px" }}
                          className=""
                        >
                          Select pincode to see product availability.
                        </span>
                        <input
                          className="border w-full py-1 pl-2 my-3 rounded"
                          onChange={handlePinCodeChange}
                          placeholder="Enter Pincode"
                          value={newPinCode}
                        />
                        <div
                          className="flex cursor-pointer content-center"
                          onClick={getLocation}
                        >
                          <img
                            src={LocateIcon}
                            alt=""
                            draggable={false}
                            className="h-8 w-8"
                          />
                          <p className="text-brand-primary  flex items-center text-base font-medium mt-1 ml-2">
                            Detect my location{" "}
                            {error.isMMILoading && (
                              <div className="loader ml-2 float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>
                            )}
                          </p>
                        </div>
                        {error.locationError && (
                          <div className="text-xs font-semibold text-red-500">
                            {" "}
                            {error.locationError}{" "}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* <Menu as="div" className="ml-0  relative">
                {({ open }) => (
                  <>
                    <div
                      onClick={() => {
                        setMapOpen(!mapOpen);
                        setSearchOpen(false);
                      }}
                      className="no"
                    >
                      <Menu.Button>
                        <div className=" flex text-left relative items-center top-0.5 ">
                          <LocationMarkerIcon
                            style={{
                              height: "15px",
                              color: "#5dbb63",
                              marginRight: "10px",
                            }}
                          />
                          <p className="text-sm  font-medium text-gray-700 ">
                            {address }
                          </p>
                        </div>
                      </Menu.Button>
                    </div>
                  </>
                )}
              </Menu> */}
                  </div>
                ) : null}
              </div>
              {/* </ClickAwayListener> */}
              <div className="hidden md:block vertical ml-5"></div>
              <div className="ml-4"></div>
              <Menu as="div" className="ml-3 z-10 relative w-full ">
                <form autoComplete="off">
                  <input
                    onKeyPress={(e) =>
                      e.key == "Enter" ? redirectTo(e, text) : ""
                    }
                    readOnly={isReadOnly}
                    autoCorrect="off"
                    spellCheck={false}
                    onFocus={() => setIsReadOnly(false)}
                    id="filed1"
                    autoFocus={true}
                    onChange={onSearchText}
                    value={text}
                    type="text"
                    className="text-sm focus:outline-none lg:w-96 w-28 text-gray-700"
                    placeholder="Search here"
                  />
                </form>
                {text?.length > 0 &&
                  searchData?.length > 0 &&
                  searchOpen &&
                  !isTextSelected && (
                    <Menu.Items
                      static
                      className="origin-top-right absolute h-auto max-h-96 overflow-hidden overflow-y-scroll scroll-bar bg-white ring-1 ring-gray-600 ring-opacity-5 -left-24 md:-left-4 w-64 md:w-full mt-4 shadow-lg py-0 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none pl-2 pr-2 "
                    >
                      <Menu.Item>
                        {({ active }) => (
                          <div className="w-full">
                            {text.length > 0 &&
                              searchData.filter((v,i,a)=>a.findIndex(v2=>(v2?.text===v?.text))===i)
                                .map((data, i) => (
                                  <>
                                    <div
                                      key={i}
                                      onClick={(e) => {
                                        selectedText(data.text, data.code, e);
                                        setSearchOpen(false);
                                      }}
                                      className="flex flex-col content-center cursor-pointer hover:bg-gray-100  text-gray-secondary px-2 my-1"
                                    >
                                      {data.text ? (
                                        <>
                                          <p className=" font-medium text-sm my-2 ml-2 flex">
                                            <div className="w-8">
                                              <SearchIcon
                                                className="h-6 p-1 rounded-md mr-2 w-6"
                                                color={"#AEAEAE"}
                                              />
                                            </div>
                                            <p className="text-brand-secondary">
                                              {data.text}
                                            </p>
                                          </p>
                                          {/* <div className="md:block horizontal h-0.5 mt-1 w-full bg-gray-100"></div> */}
                                        </>
                                      ) : null}
                                    </div>
                                    {/* <div className="flex flex-col content-center cursor-pointer hover:bg-gray-300 text-gray-secondary px-2 my-1"></div> */}
                                    {data.text ? (
                                      <hr className=" text-gray-100 my-1" />
                                    ) : null}
                                    {/* <div
                                  key={i}
                                  onClick={(e) => {
                                    selectedText(data.text, data.code, e);
                                    setSearchOpen(false);
                                  }}
                                  className="flex flex-col content-center cursor-pointer hover:bg-gray-300 hover:text-brand-secondary text-gray-secondary px-2 my-1"
                                >
                                  {
                                    data.symptoms ? <>
                                      <p className=" font-medium text-sm my-2 ml-2 flex">
                                        <div className="w-8"><SearchIcon className="h-6 p-1 rounded-md mr-2 w-6" color={"#AEAEAE"} /></div>
                                        <p className="text-brand-secondary">
                                          {data.symptoms.length > 43
                                            ? `${data.symptoms.substring(0, 43)}…`
                                            : data.symptoms}</p>
                                      </p>
                                    </> : null
                                  }
                                </div>

                                {data.symptoms ?
                                  <hr className=" text-gray-100 my-1" />
                                  : null
                                } */}

                                    {/* <div
                                  key={i}
                                  onClick={(e) => {
                                    selectedText(data.text, data.code, e);
                                    setSearchOpen(false);
                                  }}
                                  className="flex flex-col content-center cursor-pointer hover:bg-gray-300 hover:text-white rounded-lg text-gray-secondary px-2 my-1"
                                >
                                  {
                                    data.specialities ? <>
                                      <p className=" font-medium text-sm my-2 ml-2 flex">
                                        <div className="w-8"><SearchIcon className="h-6 p-1 rounded-md mr-2 w-6" color={"#AEAEAE"} /></div>
                                        <p className="text-brand-secondary">{data.specialities}</p>
                                      </p>

                                    </> : null
                                  }
                                </div>
                                {data.specialities ?
                                  <hr className=" text-gray-100 my-1" />
                                  : null
                                } */}
                                  </>
                                ))}
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  )}
              </Menu>
              <div className="flex items-center">
                {text.length > 0 && (
                  <ClearOutlinedIcon
                    onClick={(e) => removeText(e, text)}
                    style={{ color: "#838383", height: "20px" }}
                    className="mr-5 cursor-pointer"
                  />
                )}

                <button
                  onClick={(e) => redirectTo(e, text)}
                  className="text-black rounded-r-lg focus:outline-none w-14 h-auto py-3 px-4 text-center bg-brand-primary"
                >
                  <SearchIcon color={"white"} className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <Dialog
            header="Location"
            className="w-full locationContainer"
            visible={mapOpen}
            style={{ height: "100vh" }}
            onHide={() => setMapOpen(false)}
          >
            <div className="w-full sm:w-96 flex sm:m-2 flex-wrap sm:flex-nowrap flex-col-reverse sm:flex-row">
              <div className="w-full mt-6 sm:mt-0 sm:w-4/5">
                <div className="flex content-center">
                  <img
                    src={LocateIcon}
                    alt=""
                    draggable={false}
                    className="h-8 w-8"
                  />
                  <p className="text-brand-primary  font-medium mt-1 ml-2">
                    Detect Current Location
                  </p>
                </div>
                <div onClick={getLocation} className="cursor-pointer">
                  <p className="text-brand-manatee  font-normal ml-10 mb-1">
                    Using GPS
                  </p>
                </div>
                <div
                  className={`${patientinfoData?.address1 === null ||
                      patientinfoData?.address2 === null ||
                      patientinfoData?.address1 === undefined ||
                      patientinfoData?.address2 === undefined ||
                      patientinfoData?.city === undefined ||
                      patientinfoData?.pinCode === undefined
                      ? "hidden"
                      : "block"
                    }`}
                >
                  <div className="mt-1">
                    <p className="text-brand-manatee  font-semibold ">
                      Saved Addresses
                    </p>
                  </div>
                  <div className="flex content-center">
                    <img
                      src={HomeIcon}
                      alt=""
                      draggable={false}
                      className="h-8 w-8"
                    />
                    <p className="text-brand-primary  font-medium mt-1 ml-2">
                      Home
                    </p>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={handleSavedAddressClick}
                  >
                    <p className="text-brand-manatee  font-normal ml-10 mb-1 ">
                      {patientinfoData?.address1 +
                        ", " +
                        patientinfoData?.address2 +
                        ", " +
                        patientinfoData?.city +
                        ", " +
                        patientinfoData?.pinCode}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-2/5 z-10">
                <Mapp onClose={setLocation} />
              </div>
            </div>
          </Dialog>
        </div>
      </div>

  );
}
export default SearchBar;
