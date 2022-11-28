import React from 'react'
import { useLocation } from 'react-router';
// import back from '../Assets/Images/track.jpeg';
// import steth from '../Assets/Images/steth.svg';
import circlepill from '../Assets/Images/circlepill.svg';
import OrderDetailMap from './orderDetailMap';
import moment from 'moment';
import { XIcon, CheckIcon } from '@heroicons/react/outline';






function OrderDetails(props) {
  const location = useLocation();
  const { state } = location;
  console.log("state", state)



  return (
    <>

      <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base ml-4 pt-5">
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
          <a href="/profile/mediceineorders">My Profile</a>
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
          <a href="/medicinedeliveryorderdetails">Order Details</a>
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
      </ul>

      <p className="text-lg lg:pl-10 text-gray-600 font-medium pb-5 pt-2">Order Details</p>
      <div className="lg:w-11/12 flex flex-col bg-white mb-10 rounded-2xl overflow-hidden ">
        <div className="text-gray-700 text-lg lg:px-6 py-4 border border-gray-200 ">
          <div className="lg:flex justify-between ">
            <div>
              <p className="text-sm font-medium text-gray-400">Order ID</p>
              <p className="text-sm font-medium text-gray-500 ">{state?.orderId}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Delivery Address</p>
              <p className="text-sm font-medium text-gray-500 truncate w-52">{state?.deliveryAddress1 + ", " + state?.deliveryAddress2 + ", " + state?.deliveryAddress3}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Placed On </p>
              <p className="text-sm font-medium text-gray-500">{moment(state?.createdDate, 'yyyy-MM-DD hh:mm:ss').format('DD,MMMM, hh:mm A')}</p>
            </div>
            {/* <div>
              <p className="text-sm font-medium text-gray-400">Expected Delivery</p>
              <p className="text-sm font-medium text-gray-500">23 July, 6:00 pm </p>
            </div> */}
            {/* <div>
              <p className="text-sm font-medium text-gray-400">Track Order</p>
              <p className="text-sm font-medium text-gray-500">www.delhivery/tracking<br />/jkiwneionsad/.com</p>
            </div> */}
            <div>
              <p className="text-sm font-medium text-gray-400">Amount Paid</p>
              <p className="text-lg font-medium text-gray-600">₹ {state?.patientDrugPrescriptionOrderDetailsList[0]?.totalAmount}</p>
            </div>
          </div>
        </div>

        <div className="flex  px-6 py-4">
          <img src={circlepill} alt="pill" className="w-16" />
          <div className=" px-3 ">
            <p className="text-sm text-gray-700 font-medium">{state?.patientDrugPrescriptionOrderDetailsList[0]?.drugName}</p>
            <p className="text-xs text-gray-600 font-medium mt-2">Seller :<span className="text-xs text-gray-600 font-medium">&nbsp;{state.hospitalName}</span></p>
            <p className="text-xs text-gray-600 font-medium mt-2">Quantity :<span> &nbsp;{state?.patientDrugPrescriptionOrderDetailsList[0]?.quantity}</span></p>
          </div>
        </div>
        <div className="lg:w-full lg:px-64 pt-5 mx-auto">
          <div className="h-1 flex items-center justify-between">
            <div className={`lg:w-96 w-32 ${state?.status === 6 || state?.status === 7 ? 'bg-red-600 ' : state?.status >= 10 ? 'bg-green-500 ' : 'bg-gray-400 '} content-center h-1 flex items-center`}>
              <div className={`bg-green-500 h-6 w-6 rounded-full shadow flex items-center justify-center`}>
                <CheckIcon color={'white'}></CheckIcon>
              </div>
            </div>
            <div className={`lg:w-96 w-32 ${state?.status === 6 || state?.status === 7 ? 'bg-red-600 ' : state?.status >= 10 ? 'bg-green-500 ' : 'bg-gray-400 '} h-1 flex items-center`}>
              <div className={`${state?.status === 6 || state?.status === 7 ? 'bg-red-600 ' : state?.status >= 9 ? 'bg-green-500 ' : 'bg-gray-400 '} h-6 w-6 rounded-full shadow flex items-center justify-center`}>
                {state?.status === 6 || state?.status === 7 ? <XIcon color={'white'}></XIcon> : state?.status >= 9 ? <CheckIcon color={'white'}></CheckIcon> : <CheckIcon color={'gray'}></CheckIcon>}
              </div>
            </div>
            <div className={` ${state?.status === 6 || state?.status === 7 ? 'bg-red-600 ' : state?.status >= 10 ? 'bg-green-500 ' : 'bg-gray-400 '} h-1 flex items-center`}>
              <div className={`${state?.status === 6 || state?.status === 7 ? 'bg-red-600 ' : state?.status >= 10 ? 'bg-green-500 ' : 'bg-gray-400 '} h-6 w-6 rounded-full shadow flex items-center justify-center`}>
                {state?.status === 6 || state?.status === 7 ? <XIcon color={'white'}></XIcon> : state?.status >= 10 ? <CheckIcon color={'white'}></CheckIcon> : <CheckIcon color={'gray'}></CheckIcon>}
              </div>
            </div>
          </div>

        </div>
        <div className="content-center flex items-center justify-between w-full lg:w-full lg:px-60 px-3  mx-auto">
          <p className="text-xs font-medium pt-6 text-green-500 w-32">Order Placed <br />at {state?.hospitalName} <br />{moment(state?.createdDate, 'yyyy-MM-DD hh:mm:ss').format('DD,MMMM, hh:mm A')}</p>
          {state?.status === 6 || state?.status === 7 ? <p className={`text-xs font-medium pt-6 text-red-600`}>Order Canceled </p> :
            <>           {state?.status >= 9 ? <p className={`text-xs font-medium pt-6 text-green-500 `}>Order Picked up <br />from Pharmacy<br /> </p> : ''}
              {state?.status >= 10 ? <p className={`text-xs font-medium pt-6 text-green-500`}>Order Delivered <br />{moment(state?.modifiedDate, 'yyyy-MM-DD hh:mm:ss').format('DD,MMMM, hh:mm A')} </p> : ''}</>
          }

        </div>
        <div className="px-6 py-4 flex justify-between mt-5">
          <p></p>
          <button className="bg-brand-secondary  text-white py-2 px-4 rounded">
            Cancel Item
          </button>
        </div>
        <div className="m-5 rounded-2xl">
          <OrderDetailMap />
        </div>
      </div>

    </>
  );
}
export default OrderDetails;