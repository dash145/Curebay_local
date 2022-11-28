import { useEffect, useState } from "react";
import noDataFound from "../Assets/Images/No data-found.svg";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import useGAEventsTrackers from "../config/useGAEventsTrackers";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";

import den from "../Assets/Images/icons/den.svg";
import nephro from "../Assets/Images/icons/nephro.svg";
import endocrinology from "../Assets/Images/icons/endo.svg";

import oncology from "../Assets/Images/icons/onco.svg";
import orthopedic from "../Assets/Images/icons/ortho.svg";
import pedia from "../Assets/Images/icons/pedia.svg";
import Cardiology from "../Assets/Images/Specialities/Cardiology.png";
import Cosmetology from "../Assets/Images/Specialities/Cosmetology.png";
import Dermatology from "../Assets/Images/Specialities/Dermatology.png";
import EmergencyMedicine from "../Assets/Images/Specialities/EmergencyMedicine.png";
import Ent from "../Assets/Images/Specialities/Ent.png";
import FamiltPhysician from "../Assets/Images/Specialities/FamiltPhysician.png";
import FamilyMedicine from "../Assets/Images/Specialities/FamilyMedicine.png";
import Gastroentrology from "../Assets/Images/Specialities/Gastroentrology.png";
import GeneralMedician from "../Assets/Images/Specialities/GeneralMedician.png";
import GeneralPhysican from "../Assets/Images/Specialities/GeneralPhysican.png";
import GeneralSurgery from "../Assets/Images/Specialities/GeneralSurgery.png";
import Genetics from "../Assets/Images/Specialities/Genetics.png";
import Geriatrics from "../Assets/Images/Specialities/Geriatrics.png";
import Gynaecology from "../Assets/Images/Specialities/Gynaecology.png";
import Haematology from "../Assets/Images/Specialities/Haematology.png";
import Hepatology from "../Assets/Images/Specialities/Hepatology.png";
import Infection from "../Assets/Images/Specialities/Infection.png";
import Neonatology from "../Assets/Images/Specialities/Neonatology.png";
import Nephrology from "../Assets/Images/Specialities/Nephrology.png";
import Neurology from "../Assets/Images/Specialities/Neurology.png";
import Nutritions from "../Assets/Images/Specialities/Nutritions.png";
import Obstetrics from "../Assets/Images/Specialities/Obstetrics.png";
import Ophthamology from "../Assets/Images/Specialities/Ophthamology.png";
import ortho from "../Assets/Images/Specialities/ortho.svg";
import Orthopedics from "../Assets/Images/Specialities/Orthopedics.svg";
import Paediatric from "../Assets/Images/Specialities/Paediatric.png";
import Pathology from "../Assets/Images/Specialities/Pathology.png";
import Psychaitry from "../Assets/Images/Specialities/Psychaitry.png";
import Pulmonology from "../Assets/Images/Specialities/Pulmonology.png";
import SportsMedicine from "../Assets/Images/Specialities/SportsMedicine.png";
import Urology from "../Assets/Images/Specialities/Urology.png";
import Vascular from "../Assets/Images/Specialities/Vascular.png";
import sexologist from "../Assets/Images/Specialities/sexologist.svg";
import physiotherapist from "../Assets/Images/Specialities/physiotherapist.svg";
import psychologist from "../Assets/Images/Specialities/psychologist.svg";
import psychotherapist from "../Assets/Images/Specialities/psychotherapist.svg";

import { getDoctorspecialitylist } from "../Redux/Actions/doctorAction";
function Specialitiessearch(props) {
  console.log(props, "hey props");
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const GAEventsTrackers = useGAEventsTrackers("BooK Appointment");


  //const doctorlist = useSelector((state) => state.doctorlist);
  //  const { doctorData, total, currentPage } = doctorlist;
  const particulardoctor = useSelector((state) => state.particulardoctor);
  const { particularDoct } = particulardoctor;
  const userData = useSelector((state) => state.authReducer.patientData);
  const specialistDoctor = useSelector(
    (state) => state.particulardoctorspeciality
  );

  const { slotData } = useSelector((state) => state.doctorsslot);
  const doctorsAppointment = useSelector(
    (state) => state.doctorAppointmentList
  );
  const { doctorappointmentList } = doctorsAppointment;
  const [stateindex, setIndex] = useState(-1);
  const { coords } = useSelector((state) => state.authReducer);
  const search = useSelector((state) => state.authReducer.search);
  const [currentPinCode, setCurrentPincode] = useState("");
  const [doctorData, setsearchData] = useState([]);
  const [isFetchingPinCode, setIsFetchingPinCode] = useState(false);
  const [position, setPosition] = useState({});

  const [pageStart, setPageStart] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [speciality, setSpeciality] = useState();

  const viewprofile = (e, doct) => {
    e.preventDefault();
    history.push(`/doctors/${doct.userId}`);
  };



  const onDoctorSelect = (e, doct) => {
    e.preventDefault();
    history.push(`/doctors/${doct.userId}`);
    GAEventsTrackers("Doctor", "Book Apointment", "Book Apointment");
  };


  useEffect(() => {
    dispatch(getDoctorspecialitylist()).then((res) => {
      let data = res.map((search, i) => {
        console.log("imageData", search);
        return {
          code: search.code,
          speciality: search?.speciality,
          img:
            search?.code === "S01"
              ? Cardiology
              : search?.code === "S02"
                ? Cardiology
                : search?.code === "S03"
                  ? den
                  : search?.code === "S04"
                    ? Dermatology
                    : search?.code === "S05"
                      ? Cosmetology
                      : search?.code === "S06"
                        ? EmergencyMedicine
                        : search?.code === "S07"
                          ? endocrinology
                          : search?.code === "S08"
                            ? Ent
                            : search?.code === "S09"
                              ? Gastroentrology
                              : search?.code === "S10"
                                ? FamilyMedicine
                                : search?.code === "S11"
                                  ? GeneralSurgery
                                  : search?.code === "S12"
                                    ? Genetics
                                    : search?.code === "S13"
                                      ? Geriatrics
                                      : search?.code === "S14"
                                        ? Haematology
                                        : search?.code === "S15"
                                          ? Hepatology
                                          : search?.code === "S16"
                                            ? Infection
                                            : search?.code === "S17"
                                              ? Neonatology
                                              : search?.code === "S18"
                                                ? Nephrology
                                                : search?.code === "S19"
                                                  ? Neurology
                                                  : search?.code === "S20"
                                                    ? Nutritions
                                                    : search?.code === "S21"
                                                      ? Obstetrics
                                                      : search?.code === "S22"
                                                        ? oncology
                                                        : search?.code === "S23"
                                                          ? Ophthamology
                                                          : search?.code === "S24"
                                                            ? ortho
                                                            : search?.code === "S25"
                                                              ? Paediatric
                                                              : search?.code === "S26"
                                                                ? Pathology
                                                                : search?.code === "S27"
                                                                  ? Psychaitry
                                                                  : search?.code === "S28"
                                                                    ? Pulmonology
                                                                    : //  : search?.code == "S029" ? nephro
                                                                    search?.code === "S30"
                                                                      ? SportsMedicine
                                                                      : search?.code === "S29"
                                                                        ? sexologist
                                                                        : search?.code === "S31"
                                                                          ? Urology
                                                                          : search?.code === "S32"
                                                                            ? Vascular
                                                                            : search?.code === "S33"
                                                                              ? GeneralMedician
                                                                              : search?.code === "S34"
                                                                                ? Gynaecology
                                                                                : search?.code === "S37"
                                                                                  ? Orthopedics

                                                                                  : search?.code === "S35"
                                                                                    ? FamiltPhysician
                                                                                    : search?.code === "S36"
                                                                                      ? GeneralPhysican
                                                                                      : search?.code === "SC37"
                                                                                        ? Orthopedics
                                                                                        : search?.code === "S001"
                                                                                          ? physiotherapist
                                                                                          : search?.code === "SC38"
                                                                                            ? psychologist
                                                                                            : search?.code === "SC39"
                                                                                              ? psychotherapist

                                                                                              : pedia,
        };
      });
      setSpeciality(data);
    });
  }, []);

  console.log("spealityxx", speciality);


  return (
    <>
      <div className="lg:py-4">

        <ul className="lg:flex  text-brand-secondary text-sm lg:text-base px-3  pt-5">
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
            <a href="/doctors">Doctors</a>
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
            <a>Specialities</a>
          </li>
        </ul>
        <div className="lg:block text-gray-primary font-medium text-lg px-3 my-1  my-4">
          <p className="flex justify-center ">Available Specialities</p>
        </div>
        <div className=" justify-end py-4 px-8">

          <div className=" m-auto px-3  lg:flex mt-2">
            <div className="flex pb-10 hide-scroll-bar">
              <div className="grid grid-flow-row-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  mx-auto md:space-x-6">
                {speciality &&
                  speciality.length > 0 &&
                  speciality.map((data, i) => (
                    <div
                      onClick={() =>
                        history.push({
                          pathname: APP_ROUTES.DOCTOR_SEARCH,
                          speciality: data.speciality,
                        })
                      }
                      className="cursor-pointer content-center justify-center  m-3 h-auto lg:h-auto lg:w-auto flex-none bg-cover text-center overflow-hidden"
                      key={i}

                    >
                      <div className="flex flex-wrap  rounded-full bg-white border border-gray-graynurse h-24 sm:h-28 md:h-32 lg:h-32 w-24 sm:w-28 md:w-32 lg:w-32 content-center justify-center mx-auto">
                        <img src={data.img} alt="dentist" className="h-12 w-12" />
                      </div>
                      <p className="text-brand-secondary mt-2 font-medium lg:font-medium  text-xs lg:text-xs   mx-4">
                        {data.speciality}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>


        </div>
        <br />
      </div>
    </>
  );
}
export default Specialitiessearch;

