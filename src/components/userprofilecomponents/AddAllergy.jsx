import React, { useState, useEffect } from "react";
import close from "../../Assets/Images/closeee.svg";

//import FamilyDropdown from "./Familydropdown";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import DatePicker from "react-datepicker";
import { patientaddallergy, patientEditallergy } from "../../Redux/Actions/UserprofileActions";
//import { getPatientallergylist } from "../../Redux/Actions/UserprofilehealthrecordAction";
import { getPatientallergylist } from "../../Redux/Actions/UserprofileActions";
// import { getLocalTime } from "../../Assets/utils/LocalTimeFormat";

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
      setGivenDateShow(moment(props?.editallergy?.givenDate).format("DD/MM/yyyy"))
    }
  }, []);
  const userData = useSelector((state) => state.authReducer.userData);

  const handleChange = (e) => {
    setaddallergy({ ...addallergies, [e.target.name]: e.target.value });
  };

  const changeDate = (e) => {
    setGivenDate(moment(e).format("YYYY-MM-DD hh:mm:ss"))
    setGivenDateShow(moment(e).format("DD/MM/yyyy"))
  };

  const patientdata = localStorage.getItem("patientprofile");
  const patientCode = useSelector(state => state.authReducer.patientCode);

  const saveallergy = (e) => {
    e.preventDefault();

    if (props?.editallergy) {
      let patient = localStorage.getItem("patientprofile");
      const data = [{
        "chemicalAllergy": !addallergies.chemicalAllergy ? props?.editallergy?.chemicalAllergy : addallergies.chemicalAllergy,
        "createdBy": props.patient ? props.patient : patientCode,
        "createdDate": "",
        "drugAllergy": !addallergies.drugAllergy ? props?.editallergy?.drugAllergy : addallergies.drugAllergy,
        "foodAllergy": !addallergies.foodAllergy ? props?.editallergy?.foodAllergy : addallergies.foodAllergy,
        "fromDate": "",
        "givenDate":   !givenDate ? props?.editallergy?.givenDate : givenDate,
        "id": props?.editallergy?.id,
        "modifiedBy": props.patient ? props.patient : patientCode,
        "modifiedDate": moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
        "patientCode": props.patient ? props.patient : patientCode,
        "status": 1,
        "toDate": ""
      }]
      dispatch(patientEditallergy(data)).then((result) => {
        dispatch(getPatientallergylist(patientCode));
        props.closePopup()
      })
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
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full p-5 bg-white outline-none focus:outline-none">
            {/*body*/}

            <div className="lg:pl-2 lg:pr-5  flex items-center justify-between">
              <p className="inline px-2 rounded-full text-md  font-medium cursor-pointer text-brand-secondary">
                {props?.editallergy ? "Edit Allergy Details" : "Add Allergy Details"}
              </p>
              <div className="flex space-x-6 cursor-pointer">
                <img src={close} alt="close" className="w-4" onClick={goBack} />
              </div>
            </div>
            <hr className="mt-2" />
            <div className="lg:flex  justify-between pt-5">
              <div>
                <p className="l px-3 pb-2 text-xs text-gray-700 font-medium">
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
                      className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-xs"
                    >
                      Record For
                    </label>
                  </div> */}
                <div class="flex justify-between py-8 space-x-10 px-3 text-xs">
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
                        value={givenDateShow ? givenDateShow : ""}
                        onSelect={changeDate}
                        disabledKeyboardNavigation={true}
                        autoFocus={false}
                        placeholderText="Record On"
                        className={
                          "border-b-2 border-gray-300 pt-2 text-gray-900 bg-transparent focus:outline-none"
                        }
                      />
                      <label
                        htmlFor="recordOn"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-xs"
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
                                            peer-focus:text-gray-600 peer-focus:text-xs"
                    >
                      Additional Notes<span className="text-red-500">*</span>
                    </label>
                  </div>
                </div> */}
                <div class="md:flex justify-between md:py-8 md:space-x-10 text-xs px-3">
                  <div class="relative">
                    <div className="flex ">
                      <input autocomplete="off" id="drugAllergy" name="drugAllergy" maxLength="50" type="text" class="peer lg:w-full w-40  h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Drug Allergies"
                        onChange={handleChange}
                        value={addallergies.drugAllergy}
                      />
                    </div>
                    <label for="drugAllergy" class="absolute left-0 text-xs -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-xs">Drug Allergies</label>
                  </div>
                  <div class="relative mt-8 md:mt-0 lg:px-2">
                    <div className="flex">
                      <input autocomplete="off" id="foodAllergy" name="foodAllergy" maxLength="50" type="text" class="peer lg:w-full w-40 h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 " placeholder="Enter Food Allergies"
                        onChange={handleChange}
                        value={addallergies.foodAllergy}
                      />
                    </div>
                    <label for="foodAllergy" class="absolute lg:left-2 -top-3.5 text-xs text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-xs">Food Allergies</label>
                  </div>
                </div>
                <div class="flex justify-between py-8 space-x-10 px-3 text-xs">
                  <div class="relative">
                    <div className="flex ">
                      <input autocomplete="off" id="chemicalAllergy" name="chemicalAllergy" maxLength="50" type="text" class="peer lg:w-full w-40  h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Chemical Allergies"
                        onChange={handleChange}
                        value={addallergies.chemicalAllergy}
                      />
                    </div>
                    <label for="chemicalAllergy" class="absolute left-0 -top-3.5 text-xs text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-xs">Chemical Allergies</label>
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
