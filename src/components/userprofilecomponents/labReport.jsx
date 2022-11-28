/* This example requires Tailwind CSS v2.0+ */

import React, { useEffect, useState } from "react";

import Patientprofileupbar from "./Patientprofileupbar";
import Userprofilesidebar from "../userprofilesidebar";
import LabServices from "../../Redux/services/labServices";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { DICOM_URL } from "../../config/constant";
//import { Dropdown } from "react-bootstrap";
import { MenuIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { USERPROFILE_ROUTES } from "../../application/Router/constants/UserProfileRoutes";
import { useHistory, useLocation,Link } from "react-router-dom";
import FamilyDropdown from './FamilyDropDown';
import akshay from '../../Assets/Images/akshay.png';

import { getLocalTime } from '../../Assets/utils/LocalTimeFormat';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";


import Axios from 'axios';
import fileDownload from 'js-file-download';
import DoctorService from "../../Redux/services/doctorService";






function LabReport(props) {
  const [labReportList, setLabReport] = useState([]);
  const [diagnositcDs, setdiagnositcDs] = useState([]);
  const [diagnositcLocationDs, setdiagnositcLocationDs] = useState([]);
  const [filterPopup, setFilterPopup] = useState(false);
  const [filePopup, setfilePopup] = useState(false);
  const [dicomPopup, setdicomPopup] = useState(false);
  const [dicomURL, setdicomURL] = useState("");
  const [labObj, setLabObj] = useState({});
  const [selectedRow, setSelectedRow] = useState({});
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dicomToken, setDicomToken] = useState("");
  const history = useHistory();
  const patientCode = useSelector((state) => state.authReducer.patientCode);

  useEffect(() => {
    const payload = {
      patientId: patientCode, //localStorage.getItem("patientprofile"),
      docmentRequired: "Y",
    };
    loadLabOrders(payload);
    loadDiagnosticCenter();
    //   getDicomToken();
  }, []);

  const getDicomToken = () => {
    console.log("dicom enter");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "integration",
        password: "integration",
      }),
    };
    fetch(DICOM_URL + "authenticate", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDicomToken(data.token);
      });
  };

  const viewDicomFile = (payload) => {
    console.log("dicom file");
    const requestOptions = {
      method: "POST",
      headers: { Authorization: "Bearer " + dicomToken },
      // body: JSON.stringify({
      //   username: 'integration',
      //   password: 'integration'
      // })
    };
    fetch(DICOM_URL + "viewer/" + payload, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setdicomURL(data.details);
        setdicomPopup(true);
        // setDicomToken(data.token);
      });
  };

  const loadDiagnosticCenter = () => {
    const payload = { status: 1, type: "D", };
    LabServices.getDiagnosticCenter(payload).then(
      (res) => {
        console.log(res);
        if (res.data) {
          setdiagnositcDs(res.data);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const loadLabOrders = (payload) => {
    LabServices.getLabOrderDetails(payload).then(
      (res) => {
        console.log(res);
        setFilterPopup(false);
        if (res.data) {
          setLabReport(res.data);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };





  const getDiagnosticLocation = () => {
    const payload = {
      hospitalCode: labObj.hospitalId,
      status: 1,
    };
    LabServices.getDiagnosticLocation(payload).then(
      (res) => {
        console.log(res);
        if (res.data) {
          setdiagnositcLocationDs(res.data);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    setLabObj({ ...labObj, [e.target.name]: e.target.value });
    if (e.target.name == "hospitalId") {
      getDiagnosticLocation();
    }
  };

  const openFilter = (e) => {
    console.log(e);
    setFilterPopup(true);
  };

  const okFilter = (e) => {
    console.log("Filter Click");
    let payload = {};
    if (fromDate) {
      payload.fromDate = fromDate;
    }
    if (toDate) {
      payload.toDate = toDate;
    }
    if (labObj.orderId) {
      payload.orderId = labObj.orderId;
    }
    if (labObj.hospitalId) {
      payload.hospitalId = labObj.hospitalId;
    }
    if (labObj.locationId) {
      payload.locationId = labObj.locationId;
    }
    payload.docmentRequired = "Y";
    payload.patientId = patientCode; //localStorage.getItem("patientprofile");
    console.log(payload);
    loadLabOrders(payload);

    setFromDate("")
    setToDate("");
    labObj.orderId = "";
    labObj.hospitalId = "";
    labObj.locationId = "";
  };

  const onHide = (name) => {
    console.log(name);
    setFilterPopup(false);
  };

  const gotoHistory = (e) => {
    e.preventDefault();
    history.push(USERPROFILE_ROUTES.MYDETAILS)
  }

  const onCancelDocument = (name) => {

   


    console.log(name);
    setfilePopup(false);


  };

  const onDownloadDocument = async(name) => {

    let url=selectedRow.photoName ? `${process.env.REACT_APP_IMG_BASEURL}${selectedRow.photoName}` : akshay
     let filename=selectedRow.type
    let newUrl="https://cors-anywhere.herokuapp.com/"+url


    DoctorService.imagetoData(
      selectedRow.photoName
    ).then((res) => {
      var base64;
      if (filename === "application/pdf") {
        base64 = "data:application/pdf;base64,";
      } else {
        base64 = "data:image/png;base64,";
      }
      //alert(JSON.stringify(res.data.fileData))
      var FileSaver = require("file-saver");
      FileSaver.saveAs(
        base64 + res.data.fileData,
        selectedRow.photoName
      );
    });
    
    setfilePopup(false);
  };
  const onCancelDicom = (name) => {
    console.log(name);
    setdicomPopup(false);
  };

  const changeFromDate = (e) => {
    setToDate("")
    setFromDate(moment(e).format("yyyy-MM-DD"));
  };

  const changeToDate = (e) => {
    setToDate(moment(e).format("yyyy-MM-DD"));
  };

  const viewOrder = (e) => {
    console.log("View Order", e);
    setSelectedRow(e);
    e.type =
      e.type.toLowerCase() === "pdf"
        ? "application/pdf"
        : e.type.toLowerCase() === "jpg"
          ? "image/jpeg"
          : e.type.toLowerCase() === "jpeg"
            ? "image/jpeg"
            : e.type.toLowerCase() === "png"
              ? "image/png"
              : e.type;
    if (e.type.toLowerCase() == "dicom") {
      viewDicomFile(e.dicomId);
    } else {
      setfilePopup(true);
    }
  };

  const renderFooter = (name) => {
    return (
      <div>
        <button
          onClick={() => onHide(name)}
          className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
        >
          Cancel
        </button>

        <button
          onClick={() => okFilter(name)}
          className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
        >
          Ok
        </button>
      </div>
    );
  };

  const renderDocumentFooter = (name) => {
    return (
      <div>

<button
          onClick={() => onDownloadDocument(name)}
          className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
        >
          Download
        </button>

       
        <button
          onClick={() => onCancelDocument(name)}
          className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
        >
          Cancel
        </button>
      </div>
    );
  };

  const renderDicomFooter = (name) => {
    return (
      <div>
        <button
          onClick={() => onCancelDicom(name)}
          className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
        >
          Cancel
        </button>
      </div>
    );
  };

  const iframeStyle = { border: "none", width: "95vw", height: "75vh" };

  const iframeStyleLab = { border: "none", width: "70vw", height: "75vh" };

  console.log(selectedRow, "selectedRowwenve")

  const loadLabReportFor = (patient) => {
    const payload = {
      patientId: patient, //localStorage.getItem("patientprofile"),
      docmentRequired: "Y",
    };
    loadLabOrders(payload)
  }




  return (
    <>
      <ToastContainer />
      <Patientprofileupbar></Patientprofileupbar>

      <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base mb-2 mt-0">
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
          <a >My Lab Report</a>
        </li>
      </ul>

      <br />

      <div className="flex justify-between " style={{ backgroundColor: "#F8F8F8" }}>
        <div className="lg:block hidden lg:w-3/12 w-full ml-6 mt-3">
          <Userprofilesidebar></Userprofilesidebar>
        </div>

        <div className="lg:w-8/12 w-full md:mr-4 md:ml-4  lg:mr-16 lg:ml-0 mt-6">
          <div className="flex flex-col w-full">

            <p className="text-2xl font-bold text-gray-800 mb-5">My Lab Report</p>
            <div className="py-2 bg-white md:h-screen align-middle inline-block w-full sm:px-6 lg:px-8">

              <div className='flex justify-between items-center mb-4'>
                <FamilyDropdown title="My Lab Report" onSelect={loadLabReportFor} />

                <div className='lg:mt-0 mt-2 items-end hidden sm:block'>
                  <button className="text-black text-xs font-semibold p-2 px-8" style={{ borderRadius: "5px", border: "1px solid #262626" }} onClick={(e) => { gotoHistory(e) }}>Go Back</button>


                </div>
              </div>
              {/* <hr /> */}



              <div className="w-full h-112 lg:mb-2 mb-16 antialiased justify-between">
                {labReportList.length === 0 ? (
                  <p className="text-center item-center mt-40 mb-40 text-gray-400 ">
                    No Order available
                  </p>
                ) : (
                  <>

                    <div className="flex justify-end">
                    <div onClick={(e) => openFilter(e)} className=" flex justify-center bg-brand-secondary  rounded items-center text-white mx-2 h-9 w-9 cursor-pointer mb-2">
                      <FontAwesomeIcon icon={faFilter} />
                    </div>
                    </div>

                    <hr />
                    <div className="md:shadow w-full block md:block border-b border-gray-200 sm:rounded-lg mb-8 ">
                      <hr classname="hidden border-dash text-black w-10 mt-4 h-20 my-2"></hr>
                      <div className="h-full md:h-80 w-full md:mx-1  overflow-hidden overflow-y-scroll overflow-x-scroll scroll-bar bg-white ring-1 ring-gray-600 ring-opacity-5 ">
                        <table className="max-w-full h-full  md:h-28 md:divide-y md:divide-gray-200 table">
                          <thead className="bg-gray-50">
                            <tr>
                              <div className="flex justify-start">
                                {/* <input type="radio" class="form-radio mt-2 my-2" name="accountType" value="personal" /> */}
                                <th
                                  scope="col"
                                  className="px-6 py-6 text-center text-xs font-normal text-black uppercase tracking-wider"
                                >
                                  Order ID
                                </th>
                              </div>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-normal text-black uppercase tracking-wider"
                              >
                                Date
                              </th>

                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-normal text-black uppercase tracking-wider"
                              >
                                Diagnostics
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-normal text-black uppercase tracking-wider"
                              >
                                Diagnostics Location
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-normal text-black uppercase tracking-wider"
                              >
                                Test name
                              </th>

                              <th
                                scope="col"
                                className="pr-2 px-6 py-3 text-center text-xs font-normal text-black uppercase tracking-wider"
                              >
                                View Document
                              </th>
                            </tr>
                          </thead>
                          <tbody className="md:divide-y divide-gray-200">
                            {labReportList.map((lab, i) => (
                              <tr key={i}>
                                <td data-label="Order ID" className="md:px-6 md:py-6 md:whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className=" flex md:space-x-2">
                                      <div className="text-xs font-normal text-black ">
                                        {lab.orderId}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td data-label="Date" className="md:px-6 md:py-6 md:whitespace-nowrap">
                                  <div className="flex md:justify-center items-center">
                                    <div className=" flex md:space-x-2">
                                      <div className="text-xs font-normal text-black ">
                                        {getLocalTime(lab.createdDate)}


                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td data-label="Diagnostics" className="md:px-6 md:py-6 md:whitespace-nowrap">
                                  <div className="flex md:justify-center text-xs ">
                                    {lab.hospitalName}
                                  </div>
                                </td>
                                <td data-label="Diagnostics Location" className="md:px-6 md:py-6 md:whitespace-nowrap">
                                  <div className="flex md:justify-center text-xs ">
                                    {lab.locationName}
                                  </div>
                                </td>
                                <td data-label="Test Name" className="md:text-center md:px-6 md:py-6 md:whitespace-nowrap text-xs ">
                                  <div>{lab.labTestName}</div>
                                </td>
                                <td data-label="View Document" className="md:px-6 md:py-6 md:whitespace-nowrap md:text-right text-xs font-normal text-black">
                                  <div className="flex md:justify-center space-x-4">
                                    <button
                                      className=" md:mr-2 text-brand-secondary hover:text-brand-secondary"
                                      onClick={() => viewOrder(lab)}
                                    >
                                      View
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {filterPopup && (
        <Dialog
          header="Filter"
          visible={filterPopup}
          modal={false}
          // style={{ width: "50vw", height: "auto" }}
          className="w-11/12 md:w-8/12 lg:w-1/2 h-auto  "
          footer={renderFooter("displayModal")}
          onHide={() => onHide("displayModal")}
        >
          <p className="p-m-0">
            <div className="lg:flex pt-2 ">
              <div className="lg:w-6/6">
                <div className="flex flex-col md:flex-row justify-between lg:pt-1 mt-5 lg:space-x-10 ">
                  <div className=" w-full md:w-3/12 lg:w-4/12 mb-5 ">
                    <label
                      for="fromDate"
                      className="left-0 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      From Date
                    </label>

                    <DatePicker
                      id="fromDate"
                      name="fromDate"
                      dropdownMode="select"
                      showMonthDropdown
                      showYearDropdown
                      maxDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                      value={fromDate}
                      onSelect={changeFromDate}
                      disabledKeyboardNavigation={true}
                      autoFocus={false}
                      placeholderText="From Date"
                      className={
                        "peer  w-full text-xs h-10  border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      }
                    />
                  </div>

                  <div className=" w-full md:w-3/12 lg:w-4/12 mb-5">
                    <label
                      for="toDate"
                      className="left-0 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      To Date
                    </label>

                    <DatePicker
                      id="toDate"
                      name="toDate"
                      dropdownMode="select"
                      showMonthDropdown
                      showYearDropdown
                      minDate={new Date(fromDate)}
                      maxDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                      value={toDate}
                      onSelect={changeToDate}
                      disabledKeyboardNavigation={true}
                      autoFocus={false}
                      placeholderText="To Date"
                      className={
                        "peer  w-full h-10 text-xs border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      }
                    />
                  </div>

                  <div className="relative w-full md:w-3/12 lg:w-4/12 mb-5">
                    <label
                      for="orderId"
                      className="left-0 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Order ID
                    </label>
                    <input
                      autocomplete="off"
                      id="orderId"
                      name="orderId"
                      type="text"
                      value={labObj.orderId}
                      className={
                        "peer  w-full h-10 text-xs border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      }
                      placeholder="Order ID"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="lg:flex lg:pt-1 mt-5 lg:space-x-10 md:flex-row  mx-auto text-xs">
                  <div className="relative md:w-4/12 mb-5 text-xs">
                    <label
                      for="relation"
                      className="left-0 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:text-gray-600 peer-focus:text-xs"
                    >
                      Diagnosic Center
                    </label>{" "}
                    <br></br>
                    <Dropdown
                      value={labObj.hospitalId}
                      options={diagnositcDs}
                      onChange={handleChange}
                      optionLabel="name"
                      optionValue="code"
                      className="w-full text-xs"
                      filter
                      showClear
                      id="hospitalId"
                      name="hospitalId"
                      filterBy="name"
                      placeholder="Select Diagnosic Center"
                    />
                  </div>

                  <div className="relative md:w-4/12 mb-5">
                    <label
                      for="locationId"
                      className="left-0 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:text-gray-600 peer-focus:text-xs"
                    >
                      Location
                    </label>{" "}
                    <br></br>
                    <Dropdown
                      value={labObj.locationId}
                      options={diagnositcLocationDs}
                      onChange={handleChange}
                      optionLabel="name"
                      optionValue="code"
                      filter
                      showClear
                      id="locationId"
                      name="locationId"
                      className="w-full text-xs"
                      filterBy="name"
                      placeholder="Select Location"
                    />
                  </div>
                </div>
              </div>
            </div>
          </p>
        </Dialog>
      )}

      {filePopup && (
        <Dialog
          header="Document"
          visible={filePopup}
          modal={false}
         
          // style={{ width: "98vw", height: "100vh" }}

          footer={renderDocumentFooter("displayModal")}
          onHide={() => onCancelDocument("displayModal")}
        >
          <p className="p-m-0"   >
            <div className="lg:flex pt-2 "  >
              <div className="lg:w-6/6">
                <div    className="lg:flex lg:pt-1 g:space-x-10 ">

                  {selectedRow?.type !== "application/pdf" ?
                    <img  style={{ width: 380 }}
                      className="box target object-contain"

                      src={selectedRow.photoName ? `${process.env.REACT_APP_IMG_BASEURL}${selectedRow.photoName}` : akshay}
                      title="Dicom Viewer"
                      type={selectedRow.type}
                    /> :
                    <iframe id="abc"
                      className="box target w-full h-auto"

                      src={selectedRow.photoName ? `${process.env.REACT_APP_IMG_BASEURL}${selectedRow.photoName}` : akshay}
                      title="Dicom Viewer"
                      type={selectedRow.type}

                      style={iframeStyleLab}
                    />





                  }


                </div>
              </div>
            </div>
          </p>
        </Dialog>
      )}

      {dicomPopup && (
        <Dialog
          header="Dicom Viewer"
          position="top"
          visible={dicomPopup}
          modal={false}
          style={{ width: "98vw", height: "100vh" }}
          footer={renderDicomFooter("displayModal")}
          onHide={() => onCancelDicom("displayModal")}
        >
          <p className="p-m-0">
            <div className="lg:flex pt-2 ">
              <div className="lg:w-6/6">
                <iframe
                  src={dicomURL}
                  title="Dicom Viewer"
                  style={iframeStyle}
                ></iframe>
              </div>
            </div>
          </p>
        </Dialog>
      )}
    </>
  );
}
export default LabReport;
