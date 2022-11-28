import React from 'react'
import tabstrip from '../Assets/Images/tabstrip.svg';
import det from '../Assets/Images/det.svg';
import ens from '../Assets/Images/ens.svg';
import dettollimefresh from '../Assets/Images/dettollimefresh.svg';
import savlonfresh from '../Assets/Images/savlonfresh.svg';
import star from '../Assets/Images/star.svg';
import minus from '../Assets/Images/minus.svg';
import plus from '../Assets/Images/plus.svg';
import delet from '../Assets/Images/delete.svg';
import heart from '../Assets/Images/heart.svg';
import sort from '../Assets/Images/sort.svg';

function Med_cart() {
  return (
    <>
    
     {/* breadcrumbs */}
     <ul className="flex text-brand-secondary text-sm lg:text-base pl-10 pt-5">
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
          <a href="/components">Medicines</a>
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
          <a href="/components">Cart</a>
        </li>
      </ul>
      <br/>
      <p className="text-md pl-10 font-medium">Items in your cart</p>
      <p className="text-xs text-gray-400 pl-10 mt-3">Item  Required Presception(1)</p>
      {/* <div className=" border border-gray-200 pl-10 pr-10 pt-5 pb-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5"> */}
      <div className="pl-10 pr-10 pb-10 rounded-xl overflow-hidden shadow-sm">
        

        {/* card 1 */}
        <div className=" w-full lg:max-w-full lg:flex rounded-lg border p-5 mt-3">
          <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" >
            <img src={tabstrip} alt="tabstrip" />
          </div>
          <div className="pl-16 w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className="">
                <div className="flex justify-between">
              <p className="text-sm text-gray-800 flex items-center font-medium">
              Admenta 10mg Tablet 10'S
              </p>
              <div className="flex space-x-4">
              <img src={heart} alt="heart"/>
              <img src={delet} alt="delete"/>
              </div>

              </div>
              <p className="text-xs pt-2 text-gray-600">10'S Capsule(s) in a Strip</p>
        
              <p className="text-gray-500 text-xs pt-2">Seller:&nbsp;<span className="text-blue-500">Wellness Forever</span>  </p>
              <div className="flex pt-6">
                  <p className="text-xs pt-1 pr-4">Quantity :</p>
                  <p className="text-gray-700 text-base">
                    <button className=" flex space-x-2 bg-transparent  text-blue-700 py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                      <img src={minus} alt="minus" className="w-3 mt-2 " />
                      <p className="text-xs w-5 h-4 bg-green-500 rounded text-white" > 01</p>
                      <img src={plus} alt="plus" className="w-3 pt-1 " />
                    </button>
                  </p>
                  </div>
                  <div className="flex justify-between">
                <div className=" flex pt-4">
                  <p className="text-gray-900 leading-none text-xs pt-1">Price :  </p>
                  <p className="text-black font-medium text-sm pl-2">₹ 153.60</p>
                  <p className="text-xs line-through text-gray-500  pl-4">₹192.00</p>
                </div>

            </div>
            
            <p className="text-xs text-green-400 pt-4">Delivery between June  30 06:00 PM-10:00 PM</p>
              </div>

          </div>
        </div>

        {/* card 2 */}
        <div className=" w-full lg:max-w-full lg:flex rounded-lg border p-5 mt-3">
          <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" >
            <img src={det} alt="tabstrip" />
          </div>
          <div className="pl-16 w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className="">
                <div className="flex justify-between">
              <p className="text-sm text-gray-800 flex items-center font-medium">
              Admenta 10mg Tablet 10'S
              </p>
              <div className="flex space-x-4">
              <img src={heart} alt="heart"/>
              <img src={delet} alt="delete"/>
              </div>

              </div>
              <p className="text-xs pt-2 text-gray-600">10'S Capsule(s) in a Strip</p>
        
              <p className="text-gray-500 text-xs pt-2">Seller:&nbsp;<span className="text-blue-500">Wellness Forever</span>  </p>
              <div className="flex pt-6">
                  <p className="text-xs pt-1 pr-4">Quantity :</p>
                  <p className="text-gray-700 text-base">
                    <button className=" flex space-x-2 bg-transparent  text-blue-700 py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                      <img src={minus} alt="minus" className="w-3 mt-2 " />
                      <p className="text-xs w-5 h-4 bg-green-500 rounded text-white" > 01</p>
                      <img src={plus} alt="plus" className="w-3 pt-1 " />
                    </button>
                  </p>
                  </div>
                  <div className="flex justify-between">
                <div className=" flex pt-4">
                  <p className="text-gray-900 leading-none text-xs pt-1">Price :  </p>
                  <p className="text-black font-medium text-sm pl-2">₹ 153.60</p>
                  <p className="text-xs line-through text-gray-500  pl-4">₹192.00</p>
                </div>

            </div>
            
            <p className="text-xs text-green-400 pt-4">Delivery between June  30 06:00 PM-10:00 PM</p>
              </div>

          </div>
        </div>

        {/* card 3 */}
        <div className=" w-full lg:max-w-full lg:flex rounded-lg border p-5 mt-3">
          <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" >
            <img src={ens} alt="tabstrip" />
          </div>
          <div className="pl-16 w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className="">
                <div className="flex justify-between">
              <p className="text-sm text-gray-800 flex items-center font-medium">
              Admenta 10mg Tablet 10'S
              </p>
              <div className="flex space-x-4">
              <img src={heart} alt="heart"/>
              <img src={delet} alt="delete"/>
              </div>

              </div>
              <p className="text-xs pt-2 text-gray-600">10'S Capsule(s) in a Strip</p>
        
              <p className="text-gray-500 text-xs pt-2">Seller:&nbsp;<span className="text-blue-500">Wellness Forever</span>  </p>
              <div className="flex pt-6">
                  <p className="text-xs pt-1 pr-4">Quantity :</p>
                  <p className="text-gray-700 text-base">
                    <button className=" flex space-x-2 bg-transparent  text-blue-700 py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                      <img src={minus} alt="minus" className="w-3 mt-2 " />
                      <p className="text-xs w-5 h-4 bg-green-500 rounded text-white" > 01</p>
                      <img src={plus} alt="plus" className="w-3 pt-1 " />
                    </button>
                  </p>
                  </div>
                  <div className="flex justify-between">
                <div className=" flex pt-4">
                  <p className="text-gray-900 leading-none text-xs pt-1">Price :  </p>
                  <p className="text-black font-medium text-sm pl-2">₹ 153.60</p>
                  <p className="text-xs line-through text-gray-500  pl-4">₹192.00</p>
                </div>

            </div>
            
            <p className="text-xs text-green-400 pt-4">Delivery between June  30 06:00 PM-10:00 PM</p>
              </div>

          </div>
        </div>

       

      </div>






      {/* </div> */}
      <br />
    </>
  );
}
export default Med_cart;