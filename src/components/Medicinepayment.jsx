import React from 'react'
import { useHistory } from 'react-router-dom';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
function MedicinePayment() {
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
                      <a href="/components">Payment</a>
                      </li>
                  </ul>
      <div className="flex justify-between ">


        <div className="w-8/12 mt-4 ml-10 mt-3">

          <div className="rounded-lg shadow-lg bg-white-600 w-full h-96 p-3 antialiased justify-between border border-gray-200">

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
                <p className=" font-normal text-sm leading-6 mb-3 mr-3 pl-2 mt-2">prescription.pdf</p>
              </div>
              <p className="text-sm text-brand-secondary font-medium pr-4">x</p>
            </div>
            <hr />

            <div className="flex justify-between space y-6">
              <div className="flex">
                {/* <img src={select} alt="select" className="w-4 ml-3 " /> */}
                <p className="pl-2 text-brand-secondary font-medium text-lg mt-2
                ">Cart Summary</p>
              </div>
              {/* <p className="text-sm text-brand-secondary font-medium pr-4">Add a Patient</p> */}

            </div>


            <div className="flex justify-between">
              <div className="flex">
                {/* <img src={select} alt="select" className="w-4 ml-3 " /> */}
                <p className=" font-normal text-sm leading-6 mb-3 mr-3 pl-2 mt-2">3 Items</p>
              </div>
              <p className="text-sm text-brand-secondary font-medium pr-4">Edit Cart</p>
            </div>
            <hr />


            <div className="flex justify-between space y-6">
              <div className="flex">
                {/* <img src={select} alt="select" className="w-4 ml-3 " /> */}
                <p className="pl-2 text-brand-secondary font-medium text-lg mt-2">Select a Address</p>
              </div>
              <p className="text-sm text-brand-secondary font-medium pr-4 mt-2">Add Address</p>

            </div>


            <div className=" flex flex-row flex-wrap justify-between mt-4">
              <div className="md:w-60 w-full rounded-lg shadow-lg antialiased p-4 border border-gray-200">
                <div className="flex pl-1 ">
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
            <button onClick={redirectTo} className="bg-brand-secondary  float-right text-white  py-2 px-4 rounded text-sm mt-4 ">Pay Now</button>
          </div>
        </div>

        
        <div className="w-3/12 mr-6 mt-3">
          <div className="rounded-lg shadow-lg bg-white-600 w-full  p-3 antialiased border border-gray-200">
            <p className="text-md font-medium text-gray-800">Price Detail</p>
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
              <p>₹ 3,900/-</p>
            </div>
            <div className="flex justify-between mt-2">
              <p>Savings</p>
              <p>₹ 3,900/-</p>
            </div>
            <div className="flex justify-between mt-3">
              <p className="text-green-900 font-medium">Delivery Charge</p>
              <p className="text-green-900 font-medium">-₹ 900/-</p>
            </div>
            <hr className="mt-2 mb-2" />
            <div className="flex justify-between mt-3">
              <p className="text-brand-secondary">Grand Total</p>
              <p className="text-brand-secondary font-medium">₹ 3,000/-</p>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}
export default MedicinePayment;
