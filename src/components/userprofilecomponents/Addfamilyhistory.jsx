import React, { useEffect, useState } from 'react';
import close from '../../Assets/Images/closeee.svg';
import Dob from '../../Assets/Images/calendar.svg';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PDF from '../../Assets/Images/PDF.png'
import moment from "moment";
import DatePicker from "react-datepicker";
import { encodeBase64File } from '../../helper/filebase64';
//import FamilyDropdown from "./Familydropdown";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { getfamilyhistory, patientaddfamilyhistory, getPatientfamilymembers as getpatientfamilymemberslist } from "../../Redux/Actions/UserprofileActions";

function Addfamilyhistory(props) {



    const goBack = () => {
        props.closePopup();
    }

    const history = useHistory();
    const dispatch = useDispatch();
    const [memberList, setMemberList] = useState([]);
    const location = useLocation();
    const [FamilymemberName, setFamilymemberName] = useState("");

    const userData = useSelector((state) => state.authReducer.userData);
    console.log("userData", userData);
    const patientCode = useSelector(state => state.authReducer.patientCode);
    // useEffect(() => {
    //     // let patient = localStorage.getItem("patientprofile");
    //     // console.log("patient", patient);
    //     dispatch(getpatientfamilymemberslist(props.patient ? props.patient : patientCode))
    //         .then((result) => {
    //             console.log(result);
    //             setMemberList(result);
    //         })
    //         .catch((error) => {
    //             // setLoader(false)
    //             // redirectTo();
    //         });
    // }, []);
    const [memberCode, setMemberCode] = useState("");
    const handleChange = (e) => {
        setaddfamilyhistory({
            ...addfamilyhistory,
            [e.target.name]: e.target.value,
        });
    };
    const handleChangeFamilymem = (e) => {
        setFamilymemberName(e)
    }
    const changeDate = (e) => {
        setaddfamilyhistory({
            ...addfamilyhistory,
            givenDate: moment(e).format("yyyy-MM-DD HH:mm:ss"),
        });
    };

    // const patientdata = localStorage.getItem("patientprofile")
    // console.log("patient", patientdata)



    const [addfamilyhistory, setaddfamilyhistory] = useState({});

    const savefamilyhistorys = (e) => {
        if (!addfamilyhistory.description) {
            // toast("Enter Information")
        } else {
            if (FamilymemberName == "" || FamilymemberName == undefined) {
                let patient = localStorage.getItem("patientprofile")
                const givenDate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
                const data = {
                    "patientId": props.patient ? props.patient : patientCode,
                    "patientCode": props.patient ? props.patient : patientCode,
                    "givenDate": addfamilyhistory?.givenDate,
                    "status": 1,
                    "createdBy": props.patient ? props.patient : patientCode,
                    "modifiedBy": props.patient ? props.patient : patientCode,
                    // "recordFor": addfamilyhistory.recordFor,
                    "description": addfamilyhistory.description
                    //-- -> P means patient and U means User
                }
                dispatch(patientaddfamilyhistory(data)).then((result) => {
                    dispatch(getfamilyhistory(props.patient ? props.patient : patientCode));
                    props.closePopup()
                })
            } else {
                let patient = localStorage.getItem("patientprofile")
                // const givenDate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
                const data = {
                    "patientId": FamilymemberName,
                    "patientCode": FamilymemberName,
                    "givenDate": addfamilyhistory?.givenDate,
                    "status": 1,
                    "createdBy": props.patient ? props.patient : patientCode,
                    "modifiedBy": props.patient ? props.patient : patientCode,
                    // "recordFor": addfamilyhistory.recordFor,
                    "description": addfamilyhistory.description
                    //-- -> P means patient and U means User
                }
                dispatch(patientaddfamilyhistory(data)).then((result) => {
                    dispatch(getfamilyhistory(props.patient ? props.patient : patientCode));
                    props.closePopup()
                })
            }
        }
    };


    return (
        <>
            {/* <ToastContainer /> */}
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-9/12 md:w-96 my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full p-5 bg-white outline-none focus:outline-none">

                        {/*body*/}

                        <div className="pl-2 pr-5  flex items-center justify-between">
                            <p className="inline px-2 rounded-full text-md  font-medium cursor-pointer text-brand-secondary">
                                Add Family History
                            </p>
                            <div className="flex space-x-6 cursor-pointer">
                                <img src={close} alt="close" className="w-4" onClick={goBack} />
                            </div>
                        </div>
                        <hr className="mt-2" />
                        <div className="pt-5">
                            {/* <div className="lg:flex justify-center">
              <div className="lg:w-52 lg:h-80 bg-green-100 border-dashed border-2  border-gray-400  lg:py-16 py-4  text-center">
                <svg
                  className="h-12 w-12 text-brand-secondary ml-20"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                  <polyline points="9 15 12 12 15 15" />{" "}
                  <line x1="12" y1="12" x2="12" y2="21" />
                </svg>
                <p className="text-xs font-medium">Drag and drop documents</p>
                <div className="flex justify-center mt-5 space-x-3">
                  <button className="text-xs bg-brand-secondary text-white font-normal py-2 px-2 rounded">
                    Use camera
                  </button>
                  <button className="text-xs bg-brand-secondary text-white font-normal py-2 px-2 rounded">
                    Browse File
                  </button>
                </div>
              </div>
            </div> */}

                            {/*  */}

                            <div>
                                {/*<p className="lg:pl-12 p-4 pb-2 text-sm text-gray-700 font-medium">
                                    Personal Details
        </p>*/}
                                <div className="flex space-x-12 pt-4  p-4">
                                    {/*<div className="relative">
                                        <div className="flex">
                                            <div class="flex pr-2">
                                                <p class="text-medium font-medium text-2xl  text-brand-secondary">
                                                    {props.title}
                                                </p>
                                                <div class="h-10 w-40 border border-gray-200 p-2 ml-4  rounded-lg flex space-x-6">
                                                    <select
                                                        id="recordFor" name="recordFor"
                                                        className="w-full   outline-none"
                                                        value={FamilymemberName}
                                                        onChange={(e) => handleChangeFamilymem(e.target.value)}
                                                    >
                                                        <option className="py-1 text-sm text-green-600" value={"self"}>
                                                            Self
                                                        </option>

                                                        {memberList.length === 0 ? (
                                                            <p className="text-center item-center mt-20 mb-20  ">
                                                                No members
                                                            </p>
                                                        ) : (
                                                            <>
                                                                {memberList.map((res, i) => (
                                                                    <option
                                                                        className="py-1 text-sm text-green-600"
                                                                        value={res.code}
                                                                    >
                                                                        {res.name}
                                                                    </option>
                                                                ))}
                                                            </>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <label
                                            for="email"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            Record For
                                        </label>
                                                                </div>*/}
                                    <div className="relative">
                                        <div className="relative mb-4">
                                            <DatePicker
                                                id="recordOn"
                                                name="givenDate"
                                                dropdownMode="select"
                                                showMonthDropdown
                                                showYearDropdown
                                                // className="pt-2 text-gray-900 "
                                                dateFormat="dd/MM/yyyy"
                                                value={addfamilyhistory.givenDate ? moment(addfamilyhistory.givenDate).format("DD/MM/yyyy") : ""}
                                                // addmedicalhistory.givenDate ? moment(addmedicalhistory.givenDate).format("MM/DD/yyyy") : ""
                                                onSelect={changeDate}
                                                disabledKeyboardNavigation={true}
                                                autoFocus={false}
                                                placeholderText="Record On"
                                                className={
                                                    "border-b-2 border-gray-300 pt-2 text-xs text-gray-900 bg-transparent focus:outline-none"
                                                }
                                            />
                                            <label
                                                htmlFor="recordOn"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                Record On
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex space-x-12 pt-4 ml-1 px-3 pt-10">
                                    <div className="relative w-full">
                                        <div className="flex w-11/12">
                                            <textarea
                                                autocomplete="off"
                                                id="notes"
                                                name="description"
                                                maxLength="100"
                                                value={addfamilyhistory.description}
                                                rows={4}
                                                type="text"
                                                onChange={handleChange}
                                                className="peer w-full  h-50 text-xs border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                                placeholder="Enter Description"
                                            />
                                        </div>
                                        <label
                                            htmlFor="notes"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-xs
                                            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440
                                            peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5
                                            peer-focus:text-gray-600 peer-focus:text-sm"
                                        >
                                            Description<span className="text-red-500">*</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-3">
                                    <button
                                        onClick={savefamilyhistorys}
                                        className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
                                    >
                                        Save Data{" "}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/*  */}

                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default Addfamilyhistory;
