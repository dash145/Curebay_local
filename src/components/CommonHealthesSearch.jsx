import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";

import abdnominal from '../Assets/Images/icons/abdnominal.svg'
import tooth from '../Assets/Images/icons/tooth.svg'
import joint from '../Assets/Images/icons/joint.svg'
import ear from '../Assets/Images/icons/ear.svg'
import congestion from '../Assets/Images/icons/congestion.svg'
import sweating from '../Assets/Images/icons/sweating.svg'
import diaheria from '../Assets/Images/icons/diaheria.svg'
import breathing from '../Assets/Images/icons/breathing.svg'
import periods from '../Assets/Images/icons/periods.svg'
import dizzy from '../Assets/Images/icons/dizzy.svg'
import fatigue from '../Assets/Images/icons/fatigue.svg'
import backpain from '../Assets/Images/icons/backpain.svg'
import chestpain from '../Assets/Images/icons/chestpain.svg'
import gastrits from '../Assets/Images/icons/gastrits.svg'
import UTL from '../Assets/Images/icons/UTI.jpg'
import cold from '../Assets/Images/icons/cold.svg'
function CommonHealthesSearch(props) {
  console.log(props, "hey props");
  const history = useHistory();


  const CHRdata = [
    { img: abdnominal, text: 'abdominal pain' },
    { img: tooth, text: 'tooth ache' },
    { img: joint, text: 'joint pain' },
    { img: ear, text: 'ear pain' },
    { img: congestion, text: 'congestion' },
    { img: sweating, text: 'excessive sweating' },
    { img: diaheria, text: 'diarrhea' },
    { img: breathing, text: 'breathing difficulty' },
    { img: periods, text: 'Irregular periods' },
    { img: dizzy, text: 'dizziness' },
    { img: fatigue, text: 'fatigue' },
    { img: backpain, text: 'back pain' },
    { img: chestpain, text: 'chest pain' },
    { img: gastrits, text: 'gastritis' },
    { img: UTL, text: 'UTI' },
    { img: cold, text: 'cold and fever' },
]


 
 

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
            <a>Common Health Concerns</a>
          </li>
        </ul>
        <div className="lg:block text-gray-primary font-medium text-lg px-3 my-1  my-4">
        <p className="flex justify-center ">Available Common Health Concerns</p>
        </div>
        <div className=" justify-end py-4 px-8">
    
               <div className=" m-auto px-3  lg:flex mt-2">
        
         
          <div className="flex overflow-x-scroll pb-10">
                        <div className="grid grid-flow-row-dense grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8  mx-auto md:space-x-6">
                            {CHRdata.map((data, i) => (
                                <div key={i} onClick={() => history.push({ pathname: APP_ROUTES.DOCTOR_SEARCH, healthConcerns: data.text, text: data.text})} className="cursor-pointer content-center justify-center  m-3 h-auto lg:h-auto lg:w-auto flex-none bg-cover text-center overflow-hidden" 
                       >
                                    <div className="flex flex-wrap rounded-lg  bg-white  h-28 sm:h-32 md:h-32 lg:h-36 w-28 sm:w-32 md:w-32 lg:w-36 content-center justify-center mx-auto">
                                        <img src={data.img} alt="dentist" className="h-32 sm:h-32 md:h-36 lg:h-36 w-36 sm:w-40 md:w-40 lg:w-40 " /><br />
                                        {/* <p className="text-brand-secondary  font-semibold text-base pt-3">{data.text}</p> */}
                                    </div>
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
export default CommonHealthesSearch;

