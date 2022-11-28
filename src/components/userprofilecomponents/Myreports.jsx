import React, { useState, useEffect } from "react";
import arrowdown from "../../Assets/Images/arrow.download.svg";
import { SearchIcon } from "@heroicons/react/outline";
import { useHistory } from "react-router-dom";
import { PlusCircleIcon, EyeIcon, FilterIcon } from "@heroicons/react/solid";
import Userprofilesidebar from "../userprofilesidebar";
import { useDispatch, useSelector } from "react-redux";
import { getmypriscriptionlist } from "../../Redux/Actions/UserprofileActions";
import FamilyDropdown from "./FamilyDropDown";
import moment from "moment";
import http from "../../Redux/services/http-common";
import { encodeBase64File } from "../../helper/filebase64";
import { viewImage } from "../../helper/ImageDownload";
import { Dialog } from "primereact/dialog";
import DatePicker from "react-datepicker";
import {
  getReport,
  uploadReport,
  updateReport,
} from "../../Redux/Actions/reportAction";
import NewLoader from "../../components/NewLoader";
import { USERPROFILE_ROUTES } from "../../application/Router/constants/UserProfileRoutes";
import akshay from "../../Assets/Images/akshay.png";
import { getLocalTime } from "../../Assets/utils/LocalTimeFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

function Myreports() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector((state) => state.authReducer.patientData);
  const patientCode = useSelector((state) => state.authReducer.patientCode);
  const reportList = useSelector((state) => state.reportReducer.reportList);

  const insuranceinfo = useSelector((state) => state.mypriscription);
  const { mypriscriptionData } = insuranceinfo;

  const [openNewEntryPopup, setopenNewEntryPopup] = useState(false);
  const [pickedDate, setPickedDate] = useState(moment().format("DD/MM/YYYY"));
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentTypeNew, setDocumentTypeNew] = useState("");
  const [notes, setNotes] = useState("");
  const [docName, setdocName] = useState("");
  const [openViewDocument, setOpenViewDocument] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [fromDate, setFromDate] = useState(
    moment(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).format("MM/DD/YYYY")
  );
  const [toDate, setToDate] = useState(
    moment(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)).format("MM/DD/YYYY")
  );
  const [mode, setMode] = useState("");
  const [selectedReportId, setSelectedReportId] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [fileType, setFileType] = useState("");
  const [patient, setPatient] = useState(userData);
  const [fileInputValue, setfileInputValue] = useState('')

  useEffect(() => {
    getReportList();
  }, [patientCode]);

  const getReportList = () => {
    const payload = {
      patientCode: patient.code,
      fromDate: fromDate,
      toDate: toDate,
    };

    dispatch(getReport(payload));
    setopenNewEntryPopup(false);
  };

  console.log("documentTypexx", documentType);
  const onAddNewEntry = () => {
    if (documentType == undefined || documentType == "" || documentType == null) {
      toast("Please select document type!")
    } else if (title == undefined || title == "" || title == null) {
      toast("Please add title!")
    } else if (notes == undefined || notes == "" || notes == null) {
      toast("Please add notes!")
    } else if (pickedDate == undefined || pickedDate == "" || pickedDate == null) {
      toast("Please pick a date!")
    } else if (fileInputValue == undefined || fileInputValue == "" || fileInputValue == null) {
      toast("Please upload a document!")
    }

    else {
      let filetype;
      // if(selectedFile){
      //   filetype = selectedFile?.type?.split("/")
      // }
      if (!isChanged) {
        setopenNewEntryPopup(false);
        return;
      }

      // if (profile.lastName.length < 1) {
      // setErr("mobile no should be exact 10 digit!");
      // setShow(true);
      //   toast("Please enter your lastname!")
      //   return;
      // }

      // setLoading(true);

      const payload = {
        patientCode: patient?.code,
        // "givenDate": "2022-03-14 10:03:05",
        title: title,
        notes: notes,
        ePrescriptionGen: -1,
        ePrescriptionStatus: -1,
        status: 1,
        documentUploadByVisit: 0,
        documentRequired: "N",
        createdBy: userData.code,
        modifiedBy: userData.code,
        enteredBy: userData.code,
        createdDate: moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
        givenDate: moment(pickedDate, "DD/MM/YYYY").format("YYYY-MM-DD hh:mm:ss"),
        patientName: userData.firstName,
        patientMobile: userData.mobile,
        visitId: 0,
      };
      if (mode == "new") {
        payload.documentType = fileType;
        payload.reportType = documentType;
        payload.document = selectedFile;
        dispatch(uploadReport(payload)).then((res) => {
          setLoading(false);
          getReportList();
        });
      }
      if (mode == "updatereport") {
        payload.documentType = fileType;
        payload.reportType = documentType;
        payload.document = selectedFile;
        dispatch(updateReport(payload, selectedReportId)).then((res) => {
          setLoading(false);
          getReportList();
        });
      }
      console.log(payload, "sdpfjsdoihsdoihvdof");
    }
  };

  const openNewEntry = () => {
    setIsChanged(true);
    setMode("new");
    setPickedDate("");
    setTitle("");
    setDocumentType();
    setdocName("");
    setSelectedFile("");
    setNotes("");
    setSelectedReportId("");
    setopenNewEntryPopup(true);
  };

  const renderNewEntryFooter = (name) => {
    return (
      <div>
        <button
          onClick={() => setopenNewEntryPopup(false)}
          className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
        >
          Cancel
        </button>

        <button
          disabled={isLoading}
          onClick={onAddNewEntry}
          className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
        >
          {isChanged ? "Save" : "Ok"}
        </button>
      </div>
    );
  };
  const handleFileInput = (event) => {
    setfileInputValue(event.target.files)
    setIsChanged(true);
    const files = event.target.files;
    const fileName = files[0].name.split(".");
    const reader = new FileReader();
    let attachment;
    reader.onload = function (e) {
      attachment = e.target.result;
      const att = attachment.split(",");
      setSelectedFile(att[1]);
      setFileType(fileName[1]);
      // console.log(e.target.result, "dvsnvlsdbvaljd")
    };
    // setTimeout(() => {
    //   const att = attachment.split(',');
    //    setSelectedFile(attachment);
    //    setFileType(fileName[1])
    // }, 1000);
    reader.readAsDataURL(files[0]);
  };

  const handleReportList = (data) => {
    setMode("updatereport");
    setSelectedReportId(data.id);
    setIsChanged(false);
    setPickedDate(moment(data.createdDate).format("DD/MM/YYYY"));
    if (data.title) {
      setTitle(data.title);
    }
    if (data.reportType) {
      setDocumentType(data.reportType);
    }

    if (data.documentType) {
      setDocumentTypeNew(data.documentType);
    }
    if (data.notes) {
      setNotes(data.notes);
    }
    if (data.docName) {
      setdocName(data.docName);
    }
    setopenNewEntryPopup(true);
  };

  const onFilter = () => {
    const payload = {
      patientCode: userData.code,
      fromDate: fromDate,
      toDate: toDate,
    };
    dispatch(getReport(payload));
    setOpenFilter(false);
  };

  console.log(reportList, "sdcjsdnciosdjci");
  const gotoHistory = (e) => {
    e.preventDefault();
    history.push(USERPROFILE_ROUTES.MYDETAILS);
  };

  const loadReportFor = (code) => {
    console.log(code, "reportListsdhvs");

    const payload = {
      patientCode: code,
      fromDate: fromDate,
      toDate: toDate,
    };

    setPatient({ code: code ? code : userData.code });
    // console.log(payload, "sdbsdjvbkdsjvs", moment(new Date()).format("DD/MM/YYYY"))
    dispatch(getReport(payload));
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
          <a>My Reports</a>
        </li>
      </ul>
      <br />

      <div
        className="flex justify-between "
        style={{ backgroundColor: "#F8F8F8" }}
      >
        <div className="lg:block hidden lg:w-3/12 w-full ml-6 mt-3">
          <Userprofilesidebar></Userprofilesidebar>
        </div>

        <div className="w-full lg:w-8/12 lg:mr-12 mt-5">
          <p className="text-2xl font-bold text-gray-800 mb-5">My Reports</p>
          <div className="flex flex-col bg-white border">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="flex justify-between lg:items-center items-start">
                <FamilyDropdown
                  title="Get Reports For"
                  onSelect={loadReportFor}
                />
                <div className="hidden sm:block">
                  <button
                    className="text-black text-xs font-semibold p-2 px-8"
                    style={{ borderRadius: "5px", border: "1px solid #262626" }}
                    onClick={(e) => {
                      gotoHistory(e);
                    }}
                  >
                    Go Back
                  </button>
                </div>
              </div>
              <div className=" overflow-hidden border border-gray-200 rounded-lg m-auto ">
                <div className="flex justify-end my-2 space-x-2 mr-2">
                  <div className="flex items-center" onClick={openNewEntry}>
                    <PlusCircleIcon className="h-3 w-3 ml-2 font-medium cursor-pointer" />
                    <span className="text-brand-secondary text-sm font-medium ml-2 cursor-pointer">
                      New
                    </span>
                  </div>
                  {/* <div className="flex items-center cursor-pointer " onClick={() => setOpenFilter(true)} > */}
                  <div
                    onClick={() => setOpenFilter(true)}
                    className=" flex justify-center bg-brand-secondary  rounded items-center text-white mx-2 h-9 w-9 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faFilter} />
                  </div>
                  {/* </div> */}
                </div>
              </div>
              <div className="h-full md:h-80 lg:h-full my-3 px-3 w-full sm:rounded-lg overflow-auto overflow-y-scroll scroll-bar bg-white ring-1 ring-gray-600 ring-opacity-5 grid grid-cols-1 md:grid-cols-2 gap-8 p-3">
                {reportList && reportList.length === 0 ? (
                  <div className="flex justify-center w-full">
                    <p className="text-center item-center mt-40 mb-40 text-gray-400 ">
                      No Order available
                    </p>
                  </div>
                ) : (
                  <>
                    {reportList.map((res, i) => {
                      return (
                        <div
                          className="border px-8 py-4"
                          style={{
                            borderRadius: "7px",
                            width: "100%",
                            height: "160px",
                          }}
                        >
                          <div className="flex font-normal text-xs mb-2">
                            <p className="w-20">Given Date</p>{" "}
                            <span className="mr-8">:</span>{" "}
                            <p>{getLocalTime(res?.givenDate.split(" ")[0])}</p>
                          </div>
                          <div className="flex font-normal text-xs mb-2">
                            <p className="w-20">Created Date</p>{" "}
                            <span className="mr-8">:</span>{" "}
                            <p>
                              {getLocalTime(res?.createdDate.split(" ")[0])}
                            </p>
                          </div>
                          <div className="flex font-normal text-xs mb-2">
                            <p className="w-20">Title</p>{" "}
                            <span className="mr-8">:</span> <p>{res.title}</p>
                          </div>
                          <div className="flex font-normal text-xs mb-2">
                            <p className="w-20">Report Type</p>{" "}
                            <span className="mr-8">:</span>{" "}
                            <p>{res.reportType}</p>
                          </div>
                          <div
                            className="font-normal text-xs text-center py-2"
                            style={{ color: "#66B889" }}
                          >
                            <button onClick={() => handleReportList(res)}>
                              Edit/ View Report
                            </button>
                            <i className="pi pi-angle-right"></i>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        header={isChanged ? "New Entry" : "View Report"}
        visible={openNewEntryPopup}
        modal={true}
        style={{ width: "800px", height: "auto" }}
        footer={renderNewEntryFooter("displayModal")}
        onHide={() => {
          setIsChanged(false);
          setopenNewEntryPopup(false);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-4 space-y-2">
          <div className="md:ml-4 mt-1">
            <label for="code" className="text-xs">
              Date
            </label>
            <DatePicker
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              value={pickedDate}
              maxDate={new Date()}
              onChange={(date) => {
                setIsChanged(true);
                setPickedDate(moment(date).format("DD/MM/YYYY"));
              }}
              className="px-0 my-1 appearance-none text-xs  border-b  w-8/12 py-0 bg-white placeholder-gray-secondary border-gray-highlight focus:outline-none 'border-gray-highlight'"
              placeholderText="Pick Date"

            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs">Title </label>
            <input
              type="text"
              onChange={(e) => {
                setIsChanged(true);
                setTitle(e.target.value);
              }}
              value={title}
              className={`appearance-none  border-b text-xs w-8/12 py-1 bg-white placeholder-gray-secondary border-gray-highlight focus:outline-none 'border-gray-highlight' }`}
              placeholder="Enter Title"
              required
            />
          </div>
          <div>
            <div className="flex flex-col">
              <label for="reportType" className=" inline-block text-xs">
                {" "}
                Document Type
              </label>
              <select
                name="reportType"
                class="inline-block form-control style-2 border-2 outline-none rounded my-1 py-1 text-xs"
                value={documentType}
                onChange={(e) => {
                  setIsChanged(true);
                  setDocumentType(e.target.value);
                }}
              >
                <option disabled selected>
                  --Select--
                </option>
                <option value="Prescription">Prescription</option>
                <option value="Lab Report">Lab Report</option>
                <option value="Scan Report">Scan Report</option>
                <option value="MRI Scan">MRI Scan</option>
                <option value="Ultrasound Report">Ultrasound Report</option>
                <option value="Clinical Records">Clinical Records</option>
                <option value="Health Records">Health Records</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
          <div>
            {docName ? (
              <div class="flex form-group mrgn-btm justify-center lg:mt-3">
                <button
                  onClick={() => setOpenViewDocument(true)}
                  className="bg-brand-secondary  text-xs text-white font-normal rounded-md py-2 px-3 mr-2"
                >
                  View Document
                </button>
              </div>
            ) : (
              <div class="form-group mrgn-btm flex flex-col">
                <label for="name" className="text-xs">
                  Upload Document
                </label>

                <input
                  type="file"
                  id="file"
                  className="my-1 text-xs"
                  onChange={handleFileInput}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-xs">Notes</label>
            <textarea
              className="border-2 rounded outline-none my-1 text-xs "
              maxLength="200"
              value={notes}
              onChange={(e) => {
                setIsChanged(true);
                setNotes(e.target.value);
              }}
              type="text"
              rows={5}
            />
          </div>
        </div>

        {isLoading && (
          <div className="flex w-full  flex-wrap items-center justify-center m-5 	">
            <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-14 w-14 " />
          </div>
        )}
      </Dialog>
      <Dialog
        header="Report"
        visible={openViewDocument}
        modal={true}
        style={{ width: "800px", height: "auto" }}
        onHide={() => setOpenViewDocument(false)}
      >
        <div>
          {documentTypeNew == "png" || documentTypeNew == "jpg" ? (
            <>
              <img
                src={`${process.env.REACT_APP_IMG_BASEURL}${docName}`}
                alt=""
              />
            </>
          ) : (
            <>
              {documentTypeNew == "pdf" ? (
                <>
                  <iframe
                    width="100%"
                    height="500px"
                    src={`${process.env.REACT_APP_IMG_BASEURL}${docName}`}
                  ></iframe>
                </>
              ) : (
                <img
                  src={`${process.env.REACT_APP_IMG_BASEURL}${docName}`}
                  alt=""
                />
              )}
            </>
          )}
          {/* <img src={`${process.env.REACT_APP_IMG_BASEURL}${docName}`} /> */}
          {/* {documentType=="png" || documentType=="jpg" ? */}
          {/* <img src={`${process.env.REACT_APP_IMG_BASEURL}${docName}`} alt="" /> */}
          {/* :
            <></>
} */}
        </div>
      </Dialog>

      <Dialog
        header="Filter My Entry"
        visible={openFilter}
        modal={true}
        // style={{ width: "800px", height: 'auto' }}
        className="w-11/12 md:w-8/12 lg:w-5/12"
        onHide={() => setOpenFilter(false)}
      >
        <>
          <div className="grid grid-cols-2 mb-7 mt-4">
            <div>
              <label className="font-medium text-xs">From Date</label>
              <DatePicker
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={fromDate}
                maxDate={new Date()}
                className="w-11/12 text-xs focus:outline-none"
                onChange={(date) => {
                  setFromDate(moment(date).format("DD/MM/YYYY"));
                }}
              />
            </div>
            <div>
              <label className="font-medium text-xs">To Date</label>
              <DatePicker
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={toDate}
                maxDate={new Date()}
                className="w-11/12 text-xs  focus:outline-none"
                onChange={(date) => {
                  setToDate(moment(date).format("DD/MM/YYYY"));
                }}
              />
            </div>
          </div>
          <div>
            <button
              onClick={() => setOpenFilter(false)}
              className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={onFilter}
              className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
            >
              ok
            </button>
          </div>
        </>
      </Dialog>
    </>
  );
}
export default Myreports;
