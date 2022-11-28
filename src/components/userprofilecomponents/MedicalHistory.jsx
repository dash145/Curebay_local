import React, { useState, useEffect } from 'react'
import Userprofilesidebar from '../userprofilesidebar';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FamilyDropdown from './FamilyDropDown';
import DetailCard from '../../components/userprofilecomponents/DetailCard';
import userprofileservice from "../../Redux/services/userprofileservice";
import Patientprofileupbar from "./Patientprofileupbar";
import {
    getmedicalhistory,
    getPatientallergylist,
    getPatientmedicationlist, getsurgicalhistory, getfamilyhistory, getsocialhistory, getchronicconditions, getpatientchronicconditions
} from "../../Redux/Actions/UserprofileActions";

import { USERPROFILE_ROUTES } from '../../application/Router/constants/UserProfileRoutes';
import HealthRecordService from "../../Redux/services/HealthRecordService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style1-custom.css"

import {getLocalTime} from '../../Assets/utils/LocalTimeFormat'


const MedicalHistory = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const patientallergylist = useSelector((state) => state.allergylist);
    const { allergyData } = patientallergylist;

    const [check, setCheck] = useState(true);

    const medicationlist = useSelector((state) => state.allmedicationlist);
    const { medicationData } = medicationlist;

    const medicalhitorylist = useSelector((state) => state.allmedicalhistorylist);
    const { medicalhistoryData } = medicalhitorylist;

    const surgicalhistorylist = useSelector((state) => state.allsurgicalhistorylist);
    const { surgicalhistoryDataList } = surgicalhistorylist;

    const familyhistorylist = useSelector((state) => state.allfamilyHistoryList);
    const { familyhistoryDataList } = familyhistorylist;

    const socialhistoryData = useSelector((state) => state.allsocialHistoryList);
    const { socialhistoryDataList } = socialhistoryData;

    const chronicconditionsData = useSelector((state) => state.allchronicConditionsList);
    const { chronicconditionsDataList } = chronicconditionsData;

    const [saveChronicConditionsLoading, setsaveChronicConditionsLoading] = useState(false);

    const [activePatient, setActivePatient] = useState();

    const [selectedChronicConditions, setSelectedChronicConditions] = useState([]);

    const [selectedChronics, setSelectedChronics] = useState([]);

    const patientCode = useSelector(state => state.authReducer.patientCode);
    const patientDetails = useSelector((state) => state.particularpatientdetails);

    

    

    const refresh = () => {
        //getMedicalHistoryFunc();
        if (activePatient) {
            loadMedicalHistoryFor(activePatient)
        } else {
            getMedicalHistoryFunc();
        }
    }

    const getMedicalHistoryFunc = () => {
        let patient = patientCode;
        dispatch(getPatientallergylist(patient));
        dispatch(getPatientmedicationlist(patient));
        dispatch(getmedicalhistory(patient));
        dispatch(getsurgicalhistory(patient));
        dispatch(getfamilyhistory(patient));
        dispatch(getsocialhistory(patient));
        dispatch(getchronicconditions());
        loadPatientChronicConditions(patient);
        //dispatch(getpatientchronicconditions(patient));
    };


    const loadMedicalHistoryFor = (patient) => {
        setActivePatient(patient);
        dispatch(getPatientallergylist(patient));
        dispatch(getPatientmedicationlist(patient));
        dispatch(getmedicalhistory(patient));
        dispatch(getsurgicalhistory(patient));
        dispatch(getfamilyhistory(patient));
        dispatch(getsocialhistory(patient));
        dispatch(getchronicconditions());
        loadPatientChronicConditions(patient);
    }

    const loadPatientChronicConditions = (patient) => {
        userprofileservice.getpatientchronicconditionslist(patient).then((res) => {
            if (!res.message) {
                console.log(res.data);
                let array = [];
                res.data.forEach(element => {
                    if (element.status == 1) {
                        array.push(element);
                    }
                });
                setSelectedChronicConditions([...array]);
                console.log(selectedChronicConditions);
            }
        }, (err) => {
            console.log(err);
        })
    }

    useEffect(() => { console.log(selectedChronicConditions) }, [selectedChronicConditions])

    useEffect(() => {
        setActivePatient(patientCode);
    }, [dispatch]);

    useEffect(() => {
        //getMedicalHistoryFunc();
        // loadSocialHistory();
    }, [patientDetails.memberCode, localStorage.getItem("patientprofile")]);

    useEffect(() => {
        getMedicalHistoryFunc();
    }, []);

    const saveChronicConditions = () => {
        setsaveChronicConditionsLoading(true);
        let payload = selectedChronicConditions;
        console.log(JSON.stringify(payload));
        HealthRecordService.addpatientchronicconditionslist(payload).then((res) => {
            setsaveChronicConditionsLoading(false)
            if (res.data == 1) {
                toast("Chronic Conditions Added Successfully");
            }
        }, (err) => {
            setsaveChronicConditionsLoading(false)
            console.log(err);
        })
    }

    const changePatient = (code) => {
        //loadPatientChronicConditions
    }

    const gotoHistory = (e) => {
        e.preventDefault();
        history.push(USERPROFILE_ROUTES.MYDETAILS)
    }
    return (
        <>
            <ToastContainer />
            <Patientprofileupbar></Patientprofileupbar>
            <ul class="lg:flex hidden text-brand-secondary  text-sm lg:text-base mb-2">
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
                    <a>Medical History</a>

                    <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                    ></path>

                </li>


            </ul>
            <br />
            <div className="flex justify-between -mt-14 md:mt-0" style={{ background: "#F8F8F8" }}>
                <div className="lg:block hidden lg:w-3/12 w-full ml-6 mt-3">
                    <Userprofilesidebar></Userprofilesidebar>
                </div>

                <div className="lg:w-8/12 w-full lg:mr-16">
                    <p className="font-bold text-2xl text-gray-800 ml-3 md:ml-0 mt-5 mb-4 md:mb-0">Medical History</p>

                    <div className="bg-white   lg:mt-6 lg:px-7 border">

                        <div className='flex justify-between  lg:items-center items-start mx-4 md:mx-0'>
                            <FamilyDropdown title={"Get Medical History For"} onSelect={loadMedicalHistoryFor} hide={true} />

                            <div className='hidden sm:block lg:mt-0 mt-2'>
                                <button className="text-black text-xs font-semibold p-2 px-8" style={{ borderRadius: "5px", border: "1px solid #262626" }} onClick={(e) => { gotoHistory(e) }}>Go Back</button>
                            </div>

                        </div>

                        <div className="lg:flex w-full md:space-x-4 lg:space-x-8">
                            <div className="w-full">
                                <DetailCard
                                    patient={activePatient}
                                    heading={"Allergy Details"}
                                    //data={[]}
                                    data={allergyData}
                                    seeAll={USERPROFILE_ROUTES.SEEALL_ALLERGY}
                                    location={USERPROFILE_ROUTES._ADD_ALLERGY}
                                    loadData={() => { refresh() }}
                                />
                            </div>
                            <div className="lg:w-full">
                                <DetailCard
                                    patient={activePatient}
                                    heading={"Medical History"}
                                    data={medicalhistoryData}
                                    seeAll={USERPROFILE_ROUTES.SEEALLMEDICALHISTORY}
                                    location={USERPROFILE_ROUTES.ADDMEDICALHISTORY}
                                    loadData={() => { refresh() }}
                                />
                            </div>
                        </div>
                        <div className="lg:flex lg:ml-4 xl:ml-0 w-full  lg:space-x-8">
                            <div className="w-full">
                                <DetailCard
                                    patient={activePatient}
                                    heading={"Surgical History"}
                                    data={surgicalhistoryDataList}
                                    location={USERPROFILE_ROUTES._ADD_ALLERGY}
                                    seeAll={USERPROFILE_ROUTES.SEEALLSURGICALHISTORY}
                                    loadData={() => { refresh() }}
                                />
                            </div>
                            <div className="lg:w-full">
                                <DetailCard
                                    patient={activePatient}
                                    heading={"Family History"}
                                    data={familyhistoryDataList}
                                    location={USERPROFILE_ROUTES.ADDMEDICALHISTORY}
                                    seeAll={USERPROFILE_ROUTES.SEEALLFAMILYHISTORY}
                                    loadData={() => { refresh() }}
                                />
                            </div>
                        </div>

                        <div className="lg:flex w-full lg:ml-4 xl:ml-0 lg:space-x-8">
                            <div className="w-full">
                                <DetailCard
                                    patient={activePatient}
                                    heading={"Social History"}
                                    data={socialhistoryDataList}
                                    location={USERPROFILE_ROUTES.ADDMEDICALHISTORY}
                                    seeAll={USERPROFILE_ROUTES.SEEALLSOCIALHISTORY}
                                    loadData={() => { refresh() }}
                                />
                            </div>


                            <div className="w-full">
                                <DetailCard
                                    patient={activePatient}
                                    heading={'Medication'}
                                    data={medicationData}
                                    location={USERPROFILE_ROUTES.MEDICATIONS}
                                    seeAll={USERPROFILE_ROUTES.SEEALLMEDICATION}
                                    loadData={() => { refresh() }} />
                            </div>
                        </div>

                        <div className="lg:flex w-full lg:ml-4 xl:ml-0 lg:space-x-8">
                            <div className="w-full">
                                <DetailCard
                                    patient={activePatient}
                                    heading={"Chronic Conditions"}
                                    data={selectedChronicConditions}
                                    seeAll={USERPROFILE_ROUTES.SEEALL_ALLERGY}
                                    location={USERPROFILE_ROUTES._ADD_ALLERGY}
                                    loadData={() => { refresh() }}
                                />
                            </div>
                            <div className="w-full"></div>
                        </div>

                        <div className="lg:flex w-full  lg:space-x-8">
                            <div className="w-full">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MedicalHistory;
