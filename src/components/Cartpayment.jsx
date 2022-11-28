import React from 'react'
import avtar from '../Assets/Images/self.png';
import W from '../Assets/Images/W.png';
import M from '../Assets/Images/M.png';
import steth from '../Assets/Images/steth.svg';
import select from '../Assets/Images/select.svg';
import { useHistory } from 'react-router-dom';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
function CartPayment() {
  const history = useHistory();
  const redirectTo = (event) => {
    event.preventDefault();
    history.push(APP_ROUTES.CART_SUCCESSFUL);
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
                      <a href="/diagnosis">Lab test</a>
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
                      <a href="">Cart</a>
                      </li>
                  </ul>
      <div className="flex justify-between ">


        <div className="w-8/12 mt-4 ml-10 mt-3">

          <div className="rounded-lg shadow-lg bg-white-600 w-full h-96 p-3 antialiased justify-between border border-gray-200">

            
          <div className="flex justify-between mt-2">
            <div className="flex">
              <img src={select} alt="select" className="w-4 ml-3 " />
              <p className="pl-2 font-medium text-2xl text-brand-secondary">Select a Patient</p>
            </div>
            <p className="text-sm text-brand-secondary font-medium pr-4">Add a Patient</p>
          </div>

          <div className="flex justify-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            <div className="p-5 ">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex  ">
                  <input type="radio" className="form-radio mt-4 mr-2" name="accountType" value="personal" />
                  <div>
                    <img className="w-10" src={avtar} alt="avtar" />
                  </div>
                  <div >
                    <p className=" pl-3 text-sm font-medium">Vijay Sharma</p>
                    <p className=" pl-3 text-xs text-gray-400">Myself</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 ">

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex">
                  <input type="radio" className="form-radio mt-4 mr-2" name="accountType" value="personal" />
                  <div>
                    <img className="w-10" src={M} alt="avtar" />
                  </div>
                  <div>
                    <p className=" pl-3 text-sm font-medium">Ramesh Sharma</p>
                    <p className=" pl-3 text-xs text-gray-400">Father</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 ">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex ">
                  <input type="radio" className="form-radio mt-4 mr-2" name="accountType" value="personal" />
                  <div>
                    <img className="w-10" src={W} alt="avtar" />
                  </div>
                  <div>
                    <p className=" pl-3 text-sm font-medium">Sunita Sharma</p>
                    <p className=" pl-3 text-xs text-gray-400">Mother</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

           

           
            <hr />


            <div className="flex justify-between space y-6">
              <div className="flex">
                <img src={select} alt="select" className="w-4 ml-3 mt-2 " />
                <p className="pl-2 font-medium text-2xl text-brand-secondary mt-2">Select a Address</p>
              </div>
              <p className="text-sm text-brand-secondary font-medium pr-4 mt-2">Add Address</p>

            </div>


            <div className=" flex flex-row flex-wrap justify-between mt-4">
              <div className="md:w-60 w-full rounded-lg shadow-lg antialiased p-4 border border-gray-200">
                <div className="flex pl-4 space-x-2 ">
                  <input type="radio" className="form-radio mt-4 mr-2" name="accountType" value="personal" />
                  {/* <div>
                    <img className="w-10" src={avtar} alt="avtar" />
                  </div> */}
                  <div >
                    <p className=" pl-3 text-sm font-medium">Home</p>
                    <p className=" pl-3 text-xs text-gray-400">F-1101, Dynasty CHS, Pune-57.
                      Maharashtra</p>
                  </div>
                </div>
              </div>
              <div className="md:w-60 w-full rounded-lg shadow-lg antialiased p-4 border border-gray-200">
                <div className="flex pl-1">
                  <input type="radio" className="form-radio mt-4 mr-2" name="accountType" value="personal" />
                  {/* <div>
                    <img className="w-10" src={M} alt="avtar" />
                  </div> */}
                  <div>
                    <p className=" pl-3 text-sm font-medium">Mom's Place</p>
                    <p className=" pl-3 text-xs text-gray-400">House no. 18, New GM Road, Mumbai-24.
                      Maharashtra</p>
                  </div>
                </div>
              </div>
              <div className="md:w-60 w-full rounded-lg shadow-lg antialiased p-4 border border-gray-200">
                <div className="flex pl-1">
                  <input type="radio" className="form-radio mt-4 mr-2" name="accountType" value="personal" />
                  {/* <div>
                    <img className="w-10" src={W} alt="avtar" />
                  </div> */}
                  <div>
                    <p className=" pl-3 text-sm font-medium">Office</p>
                    <p className=" pl-3 text-xs text-gray-400">Office no. 21, Alex Plaza, Mann Square, Bangalore-71.</p>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={redirectTo} className="bg-brand-secondary  float-right text-white  py-2 px-4 rounded text-sm mt-4 ">Pay</button>
          </div>
        </div>

        
        <div className="w-3/12 mr-6 mt-3">
          <div className="rounded-lg shadow-lg bg-white-600 w-full  p-3 antialiased border border-gray-200">
            <p className="text-md font-medium text-gray-800">Price Detail</p>
            <hr />
            <div className="flex">
              <img src={steth} alt="stethescope" className="w-10 mt-2" />
              <div>
                <div className="flex justify-between">
                  <p className="text-sm pl-2 pt-2">Blood Sugar Test</p>
                  <p className="text-xs pl-16 pt-3 text-green-600">Today</p>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="h-5 w-14 pl-2 bg-purple-400 rounded-2xl flex">
                    <p className="text-xs text-white">Myself </p>
                    <p className="text-sm pl-8">Online</p>
                  </div>
                  <p className="text-xs font-medium">3:30 PM</p>
                </div>
              </div>
            </div>
            <hr className="mt-2" />
            <input placeholder="Enter Coupon Code" className=" mt-4 bg-transparent  font-medium text-gray-500  text-left pl-2 py-2  w-72 border border-brand-secondary rounded text-sm" />
            <hr className="mt-2 mb-2" />
            <div className="flex justify-between">
              <p>Lab Test Fee</p>
              <p>₹ 3,900/-</p>
            </div>
            <div className="flex justify-between mt-3">
              <p className="text-green-900 font-medium">Discount</p>
              <p className="text-green-900 font-medium">-₹ 900/-</p>
            </div>
            <hr className="mt-2 mb-2" />
            <div className="flex justify-between mt-3">
              <p className="text-brand-secondary"> Total</p>
              <p className="text-brand-secondary font-medium">₹ 3,000/-</p>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}
export default CartPayment;
