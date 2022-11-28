
import SectionContainer from './SectionContainer';
import { useHistory } from 'react-router-dom';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import abdnominal from '../Assets/Images/icons/CHC/Abdominal_Pain.svg';
import tooth from '../Assets/Images/icons/CHC/Tooth_Ache.svg';
import joint from '../Assets/Images/icons/CHC/Joint_Pain.svg';
import ear from '../Assets/Images/icons/CHC/Ear_Pain.svg';
import congestion from '../Assets/Images/icons/CHC/Congestion.svg';
import sweating from '../Assets/Images/icons/CHC/Excessive_Sweating.svg';
import diaheria from '../Assets/Images/icons/CHC/Diarrhea.svg';
import breathing from '../Assets/Images/icons/CHC/Breathing_Difficulty.svg';
import periods from '../Assets/Images/icons/CHC/Irregular_Periods.svg';
import dizzy from '../Assets/Images/icons/CHC/Dizziness.svg';
import fatigue from '../Assets/Images/icons/CHC/Fatigue.svg';
import backpain from '../Assets/Images/icons/CHC/Back_Pain.svg';
import chestpain from '../Assets/Images/icons/CHC/Chest_Pain.svg';
import gastrits from '../Assets/Images/icons/CHC/Gastritis.svg';
import UTL from '../Assets/Images/icons/CHC/UTL.svg';
import cold from '../Assets/Images/icons/CHC/Cold_Fever.svg';

import React, { useEffect, useRef, createRef } from "react";
var positionScroll = 1;



function CommonHealthConcerns() {

    const history = useHistory();



    const CHRdata = [
        { img: abdnominal, text: 'Abdominal Pain' },
        { img: tooth, text: 'Tooth Ache' },
        { img: joint, text: 'Joint Pain' },
        { img: ear, text: 'Ear Pain' },
        { img: congestion, text: 'Congestion' },
        { img: sweating, text: 'Excessive Sweating' },
        { img: diaheria, text: 'Diarrhea' },
        { img: breathing, text: 'Breathing Difficulty' },
        { img: periods, text: 'Irregular Periods' },
        { img: dizzy, text: 'Dizziness' },
        { img: fatigue, text: 'Fatigue' },
        { img: backpain, text: 'Back Pain' },
        { img: chestpain, text: 'Chest Pain' },
        { img: gastrits, text: 'Gastritis' },
        { img: UTL, text: 'UTI' },
        { img: cold, text: 'Cold and Fever' },
    ]

    //   // React ref to store array of refs
  const scrollRefs = useRef([]);


  // Populate scrollable refs, only create them once
  // if the selectedElements array length is expected to change there is a workaround
  scrollRefs.current = [...Array(CHRdata?.length).keys()].map(
    (_, i) => scrollRefs?.current[i] ?? createRef()
  );

    const handleScroll = (e, dir) => {
        if (dir === "rightArrow") {
          positionScroll = positionScroll + 9;
        } else {
          positionScroll = positionScroll - 8;
        }
        if (positionScroll > CHRdata.length) {
          positionScroll = CHRdata.length - 3;
        }
        if (positionScroll < 0) {
          positionScroll = 0;
        }
        scrollRefs?.current[positionScroll]?.current?.scrollIntoView(
          { behavior: 'smooth', block: 'nearest', inline: 'center' }
        );
      };





    return (
        <>
            <div className="flex flex-col m-auto px-3 lg:px-8">
                <SectionContainer link={APP_ROUTES.COMMON_HEALTHS_SEARCH} title={'Common Health Concerns'} subtitle={'Consult with top doctors'} seeAll={''}   handelSroll={handleScroll}/>
                <div className=" m-auto px-3 w-full lg:max-w-full lg:flex mt-2">
          <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                        <div className="grid grid-flow-row-dense grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:flex mx-auto md:space-x-16">
                            {CHRdata.map((data, i) => (

                             
                                <div key={i} onClick={() => history.push({ pathname: APP_ROUTES.DOCTOR_SEARCH, healthConcerns: data.text, text: data.text})} className="cursor-pointer content-center justify-center  m-3 h-auto lg:h-auto lg:w-32 flex-none bg-cover text-center overflow-hidden"
                        ref={scrollRefs.current[i]}>
                                    <div className="flex flex-wrap rounded-full border border-gray-graynurse  bg-white  h-28 sm:h-32 md:h-32 lg:h-32 w-28 sm:w-32 md:w-32 lg:w-32 content-center justify-center mx-auto">
                                        <img src={data.img} alt="dentist" className="h-14 sm:h-14 md:h-32 lg:h-14 w-14 sm:w-14 md:w-14 lg:w-32   " />
                                        <br />
                                        
                                       
                                    </div>
                                    <p className="text-brand-secondary mt-2 font-medium lg:font-medium  text-xs lg:text-xs  font-bold  mx-4">{data.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CommonHealthConcerns;
