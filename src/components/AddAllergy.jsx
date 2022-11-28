import React, { useState, useEffect } from "react";
import close from "../Assets/Images/closeee.svg";

// import FamilyDropdown from "./Familydropdown";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import DatePicker from "react-datepicker";
import { patientaddallergy, patientEditallergy } from "../Redux/Actions/UserprofileActions";
import { getPatientallergylist } from "../Redux/Actions/UserprofilehealthrecordAction";
import { getLocalTime } from "../Assets/utils/LocalTimeFormat";

function AddAllergy(props) {

  const dispatch = useDispatch();
  // const addallergy = useSelector((state) => state.addallergy);
  const [addallergies, setaddallergy] = useState([]);
  const [givenDate, setGivenDate] = useState("")
  const [givenDateShow, setGivenDateShow] = useState("")
  const [memberCode, setMemberCode] = useState("");

  const goBack = () => {
    props.closePopup();
  };

  // editallergy
  useEffect(() => {
    if (props?.editallergy) {
      setaddallergy(props?.editallergy)
      setGivenDateShow(moment(props?.editallergy?.givenDate).format("MM/DD/yyyy"))
    }
  }, []);

  const patientCode = useSelector(state => state.authReducer.patientCode);

  const handleChange = (e) => {
    setaddallergy({ ...addallergies, [e.target.name]: e.target.value });
  };

  const changeDate = (e) => {
    setGivenDate(moment(e).format("YYYY-MM-DD hh:mm:ss"))
    setGivenDateShow(moment(e).format("MM/DD/yyyy"))
  };

  const patientdata = localStorage.getItem("patientprofile");
  const saveallergy = (e) => {
    e.preventDefault();

    if (props?.editallergy) {
      let patient = localStorage.getItem("patientprofile");
      const data = [{
        "chemicalAllergy": !addallergies.chemicalAllergy ? props?.editallergy?.chemicalAllergy : addallergies.chemicalAllergy,
        "createdBy": props?.editallergy?.patientCode ? props?.editallergy?.patientCode : patientCode,
        "createdDate": "",
        "drugAllergy": !addallergies.drugAllergy ? props?.editallergy?.drugAllergy : addallergies.drugAllergy,
        "foodAllergy": !addallergies.foodAllergy ? props?.editallergy?.foodAllergy : addallergies.foodAllergy,
        "fromDate": "",
        "givenDate": !givenDate ? props?.editallergy?.givenDate : givenDate,
        "id": props?.editallergy?.id,
        "modifiedBy": props.patient ? props.patient : patientCode,
        "modifiedDate": moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
        "patientCode": props?.editallergy?.patientCode ? props?.editallergy?.patientCode : patientCode,
        "status": 1,
        "toDate": ""
      }]

      dispatch(patientEditallergy(data)).then((result) => {
        dispatch(getPatientallergylist(patientCode));
        props.closePopup()
      },[patientCode, dispatch]);
    }
    else {
      let patient = localStorage.getItem("patientprofile");
      const data = [{
        "chemicalAllergy": addallergies.chemicalAllergy,
        "createdBy": props.patient ? props.patient : patientCode,
        "createdDate": "",
        "drugAllergy": addallergies.drugAllergy,
        "foodAllergy": addallergies.foodAllergy,
        "fromDate": "",
        "givenDate": givenDate,
        "modifiedBy": props.patient ? props.patient : patientCode,
        "modifiedDate": moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
        "patientCode": props.patient ? props.patient : patientCode,
        "status": 1,
        "toDate": ""
      }]
      console.log("lol3", data)
      dispatch(patientaddallergy(data)).then((result) => {
        dispatch(getPatientallergylist(props.patient ? props.patient : patientCode));
        props.closePopup()
      })
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex overflow-y-auto flex-col w-full p-5 bg-white outline-none focus:outline-none">
            {/*body*/}

            <div className=" lg:pr-5  flex items-center justify-between">
              <p className="inline rounded-full text-md  font-medium cursor-pointer text-brand-secondary">
                {props?.editallergy ? "Edit Allergy Details" : "Add Allergy Details"}
              </p>
              <div className="flex space-x-6 cursor-pointer">
                <img src={close} alt="close" className="w-4" onClick={goBack} />
              </div>
            </div>
            <hr className="mt-2" />
            <div className="lg:flex  justify-between pt-5">
              <div>
                <p className=" pb-2 text-sm text-gray-700 font-medium">
                  Personal Details
                </p>
                {/* <div className="flex space-x-12 pt-4 lg:pl-12 px-3"> */}
                {/* <div className="relative">
                    <div className="flex">
                      {/* <div className="w-36  py-2 outline-none peer text-xs text-gray-700  border-b-2 border-gray-300 "> */}
                {/* <FamilyDropdown title={""} onSelect={(code)=>{setMemberCode(code)}} /> */}
                {/* </div> */}
                {/* </div>
                    <label
                      for="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Record For
                    </label>
                  </div> */}
                <div class="flex justify-between py-8 space-x-10 ">
                  <div class="relative">
                    <div className="flex ">
                      <DatePicker
                        id="givenDate"
                        name="givenDate"
                        dropdownMode="select"
                        showMonthDropdown
                        showYearDropdown
                        // className="pt-2 text-gray-900 "
                        dateFormat="dd/MM/yyyy"
                        value={getLocalTime(givenDateShow ? givenDateShow : "")}
                        onSelect={changeDate}
                        disabledKeyboardNavigation={true}
                        autoFocus={false}
                        placeholderText="Record On"
                        className={
                          "border-b-2 border-gray-300 pt-2 text-xs text-gray-900 bg-transparent"
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

                {/* <div className="flex space-x-12 pt-4 lg:pl-12 px-3 pt-10">
                  <div className="relative">
                    <div className="flex w-96">
                      <textarea
                        autocomplete="off"
                        id="notes"
                        name="chemicalAllergy"
                        rows={4}
                        type="text"
                        onChange={handleChange}
                        className="peer w-full  h-50  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Enter Information"
                      />
                    </div>
                    <label
                      htmlFor="notes"
                      className="absolute left-0 -top-3.5 text-gray-600 text-xs
                                            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440
                                            peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5
                                            peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Additional Notes<span className="text-red-500">*</span>
                    </label>
                  </div>
                </div> */}
                <div class="md:flex justify-between md:py-8 md:space-x-10 ">
                  <div class="relative">
                    <div className="flex w-full">
                      <textarea autocomplete="off" id="drugAllergy" name="drugAllergy" maxLength={50} rows="3" type="text" class="peer lg:w-full md:w-40  h-10 text-xs border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Drug Allergies"
                        onChange={handleChange}
                        value={addallergies.drugAllergy}
                      />
                    </div>
                    <label for="drugAllergy" class="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Drug Allergies</label>
                  </div>
                  <div class="relative lg:px-2">
                    <div className="flex my-6 md:my-0 w-full">
                      <textarea autocomplete="off" id="foodAllergy" name="foodAllergy" maxLength={50} type="text" class="peer lg:w-full md:w-40 h-10 text-xs border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 " placeholder="Enter Food Allergies"
                        onChange={handleChange}
                        value={addallergies.foodAllergy}
                      />
                    </div>
                    <label for="foodAllergy" class="absolute lg:left-2 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Food Allergies</label>
                  </div>
                </div>
                <div class="flex justify-between md:py-8 space-x-10 ">
                  <div class="relative">
                    <div className="flex ">
                      <textarea autocomplete="off" id="chemicalAllergy" name="chemicalAllergy" maxLength={50} type="text" class="peer lg:w-full md:w-40  h-10 text-xs border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Chemical Allergies"
                        onChange={handleChange}
                        value={addallergies.chemicalAllergy}
                      />
                    </div>
                    <label for="chemicalAllergy" class="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Chemical Allergies</label>
                  </div>
                  <div class="relative lg:px-2">
                  </div>
                </div>

                <div className="flex justify-end mt-3">
                  <button
                    onClick={saveallergy}
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
export default AddAllergy;


// import React, { useEffect, useState } from "react";
// import close from "../Assets/Images/closee.svg";
// import { useHistory, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
// import { patientaddallergy } from "../Redux/Actions/UserprofileActions";
// import { members } from "../helper/family";
// import moment from "moment";
// import DatePicker from "react-datepicker";

// function AddAllergy() {
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const goBack = () => {
//     history.goBack();
//   };

//   const location = useLocation();

//   const userData = useSelector((state) => state.authReducer.patientData);
//   const handleChange = (e) => {
//     setaddallergy([{ ...addallergies[0], [e.target.name]: e.target.value }]);
//     console.log("Al", addallergies);
//   };

//   const changeDate = (e) => {
//     let allergies = { ...addallergies[0] };
//     allergies.givenDate = moment(e).format("yyyy-MM-DD HH:mm:ss");
//     setaddallergy([allergies]);
//   };

//   const [addallergies, setaddallergy] = useState([
//     {
//       chemicalAllergy: "",
//       createdBy: userData.code,
//       drugAllergy: "string",
//       foodAllergy: "string",
//       givenDate: moment().format("yyyy-MM-DD HH:mm:ss"),
//       modifiedBy: userData.code,
//       patientCode: userData.code,
//     },
//   ]);

//   useEffect(() => {
//     if (!userData?.id) {
//       history.push({
//         pathname: APP_ROUTES.LOGIN,
//         state: { background: location, login: true },
//       });
//     }
//   }, [userData.id,history,location]);

//   const saveallergy = (e) => {
//     e.preventDefault();
//     dispatch(patientaddallergy(addallergies));
//   };

//   return (
//     <>
//       <div className="flex justify-center lg:py-10 py-4">
//         <div className="lg:w-6/12 px-3 lg:shadow-lg bg-white-600  h-112 p-5 antialiased justify-between lg:border border-gray-500">
//           <div className="lg:pl-2 lg:pr-5  flex items-center justify-between">
//             <p className="inline px-2 rounded-full text-md  font-medium cursor-pointer text-brand-secondary">
//               Allergy Details
//             </p>
//             <div className="flex space-x-6 cursor-pointer">
//               <img src={close} alt="close" className="w-4" onClick={goBack} />
//             </div>
//           </div>
//           <hr className="mt-2" />
//           <div className="lg:flex  justify-between pt-5">
//             <div>
//               <p className="lg:pl-12 px-3 pb-2 text-sm text-gray-700 font-medium">
//                 Personal Details
//               </p>
//               <div className="flex space-x-12 pt-4 lg:pl-12 px-3">
//                 <div className="relative">
//                   <div className="flex">
//                     <select className="w-36  py-2 outline-none peer text-xs text-gray-700  border-b-2 border-gray-300 ">
//                       {members.map((data, i) => (
//                         <option className="py-1" value={data.text}>
//                           {data.text}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <label
//                     for="email"
//                     className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                   >
//                     Record For
//                   </label>
//                 </div>
//                 <div className="relative">
//                   <div className="relative mb-4">
//                     <DatePicker
//                       id="recordOn"
//                       name="givenDate"
//                       dropdownMode="select"
//                       showMonthDropdown
//                       showYearDropdown
//                       className="pt-2 text-gray-900 "
//                       dateFormat="dd/MM/yyyy"
//                       value={addallergies[0]?.givenDate??""}
//                       onSelect={changeDate}
//                       disabledKeyboardNavigation={true}
//                       autoFocus={false}
//                       placeholderText="Record On"
//                       className={
//                         "border-b-2 border-gray-300 pt-2 text-gray-900 bg-transparent"
//                       }
//                     />
//                     <label
//                       htmlFor="recordOn"
//                       className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                     >
//                       Record On
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex space-x-12 pt-4 lg:pl-12 px-3 pt-10">
//                 <div className="relative">
//                   <div className="flex w-96">
//                     <textarea
//                       autocomplete="off"
//                       id="notes"
//                       name="chemicalAllergy"
//                       rows={4}
//                       type="text"
//                       onChange={handleChange}
//                       className="peer w-full  h-50  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
//                       placeholder="Enter Information"
//                     />
//                   </div>
//                   <label
//                     htmlFor="notes"
//                     className="absolute left-0 -top-3.5 text-gray-600 text-xs
//                                             peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440
//                                             peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5
//                                             peer-focus:text-gray-600 peer-focus:text-sm"
//                   >
//                     Additional Notes<span className="text-red-500">*</span>
//                   </label>
//                 </div>
//               </div>

//               <div className="flex justify-end mt-3">
//                 <button
//                   onClick={saveallergy}
//                   className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
//                 >
//                   Save Data{" "}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/*  */}
//         </div>
//       </div>
//     </>
//   );
// }
// export default AddAllergy;
