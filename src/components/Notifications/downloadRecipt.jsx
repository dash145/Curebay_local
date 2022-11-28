import React, { useEffect, useState, useRef } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "react-datepicker/dist/react-datepicker.css";
import ReactToPrint from "react-to-print";
import { getBillingDetails } from "../../Redux/Actions/payment";
import analytics from "../../Assets/Images/CBLogo.png";
import share from "../../Assets/Images/share.svg";
import {getLocalTime} from '../../Assets/utils/LocalTimeFormat'


export default function DownloadRecipt(props) {
    const dispatch = useDispatch();
    const componentRef = useRef();
    const [billDetail, setBillDetail] = useState([]);
    const [billdetails, setBillDetails] = useState([]);
    const [billMedicins, setbBillMedicins] = useState();

    const redirectTo = (event) => {
        event.preventDefault();
        props.onClose();
    };
    const cancel = (e) => {
        props.closePopup(e);
        e.preventDefault();
    };
    //props.selection[0].txnId
    useEffect(() => {
        dispatch(getBillingDetails(props?.selection?.txnId));
    }, [props?.selection?.txnId]);

    const getBillingDetail = useSelector((state) => state.billingDetails);
    let { isLoading, billingData, isError } = getBillingDetail;


    console.log("detailxx", JSON.stringify(props?.selection));
    // useEffect(() => {
    //     if(Array.isArray(billingData)) {
    //         setBillDetail(billingData);
    //     };

    // }, []);

    // const [billdetails, setBillDetails] = useState({
    //     patientId : billingData[0]?.patientId,
    //     patientName : billingData[0]?.patientName,
    //     patientGender : billingData[0]?.patientGender === 'F' ? 'Female' : 'Male',
    //     patientMobileNumber : billingData[0]?.patientMobileNumber,
    //     totalAmount : billingData[0]?.totalAmount,
    //     serviceName : billingData[0]?.serviceName,
    //     txnId : billingData[0]?.txnId,
    //     paymentDateTime : billingData[0]?.paymentDateTime,
    //     payMode : billingData[0]?.payMode,
    // });

    useEffect(() => {
        // if (Array.isArray(billingData)) {
        //     setBillDetail(billingData);
        // }
        setBillDetails({
            patientId: billingData[0]?.patientId,
            patientName: billingData[0]?.patientName,
            patientGender: billingData[0]?.patientGender === "F" ? "Female" : "Male",
            patientMobileNumber: billingData[0]?.patientMobileNumber,
            totalAmount: billingData[0]?.totalAmount,
            serviceName: billingData[0]?.serviceName,
            txnId: billingData[0]?.txnId,
            paymentDateTime: billingData[0]?.paymentDateTime,
            payMode: billingData[0]?.payMode,
        });
    }, [billingData]);

    console.log(billdetails, "dsfdsifisddijfsd")

    return (
        <>
            <div className="flex justify-center fixed lg:none items-center  overflow-x-scroll hide-scrollbar overflow-y-auto inset-0 z-50 outline-none focus:outline-none">
                <div className=" w-auto my-6 mx-auto w-11/12 lg:w-10/12 h-64">
                    {/*content*/}
                    <div className="border-2 rounded-lg shadow-lg relative sm:-top-10 flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*body*/}
                        <div
                            ref={componentRef}
                            className="relative p-2 md:p-6 flex-auto overflow-y-auto"
                        >
                            <div className="flex justify-between">
                                <p className="text-medium font-medium text-2xl  text-brand-secondary ">
                                    Receipt
                                </p>

                                <XIcon
                                    onClick={() => props.onClose()}
                                    className="h-5 cursor-pointer"
                                />
                            </div>
                            <hr className="border-dash text-black "></hr>
                            <div>
                                {/* <div className="flex pt-2 "> */}

                                <div className="my-2">
                                    <div className="md:flex justify-between items-center md:space-x-10 md:pr-8 lg:my-5">
                                        <div className="relative w-1/2">
                                            <div className="flex ">
                                                <img className="h-8 w-auto " src={analytics} alt="more" />
                                            </div>
                                        </div>

                                    </div>

                                    <hr className="border-dash text-black mt-2 "></hr>

                                    <div className="grid grid-cols-2 md:flex flex-wrap md:flex-nowrap justify-between items-center md:space-x-10 md:pr-8 w-full">


                                        <div className="relative w-1/4">
                                            <div className="flex w-full">
                                                <label
                                                    for="password"
                                                    className=" text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                                >
                                                    <span className="font-medium">Patient Id:</span> {billdetails?.patientId}
                                                </label>
                                            </div>
                                        </div>

                                        <div className="relative w-1/4">
                                          <div className="flex w-full">
                                            <label
                                                for="password"
                                                className=" text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                <span className="font-medium">Name:</span> {billdetails?.patientName}
                                            </label>
                                            </div>
                                        </div>

                                        <div className="relative w-1/4">
                                           <div className="flex w-full">
                                              <label
                                                 for="password"
                                                className="text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                               >

                                                <span className="font-medium">Gender:</span> {billdetails?.patientGender}
                                              </label>
                                            </div>
                                        </div>

                                        <div className="relative w-1/4">
                                         <div className="flex w-full">
                                            <label
                                                for="password"
                                                className="text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                <span className="font-medium">Mobile Number:</span> {billdetails?.patientMobileNumber}
                                            </label>
                                          </div>
                                        </div>


                                    </div>

                                    <hr className="border-dash text-black  "></hr>

                                    {/* <div className="md:flex justify-between items-center py-2 md:py-6 space-y-3 md:spacey-0 md:space-x-10 md:pr-8">
                                        <div className="relative w-1/2">
                                            <div className="flex ">
                                                <input
                                                    autocomplete="off"
                                                    id="email"
                                                    name="email"
                                                    type="text"
                                                    className="peer  w-56 h-10   text-gray-900 focus:outline-none focus:borer-rose-600"
                                                    placeholder=""
                                                    value={billdetails?.totalAmount}
                                                />
                                            </div>
                                            <label
                                                for="password"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                Total Amount
                                            </label>
                                        </div>

                                        <div className="relative w-1/2">
                                            <div className="flex ">
                                                <input
                                                    autocomplete="off"
                                                    id="email"
                                                    name="email"
                                                    type="text"
                                                    className="peer w-56  h-10   text-gray-900 focus:outline-none focus:borer-rose-600"
                                                    placeholder=""
                                                    value={billdetails?.paymentDateTime}
                                                />
                                            </div>
                                            <label
                                                for="password"
                                                className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                            >
                                                Date of Payment
                                            </label>
                                        </div>
                                    </div> */}

                                    <div className="flex justify-end w-full font-medium mr-3 mt-3">
                                        <p>Total (INR): <span className="font-medium text-gray-500 text-sm">{props?.selection?.totalAmount}</span></p>
                                    </div>

                                    <table className="w-full h-full md:h-28 md:divide-y md:divide-gray-200 table mt-5">
                                        <thead className="bg-gray-50">
                                            <tr>

                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 md:text-center text-xs  text-gray-600 font-medium uppercase tracking-wider"
                                                >
                                                    Transaction Type
                                                </th>



                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 md:text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                                                >
                                                    Transaction Id
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 md:text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                                                >
                                                    Amount
                                                </th>

                                                <th
                                                    scope="col"
                                                    className=" px-6 py-3 md:text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                                                >
                                                    Date of Payment
                                                </th>
                                                <th
                                                    scope="col"
                                                    className=" px-6 py-3 md:text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                                                >
                                                    Payment Mode
                                                </th>

                                                {/* <th
                                                    scope="col"
                                                    className="px-6 py-3 md:text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                                                >
                                                    QTY
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 md:text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                                                >
                                                   UNIT PRICE
                                                </th> */}


                                            </tr>
                                        </thead>
                                        <tbody className=" md:divide-y divide-gray-200">


                                            <tr>
                                                <td data-label=" Transaction Type" className="md:px-6 md:py-4">
                                                    <div className="md:flex justify-center items-center">
                                                        <div className=" flex md:space-x-2">

                                                            <div className="text-sm font-medium text-gray-500 ">
                                                                {props?.selection?.serviceName}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td data-label="Transaction Id" className="md:px-6 md:py-4 md:whitespace-nowrap">
                                                    <div className="md:flex md:justify-center items-center">
                                                        <div className=" flex space-x-2">
                                                            <div className="text-sm break-all font-normal text-gray-500 ">
                                                                {props?.selection?.txnId}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td data-label="Amount" className="md:px-6 md:py-4 md:whitespace-nowrap">
                                                    <div className="flex md:justify-center text-sm text-gray-500 ">

                                                        {props?.selection?.totalAmount}
                                                    </div>
                                                </td>

                                                <td data-label="Date of Payment" className="md:px-6 md:py-4 md:whitespace-nowrap">
                                                    <div className="flex md:justify-center text-sm text-gray-500 ">

                                                        {getLocalTime(props?.selection?.createdDate)}
                                                    </div>
                                                </td>

                                                <td data-label="Payment Mode" className="md:px-6 md:py-4 md:whitespace-nowrap">
                                                    <div className="flex md:justify-center text-sm text-gray-500 ">

                                                        {props?.selection?.payMode}
                                                    </div>
                                                </td>






                                            </tr>



                                        </tbody>
                                    </table>


                                    {
                                        props?.selection?.serviceName== "Diagnostics Ordering" &&

                                        <div>


                                    <p className="mt-5 font-medium text-brand-primary">Diagnostics Order Breakup:</p>

                                    <table className="w-full h-full md:h-28 md:divide-y md:divide-gray-200 table mt-5">
                                        <thead className="bg-gray-50">
                                            <tr>

                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 md:text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                                                >
                                                    Test Name
                                                </th>



                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 md:text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                                                >
                                                    Order Id
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 md:text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                                                >
                                                    Total Amount
                                                </th>

                                                <th
                                                    scope="col"
                                                    className=" px-6 py-3 md:text-center text-xs font-medium text-gray-600 uppercase tracking-wider"
                                                >
                                                    Discount Amount
                                                </th>



                                            </tr>
                                        </thead>
                                        <tbody className=" md:divide-y divide-gray-200">

                                            {getBillingDetail?.billingData[0]?.patientLabTestsOrderDetailsList?.map((user, i) => (

                                                <tr>
                                                    <td data-label="Test Name " className="md:px-6 md:py-4">
                                                        <div className="md:flex justify-center items-center">
                                                            <div className=" flex md:space-x-2">

                                                                <div className="text-sm font-medium text-gray-500 ">
                                                                    {user.labTestName}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td data-label="Order Id" className="md:px-6 md:py-4 md:whitespace-nowrap">
                                                        <div className="flex md:justify-center items-center">
                                                            <div className=" flex space-x-2">
                                                                <div className="text-sm font-medium text-gray-500 ">
                                                                    {user.patientLabTestOrderId}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td data-label="Total Amount" className="md:px-6 md:py-4 md:whitespace-nowrap">
                                                        <div className="flex md:justify-center text-sm text-gray-500 ">

                                                            {user.totalAmount}
                                                        </div>
                                                    </td>

                                                    <td data-label="Date" className="md:px-6 md:py-4 md:whitespace-nowrap">
                                                        <div className="flex md:justify-center text-sm text-gray-500 ">

                                                            {user.discountAmount == null ? 0 : user.discountAmount}
                                                        </div>
                                                    </td>

                                                </tr>
                                            )) }



                                        </tbody>
                                    </table>
                                    </div>
                                    }





                                    <div className="md:flex justify-between items-center py-2 md:py-6 space-y-3 md:spacey-0 md:space-x-10 md:pr-8">
                                        {/* <div className="relative w-1/2">
                                            <div className="flex ">
                                                <input autocomplete="off" id="email" name="email" type="text" className="peer w-full  h-10   text-gray-900 focus:outline-none focus:borer-rose-600" placeholder=""  value={billdetails?.payMode} />
                                            </div>
                                            <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Payment Mode</label>
                                        </div> */}
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            onClick={cancel}
                                            className=" text-sm text-brand-secondary font-normal rounded-md py-2 px-3 mr-2 hover:border-brand-secondary"
                                        >
                                            Close
                                        </button>
                                        <ReactToPrint
                                            trigger={() => (
                                                <button
                                                    type="submit"
                                                    onClick={cancel}
                                                    className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2 hover:border-brand-secondary"
                                                >
                                                    Print
                                                </button>
                                            )}
                                            content={() => componentRef.current}
                                        />
                                    </div>
                                </div>


                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
