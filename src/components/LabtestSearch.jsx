import React from 'react'
import bloodtest from '../Assets/Images/Bloodtest.svg';
import info from '../Assets/Images/info.svg';
import tube from '../Assets/Images/tube.svg';
import injection from '../Assets/Images/injec.svg';
import arrow from '../Assets/Images/arrow.forward.svg';
import home from '../Assets/Images/homepage.svg';
import filter from '../Assets/Images/filter.svg';
import sort from '../Assets/Images/sort.svg';

function LabtestSearch() {
    return (
      <>

    <div className="bg-gray-100 lg:py-12 lg:flex lg:justify-center">
   
        <div className="bg-white lg:mx-8 lg:w-full lg:shadow-lg lg:rounded-lg ">
            <div className="flex float-right space-x-4 pr-5 pt-2"> 
            <div className="flex">
        <img src={filter} alt="filter"/>&nbsp;&nbsp;
        <p>Filter</p>
        </div>
        <div className="flex pl-3">
        <img src={sort} alt="sort"/>&nbsp;&nbsp;
        <p>Sort</p>
        </div>
        </div>
        <br/><br/>
        <hr/>
            <div className="lg:mx-8 lg:flex ">
            <div className="lg:w-58 py-6  ">
                <div className="w-32 h-36 rounded-md bg-red-100 p-6">
                <img src={bloodtest} alt="bloodtest" className="w-16 "/>
                </div>
            </div>
            <div className="py-6 lg:w-11/12 pl-4">
                <div className="flex justify-between">
                <p className="text-base text-gray-600 ">Vitamin D - UltraSenstive
                </p>
                <div className="w-44 h-5 rounded-full bg-red-500">
                <p className="text-white text-sm pl-3">Reports ready in 36hrs </p>
                </div>
                </div>
                 <div className="mt-2 flex space-x-3">
                     <img src={info} alt="info"/>
                     <p className="text-sm  text-gray-400">Fasting for 12 hrs before test</p>
                 </div>
                 <div className="mt-2 flex space-x-3">
                     <img src={injection} alt="injection"/>
                     <p className="text-sm  text-gray-400 pt-1">25 Tests</p>
                     <img src={arrow} alt="arrow" className="pt-1"/>
                 </div>
                
                 <div className="mt-2 flex space-x-3">
                     <img src={tube} alt="info" className="w-6"/>
                     <p className="text-sm  text-gray-400 pt-2">Reports ready in 36hrs</p>
                 </div>
                 <div className="mt-2 flex space-x-3">
                     <img src={home} alt="home" className="w-6"/>
                     <p className="text-sm  text-gray-400 pt-2">Reports ready in 36hrs</p>
                 </div>
                
                 {/*   */}
            </div>
            
            </div>
            <hr className="lg:mx-8"/>
            <div className="lg:mx-8 lg:flex ">
               
            <div className="lg:w-58 py-3 px-16 ">
                <p></p>
                </div>

                <div className="py-6 lg:w-11/12 ">
            <div className="flex justify-between py-2">
                     <div className="flex ">
                 
                 <p className=" text-xs text-gray-400 pt-1">Charges:   </p>
                 <p className="text-lg text-gray-600 font-medium pl-2">₹ 8000.00</p>
                 <p className="line-through text-xs text-gray-400 pt-1 pl-2">₹ 250.00</p>
                 </div>
                 <div className="space-x-6">
                 <button className="bg-transparent hover:bg-brand-secondary text-brand-secondary font-medium hover:text-white py-2 px-4 border border-brand-secondary hover:border-transparent rounded">
                 View Details
                    </button>
                 <button className="bg-brand-secondary text-white  py-2 px-4 rounded">Book Now</button>
                 </div>

                </div>      
                 </div>
 
 </div>

        <hr/>
        {/* 2nd search */}
        <div className="lg:mx-8 lg:flex ">
            <div className="lg:w-58 py-6  ">
                <div className="w-32 h-36 rounded-md bg-red-100 p-6">
                <img src={bloodtest} alt="bloodtest" className="w-16 "/>
                </div>
            </div>
            <div className="py-6 lg:w-11/12 pl-4">
                <div className="flex justify-between">
                <p className="text-base text-gray-600 ">Vitamin D - UltraSenstive
                </p>
                <div className="w-44 h-5 rounded-full bg-red-500">
                <p className="text-white text-sm pl-3">Reports ready in 36hrs </p>
                </div>
                </div>
                 <div className="mt-2 flex space-x-3">
                     <img src={info} alt="info"/>
                     <p className="text-sm  text-gray-400">Fasting for 12 hrs before test</p>
                 </div>
                 <div className="mt-2 flex space-x-3">
                     <img src={injection} alt="injection"/>
                     <p className="text-sm  text-gray-400 pt-1">25 Tests</p>
                     <img src={arrow} alt="arrow" className="pt-1"/>
                 </div>
                
                 <div className="mt-2 flex space-x-3">
                     <img src={tube} alt="info" className="w-6"/>
                     <p className="text-sm  text-gray-400 pt-2">Reports ready in 36hrs</p>
                 </div>
                 <div className="mt-2 flex space-x-3">
                     <img src={home} alt="home" className="w-6"/>
                     <p className="text-sm  text-gray-400 pt-2">Reports ready in 36hrs</p>
                 </div>
                
                 {/*   */}
            </div>
            
            </div>
            <hr className="lg:mx-8"/>
            <div className="lg:mx-8 lg:flex ">
               
            <div className="lg:w-58 py-3 px-16 ">
                <p></p>
                </div>

                <div className="py-6 lg:w-11/12 ">
            <div className="flex justify-between py-2">
                     <div className="flex ">
                 
                 <p className=" text-xs text-gray-400 pt-1">Charges:   </p>
                 <p className="text-lg text-gray-600 font-medium pl-2">₹ 8000.00</p>
                 <p className="line-through text-xs text-gray-400 pt-1 pl-2">₹ 250.00</p>
                 </div>
                 <div className="space-x-6">
                 <button className="bg-transparent hover:bg-brand-secondary text-brand-secondary font-medium hover:text-white py-2 px-4 border border-brand-secondary hover:border-transparent rounded">
                 View Details
                    </button>
                 <button className="bg-brand-secondary text-white  py-2 px-4 rounded">Book Now</button>
                 </div>

                </div>      
                 </div>
 
 </div>
{/* 3rd search */}
<div className="lg:mx-8 lg:flex ">
            <div className="lg:w-58 py-6  ">
                <div className="w-32 h-36 rounded-md bg-red-100 p-6">
                <img src={bloodtest} alt="bloodtest" className="w-16 "/>
                </div>
            </div>
            <div className="py-6 lg:w-11/12 pl-4">
                <div className="flex justify-between">
                <p className="text-base text-gray-600 ">Vitamin D - UltraSenstive
                </p>
                <div className="w-44 h-5 rounded-full bg-red-500">
                <p className="text-white text-sm pl-3">Reports ready in 36hrs </p>
                </div>
                </div>
                 <div className="mt-2 flex space-x-3">
                     <img src={info} alt="info"/>
                     <p className="text-sm  text-gray-400">Fasting for 12 hrs before test</p>
                 </div>
                 <div className="mt-2 flex space-x-3">
                     <img src={injection} alt="injection"/>
                     <p className="text-sm  text-gray-400 pt-1">25 Tests</p>
                     <img src={arrow} alt="arrow" className="pt-1"/>
                 </div>
                
                 <div className="mt-2 flex space-x-3">
                     <img src={tube} alt="info" className="w-6"/>
                     <p className="text-sm  text-gray-400 pt-2">Reports ready in 36hrs</p>
                 </div>
                 <div className="mt-2 flex space-x-3">
                     <img src={home} alt="home" className="w-6"/>
                     <p className="text-sm  text-gray-400 pt-2">Reports ready in 36hrs</p>
                 </div>
                
                 {/*   */}
            </div>
            
            </div>
            <hr className="lg:mx-8"/>
            <div className="lg:mx-8 lg:flex ">
               
            <div className="lg:w-58 py-3 px-16 ">
                <p></p>
                </div>

                <div className="py-6 lg:w-11/12 ">
            <div className="flex justify-between py-2">
                     <div className="flex ">
                 
                 <p className=" text-xs text-gray-400 pt-1">Charges:   </p>
                 <p className="text-lg text-gray-600 font-medium pl-2">₹ 8000.00</p>
                 <p className="line-through text-xs text-gray-400 pt-1 pl-2">₹ 250.00</p>
                 </div>
                 <div className="space-x-6">
                 <button className="bg-transparent hover:bg-brand-secondary text-brand-secondary font-medium hover:text-white py-2 px-4 border border-brand-secondary hover:border-transparent rounded">
                 View Details
                    </button>
                 <button className="bg-brand-secondary text-white  py-2 px-4 rounded">Book Now</button>
                 </div>

                </div>      
                 </div>
 
 </div>

 
 </div>      
    </div> 

      </>
  );
}
export default LabtestSearch;