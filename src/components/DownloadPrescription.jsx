import React, { useEffect, useRef, useReducer, useState } from 'react'
import MedicinePrescribed from './MedicinePrescriber';
import LabTestPrescribed from './LabTestPrescribed';
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearPostConsultation, getPostConsultation } from '../Redux/Actions/doctorAction';
import newLogo from '../Assets/Images/newLogo.png'
import Sign from '../Assets/Images/signature.webp'
import Stamp from '../Assets/Images/stamp.webp'
import { jsPDF } from "jspdf";
import moment from 'moment';
import DoctorService from '../Redux/services/doctorService';
import { ToastContainer, toast } from "react-toastify";
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import { Toast } from "primereact/toast";
import {getLocalTime} from '../Assets/utils/LocalTimeFormat'


function PostConsultation() {

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { state } = location;
    const [click, setClick] = useState(false);
    const [stamp, setStamp] = useState([]);
    const [signature, setSignature] = useState([]);
    const [labTestList, setLabTestList] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);

    const { postConsultation } = useSelector(state => state.doctorAppointmentList);
    const { patientLabTestsList, patientDrugPrescriptionList } = postConsultation;

    useEffect(() => {
        if (postConsultation?.patientName) {
            DoctorService.getBase64Img(postConsultation?.userSignature).then(
                (res) => {
                    setTimeout(() => {
                        setClick(true);
                    }, 1000);
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
        if(postConsultation?.patientLabTestsList && postConsultation?.patientLabTestsList) {
              const labData = postConsultation?.patientLabTestsList;
              const unique = [
                     ...new Set(labData.map((item) => item.labParentName)),
               ];
               const labArray = [];
          for (let s = 0; s < unique.length; s++) {
            const labFilter = labData.filter((x) => x.labParentName == unique[s]);
            const payload = {
              parent: unique[s],
              data: labFilter,
            };
            labArray.push(payload);
          }
          setLabTestList(labArray);
        }
        setLoading(true);
        return () => {
          dispatch(clearPostConsultation());
        };
    }, [postConsultation?.patientName]);

    const download = () => {
        const input = document.getElementById("abc");
        const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "A4", userUnit: "px", });
             pdf.html(input, { html2canvas: { scale: 0.3, allowTaint: false, }, margin: [1, 0, 1, 6], autoPaging: true }).then(() => {
             const fileName =
                 "e-Prescription-" + postConsultation?.patientName + ".pdf";
             console.log(fileName);
             pdf.save(fileName);
             history.goBack();
        });
    }

    useEffect(() => {
        setTimeout(() => {
            download();
        }, 1000)
    }, []);

    return (
      <>
      <Toast ref={toast} />
      {loading &&
        postConsultation &&
        postConsultation?.patientDocumentList &&
        postConsultation?.patientDocumentList[0].docName.split(".")[1] !=
        "string" ? (
        <div>
          {postConsultation.patientDocumentList[0].documentType == "pdf" ? (
            <div style={{ height: "100vh" }}>
              <object
                data={process.env.REACT_APP_IMG_BASEURL + postConsultation.patientDocumentList[0].docName}
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <p>
                  Alternative text - include a link{" "}
                  <a
                    href={
                      process.env.REACT_APP_IMG_BASEURL + postConsultation.patientDocumentList[0].docName
                    }
                  >
                    to the PDF!
                  </a>
                </p>
              </object>{" "}
            </div>
          ) : (
            <img
              src={process.env.REACT_APP_IMG_BASEURL + postConsultation.patientDocumentList[0].docName}
              alt="img"
              width="100%"
              height="100%"
              className="ml-auto mr-auto w-auto"
            />
          )}
        </div>
      ) : (
        loading && (
          <div
            id="abc"
            className="p-5 bg-white-100 my-10 w-90 justify-center mb-24 border dark:border-slate-700"
          >
            {/* <span>{JSON.stringify(postConsultation)}</span> */}
            <div className="px-2">
              <div className="flex justify-between mb-4  ml-1">
                <div>
                  <img
                    onClick={download}
                    alt="logo"
                    src={newLogo}
                    width={230}
                  />
                </div>
                <div>
                  <p className="font-medium">
                    <h1 className="text-2xl font-medium ">
                      {postConsultation?.patientHospitalName}
                    </h1>
                    <h6>{postConsultation.patientLocationName}</h6>
                    <h6>{postConsultation.locationAddress2}</h6>
                    
                    <h6>Ph NO : {postConsultation?.userMobileNo}</h6>
                    <h6>Email : {postConsultation?.userEmail}</h6>
                  </p>
                </div>
              </div>

              <div className="lg:flex flex flex-col">
                <h6 className="font-medium ">
                  {postConsultation?.userSalutation}{" "}
                  {postConsultation?.userName}
                </h6>
                <h6 className="font-medium ">
                  {postConsultation?.userQualification}
                </h6>
                <h6 className="font-medium ">
                  {postConsultation?.userSpecialityDept}
                </h6>
                <h6 className="font-medium ">
                  Regn No:{postConsultation?.userMCIVerification}
                </h6>
                <hr className="my-2" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-5">
                <div className="border dark:border-slate-700 px-3 py-1 font-medium">
                  Name:
                </div>
                <div className="border dark:border-slate-700 px-3 py-1">
                  {postConsultation?.patientsalutation +
                    postConsultation?.patientName}
                </div>
                <div className="border dark:border-slate-700 px-3 py-1 font-medium">
                  Age/Sex:
                </div>
                <div className="border dark:border-slate-700 px-3 py-1">
                  {postConsultation?.patientAge +
                    " / " +
                    (postConsultation?.patientgender === "M"
                      ? "Male"
                      : "Female")}
                </div>
                <div className="border dark:border-slate-700 px-3 py-1 font-medium">
                  Hospital:
                </div>
                <div className="border dark:border-slate-700 px-3 py-1">
                  {postConsultation?.patientHospitalName}
                </div>
                <div className="border dark:border-slate-700 px-3 py-1 font-medium">
                  Phone Number:
                </div>
                <div className="border dark:border-slate-700 px-3 py-1">
                  {postConsultation?.patientMobileNo}
                </div>
                <div className="border dark:border-slate-700 px-3 py-1 font-medium">
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
                <div className="border dark:border-slate-700 px-3 py-1 font-medium">
                  Visit Date:
                </div>
                <div className="border dark:border-slate-700 px-3 py-1" v>
                  {getLocalTime(postConsultation?.visitDate)?.split(" ")[0]}
                </div>
              </div>

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
                  <p className="text-base   font-thin ">
                    ICD-10 : {postConsultation?.primarySymptoms}{" "}
                  </p>
                  <p className="text-base   font-thin ">
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
                  <p className="text-base   font-thin ">
                    ICD-10 : {postConsultation?.secondarySymptoms}{" "}
                  </p>
                  <p className="text-base   font-thin ">
                    Description : {postConsultation?.secondaryDiagnosis}{" "}
                  </p>
                </div>
              }
              {postConsultation?.symptoms &&
                <div className="mb-5">
                  <p className="underline underline-offset-1">
                    <b className="underline underline-offset-1">Symptoms :</b>{" "}
                  </p>
                  <p className="text-base   font-thin ">
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
                                  {res.instruction == "0" ? "After Meal" : "Before Meal"}
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
                    labTestList?.length > 0 &&
                    <p className="  underline underline-offset-1  mb-2">
                      <b className="underline underline-offset-1">
                        Lab Test Prescribed :
                      </b>{" "}
                    </p>
                  }
                  {labTestList &&
                    labTestList?.length > 0 &&
                    labTestList?.map((labres, i) => (
                      <div>
                        <div className="grid grid-cols-2  justify-start ">
                          <div className="text-md font-medium  text-left border dark:border-slate-700 px-3 py-1">
                            {labres.parent}
                          </div>
                          <div className="text-md font-medium   text-left border dark:border-slate-700 px-3 py-1">
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
                    <p className="text-base   font-thin ">
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
                      <p className="text-base   font-thin ">
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
                        {getLocalTime(postConsultation?.followUpVisitDate)?.split(" ")[0]}
                      </p>
                    </div>
                  )}
                </div>
              </div>


              <div className="flex  justify-between">


                <div className="mt-6">
                  {postConsultation?.hospitalStamp &&
                    <img
                      onClick={download}
                      src={process.env.REACT_APP_IMG_BASEURL+postConsultation?.hospitalStamp}
                      alt="Stamp"
                      width={150}
                    />
                  }
                </div>

                <div className="mt-6">
                  {signature && (
                    <>
                      <img
                        onClick={download}
                        src={signature}
                        alt="Signature"
                        width={150}
                      />
                      <p className=" text-gray-primary text-base">
                        Dr.{postConsultation?.userName}
                      </p>
                      <p className=" text-gray-primary text-base">
                        {postConsultation?.userQualification}{" "}
                        {postConsultation?.userSpecialityDept}
                      </p>
                      <p className=" text-gray-primary text-base">
                        Regn No. {postConsultation?.userMCIVerification}
                      </p>
                    </>
                  )}
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 ">
              <div className="px-1 py-1">
                <p className="text-gray-500 text-sm ">
                  <b>Disclaimer :</b> This is an ONLINE consultation response.
                  The patient has not been physically examined. The
                  prescriptionor advice is based on the patient's description of
                  the problem which is given above and also explained over video
                  consultation{" "}
                </p>
              </div>
            </div>
          </div>
        )
      )}
    </>
    );
}
export default PostConsultation;
