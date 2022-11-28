/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from "react";
import Userprofilesidebar from "../userprofilesidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  patientFeedback,
  getCustomerList,
} from "../../Redux/Actions/UserprofileActions";
import {
  editPatientDetails,
  getPatientDetails,
} from "../../Redux/Actions/UserprofileActions";
import { useHistory, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../../application/Router/constants/AppRoutes";
// import DatePicker from 'react-date-picker';
import { ToastContainer, toast } from "react-toastify";
function Feedback() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authReducer.patientData);
  const patientinfo = useSelector((state) => state.patientinfo);
  const { patientinfoData } = patientinfo;

  const successinfo = useSelector((state) => state.feedbackinfo);
  const { issuccess, customercareData } = successinfo;
  const [err, setErr] = useState("");
  // const [date, setNewDate] = useState(new Date());
  const [showModal, setShowModal] = React.useState(false);
  const [feedback, setFeedback] = useState({
    content: "",
    createdBy: patientinfoData.code,
    createdDate: null,
    fromCode: userData.code,
    fromDate: null,
    modifiedBy: patientinfoData.code,
    modifiedDate: null,
    status: 1,
    subject: "string",
    toCode: customercareData.length > 0 ? customercareData[0].code : "",
    toDate: null,
  });
  useEffect(() => {
    dispatch(getPatientDetails(userData.code));
    dispatch(getCustomerList("CCARE"));
  }, []);
  useEffect(() => {
    // setFeedback(patientinfoData)
    console.log(patientinfoData);
  }, [patientinfoData]);

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const savefeedback = (e) => {
    e.preventDefault();
    let inputId = document.getElementById("content");
    dispatch(patientFeedback(feedback));
    if (inputId.value.trim().length == 0) {
      setErr("Please Enter the feedback");
    } else {
      if (issuccess) {
        toast("Feedback Submitted Successfully");
        setErr("");
        // setErr('feedback saved successfully');
      } else {
        setErr("feedback saved successfully");
      }
    }

    setFeedback({ ...feedback, ["content"]: e.target.value });
  };

  useEffect(() => {
    if (userData?.id) {
      console.log("patientinfo", userData.code);
    } else {
      history.push({
        pathname: APP_ROUTES.LOGIN,
        state: { background: location, login: true },
      });
    }
  }, []);

  const ClearFiled = (e) => {
    e.preventDefault();
    const inputId = document.getElementById("content");
    inputId.value = "";
    setFeedback({ ...feedback, ["content"]: "" });
  };
  return (
    <>
      <ToastContainer />
      <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base mt-8 mb-2">
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
          <a>Feedback</a>

          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </li>
      </ul>
      <br />

      <div className="flex justify-between "  style={{background:"#F8F8F8"}}>
        <div className="lg:block hidden w-3/12 ml-6 mt-3">
          <Userprofilesidebar></Userprofilesidebar>
        </div>

        <div className="lg:w-8/12 w-11/12 m-auto lg:mr-12 my-5 ">
        <div className="pb-4">
              <h1 className="text-medium font-bold text-2xl text-gray-800">
                Feedback
              </h1>
            </div>
          <div className="flex flex-col   bg-white w-full px-5 py-5 antialiased justify-between border border-gray-200 ">

            <div>
              <h1 className="text-medium font-semibold text-lg">
                Please Submit Your Feedback
              </h1>
            </div>
            <div className="py-8 text-base leading-6 h-20 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="relative  flex pt-2">
                <input
                  autocomplete="off"
                  id="content"
                  maxLength={500}
                  name="content"
                  type="text"
                  value={feedback.content}
                  className="peer h-8 lg:w-6/12 w-full border-b-2 border-gray-300 text-xs text-gray-600 focus:outline-none focus:borer-rose-600"
                  placeholder="Enter Your Feedback"
                  onChange={handleChange}
                />


                {/* <label
                  for="content"

                  className="absolute left-0 -top-3.5 text-green-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-green-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-green-600 peer-focus:text-sm"
                >
                  Enter Your Feedback
                </label> */}


              </div>
              {err && (
                <span className="text-red-600  font-normal text-xs tracking-widest">
                  {err}
                </span>
              )}

              <label
                for="content"
                className="flex justify-end lg:w-6/12 top-3.5  text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-green-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-green-600 peer-focus:text-sm d-flex"
              >
                {feedback.content.length + "/500"}
              </label>


            </div>

            <div className="flex justify-end mt-14 lg:mt-8">
              <button
                className="bg-white text-brand-secondary p-2 rounded-xl mr-2"
                onClick={ClearFiled}
              >
                Clear
              </button>
              <button
                type="submit"
                onClick={savefeedback}
                className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
                
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Feedback;
