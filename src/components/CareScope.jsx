import React, { useState, useEffect } from "react";
import Modal from './Modal';
import { Dialog } from "primereact/dialog";
import { Help } from "@mui/icons-material";
import point5 from '../Assets/Images/HIW/Homepage/Point-5.svg';
import Popup from 'reactjs-popup';

import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { Menu } from '@headlessui/react'
import InfoIcon from '@mui/icons-material/Info';

function CareScope() {


    // const [show, setShow] = useState(false)
    const [openFilter1, setOpenFilter1] = useState(false);
    const [openFilter2, setOpenFilter2] = useState(false);
    const [openFilter3, setOpenFilter3] = useState(false);

    // const conditionDetails = {
    //     cold: "Common cold has symptoms like stuffy or runny nose, congestion and sneezing is usually harmless. Flu has the same symptoms but person will also feel feverish, tired and have sore throat. It is recommended to consult doctor if you have flu.",
    //     coldFooter: "You can consult General physicians here",
    //     allergy: "Allergies are human body’s natural reaction to foreign substance and can happen due to food, medicines, pollen etc. Symptoms can be itching, runny nose, watery eyes etc.",
    //     allergyFooter: "You can consult a general physician or an ENT specialist here",
    //     indigestion: "Also called Stomach upset, manifests itself as discomfort in upper abdomen. Its symptoms are nausea, pain in abdomen and feeling full even when before consuming food. This can also be a symptom other digestive diseases.",
    //     indigestionFooter: "Gastroenterologist or General Physicians can be consulted in CureBay",
    //     Fatigue: ""

    // }

    return (
        <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row w-full my-10  justify-center">

            <div onClick={() => setOpenFilter1(true)} className="flex flex-col w-11/12 sm:w-3/5 lg:w-1/4 shadow-lg lg:shadow-2xl mx-auto lg:m-3 py-6 border-t-4 border-blue-500 "  >
                <p className='pl-16 mb-5 mt-5 font-bold text-lg'>EVERYDAY HEALTH</p>

                <div className="flex flex-col justify-start pl-20 w-4/5 text-gray-500 font-medium ">
                    <ol style={{ listStyleType: 'disc' }}>

                        <li className='mb-6'><div className="flex justify-between" >Cold and Flu
                            <Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl   "><h1 className='font-bold  mb-3 text-blue-800'>Cold and Flu</h1>
                                <p className="text-xs">Common cold has symptoms like stuffy or runny nose, congestion and sneezing; it is usually harmless. Flu has the same symptoms but person will also feel feverish,
                                    tired and have sore throat. It is recommended to consult doctor if you have flu.
                                    <br />
                                    You can consult General physicians here.
                                </p></div></Popup>
                        </div></li>

                        <li className='mb-6'><div className="flex justify-between" >Allergies
                            <Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100  customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Allergies </h1>
                                <p className="text-xs">Allergies are human body’s natural reaction to foreign substance and can
                                    happen due to food, medicines, pollen etc. Symptoms can be itching, runny nose,
                                    watery eyes etc.

                                    <br />
                                    You can consult a general physician or an ENT specialist here. </p></div></Popup>
                        </div></li>

                        <li className='mb-6'><div className="flex justify-between" >Indigestion
                            <Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl  "><h1 className='font-bold  mb-3 text-blue-800'>Indigestion </h1>
                                <p className="text-xs">Also called Stomach upset, manifests itself as discomfort in upper abdomen.
                                    Its symptoms are nausea, pain in abdomen and feeling full even
                                    before consuming food. This can also be a symptom of other digestive diseases.
                                    <br />
                                    Gastroenterologist or General Physicians can be consulted in CureBay.
                                </p></div></Popup>
                        </div></li>

                        <li className='mb-6'><div className="flex justify-between" >Fatigue
                            <Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl  "><h1 className='font-bold  mb-3 text-blue-800'>Fatigue </h1>
                                <p className="text-xs">Feeling overtired, very sleepy and low on energy are the common symptoms of fatigue.
                                    Fatigue can be a temporary or chronic and could be result of unhealthy diet, certain
                                    medications or a warning of some serious medical condition.
                                </p></div></Popup>
                        </div></li>

                        <li className='mb-6'><div className="flex justify-between" >Headaches
                            <Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl  "><h1 className='font-bold  mb-3 text-blue-800'>Headaches</h1>
                                <p className="text-xs">Headaches, pain in any part of the head, can happen due to
                                    external reasons like loud noise or temporary problems like lack of sleep.
                                    However headaches can also result from underlying diseases which are yet
                                    to be detected.

                                    <br />
                                    CureBay can help you with consultations with our General Physicians.
                                </p></div></Popup>
                        </div></li>

                        <li className='mb-6'><div className="flex justify-between" >Dizziness
                            <Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl  "><h1 className='font-bold  mb-3 text-blue-800'>Dizziness</h1>
                                <p className="text-xs">Dizziness, feeling light headed,
                                    may not always be due to diseases. It could be due to medication's
                                    side effects or temporary physical conditions.
                                    <br />
                                    Our General Physicians are here to help.
                                </p></div></Popup>
                        </div></li>

                        <li className='mb-6'><div className="flex justify-between" >Urinary Health
                            <Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl  "><h1 className='font-bold  mb-3 text-blue-800'>Urinary Health </h1>
                                <p className="text-xs">Urinary health depends on how well the system works to remove waste and eliminate them through urine.
                                    It can be affected by problems that occur in urinary tract.
                                    <br />
                                    CureBay urologists can help you with urinary health.
                                </p></div></Popup>
                        </div></li>

                        <li className='mb-6'><div className="flex justify-between" >Joint Pain
                            <Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl  "><h1 className='font-bold  mb-3 text-blue-800'>Joint Pain </h1>
                                <p className="text-xs">Pain where two or more bones meet can range from mild to intense.
                                    It could be due to various causes like overuse of joints, sprains etc.
                                    <br />
                                    We have experienced orthopaedists and rheumatologists available for consultation.
                                </p></div></Popup>
                        </div></li>

                        <li className='mb-6'><div className="flex justify-between" >Skin Issues
                            <Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl  "><h1 className='font-bold  mb-3 text-blue-800'>Skin Issues </h1>
                                <p className="text-xs">These are conditions that affect your skin adversely. 
                                It can result in change in skin colour, rashness, itching etc. 
                                Skin issues could be genetic or due to lifestyle.
                                  <br />
                                  Dermatologists in CureBay are some of the best in the industry.
                                </p></div></Popup>
                        </div></li>


                        {/* <li className='mb-6'><div className="flex justify-between" >Stress Management
                            <Popup trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height:"18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Stress Management</h1></div></Popup>
                        </div></li> */}



                        {/* <li className='mb-6'><div className="flex justify-between" >Sexual Health
                            <Popup trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height:"18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Sexual Health </h1></div></Popup>
                        </div></li> */}


                    </ol>

                </div>

            </div>

            <div onClick={() => setOpenFilter2(true)} className="flex flex-col w-11/12 sm:w-3/5 lg:w-1/4 shadow-lg lg:shadow-2xl mx-auto lg:m-3 py-6 border-t-4 border-blue-500 " >
                <p className='pl-16 mb-5 mt-5 font-bold text-lg'>CHRONIC CONDITIONS</p>
                <div className="flex flex-col justify-start pl-20 w-4/5 text-gray-500 font-medium ">
                    <ol style={{ listStyleType: 'disc' }}>

                        <li className='mb-6'><div className="flex justify-between" >High Blood Pressure<Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>High Blood Pressure</h1>
                            <p className="text-xs"> Also called Hypertension, High blood pressure is BP above 140/90. There
                                are no obvious symptoms for this and hence can go untreated until it results
                                in serious health issues. Heart and Kidney takes the brunt of the sustained
                                high blood pressure and it can also lead to stroke.
                                <br />
                                A general physician will be able to make diagnosis while cardiologist and Nephrologist
                                can help you with complications affecting these organs.
                            </p></div></Popup></div></li>

                        <li className='mb-6'><div className="flex justify-between" >Diabetes<Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Diabetes</h1>
                            <p className="text-xs">Diabetes is a group of diseases which result in too much sugar in blood.
                                Unusual weight loss and frequent urination are common symptoms for diabetes.
                                <br />
                                There are different types of diabetes and you can consult some of the best diabetologist here at CureBay.
                            </p></div></Popup></div></li>

                        <li className='mb-6'><div className="flex justify-between" >Heart Disease<Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Heart Disease </h1>
                            <p className="text-xs">Heart disease refers to several types of heart conditions – the most common one is coronary artery disease
                                which affects blood flow to heart resulting in ‘heart attack’. High cholesterol,
                                High BP and smoking are the most common causes and early detection and treatment will help patients.
                                <br />
                                CureBay has a selection of cardiologists who can help you.
                            </p></div></Popup></div></li>

                        <li className='mb-6'><div className="flex justify-between" >Depression and Anxiety<Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Depression and Anxiety </h1>
                            <p className="text-xs">Depression and Anxiety are different conditions that commonly occur together. These are treated using one or more of medications, life style changes and psychotherapy.
                                <br />
                                You can meet our psychiatrists to help with treatment.
                            </p></div></Popup></div></li>

                        <li className='mb-6'><div className="flex justify-between" >Thyroid Disorders<Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Thyroid Disorders</h1>
                            <p className="text-xs">Dysfunction of thyroid gland, most commonly, hypothyroidism 
                            (where sufficient thyroid hormone is not produced) and hyperthyroidism 
                            (where thyroid hormone is over produced) can affect all age groups. It
                             can make people sluggish, sleepy, irritable and cause anxiety depending on
                              specific cases.
                                <br />
                                Endocrinologists in CureBay platform can help you with on-going treatment of thyroid disorders.
                            </p></div></Popup></div></li>

                        <li className='mb-6'><div className="flex justify-between" >Autoimmune Conditions<Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Autoimmune Conditions </h1>
                            <p className="text-xs">Autoimmune diseases happen when body’s immune system attacks its own healthy cells. This can result in a wide variety of diseases from diabetes, psoriasis, arthritis etc.
                                <br />
                                It is hard to distinguish between diseases caused by autoimmune diseases and others and general physician should be the first port of call who can then refer you to specialists if required.
                            </p></div></Popup></div></li>


                        {/* <li className='mb-6'><div className="flex justify-between" >High Cholesterol<Popup trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height:"18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white customPosition border border-blue-100"><h1 className='font-bold  mb-3 text-blue-800'>High Cholesterol</h1></div></Popup></div></li> */}





                        {/* <li className='mb-6'><div className="flex justify-between" >Arthritis and Bone health<Popup trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height:"18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Arthritis and Bone health</h1></div></Popup></div></li> */}
                    </ol>


                </div>

            </div>

            <div onClick={() => setOpenFilter3(true)} className="flex flex-col w-11/12 sm:w-3/5 lg:w-1/4 shadow-lg lg:shadow-2xl mx-auto lg:m-3 py-6 border-t-4 border-blue-500 " >
                <p className='pl-16 mb-5 mt-5 font-bold text-lg'>PREVENTIVE HEALTH</p>
                <div className="flex flex-col justify-start pl-20 w-4/5 text-gray-500 font-medium ">
                    <ol style={{ listStyleType: 'disc' }}>

                        <li className='mb-6'><div className="flex justify-between" >Cancer Screening<Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Cancer Screening</h1>
                            <p className="text-xs">Cancer is a curable disease, contrary to popular perception. Risk from cancer increases the longer one delays diagnosis and it is important that one undergoes regular screenings for various diseases, especially if there is a family history of cancer.
                                <br />
                                The most common types of cancers are breast, lung, Bowel, Prostate, Pancreatic, oral and cervical.
                            </p></div></Popup></div></li>

                        <ol style={{ listStyleType: 'circle' }}>

                            <li className='mb-6 ml-3'><div className="flex justify-between" >Breast Cancer<Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Breast Cancer</h1>
                                <p className="text-xs">Breast cancer is the most common one affecting women and survival rate is very high if detected early. Lump or discharge from breast and change in nipple shape are the common symptoms.  All women above age of 40 are encouraged to undergo screening - Breast self-examination is the first step and any usual growth should be accompanied
                                    by mammography, thermography and MRI.  You can access various labs offering these services here and avail attractive discounts.

                                </p></div></Popup></div></li>

                            <li className='mb-6 ml-3'><div className="flex justify-between" >Lung Cancer<Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Lung Cancer</h1>
                                <p className="text-xs">Frequent cough, often with blood and shortness of breath are common symptoms for lung cancer. Man, experience chest pain, weight loss  and headache. Smokers, ex-smokers and those exposed to passive smoking are vulnerable to lung cancer and are advised to consult general physicians to start with. CureBay has a
                                    number of oncologists who can be consulted at your convenience.

                                </p></div></Popup></div></li>

                            <li className='mb-6 ml-3'><div className="flex justify-between" >Colon Cancer<Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Colon Cancer</h1>
                                <p className="text-xs">Bowel cancer, also called colon cancer, usually start as non-cancerous polyps and can be detected by screening which is recommended for high risk patients. Unhealthy lifestyle combined  with lack of physical activity is a risk factor which increases with age. Change in
                                    bowel habits, blood in stool and weight loss are usual symptoms.
                                </p></div></Popup></div></li>



                            <li className='mb-6 ml-3'><div className="flex justify-between" >Prostate Cancer<Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Prostate Cancer</h1>
                                <p className="text-xs">Affecting prostate, it can grow slowly requiring no treatment or aggressively which will then spread quickly. Common symptoms are trouble urinating, blood in urine and decreased force in urine steam.  Risk increases with age and combined with family history would be a strong indicator to get screening done. Physical
                                    examination and PSA tests are the usual screening mechanisms followed by Ultrasound, MRI and biopsy.
                                    <br />
                                    CureBay has best of the doctors who can help you with diagnosis, Lab partners who can help with conducting various tests at attractive discounts.
                                </p></div></Popup></div></li>
                        </ol>

                        <li className='mb-6'><div className="flex justify-between" >Mental Health<Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Mental Health </h1>
                            <p className="text-xs">Mental health diagnosis has been controversial topic for long and many avoid treatment more because of the public perception and end up suffering for long duration. Mental health treatment is gaining acceptance in recent past.  Most common mental health issues are Personality disorders, Anxiety disorders,  Mood disorders like depression and eating disorders.
                            </p></div></Popup></div></li>

                        <li className='mb-6'><div className="flex justify-between" >Liver Health<Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Liver Health</h1>
                            <p className="text-xs">Liver diseases can be genetic , due to infections or due to lifestyle and can be treated if detected early. They are hard to detect since its symptoms are common to many diseases. Most common symptoms  are chronic fatigue, colour change in stool and urine, jaundice, itchy skin, abdominal pain etc.

                                <br />
                                Blood tests (called liver function tests), Imaging tests ( ultrasound, MRI etc) and biopsy are used to diagnose the liver diseases. Our gastroenterologists can be consulted and recommended lab tests can be arranged right here. </p></div></Popup></div></li>






                        <li className='mb-6'><div className="flex justify-between" >Kidney Health<Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Kidney Health</h1>
                            <p className="text-xs">Kidney function can be affected by various diseases, lifestyle and genetic factors. Most common kidney diseases are Kidney stones, Chronic kidney disease and Glomerulonephritis. Common symptoms are frequent urination especially at night, dry skin, difficulty in concentrating, swollen feet and ankles etc. People
                                with High blood pressure and diabetes are especially vulnerable.
                                <br />
                                Kidney function tests (Urine and blood) , Ultrasound and CT scan and Biopsy are the common tests to diagnose kidney diseases.
                                <br />
                                You can consult CureBay nephrologists at CureBay.
                            </p></div></Popup></div></li>

                        <li className='mb-6'><div className="flex justify-between" >Subtance Abuse Control<Popup contentStyle={{ zIndex: 5 }} trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height: "18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Substance Abuse Control </h1>
                            <p className="text-xs">Interventions to help individuals recover from substance abuse , alcohol and drugs, can help them to abstain completely or reduce the consumption over time. This is often identified by sudden change in behavior and physical health issues.
                                <br />
                                Counseling, withdrawal therapy, Behaviour therapy on their own or in combination with medicine are suggested treatments.
                            </p></div></Popup></div></li>



                        {/* <li className='mb-6'><div className="flex justify-between" >Age-Related and Inherited Risks<Popup trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height:"18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Age-Related and Inherited Risks</h1></div></Popup></div></li> */}

                        {/* <li className='mb-6'><div className="flex justify-between" >Women's and Men's Health<Popup trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height:"18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Women's and Men's Health</h1></div></Popup></div></li> */}
                        {/* <li className='mb-6'><div className="flex justify-between" >Cancer Screening<Popup trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height:"18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Cancer Screening</h1></div></Popup></div></li> */}
                        {/* <li className='mb-6'><div className="flex justify-between" >Nutrition and Exercise Plans<Popup trigger={<InfoIcon className="ml-5 mt-1 cursor-pointer" style={{ marginLeft: "6px", height:"18px", color: "rgb(102, 184, 137)" }} />} position="right center"><div className="bg-white border border-blue-100 customPosition w-48 z-0 p-3 shadow-2xl "><h1 className='font-bold  mb-3 text-blue-800'>Nutrition and Exercise Plans</h1></div></Popup></div></li> */}


                    </ol>

                </div>

            </div>

            {/* <Dialog
header="EVERYDAY HEALTH"
visible={openFilter1}
modal={true}
// style={{ width: "800px", height: 'auto' }}
className="w-11/12 md:w-8/12 lg:w-10/12"
onHide={() => setOpenFilter1(false)}
>
<div className="">
                            <h1 className='font-bold  mb-3 text-blue-800'>Cold and Flu</h1>
                            <p>Common cold has symptoms like stuffy or runny nose, congestion and
                                sneezing is usually harmless. Flu has the same symptoms but person
                                will also feel feverish, tired and have sore throat. It is recommended
                                to consult doctor if you have flu.
                            <br/>

                            </p>

                        </div>
    </Dialog> */}
            {/* <Dialog
                header="EVERYDAY HEALTH"
                visible={openFilter1}
                modal={true}
                // style={{ width: "800px", height: 'auto' }}
                className="w-11/12 md:w-8/12 lg:w-10/12"
                onHide={() => setOpenFilter1(false)}
            >
                <>
                    <div className=" mb-7 mt-4" >
                        <div className="">
                            <h1 className='font-bold  mb-3 text-blue-800'>Cold and Flu</h1>
                            <p>Common cold has symptoms like stuffy or runny nose, congestion and
                                sneezing is usually harmless. Flu has the same symptoms but person
                                will also feel feverish, tired and have sore throat. It is recommended
                                to consult doctor if you have flu.
                            <br/>
                                You can consult General physicians here
                            </p>

                        </div>

                        <div className="mt-7">
                            <h1 className='font-bold  mb-3 text-blue-800'>Allergies </h1>
                            <p>Allergies are human body’s natural reaction to foreign substance and can
                                happen due to food, medicines, pollen etc. Symptoms can be itching, runny nose,
                                watery eyes etc.

                            <br/>
                            You can consult a general physician or an ENT specialist here </p>

                        </div>

                        <div className="mt-7">
                            <h1 className='font-bold  mb-3 text-blue-800'>Indigestion </h1>
                            <p>Also called Stomach upset, manifests itself as discomfort in upper abdomen.
                                Its symptoms are nausea, pain in abdomen and feeling full even when before
                                consuming food. This can also be a symptom other digestive diseases.
                            <br/>
                            Gastroenterologist or General Physicians can be consulted in CureBay
                            </p>
                        </div>

                        <div className="mt-7">
                            <h1 className='font-bold  mb-3 text-blue-800'>Fatigue </h1>
                            <p>Feeling overtired, very sleepy and low on energy are the common symptoms of fatigue.
                                 Fatigue can be a temporary or chronic and could be result of unhealthy diet, certain
                                 medications or a warning of some serious medical condition.
                             </p>
                        </div>

                        <div className="mt-7">
                            <h1 className='font-bold  mb-3 text-blue-800'>Headaches</h1>
                            <p>Headaches, pain in any part of the head can happen due to external reasons like loud noise
                                or temporary problems like lack of sleep. However headaches can also result from underlying
                                 diseases which are yet to be detected.
                                 <br/>
                                 CureBay can help you with consultations with our General Physicians.
                            </p>
                        </div>

                        <div  className="mt-7">
                            <h1  className='font-bold  mb-3 text-blue-800'>Dizziness</h1>
                            <p>Dizziness, feeling light headed, may not always be due to diseases. It could be due to medication
                                side effects or temporary physical conditions.
                                <br/>
                                Our General Physicians are here to help.
                            </p>
                        </div>

                        <div className="mt-7">
                            <h1 className='font-bold  mb-3 text-blue-800'>Urinary health </h1>
                            <p>Urinary health depends on how well the system works to remove waste and eliminate them through urine.
                                It can be affected by problems that occur in urinary tract.
                                <br/>
                                CureBay urologists can help you with urinary health.
                            </p>
                        </div>

                        <div className="mt-7">
                            <h1 className='font-bold  mb-3 text-blue-800'>Joint Pain </h1>
                            <p>Pain where two or more bones meet can range from mild to intense.
                                It could be due to various causes like overuse of joints, sprains etc.
                                <br/>
                                We have experienced orthopaedists and rheumatologists available for consultation.
                            </p>
                        </div>

                        <div className="mt-7 ">
                            <h1 className='font-bold  mb-3 text-blue-800'>Skin Issues </h1>
                            <p>These are conditions that affect your skin adversely. It can results in change in
                                skin colour, rashness, itching etc. Skin issues could be genetic or due to lifestyle.
                                <br/>
                                Dermatologists in CureBay are some of the best in the industry.
                            </p>
                        </div>

                    </div>



                </>
            </Dialog>


            <Dialog
                header="CHRONIC CONDITIONS"
                visible={openFilter2}
                modal={true}
                // style={{ width: "800px", height: 'auto' }}
                className="w-11/12 md:w-8/12 lg:w-10/12"
                onHide={() => setOpenFilter2(false)}
            >
                <>
                    <div className=" mb-7 mt-4" >
                        <div className="">
                            <h1 className='font-bold  mb-3 text-blue-800'>High Blood Pressure</h1>
                            <p> Also called Hypertension, High blood pressure is BP above 140/90. There
                                are no obvious symptoms for this and hence can go untreated until it results
                                 in serious health issues. Heart and Kidney takes the brunt of the sustained
                                  high blood pressure and it can also lead to stroke.
                            <br/>
                            A general physician will be able to make diagnosis while cardiologist and Nephrologist
                             can help you with complications affecting these organs.
                            </p>

                        </div>

                        <div className="mt-7">
                            <h1 className='font-bold  mb-3 text-blue-800'>Diabetes</h1>
                            <p>Diabetes is a group of diseases which result in too much sugar in blood.
                                 Unusual weight loss and frequent urination are common symptoms for diabetes.
                            <br/>
                            There are different types of diabetes and you can consult some of the best diabetologist here at CureBay.
                            </p>

                        </div>

                        <div className="mt-7">
                            <h1 className='font-bold  mb-3 text-blue-800'>Heart Disease </h1>
                            <p>Heart disease refers to several types of heart conditions – the most common one is coronary artery disease
                                which affects blood flow to heart resulting in ‘heart attack’. High cholesterol,
                                 High BP and smoking are the most common causes and early detection and treatment will help patients.
                            <br/>
                            CureBay has a selection of cardiologists who can help you.
                            </p>
                        </div>

                        <div className="mt-7">
                            <h1 className='font-bold  mb-3 text-blue-800'>Depression and Anxiety </h1>
                            <p>Dysfunction of thyroid gland, most commonly,  hypothyroidism ( where sufficient thyroid hormone is not produced)
                                 and hyperthyroidism ( where thryroid hormone is over produced )  can affect all age groups. It can people
                                 sluggish, sleepy, irritable and cause anxiety depending on specific cases.
                                 <br/>
                                 Endocrinologists in CureBay platform can help you with on-going treatment of thyroid disorders.
                             </p>
                        </div>

                        <div className="mt-7">
                            <h1 className='font-bold  mb-3 text-blue-800'>Autoimmune Conditions </h1>
                            <p>Cancer is a curable disease, contrary to popular perception. Risk  from cancer increases the longer one delays
                                diagnosis and it is important that one undergoes regular screenings for various diseases, especially
                                 if there is a family history of cancer.
                                 <br/>
                                 The most common types of cancers are breast, lung, Bowel, Prostate, Pancreatic, oral and cervical.
                            </p>
                        </div>

                        <div  className="mt-7">
                            <h1  className='font-bold  mb-3 text-blue-800'>Breast cancer </h1>
                            <p>Breast cancer is the most common one affecting women and survival rate is very high if detected early.
                                 Lump or discharge from breast and change in nipple shape are the common symptoms.
                                  All women above age of 40 are encouraged to undergo screening - Breast self-examination
                                  is the first step and any usual growth should be accompanied by mammography, thermography and MRI.
                                   You can access various labs offering these services here and avail attractive discounts.
                            </p>
                        </div>

                        <div className="mt-7">
                            <h1 className='font-bold  mb-3 text-blue-800'>Lung cancer </h1>
                            <p>Frequent cough, often with blood and shortness of breath are common symptoms for lung cancer. Man, experience
                                 chest pain, weight loss  and headache. Smokers, ex-smokers and those exposed to passive smoking are
                                 vulnerable to lung cancer and are advised to consult general physicians to start with. CureBay has a
                                 number of oncologists who can be consulted at your convenience.
                            </p>
                        </div>

                        <div className="mt-7">
                            <h1 className='font-bold  mb-3 text-blue-800'>Colon cancer </h1>
                            <p>Bowel cancer, also called colon cancer, usually start as non-cancerous polyps and can be detected by screening
                                which is recommended for high risk patients. Unhealthy lifestyle combined  with lack of physical activity
                                is a risk factor which increases with age. Change in bowel habits, blood in stool and weight loss are usual
                                 symptoms.
                            </p>
                        </div>

                        <div className="mt-7 ">
                            <h1 className='font-bold  mb-3 text-blue-800'>Prostate cancer </h1>
                            <p>Affecting prostate it can grow slowly requiring no treatment or aggressively which will then spread quickly.
                                Common symptoms are trouble urinating, blood in urine and decreased force in urine steam.
                                Risk increases with age  and combined with family history would be a strong indicator to get
                                screening done. Physical examination and PSA tests are the usual screening mechanisms followed
                                by Ultrasound, MRI and biopsy.
                                <br/>
                                CureBay has best of the doctors who can help you with diagnosis, Lab partners who can help
                                with conducting various tests at attractive discounts.
                            </p>
                        </div>

                    </div>



                </>
            </Dialog>

            <Dialog
                header="PREVENTIVE HEALTH"
                visible={openFilter3}
                modal={true}
                // style={{ width: "800px", height: 'auto' }}
                className="w-11/12 md:w-8/12 lg:w-10/12"
                onHide={() => setOpenFilter3(false)}
            >
                <>
                    <div className=" mb-7 mt-4" >
                        <div className="">
                            <h1 className='font-bold  mb-3 text-blue-800'>Mental Health </h1>
                            <p>Mental health diagnosis has been controversial topic for long and many avoid treatment more because of the public perception and end up suffering for long duration. Mental health treatment is gaining acceptance in recent past.  Most common mental health issues are Personality disorders, Anxiety disorders,  Mood disorders like depression and eating disorders.
                            </p>

                        </div>

                        <div className="mt-7">
                            <h1 className='font-bold  mb-3 text-blue-800'>Liver Health </h1>
                            <p>Liver diseases can be genetic , due to infections or due to lifestyle and can be treated if detected early. They are hard to detect since its symptoms are common to many diseases. Most common symptoms  are chronic fatigue, colour change in stool and urine, jaundice, itchy skin, abdominal pain etc.

                            <br/>
                            Blood tests (called liver function tests), Imaging tests ( ultrasound, MRI etc) and biopsy are used to diagnose the liver diseases. Our gastroenterologists can be consulted and recommended lab tests can be arranged right here. </p>

                        </div>

                        <div className="mt-7">
                            <h1 className='font-bold  mb-3 text-blue-800'>Kidney Health </h1>
                            <p>Kidney function can be affected by various diseases, lifestyle and genetic factors. Most common kidney diseases are Kidney stones, Chronic kidney disease and Glomerulonephritis. Common symptoms are frequent urination especially at night, dry skin, difficulty in concentrating, swollen feet and ankles etc. People with High blood pressure and diabetes are especially vulnerable.
                            <br/>
                            Kidney function tests (Urine and blood ) , Ultrasound and CT scan and Biopsy are the common tests to diagnose kidney diseases.
                            <br/>
                            You can consult CureBay nephrologists at CureBay.
                            </p>
                        </div>

                        <div className="mt-7">
                            <h1 className='font-bold  mb-3 text-blue-800'>Substance abuse control </h1>
                            <p>Interventions to help individuals recover from substance abuse , alcohol and drugs, can help them to abstain completely or reduce the consumption over time.  This is often identified by sudden change in behavior and physical health issues.
                                <br/>
                                Counseling, withdrawal therapy, Behaviour therapy on their own or in combination with medicine are suggested treatments.
                             </p>
                        </div>


                    </div>



                </>
            </Dialog> */}

        </div>
    )
}

export default CareScope
