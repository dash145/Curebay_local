import React from 'react'
import right from '../Assets/Images/right.svg';
import left from '../Assets/Images/left.svg';
import diagno from '../Assets/Images/prescription.svg';
import report from '../Assets/Images/tube.svg';
import injection from '../Assets/Images/injection.svg';
import homepage from '../Assets/Images/homepage.svg';
import location from '../Assets/Images/Locationh.svg';
import SectionContainer from './SectionContainer';
import { getHealthcarepackagesList } from '../Redux/Actions/packages';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function DiagnosticsHealthpackages() {

  const dispatch = useDispatch();
  const healthcarepackagelist = useSelector((state) => state.healthcarepackagelist);
  const { packageList } = healthcarepackagelist;
  useEffect(() => {
    dispatch(getHealthcarepackagesList())
  }, [
    dispatch
  ]);

  console.log("packageList",packageList)

  return (
    <>
      <br />
      <div className="flex flex-col  ml-4 p-auto">
        <SectionContainer title={'Recommended Health Packages'} subtitle={'See some of the recommended health packages'} seeAll={'Packages'} />
        <div className="w-full lg:max-w-full flex ">
          <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
            <div className="flex  flex-nowrap  space-x-4">
              {[...Array(3)].map((data, i) => (
                <div className="p-4 bg-white border border-gray-100 shadow-sm lg:rounded-lg rounded-2xl m-auto h-auto lg:h-auto w-96 flex-none bg-cover overflow-hidden">
                  <div className="flex justify-between">
                    <p className="lg:text-base text-xl  font-medium  text-gray-primary">Diabetic Checkup</p>
                    <div className="w-7 h-7 rounded-full bg-green-100 p-1">
                      <img src={diagno} alt="prescription" />
                    </div>
                  </div>
                  <p className="lg:text-sm text-lg   text-primary-secondary">Meant for people who want to get regular <br /> reports to prevent/check their diabetes levels.</p>

                  <div className="lg:flex justify-between pt-2">
                    <div className="flex mt-2">
                      <img src={report} alt="report" />
                      <p className="lg:text-sm text-md  pl-2 text-gray-500">Reports ready in 36hrs</p>
                    </div>
                    <div className="flex mt-2">
                      <img src={injection} alt="injection" />
                      <p className="lg:text-sm text-md  pl-2 text-gray-500">49 Tests</p>
                    </div>
                  </div>
                  <div className="flex mt-2">
                    <img src={homepage} alt="home" />
                    <p className="lg:text-sm text-md  pl-2 text-gray-500">Home Sample Collection Available</p>
                  </div>
                  <div className="lg:flex justify-between">
                    <div className="flex mt-2">
                      <img src={location} alt="location" className="w-5 pl-1" />
                      <p className="lg:text-sm text-md  pl-3 text-gray-500">Lal Pathology + 2</p>
                    </div>
                    <p className="text-green-500 font-medium  lg:text-sm text-lg mt-2">Charges: ₹840</p>
                  </div>
                  <div className="mt-2 lg:border-t "></div>

                  <div className="lg:flex hidden pt-2 float-right space-x-4">
                    <button className="bg-transparent  text-brand-secondary font-medium hover:text-white py-2 px-4 border border-brand-secondary hover:border-transparent rounded-xl">Know more</button>
                    <button className="bg-brand-secondary font-medium text-white py-2 px-4 rounded-xl">Book Now</button>
                  </div>
                  <div className="lg:hidden justify-between text-center pt-2 w-full">
                    <button className="text-white w-full bg-brand-secondary font-medium text-md hover:text-white py-3 px-4 border border-brand-secondary hover:border-transparent rounded-xl">Add to cart</button>
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
export default DiagnosticsHealthpackages;