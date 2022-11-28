import React from 'react'
import bloodtest from '../Assets/Images/Bloodtest.svg';
import info from '../Assets/Images/info.svg';
import tube from '../Assets/Images/tube.svg';
import injection from '../Assets/Images/injec.svg';
import arrow from '../Assets/Images/arrow.forward.svg';
import {  useLocation } from 'react-router-dom';
import { useState } from 'react';
import Slots from './Diagnostisc_Slot';
import FrequentlybookPathologytest from './FrequentlybookPathologytest';
import LabTestModal from './labtestNameModal';

function CompletebloodCounttest() {
    const location = useLocation();
    const [isOpen, setOpen] = useState(false);
    const { state } = location;
    return (
        <>
            <div className="">
                {/* breadcrumbs */}
                <ul className="flex text-brand-secondary text-sm lg:text-base  pt-5">
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
                        <a href="/diagnosis">Lab Test</a>
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
                        <a href="">{state?.name}</a>
                    </li>
                </ul>

                <br />
                <div className="bg-white lg:flex lg:justify-center lg:rounded-lg my-2">
                    <div className="lg:w-full mx-5">
                        <p className="py-4 text-lg font-medium textgray-700">{state?.name}</p>
                        <div className="lg:flex ">
                            <div className="lg:w-2/12 py-2">
                                <div className="w-44 h-44 rounded-md bg-yellow-100 p-6">
                                    <img src={bloodtest} alt="bloodtest" className="w-24" />
                                </div>
                            </div>
                            <div className="py-2 lg:w-full mx-3">
                                <div className="mr-40">
                                    <p className="text-base text-gray-600">Lifestyle disorders like diabetes, high blood pressure, heart problems are emerging as a major health concern amongst the young Indians. One in every ten Indian is overweight or obese, with increases the risk of developing these problems at very young age.
                                        &nbsp;<span className="text-base font-medium text-brand-secondary">Read More</span>
                                    </p>
                                </div>
                                <div className="mt-2 flex space-x-3">
                                    <img src={info} className="h-6" alt="info" />
                                    <p className="text-sm  text-gray-400">Fasting for 12 hrs before test</p>
                                </div>
                                <div className="mt-2 flex space-x-3">
                                    <img src={injection} className="h-6" alt="injection" />
                                    <p className="text-sm  text-gray-400">{state?.children.length} Tests</p>
                                    <img onClick={() => setOpen(true)} src={arrow} className="h-6" alt="arrow" />
                                </div>
                                <div className="flex justify-between">
                                    <div className="mt-2 w-full flex space-x-3">
                                        <img src={tube} className="h-6" alt="info" />
                                        <p className="text-sm  text-gray-400">Reports ready in 36hrs</p>
                                    </div>
                                    <div className="flex w-full space-x-6 justify-end">
                                        <div>
                                            <p className="line-through text-xs text-gray-400 ">₹ 3,900</p>
                                            <p className="text-lg text-brand-secondary font-medium">₹ 3,000</p>
                                        </div>
                                        <button className="bg-brand-secondary text-white  py-2 px-10 rounded">Book Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="mt-5"></hr>
                        <Slots />
                    </div>
                </div>
                <FrequentlybookPathologytest text={'Similar Packages'} />
                {isOpen ?
                    <LabTestModal open={isOpen} onClose={() => { setOpen(false) }} data={state?.children} />
                :''}
            </div>
        </>
    );
}
export default CompletebloodCounttest;