import React, { useEffect, useState } from "react";
import close from "../../Assets/Images/closee.svg";
import sort from "../../Assets/Images/akar-icons_height.svg";
import weight from "../../Assets/Images/weight.svg";
import bg from "../../Assets/Images/bg.svg";
import bp from "../../Assets/Images/bp.svg";
import temp from "../../Assets/Images/tepreturee.svg";
import oxygen from "../../Assets/Images/oxyy.svg";
import add from "../../Assets/Images/addd.svg";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
//import { PATIENTPROFILE_ROUTES } from "../application/Router/constants/PatientProfileRoutes";
import { useDispatch, useSelector } from "react-redux";
import { addPatientvitals } from "../../Redux/Actions/userprofileVitalActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddVital({closePopup,patientCode}) {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };

  const addvitalsdatas = useSelector((state) => state.addvitalslist);
  const { addvitalsdata } = addvitalsdatas;

  let patient = localStorage.getItem("patientprofile");
  console.log("patient", patient);

  const [addvitals, setaddvitals] = useState({
    patientCode: patientCode,
    givenDate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    createdBy: patientCode,
    updatedBy: patientCode,
    status: 1,
    height: "",
    weight: "",
    bloodGroup: "",
    temperature: "",
    systolic: "",
    diastolic: "",
    spo2: "",
    heartRate: "",
    pulseRate: "",
    respirationRate: "",
    bloodGlucose: "",
    bmi: 0,
    bp: 0,
    hdl: 0,
    ldl: 0,
    medication: "string",
    notes: "string",
    notes1: "string",
    notes2: "string",
    totalCholesterol: 0,
    triglycerides: 0,
  });

  useEffect(() => {}, []);

  const handleChange = (e) => {
    setaddvitals({ ...addvitals, [e.target.name]: e.target.value });
    //setaddvitals({ ...addvitals, ['bmi']: '100.10' });
  };

  const savevitals = (e) => {
    e.preventDefault();
    const bmi = (
      addvitals.weight /
      ((addvitals.height / 100) * (addvitals.height / 100))
    ).toFixed(2);


    if(!addvitals?.height){
      toast("Please Enter Height")
      return
    } else if(!addvitals?.weight){
      toast("Please Enter Weight")
      return
    }else if(!addvitals?.temperature){
      toast("Please Enter Temperature")
      return
    }else if(!addvitals?.respirationRate){
      toast("Please Enter Respiration Rate")
      return
    }else if(!addvitals?.systolic){
      toast("Please Enter Systolic")
      return
    }else if(!addvitals?.diastolic){
      toast("Please Enter Diastolic")
      return
    }
    
    else if(!addvitals?.spo2){
      toast("Please Enter Pulse Ox")
      return
    }else if(!addvitals?.heartRate){
      toast("Please Enter Heart Rate")
      return
    }else if(!addvitals?.bloodGlucose){
      toast("Please Enter Blood Glucose")
      return
    }




 
    const payload = {
      patientCode: addvitals.patientCode,
      givenDate: addvitals.givenDate,
      createdBy: addvitals.createdBy,
      updatedBy: addvitals.updatedBy,
      status: addvitals.status,
      height: addvitals.height,
      weight: addvitals.weight,
      bloodGroup: addvitals.bloodGroup,
      temperature: addvitals.temperature,
      systolic: addvitals.systolic,
      diastolic: addvitals.diastolic,
      spo2: addvitals.spo2,
      heartRate: addvitals.heartRate,
      pulseRate: addvitals.pulseRate,
      respirationRate: addvitals.respirationRate,
      bloodGlucose: addvitals.bloodGlucose,
      bmi: addvitals.weight && addvitals.height ? bmi : "",
      bp: addvitals.bp,
      hdl: addvitals.hdl,
      ldl: addvitals.ldl,
      medication: addvitals.medication,
      notes: addvitals.notes,
      notes1: addvitals.notes1,
      notes2: addvitals.notes2,
      totalCholesterol: addvitals.totalCholesterol,
      triglycerides: addvitals.triglycerides,
    };

    
    dispatch(addPatientvitals(payload))
      .then((result) => {
        if (result) {
          toast("Vitals Added successfully");
          setTimeout(() => {
            closePopup();
          }, 2000);
        }
      })
      .catch((error) => {
        // setLoader(false)
        // redirectTo();
      });
    // history.push(PATIENTPROFILE_ROUTES.ALLVITALS);
    // closePopup();
  };

  const goBack = () => {
    closePopup();
  };

  return (
    <>
      <ToastContainer />
      <div className="border-0 rounded-lg shadow-lg  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="  flex justify-center py-10">
          {/*content*/}
          <div className="border w-11/12 md:w-8/12 xl:w-2/5 bg-white border-0 rounded-lg shadow-lg ">
            <div className="relative p-6 flex-auto">
              <div class="flex justify-between ">
                <p class="text-medium font-medium text-base  text-brand-secondary ">
                  Add Vitals
                </p>
                <img onClick={goBack} src={close} alt="close" class="w-4 h-4" />
              </div>
              <hr class="my-2" />
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div class="w-11/12 md:w-52">
                  <div class="flex space-x-1">
                    <img src={sort} alt="sort" class="w-4 h-4 mt-1" />
                    <p class="text-sm  font-medium">Height</p>
                  </div>
                  <div class="pt-4">
                    <div class="flex justify-between">
                      {/* <p class=" text-xs font-medium">6 ,1 </p>
                                            <p class=" text-xs font-normal text-gray-secondary">Ft inch</p> */}
                      <input
                        autocomplete="off"
                        id="height"
                        name="height"
                        type="text"
                        value={addvitals.height}
                        class=" text-xs font-medium peer focus:outline-none focus:borer-rose-600  w-full"
                        placeholder="Enter Height"
                        onChange={handleChange}
                        maxLength="6"
                        onKeyPress={(event) => {
                          if (!/[0-9.]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />

                      <p class=" text-xs font-normal text-gray-secondary w-20 pl-4">
                        cm
                      </p>
                    </div>
                    <hr class="bg-gray-primary" />
                  </div>
                </div>
                <div class="w-11/12 md:w-52">
                  <div class="flex space-x-3">
                    <img src={weight} alt="weight" class="w-4 h-4 mt-1" />
                    <p class="text-sm  font-medium">Weight</p>
                  </div>
                  <div class="pt-4">
                    <div class="flex justify-between ">
                      {/* <p class=" text-xs font-medium">120</p>
                                            <p class=" text-xs font-normal text-gray-secondary">Kg</p> */}
                      <input
                        autocomplete="off"
                        id="weight"
                        name="weight"
                        type="number"
                        value={addvitals.weight}
                        class=" text-xs font-medium peer focus:outline-none focus:borer-rose-600  w-full"
                        placeholder="Enter Weight"
                        onChange={handleChange}
                        maxLength="6"
                        onKeyPress={(event) => {
                          if (!/[0-9.]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                      <p class=" text-xs font-normal text-gray-secondary w-20 pl-12">
                        Kg
                      </p>
                    </div>
                    <hr class="bg-gray-primary" />
                  </div>
                </div>

                {/* 2nd row of popup */}

                {/* <div class="w-52">
                  <div class="flex space-x-3">
                    <img src={bg} alt="bg" class="w-4 h-4 mt-1" />
                    <p class="text-sm  font-medium">Blood Group</p>
                  </div>
                  <div class="pt-4">
                    <div class="flex justify-between">
                      {/* <p class=" text-xs font-medium">A</p>
                                            <p class=" text-xs font-normal text-gray-secondary">+</p> */}
                {/* <input *
                        autocomplete="off"
                        id="bloodGroup"
                        name="bloodGroup"
                        type="text"
                        value={addvitals.bloodGroup}
                        class=" text-xs font-medium peer focus:outline-none focus:borer-rose-600  w-full"
                        placeholder=""
                        onChange={handleChange}
                      />
                      <p class=" text-xs font-normal text-gray-secondary w-20 pl-16">
                        +
                      </p>
                    </div>
                    <hr class="bg-gray-primary" />
                  </div>
                </div> */}
                <div class="w-11/12 md:w-52">
                  <div class="flex space-x-3">
                    <img src={temp} alt="temp" class="w-4 h-4 mt-1" />
                    <p class="text-sm  font-medium">Temperature</p>
                  </div>
                  <div class="pt-4">
                    <div class="flex justify-between">
                      {/* <p class=" text-xs font-medium">120</p>
                                            <p class=" text-xs font-normal text-gray-secondary">Kg</p> */}
                      <input
                        autocomplete="off"
                        id="temperature"
                        name="temperature"
                        type="text"
                        value={addvitals.temperature}
                        class=" text-xs font-medium peer focus:outline-none focus:borer-rose-600  w-full"
                        placeholder="Enter Temperature"
                        onChange={handleChange}
                        maxLength="6"
                        onKeyPress={(event) => {
                          if (!/[0-9.]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                      <p class=" text-xs font-normal text-gray-secondary w-20 pl-12">
                        °F
                      </p>
                    </div>
                    <hr class="bg-gray-primary" />
                  </div>
                </div>

                <div class="w-11/12 md:w-52">
                  <div class="flex space-x-3">
                    <img src={oxygen} alt="oxygen" class="w-4 h-4 mt-1" />
                    <p class="text-sm  font-medium">
                      Respiration Rate
                    </p>
                  </div>
                  <div class="pt-4">
                    <div class="flex justify-between">
                      {/* <p class=" text-xs font-medium">98</p>
                                            <p class=" text-xs font-normal text-gray-secondary">Breathes/min</p> */}

                      <input
                        autocomplete="off"
                        id="respirationRate"
                        name="respirationRate"
                        type="text"
                        value={addvitals.respirationRate}
                        class=" text-xs font-medium peer focus:outline-none focus:borer-rose-600  w-full"
                        placeholder=""
                        onChange={handleChange}
                        maxLength="6"
                        onKeyPress={(event) => {
                          if (!/[0-9.]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                      <p class=" text-xs font-normal text-gray-secondary w-20 ">
                        breaths/min
                      </p>
                    </div>
                    <hr class="bg-gray-primary" />
                  </div>
                </div>

                {/* 3rd row */}

                <div class="w-11/12 md:w-52">
                  <div class="flex space-x-3">
                    <img src={bp} alt="bp" class="w-4 h-4 mt-1" />
                    <p class="text-sm  font-medium">Blood Pressure</p>
                  </div>
                  <p class=" text-xs font-normal text-gray-secondary pt-3">
                    SYS
                  </p>
                  <div class="pt-4">
                    <div class="flex justify-between">
                      {/* <p class=" text-xs font-medium">132 </p>
                                            <p class=" text-xs font-normal text-gray-secondary">MM/Hg</p> */}

                      <input
                        autocomplete="off"
                        id="systolic"
                        name="systolic"
                        type="text"
                        value={addvitals.systolic}
                        class=" text-xs font-medium peer focus:outline-none focus:borer-rose-600  w-full"
                        placeholder="Enter SYS"
                        onChange={handleChange}
                        maxLength="6"
                        onKeyPress={(event) => {
                          if (!/[0-9.]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                      <p class=" text-xs font-normal text-gray-secondary w-20 pl-4">
                        mmHg
                      </p>
                    </div>
                    <hr class="bg-gray-primary" />
                  </div>
                </div>
                <div class="w-11/12 md:w-52">
                  <div class="flex space-x-3 pt-6">
                    {/* <img src={weight} alt="weight"/> */}
                    <p class="text-sm  font-medium"></p>
                  </div>
                  <p class=" text-xs font-normal text-gray-secondary pt-2">
                    DIA
                  </p>
                  <div class="pt-4">
                    <div class="flex justify-between">
                      {/* <p class=" text-xs font-medium">79</p>
                                            <p class=" text-xs font-normal text-gray-secondary">MM/Hg</p> */}
                      <input
                        autocomplete="off"
                        id="diastolic"
                        name="diastolic"
                        type="text"
                        value={addvitals.diastolic}
                        class=" text-xs font-medium peer focus:outline-none focus:borer-rose-600  w-full"
                        placeholder="Enter DIA"
                        onChange={handleChange}
                        maxLength="6"
                        onKeyPress={(event) => {
                          if (!/[0-9.]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                      <p class=" text-xs font-normal text-gray-secondary w-20 pl-4">
                        mmHg
                      </p>
                    </div>
                    <hr class="bg-gray-primary" />
                  </div>
                </div>

                {/* 4th row */}

                <div class="w-11/12 md:w-52">
                  <div class="flex space-x-3">
                    <img src={oxygen} alt="oxygen" class="w-4 h-4 mt-1" />
                    <p class="text-sm  font-medium">Pulse Ox.</p>
                  </div>
                  <div class="pt-4">
                    <div class="flex justify-between">
                      {/* <p class=" text-xs font-medium">98</p> */}
                      {/* <p class=" text-xs font-normal text-gray-secondary ">Percentage</p> */}

                      <input
                        autocomplete="off"
                        id="spo2"
                        name="spo2"
                        type="text"
                        value={addvitals.spo2}
                        class=" text-xs font-medium peer focus:outline-none focus:borer-rose-600  w-full"
                        placeholder="Enter SpO2"
                        onChange={handleChange}
                        maxLength="6"
                        onKeyPress={(event) => {
                          if (!/[0-9.]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                      <p class=" text-xs font-normal text-gray-secondary w-20 pl-2">
                        %
                      </p>
                    </div>
                    <hr class="bg-gray-primary" />
                  </div>
                </div>

                <div class="w-11/12 md:w-52">
                  <div class="flex space-x-3">
                    <img src={weight} alt="weight" class="w-4 h-4 mt-1" />
                    <p class="text-sm  font-medium">Heart Rate</p>
                  </div>
                  <div class="pt-4 ">
                    <div class="flex justify-between">
                      {/* <p class=" text-xs font-medium">75</p>
                                            <p class=" text-xs font-normal text-gray-secondary ">Breathes/min</p> */}
                      <input
                        autocomplete="off"
                        id="heartRate"
                        name="heartRate"
                        type="text"
                        value={addvitals.heartRate}
                        class=" text-xs font-medium peer focus:outline-none focus:borer-rose-600  w-full"
                        placeholder=""
                        onChange={handleChange}
                        maxLength="6"
                        onKeyPress={(event) => {
                          if (!/[0-9.]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                      <p class=" text-xs font-normal text-gray-secondary w-20 ">
                        Beats/min
                      </p>
                    </div>
                    <hr class="bg-gray-primary" />
                  </div>
                </div>

                {/* 5th row */}

                {/* <div class="w-11/12 md:w-52">
                  <div class="flex space-x-3">
                    <img src={oxygen} alt="oxygen" class="w-4 h-4 mt-1" />
                    <p class="text-sm  font-medium">
                      Respiration Rate
                    </p>
                  </div>
                  <div class="pt-4">
                    <div class="flex justify-between">
                      <p class=" text-xs font-medium">98</p>
                      <p class=" text-xs font-normal text-gray-secondary">
                        Breathes/min
                      </p>

                      <input
                        autocomplete="off"
                        id="respirationRate"
                        name="respirationRate"
                        type="text"
                        value={addvitals.respirationRate}
                        class=" text-xs font-medium peer focus:outline-none focus:borer-rose-600  w-full"
                        placeholder=""
                        onChange={handleChange}
                        maxLength="6"
                        onKeyPress={(event) => {
                          if (!/[0-9.]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                      <p class=" text-xs font-normal text-gray-secondary w-20 ">
                        breaths/min
                      </p>
                    </div>
                    <hr class="bg-gray-primary" />
                  </div>
                </div> */}

                <div class="w-11/12 md:w-52">
                  <div class="flex space-x-3">
                    <img src={bg} alt="bg" class="w-4 h-4 mt-1" />
                    <p class="text-sm  font-medium">Blood Glucose</p>
                  </div>
                  <div class="pt-4 ">
                    <div class="flex justify-between">
                      {/* <p class=" text-xs font-medium">A</p>
                      <p class=" text-xs font-normal text-gray-secondary">
                        mg/dL
                      </p> */}
                      <input
                        autocomplete="off"
                        id="bloodGlucose"
                        name="bloodGlucose"
                        type="text"
                        value={addvitals.bloodGlucose}
                        class=" text-xs font-medium peer focus:outline-none focus:borer-rose-600  w-full"
                        placeholder=""
                        onChange={handleChange}
                        maxLength="6"
                        onKeyPress={(event) => {
                          if (!/[0-9.]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                      <p class=" text-xs font-normal text-gray-secondary w-20 pl-10">
                        mg/dL
                      </p>
                    </div>
                    <hr class="bg-gray-primary" />
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-4 justify-end">
                {/* <div class="mt-8 flex items-center space-x-1  md:space-x-3 ">
                  <img src={add} alt="add" class="w-5 h-5 mt-1" />
                  <p class="font-medium text-sm text-brand-secondary">
                    Add More Vitals{" "}
                  </p>
                </div> */}
                <button
                  onClick={savevitals}
                  class="bg-brand-secondary text-sm text-white py-2 px-4 rounded-lg mt-8"
                >
                  Save Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
export default AddVital;
