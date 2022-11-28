import React, { useEffect, useState } from "react";
import close from "../Assets/Images/closee.svg";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import { patientaddmedicalhistory } from "../Redux/Actions/UserprofileActions";
import DatePicker from "react-datepicker";
import moment from "moment";

function AddMedical() {
  const history = useHistory();
  const dispatch = useDispatch();
  const goBack = () => {
    history.goBack();
  };

  const location = useLocation();
  const userData = useSelector((state) => state.authReducer.patientData);

  const handleChange = (e) => {
    setaddmedicalhistory({
      ...addmedicalhistory,
      [e.target.name]: e.target.value,
    });
  };

  const changeDate = (e) => {
    setaddmedicalhistory({
      ...addmedicalhistory,
      givenDate: moment(e).format("yyyy-MM-DD HH:mm:ss"),
    });
  };

  const [addmedicalhistory, setaddmedicalhistory] = useState({
    patientId: userData.code,
    givenDate: moment().format("yyyy-MM-DD HH:mm:ss"),
    description: "",
    status: 1,
    createdBy: userData.code,
    modifiedBy: userData.code,
  });

  const savemedicalhistory = (e) => {
    e.preventDefault();
    dispatch(patientaddmedicalhistory(addmedicalhistory));
  };

  useEffect(() => {
    if (!userData?.id) {
      history.push({
        pathname: APP_ROUTES.LOGIN,
        state: { background: location, login: true },
      });
    }
  }, [history, location, userData.id]);
  return (
    <>
      <div className="flex justify-center lg:py-10 py-2">
        <div className="lg:w-6/12 lg:shadow-lg bg-white-600  h-112 lg:p-5 p-3 justify-between lg:border border-gray-500">
          <div className="pl-2 pr-5  flex items-center justify-between">
            <p className="inline px-2 rounded-full text-md  font-medium cursor-pointer text-brand-secondary">
              Add Medical History
            </p>
            <div className="flex space-x-6 cursor-pointer">
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
              <p className="lg:pl-12 p-4 pb-2 text-sm text-gray-700 font-medium">
                Personal Details
              </p>
              <div className="flex space-x-12 pt-4 lg:pl-12 p-4">
                <div className="relative">
                  <div className="flex">
                    <select className="w-36 py-2 outline-none peer text-xs text-gray-700  border-b-2 border-gray-300 ">
                      <option className="py-1" value="father">
                        father
                      </option>
                      <option className="py-1" value="mother">
                        mother
                      </option>
                      <option className="py-1" value="daughter">
                        Daughter
                      </option>
                      <option className="py-1" value="son">
                        Son
                      </option>
                      <option className="py-1" value="Grandson">
                        Grandson
                      </option>
                      <option className="py-1" value="Grandfather">
                        Grandfather
                      </option>
                      <option className="py-1" value="Grandmother">
                        Grandmother
                      </option>
                    </select>
                  </div>
                  <label
                    for="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Record For
                  </label>
                </div>
                <div className="relative">
                  <div className="relative mb-4">
                    <DatePicker
                      id="recordOn"
                      name="givenDate"
                      dropdownMode="select"
                      showMonthDropdown
                      showYearDropdown
                      dateFormat="dd/MM/yyyy"
                      value={addmedicalhistory.givenDate}
                      onSelect={changeDate}
                      disabledKeyboardNavigation={true}
                      autoFocus={false}
                      placeholderText="Record On"
                      className={
                        "border-b-2 border-gray-300 pt-2 text-gray-900 bg-transparent"
                      }
                    />
                    <label
                      htmlFor="recordOn"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Record On
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex space-x-12 pt-4 lg:pl-12 px-3">
                <div className="relative">
                  <div className="flex w-96">
                    <textarea
                      autocomplete="off"
                      id="notes"
                      name="description"
                      value={addmedicalhistory.description}
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
              </div>

              <div className="flex justify-end mt-3">
                <button
                  onClick={savemedicalhistory}
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
    </>
  );
}
export default AddMedical;
