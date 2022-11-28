import { useEffect } from 'react'
import Dent from '../Assets/Images/Group 2848.png';
import fever from '../Assets/Images/fever.svg';
import overweight from '../Assets/Images/overweight.svg';

import Therma from '../Assets/Images/thermo.png';
import { Link } from 'react-router-dom';
import SectionContainer from './SectionContainer';
import { useHistory, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
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


function CommonTestConditions() {

    const history = useHistory();
    // const dispatch = useDispatch();
    // const commonHealtList = useSelector((state) => state.doctspecialitylist);
    // const { doctspecialityData } = commonHealtList;



    // useEffect(() => {
    //     console.log(doctspecialityData)
    //     dispatch(getDoctorspecialitylist());
    // }, [
    //     dispatch
    // ]);



    const CHRdata = [
        { img: abdnominal, text: 'Heart' },
        { img: tooth, text: 'Kidney' },
        { img: joint, text: 'Thyroid' },
        { img: ear, text: 'Kidney' },
        { img: congestion, text: 'Liver' },
        { img: sweating, text: 'Lungs' },
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
            <div className="flex flex-col m-auto px-3">
                <SectionContainer title={'Common Test Conditions'} subtitle={'Consult with top doctors'} seeAll={'hide'} />
                <div className="w-full lg:max-w-full lg:flex mt-2">
                    <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                        <div className="grid grid-flow-row-dense grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:flex mx-auto space-x-6">
                            {CHRdata.map((data, i) => (
                                <div key={i} onClick={() => history.push({ pathname: APP_ROUTES.DOCTOR_SEARCH, healthConcerns: data.text, text: data.text})} className="cursor-pointer content-center justify-center  m-3 h-auto lg:h-auto lg:w-auto flex-none bg-cover text-center overflow-hidden">
                                    <div className="flex flex-wrap rounded-lg  bg-white  h-28 sm:h-32 md:h-32 lg:h-36 w-28 sm:w-32 md:w-32 lg:w-36 content-center justify-center mx-auto">
                                        <img src={data.img} alt="dentist" className="h-32 sm:h-32 md:h-36 lg:h-36 w-36 sm:w-40 md:w-40 lg:w-40 " /><br />
                                        {/* <p className="text-brand-secondary  font-semibold text-base pt-3">{data.symptoms}</p> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CommonTestConditions;
