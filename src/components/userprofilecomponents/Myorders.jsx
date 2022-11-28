/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from 'react'
import circlepill from '../../Assets/Images/circlepill.svg';
import labs from '../../Assets/Images/bg-labs.svg';
import Userprofilesidebar from '../userprofilesidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getpatientorders, getpatientDrugorders } from '../../Redux/Actions/UserprofileActions';
import { APP_ROUTES } from '../../application/Router/constants/AppRoutes';
import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';




function Myorders() {

    const status = {

    }



    const history = useHistory();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.authReducer.patientData)
    const myordersinfo = useSelector((state) => state.myorders);
    const { MyordersData } = myordersinfo;

    console.log("My data", MyordersData);

    const redirectTo = (data) => {
        history.push({ pathname: APP_ROUTES.ORDER_DETAILS, state: data });
    };

    useEffect(() => {
        if (MyordersData.length === 0) {
            dispatch(getpatientorders(userData.code));
            setTimeout(() => {
                dispatch(getpatientDrugorders(userData.code));
            }, 2000)

        }
    }, [MyordersData.length]);


    return (
        <>
            <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base pl-4 pt-5">
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
                    <a href="/components">Profile</a>
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
                    <a href="/components">My orders</a>
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
            <div className="flex justify-between ">
                <div className="lg:block hidden w-3/12 ml-6 mt-2">
                    <Userprofilesidebar></Userprofilesidebar>
                </div>
                <div className="lg:w-8/12 lg:mr-12 mt-5 ">
                    <div className="mx-2">
                        <div className="flex justify-between">
                            <p className="text-medium font-medium text-2xl  ">My orders</p>
                            {/* <p onClick={Addmembers} className="text-sm text-brand-secondary font-medium pr-4"> + Add Members</p> */}
                        </div>
                        {MyordersData.map((user, i) => {
                            let link = null;
                            if (user && user.patientLabTestsOrderDetailsList && user.patientLabTestsOrderDetailsList[0]) {
                                link = < div className="rounded-lg bg-white-600 w-full h-112 p-5 antialiased justify-between border border-gray-200 mt-2 lg:pb-4 mb-10"key={i} >
                                    <div className="lg:flex w-full" >
                                        <img src={labs} alt="stethescope" className="w-24 h-24 mt-2 ml-4" />
                                        <div className="w-full">
                                            <div className="flex justify-between">
                                                <p className="pl-3 pt-2  ml-4 text-medium font-medium text-lg  my-2 ">{user.patientLabTestsOrderDetailsList[0]?.labTestName}</p>
                                                <p className="text-sm pr-4 text-brand-secondary font-medium  my-4">
                                                    {user.status === 2 ? 'Delivered' : user.procedureStatus === 1 ? "Ordered" : user.procedureStatus === 2 ? "TakenTest" : user.procedureStatus === 3 ? "CollectionStatus" : user.procedureStatus === 5 ? "Cancel By Patient" : user.procedureStatus === 6 ? " Cancel By Lab" : "Pending"}
                                                </p>

                                            </div>
                                            <div className="flex justify-between">
                                                <p className="pl-2   ml-5  text-sm text-gray-600   font-medium  my-1">Seller : <b >{user.patientLabTestsOrderDetailsList[0]?.hospitalName}</b></p>
                                                <p className="text-sm   ml-5 text-sm text-gray-600   font-medium  my-1">Order Id : <b>{user.orderId}</b></p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="pl-2   ml-5  text-sm text-gray-600   font-medium  my-1">Amount Paid : <b>₹ {user.patientLabTestsOrderDetailsList[0]?.amount}/-</b></p>
                                                <p className="text-sm   ml-5 text-sm text-gray-600   font-medium  my-1">Placed On : <b>{moment(user.createdDate).format('DD MMM, HH:mm A')}</b></p>
                                            </div>
                                            <hr className="mt-2"></hr>
                                            {/* <div className="lg:flex justify-between mt-4 ">
                                                <div className="flex justify-end ">
                                                    <button onClick={redirectTo} className="bg-brand-primary text-white p-2 rounded-xl mr-2">Track Order</button>
                                                </div>

                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            }
                            if (user && user?.patientDrugPrescriptionOrderDetailsList && user?.patientDrugPrescriptionOrderDetailsList[0]) {
                                link = < div className="rounded-lg bg-white-600 w-full h-112 p-5 antialiased justify-between border border-gray-200 mt-2 lg:pb-4 mb-10" key={i}>
                                    <div className="lg:flex w-full">
                                        <img src={circlepill} alt="stethescope" className="w-24 h-24 mt-2 ml-4" />
                                        <div className="w-full">
                                            <div className="flex justify-between">
                                                <p className="pl-3 pt-2  ml-4 text-medium font-medium text-lg  my-2 ">{user.patientDrugPrescriptionOrderDetailsList[0]?.drugName}</p>
                                                <p className="text-sm pr-4 text-brand-secondary font-medium  my-4">{user.status === 1 ? "Confirmed" : user.status === 6 ?"Cancel By Patient" : user.status === 7 ? "Cancel By Pharmacy" : user.status === 6 ? "Cancel By Patient" : user.status === 8 ? "Pending" : user.status === 9 ? "picked up" : user.status === 10 ? "Delivered" : ''}</p>

                                            </div>
                                            <div className="flex justify-between">
                                                <p className="pl-2   ml-5  text-sm text-gray-600   font-medium  my-1">Seller : <b >{user.patientDrugPrescriptionOrderDetailsList[0]?.hospitalName}</b></p>
                                                <p className="text-sm   ml-5  text-gray-600   font-medium  my-1">Order Id : <b>{user.orderId}</b></p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="pl-2 ml-5 text-sm text-gray-600   font-medium  my-1">Amount Paid : <b>₹ {user.patientDrugPrescriptionOrderDetailsList[0]?.totalAmount}/-</b></p>
                                                <p className="text-sm ml-5  text-gray-600   font-medium  my-1">Placed On : <b>{moment(user.createdDate).format('DD MMM, HH:mm A')}</b></p>
                                            </div>
                                            <hr className="mt-2"></hr>
                                            <div className="lg:flex justify-between mt-4 ">
                                                {/* <div className="flex space-x-2">
                                                <img src={car} className="h-8 w-6 pt-2 text-sm text-green-600   font-medium  "></img>

                                                <p className="pl-2   ml-5  text-sm text-blue-500   font-medium  lg:my-3">Delivery Between 30TH june 9.00 A.M to 10.00 A.M</p>
                                            </div> */}
                                                <div className="flex justify-end ">
                                                    {/* <button className="bg-white text-brand-secondary p-2 rounded-xl mr-2">View Details</button> */}
                                                    <button onClick={() => redirectTo(user)} className="bg-brand-primary text-white p-2 rounded-xl mr-2">Track Order</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            return link;
                        })}
                        <div className="mb-20"></div>
                    </div>
                </div>
            </div>



        </>
    )
}
export default Myorders;
