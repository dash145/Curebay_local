/* This example requires Tailwind CSS v2.0+ */
import React, { useState } from "react";
import close from "../../Assets/Images/closeee.svg";
import DatePicker from "react-datepicker";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getpatientvitaldetails } from "../../Redux/Actions/patientAction";
import moment from "moment";

function Allvitalspopup(props) {
  
  const history = useHistory();
  const location = useLocation();

  const goBack = () => {
    props.closePopup();
  };

  const dispatch = useDispatch();
  const patientvitalsdetaillist = useSelector(
    (state) => state.patientvitalsdetail
  );
  const { Patientvitalsdetailsdata } = patientvitalsdetaillist;
  const patientCode = useSelector(state => state.authReducer.patientCode);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleDate = (e, type) => {
    if (type === "fromDate") {
      setFromDate(moment(e).format("DD/MM/yyyy"));
    }
    if (type === "toDate") {
      setToDate(moment(e).format("DD/MM/yyyy"));
    }
  };

  useEffect(() => {
    let patient = localStorage.getItem("patientprofile");
    console.log("patient", patient);

    dispatch(getpatientvitaldetails(patientCode));
  }, [dispatch]);

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full p-5 bg-white outline-none focus:outline-none">
            {/*body*/}

            <div className="flex justify-between mb-4">
              <p className="text-medium font-medium text-2xl    ">
                {props?.title}
              </p>

              <img src={close} alt="close" class="w-4" onClick={goBack} />
            </div>

            <hr classname="border-dash text-black w-10 mt-10 h-20 my-2" />
            <div class="flex ">
              <div className="flex pt-2 pr-2">Date:</div>
              <DatePicker
                // id="dob"
                name="fromDate"
                // className="pt-2 text-gray-900 "
                dropdownMode="select"
                showMonthDropdown
                showYearDropdown
                dateFormat="dd/MM/yyyy"
                value={fromDate}
                onSelect={(date) => handleDate(date, "fromDate")}
                disabledKeyboardNavigation={true}
                autoFocus={false}
                // readOnly={!showinput}
                placeholder="26/1/1997"
                className={`${true ? "border-b-2 border-gray-300 w-28 " : "border-0 "
                  } pt-2 text-gray-900 bg-transparent`}
              />
              <div className="pt-2 pr-2">-</div>
              <DatePicker
                // id="dob"
                name="toDate"
                // className="pt-2 text-gray-900 "
                dropdownMode="select"
                showMonthDropdown
                showYearDropdown
                dateFormat="dd/MM/yyyy"
                value={toDate}
                onSelect={(date) => handleDate(date, "toDate")}
                disabledKeyboardNavigation={true}
                autoFocus={false}
                // readOnly={!showinput}
                placeholder="26/1/1997"
                className={`${true ? "border-b-2 border-gray-300 w-28" : "border-0 "
                  } pt-2 text-gray-900 bg-transparent`}
              />
            </div>

            {/* bloodpressure start table */}

            {props?.title === "Blood Pressure" ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Entry Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Sys
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Dia
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Patientvitalsdetailsdata.filter((data) => {
                    if (!fromDate && !toDate) {
                      return true;
                    }
                    return moment(
                      data.givenDate,
                      "yyyy-MM-DD HH:mm:ss"
                    ).isBetween(
                      fromDate ? moment(fromDate, "DD/MM/yyyy") : moment(),
                      toDate ? moment(toDate, "DD/MM/yyyy") : moment(),
                      'days',
                      "[]"
                    );
                  })
                    .slice(0, 5)
                    .map((user, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center  flex space-x-6 text-sm font-medium text-gray-500 ">
                          {moment(user.givenDate).format("DD/MM/yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 ">
                            {" "}
                            {user.systolic}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-500 ">
                            {user.diastolic}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : null}
            {/* bloodpressure start table end */}

            {/* temperaturetable starts here */}

            {props?.title === "Temperature" ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Entry Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Temperature
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Patientvitalsdetailsdata.filter((data) => {
                    if (!fromDate && !toDate) {
                      return true;
                    }
                    return moment(
                      data.givenDate,
                      "yyyy-MM-DD HH:mm:ss"
                    ).isBetween(
                      fromDate ? moment(fromDate, "DD/MM/yyyy") : moment(),
                      toDate ? moment(toDate, "DD/MM/yyyy") : moment(),
                      'days',
                      "[]"
                    )
                  })
                    .slice(0, 5)
                    .map((user, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center  flex space-x-6 text-sm font-medium text-gray-500 ">
                          {moment(user.givenDate).format("DD/MM/yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 ">
                            {" "}
                            {user.temperature}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : null}
            {/* temperaturetable ends here */}

            {/* heartratetable starts here */}

            {props?.title === "Heart Rate" ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Entry Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Beats
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Patientvitalsdetailsdata.filter((data) => {
                    if (!fromDate && !toDate) {
                      return true;
                    }
                    return moment(
                      data.givenDate,
                      "yyyy-MM-DD HH:mm:ss"
                    ).isBetween(
                      fromDate ? moment(fromDate, "DD/MM/yyyy") : moment(),
                      toDate ? moment(toDate, "DD/MM/yyyy") : moment(),
                      "days",
                      "[]"
                    );
                  })
                    .slice(0, 5)
                    .map((user, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center  flex space-x-6 text-sm font-medium text-gray-500 ">
                          {moment(user.givenDate).format("DD/MM/yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 ">
                            {" "}
                            {user.heartRate} beats/min
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : null}

            {/* heartratetable ends here */}

            {/* oxygentable starts here */}

            {props?.title === "Oxygen" ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Entry Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      SPO2
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Patientvitalsdetailsdata.filter((data) => {
                    if (!fromDate && !toDate) {
                      return true;
                    }
                    return moment(
                      data.givenDate,
                      "yyyy-MM-DD HH:mm:ss"
                    ).isBetween(
                      fromDate ? moment(fromDate, "DD/MM/yyyy") : moment(),
                      toDate ? moment(toDate, "DD/MM/yyyy") : moment(),
                      "days",
                      "[]"
                    );
                  })
                    .slice(0, 5)
                    .map((user, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center  flex space-x-6 text-sm font-medium text-gray-500 ">
                          {moment(user.givenDate).format("DD/MM/yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 ">
                            {" "}
                            {user.spo2} %
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : null}

            {/* oxygentable ends here */}

            {/* resporatoryratetable starts here */}

            {props?.title === "Respiration Rate" ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Entry Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      BREATHS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Patientvitalsdetailsdata.filter((data) => {
                    if (!fromDate && !toDate) {
                      return true;
                    }
                    return moment(
                      data.givenDate,
                      "yyyy-MM-DD HH:mm:ss"
                    ).isBetween(
                      fromDate ? moment(fromDate, "DD/MM/yyyy") : moment(),
                      toDate ? moment(toDate, "DD/MM/yyyy") : moment(),
                      "days",
                      "[]"
                    );
                  })
                    .slice(0, 5)
                    .map((user, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center  flex space-x-6 text-sm font-medium text-gray-500 ">
                          {moment(user.givenDate).format("DD/MM/yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 ">
                            {" "}
                            {user.respirationRate} Breaths/min
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : null}

            {/* resporatoryratetable ends here */}

            {/* bloodglucosetable starts here */}

            {props?.title === "Blood Glucose" ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Entry Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Sugar
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Patientvitalsdetailsdata.filter((data) => {
                    if (!fromDate && !toDate) {
                      return true;
                    }
                    return moment(
                      data.givenDate,
                      "yyyy-MM-DD HH:mm:ss"
                    ).isBetween(
                      fromDate ? moment(fromDate, "DD/MM/yyyy") : moment(),
                      toDate ? moment(toDate, "DD/MM/yyyy") : moment(),
                      "days",
                      "[]"
                    );
                  })
                    .slice(0, 5)
                    .map((user, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center  flex space-x-6 text-sm font-medium text-gray-500 ">
                          {moment(user.givenDate).format("DD/MM/yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 ">
                            {" "}
                            {user.bloodGlucose} mg/dL
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : null}

            {/* bloodglucosetable ends here */}

            {/* Bmitable starts here */}

            {props?.title === "Bmi" ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Entry Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Index
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Patientvitalsdetailsdata.filter((data) => {
                    if (!fromDate && !toDate) {
                      return true;
                    }
                    return moment(
                      data.givenDate,
                      "yyyy-MM-DD HH:mm:ss"
                    ).isBetween(
                      fromDate ? moment(fromDate, "DD/MM/yyyy") : moment(),
                      toDate ? moment(toDate, "DD/MM/yyyy") : moment(),
                      "days",
                      "[]"
                    );
                  })
                    .slice(0, 5)
                    .map((user, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center  flex space-x-6 text-sm font-medium text-gray-500 ">
                          {moment(user.givenDate).format("DD/MM/yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 ">
                            {" "}
                            {user.bmi}{" "}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : null}

            {/* Bmitable ends here */}

            {/* weightable starts here */}

            {props?.title === "Weight" ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Entry Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      kilogram
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Patientvitalsdetailsdata.filter((data) => {
                    if (!fromDate && !toDate) {
                      return true;
                    }
                    return moment(
                      data.givenDate,
                      "yyyy-MM-DD HH:mm:ss"
                    ).isBetween(
                      fromDate ? moment(fromDate, "DD/MM/yyyy") : moment(),
                      toDate ? moment(toDate, "DD/MM/yyyy") : moment(),
                      "days",
                      "[]"
                    );
                  })
                    .slice(0, 5)
                    .map((user, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center  flex space-x-6 text-sm font-medium text-gray-500 ">
                          {moment(user.givenDate).format("DD/MM/yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 ">
                            {" "}
                            {user.weight} Kg{" "}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : null}

            {/* weightable ends here */}

            {/* heighttable starts here */}

            {props?.title === "Height" ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Entry Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      cm
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Patientvitalsdetailsdata.filter((data) => {
                    if (!fromDate && !toDate) {
                      return true;
                    }
                    return moment(
                      data.givenDate,
                      "yyyy-MM-DD HH:mm:ss"
                    ).isBetween(
                      fromDate ? moment(fromDate, "DD/MM/yyyy") : moment(),
                      toDate ? moment(toDate, "DD/MM/yyyy") : moment(),
                      "days",
                      "[]"
                    );
                  })
                    .slice(0, 5)
                    .map((user, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center  flex space-x-6 text-sm font-medium text-gray-500 ">
                          {moment(user.givenDate).format("DD/MM/yyyy")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 ">
                            {" "}
                            {user.height} cm{" "}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : null}

            {/* heighttable ends here */}

            {/*  */}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
export default Allvitalspopup;
