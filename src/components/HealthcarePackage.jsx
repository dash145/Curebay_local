import React from 'react'
import right from '../Assets/Images/right.svg';
import left from '../Assets/Images/left.svg';
import rooms1 from '../Assets/Images/room1.svg';
import star from '../Assets/Images/starr.svg';
import checkmark from '../Assets/Images/checkmark.svg';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getHealthcarepackagesList } from '../Redux/Actions/packages';
import { useEffect } from 'react'
import SectionContainer from './SectionContainer';

function HealthcarePackage() {


  const dispatch = useDispatch();
  const healthcarepackagelist = useSelector((state) => state.healthcarepackagelist);
  const { packageList } = healthcarepackagelist;


  useEffect(() => {

    dispatch(getHealthcarepackagesList())
  }, [
    dispatch
  ]);

  return (
    <>
      <div className="w-full pt-10 px-3">
        <SectionContainer title={'Recommended Healthcare Packages'} subtitle={'See some Recommended Hospitals'} seeAll={'Packages'} />
        <div className="w-full lg:max-w-full lg:flex ">
          <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
          {/*<div className="px-10 grid lg:grid-cols-1 flex no-wrap lg:grid-cols-3  gap-5">*/}
          <div className="lg:flex hidden flex-nowrap space-x-8">
            {/* <div className="flex flex-nowrap lg:ml-10 md:ml-20 ml-10  space-x-6"> */}
            {packageList.slice(0, 3).map((pac, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-sm border border-gray-200">
                <div className="px-6 py-4">
                  <div className="font-medium text-gray-600   text-base mb-2">
                    <p className="">{pac.name}</p>
                    <p className="font-normal text-gray-500  text-sm ">Meant for people who want to get regular reports to prevent/check their diabetes levels.</p>
                  </div>
                  <div className="mt-2 border-t border-b"></div>
                  <div className="flex py-2 pt-4">
                    <img src={checkmark} alt="checkmark" />
                    <p className="text-brand-secondary text-base font-medium  pl-6">{pac.description}</p>
                  </div>
                  <div className="flex py-2 ">
                    <img src={checkmark} alt="checkmark" />
                    <p className="text-brand-secondary text-base font-medium  pl-6">Lab Tests and Radiology Scans</p>
                  </div>
                  <div className="flex py-2">
                    <img src={checkmark} alt="checkmark" />
                    <p className="text-brand-secondary text-base font-medium  pl-6">Operation</p>
                  </div>
                  <div className="flex py-2">
                    <img src={checkmark} alt="checkmark" />
                    <p className="text-brand-secondary text-base font-medium  pl-6">Follow up Consultation</p>
                  </div>
                  <div className="flex py-2">
                    <img src={checkmark} alt="checkmark" />
                    <p className="text-brand-secondary text-base font-medium  pl-6">General medication needed</p>
                  </div>
                  <div className="mt-2 border-t border-b"></div>

                </div>
                <div className="lg:flex px-6 pt-2 pb-2  justify-between">
                  <p className="text-green-500 lg:font-medium my-2 font-semibold  lg:text-sm text-lg">Charges: ₹{pac.amount}</p>
                  <button className="lg:w-2/5 w-full bg-brand-secondary font-medium text-white py-2 px-4 rounded-lg">View Package</button>
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
export default HealthcarePackage;