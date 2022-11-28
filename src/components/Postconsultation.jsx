import React, { useEffect, useState, useRef } from "react";
import { useHistory, useLocation } from "react-router";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getPostConsultation } from "../Redux/Actions/doctorAction";
import moment from "moment";
import { IMG_URL } from "../config/constant";
// import newLogo from "../../Assets/Images/newLogo.png";
import { jsPDF } from "jspdf";
import DoctorService from "../Redux/services/doctorService";
import { Toast } from "primereact/toast";
import rximg from "../Assets/Images/rx.png"


function PostConsultation(props) {
  const { postConsultation } = useSelector(
    (state) => state.doctorAppointmentList
  );
  const { patientLabTestsList, patientDrugPrescriptionList } =
    postConsultation ?? {};
  const history = useHistory();
  const location = useLocation();
  const search = useLocation().search;
	const search_query =  new URLSearchParams(search).get('q');
	const id =  new URLSearchParams(search).get('id');
  const dispatch = useDispatch();
  const [locationObj, setLocationObj] = useState(
    JSON.parse(localStorage.getItem("locationObj"))
  );
  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };
  const toast = useRef(null);
  const [labTestList, setLabTestList] = useState([]);
  const [stamp, setStamp] = useState([]);
  const [signature, setSignature] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    dispatch(getPostConsultation(id || ""))
      .then((result) => {
        console.log(result);
        console.log(result[0].patientLabTestsList); //labParentName
        if (
          result[0].patientLabTestsList &&
          result[0].patientLabTestsList.length
        ) {
          const labData = result[0].patientLabTestsList;
          const unique = [
            ...new Set(labData.map((item) => item.labParentName)),
          ];
          console.log(unique);
          const labArray = [];
          for (let s = 0; s < unique.length; s++) {
            const labFilter = labData.filter(
              (x) => x.labParentName == unique[s]
            );
            const payload = {
              parent: unique[s],
              data: labFilter,
            };
            labArray.push(payload);
          }

          console.log(labArray);
          setLabTestList(labArray);
        }

        if (result.length == 0) {
          toast.current.show({
            severity: "info",
            summary: "Info Message",
            detail: "No Prescription Available",
            life: 3000,
          });
          setTimeout(() => {
            history.push(APP_ROUTES.DASHBOARD);
          }, 2000);
        } else {
          setLoading(true);
          //download();
        }
      })
      .catch((error) => { });
    return () => {
    };
  }, []);

  useEffect(() =>{
    if(postConsultation?.patientName && search_query == "download"){
      setTimeout(() =>{
        download()
      }, 2000)
    }
  },[id, postConsultation?.patientName])


  useEffect(() => {
    if (postConsultation?.patientName) {
      console.log(postConsultation);
      DoctorService.getBase64Img(postConsultation?.userSignature).then(
        (res) => {
          console.log(res);

          if (res.data) {
            setSignature("data:image/jpg;base64," + res.data.fileData);
            console.log(signature);
          }
        },
        (err) => {
          console.log(err);
        }
      );

      DoctorService.getBase64Img(postConsultation?.hospitalStamp).then(
        (res) => {
          console.log(res);
          if (res.data) {
            setStamp("data:image/jpg;base64," + res.data.fileData);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }, [postConsultation?.patientName]);

  const download = () => {
    if (
      postConsultation.patientDocumentList &&
      postConsultation.patientDocumentList[0].docName.split(".")[1] !=
      "string" &&
      postConsultation.patientDocumentList[0].docName
    ) {
      DoctorService.imagetoData(
        postConsultation.patientDocumentList[0].docName
      ).then((res) => {
        var base64;
        if (postConsultation.patientDocumentList[0].documentType == "pdf") {
          base64 = "data:application/pdf;base64,";
        } else {
          base64 = "data:image/png;base64,";
        }
        //alert(JSON.stringify(res.data.fileData))
        var FileSaver = require("file-saver");
        FileSaver.saveAs(
          base64 + res.data.fileData,
          postConsultation.patientDocumentList[0].docName
        );
        // history.goBack();
      });
    } else {
      const input = document.getElementById("abc");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "A4",
        userUnit: "px",
      });
      pdf.html(input, { html2canvas: { scale: 0.33, allowTaint: false, }, margin: [1, 1, 1, 1], autoPaging: true }).then(() => {
        const fileName =
          "e-Prescription-" + postConsultation?.patientName + ".pdf";
        console.log(fileName);
        pdf.save(fileName);
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      {/* breadcrumbs */}
      {postConsultation &&
        postConsultation?.patientDocumentList &&
        postConsultation?.patientDocumentList[0]?.docName.split(".")[1] !=
        "string" ? (
        <div>
          {/* <a href={IMG_URL + postConsultation.patientDocumentList[0].docName} download>Click to download</a>
                    <Link to={IMG_URL + postConsultation.patientDocumentList[0].docName} target="_blank" download>Download</Link> */}
          {postConsultation.patientDocumentList[0].documentType == "pdf" ? (
            <div style={{ height: "100vh" }}>
              <object
                data={IMG_URL + postConsultation.patientDocumentList[0].docName}
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <p>
                  Alternative text - include a link{" "}
                  <a
                    href={
                      IMG_URL + postConsultation.patientDocumentList[0].docName
                    }
                  >
                    to the PDF!
                  </a>
                </p>
              </object>{" "}
            </div>
          ) : (
            <img
              src={IMG_URL + postConsultation.patientDocumentList[0].docName}
              width="100%"
              height="100%"
              className='ml-auto mr-auto w-auto'
            />
          )}
        </div>
      ) : (
        <>
          <ul class="lg:flex hidden text-brand-secondary text-sm lg:text-base px-10 pt-5 ">
            <li class="inline-flex items-center">
              <a href="/">Home</a>
              <svg
                class="h-5 w-auto text-brand-secondary"
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
            <li class="inline-flex items-center">
              <a href="/profile/mydetails">Profile</a>
              <svg
                class="h-5 w-auto text-brand-secondary"
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
            <li class="inline-flex items-center">
              <a href="/profile/appointments">My Appointments</a>
              <svg
                class="h-5 w-auto text-brand-secondary"
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
            <li class="inline-flex items-center">
              <a >Prescription </a>
            </li>
          </ul>

          <div id="abc" className="w-full overflow-x-auto ">
          <div

            className="p-5 bg-white-100 my-10 justify-center mb-2  border dark:border-slate-700"
            style={{width:"1330px"}}
          >
            {/* <span>{JSON.stringify(postConsultation)}</span> */}
            <div className="px-2">
              <div className="flex justify-between mb-4  ml-1">
                {/* <div className="hidden">
                  <img
                    onClick={download}
                    alt="logo"
                    src={newLogo}
                    width={230}
                  />
                </div> */}
                {/* <div>
                  <p className="font-bold">
                    <h1 className="text-2xl font-bold ">
                      {locationObj.hospitalName}
                    </h1>
                    <h6>{locationObj.locationAddress1}</h6>
                    <h6>{locationObj.locationAddress2}</h6>
                    <h6>
                      {locationObj.locationCity +
                        " " +
                        locationObj.locationPinCode}
                    </h6>
                    <h6>Ph NO : {locationObj.locationContactNumber}</h6>
                    <h6>Email : {locationObj.locationEmail}</h6>
                  </p>
                </div> */}
              </div>

              <div className="lg:flex flex flex-col">
                <h6 className="font-bold doc-font ">
                  {postConsultation?.userSalutation}{" "}
                  {postConsultation?.userName}
                </h6>
                <h6 className="font-bold doc-font">
                  {postConsultation?.userQualification}
                </h6>
                <h6 className="font-bold ">
                  {postConsultation?.userSpecialityDept}
                </h6>
                <h6 className="font-bold ">
                  Regn No:{postConsultation?.userMCIVerification}
                </h6>
                {/* <hr className="my-2" /> */}
                <hr className="hr-line mt-6" />
              </div>

              <div className="grid grid-cols-6 mb-5 mt-6">
                <div className="border dark:border-slate-700 px-3 py-1 font-bold">
                  Name:
                </div>
                <div className="border dark:border-slate-700 px-3 py-1">
                  {postConsultation?.patientsalutation +
                    postConsultation?.patientName}
                </div>
                <div className="border dark:border-slate-700 px-3 py-1 font-bold">
                  Age/Sex:
                </div>
                <div className="border dark:border-slate-700 px-3 py-1">
                  {postConsultation?.patientAge +
                    " / " +
                    (postConsultation?.patientgender === "M"
                      ? "Male"
                      : "Female")}
                </div>
                <div className="border dark:border-slate-700 px-3 py-1 font-bold">
                  Hospital:
                </div>
                <div className="border dark:border-slate-700 px-3 py-1">
                  {postConsultation?.patientHospitalName}
                </div>
                <div className="border dark:border-slate-700 px-3 py-1 font-bold">
                  Phone Number:
                </div>
                <div className="border dark:border-slate-700 px-3 py-1">
                  {postConsultation?.patientMobileNo}
                </div>
                <div className="border dark:border-slate-700 px-3 py-1 font-bold">
                  Visit Type:
                </div>
                <div className="border dark:border-slate-700 px-3 py-1">
                  {postConsultation?.consultationType === "Q"
                    ? "Quick Consultation"
                    : postConsultation?.consultationType === "V"
                      ? "Video Consultation"
                      : postConsultation?.consultationType === "I"
                        ? "In-person Consultation"
                        : postConsultation?.consultationType === "A"
                          ? "Audio Consultation"
                          : "Quick Consultation"}
                </div>
                <div className="border dark:border-slate-700 px-3 py-1 font-bold">
                  Visit Date:
                </div>
                <div className="border dark:border-slate-700 px-3 py-1" v>
                  {moment(postConsultation?.visitDate).format("DD/MM/yyyy")}
                </div>
              </div>
              <img src={rximg} style={{ width: "25px" }} />

              {postConsultation?.consultReason &&
                <div className="grid grid-cols-1 my-2">
                  <p>
                    <b className="underline underline-offset-1">
                      Chief Complaint:
                    </b>{" "}
                    {postConsultation?.consultReason}
                  </p>
                </div>
              }

              {(postConsultation?.primarySymptoms || postConsultation?.primaryDiagnosis) &&
                <div className="grid grid-cols-1 my-2">
                  <p className="">
                    <b className="underline underline-offset-1">
                      Primary Diagnosis :
                    </b>{" "}
                  </p>
                  <p className="text-base font-montserrat  font-thin ">
                    ICD-10 : {postConsultation?.primarySymptoms}{" "}
                  </p>
                  <p className="text-base font-montserrat  font-thin ">
                    Description : {postConsultation?.primaryDiagnosis}{" "}
                  </p>
                </div>
              }
              {(postConsultation?.secondarySymptoms || postConsultation?.secondaryDiagnosis) &&
                <div className="grid grid-cols-1 my-2">
                  <p className="">
                    <b className="underline underline-offset-1">
                      Secondary Diagnosis :
                    </b>{" "}
                  </p>
                  <p className="text-base font-montserrat  font-thin ">
                    ICD-10 : {postConsultation?.secondarySymptoms}{" "}
                  </p>
                  <p className="text-base font-montserrat  font-thin ">
                    Description : {postConsultation?.secondaryDiagnosis}{" "}
                  </p>
                </div>
              }
              {postConsultation?.symptoms &&
                <div className="mb-5">
                  <p className="underline underline-offset-1">
                    <b className="underline underline-offset-1">Symptoms :</b>{" "}
                  </p>
                  <p className="text-base font-montserrat  font-thin ">
                    {postConsultation?.symptoms}
                  </p>
                </div>
              }
              {postConsultation?.patientVitalList && postConsultation?.patientVitalList.length && (<>
                <div className="grid grid-cols-1 my-2">
                  <p>
                    <b className="underline underline-offset-1">
                      Vitals :
                    </b>{" "}
                    {postConsultation?.patientVitalList[0].height && (<> Height   - {postConsultation?.patientVitalList[0].height} CM  </>)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {postConsultation?.patientVitalList[0].weight && (<> Weight   -  {postConsultation?.patientVitalList[0].weight}  KG  </>)}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {postConsultation?.patientVitalList[0].bmi && (<> BMI   -  {postConsultation?.patientVitalList[0].bmi}  KG/M2  </>)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {postConsultation?.patientVitalList[0].systolic && (<> Blood Pressure (SYS)  &nbsp;&nbsp; -  {postConsultation?.patientVitalList[0].systolic}  mmHg  </>)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {postConsultation?.patientVitalList[0].diastolic && (<> Blood Pressure (DIA)   -  {postConsultation?.patientVitalList[0].diastolic}  mmHg  </>)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {postConsultation?.patientVitalList[0].spo2 && (<> Pulse Ox.   -  {postConsultation?.patientVitalList[0].spo2}  %  </>)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {postConsultation?.patientVitalList[0].heartRate && (<> Heart Rate   -  {postConsultation?.patientVitalList[0].heartRate}  Beats/min  </>)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {postConsultation?.patientVitalList[0].respirationRate && (<> Respiration Rate   -  {postConsultation?.patientVitalList[0].respirationRate}  Breaths/min  </>)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {postConsultation?.patientVitalList[0].temperature && (<> Temperature   -  {postConsultation?.patientVitalList[0].temperature}  °F  </>)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                </div>
              </>)}


              <div className="mb-2">
                {patientDrugPrescriptionList &&
                  patientDrugPrescriptionList.length > 0 &&
                  <>
                    <p className="  mb-2 underline underline-offset-1">
                      <b className="underline underline-offset-1">
                        Medicines Prescribed :
                      </b>{" "}
                    </p>


                    <table className="table-auto w-full mb-5">
                      <thead>
                        <tr>
                          <th className="border dark:border-slate-700 px-3 py-2 mb-2 text-left"></th>
                          <th className="border dark:border-slate-700 px-3 py-2 mb-2 text-left">
                            Medication
                          </th>
                          <th className="border dark:border-slate-700 px-3 py-2 mb-2 text-left">
                            Dosage
                          </th>
                          <th className="border dark:border-slate-700 px-3 py-2 mb-2 text-left">
                            Qty
                          </th>
                          <th className="border dark:border-slate-700 px-3 py-2 mb-2 text-left">
                            Instruction
                          </th>
                          {/* <th className="border-2 border-inherit">Periodically</th> */}
                          <th className="border dark:border-slate-700 px-3 py-2 mb-2 text-left">
                            Duration
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {patientDrugPrescriptionList &&
                          patientDrugPrescriptionList.length > 0 &&
                          patientDrugPrescriptionList.map((res, i) => (
                            <>
                              <tr>
                                <td className="border dark:border-slate-700 px-3 py-1">
                                  {i + 1}
                                </td>
                                <td className="border dark:border-slate-700 px-3 py-1">
                                  {res?.drugName}
                                  <br></br>
                                  <span className="text-xs">{res?.composition}</span>
                                </td>
                                <td className="border dark:border-slate-700 px-3 py-1">
                                  {res?.dosage}
                                </td>
                                <td className="border dark:border-slate-700 px-3 py-1">
                                  {res?.quantity}
                                </td>
                                <td className="border dark:border-slate-700 px-3 py-1">
                                  {res.instruction == "0"
                                    ? "After Meal"
                                    : "Before Meal"}
                                </td>
                                <td className="border dark:border-slate-700 px-3 py-1">
                                  {" "}
                                  {res?.duration} days
                                </td>
                              </tr>
                            </>
                          ))}
                      </tbody>
                    </table>
                  </>
                }
                <div className="mt-2  mb-5">
                  {labTestList &&
                    labTestList.length > 0 &&
                    <p className="  underline underline-offset-1  mb-2">
                      <b className="underline underline-offset-1">
                        Lab Test Prescribed :
                      </b>{" "}
                    </p>
                  }
                  {labTestList &&
                    labTestList.length > 0 &&
                    labTestList.map((labres, i) => (
                      <div>
                        <div className="grid grid-cols-2  justify-start ">
                          <div className="text-md font-bold font-rubik text-left border dark:border-slate-700 px-3 py-1">
                            {labres.parent}
                          </div>
                          <div className="text-md font-bold font-rubik  text-left border dark:border-slate-700 px-3 py-1">
                            Test Type
                          </div>
                        </div>
                        {labres &&
                          labres.data.length > 0 &&
                          labres.data.map((res, i) => (
                            <div
                              className="grid grid-cols-2 justify-start flex justify-between"
                              key={i}
                            >
                              <div className="text-sm  border dark:border-slate-700 px-3 py-1">
                                {res?.labTestDescription}
                              </div>
                              <div className="text-sm  text-left border dark:border-slate-700 px-3 py-1">
                                Pathology
                              </div>
                            </div>
                          ))}
                      </div>
                    ))}
                </div>
              </div>
              <div className="my-2">
                <div className="w-6/6  my-2">
                  {/* <div>
                    <p className="">Cheif Complaint</p>
                    <p className="text-base font-montserrat  font-thin ">
                      {postConsultation?.consultReason}
                    </p>
                  </div> */}

                  {postConsultation?.recommendation && (
                    <div className="mb-5">
                      <p className="underline underline-offset-1">
                        <b className="underline underline-offset-1">
                          Recommendation :
                        </b>{" "}
                      </p>
                      <p className="text-base font-montserrat  font-thin ">
                        {postConsultation?.recommendation}
                      </p>
                    </div>
                  )}

                  {postConsultation?.followUpVisitDate && (
                    <div>
                      <p className=" my-2">
                        <b className="underline underline-offset-1">
                          Scheduled follow up visit date :
                        </b>{" "}
                        {moment(postConsultation?.followUpVisitDate).format(
                          "DD/MM/YYYY"
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex  justify-between">


                <div className="mt-6">
                  {stamp &&
                    <img
                      // onClick={download}
                      src={stamp}
                      alt="Stamp"
                      width={150}
                    />
                  }
                </div>

                <div className="mt-6">
                  {signature && (
                    <>
                      <img
                        // onClick={download}
                        src={signature}
                        alt="Signature"
                        width={150}
                      />
                      <p className="font-rubik text-gray-primary text-base">
                        Dr.{postConsultation?.userName}
                      </p>
                      <p className="font-rubik text-gray-primary text-base">
                        {postConsultation?.userQualification}{" "}
                        {postConsultation?.userSpecialityDept}
                      </p>
                      <p className="font-rubik text-gray-primary text-base">
                        Regn No. {postConsultation?.userMCIVerification}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 ">
              <div className="px-1 py-1">

                {
                  postConsultation?.consultationType === "I" ?
                    (
                      <span> </span>

                    ) :
                    (
                      <p className="text-gray-500 text-sm ">
                        <b>Disclaimer :</b>
                        <ul className="list-disc ml-8">
                          <li>The information and advice provided here is provisional in nature as it is based on the limited information made available by the patient</li>
                          <li>The patient is advised to visit in person for thorough examination at the earliest</li>
                          <li>The information is confidential in nature and for recipient's use only</li>
                          <li>The Prescription is generated on a Teleconsultation</li>
                          <li>Not valid for medico - legal purpose</li>
                          {" "}
                        </ul>
                      </p>
                    )
                }


              </div>
            </div>
            <div className="grid grid-cols-1 ">
              <div className="px-1 py-1">
                <p className="text-gray-500 text-sm ">

                </p>
              </div>
            </div>
          </div>
          </div>
          <div className="flex justify-end mb-5 px-9 w-11/12">
            <button
              onClick={download}
              className="font-medium text-rubik text-brand-secondary border border-brand-secondary mt-4 rounded-md text-sm px-2 py-2"
            >
              Download E- prescription
            </button>
          </div>


        </>
      )}
    </>
  );
}
export default PostConsultation;
