import React from 'react'
import right from '../Assets/Images/right.svg';
import left from '../Assets/Images/left.svg';
import diagno from '../Assets/Images/prescription.svg';
import report from '../Assets/Images/tube.svg';
import injection from '../Assets/Images/injection.svg';
import homepage from '../Assets/Images/homepage.svg';
import location from '../Assets/Images/Locationh.svg';
import checkmark from '../Assets/Images/checkmark.svg';


function RecommendedAddons() {
  return (
    <>
      <div className="w-full px-16 pt-5 ">
        <p className="text-xl font-medium text-gray-700">Recommended Addons</p>
        {/* <div className="flex justify-between">
          <p className="text-sm text-gray-400">Some recent and most booked tests by our users</p>
          <div className="flex pb-3">
            <p className="text-sm text-brand-primary font-medium pt-1">See all Specialities</p>
            <div className="flex pl-6">
              <img src={right} alt="right arrow" />
              <img src={left} alt="right left" className="pl-6" />
            </div>
          </div>
        </div> */}
        <div className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {/* <!--Card 1--> */}
          <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200">

            <div className="px-6 py-4">
              <div className="font-medium   text-base mb-2">
                  <div className="flex justify-between">
                <p className="text-lg  text-gray-800">Liver Function Test</p>
                <div className="w-7 h-7 rounded-full bg-green-100 p-1">
                <img src={diagno} alt="prescription"/>
                </div>
                </div>
                <p className="text-sm  text-gray-600 pt-3">
                Known as COVID-19 virus qualititative PCR throat swab.
                &nbsp;<span className="text-xs font-medium text-brand-secondary">Read More</span>
                </p>
              </div>
        
            </div>
            <div className="px-6 pt-2 pb-2 float-right space-x-4">
            
              <button className="bg-brand-secondary font-normal text-white py-2 px-4 rounded-lg">Add</button>
            </div>
          </div>

          {/* <!--Card 2--> */}
          <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200">

            <div className="px-6 py-4">
              <div className="font-medium   text-base mb-2">
                  <div className="flex justify-between">
                <p className="text-lg  text-gray-800">Liver Function Test</p>
                <div className="w-7 h-7 rounded-full bg-green-100 p-1">
                <img src={diagno} alt="prescription"/>
                </div>
                </div>
                <p className="text-sm  text-gray-600 pt-3">
                Known as COVID-19 virus qualititative PCR throat swab.
                &nbsp;<span className="text-xs font-medium text-brand-secondary">Read More</span>
                </p>
              </div>
        
            </div>
            <div className="px-6 pt-2 pb-2 float-right space-x-4">
            
              <button className="bg-brand-secondary font-normal text-white py-2 px-4 rounded-lg">Add</button>
            </div>
          </div>


          {/* <!--Card 3--> */}
          <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200">

            <div className="px-6 py-4">
              <div className="font-medium   text-base mb-2">
                  <div className="flex justify-between">
                <p className="text-lg  text-gray-800">Liver Function Test</p>
                <div className="w-7 h-7 rounded-full bg-green-100 p-1">
                <img src={diagno} alt="prescription"/>
                </div>
                </div>
                <p className="text-sm  text-gray-600 pt-3">
                Known as COVID-19 virus qualititative PCR throat swab.
                &nbsp;<span className="text-xs font-medium text-brand-secondary">Read More</span>
                </p>
              </div>
        
            </div>
            <div className="px-6 pt-2 pb-2 float-right space-x-4">
            
              <button className="bg-brand-secondary font-normal text-white py-2 px-4 rounded-lg">Add</button>
            </div>
          </div>
</div>

      </div>
    </>
  );
}
export default RecommendedAddons;