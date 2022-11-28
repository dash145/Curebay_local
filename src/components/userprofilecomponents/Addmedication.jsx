/* This example requires Tailwind CSS v2.0+ */
import React, { useEffect, useState } from "react";
import close from "../../Assets/Images/closeee.svg";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPatientmedicationlist,
  patientaddmedication,
  patientMedicationEdit,
  getPatientfamilymembers as getpatientfamilymemberslist,
} from "../../Redux/Actions/UserprofileActions";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import { getLocalTime } from "../../Assets/utils/LocalTimeFormat";

function Addmedication(props) {

  const [memberList, setMemberList] = useState([]);
  const [FamilymemberName, setFamilymemberName] = useState("");
  const location = useLocation();
  const [addmedication, setaddmedication] = useState([]);
  const history = useHistory();
  const [fromDate, setfromDate] = useState("");
  const [fromDateShow, setfromDateShow] = useState("");
  const [toDateShow, setToShow] = useState("");
  const [toDate, settoDate] = useState("");
  const dispatch = useDispatch();
  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };
  const patientCode = useSelector((state) => state.authReducer.patientCode);
  useEffect(() => {
    // dispatch(
    //   getpatientfamilymemberslist(props.patient ? props.patient : patientCode)
    // )
    //   .then((result) => {
    //     console.log(result);
    //     setMemberList(result);
    //   })
    //   .catch((error) => {
    //     // setLoader(false)
    //     // redirectTo();
    //   });
    if (props?.editmedication) {

      console.log('mydscnkdsnc',JSON.stringify(props?.editmedication))
      setaddmedication(props?.editmedication);
      setfromDateShow(
        moment(props?.editmedication?.startCreatedTime).format("MM/DD/yyyy")
      );
      setToShow(
        moment(props?.editmedication?.endCreatedTime).format("MM/DD/yyyy")
      );
    }
  }, []);
  const goBack = () => {
    props.closePopup();
  };
  const handleChangeFamilymem = (e) => {
    setFamilymemberName(e);
  };
  const handleChange = (e) => {
    setaddmedication({ ...addmedication, [e.target.name]: e.target.value });
  };

  const addmedicationclick = () => {
    if (props?.editmedication) {
      let patient = localStorage.getItem("patientprofile");
      const givenDate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
      const data = [
        {
          patientCode: props.patient ? props.patient : patientCode,
          drugName: !addmedication.drugName
            ? props?.editmedication?.drugName
            : addmedication.drugName,
          dosage: !addmedication.dosage
            ? props?.editmedication?.dosage
            : addmedication.dosage,
          startCreatedTime: !fromDate
            ? props?.editmedication?.startCreatedTime
            : fromDate,
          endCreatedTime: !toDate
            ? props?.editmedication?.endCreatedTime
            : toDate,
          givenDate: givenDate,
          status: 1,
          id: props?.editmedication?.id,
          createdBy: props.patient ? props.patient : patientCode,
          modifiedBy: props.patient ? props.patient : patientCode,
          enteredBy: "P",
          fromDate: fromDate,
          toDate: toDate,
          // "strength": addmedication.strength,
          recordFor: addmedication.recordFor,
          //-- -> P means patient and U means User
        },
      ];
      dispatch(patientMedicationEdit(data)).then((result) => {
        dispatch(getPatientmedicationlist(patientCode));
        props.closePopup();
      });
    } else {
      if (FamilymemberName == "" || FamilymemberName == undefined) {
        // let patient = localStorage.getItem("patientprofile")
        const givenDate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        const data = [
          {
            patientCode: props.patient ? props.patient : patientCode,
            drugName: addmedication.drugName,
            dosage: addmedication.dosage,
            startCreatedTime: fromDate,
            endCreatedTime: toDate,
            givenDate: givenDate,
            status: 1,
            createdBy: props.patient ? props.patient : patientCode,
            modifiedBy: props.patient ? props.patient : patientCode,
            enteredBy: "P",
            // "strength": addmedication.strength,
            // "recordFor": addmedication.recordFor,
            //-- -> P means patient and U means User
          },
        ];
        dispatch(patientaddmedication(data)).then((result) => {
          dispatch(
            getPatientmedicationlist(
              props.patient ? props.patient : patientCode
            )
          );
          props.closePopup();
        });
      } else {
        let patient = localStorage.getItem("patientprofile");
        const givenDate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        const data = [
          {
            patientCode: FamilymemberName,
            drugName: addmedication.drugName,
            dosage: addmedication.dosage,
            startCreatedTime: fromDate,
            endCreatedTime: toDate,
            givenDate: givenDate,
            status: 1,
            createdBy: props.patient ? props.patient : patientCode,
            modifiedBy: props.patient ? props.patient : patientCode,
            enteredBy: "P",
            // "strength": addmedication.strength,
            // "recordFor": addmedication.recordFor,
            //-- -> P means patient and U means User
          },
        ];
        dispatch(patientaddmedication(data)).then((result) => {
          dispatch(
            getPatientmedicationlist(
              props.patient ? props.patient : patientCode
            )
          );
          props.closePopup();
        });
      }
    }
  };
  const changeDate = (e) => {
    setfromDate(moment(e).format("YYYY-MM-DD hh:mm:ss"));
    setfromDateShow(moment(e).format("MM/DD/yyyy"));
  };
  const changeToDate = (e) => {
    settoDate(moment(e).format("YYYY-MM-DD hh:mm:ss"));
    setToShow(moment(e).format("MM/DD/yyyy"));
  };
  return (
    <>
      <div className="justify-center items-center  mt-6 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-9/12 md:w-96 w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-5 mb-4">
            <div class="flex justify-between mb-2 ">
              <p class="text-medium font-medium text-xl  text-brand-secondary ">
                {props?.editmedication === "" ? `Add ` : "Edit "}Medications
              </p>
              <div className="flex space-x-6 cursor-pointer">
                <img src={close} alt="close" class="w-4" onClick={goBack} />
              </div>
            </div>

            <hr classname="border-dash text-black w-10 mt-4 h-20 my-2"></hr>
            <div>
              <div>
                {/* <img src={select} alt="select" class="w-4 ml-3 " /> */}
                {/*<p class="text-black-900 font-medium text-lg mt-4">Personal Details</p>*/}
              </div>
              <div class="flex pt-2 ">
                <div className="w-full">
                  <div class="md:flex justify-between py-6 md:space-x-10 ">
                    {/*<div class="relative">
                                            <div className="flex">
                                                <div class="flex pr-2">
                                                    <p class="text-medium font-medium text-2xl  text-brand-secondary">
                                                        {props.title}
                                                    </p>
                                                    <div class="h-10 w-40 border border-gray-200 p-2 ml-0  rounded-lg flex space-x-6">
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
                                            <label for="recordFor" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Record For</label>
                                        </div>*/}
                    {/* <div class="relative lg:-px-5">
                                            <div className="flex">
                                                <input autocomplete="off" id="email" name="email" type="text" class="peer lg:w-full w-38 h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 " placeholder="DD/MM/YYYY" />
                                                <img src={Dob} alt="my photo" className="relative right-5" ></img>
                                            </div>
                                            <label for="email" class="absolute lg:left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Recorded On</label>
                                        </div> */}
                    <div class="relative md:w-1/2 lg:px-2">
                      <div className="flex ">
                        <input
                          autocomplete="off"
                          id="drugName"
                          name="drugName"
                          type="text"
                          maxLength={20}
                          class="peer lg:w-full w-full lg:text-xs text-xs h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="Drug Name"
                          onChange={handleChange}
                          value={addmedication.drugName}
                        />
                      </div>
                      <label
                        for="drugName"
                        class="absolute lg:left-2 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Drug Name
                      </label>
                    </div>
                    <div class="relative md:w-1/2 mt-6 md:mt-0">
                      <div className="flex ">
                        <input
                          autocomplete="off"
                          id="dosage"
                          name="dosage"
                          type="text"
                          class="peer lg:w-full w-full text-xs h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="Enter Dosage"
                          onChange={handleChange}
                          value={addmedication.dosage}
                        />
                      </div>
                      <label
                        for="dosage"
                        class="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Dosage
                      </label>
                    </div>
                  </div>
                  {/* <div>
                                        <p class="text-black-900 font-medium text-lg mt-2">Are you Taking any Medications?</p>
                                    </div>
                                    <div className=" flex space-x-8">
                                        <div className=" flex space-x-4 items-center py-2">
                                            <input type="radio" class="form-radio mt-1 mr-2" name="accountType" value="personal" />
                                            <div className="text-sm font-medium text-gray-500 ">Yes</div>
                                        </div>
                                        <div className=" flex space-x-4 items-center py-2">
                                            <input type="radio" class="form-radio mt-1 mr-2" name="accountType" value="personal" />
                                            <div className="text-sm font-medium text-gray-500 ">No</div>
                                        </div>
                                    </div> */}

                  <div class="md:flex justify-between py-6 md:space-x-10 ">
                    <div class="relative md:w-1/2 lg:px-2 ml-1">
                      {/* <div className="flex "> */}
                      <DatePicker
                        id="fromDate"
                        name="fromDate"
                        dropdownMode="select"
                        showMonthDropdown
                        showYearDropdown
                        maxDate={new Date()}
                        // className="pt-2 text-gray-900 "
                        dateFormat="DD/MM/yyyy"
                        value={fromDateShow}
                        onSelect={changeDate}
                        disabledKeyboardNavigation={true}
                        autoFocus={false}
                        placeholderText="From Date"
                        className={
                          "peer -mx-1 w-full text-xs h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        }
                      />
                      {/* </div> */}
                      <label
                        for="dateOfBirth"
                        class="absolute -left-1 -top-3.5 ml-2 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        From Date
                      </label>
                    </div>
                    <div class="relative md:w-1/2 mt-6 md:mt-0 ml-1">
                      <DatePicker
                        id="toDate"
                        name="toDate"
                        dropdownMode="select"
                        showMonthDropdown
                        showYearDropdown
                        // minDate={new Date(fromDateShow)}
                        minDate={fromDateShow ? new Date(fromDateShow) : new Date()}
                        // maxDate={new Date()}
                        // className="pt-2 text-gray-900 "
                        dateFormat="DD/MM/yyyy"
                        value={toDateShow}

                        onSelect={changeToDate}
                        disabledKeyboardNavigation={true}
                        autoFocus={false}
                        placeholderText="To Date"
                        className={
                          "peer -mx-1 w-full h-10 text-xs border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        }
                      />
                      {/* </div> */}
                      <label
                        for="dateOfBirth"
                        class="absolute -left-1 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        To Date
                      </label>
                    </div>
                  </div>

                  {/* <div class="flex justify-between py-8 space-x-10 "> */}
                  {/* <div class="relative lg:px-2"> */}
                  {/* <div className="flex">
                                                <input autocomplete="off" id="strength" name="strength" type="text" class="peer lg:w-full w-40 h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 " placeholder="Enter strength"
                                                    onChange={handleChange} value={addmedication.strength} />
                                            </div>
                                            <label for="strength" class="absolute lg:left-2 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Strength</label> */}
                  {/* </div>
                  </div> */}
                  {/* <div>
                                        <p class="text-black-900 font-medium text-lg mt-2 ">Are you Taking any Medications?</p>
                                    </div>
                                    <div class="flex space-x-8 py-2">
                                        <div>
                                            <label class="inline-flex items-center">
                                                <input type="checkbox" class="form-checkbox" />
                                                <span class="ml-2">Morning</span>
                                            </label>
                                        </div>
                                        <div>
                                            <label class="inline-flex items-center">
                                                <input type="checkbox" class="form-checkbox" />
                                                <span class="ml-2">Noon</span>
                                            </label>
                                        </div>

                                        <div>
                                            <label class="inline-flex items-center">
                                                <input type="checkbox" class="form-checkbox" />
                                                <span class="ml-2">Night</span>
                                            </label>
                                        </div>

                                    </div> */}

                  {/*
                                    <div >

                                        <p class="text-black-900 font-medium text-lg mt-2 ">Are you Taking any Medications?</p>
                                    </div> */}

                  {/* <div class="flex space-x-8 py-2">

                                        <div>
                                            <label class="inline-flex items-center">
                                                <input type="checkbox" class="form-checkbox" />
                                                <span class="ml-2">Before Meal</span>
                                            </label>
                                        </div>


                                        <div>
                                            <label class="inline-flex items-center">
                                                <input type="checkbox" class="form-checkbox" />
                                                <span class="ml-2">After Meal</span>
                                            </label>
                                        </div>
                                    </div> */}
                  <div className="flex w-full justify-end">
                    <button
                      onClick={addmedicationclick}
                      className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
                    >
                      Save Data{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
export default Addmedication;
