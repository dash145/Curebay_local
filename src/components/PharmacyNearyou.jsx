import React from 'react'
import pillpharm from '../Assets/Images/pillpharm.svg';
import info from '../Assets/Images/info.svg';
import tube from '../Assets/Images/tube.svg';
import location from '../Assets/Images/Locationh.svg';
import injection from '../Assets/Images/injec.svg';
import arrow from '../Assets/Images/arrow.forward.svg';
import home from '../Assets/Images/homepage.svg';
import filter from '../Assets/Images/filter.svg';
import sort from '../Assets/Images/sort.svg';


function PharmacyNearyou() {
  return (
    <>

      <div className="lg:py-4">
          
        
      <div className=" lg:py-3  lg:flex lg:justify-center">
   
   <div className="bg-white lg:mx-8 lg:w-full lg:shadow-lg lg:rounded-lg ">
       <div className="flex float-right space-x-4 pr-5 pt-2"> 
       <div className="flex">
   <img src={filter} alt="filter"/>&nbsp;&nbsp;
   <p className="text-sm text-brand-secondary">Filter</p>
   </div>
   <div className="flex pl-3">
   <img src={sort} alt="sort"/>&nbsp;&nbsp;
   <p className="text-sm text-brand-secondary">Sort</p>
   </div>
   </div>
   <br/><br/>
   <hr/>
       <div className="lg:mx-8 lg:flex ">
       <div className="lg:w-58 py-3  ">
           
           <img src={pillpharm} alt="pillpharm" className="w-32 "/>
           
       </div>
       <div className="py-6 lg:w-11/12 pl-4">
           <div className="flex justify-between">
           <p className="text-base text-gray-600 font-medium">Vinayak Chemists and Lifestyle Store
           </p>
           <div className="w-20 h-6 rounded-full bg-brand-atomictangerine">
           <p className="text-white text-xs pl-3 pt-1">2 km away   </p>
           </div>
           </div>
            <div className="mt-1 flex space-x-3">
                
                <p className="text-xs  text-gray-400">Chemist</p>
            </div>
            <p className="text-xs  text-brand-atomictangerine pt-1">Closes soon .<span className="text-xs text-gray-600">11:30PM</span> </p>
            <p className="text-xs  text-gray-400 pt-1">Shop no.5, Jaykusum Apartment, Wamanrao Sawant Rd, opposite Ramkrishna hotel,  Dahisar East, Maharashtra 400068</p>
            <p className="text-xs  text-gray-400 pt-1">In-store shopping  ·  Curbside pickup  ·  Delivery </p>
         
       </div>
       
       </div>
       <hr className="lg:mx-8 "/>
       <div className="lg:mx-8 lg:flex ">
          
       <div className="lg:w-58 py-3 px-16 ">
           <p></p>
           </div>

           <div className="py-3 lg:w-11/12 ">
       <div className="flex justify-between py-2">
                <div className="flex ">
{/*             
            <p className=" text-xs text-gray-400 pt-1">Charges:   </p>
            <p className="text-lg text-gray-600 font-medium pl-2">₹ 8000.00</p>
            <p className="line-through text-xs text-gray-400 pt-1 pl-2">₹ 10,000.00</p> */}
            </div>
            <div className="space-x-6">
            {/*<button className="bg-transparent text-sm  hover:bg-brand-secondary text-brand-secondary font-medium hover:text-white py-2 px-4 border border-brand-secondary hover:border-transparent rounded">
            View on Map
               </button>*/}
            <button className="bg-brand-secondary text-sm text-white  py-2 px-4 rounded">Buy Medicines</button>
            </div>

           </div>      
            </div>

</div>

   <hr className=""/>
   {/* 2nd search */}
   <div className="lg:mx-8 lg:flex ">
       <div className="lg:w-58 py-6  ">
           
           <img src={pillpharm} alt="pillpharm" className="w-32 "/>
           
       </div>
       <div className="py-6 lg:w-11/12 pl-4">
           <div className="flex justify-between">
           <p className="text-base text-gray-600 font-medium">Vinayak Chemists and Lifestyle Store
           </p>
           <div className="w-20 h-6 rounded-full bg-brand-atomictangerine">
           <p className="text-white text-xs pl-3 pt-1">2 km away   </p>
           </div>
           </div>
            <div className="mt-1 flex space-x-3">
                
                <p className="text-xs  text-gray-400">Chemist</p>
            </div>
            <p className="text-xs  text-brand-atomictangerine pt-1">Closes soon .<span className="text-xs text-gray-600">11:30PM</span> </p>
            <p className="text-xs  text-gray-400 pt-1">Shop no.5, Jaykusum Apartment, Wamanrao Sawant Rd, opposite Ramkrishna hotel,  Dahisar East, Maharashtra 400068</p>
            <p className="text-xs  text-gray-400 pt-1">In-store shopping  ·  Curbside pickup  ·  Delivery </p>
         
       </div>
       
       </div>
       <hr className="lg:mx-8 "/>
       <div className="lg:mx-8 lg:flex ">
          
       <div className="lg:w-58 py-3 px-16 ">
           <p></p>
           </div>

           <div className="py-3 lg:w-11/12 ">
       <div className="flex justify-between py-2">
                <div className="flex ">
{/*             
            <p className=" text-xs text-gray-400 pt-1">Charges:   </p>
            <p className="text-lg text-gray-600 font-medium pl-2">₹ 8000.00</p>
            <p className="line-through text-xs text-gray-400 pt-1 pl-2">₹ 10,000.00</p> */}
            </div>
            <div className="space-x-6">
            {/*<button className="bg-transparent text-sm  hover:bg-brand-secondary text-brand-secondary font-medium hover:text-white py-2 px-4 border border-brand-secondary hover:border-transparent rounded">
            View on Map
               </button>*/}
            <button className="bg-brand-secondary text-sm text-white  py-2 px-4 rounded">Buy Medicines</button>
            </div>

           </div>      
            </div>

</div>

   <hr className=""/>
{/* 3rd search */}
<div className="lg:mx-8 lg:flex ">
       <div className="lg:w-58 py-6  ">
           
           <img src={pillpharm} alt="pillpharm" className="w-32 "/>
           
       </div>
       <div className="py-6 lg:w-11/12 pl-4">
           <div className="flex justify-between">
           <p className="text-base text-gray-600 font-medium">Vinayak Chemists and Lifestyle Store
           </p>
           <div className="w-20 h-6 rounded-full bg-brand-atomictangerine">
           <p className="text-white text-xs pl-3 pt-1">2 km away   </p>
           </div>
           </div>
            <div className="mt-1 flex space-x-3">
                
                <p className="text-xs  text-gray-400">Chemist</p>
            </div>
            <p className="text-xs  text-brand-atomictangerine pt-1">Closes soon .<span className="text-xs text-gray-600">11:30PM</span> </p>
            <p className="text-xs  text-gray-400 pt-1">Shop no.5, Jaykusum Apartment, Wamanrao Sawant Rd, opposite Ramkrishna hotel,  Dahisar East, Maharashtra 400068</p>
            <p className="text-xs  text-gray-400 pt-1">In-store shopping  ·  Curbside pickup  ·  Delivery </p>
         
       </div>
       
       </div>
       <hr className="lg:mx-8 "/>
       <div className="lg:mx-8 lg:flex ">
          
       <div className="lg:w-58 py-3 px-16 ">
           <p></p>
           </div>

           <div className="py-3 lg:w-11/12 ">
       <div className="flex justify-between py-2">
                <div className="flex ">
{/*             
            <p className=" text-xs text-gray-400 pt-1">Charges:   </p>
            <p className="text-lg text-gray-600 font-medium pl-2">₹ 8000.00</p>
            <p className="line-through text-xs text-gray-400 pt-1 pl-2">₹ 10,000.00</p> */}
            </div>
            <div className="space-x-6">
            {/*<button className="bg-transparent text-sm  hover:bg-brand-secondary text-brand-secondary font-medium hover:text-white py-2 px-4 border border-brand-secondary hover:border-transparent rounded">
            View on Map
               </button>*/}
            <button className="bg-brand-secondary text-sm text-white  py-2 px-4 rounded">Buy Medicines</button>
            </div>

           </div>      
            </div>

</div>

   <hr className=""/>


</div>

</div>      
</div> 



      </>
  );
}
export default PharmacyNearyou;