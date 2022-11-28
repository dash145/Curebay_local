import SectionContainer from "./SectionContainer";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDoctorspecialitylist } from "../Redux/Actions/doctorAction";
import den from "../Assets/Images/icons/den.svg";
import nephro from "../Assets/Images/icons/nephro.svg";
import pedia from "../Assets/Images/icons/pedia.svg";

import endocrinology from "../Assets/Images/icons/endo.svg";

import oncology from "../Assets/Images/icons/onco.svg";
import orthopedic from "../Assets/Images/icons/ortho.svg";

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
import ortho from "../Assets/Images/Specialities/ortho.svg";
import Orthopedics from "../Assets/Images/Specialities/Orthopedics.svg";
import Ophthamology from "../Assets/Images/Specialities/Ophthamology.png";
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

import Endo from "../Assets/Images/Specialities/endo.svg";
import React, { useState, useEffect, useRef, createRef } from "react";

import { APP_ROUTES } from "../application/Router/constants/AppRoutes";

var positionScroll = 3;

function Speciality() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [speciality, setSpeciality] = useState();

  useEffect(() => {
    dispatch(getDoctorspecialitylist()).then((res) => {
      console.log("imageData", res);
      let data = res.map((search, i) => {

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


  //     {
  //         speciality: 'NeuroLogist',
  //         img: den
  //     },
  //     {
  //         speciality: 'Orthopedic',
  //         img: ortho
  //     },
  //     {
  //         speciality: 'General Physician',
  //         img: general
  //     },
  //     {
  //         speciality: 'Dentist',
  //         img: den
  //     },
  //     {
  //         speciality: 'Cardiologist',
  //         img: cardio
  //     },
  //     {
  //         speciality: 'pulmonologist',
  //         img: pulmno
  //     },
  //     {
  //         speciality: 'Nephrologist',
  //         img: nephro
  //     },
  //     {
  //         speciality: 'Neurologist',
  //         img: neuro
  //     },
  //     {
  //         speciality: 'ENT',
  //         img: ENT
  //     },
  //     {
  //         speciality: 'Pediatrician',
  //         img: pedia
  //     },
  //     {
  //         speciality: 'Gastrologist',
  //         img: gastro
  //     },
  //     {
  //         speciality: 'Gynaecologist',
  //         img: gyno
  //     },
  //     {
  //         speciality: 'Endorinlogist',
  //         img: endo
  //     },
  //     {
  //         speciality: 'Oncologist',
  //         img: onco
  //     },

  // ]

  //   // React ref to store array of refs
  const scrollRefs = useRef([]);

  // Populate scrollable refs, only create them once
  // if the selectedElements array length is expected to change there is a workaround
  scrollRefs.current = [...Array(speciality?.length).keys()].map(
    (_, i) => scrollRefs?.current[i] ?? createRef()
  );

  const handleScroll = (e, dir) => {
    if (dir === "rightArrow") {
      positionScroll = positionScroll + 8;
    } else {
      positionScroll = positionScroll - 8;
    }
    if (positionScroll > speciality.length) {
      positionScroll = speciality.length - 1;
    }
    if (positionScroll < 0) {
      positionScroll = 0;
    }
    scrollRefs?.current[positionScroll]?.current?.scrollIntoView({
      behavior: 'smooth', block: 'nearest', inline: 'center'
    });
  };

  return (
    <>
      <div className="flex flex-col mx-3 lg:mx-8 m-auto mt-5 sm:mt-5 md:mt-5 lg:mt-0 ">
        <SectionContainer
          link={APP_ROUTES.SPECIALITIES_SEARCH}
          title={"Specialities"}
          subtitle={"Consult with top doctors"}
          seeAll={"Specialities"}
          handelSroll={handleScroll}
        />
        <div className=" m-auto px-3 w-full lg:max-w-full lg:flex mt-2">
          <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
            <div className="grid grid-flow-row-dense grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:flex mx-auto md:space-x-16">
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
                    className="cursor-pointer content-center justify-center  m-3 h-auto lg:h-auto lg:w-32 flex-none bg-cover text-center overflow-hidden"
                    key={i}
                    ref={scrollRefs.current[i]}
                  >
                    <div className="flex flex-wrap rounded-full border border-gray-graynurse  bg-white  h-28 sm:h-32 md:h-32 lg:h-32 w-28 sm:w-32 md:w-32 lg:w-32 content-center justify-center mx-auto">
                      <img src={data.img} alt="dentist" className="h-14 w-14" />
                    </div>
                    <p className="text-brand-secondary mt-2 font-medium lg:font-medium  text-xs lg:text-xs justify-center w-full font-bold">
                      {data.speciality}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Speciality;
