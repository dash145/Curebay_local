import { combineReducers } from "redux";
import authReducer from "./authReducer";
import packageReducer from "./packageReducer";
import doctorslotfromdatetodateReducer from "./docslotfromdatetodateReducer";
import doctorlistReducer from "./doctorReducer";
import doctorslotsReducer from "./doctorslotsReducer";
import doctorspecialitylistReducer from "./doctorspecialityReducer";
import particularDoctorReducer from "./particularDoctorReducer";
import patientappointmentReducer from "./patientappointmentReducer";
import RegistrationReducer from "./registrationReducer";
import hospitallistReducer from "./hospitallistReducer";
import particularspecialityReducer from "./particularspecialiatyReducer";
import parrticularhospitalReducer from "./particularhospitalReducer";
import healthcarepackageReducer from "./healthcarepackageReducer";
import patientinfoReducer from "./patientinfoReducer";
import feedbackReducer from "./feedbackReducer";
import appointmentlistReducer from "./appointmentlistReducer";
import partnerlablistReducer from "./labPartnerReducer";
import mypriscriptionReducer from "./mypriscriptionReducer";
import FamilymembersReducer from "./familymembersReducer";
import MyordersReducer from "./myordersReducer";
import notificationReducer from "./notificationReducer";
import allergylistReducer from "./allergylistReducer";
import medicationhistoryReducer from "./medicationhistoryReducer";
import vitalsReducer from "./vitalsReducer";
import medicalhistoryReducer from "./medicalhistoryReducer";
import changepasswordReducer from "./changePasswordReducer";
import labtestorderlistReducer from "./labtestorderlistReducer";
import labtestorderreportlistReducer from "./labtestorderreportlistReducer";
import patientAddresslistReducer from "./patientaddresslistReducer";
import addpatientaddressReducer from "./addpatientaddressReducer";
import RecentlabappointmentsReducer from "./recentlabappointmentlistReducer";
import paymenthistoryReducer from "./paymenthistoryReducer";
import editingpatientaddressReducer from "./editingpatientaddress";
import pathoLogyReducer from "./pathlogyTestReducer";
import addallergypatientReducer from "./addallergypatientReducer";
import adddmedicationpatientReducer from "./adddmedicationpatientReducer";
import addmedicalhistoryReducer from "./addmedicalhistoryReducer";
import labTestListReducer from "./labtestlistReducer";
import DoctorAppointmentReducer from "./DoctorAppointmentReducer";
import doctorAppointmentListReducer from "./doctorsAppointmentListReducer";
import CartReducer from "./CartReducer";
import pharmalistReducer from "./pharmacyListReducer";
import particularPharmacyReducer from "./particularPharmacyReducer";
import medicinesReducer from "./medicinesReducer";
import priscriptionUploadedReducer from "./priscriptionUploadReducer";
import quotPharmaReducer from "./quotPrescribedPharmaCentersReducer";
import quotLabTestsReducer from "./quotLabTests";
import quotDrugreducer from "./quotDrugPrescriptionReducer";
import quotDiagnosisReducer from "./quotPrescribedDiagonisCenters";
import addvitalsReducer from "./addvitalsReducer";

/**import My Profie Reducers */
import chronicConditionsReducer from './chronicConditionsReducer';
import familyHistoryReducer from './familyHistoryReducer'
import medicationlistReducer from './medicationlistReducer';
import medicalhistorylistReducer from './medicalhistorylistReducer';
import socialHistoryReducer from './socialHistoryReducer'
import surgicalHistoryReducer from './surgicalHistoryReducer';
import chelogginadminreducer from './chelogginadminreducer';
import loginchepatiendetailsreducer from './loginchepatiendetailsreducer';
import particularpatientdetailsbynumberReducer from './particularpatientdetailsbynumberReducer';
import particularpatientdetailsReducer from './particularpatientdetailsReducer';
import allergylistReducerM from './allergylistReducerM';
import PatientvitalsdetailsReducer from './Patientvitalsdetailsreducer';
import patientwalletinfoReducer from "./patientwalletinfoReducer";

/**Notifiction reducers  */
import cheadmindetailsReducer from './cheadmindetailsReducer';
import cheadminnotificationReducer from './cheadminnotificationReducer';
import PatientprofilemyrequestReducer from './PatientprofilemyrequestReducer';

import patientmyordersReducer from './patientmyordersReducer';
import Patientmedicinedeliverycard from './patientmedicinedeliverycardreducer';
import allregisterpatientdetailsReducer from './allregisteredpatientreducer';
import procedurelistReducer from './procedurelistRedurer';
import HospitalenquiryformReducer from './HospitalenquiryformReducer';
import DoctorlistReducer from './DoctorlistReducer';
import reportReducer from "./reportReducer";
import paymentListReducer from './paymentListReducer';
import BillingDetails from "./billingDetails";
import PatientEnquiredReducer from "./patientEnquiredReducer";
import contactusReducer from "./contactusreducer";
import resetPasswordReducer from "./resetPasswordReducer";
import couponListCartReducer from "./couponListCartReducer";
import couponListDoctorReducer from "./couponListDoctorReducer";

export default combineReducers({
  authReducer: authReducer,
  reportReducer: reportReducer,
  packageReducer: packageReducer,
  RegistrationReducer: RegistrationReducer,
  doctorlist: doctorlistReducer,
  particulardoctor: particularDoctorReducer,
  doctspecialitylist: doctorspecialitylistReducer,
  doctorsslot: doctorslotsReducer,
  doctosslotfromdatetodate: doctorslotfromdatetodateReducer,
  couponCart: couponListCartReducer,
  couponDoctor: couponListDoctorReducer,
  patientappointment: patientappointmentReducer,
  hospitallist: hospitallistReducer,
  particulardoctorspeciality: particularspecialityReducer,
  particularhospital: parrticularhospitalReducer,
  healthcarepackagelist: healthcarepackageReducer,
  patientinfo: patientinfoReducer,
  feedbackinfo: feedbackReducer,
  contactinfo: contactusReducer,
  patientappointmentlist: appointmentlistReducer,
  listpartnerslab: partnerlablistReducer,
  mypriscription: mypriscriptionReducer,
  familymembers: FamilymembersReducer,
  myorders: MyordersReducer,
  mynotificatons: notificationReducer,
  allergylist: allergylistReducer,
  medicationhistory: medicationhistoryReducer,
  vitalslist: vitalsReducer,
  medicalhistory: medicalhistoryReducer,
  changepassword: changepasswordReducer,
  resetpassword: resetPasswordReducer,
  labtestorderlist: labtestorderlistReducer,
  labtestorderreportlist: labtestorderreportlistReducer,
  patientaddresslist: patientAddresslistReducer,

  //wallet details
  patientwallet:patientwalletinfoReducer,

  addaddress: addpatientaddressReducer,
  recentlabappointments: RecentlabappointmentsReducer,
  patientpaymenthistorylist: paymenthistoryReducer,
  editpatientaddress: editingpatientaddressReducer,
  pathoLogyReducer: pathoLogyReducer,
  addallergy: addallergypatientReducer,
  addmedication: adddmedicationpatientReducer,
  addmedicalhistory: addmedicalhistoryReducer,
  labTestList: labTestListReducer,
  doctorAppointment: DoctorAppointmentReducer,
  doctorAppointmentList: doctorAppointmentListReducer,
  cartReducer: CartReducer,
  pharmalist: pharmalistReducer,
  particularPharmacy: particularPharmacyReducer,
  medicine: medicinesReducer,
  uploadedPrescription: priscriptionUploadedReducer,
  /** My Profile Reducer */
  allchronicConditionsList: chronicConditionsReducer,
  allfamilyHistoryList: familyHistoryReducer,
  allmedicationlist: medicationlistReducer,
  allmedicalhistorylist: medicalhistorylistReducer,
  allsocialHistoryList: socialHistoryReducer,
  allsurgicalhistorylist: surgicalHistoryReducer,
 
  /** My Vitlas **/
  patientvitalsdetail: PatientvitalsdetailsReducer,
  
  /**Quotation Reducers */
  quotPharmas: quotPharmaReducer,
  quotDrugs: quotDrugreducer,
  quotLabTests: quotLabTestsReducer,
  quotDiagnosis: quotDiagnosisReducer,
  logginedchepatientdetails: loginchepatiendetailsreducer,
  addvitalslist: addvitalsReducer,
  loggincheadminuser: chelogginadminreducer,
  particularpatiendetailsbynumber: particularpatientdetailsbynumberReducer,
  particularpatientdetails: particularpatientdetailsReducer,
  allallergylistM: allergylistReducerM,

  /**my Notificatio reducer*/
  cheadminnotifications: cheadminnotificationReducer,
  cheadmindetails: cheadmindetailsReducer,
  myrequestpatient: PatientprofilemyrequestReducer,
  
  patientmyorderslist: patientmyordersReducer,
  patientmedicinedeliverylist: Patientmedicinedeliverycard,
  allregisteredpatientlist: allregisterpatientdetailsReducer,
  procedurelist: procedurelistReducer,
  hospitalenquiryform: HospitalenquiryformReducer,
  hospitaldetails: parrticularhospitalReducer,
  doctorslist: DoctorlistReducer,
  paymentListReducer : paymentListReducer,
  billingDetails : BillingDetails,
  patientEnquiredReducer : PatientEnquiredReducer
});