import React, { useState, useEffect } from "react";
import Userprofilesidebar from "../userprofilesidebar";
import steth from "../../Assets/Images/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import {
  editPatientDetails,
  getPatientDetails,
} from "../../Redux/Actions/UserprofileActions";
import { sendOtp, verifyRegOtp } from "../../Redux/Actions/userActions";
import camera from "../../Assets/Images/camera.svg";
import { encodeBase64File } from "../../helper/filebase64";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setLoginModal } from "../../Redux/Actions/userActions";
import { connect } from "react-redux";
import moment from "moment";
import states from "../../helper/state.json";
import { IMG_URL } from "../../config/constant";
import { actioncustomPinCode } from "../../Redux/Actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const salutationData = [
  {
    sal: "Select Salutation",
  },

  {
    sal: "Mr.",
  },

  {
    sal: "Ms.",
  },

  {
    sal: "Mrs.",
  },

  {
    sal: "Dr.",
  },
];

const getTheAge = (date) => {
  return moment().diff(date, 'years', false);
}

function Mydetails(props) {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authReducer.patientData);

  const patientinfo = useSelector((state) => state.patientinfo);
  const { patientinfoData, isLoading, isSuccess } = patientinfo;
  const [isShow, setShow] = useState(false);
  const [isChange, setChange] = useState(false);
  const [showinput, setshowinput] = useState(false);
  const [errMsg, setErr] = useState("");
  const [loader, setLoader] = useState(false);
  const [oldProfile, setOldProfile] = useState({});

  const [profile, setProfile] = useState({
    code: patientinfoData.code,
    firstName: patientinfoData && patientinfoData.firstName ? patientinfoData.firstName : "",
    lastName: "",
    age: getTheAge(patientinfoData.dob ? patientinfoData.dob : moment().format("MM/DD/YYYY")),
    name: patientinfoData.firstName,
    dob: patientinfoData.dob ? patientinfoData.dob : moment().format("MM/DD/YYYY"),
    salutation: patientinfoData.salutation,
    drugAllergies: patientinfoData.drugAllergies,
    pLanguage: patientinfoData.pLanguage,
    gender: patientinfoData.gender,
    bloodGroup: patientinfoData.bloodGroup,
    maritalStatus: patientinfoData.maritalStatus,
    email: patientinfoData.email,
    photo: patientinfoData.photo,
    photoName: patientinfoData.photoName,
    contactNo: patientinfoData.contactNo,
    mobile: patientinfoData.mobile,
    mobileCount: patientinfoData.mobileCount,
    address1: patientinfoData.address1,
    address2: patientinfoData.address2,
    city: patientinfoData.city,
    state: patientinfoData.state,
    country: patientinfoData.country,
    role: patientinfoData.role,
    pinCode: patientinfoData.pinCode,
    referredBy: patientinfoData.referredBy,
    source: patientinfoData.source,
    patientStatus: 1,
    status: patientinfoData.status,
    access: patientinfoData.access,
    createdBy: patientinfoData.createdBy,
    modifiedBy: patientinfoData.code,
  });

  const changeHandler = async (file) => {

    if (!file?.name.includes(".png") && !file?.name.includes(".jpg") && !file?.name.includes(".jpeg") && !file?.name.includes(".webp")) {
      toast("This file is not supported, Please choose an image")
      return
    }
    let b64File = await encodeBase64File(file);
    // axios.get(`https://patient-api-stage.curebay.in/dhpimages/${b64File}`)
    setProfile({ ...profile, ["photo"]: b64File });
  };
  const [otp, setOtp] = useState("");
  console.log("patientinfoData", isSuccess);

  const handleOtp = (e) => {
    let re = /^[0-9\b]+$/;
    if (re.test(e.target.value) || e.target.value === "") {
      setOtp(e.target.value);
    }
  };

  const Editprofiledetails = (e) => {
    e.preventDefault();
    console.log(showinput);
    setshowinput(true);
  };

  const changeDate = (e) => {
    setProfile({ ...profile, ["dob"]: moment(e).format("MM/DD/yyyy"), ["age"]: getTheAge(moment(e).format("MM/DD/YYYY")) });
  };

  const handleChange = (e) => {
    if (e.target.name === "mobile" || e.target.name === "pinCode") {
      let re = /^[0-9\b]+$/;
      if (re.test(e.target.value) || e.target.value === "") {
        console.log("sasad", e.target.value);
        setProfile({ ...profile, [e.target.name]: e.target.value });
      }
    }
    // else if (e.target.name === "email") {
    //   let rex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //   if (rex.test(e.target.value) || e.target.value === "") {
    //     console.log("sasad", e.target.value);
    //     setProfile({ ...profile, [e.target.name]: e.target.value });
    //   }
    // }


    else {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    setProfile(patientinfoData);
    setOldProfile(patientinfoData);
  }, [patientinfoData]);
  const onCancel = () => {
    setProfile(oldProfile);
    setshowinput(false);
  };

  const checkMobileExist = async () => {
    let dataObj = {
      mobileNo: profile.mobile,
      mobileCheck: 1,
    };
    setLoader(true);
    await props
      .sendOtp(dataObj)
      .then(async (result) => {
        console.log("errr", result);
        if (result) {
          setshowinput(false);
          setChange(true);
          setLoader(false);
        } else {
          setErr("something went wrong, please try again");
          setLoader(false);
          setShow(true);
        }
      })
      .catch((error) => {
        toast("This mobile number is already taken by other Patient.")
        if (error?.details?.length > 0) {
          console.log("errr", error);
          setChange(false);
          setShow(true);
          setErr(error.details[0]);
          setLoader(false);
        }
      });
  };

  const VerifyOtp = async () => {
    let dataObj = {
      mobileNo: profile.mobile,
      mobileCheck: 1,
      otp: otp,
    };
    setLoader(true);
    await props
      .verifyRegOtp(dataObj)
      .then(async (result) => {
        setChange(false);
        if (result) {
          setshowinput(false);
          setLoader(false);
          dispatch(editPatientDetails(patientinfoData.id, profile));
        } else {
          setErr("something went wrong, please try again");
          setLoader(false);
          setShow(true);
        }
      })
      .catch((error) => {
        if (error?.details?.length > 0) {
          setChange(false);
          setShow(true);
          setErr(error.details[0]);
          setLoader(false);
        }
      });
  };

  const savechangesprofile = (e) => {
    e.preventDefault();
    profile.modifiedBy = patientinfoData.code;

    if (profile.firstName.length < 1) {
      // setErr("mobile no should be exact 10 digit!");
      // setShow(true);
      toast("Please enter your firstname!")
      return;
    }

    if (profile.lastName.length < 1) {
      // setErr("mobile no should be exact 10 digit!");
      // setShow(true);
      toast("Please enter your lastname!")
      return;
    }

    var re = /\S+@\S+\.\S+/;

    if (!re.test(profile.email)) {
      // setErr("mobile no should be exact 10 digit!");
      // setShow(true);
      toast("Please enter valid Email Id")
      return;
    }


    if (profile.mobile.length < 10) {
      // setErr("mobile no should be exact 10 digit!");
      // setShow(true);
      toast("Mobile no should be exact 10 digit!")
      return;
    }



    if (profile.pinCode.length < 6) {
      // setErr("Please enter a valid pincode");
       toast("Please enter a valid pincode!")
      // setShow(true);
      return;
    }

    // if (profile.pinCode.length < 6) {
    //     setErr("pincode should be exact 6 digit !")
    //     setShow(true)
    //     return;
    // }
    if (oldProfile.mobile !== profile.mobile) {
      checkMobileExist();
      // toast("no. is already taken")
    } else {


      dispatch(editPatientDetails(patientinfoData.id, profile)).then(res => {
        console.log(res, "ssdoufodsufosdnsd");
        if (res == 1) {
          dispatch(getPatientDetails(userData.code))
          toast("Your Profile is updated successfully");
        } else {
          toast("Something went wrong");
        }

      }).catch(err => {
        toast(err?.response?.data?.details[0])
      })


      setshowinput(false);
    }
    // to dispatch newly created object to createlocation action
  };

  useEffect(() => {
    console.log("sdfoisdofidnsovfdjoif")
    // dispatch(getPatientDetails(userData.code)).then(res => {
    //   sessionStorage.setItem('customPinCode' , res.pinCode)
    // })
  }, [userData.code, isSuccess]);

  const [city, setCity] = useState([]);

  useEffect(() => {
    setCity(states[profile.state]);
  }, [profile.state]);

  console.log("My profile data", patientinfo);

  return (
    <>
      {/* breadcrumbs */}
      <ToastContainer />
      <ul className="lg:flex hidden  text-brand-secondary  text-sm lg:text-base   my-8">
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
          <a>My Details</a>
        </li>
      </ul>

      <div className="flex justify-between " style={{ background: "#F8F8F8" }}>
        <div className="lg:block hidden w-3/12 ml-6 mt-3">
          <Userprofilesidebar></Userprofilesidebar>
        </div>


        <div className="lg:w-7/12 xl:w-8/12 w-full lg:mx-auto xl:mr-12 lg:mt-5 ">
          <p className="text-2xl font-bold mb-5">My Details</p>
          <div className=" bg-white-600 w-full h-112 p-5 lg:mb-2 mb-16 antialiased justify-between border border-gray-200 overflow-y-scroll hide-scroll-bar" style={{ background: "white", height: "757px" }}>
            {/* <div className="flex justify-end">
                {showinput ? null : (
                  <p
                    onClick={Editprofiledetails}
                    className="text-sm cursor-pointer text-brand-secondary font-medium pr-4"
                  >
                    Edit Details
                  </p>
                )}
              </div> */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-1 justify-between w-full md:items-center">
              <div className="flex relative w-8/12">
                <img

                  // profile.photoName ?  "https://patient-api-stage.curebay.in/dhp/dhpimages/" + profile.photoName : steth
                  // `${"data:image;base64,"}` + profile.photo : profile.photoName ?


                  src={profile.photo ? `${'data:image;base64,'}` + profile.photo : profile.photoName ? (profile.photoName) : steth}

                  alt="Profile"
                  className="rounded-full  mt-2 ml-4"
                  style={{ width: "78px", height: "78px" }}
                />
                {showinput ? (
                  <div className="w-8 h-8 left-20 rounded-full bg-brand-secondary absolute bottom-0 right-0 p-2">
                    <label className="cursor-pointer text-xs bg-brand-secondary text-white font-normal rounded">
                      <input
                        type="file"
                        accept=".png, .jpg, .jpeg, .webp"
                        onChange={(e) => {
                          changeHandler(e.target.files[0]);
                        }}
                        className="hidden"
                      />
                      <img src={camera} alt="camera" className="w-5" />
                    </label>
                  </div>
                ) : null}
                <div className="text-center">

                  <div className="flex justify-between">
                    <p className="pl-2 mt-5 ml-4 text-medium font-bold text-xl  my-2" style={{ color: "#66B889" }}>
                      {profile.firstName}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <div className=" flex pl-6 md:pl-1">
                      <p className="flex flex-col md:flex-row text-xs text-center md:ml-5" style={{ color: "#262626" }}>
                        <span className="font-bold text-left">Patient ID:</span><span className="font-base text-left md:ml-1"> {profile.code}</span>
                      </p>
                    </div>

                  </div>
                </div>
              </div>
              {/* <div className="text-center">

                <div className="flex justify-between">
                  <p className="pl-2 pt-2 mt-6 ml-4 text-medium font-bold text-xl  my-2" style={{ color: "#66B889" }}>
                    {profile.firstName}
                  </p>
                </div>
                <div className="flex justify-between">
                  <div className=" flex ">
                    <p className="text-xs pl-2 text-center  font-medium ml-5" style={{ color: "#262626" }}>
                      Patient ID:<b> {profile.code}</b>
                    </p>
                  </div>

                </div>
              </div> */}


              {showinput ? null : (
                <div onClick={Editprofiledetails} className="border border-gray-700 h-9 w-10/12 md:w-28 m-auto md:m-0 items-center text-center flex flex-col justify-center rounded-md cursor-pointer">
                  <p

                    className="text-xs  text-gray-900 font-semibold "
                  >
                    Edit Details
                  </p>
                </div>
              )}


            </div>

            <hr className="mt-10" style={{ color: "#D8DEE7" }} />

            <div className="lg:flex justify-between content-center ">
              <div className="flex">
                {/* <img src={select} alt="select" className="w-4 ml-3 " /> */}
                <p className="text-gray-800 font-bold text-sm mt-5 mb-3">
                  Personal Details
                </p>
              </div>
            </div>
            <div className="lg:flex lg:justify-between content-center ">
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 gap-16">
                <div className="relative mr-6 w-auto">
                  <select
                    autoComplete="off"
                    id="salutation"
                    name="salutation"
                    value={profile.salutation ? profile.salutation : ""}
                    disabled={!showinput}
                    className={`${showinput ? "border-b-2 border-gray-300 " : "border-0 appearance-none"
                      } pt-2 w-auto md:w-16 text-gray-900 text-xs bg-transparent focus:outline-none`}
                    placeholder="salutation"
                    onChange={handleChange}
                  >
                    {salutationData.map((cit, i) => (
                      <option key={i} value={cit.sal}> {cit.sal}</option>
                    ))}
                  </select>
                  <label
                    htmlFor="salutation"
                    className="absolute left-0 -top-3.5 text-gray-400 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Salutation
                  </label>
                </div>
                <div className="relative mb-4">
                  <input
                    autocomplete="off"
                    id="firstName"
                    name="firstName"
                    minLength="3"
                    maxLength="18"
                    type="text"
                    value={profile.firstName}
                    readOnly={!showinput}
                    className={`${showinput ? "border-b-2 border-gray-300 " : "border-0 "
                      } pt-2 w-11/12 md:w-auto text-gray-900 text-xs bg-transparent focus:outline-none`}
                    placeholder="Enter name"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute left-0 -top-3.5 text-gray-400 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    First Name
                  </label>
                </div>
                <div className="relative mb-4">
                  <input
                    autocomplete="off"
                    id="lastName"
                    name="lastName"
                    minLength="3"
                    maxLength="18"
                    type="text"
                    value={profile.lastName}
                    readOnly={!showinput}
                    className={`${showinput ? "border-b-2 border-gray-300 " : "border-0 "
                      } pt-2 w-11/12 md:w-auto text-gray-900 text-xs bg-transparent focus:outline-none`}
                    placeholder="Enter name"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute left-0 -top-3.5 text-gray-400 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Last Name
                  </label>
                </div>

                <div className="relative mb-4">
                  <select
                    autocomplete="off"
                    id="gender"
                    name="gender"
                    value={profile.gender}
                    readOnly={!showinput}
                    disabled={!showinput}
                    className={`${showinput ? "border-b-2 border-gray-300 " : "border-0 appearance-none"
                      } pt-2 w-11/12 md:w-20 text-gray-900 text-xs bg-transparent focus:outline-none`}
                    placeholder="Gender"
                    onChange={handleChange}
                  >
                    <option className="py-1" value="Select">
                      Select
                    </option>
                    <option className="py-1" value="M">
                      Male
                    </option>
                    <option className="py-1" value="F">
                      Female
                    </option>
                    <option className="py-1" value="O">
                      Others
                    </option>
                  </select>
                  {/* <input autocomplete="off" id="gender" name="gender" type="text" value={profile.gender} readOnly={!showinput} className={`${showinput ? 'border-b-2 border-gray-300 ' : 'border-0 '} pt-2 text-gray-900 bg-transparent`} placeholder="Gender" onChange={handleChange} /> */}
                  <label
                    htmlFor="bloodGroup"
                    className="absolute left-0 -top-3.5 text-gray-400 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Gender
                  </label>
                </div>

                <div className="relative mb-4">
                  <input
                    autocomplete="off"
                    id="mobile"
                    minLength="10"
                    maxLength="10"
                    name="mobile"
                    type="text"
                    value={profile.mobile}
                    readOnly={!showinput}
                    className={`${showinput ? "border-b-2 border-gray-300 " : "border-0 "
                      } w-11/12 md:w-20 pt-2 text-gray-900 text-xs bg-transparent focus:outline-none`}
                    placeholder="Enter Phonenumber"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="mobile"
                    className="absolute left-0 -top-3.5 text-gray-400 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Mobile number
                  </label>
                </div>
                <div className="relative mb-4">
                  <input
                    autocomplete="off"
                    id="email"
                    name="email"
                    minLength="10"
                    maxLength="32"
                    type="email"


                    value={profile.email}
                    readOnly={!showinput}
                    className={`${showinput ? "border-b-2 border-gray-300" : "border-0 "
                      }w-11/12 md:w-44 pt-2 text-gray-900 text-xs bg-transparent focus:outline-none`}
                    placeholder="Enter email"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-400 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Id
                  </label>
                </div>
                <div className="relative mb-4">
                  <DatePicker
                    locale="es"
                    id="dob"
                    name="dob"
                    dropdownMode="select"
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="MM/dd/yyyy"
                    maxDate={new Date()}
                    value={moment(profile.dob != null ? profile.dob : new Date()).format("DD/MM/YYYY")}
                    onSelect={changeDate}
                    disabledKeyboardNavigation={true}
                    autoFocus={false}
                    readOnly={!showinput}
                    placeholder=""
                    className={`${showinput ? "border-b-2 border-gray-300 " : "border-0 "
                      } w-11/12 md:w-auto pt-2 text-gray-900 text-xs bg-transparent focus:outline-none`}
                  />
                  <label
                    htmlFor="dob"
                    className="absolute left-0 -top-3.5 text-gray-400 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Date of Birth
                  </label>
                </div>

                <div className="relative mb-4 ">
                  <select
                    autocomplete="off"
                    id="bloodGroup"
                    name="bloodGroup"
                    value={profile.bloodGroup}
                    readOnly={!showinput}
                    disabled={!showinput}
                    className={`${showinput ? "border-b-2 border-gray-300 " : "border-0 appearance-none"
                      } pt-2 w-11/12 md:w-20 text-gray-900 text-xs bg-transparent focus:outline-none`}
                    placeholder="Blood Group"
                    onChange={handleChange}

                  >
                    <option className="py-1" value="Select">
                      Select
                    </option>
                    <option className="py-1" value="O-">
                      O-
                    </option>
                    <option className="py-1" value="O+">
                      O+
                    </option>
                    <option className="py-1" value="A-">
                      A-
                    </option>
                    <option className="py-1" value="A+">
                      A+
                    </option>
                    <option className="py-1" value="B-">
                      B-
                    </option>
                    <option className="py-1" value="B+">
                      B+
                    </option>
                    <option className="py-1" value="AB-">
                      AB-
                    </option>
                    <option className="py-1" value="AB+">
                      AB+
                    </option>
                  </select>
                  {/* <input autocomplete="off" id="gender" name="gender" type="text" value={profile.gender} readOnly={!showinput} className={`${showinput ? 'border-b-2 border-gray-300 ' : 'border-0 '} pt-2 text-gray-900 bg-transparent`} placeholder="Gender" onChange={handleChange} /> */}
                  <label
                    htmlFor="bloodGroup"
                    className="absolute left-0 -top-3.5 text-gray-400 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Blood Group
                  </label>
                </div>


                <div className="relative mb-4">
                  <input
                    autocomplete="off"
                    id="age"
                    name="age"
                    type="text"
                    value={profile.dob != null ? getTheAge(profile.dob) : '0'}
                    readOnly={true}
                    className={`${showinput ? "border-b-2 border-gray-300 " : "border-0 "
                      } w-11/12 md:w-6 pt-2 text-gray-900 text-xs bg-transparent outline-none`}
                    placeholder="Enter Age"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute left-0 -top-3.5 text-gray-400 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Age
                  </label>
                </div>
                {/* {showinput ? <input autocomplete="off" id="email" name="email" type="text" value="hello" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" /> : null}   */}
              </div>
            </div>

            <hr className="mt-2" style={{ color: "#D8DEE7" }} />

            <div className="lg:flex justify-between content-center ">
              <div className="flex">
                {/* <img src={select} alt="select" className="w-4 ml-3 " /> */}
                <p className="text-gray-800 font-bold text-sm mt-5 mb-3">
                  Contact Details
                </p>
              </div>
            </div>

            <div className="lg:flex justify-between content-center ">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 gap-16">
                <div className="relative mb-4">
                  <textarea
                    autocomplete="off"
                    id="address1"
                    name="address1"
                    minLength="5"
                    maxLength="50"
                    type="text"
                    value={profile.address1}
                    readOnly={!showinput}
                    className={`${showinput ? "border-b-2 border-gray-300 " : "border-0 "
                      }w-11/12 md:w-auto pt-2 bg-transparent text-gray-900 text-xs focus:outline-none`}
                    placeholder=""
                    onChange={handleChange}
                  />

                  <label
                    for="address1"
                    className="absolute left-0 -top-3.5 text-gray-400 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    House No/Street Name
                  </label>
                </div>
                <div className="relative mb-4">
                  <textarea
                    autocomplete="off"
                    id="address2"
                    name="address2"
                    minLength="5"
                    maxLength="50"
                    type="text"
                    value={profile.address2}
                    readOnly={!showinput}
                    className={`${showinput ? "border-b-2 border-gray-300 " : "border-0 "
                      }w-11/12 md:w-auto pt-2 bg-transparent text-gray-900 text-xs focus:outline-none`}
                    placeholder=""
                    onChange={handleChange}
                  />
                  <label
                    for="address2"
                    className="absolute left-0 -top-3.5 text-gray-400 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Address
                  </label>
                </div>
                <div className="relative mb-4">
                  <input
                    autocomplete="off"
                    minLength="6"
                    maxLength="6"
                    id="pinCode"
                    name="pinCode"
                    type="text"
                    value={profile.pinCode}
                    readOnly={!showinput}
                    className={`${showinput ? "border-b-2 border-gray-300 " : "border-0 "
                      }w-11/12 md:w-12 pt-2 bg-transparent text-gray-900 text-xs focus:outline-none`}
                    placeholder=""
                    onChange={handleChange}
                  />
                  <label
                    for="pinCode"
                    className="absolute left-0 -top-3.5 text-gray-400 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Pincode
                  </label>
                </div>

                <div className="relative mb-4">
                  <select
                    autocomplete="off"
                    id="state"
                    name="state"
                    value={profile.state}
                    disabled={!showinput}
                    className={`${showinput
                      ? "border-b-2  border-gray-300"
                      : " border-0 appearance-none"
                      } w-11/12 md:w-44 appearance-none pt-2 bg-transparent text-gray-900 text-xs focus:outline-none`}
                    placeholder=""
                    onChange={handleChange}
                  >
                    {!profile.state && (
                      <option disabled={true} value={""}>
                        Select State
                      </option>
                    )}
                    {Object.keys(states).map((key) => (
                      <option value={key}> {key}</option>
                    ))}
                  </select>
                  <label
                    for="state"
                    className="absolute left-0 -top-3.5 text-gray-400 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    State
                  </label>
                </div>

                <div className="relative ">
                  <select
                    autocomplete="off"
                    id="city"
                    name="city"
                    value={profile.city}
                    disabled={!showinput}
                    className={`${showinput
                      ? "border-b-2 border-gray-300"
                      : "border-0 appearance-none"
                      } w-11/12 md:w-36 pt-2 bg-transparent text-gray-900 text-xs focus:outline-none`}
                    placeholder="Maharashtra"
                    onChange={handleChange}
                  >
                    {!profile.city && (
                      <option disabled={true} value={""}>
                        Select City
                      </option>
                    )}
                    {city
                      ? city.map((cit, i) => (
                        <option key={i} value={cit}> {cit}</option>
                      ))
                      : ""}
                  </select>
                  <label
                    for="city"
                    className="absolute left-0 -top-3.5 text-gray-400 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    City
                  </label>
                </div>
                {/* {showinput ? <input autocomplete="off" id="email" name="email" type="text" value="hello" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" /> : null}   */}
              </div>
            </div>

            {showinput && (
              <div className="flex justify-end mt-5">
                <button
                  onClick={onCancel}
                  className="bg-white text-brand-secondary p-2 rounded-xl mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={savechangesprofile}
                  className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
                >
                  Save Changes
                  {(loader || isLoading) && (
                    <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>
                  )}
                </button>
              </div>
            )}
          </div>
          {isShow ? (
            <div className="justify-center shadow-lg mb-4 items-center bg-gray-500 opacity-90 shadow-lg flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="m-10 p-8 rounded-md bg-white opacity-100 shadow-lg">
                <div className="relative ">
                  {errMsg && <span className="text-red-600">{errMsg}</span>}
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => setShow(false)}
                      className="text-lg font-normal border border-brand-secondary px-4   text-brand-secondary rounded-md  "
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {isChange ? (
            <div className="justify-center shadow-lg mb-4 items-center bg-gray-500 opacity-90 shadow-lg flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="m-10 p-8 rounded-md bg-white opacity-100 shadow-lg">
                <div className="relative mb-4">
                  <input
                    autocomplete="off"
                    maxLength="6"
                    id="pinCode"
                    name="pinCode"
                    type="text"
                    className="pt-2  border-b-2 text-sm text-gray-900 bg-transparent focus:outline-none"
                    placeholder="Enter Otp to verify "
                    onChange={handleOtp}
                  />
                  <label
                    for="otp"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    OTP sent to {profile.mobile}
                  </label>
                  <div className=" gap-5 ">
                    <button
                      onClick={VerifyOtp}
                      disabled={otp.length < 6 ? true : false}
                      className="text-lg m-2 disabled:opacity-50 px-4 font-medium  border border-brand-secondary text-brand-secondary rounded-md  mr-2"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => {
                        setChange(false);
                        setProfile(patientinfoData);
                      }}
                      className="bg-brand-secondary m-2 px-3 font-medium text-lg text-white  rounded-md "
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setLoginModal: () => dispatch(setLoginModal()),
  sendOtp: (data) => dispatch(sendOtp(data)),
  verifyRegOtp: (data) => dispatch(verifyRegOtp(data)),
});
// export default Mydetails;

export default connect(null, mapDispatchToProps)(Mydetails);
