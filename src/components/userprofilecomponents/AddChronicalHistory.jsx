import React, { useEffect, useState } from 'react';
import close from '../../Assets/Images/closeee.svg';
import Dob from '../../Assets/Images/calendar.svg';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PDF from '../../Assets/Images/PDF.png'
import moment from "moment";
import DatePicker from "react-datepicker";
import { encodeBase64File } from '../../helper/filebase64';
import { patientaddsocialhistory } from '../../Redux/Actions/UserprofileActions';
//import FamilyDropdown from "./Familydropdown";
import { getsocialhistory } from '../../Redux/Actions/UserprofileActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPatientfamilymembers as getpatientfamilymemberslist } from "../../Redux/Actions/UserprofileActions";
//import HealthRecordService from '../../Redux/services/HealthRecordService';
import userprofileservice from "../../Redux/services/userprofileservice";

function AddChronicalHistory(props) {

    const goBack = () => {
        props.closePopup();
    }
    const [memberList, setMemberList] = useState([]);
    const [chronicList, setChronicList] = useState([]);
    const [selectedChronicCondition, setselectedChronicCondition] = useState();
    const [FamilymemberName, setFamilymemberName] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    const [memberCode, setMemberCode] = useState("");

    const location = useLocation();

    const handleChange = (e) => {
        let value = e.target.value;
        let obj = chronicList.find((x) => x.code === value);
        console.log(JSON.stringify(obj));
        setselectedChronicCondition(obj);
        //console.log(chronic);
        //setselectedChronicCondition(JSON.parse(chronic))
    }


    const changeDate = (e) => {
        setaddsocialhistory({
            ...addsocialhistory,
            givenDate: moment(e).format("yyyy-MM-DD HH:mm:ss"),
        });
    };
    const patientCode = useSelector(state => state.authReducer.patientCode);
    useEffect(() => {
        //let patient = localStorage.getItem("patientprofile");
        console.log("patient", patientCode);
        // dispatch(getpatientfamilymemberslist(props.patient ? props.patient : patientCode))
        //     .then((result) => {
        //         console.log(result);
        //         setMemberList(result);
        //     })
        //     .catch((error) => {
        //         // setLoader(false)
        //         // redirectTo();
        //     });

        userprofileservice.getchronicconditionslist().then((res) => {
            setChronicList(res.data);
            setselectedChronicCondition(res.data[0]);
            console.log(res.data);
        })
    }, [patientCode]);
    const patientdata = localStorage.getItem("patientprofile")
    console.log("patient", patientdata)

    const saveChronicConditions = () => {
        console.log(JSON.stringify(selectedChronicCondition));
        //let patient = localStorage.getItem("patientprofile");
        const loginObj = JSON.parse(localStorage.getItem("loginObj"));
        //let array = selectedChronicConditions ? selectedChronicConditions : [];
        let payload = [{
            chronicCode: selectedChronicCondition.code,
            chronicDescription: selectedChronicCondition.description,
            givenDate: moment().format("yyyy-MM-DD HH:mm:ss"),
            createdBy: patientCode, //loginObj.user.code,
            createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
            modifiedBy: patientCode, //loginObj.user.code,
            modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
            patientId: props.patient ? props.patient : patientCode,
            status: 1,
        }];
        console.log(payload);
        userprofileservice.addpatientchronicconditionslist(payload).then((res) => {
            if (res.data == 1) {
                toast("Chronic Conditions Added Successfully");
                props.loadData();
                props.closePopup();
            }
        }, (err) => {
            //setsaveChronicConditionsLoading(false)
            console.log(err);
        })
        //props.saveChronicConditions()
        //setsaveChronicConditionsLoading(true);
        /*let payload = selectedChronicConditions;
        console.log(JSON.stringify(payload));
        HealthRecordService.addpatientchronicconditionslist(payload).then((res) => {
          setsaveChronicConditionsLoading(false)
          if(res.data == 1) {
            toast("Chronic Conditions Added Successfully");
          }
        }, (err) => {
          setsaveChronicConditionsLoading(false)
          console.log(err);
        })*/
    }


    const [addsocialhistory, setaddsocialhistory] = useState({});


    return (
        <>
            <ToastContainer />
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full p-5 bg-white outline-none focus:outline-none">

                        {/*body*/}

                        <div className="pl-2 pr-5  flex items-center justify-between">
                            <p className="inline px-2 rounded-full text-md  font-medium cursor-pointer text-brand-secondary">
                                Add Chronic Condition
                            </p>
                            <div className="flex space-x-6 cursor-pointer ml-3">
                                <img src={close} alt="close" className="w-4" onClick={goBack} />
                            </div>
                        </div>
                        <hr className="mt-2" />
                        <div className="lg:flex justify-between pt-5">
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
                                <div class="flex pr-2">
                                    <p class="text-medium font-medium text-lg  text-brand-secondary">
                                        {props.title}
                                    </p>
                                    <div class="h-10 w-40 border border-gray-200 p-2 ml-4 text-xs rounded-md flex space-x-6">
                                        <select
                                            id="recordFor" name="recordFor"
                                            className="w-full   outline-none"
                                            //value={selectedChronicCondition}
                                            onChange={(e) => handleChange(e)}
                                        >

                                            {chronicList.length === 0 ? (
                                                <p className="text-center item-center mt-20 mb-20  ">
                                                    No Chronic Conditions
                                                </p>
                                            ) : (
                                                <>
                                                    {chronicList.map((res, i) => (
                                                        <option key={i}
                                                            className="py-1 text-xs text-green-600"
                                                            value={res.code}
                                                        >
                                                            {res.description}
                                                        </option>
                                                    ))}
                                                </>
                                            )}
                                        </select>
                                    </div>
                                </div>

                                
                            </div>
                        </div>
                        <div className="flex justify-end mt-3">
                                    <button
                                        onClick={saveChronicConditions}
                                        className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 "
                                    >
                                        Save Data{" "}
                                    </button>
                                </div>

                        {/*  */}

                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default AddChronicalHistory;
