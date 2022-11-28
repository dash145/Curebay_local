import {
  Switch,
  Route,
  useLocation, Redirect
} from "react-router-dom";
import { useEffect } from "react";
import { APP_ROUTES } from '../constants/AppRoutes';
import Membership from '../../../components/membership';
import DoctorsBio from '../../../components/DoctorBio';
import Dashboard from '../../Dashboard';
import LoginPage from "../../../components/LoginForm";
// import RegisterPage from "../../../components/RegisterForm";
import Doctors from "../../../application/Doctors";
import Payment from "../../../components/payment";
// import DoctorSearch from "../../../components/doctorsearch";
import NotFound from "../../NotFound";
import AppoinmentConfirmation from "../../../components/AppointmentConfirm";
import Hospital from "../../../application/Hospital";
import Medicine from "../../../application/Medicine";
import Diagnosis from "../../../application/DiagnosticsLandingPage";
import doctorsearch from "../../../components/doctorsearch";
import familysearch from "../../../components/familysearch";
import Specialitiessearch from "../../../components/Specialitiessearch";
import CommonHealthesSearch from "../../../components/CommonHealthesSearch";
import Prescription from "../../../application/MedicinePrescription";
import PostConsultation from "../../../components/Postconsultation";
import MedicineCart from "../../../components/MedicineCart";
import MedicinePayment from "../../../components/Medicinepayment";
import MedicineOrder from "../../../components/MedicineOrderPlaced";
import OrderDetails from "../../../components/OrderDetails";
import PackageOrderDetails from "../../../components/PackageOrderDetails";
import HospitalDetails from "../../../components/HospitalDetails";
import LabDetails from '../../../application/DiagnosticsLandingPage/LabDetails';
import RecommondedSpeciality from "../../../components/RecommondedSpeciality";
import DiagnosticsHealthpackages from "../../../components/DiagnosticsHealthpackage";
import CompletebloodCounttest from "../../../components/CompletebloodCounttest";
import LabtestSearch from "../../../components/LabtestSearch";
import DiagnosticsLandingpage from "../../DiagnosticsLandingPage";
import AllLabtest from "../../../components/AllLabtest";
import CartPayment from "../../../components/Cartpayment";
import Cartappointment from "../../../components/Cartappointment";
import AllRadiology from "../../../components/AllRadiology";
import SeeAllCommonLabTest from "../../../components/seeAllCommonLabTest";
import MedicineSearchresult from "../../MedicineSearchResult";
import MedicineCategory from "../../MedicineCategory";
import MedicineProduct from "../../../components/MedicineProduct";
import PharmacyList from "../../PharmacyList";
import PharmacyCategory from "../../PharmacyCategory";
import { USERPROFILE_ROUTES } from "../constants/UserProfileRoutes";
import Userprofilesidebar from "../../../components/userprofilesidebar";
import UserProfileMobilesidebar from "../../../components/userprofileMobilesidebar";
import Mydetails from "../../../components/userprofilecomponents/mydetails";
import Manageprofile from "../../../components/userprofilecomponents/Manageprofile";
import Myreports from "../../../components/userprofilecomponents/Myreports";
import MyPriscription from "../../../components/userprofilecomponents/Mypriscription";
import MedicalHistory from "../../../components/userprofilecomponents/MedicalHistory";
import Myinsurance from "../../../components/userprofilecomponents/Myinsurance";
import Myorders from "../../../components/userprofilecomponents/Myorders";
import Myappointments from "../../../components/userprofilecomponents/Myappointments";
import Mypayments from "../../../components/userprofilecomponents/Mypayments";
import Mywallet from "../../../components/userprofilecomponents/Mywallet";
import Myaddresssbook from "../../../components/userprofilecomponents/Myaddressbook";
import Changepassword from "../../../components/userprofilecomponents/Changepassword";
import Feedback from "../../../components/userprofilecomponents/Feedback";
import Support from "../../../components/userprofilecomponents/Support";
import CartSummary from "../../../components/CartSummary";
import PrescriptionMedicine from "../../PrescriptionMedicine";
import prescriptionuploaded from "../../../components/PrescriptionUploaded";
import Myvitals from "../../../application/userProfile/MyVitals";
import Diacom from "../../../components/diacom";
import Addmedication from "../../../components/userprofilecomponents/Addmedication";
import Addinsurance from "../../../components/userprofilecomponents/AddInsurance";
import AddAllergy from "../../../components/AddAllergy";
import ReportsVital from "../../../components/ReportsVital";
import AddMedical from "../../../components/AddMedical";
import MedicalCondition from "../../../components/MedicalCondition";
import MedicinePrescription from "../../../components/MedicinePrisciption";
import HealthRestriction from "../../../components/userprofilecomponents/HealthRestrictions";
import Doctorspeciality from "../../../components/Doctorspeciality";
import Addaddress from "../../../components/userprofilecomponents/addaddress";
import AppointmentDetails from "../../../components/userprofilecomponents/AppointmentDetails";
import Seeallallergy from "../../../components/userprofilecomponents/Seeallallergy";
import Seeallhealthrestrictions from "../../../components/userprofilecomponents/Seeallhealthrestrictions";
import Seeallmedicalhistory from "../../../components/userprofilecomponents/SeeallMedicalHistory";
import AddAllergyM from "../../../components/userprofilecomponents/AddAllergy";
import Seeallmedication from "../../../components/userprofilecomponents/SeeallMedication";
import Addsurgicalhistory from "../../../components/userprofilecomponents/Addsurgicalhistory";
import Addmedicalhistory from "../../../components/userprofilecomponents/Addmedicalhistory";
import Demo from "../../../components/userprofilecomponents/Demo";
import { checkIsLoggedIn } from "../../../Redux/Actions/userActions";
import VideoCall from "../../../components/VideoCall";
import HospitalSearch from "../../../components/HospitalSearch";
import ComingSoon from "../../../components/ComingSoon";
import DownloadPrescription from "../../../components/DownloadPrescription";
import EnquiryForm from "../../../components/enquiryForm";
import AllSearch from "../../AllSearch";
import RecentMedicines from "../../../components/allRecentMedicines";
import Notifications from "../../../components/Notifications/notifications";
import CheNotification from "../../../components/CheNotification";
import PatientprofileMyrequests from "../../../components/userprofilecomponents/PatientprofileMyrequests";
import Patientmyaddress from "../../../components/userprofilecomponents/Patientmyaddress";
import LabReport from "../../../components/userprofilecomponents/labReport";
import Patientprofileorders from "../../../components/userprofilecomponents/patientprofileOrders";
import PatientprofileMedicineOrders from "../../../components/userprofilecomponents/PatientprofileMedicineOrders";
import PatientprofilePackageOrders from "../../../components/userprofilecomponents/PatientprofilePackageOrders";

import HospitalBiodetails from "../../../application/Hospital/HospitalBiodetails";
import Medicinedeliveryorderdetails from "../../../components/Medicinedeliveryorderdetails";
import PrivacyPolicy from "../../../components/PrivacyPolicy";
import TermsAndCondition from "../../../components/TermsAndCondition";
import RefundPolicy from "../../../components/RefundPolicy";
import ComparePrescriptions from "../../../application/ComparePrescription";
import Patientforgetpassword from "../../../components/userprofilecomponents/patientforgetpassword";
import MedicineSearch from "../../../components/medicine_search";
import AboutUs from "../../../components/aboutUs";
import OurTeam from "../../../components/ourTeam";
import ContactWithUs from "../../../components/contactWithUs";
import Media from '../../../components/Media';


import ScrollToTop from "../../../components/scrollToTop";
import Seeallsocialhistory from "../../../components/userprofilecomponents/Seeallsocialhistory";
import Seeallfamilyhistory from "../../../components/userprofilecomponents/Seeallfamilyhistory";
import Seeallsurgicalhistory from "../../../components/userprofilecomponents/Seeallsurgicalhistory";
import ReactGA from 'react-ga4';
import CartOrderSucess from "../../../components/cartOrderSucess";
ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_CODE);
const Routes = () => {
  let location = useLocation();
  let background = location.state && location.state.background;
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  return (
    <>
    <ScrollToTop />
      <Switch location={background || location}>
        <Route exact path={APP_ROUTES.DASHBOARD} component = {Dashboard} />
        <Route exact path={APP_ROUTES.LOGIN} component={LoginPage} />
        <Route exact path={APP_ROUTES.DOCTOR_BIO} component={DoctorsBio} ></Route>
        <Route exact path={APP_ROUTES.MEMBERSHIP} component={Membership} ></Route>
        <Route exact path={APP_ROUTES.DIAGNOSIS} component={Diagnosis} ></Route>
        <Route exact path={APP_ROUTES.HOSPITAL} component={Hospital} ></Route>
        <Route exact path={APP_ROUTES.MEDICINE} component={Medicine} ></Route>
        <Route exact path={APP_ROUTES.PHR} component={NotFound} ></Route>
        <Route exact path={APP_ROUTES.DOCTORS} component={Doctors}></Route>
        <Route exact path={APP_ROUTES.NOT_FOUND} component={NotFound} ></Route>
        <Route exact path={APP_ROUTES.COMINGSOON} component={ComingSoon}></Route>
        <Route exact path={APP_ROUTES.DOCTOR_SEARCH} component={doctorsearch}></Route>
        <Route exact path={APP_ROUTES.FAMILY_SEARCH} component={familysearch}></Route>
        <Route exact path={APP_ROUTES.SPECIALITIES_SEARCH} component={Specialitiessearch}></Route>
        <Route exact path={APP_ROUTES.COMMON_HEALTHS_SEARCH} component={CommonHealthesSearch}></Route>
        <Route exact path={APP_ROUTES.ORDER_DETAILS} component={OrderDetails}></Route>
        <Route exact path={APP_ROUTES.PACKAGEORDERDETAILS} component={PackageOrderDetails}></Route>
        <Route exact path={APP_ROUTES.HOSPITAL_DETAILS} component={HospitalDetails}></Route>
        <Route exact path={APP_ROUTES.RECOMMENDED_SPECIALITY} component={RecommondedSpeciality}></Route>
        <Route exact path={APP_ROUTES.DIAGNOSTICS_HEALTHPACKAGE} component={DiagnosticsHealthpackages}></Route>
        <Route exact path={APP_ROUTES.COMPLETEBLOOD_COUNTTEST} component={CompletebloodCounttest}></Route>
        <Route exact path={APP_ROUTES.LABTEST_SEARCH} component={LabtestSearch}></Route>
        <Route exact path={APP_ROUTES.LALPATH_LAB} component={LabDetails}></Route>
        <Route exact path={APP_ROUTES.ALL_LABTEST} component={AllLabtest}></Route>
        <Route exact path={APP_ROUTES.ALL_RADIOLOGY} component={AllRadiology}></Route>
        <Route exact path={APP_ROUTES.SEE_ALL_COMMON_LABTEST} component={SeeAllCommonLabTest}></Route>
        <Route exact path={APP_ROUTES.DIAGNOSTICS_LANDINGPAGE} component={DiagnosticsLandingpage}></Route>
        <Route exact path={APP_ROUTES.MEDICINE_SEARCHRESULT} component={MedicineSearchresult}></Route>
        <Route exact path={APP_ROUTES.MEDICINE_CATEGORY} component={MedicineCategory}></Route>
        <Route exact path={APP_ROUTES.MEDICINE_PRODUCT} component={MedicineProduct}></Route>
        <Route exact path={APP_ROUTES.MEDICINE_ALL_PRODUCTS} component={MedicineSearch}></Route>
        <Route exact path={APP_ROUTES.PHARMACY_LIST} component={PharmacyList}></Route>
        <Route exact path={APP_ROUTES.PHARMACY_CATEGOTY} component={PharmacyCategory}></Route>
        <Route exact path={APP_ROUTES.SPECIALITY_DOCTORS} component={Doctorspeciality}></Route>
        <Route exact path={APP_ROUTES.SYMPTOMS_DOCTORS} component={Doctorspeciality}></Route>
        <Route exact path={APP_ROUTES.HOSPITAL_SEARCH} component={HospitalSearch}></Route>
        <Route exact path={APP_ROUTES.MENUBAR} component={UserProfileMobilesidebar}></Route>
        <Route exact path={USERPROFILE_ROUTES.SIDEBAR} component={Userprofilesidebar}></Route>
        <Route exact path={APP_ROUTES.ALL_SEARCH} component={AllSearch}></Route>
        <Route exact path={APP_ROUTES.PRIVACY_POLICY} component={PrivacyPolicy}></Route>
        <Route exact path={APP_ROUTES.ABOUTUS} component={AboutUs}></Route>
        <Route exact path={APP_ROUTES.OUR_TEAM} component={OurTeam}></Route>
        <Route exact path={APP_ROUTES.CONTACTWITHUS} component={ContactWithUs}></Route>
        <Route exact path={APP_ROUTES.MEDIA} component={Media}></Route>
        <Route exact path={APP_ROUTES.TERMS_AND_CONDITION} component={TermsAndCondition}></Route>
        <Route exact path={APP_ROUTES.REFUND_POLICY} component={RefundPolicy}></Route>
        <Route exact path={APP_ROUTES.COMPARE_PRESCRIPTIONS} component={ComparePrescriptions}></Route>
        <Route exact path={USERPROFILE_ROUTES.MYWALLET} component={Mywallet}></Route>

        <Route exact path={APP_ROUTES.FORGET_PASSWORD} component={Patientforgetpassword}></Route>
        <Route exact path={USERPROFILE_ROUTES.MYHELPSUPPORT} component={Support}></Route>

        <PrivateRoute exact path={'/diacom'} component={Diacom} ></PrivateRoute>
        <PrivateRoute exact path={APP_ROUTES.APPOINMENT_CONFIRM} component={AppoinmentConfirmation} ></PrivateRoute>
        <PrivateRoute exact path={APP_ROUTES.PAYMENT} component={Payment}></PrivateRoute>
        <PrivateRoute exact path={APP_ROUTES.PRESCRIPTION} component={Prescription}></PrivateRoute>
        <Route exact path={APP_ROUTES.POST_CONSULTATION} component={PostConsultation}></Route>
        <PrivateRoute exact path={APP_ROUTES.DOWNLOAD} component={DownloadPrescription}></PrivateRoute>
        <PrivateRoute exact path={APP_ROUTES.CART_PAYMENT} component={CartPayment}></PrivateRoute>
        <PrivateRoute exact path={APP_ROUTES.CART_SUCCESSFUL} component={Cartappointment}></PrivateRoute>
        <PrivateRoute exact path={APP_ROUTES.MEDICINE_CART} component={MedicineCart}></PrivateRoute>
        <PrivateRoute exact path={APP_ROUTES.MEDICINE_PAYMENT} component={MedicinePayment}></PrivateRoute>
        <PrivateRoute path={APP_ROUTES.MEDICINE_ORDERPLACE} component={MedicineOrder}></PrivateRoute>
        <PrivateRoute exact path={APP_ROUTES.CART_ORDER_SUCESS} component={CartOrderSucess}></PrivateRoute>
        <PrivateRoute exact path={APP_ROUTES.CART_SUMMARY} component={CartSummary}></PrivateRoute>
        <PrivateRoute exact path={APP_ROUTES.PRESCRIPTION_MEDICINE} component={PrescriptionMedicine}></PrivateRoute>
        <PrivateRoute exact path={APP_ROUTES.UPLOADED_PRESCRIPTION} component={prescriptionuploaded}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.MYDETAILS} component={Mydetails}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.PROFILE} component={Mydetails}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.MANAGEPROFILE} component={Manageprofile}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.MYREPORTS} component={Myreports}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.MYPRISCRIPTION} component={MyPriscription}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.MYMEDICALHISTORY} component={MedicalHistory}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.MYINSURANCE} component={Myinsurance}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.MYORDERS} component={Myorders}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.MYAPPOINTMENTS} component={Myappointments}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.MYPAYMENTS} component={Mypayments}></PrivateRoute>
        {/* <PrivateRoute exact path={USERPROFILE_ROUTES.MYWALLET} component={Mywallet}></PrivateRoute> */}
        <PrivateRoute exact path={USERPROFILE_ROUTES.MYADDRESSBOOK} component={Myaddresssbook}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.MYCHANGEPASSWORD} component={Changepassword}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.MYFEEDBACK} component={Feedback}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.MYVITALS} component={Myvitals}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.MEDICATIONS} component={Addmedication}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.INSURANCE} component={Addinsurance}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.HEALTHRESTRICTIONS} component={HealthRestriction}></PrivateRoute>
        <PrivateRoute exact path={APP_ROUTES.VIDEO_CALL} component={VideoCall}></PrivateRoute>
        <PrivateRoute exact path={APP_ROUTES.HOSPITAL_ENQUIRY} component={EnquiryForm}></PrivateRoute>
        {/* <PrivateRoute exact path={USERPROFILE_ROUTES.ADDADDRESS} component={Addaddress}></PrivateRoute> */}
        <PrivateRoute exact path={USERPROFILE_ROUTES.ADD_ALLERGY} component={AddAllergy}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.REPORTS_VITALS} component={ReportsVital}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.ADD_MEDICAL} component={AddMedical}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.MEDICAL_CONDITION} component={MedicalCondition}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.MEDICAL_PRESCRIPTION} component={MedicinePrescription}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.VIEWAPPOINTMENT} component={AppointmentDetails}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.SEEALL_ALLERGY} component={Seeallallergy}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.SEEALL_HEALTHRESTRICTION} component={Seeallhealthrestrictions}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.SEEALL_MEDICALHISTORY} component={Seeallmedicalhistory}></PrivateRoute>
        {/* <PrivateRoute exact path={USERPROFILE_ROUTES.SEEALLSURGICALHISTORY} component={Addsurgicalhistory}></PrivateRoute> */}
        <PrivateRoute exact path={USERPROFILE_ROUTES.ADDMEDICALHISTORY} component={Addmedicalhistory}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.SEEALL_MEDICATION} component={Seeallmedication}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.SEEALLMEDICALHISTORY} component={Seeallmedicalhistory} ></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.SEEALLSOCIALHISTORY} component={Seeallsocialhistory} ></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.SEEALLFAMILYHISTORY} component={Seeallfamilyhistory} ></PrivateRoute>
         <PrivateRoute exact path={USERPROFILE_ROUTES.SEEALLSURGICALHISTORY} component={Seeallsurgicalhistory} ></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.SEEALLMEDICATION} component={Seeallmedication}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.APPOINTMENTDETAILS} component={Demo}></PrivateRoute>
        <PrivateRoute exact path={APP_ROUTES.RECENT_MED} component={RecentMedicines}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES._ADD_ALLERGY} component={AddAllergyM}></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.MYNOTIFICATION} component={Notifications} ></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.MYREQUESTS} component={PatientprofileMyrequests} ></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.ADDADDRESS} component={Patientmyaddress} ></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.MYLABREPORT} component={LabReport} ></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.MY_ORDERS} component={Patientprofileorders} ></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.PATIENTMEDICINEORDERS} component={PatientprofileMedicineOrders} ></PrivateRoute>
        <PrivateRoute exact path={USERPROFILE_ROUTES.PATIENTMEPACKAGEORDERS} component={PatientprofilePackageOrders} ></PrivateRoute>
        <PrivateRoute exact path={APP_ROUTES.HOSPITAL_BIODETAILS} component={HospitalBiodetails} ></PrivateRoute>
        <PrivateRoute exact path={APP_ROUTES.MEDICINEDELIVERYORDERDETAILS} component={Medicinedeliveryorderdetails} ></PrivateRoute>
      </Switch>
      {background && <Route path={APP_ROUTES.LOGIN} component={LoginPage} />}
    </>
  )
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkIsLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);

export default Routes;