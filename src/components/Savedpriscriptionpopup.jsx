import moment from "moment";
import React from "react";
import close from "../Assets/Images/closee.svg";
import logo from "../Assets/Images/Only logo.png";

function Savedpriscriptionpopup(props) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-4xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full p-5 bg-white outline-none focus:outline-none">
            {/*body*/}

            <div className="">
              <div className="lg:pl-2 lg:pr-5  mb-4  flex items-center justify-between">
                <p className="inline px-2 rounded-full text-md  text-gray-primary text-lg font-medium cursor-pointer  ">
                  Saved Prescription
                </p>
                <div className="flex space-x-6 cursor-pointer">
                  <img
                    src={close}
                    alt="close"
                    className="w-4"
                    onClick={props.onClose}
                  />
                </div>
              </div>

              <hr className="mb-4"></hr>

              <div className="flex flex-col">
                <div className="-my-2 sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className=" mx-2 overflow-hidden   ">
                      <div className="h-80 lg:w-full w-96 lg:mx-1  overflow-x-scroll hide-scroll-bar">
                        <table className="lg:min-w-full  divide-y divide-gray-200 lg:px-2 ">
                          <thead className="bg-gray-50">
                            <tr>
                              <div className="flex ">
                                <input
                                  type="radio"
                                  className="form-radio mt-4 ml-6 "
                                  name="accountType"
                                  value="personal"
                                />
                                <th
                                  scope="col"
                                  className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Description
                                </th>
                              </div>

                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Type
                              </th>

                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Date
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {props.ePrescriptions?.map((res, i) => {
                              if (
                                ((res.patientDrugPrescriptionList &&
                                  res.patientDrugPrescriptionList.length > 0) ||
                                  (res.patientLabTestsList &&
                                    res.patientLabTestsList.length > 0)) &&
                                res.prescription.hasOwnProperty("id")
                              ) {
                                return (
                                  <tr
                                    key={i}
                                    className="border-b border-gray-200 pt-"
                                  >
                                    <td className="px-6 py-2 whitespace-nowrap">
                                      <div className="flex items-center">
                                        <div className=" flex space-x-2">
                                          <input
                                            type="radio"
                                            className="form-radio mt-1 mr-2"
                                            name="prescription"
                                            value="personal"
                                            onClick={() =>
                                              props.onSelect(
                                                `Prescription-${res.prescription.diagnositicNotes}`,
                                                true,
                                                res
                                              )
                                            }
                                          />
                                          <div className="flex space-x-2">
                                            <img src={logo} alt="" />
                                            <div className="text-sm font-medium text-gray-500 ">
                                              Prescription-
                                              {res.complaints +
                                                " " +
                                                res.consultReason}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-6 py-2 whitespace-nowrap">
                                      <div className="text-sm text-gray-500 ">
                                        {res.consultationType === "V"
                                          ? "E-Prescription"
                                          : ""}
                                      </div>
                                    </td>
                                    <td className="px-6 py-2 whitespace-nowrap">
                                      <span className="text-sm text-gray-500 ">
                                        {moment(
                                          res.modifiedDate,
                                          "yyyy-MM-DD HH:mm:ss"
                                        ).format("DD MMM, y")}
                                      </span>
                                    </td>
                                    <td className="px-6 py-2 whitespace-nowrap text-right text-sm font-medium">
                                      <div className="flex space-x-4">
                                        <button className="lg:bg-transparent bg-brand-secondary w-full text-md font-medium lg:text-brand-secondary text-white px-4   hover:border-transparent rounded-xl">
                                          View
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              } else {
                                return null;
                              }
                            })}
                            {props.docPrescription?.map((res, i) => {
                              const desc = `Prescription-${
                                res.userName ?? res.patientName
                              }`;
                              return (
                                <tr
                                  key={i}
                                  className="border-b border-gray-200 pt-"
                                >
                                  <td className="px-6 py-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className=" flex space-x-2">
                                        <input
                                          type="radio"
                                          className="form-radio mt-1 mr-2"
                                          name="prescription"
                                          value="personal"
                                          onClick={() =>
                                            props.onSelect(desc, false, res)
                                          }
                                        />
                                        <div className="flex space-x-2">
                                          <img src={logo} alt="" />
                                          <div className="text-sm font-medium text-gray-500 ">
                                            {desc}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-2 whitespace-nowrap">
                                    <div className="text-sm text-gray-500 ">
                                      {"HandWritten"}
                                    </div>
                                  </td>
                                  <td className="px-6 py-2 whitespace-nowrap">
                                    <span className="text-sm text-gray-500 ">
                                      {moment(
                                        res.modifiedDate,
                                        "yyyy-MM-DD HH:mm:ss"
                                      ).format("DD MMM, y")}
                                    </span>
                                  </td>
                                  <td className="px-6 py-2 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex space-x-4">
                                      <button className="lg:bg-transparent bg-brand-secondary w-full text-md font-medium lg:text-brand-secondary text-white px-4   hover:border-transparent rounded-xl">
                                        View{" "}
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* <div className="flex justify-end"> */}
                    {/* <button
                        onClick={props.sendToComparision}
                        className="bg-brand-secondary  text-white py-3.5 px-6 font-medium rounded-xl mb-8"
                      >
                        Add for Ordering
                      </button> */}
                    {/* </div> */}
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

export default Savedpriscriptionpopup;
