import React, { useEffect, useState } from "react";
import close from "../../Assets/Images/closee.svg";
import { useDispatch } from "react-redux";
import { addPatientvitals, getPatientvitallist } from "../../Redux/Actions/userprofileVitalActions";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

function Addvitalspopup(props) {

  const dispatch = useDispatch();
  const [addvitals, setaddvitals] = useState(props.data);

  const handleChange = (e) => {
    setaddvitals({ ...addvitals, [e.target.name]: e.target.value });
  };

  const savevitals = (e) => {


    if (addvitals?.systolic == undefined || addvitals?.systolic == "" || addvitals?.systolic == null || addvitals?.systolic == "0") {
      toast("Please add SYS!")
    } else if (addvitals?.diastolic == undefined || addvitals?.diastolic == "" || addvitals?.diastolic == null || addvitals?.diastolic == "0") {
      toast("Please add DIA!")
    } else if (addvitals?.temperature == undefined || addvitals?.temperature == "" || addvitals?.temperature == null || addvitals?.temperature == "0") {
      toast("Please add temperature!")
    } else if (addvitals?.heartRate == undefined || addvitals?.heartRate == "" || addvitals?.heartRate == null || addvitals?.heartRate == "0") {
      toast("Please add heart rate!")
    } else if (addvitals?.spo2 == undefined || addvitals?.spo2 == "" || addvitals?.spo2 == null || addvitals?.spo2 == "0"){
      toast("Please add oxygen rate!")
    } else if (addvitals?.respirationRate == undefined || addvitals?.respirationRate == "" || addvitals?.respirationRate == null || addvitals?.respirationRate == "0"){
      toast("Please add respiration rate!")
    } else if (addvitals?.bloodGlucose == undefined || addvitals?.bloodGlucose == "" || addvitals?.bloodGlucose == null || addvitals?.bloodGlucose == "0"){
      toast("Please add sugar!")
    } else if (addvitals?.bmi == undefined || addvitals?.bmi == "" || addvitals?.bmi == null || addvitals?.bmi == "0"){
      toast("Please add index!")
    } else if (addvitals?.weight == undefined || addvitals?.weight == "" || addvitals?.weight == null || addvitals?.weight == "0"){
      toast("Please enter weight!") 
    } else if (addvitals?.height == undefined || addvitals?.height == "" || addvitals?.height == null || addvitals?.height == "0"){
      toast("Please enter height!")
    }

    else {

      e.preventDefault();
      let newVitals = { ...addvitals };
      newVitals.createdDate = moment().format("yyyy-MM-DD HH:mm:ss");
      newVitals.updatedDate = moment().format("yyyy-MM-DD HH:mm:ss");
      newVitals.givenDate = moment().format("yyyy-MM-DD HH:mm:ss");
      newVitals.patientCode = props?.data?.patientCode;
      newVitals.createdBy = props?.data?.createdBy;
      newVitals.updatedBy = props?.data?.updatedBy;

      dispatch(addPatientvitals(newVitals)).then(res => {
        props.closePopup()
      }).catch(err => {
        console.log("Error");
      })

    }



  };

  const goBack = () => {
    props.closePopup();
  };

  return (
    <>
    <ToastContainer />
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full p-5 bg-white outline-none focus:outline-none">
            {/*body*/}
            <div className="flex justify-between mb-4">
              <p className="text-medium font-medium text-2xl    ">
                Enter Vitals
              </p>

              <img src={close} alt="close" className="w-4 h-4 mt-3" onClick={goBack} />
            </div>

            {/* bloodpressure addvital starts here */}

            {props?.title === "Blood Pressure" ? (
              <div>
                {/* <div className="w-52">
                  <p className=" text-xs font-normal text-gray-secondary pt-3">
                    Type of entry
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <input
                        autoComplete="off"
                        id="notes"
                        name="notes"
                        type="text"
                        value={addvitals?.notes ?? ""}
                        className=" text-sm font-medium peer   h-4 w-full border-b-1 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Type of entry"
                        onChange={handleChange}
                      />
                    </div>
                    <hr className="bg-gray-primary" />
                  </div>
                </div> */}

                <div className="w-52">
                  <p className=" text-xs font-normal text-gray-secondary pt-5">
                    SYS
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <input
                        autoComplete="off"
                        id="systolic"
                        name="systolic"
                        type="number"
                        value={addvitals?.systolic ?? ""}
                        className=" text-sm font-medium peer  h-4 w-full border-b-1 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="SYS"
                        onChange={handleChange}
                      />

                      <label
                        htmlFor="email"
                        className=" text-xs font-normal text-gray-secondary"
                      >
                        MM/Hg
                      </label>
                    </div>
                    <hr className="bg-gray-primary" />
                  </div>
                </div>
                <div className="w-52">
                  <div className="flex space-x-3 pt-6">
                    {/* <img src={weight} alt="weight"/> */}
                    <p className="text-sm  font-medium"></p>
                  </div>
                  <p className=" text-xs font-normal text-gray-secondary pt-2">
                    DIA
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <input
                        autoComplete="off"
                        id="diastolic"
                        name="diastolic"
                        type="number"
                        value={addvitals?.diastolic ?? ""}
                        className=" text-sm font-medium peer  h-4 w-full border-b-1 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="DIA"
                        onChange={handleChange}
                      />

                      <label
                        htmlFor="email"
                        className=" text-xs font-normal text-gray-secondary"
                      >
                        MM/Hg
                      </label>
                    </div>
                    <hr className="bg-gray-primary" />
                  </div>
                </div>
              </div>
            ) : null}
            {/* bloodpressure addvital ends here */}

            {/* Temperature addvital starts here */}

            {props?.title === "Temperature" ? (
              <div>
                {/* <div className="w-52">
                  <p className=" text-xs font-normal text-gray-secondary pt-3">
                    Type of entry
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <input
                        autoComplete="off"
                        id="notes"
                        name="notes"
                        type="text"
                        value={addvitals?.notes ?? ""}
                        className=" text-sm font-medium peer   h-4 w-full border-b-1 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Type of entry"
                        onChange={handleChange}
                      />
                    </div>
                    <hr className="bg-gray-primary" />
                  </div>
                </div> */}

                <div className="w-52">
                  <p className=" text-xs font-normal text-gray-secondary pt-5">
                    Temperature
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <input
                        autoComplete="off"
                        id="temperature"
                        name="temperature"
                        type="number"
                        value={addvitals?.temperature ?? ""}
                        className=" text-sm font-medium peer  h-4 w-full border-b-1 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Temperature"
                        onChange={handleChange}
                      />

                      <label
                        htmlFor="email"
                        className=" text-xs font-normal text-gray-secondary"
                      >
                        °F
                      </label>
                    </div>
                    <hr className="bg-gray-primary" />
                  </div>
                </div>
              </div>
            ) : null}
            {/* Temperature addvital ends here */}

            {/* heart rate addvitals? starts??"" here */}

            {props?.title === "Heart Rate" ? (
              <div>
                {/* <div className="w-52">
                  <p className=" text-xs font-normal text-gray-secondary pt-3">
                    Type of entry
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <input
                        autoComplete="off"
                        id="notes"
                        name="notes"
                        type="text"
                        value={addvitals?.notes ?? ""}
                        className=" text-sm font-medium peer   h-4 w-full border-b-1 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Type of entry"
                        onChange={handleChange}
                      />
                    </div>
                    <hr className="bg-gray-primary" />
                  </div>
                </div> */}

                <div className="w-52">
                  <p className=" text-xs font-normal text-gray-secondary pt-5">
                    Rate
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <input
                        autoComplete="off"
                        id="heartRate"
                        name="heartRate"
                        type="number"
                        value={addvitals?.heartRate ?? ""}
                        className=" text-sm font-medium peer  h-4 w-full border-b-1 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="rate"
                        onChange={handleChange}
                      />

                      <label
                        htmlFor="email"
                        className=" text-xs font-normal text-gray-secondary"
                      >
                        Beats/min
                      </label>
                    </div>
                    <hr className="bg-gray-primary" />
                  </div>
                </div>
              </div>
            ) : null}
            {/* heart rate addvital ends here */}

            {/* oxygen addvitals? starts??"" here */}

            {props?.title === "Oxygen" ? (
              <div>
                {/* <div className="w-52">
                  <p className=" text-xs font-normal text-gray-secondary pt-3">
                    Type of entry
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <input
                        autoComplete="off"
                        id="notes"
                        name="notes"
                        type="text"
                        value={addvitals?.notes ?? ""}
                        class=" text-sm font-medium peer   h-4 w-full border-b-1 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Type of entry"
                        onChange={handleChange}
                      />
                    </div>
                    <hr className="bg-gray-primary" />
                  </div>
                </div> */}

                <div className="w-52">
                  <p className=" text-xs font-normal text-gray-secondary pt-5">
                    Rate
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <input
                        autoComplete="off"
                        id="spo2"
                        name="spo2"
                        type="number"
                        value={addvitals?.spo2 ?? ""}
                        class=" text-sm font-medium peer  h-4 w-full border-b-1 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Rate"
                        onChange={handleChange}
                      />

                      <label
                        htmlFor="email"
                        className=" text-xs font-normal text-gray-secondary"
                      >
                        %
                      </label>
                    </div>
                    <hr className="bg-gray-primary" />
                  </div>
                </div>
              </div>
            ) : null}
            {/* oxygen addvital ends here */}

            {/* resporatoryrate addvitals starts here */}

            {props?.title === "Resporatory Rate" ? (
              <div>
                {/* <div className="w-52">
                  <p className=" text-xs font-normal text-gray-secondary pt-3">
                    Type of entry
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <input
                        autoComplete="off"
                        id="notes"
                        name="notes"
                        type="text"
                        value={addvitals?.notes ?? ""}
                        class=" text-sm font-medium peer   h-4 w-full border-b-1 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Type of entry"
                        onChange={handleChange}
                      />
                    </div>
                    <hr className="bg-gray-primary" />
                  </div>
                </div> */}

                <div className="w-52">
                  <p className=" text-xs font-normal text-gray-secondary pt-5">
                    Rate
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <input
                        autoComplete="off"
                        id="respirationRate"
                        name="respirationRate"
                        type="number"
                        value={addvitals?.respirationRate ?? ""}
                        class=" text-sm font-medium peer  h-4 w-full border-b-1 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Rate"
                        onChange={handleChange}
                      />

                      <label
                        htmlFor="email"
                        className=" text-xs font-normal text-gray-secondary"
                      >
                        Breathes/min
                      </label>
                    </div>
                    <hr className="bg-gray-primary" />
                  </div>
                </div>
              </div>
            ) : null}
            {/* resporatoryrate addvital ends here */}

            {/* bloodglucose addvitals starts here */}

            {props?.title === "Blood Glucose" ? (
              <div>
                {/* <div className="w-52">
                  <p className=" text-xs font-normal text-gray-secondary pt-3">
                    Type of entry
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <input
                        autoComplete="off"
                        id="notes"
                        name="notes"
                        type="text"
                        value={addvitals?.notes ?? ""}
                        class=" text-sm font-medium peer   h-4 w-full border-b-1 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Type of entry"
                        onChange={handleChange}
                      />
                    </div>
                    <hr className="bg-gray-primary" />
                  </div>
                </div> */}

                <div className="w-52">
                  <p className=" text-xs font-normal text-gray-secondary pt-5">
                    Sugar
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <input
                        autoComplete="off"
                        id="bloodGlucose"
                        name="bloodGlucose"
                        type="number"
                        value={addvitals?.bloodGlucose ?? ""}
                        class=" text-sm font-medium peer  h-4 w-full border-b-1 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Sugar"
                        onChange={handleChange}
                      />

                      <label
                        htmlFor="email"
                        className=" text-xs font-normal text-gray-secondary"
                      >
                        mg/dL
                      </label>
                    </div>
                    <hr className="bg-gray-primary" />
                  </div>
                </div>
              </div>
            ) : null}
            {/* bloodglucose addvital ends here */}

            {/* bmi addvitals starts here */}

            {props?.title === "Bmi" ? (
              <div>
                {/* <div className="w-52">
                  <p className=" text-xs font-normal text-gray-secondary pt-3">
                    Type of entry
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <input
                        autoComplete="off"
                        id="notes"
                        name="notes"
                        type="text"
                        value={addvitals?.notes ?? ""}
                        class=" text-sm font-medium peer   h-4 w-full border-b-1 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Type of entry"
                        onChange={handleChange}
                      />
                    </div>
                    <hr className="bg-gray-primary" />
                  </div>
                </div> */}

                <div className="w-52">
                  <p className=" text-xs font-normal text-gray-secondary pt-5">
                    Index
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <input
                        autoComplete="off"
                        id="bmi"
                        name="bmi"
                        type="number"
                        value={addvitals?.bmi ?? ""}
                        class=" text-sm font-medium peer  h-4 w-full border-b-1 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Feet"
                        onChange={handleChange}
                      />

                      <label
                        htmlFor="email"
                        className=" text-xs font-normal text-gray-secondary"
                      >
                        index{" "}
                      </label>
                    </div>
                    <hr className="bg-gray-primary" />
                  </div>
                </div>
              </div>
            ) : null}
            {/* bmi addvital ends here */}

            {/* weight addvitals starts here */}

            {props?.title === "Weight" ? (
              <div>
                {/* <div className="w-52">
                  <p className=" text-xs font-normal text-gray-secondary pt-3">
                    Type of entry
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <input
                        autoComplete="off"
                        id="notes"
                        name="notes"
                        type="text"
                        value={addvitals?.notes ?? ""}
                        class=" text-sm font-medium peer   h-4 w-full border-b-1 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Type of entry"
                        onChange={handleChange}
                      />
                    </div>
                    <hr className="bg-gray-primary" />
                  </div>
                </div> */}

                <div className="w-52">
                  <p className=" text-xs font-normal text-gray-secondary pt-5">
                    Weight
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <input
                        autoComplete="off"
                        id="weight"
                        name="weight"
                        type="number"
                        value={addvitals?.weight ?? ""}
                        class=" text-sm font-medium peer  h-4 w-full border-b-1 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Kg"
                        onChange={handleChange}
                      />

                      <label
                        htmlFor="email"
                        className=" text-xs font-normal text-gray-secondary"
                      >
                        Kg{" "}
                      </label>
                    </div>
                    <hr className="bg-gray-primary" />
                  </div>
                </div>
              </div>
            ) : null}
            {/* weight addvital ends here */}

            {/* height addvitals starts here */}

            {props?.title === "Height" ? (
              <div>
                {/* <div className="w-52">
                  <p className=" text-xs font-normal text-gray-secondary pt-3">
                    Type of entry
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <input
                        autoComplete="off"
                        id="notes"
                        name="notes"
                        type="text"
                        value={addvitals?.notes ?? ""}
                        class=" text-sm font-medium peer   h-4 w-full border-b-1 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Type of entry"
                        onChange={handleChange}
                      />
                    </div>
                    <hr className="bg-gray-primary" />
                  </div>
                </div> */}

                <div className="w-52">
                  <p className=" text-xs font-normal text-gray-secondary pt-5">
                    Height
                  </p>
                  <div className="pt-4">
                    <div className="flex justify-between">
                      <input
                        autoComplete="off"
                        id="height"
                        name="height"
                        type="number"
                        value={addvitals?.height ?? ""}
                        class=" text-sm font-medium peer  h-4 w-full border-b-1 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Height"
                        onChange={handleChange}
                      />

                      <label
                        htmlFor="email"
                        className=" text-xs font-normal text-gray-secondary"
                      >
                        cm{" "}
                      </label>
                    </div>
                    <hr className="bg-gray-primary" />
                  </div>
                </div>
              </div>
            ) : null}
            {/* height addvital ends here */}

            <div className="flex justify-center">
              <button
                onClick={savevitals}
                className="bg-brand-secondary w-full  text-white py-3.5 px-6 font-medium rounded-xl mb-2 mt-4"
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

export default Addvitalspopup;
