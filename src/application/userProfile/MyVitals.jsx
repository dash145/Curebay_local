import React, { useEffect, useState } from 'react';
import FamilyDropdown from '../../components/userprofilecomponents/FamilyDropDown';
import Patientprofilesidebar from '../../components/Patientprofilesidebar';
import Patientprofileupbar from '../../components/userprofilecomponents/Patientprofileupbar';
import { useHistory, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../../application/Router/constants/AppRoutes';
import Patientprofilebloodpressurecard from '../../components/userprofilecomponents/Patientprofilebloodpressurecard';
import PatientprofileTempraturecard from '../../components/userprofilecomponents/PatientprofileTempraturecard';
import Patientprofileheartratecard from '../../components/userprofilecomponents/Patientprofileheartratecard';
import Patientprofileoxygencard from '../../components/userprofilecomponents/Patientprofileoxygencard';
import oxy from '../../Assets/Images/oxygenn.svg';
import icon from '../../Assets/Images/Icon 24px.png';
import height from '../../Assets/Images/height.png';
import heart from '../../Assets/Images/heartt.svg';
import Resporatoryratecard from '../../components/userprofilecomponents/Resporatoryratecard';
//import Bloodglucosecard from './Bloodglucosecard';
import BMIcard from '../../components/userprofilecomponents/BMIcard';
import Weightcard from '../../components/userprofilecomponents/Weightcard';
import Heightcard from '../../components/userprofilecomponents/Heightcard';
import { useDispatch, useSelector } from 'react-redux';
import { getpatientvitaldetails } from '../../Redux/Actions/patientAction';
import AddVital from '../../components/userprofilecomponents/AddVitalpopup';
import Userprofilesidebar from '../../components/userprofilesidebar';
import { USERPROFILE_ROUTES } from '../Router/constants/UserProfileRoutes';

function Myvitals(props) {

    const history = useHistory();
    const location = useLocation();
    const redirectTo = (event, location) => {
        event.preventDefault();
        history.push(location)
    }
    const [showvitals, setvitals] = useState(false);
    const patientCode = useSelector(state => state.authReducer.patientCode);
    const [activePatient, setActivePatient] = useState(patientCode)
    const addvitals = (event, location) => {
        event.preventDefault();
        setvitals(true)
    }

    const dispatch = useDispatch();

    const patientvitalsdetaillist = useSelector((state) => state.patientvitalsdetail);
    const { Patientvitalsdetailsdata, isLoading } = patientvitalsdetaillist;
    console.log('This is Console', Patientvitalsdetailsdata);
    const patientDetails = useSelector((state) => state.particularpatientdetails);

    useEffect(() => {
        dispatch(getpatientvitaldetails(patientCode));
    }, [dispatch, patientCode]);


    const getVitals = () => {
        setvitals(false)
        dispatch(getpatientvitaldetails(activePatient));
    }
    const gotoHistory = (e) => {
        e.preventDefault();
        history.push(USERPROFILE_ROUTES.MYDETAILS)
    }

    const loadVitalsFor = (patient) =>{
        // console.log(patient);
        setActivePatient(patient);
        dispatch(getpatientvitaldetails(patient));
    }

    console.log("all dta",Patientvitalsdetailsdata);

    return (
        <>
            <Patientprofileupbar></Patientprofileupbar>
            <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base mb-2 mt-0">
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
                    <a >My Vitals</a>
                </li>
            </ul>

            <br />


            <div class="flex justify-between " style={{backgroundColor:"#F8F8F8"}}>
                <div class="lg:block hidden w-3/12 ml-6 mt-3">
                    <Userprofilesidebar></Userprofilesidebar>
                </div>

                <div class="lg:w-8/12 w-full md:mx-2 lg:mr-16 mt-6 ">
                    <div className="flex flex-col">
                        <p className="text-2xl font-bold text-gray-800 mb-5">My Vitals</p>
                            <div className="py-2 px-4 md:px-8 align-middle inline-block min-w-full border bg-white">
                          

                            <div className='flex justify-between  lg:items-center items-start '>
                                    <FamilyDropdown title={'Vitals'} onSelect={loadVitalsFor} />

                                    <div className='lg:mt-0 mt-2 items-end hidden sm:block'>
                                    <button className="text-black text-xs font-semibold p-2 px-8" style={{borderRadius:"5px",border:"1px solid #262626"}} onClick={(e) => { gotoHistory(e) }}>Go Back</button>

                                </div>

                                    </div>
                                    <hr/>
                                    <p onClick={addvitals} class="flex items-center justify-end text-xs text-neutral-800 font-semibold mt-4 text-right mb-6"> <i style={{color:"#66B889"}} className='pi pi-plus-circle mr-2'></i> Add New Vitals</p>
                                    <hr/>
                               
                                {Patientvitalsdetailsdata.length && !isLoading ?
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 space-y-4 gap-x-12 mt-4">
                                            <Patientprofilebloodpressurecard saveCallback={getVitals} data={Patientvitalsdetailsdata}></Patientprofilebloodpressurecard>
                                            <PatientprofileTempraturecard saveCallback={getVitals} data={Patientvitalsdetailsdata}></PatientprofileTempraturecard>
                                            <Patientprofileheartratecard saveCallback={getVitals} data={Patientvitalsdetailsdata}></Patientprofileheartratecard>

                                            <Patientprofileoxygencard saveCallback={getVitals} data={Patientvitalsdetailsdata}></Patientprofileoxygencard>
                                            <Resporatoryratecard saveCallback={getVitals} data={Patientvitalsdetailsdata}></Resporatoryratecard>
                                            {/* <Bloodglucosecard saveCallback={getVitals} data={Patientvitalsdetailsdata}></Bloodglucosecard> */}
                                            <Weightcard saveCallback={getVitals} data={Patientvitalsdetailsdata}></Weightcard>
                                            <Heightcard saveCallback={getVitals} data={Patientvitalsdetailsdata}></Heightcard>


                                            {/* <Heightcard saveCallback={getVitals} data={Patientvitalsdetailsdata}></Heightcard> */}
                                            <BMIcard saveCallback={getVitals} data={Patientvitalsdetailsdata}></BMIcard>
                                            <></>
                                        </div>
                                        <div className="flex flex-wrap justify-center">
                                            {/* <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" /> */}
                                        </div>
                                    </>
                                    : <div className='flex justify-center my-10'>No Data Available</div>

                                }
                            </div>
                    </div>

                    <div class="flex justify-end pt-6">

                        <div>
                            <button onClick={(e) => redirectTo(e, APP_ROUTES.DASHBOARD)} className="bg-brand-secondary  text-white py-3 px-6 font-medium rounded ">Back to Dashboard </button>
                        </div>
                    </div>
                </div>
            </div>

            {
                showvitals ? <AddVital patientCode = {activePatient} closePopup={getVitals} ></AddVital> : null
            }




        </>
    );
}

export default Myvitals;

// /* This example requires Tailwind CSS v2.0+ */
// import React, { useState, useEffect } from 'react'
// import Userprofilesidebar from '../../components/userprofilesidebar';
// import { useDispatch, useSelector } from 'react-redux';
// import temp from '../../Assets/Images/temp.svg';
// import oxy from '../../Assets/Images/oxygenn.svg';
// import heart from '../../Assets/Images/heartt.svg';
// import { getmedicalhistory, getPatientallergylist, getPatientmedicationhistorylist, getPatientvitallist } from '../../Redux/Actions/userprofileVitalActions';
// import VitalChart from '../../components/userprofilecomponents/vitalChart';
// import FamilyDropdown from '../../components/userprofilecomponents/FamilyDropDown';
// import UserTemperature from '../../components/userprofilecomponents/UserTemperature';
// import DetailCard from '../../components/userprofilecomponents/DetailCard';
// import { USERPROFILE_ROUTES } from '../Router/constants/UserProfileRoutes';


// function Myvitals() {
//     const dispatch = useDispatch();
//     const patientCode = useSelector(state => state.authReducer.patientCode)
//     const addvitalsdatas = useSelector((state) => state.addvitalslist)
//     const patientallergylist = useSelector((state) => state.allergylist);
//     const { allergyData } = patientallergylist;
//     const medicationhistorylist = useSelector((state) => state.medicationhistory);
//     const { medicationhistoryData } = medicationhistorylist;
//     const vitalslist = useSelector((state) => state.vitalslist);
//     const [vitalslistData, setVitalList] = useState([]);
//     // const [patientCode, setPatientCode] = useState(userData.code)

//     useEffect(() => {
//         dispatch(getPatientallergylist(patientCode));
//         dispatch(getPatientmedicationhistorylist(patientCode));
//         dispatch(getPatientvitallist(patientCode))
//         dispatch(getmedicalhistory(patientCode))
//     }, [patientCode, dispatch]);

//     useEffect(() => {
//         dispatch(getPatientvitallist(patientCode));
//       }, [addvitalsdatas, dispatch,patientCode]);

//       useEffect(() => {
//           setVitalList(vitalslist.vitalslistData)
//       },[vitalslist.vitalslistData])

//     return (
//         <>
//             <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base pl-4 pt-5">
//                 <li className="inline-flex items-center">
//                     <a href="/">Home</a>
//                     <svg
//                         className="h-5 w-auto text-brand-secondary"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                     >
//                         <path
//                             fill-rule="evenodd"
//                             d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                             clip-rule="evenodd"
//                         ></path>
//                     </svg>
//                 </li>
//                 <li className="inline-flex items-center">
//                     <a href="/components">Profile</a>
//                     <svg
//                         className="h-5 w-auto text-brand-secondary"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                     >
//                         <path
//                             fill-rule="evenodd"
//                             d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                             clip-rule="evenodd"
//                         ></path>
//                     </svg>
//                 </li>


//                 <li className="inline-flex items-center">
//                     <a href="/components">My Vitals</a>
//                     <svg
//                         className="h-5 w-auto text-brand-secondary"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                     >
//                         <path
//                             fill-rule="evenodd"
//                             d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                             clip-rule="evenodd"
//                         ></path>
//                     </svg>
//                 </li>

//             </ul>
//             <div className="flex justify-between ">
//                 <div className="lg:block hidden w-3/12 ml-6 mt-2">
//                     <Userprofilesidebar></Userprofilesidebar>
//                 </div>
//                 <div className="lg:w-8/12 lg:mr-12 mt-5 mb-20">
//                     <FamilyDropdown title={'Get Vitals For'} />
//                     <div className="lg:flex lg:space-x-10">
//                         <VitalChart data={vitalslistData} />
//                         <div className="lg:w-2/3  ">
//                             <div className="-mb-3">
//                                 <UserTemperature title={'Temperature'} subtitle={'Degree Fahrenheit'} img={temp} data={vitalslistData} temp={true} />
//                             </div>
//                             <div className="w-full flex space-x-7">
//                                 <UserTemperature data={vitalslistData} title={'Heart Rate'} subtitle={'Beats'} img={heart} temp={false} text={(vitalslistData[0]?.heartRate??"")} minText={'beats/min'} />
//                                 <UserTemperature data={vitalslistData} title={'Oxygen'} subtitle={'SPO2'} img={oxy} temp={false} text={(vitalslistData[0]?.spo2??"")+"%"} />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="lg:flex w-full  lg:space-x-10">
//                         <div className="w-full">
//                             <DetailCard heading={'Allergy Details'} location={USERPROFILE_ROUTES.ADD_ALLERGY} data={allergyData}  seeAll={USERPROFILE_ROUTES.SEEALL_ALLERGY}/>
//                         </div>
//                         <div className="lg:w-2/3">
//                             <DetailCard heading={'Health Restriction'} location={USERPROFILE_ROUTES.HEALTHRESTRICTIONS} data={allergyData} seeAll={USERPROFILE_ROUTES.SEEALL_HEALTHRESTRICTION} />
//                         </div>
//                     </div>
//                     <div className="lg:flex w-full  lg:space-x-10">
//                         <div className="w-full">
//                             <DetailCard heading={'Medication'} location={USERPROFILE_ROUTES.MEDICATIONS} data={medicationhistoryData} seeAll={USERPROFILE_ROUTES.SEEALL_MEDICATION}/>
//                         </div>
//                         <div className="lg:w-2/3">
//                             <DetailCard heading={'Medical History'} location={USERPROFILE_ROUTES.ADD_MEDICAL} data={medicationhistoryData} seeAll={USERPROFILE_ROUTES.SEEALL_MEDICALHISTORY} />
//                         </div>
//                     </div>
//                     {/* <div className="lg:flex w-full  lg:space-x-10">
//                         <div className="w-full">
//                             <DetailCard heading={'Memberships'} seeAll={true} code={'CUREWITHCARE50'} text={'Get 50% off on you first Membership Plan'} img={Lady} />
//                         </div>
//                         <div className="lg:w-2/3 lg:mb-0 mb-20">
//                             <DetailCard heading={'Careplan'} data={allergyData} icon={nurse} />
//                         </div>
//                     </div> */}
//                 </div>

//             </div>
//         </>

//     )
// }
// export default Myvitals;

