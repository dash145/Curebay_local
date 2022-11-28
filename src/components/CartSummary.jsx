import React from 'react';
import tabstrip from '../Assets/Images/tabstrip.svg';
import minus from '../Assets/Images/minus.svg';
import plus from '../Assets/Images/plus.svg';
import delet from '../Assets/Images/delete.svg';
import dettol from '../Assets/Images/dettol.svg';
import ensure from '../Assets/Images/ensure.svg';
import heart from '../Assets/Images/heart.svg';
import { useHistory } from 'react-router-dom';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
function CartSummary() {
  const history = useHistory();
  const redirectTo = (event) => {
    event.preventDefault();
    history.push(APP_ROUTES.MEDICINE_ORDERPLACE);
  };

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
                      <a href="/pharmacycategory">Medicines</a>
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
                      <a href="">Payment</a>
                      </li>
                  </ul>
      <div className="flex justify-between ">


        <div className="w-8/12 mt-4 ml-10 mt-3">

          <div className="rounded-lg shadow-lg bg-white-600 w-full h-250 p-3 antialiased justify-between border border-gray-200">

            <div className="flex justify-between space y-6">
              <div className="flex">
                {/* <img src={select} alt="select" className="w-4 ml-3 " /> */}
                <p className="pl-2 text-brand-secondary font-medium text-lg">Upload e-prescription</p>
              </div>
              {/* <p className="text-sm text-brand-secondary font-medium pr-4">Add a Patient</p> */}

            </div>


            <div className="flex justify-between">
              <div className="flex">
                {/* <img src={select} alt="select" className="w-4 ml-3 " /> */}
                <p className=" font-normal text-sm leading-6 mb-3 mr-3 pl-2 mt-2">prescription.jpg</p>
              </div>
              <p className="text-sm text-brand-secondary font-medium pr-4">x</p>
            </div>
            <hr />
            <div className="flex justify-between space y-6">
              <div className="flex">
                {/* <img src={select} alt="select" className="w-4 ml-3 " /> */}
                <p className="pl-2 text-brand-secondary font-medium text-lg mt-2">Cart Summary</p>
              </div>
              <p className="text-sm text-blue-600 font-medium pr-4">Add More Item</p>
              
            </div>
            <div className="flex">
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
              
            </div>

            <div className="flex">
            <div className=" w-full lg:max-w-full lg:flex rounded-lg border p-5 mt-3">
                    <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" >
                    <img src={dettol} alt="dettol" className="h-44 w-44" />
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

            <div className="flex">
            <div className=" w-full lg:max-w-full lg:flex rounded-lg border p-5 mt-3">
                    <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" >
                    <img src={ensure} alt="ensure" className="h-44 w-44" />
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


            <div className="flex justify-between">
              <div className="flex">
                {/* <img src={select} alt="select" className="w-4 ml-3 " /> */}
                <br />    {/* <p className=" font-normal text-sm leading-6 mb-3 mr-3 pl-2 mt-2">3 Items</p> */}
              </div>
              {/* <p className="text-sm text-brand-secondary font-medium pr-4">Edit Cart</p> */}
            </div>
            <hr />


            <div className="flex justify-between space y-6">
              <div className="flex">
                {/* <img src={select} alt="select" className="w-4 ml-3 " /> */}
                <p className="pl-2 text-brand-secondary font-medium text-lg mt-2">Select a address</p>
              </div>
              {/* <p className="text-sm text-brand-secondary font-medium pr-4 mt-2">Add Address</p> */}

              <button onClick={redirectTo} className="bg-gray-400  float-right text-white  py-2 px-4 rounded text-sm mt-16 ">Pay Now</button>
            </div><br/><br/>

          </div>
        </div>
        <div className="w-3/12 mr-6 mt-3">
          <div className="rounded-lg shadow-lg bg-white-600 w-full  p-3 antialiased border border-gray-200">
            <p className="text-md font-medium text-gray-800">Price Details</p>
            <hr />
            <div>
              <div className="mt-2" >
                <p className="pl-1 text-s text-gray-400">Order From</p>
                <p className="pl-1 text-s text-blue-400 font-medium">wellness Forever</p>
                <p className="pl-1 text-s text-gray-400 font-medium">Dahisar East, Maharashtra 400068</p>
              </div>
            </div>
            <hr className="mt-2" />
            <input placeholder="Enter Coupon Code" className=" mt-4 bg-transparent  font-medium text-gray-500  text-left pl-2 py-2  w-72 border border-brand-secondary rounded text-sm" />
            <hr className="mt-2 mb-2" />
            <div className="flex justify-between">
              <p>Sub Total</p>
              <p>₹ 6,399.00</p>
            </div>
            <div className="flex justify-between mt-2">
              <p>Savings</p>
              <p>-₹ 900.00</p>
            </div>
            <div className="flex justify-between mt-3">
              <p className="text-green-900 font-medium">Delivery Charge</p>
              <p className="text-green-900 font-medium">FREE</p>
            </div>
            <hr className="mt-2 mb-2" />
            <div className="flex justify-between mt-3">
              <p className="text-brand-secondary">Grand Total</p>
              <p className="text-brand-secondary font-medium">₹ 4,393.00</p>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}
export default CartSummary;
