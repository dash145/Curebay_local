import React, { useState, useEffect, useRef, Fragment } from "react";
import { createPortal } from "react-dom";
import circlepill from "../Assets/Images/circlepill.svg";
// import profileimg from '../Assets/Images/Profileimg.svg';
// import location from '../Assets/Images/locash.svg';
// import phone from '../Assets/Images/phone.svg';
import { useHistory, useLocation } from "react-router";
import Trackmappopup from "./userprofilecomponents/trackmappopup";
// import Dash from './Dash';
import { XIcon, CheckIcon } from "@heroicons/react/outline";
import moment from "moment";
import { parse } from "@fortawesome/fontawesome-svg-core";
import { getLocalTime, getLocalDateWithTime } from "../Assets/utils/LocalTimeFormat";

// const RenderInWindow = (props) => {

//   const history = useHistory();
//   const location = useLocation()

//   const [subOrderID, setSubOrderID] = useState(null);
//   const newWindow = useRef(window);

//   const { state } = location
//   console.log(state?.detail);

//   useEffect(() => {
//     const div = document.createElement("div");
//     setSubOrderID(div);
//   }, []);

//   useEffect(() => {
//     if (subOrderID) {
//       newWindow.current = window.open(
//         `https://curebayordertrack.ntb.one/?orderid=${state.location.subOrderID}`,

//         "width=600,height=400,left=200,top=200"
//       );
//       newWindow.current.document.body.appendChild(subOrderID);
//       const curWindow = newWindow.current;
//       return () => curWindow.close();
//     }
//   }, [subOrderID]);

//   return subOrderID && createPortal(props.children, subOrderID);

// }

function Medicinedeliveryorderdetails(props) {
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState();

  const [state,setState]= useState(JSON.parse(localStorage.getItem("detail")))

  // const [subOrderID, setSubOrderID]=usestate(null);
  // const newWindow = useRef(window);

  //const { state } = location;

  //let state = JSON.parse(localStorage.getItem("detail"));
  // console.log(state?.detail.orderDetails[0].orderItems,"qwertyuiop");

 

  let windowObjectReference;
  let windowFeatures = "left=100,top=100,width=320,height=320";

  const [showtrackpopup, setshowtrackpopup] = useState("");

  function openRequestedPopup(e) {
    // e.preventDefault();

    setshowtrackpopup(e);
  }

  useEffect(() => {
    console.log(JSON.stringify(state), "vishal");
    console.log(JSON.stringify(location.state), "location");

     let stateDetails = JSON.parse(localStorage.getItem("detail"));

    setState({detail:stateDetails})
  
  }, []);

  // useEffect(() => {
  //   if (subOrderID) {
  //     newWindow.current = window.open(
  //       `https://curebayordertrack.ntb.one/?orderid=${state.location.subOrderID}`,

  //       "width=600,height=400,left=200,top=200"
  //     );
  //     newWindow.current.document.body.appendChild(subOrderID);
  //     const curWindow = newWindow.current;
  //     return () => curWindow.close();
  //   }
  // }, [subOrderID]);

  // return subOrderID && createPortal(props.children, subOrderID);

  const getDiscount = (user1) => {
    let dis =
      parseFloat(user1.unitPrice).toFixed(2) *
      parseFloat(user1.quantity).toFixed(2) -
      parseFloat(user1.totalAmount).toFixed(2);
    return parseFloat(dis).toFixed(2);
  };


  const orderTimeline = [
    {
      status: "Order Confirmed",
      icon: "pi pi-shopping-cart",
      color: "#9C27B0",
      image: "game-controller.jpg",
    },
    { status: "Assigned", icon: "pi pi-cog", color: "#673AB7" },
    { status: "Accepted", icon: "pi pi-shopping-cart", color: "#FF9800" },
    { status: "In Transit", icon: "pi pi-check", color: "#607D8B" },
    { status: "Delivered", icon: "pi pi-check", color: "#607D8B" },
  ];
  return (
    <>
      {/* <Dash></Dash> */}

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
          <a href="/profile/mediceineorders">Medicine Orders</a>
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
          <a >Order Details</a>

          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </li>
      </ul>

      <body class=" flex justify-center items-center mb-10">
        <div class="w-full md:w-11/12 flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden mt-4">
          <div class="text-gray-700 text-lg px-6 py-4 border-b border-gray-200">
            <p class="text-2xl  text-gray-600 font-medium pb-5">
              Order Details
            </p>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
              <div>
                <p class="text-sm font-medium text-gray-400">Order ID</p>
                <p class="text-sm font-medium text-gray-500">
                  {state?.detail?.patientOrderId === null ||
                    state?.detail?.patientOrderId === undefined ||
                    state?.detail?.patientOrderId === 0
                    ? ""
                    : state?.detail?.patientOrderId}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-400">
                  Delivery Address
                </p>
                <p class="text-sm font-medium text-gray-500">
                  {state?.detail?.deliveryAddress1 === null
                    ? ""
                    : state?.detail?.deliveryAddress1}{" "}
                  <br />{" "}
                  {state?.detail?.deliveryAddress2 === null
                    ? ""
                    : state?.detail?.deliveryAddress2}{" "}
                  <br />{" "}
                  {state?.detail?.deliveryAddress3 === null
                    ? ""
                    : state?.detail?.deliveryAddress3 +
                      "," +
                      "Pincode:" +
                      state?.detail?.deliveryPinCode ===
                      null
                      ? ""
                      : state?.detail?.deliveryPinCode}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-400">Placed On </p>
                <p class="text-sm font-medium text-gray-500">
                  {state?.detail?.paymentDateTime === null
                    ? ""
                    : getLocalDateWithTime(state?.detail?.paymentDateTime)}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-400">
                  Scheduled Delivery
                </p>
                <p class="text-sm font-medium text-gray-500">
                  {state?.detail?.scheduledDelivery === null
                    ? ""
                    : getLocalDateWithTime(state?.detail?.scheduledDelivery)}{" "}
                </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-400">Amount Paid</p>
                <p class="text-sm font-medium text-gray-500 ">
                  INR{" "}
                  {parseFloat(
                    state?.detail?.orderAmount === null ||
                      state?.detail?.orderAmount === 0
                      ? ""
                      : state?.detail?.orderAmount
                  ).toFixed(2)}
                </p>
              </div>
              {/* <div>
                <p class="text-sm font-medium text-gray-400">Order Status</p>
                <p class="text-sm font-medium text-gray-500">{state?.detail?.orderStatus === null ? "No Order Status" : state?.detail?.orderStatus}</p>
              </div> */}
              {/* <div>
                  <button class="bg-brand-secondary  text-white py-2 px-4 rounded">
                    Check-In
                  </button>
                </div> */}
            </div>
          </div>

          {/* <div className="flex  px-6 py-4">
              <img src={circlepill} alt="pill" className="w-16" />
              <div className=" px-3 ">
                <p className="text-sm text-gray-700 font-medium">{state?.detail?.patientDrugPrescriptionOrderDetailsList[0]?.drugName}</p>
                <p className="text-xs text-gray-600 font-medium mt-2">Seller :<span className="text-xs text-gray-600 font-medium">&nbsp;{state.detail?.hospitalName}</span></p>
                <p className="text-xs text-gray-600 font-medium mt-2">Quantity :<span> &nbsp;{state?.patientLabTestsOrderDetailsList[0]?.quantity}</span></p>
              </div>
            </div> */}

          {state?.detail?.refundableAmountForItems?.length > 0 ? (
            <>
              {" "}
              <div className="text-sm font-medium text-gray-600 m-5 ">
                <h3>REFUNDED ITEMS</h3>
                <hr />
              </div>{" "}
              <div className="flex">
                <div className="flex w-full justify-start mx-1 md:mx-5">
                  <table class="border overflow-x-scroll border-2-gray rounded-lg text-center text-sm w-full">
                    <thead className="border-b border-2-gray">
                      <tr className="">
                        <th className="border-r border-b border-2-gray font-medium pl-2 text-left  text-gray-700 py-3">
                          ITEM NAME
                        </th>
                        <th className="border-r border-2-gray font-medium  text-center text-gray-700 px-6 py-3">
                          QTY
                        </th>
                        <th className="border-r border-2-gray font-medium  text-center text-gray-700 py-3">
                          UNIT PRICE
                        </th>
                        <th className="border-r border-2-gray font-medium  text-center text-gray-700 py-3">
                          DISCOUNT PRICE
                        </th>
                        <th className="border-r border-2-gray font-medium  text-center text-gray-700 py-3">
                          TOTAL AMOUNT
                        </th>
                      </tr>
                    </thead>

                    {state?.detail?.refundableAmountForItems.map((user1,i) => {
                      return (
                        <>
                          <tbody key={i}>
                            <tr className="border-b border-2-gray text-sm font-medium text-gray-500">
                              <td className="border-r border-b border-2-gray text-left pl-2 py-3">
                                {user1.drugName}
                              </td>
                              <td className="border-r border-b border-2-gray text-center px-6 py-3">
                                {user1.quantity}
                              </td>
                              <td className="border-r border-b border-2-gray text-center py-3">
                                ₹ {parseFloat(user1.unitPrice).toFixed(2)}
                              </td>
                              <td className="border-r border-b border-2-gray text-center py-3">
                                ₹ {parseFloat(user1.discountAmount).toFixed(2)}
                              </td>
                              <td className="border-r border-b border-2-gray text-center py-3">
                                ₹ {parseFloat(user1.totalAmount).toFixed(2)}
                              </td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })}
                  </table>
                </div>
              </div>{" "}
            </>
          ) : null}

          {/* SHIPMENT DETAILS */}
          <div>
            {state?.detail?.orderDetails.some((el) => el.subOrderId != 0) ? (
              <div className="text-sm font-medium text-gray-600 m-5 ">
                <h3>SUB ORDER DETAILS</h3>
                <hr />
              </div>
            ) : null}
          </div>

          {/* First SubOrder */}

          {state?.detail?.orderDetails?.map((user, i) => {
            console.log(i, "hey i");
            return (
              <div className="flex flex-col mb-10" key={i}>
                <div className="flex flex-col mb-10">
                  <div className=" text-sm font-medium text-gray-400 mx-5 mb-5">
                    {user.subOrderId !== 0 ? (
                      <h3>
                        Sub Order ID:
                        <span className="text-gray-600">
                          {" "}
                          {user.subOrderId}
                        </span>
                      </h3>
                    ) : null}
                    {user.orderStatus != "" ? (
                      <div className="md:flex items-center mt-6">
                        <h3>
                          Order Status:
                          {/* <span className="text-gray-600"> {user.orderStatus}</span> */}
                        </h3>

                        {/* <div class="flex flex-col md:grid grid-cols-12 text-gray-50">
                          <div class="flex md:contents">
                            <div class="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                              <div class="h-full w-6 flex items-center justify-center">
                                <div class="h-full w-1 bg-green-500 pointer-events-none"></div>
                              </div>
                              <div class="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
                                <i class="fas fa-check-circle text-white"></i>
                              </div>
                            </div>
                          </div>
                        </div> */}
                        <div className="">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between relative  mt-8 md:ml-8 w-full" >
                          {
                            ((user?.orderStatusNum >= 6 && user?.orderStatusNum <= 9) || user?.orderStatusNum == 14 || user?.orderStatusNum == 15) ?
                            null
                            : <div className="w-1 sm:w-full h-full sm:h-1 absolute bg-blue-400 "></div>
                          }

                          {user?.orderStatusNum == 0 ? (
                            <>
                              <div className="bg-green-600 relative  rounded-full shadow w-6 h-6 z-10 border border-black">
                                <div className="whitespace-nowrap absolute -top-6 ">
                                  Order Placed
                                </div>
                              </div>
                              <div className="bg-gray-50 rounded-full shadow w-6 h-6 z-10 border border-black"></div>
                            </>
                          ) : user?.orderStatusNum == 1 ? (
                            <>
                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                  Placed
                                </div>
                              </div>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-6">
                                Confirmed
                                </div>
                              </div>

                              <input className="w-5 h-5 z-10 relative -left-2 sm:-left-0" type= "checkbox" checked = {false} />
                            </>
                          ) : user?.orderStatusNum == 2 ? (
                            <>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                  Placed
                                </div>
                              </div>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-6">
                                Confirmed
                                </div>
                              </div>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                Assigned
                                </div>
                              </div>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                Accepted
                                </div>
                              </div>



                              <input className="w-5 h-5 z-10 relative -left-2 sm:-left-0" type= "checkbox" checked = {false} />
                            </>
                          ) : user?.orderStatusNum == 3 ? (
                            <>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                Placed
                                </div>
                              </div>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-6">
                                Confirmed
                                </div>
                              </div>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                Assigned
                                </div>
                              </div>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                Accepted
                                </div>
                              </div>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                Picked Up
                                </div>
                              </div>

                              <input className="w-5 h-5 z-10 relative -left-2 sm:-left-0" type= "checkbox" checked = {false} />

                            </>
                          ) : user?.orderStatusNum == 4 ? (
                            <>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                Placed
                                </div>
                              </div>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-6">
                                Confirmed
                                </div>
                              </div>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                Assigned
                                </div>
                              </div>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                Accepted
                                </div>
                              </div>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                Picked Up
                                </div>
                              </div>

                              {/* <div className="z-10 relative h-8 lg:w-20">
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                Picked Up
                                </div>
                              </div> */}

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                In Transit
                                </div>
                              </div>

                              <input className="w-5 h-5 z-10 relative -left-2 sm:-left-0" type= "checkbox" checked = {false} />
                            </>
                          ) : user?.orderStatusNum == 5 ?



                            (
                              <>
                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                Placed
                                </div>
                              </div>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-6">
                                Confirmed
                                </div>
                              </div>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                Assigned
                                </div>
                              </div>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                Accepted
                                </div>
                              </div>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                Picked Up
                                </div>
                              </div>

                              <div className="z-10 relative h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                In Transit
                                </div>
                              </div>

                              <div className="z-10 relative bg-white h-8 lg:w-20">
                                {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                Delivered
                                </div>
                              </div>
                              </>
                            ): user?.orderStatusNum == 16 ? (
                              <>
  
                                <div className="z-10 relative h-8 lg:w-20">
                                  {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                  <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                  <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                    Placed
                                  </div>
                                </div>
  
                                <div className="z-10 relative h-8 lg:w-20">
                                  {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                  <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                  <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-6">
                                  Confirmed
                                  </div>
                                </div>
  
                                <div className="z-10 relative h-8 lg:w-20">
                                  {/* <div className="bg-green-600 absolute top-1 rounded-full shadow w-6 h-6 border border-black" ></div> */}
                                  <input className="w-5 h-5 absolute -left-2 sm:top-1" type= "checkbox" checked = {true} />
                                  <div className="whitespace-nowrap relative left-6 sm:-top-6 sm:-left-4">
                                  Assigned
                                  </div>
                                </div>
  
  
  
                                <input className="w-5 h-5 z-10 relative -left-2 sm:-left-0" type= "checkbox" checked = {false} />
                              </>
                            ) : user?.orderStatusNum == 6 ?
                              <>
                                {/* <div className="bg-green-600 relative  rounded-full shadow w-6 h-6 z-10 border border-black"> */}
                                  <div className="whitespace-nowrap absolute -top-6 ">
                                    Order Placed
                                  </div>
                                {/* </div>
                                <div className="bg-gray-50 rounded-full shadow w-6 h-6 z-10 border border-black"></div> */}
                              </> : user?.orderStatusNum == 7 ?
                                <>
                                  {/* <div className="bg-green-600 relative  rounded-full shadow w-6 h-6 z-10 border border-black"> */}
                                    <div className="whitespace-nowrap absolute -top-6 ">
                                    Cancelled By Pharmacy
                                    </div>
                                  {/* </div>
                                  <div className="bg-gray-50 rounded-full shadow w-6 h-6 z-10 border border-black"></div> */}
                                </> : user?.orderStatusNum == 8 ?
                                  <>
                                    {/* <div className="bg-green-600 relative  rounded-full shadow w-6 h-6 z-10 border border-black"> */}
                                      <div className="whitespace-nowrap absolute -top-6 ">
                                      Rejected
                                      </div>
                                    {/* </div>
                                    <div className="bg-gray-50 rounded-full shadow w-6 h-6 z-10 border border-black"></div> */}
                                  </> : user?.orderStatusNum == 9 ?

                                    <>
                                      {/* <div className="bg-green-600 relative  rounded-full shadow w-6 h-6 z-10 border border-black"> */}
                                        <div className="whitespace-nowrap absolute -top-6 ">
                                        Not Paid
                                        </div>
                                      {/* </div>
                                      <div className="bg-gray-50 rounded-full shadow w-6 h-6 z-10 border border-black"></div> */}
                                    </> : user?.orderStatusNum == 14 ?
                                      <>
                                        {/* <div className="bg-green-600 relative  rounded-full shadow w-6 h-6 z-10 border border-black"> */}
                                          <div className="whitespace-nowrap absolute -top-6 ">
                                          Refunded
                                          </div>
                                        {/* </div> */}
                                        {/* <div className="bg-gray-50 rounded-full shadow w-6 h-6 z-10 border border-black"></div> */}
                                      </> : user?.orderStatusNum == 15 ?
                                        <>
                                          {/* <div className="bg-green-600 relative  rounded-full shadow w-6 h-6 z-10 border border-black"> */}
                                            <div className="whitespace-nowrap absolute -top-6 ">
                                            Partially Refunded
                                            </div>
                                          {/* </div>
                                          <div className="bg-gray-50 rounded-full shadow w-6 h-6 z-10 border border-black"></div> */}
                                        </> : <>
                                        </>




                          }
                        </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div></div>
                  <div className="flex">
                    <div className="flex w-full justify-start mx-1 md:mx-5">
                      <table class="border overflow-x-scroll border-2-gray rounded-lg text-center text-sm w-full">
                        {user?.orderItems.length > 0 && (
                          <thead className="border-b border-2-gray">
                            <tr className="">
                              <th className="border-r border-b border-2-gray font-medium pl-2 text-left  text-gray-700 py-3">
                                ITEM NAME
                              </th>
                              <th className="border-r border-2-gray font-medium  text-center text-gray-700 px-6 py-3">
                                QTY
                              </th>
                              <th className="border-r border-2-gray font-medium  text-center text-gray-700 py-3">
                                UNIT PRICE
                              </th>
                              <th className="border-r border-2-gray font-medium  text-center text-gray-700 py-3">
                                DISCOUNT PRICE
                              </th>
                              <th className="border-r border-2-gray font-medium  text-center text-gray-700 py-3">
                                TOTAL AMOUNT
                              </th>
                            </tr>
                          </thead>
                        )}

                        {user?.orderItems.map((user1,i) => {
                          console.log("mydrug", user?.orderItems, "hey i");
                          return (
                            <>
                              <tbody key={i}>
                                <tr className="border-b border-2-gray text-sm font-medium text-gray-500">
                                  <td className="border-r border-b border-2-gray text-left pl-2 py-3">
                                    {user1.drugName}
                                  </td>
                                  <td className="border-r border-b border-2-gray text-center px-6 py-3">
                                    {user1.quantity}
                                  </td>
                                  <td className="border-r border-b border-2-gray text-center py-3">
                                    ₹ {parseFloat(user1.unitPrice).toFixed(2)}
                                  </td>
                                  <td className="border-r border-b border-2-gray text-center py-3">
                                    ₹{" "}
                                    {parseFloat(user1.discountAmount).toFixed(
                                      2
                                    )}
                                  </td>
                                  <td className="border-r border-b border-2-gray text-center py-3">
                                    ₹ {parseFloat(user1.totalAmount).toFixed(2)}
                                  </td>
                                </tr>
                              </tbody>
                            </>
                          );
                        })}
                      </table>
                    </div>
                  </div>

                  {( user?.orderStatusNum == 3 || user?.orderStatusNum == 4 || user?.orderStatusNum == 2) ?(
                    <button
                      className="flex text-sm font-medium bg-brand-primary text-align:center container text-white mx-5 my-5 w-32 p-3 rounded-md"
                      onClick={(e) => openRequestedPopup(user.subOrderId)}
                    >
                      Track on Map
                    </button>
                  ):null}

                  {showtrackpopup === user.subOrderId ? (
                    <Trackmappopup
                      orderID={
                        user.subOrderId
                          ? user.subOrderId
                          : state?.detail?.patientOrderId
                      }
                      closePopup={(e) => setshowtrackpopup("")}
                    ></Trackmappopup>
                  ) : null}

                  {/* Refund */}

                  <div className="flex text-sm font-medium text-gray-400 mx-5 mb-5">
                    {user.refundableAmountForItems.length !== 0 ? (
                      <h3>
                        Refund ID:
                        <span className="text-gray-600">
                          {" "}
                          {user.refundableAmountForItems[0].refundId}
                        </span>
                      </h3>
                    ) : null}
                  </div>
                  <div className="flex">
                    <div className="flex w-full justify-start mx-1 md:mx-5">
                      <table class="border overflow-x-scroll rounded-lg border-2-gray text-left text-sm w-full">
                        {user?.refundableAmountForItems.length > 0 && (
                          <thead className="border-b border-2-gray">
                            <tr className="">
                              <th className="border-r border-2-gray font-medium  pl-2 text-gray-700 py-3">
                                ITEM NAME
                              </th>
                              <th className="border-r border-2-gray font-medium  text-center text-gray-700 px-6 py-3">
                                QTY
                              </th>
                              <th className="border-r border-2-gray font-medium  text-center text-gray-700 py-3">
                                UNIT PRICE
                              </th>
                              <th className="border-r border-2-gray font-medium  text-center text-gray-700 py-3">
                                DISCOUNT PRICE
                              </th>
                              <th className="border-r border-2-gray font-medium  text-center text-gray-700 py-3">
                                TOTAL AMOUNT
                              </th>
                            </tr>
                          </thead>
                        )}

                        {user?.refundableAmountForItems.map((user1,i) => {
                          return (
                            <>
                              <tbody key={i}>
                                <tr className="text-sm font-medium text-gray-500">
                                  <td className="border-r border-b border-2-gray pl-2 pt-3 py-3">
                                    {user1.drugName}
                                  </td>
                                  <td className="border-r border-b border-2-gray text-center px-6 py-3">
                                    {user1.quantity}
                                  </td>
                                  <td className="border-r border-b border-2-gray text-center py-3">
                                    {parseFloat(user1.unitPrice).toFixed(2)}
                                  </td>
                                  <td className="border-r border-b border-2-gray text-center py-3">
                                    {parseFloat(user1.discountAmount).toFixed(
                                      2
                                    )}
                                  </td>
                                  <td className="border-r border-b border-2-gray text-center py-3">
                                    {parseFloat(user1.totalAmount).toFixed(2)}
                                  </td>
                                </tr>
                              </tbody>
                            </>
                          );
                        })}
                      </table>
                    </div>
                  </div>

                  {/* {user?.refundableAmountForItems.map((user2) => {
                    return (
                      <p className="font-medium  text-gray-700 mt-5 mx-5">Refund:
                        <span>{user2.reasonForRefund}</span>
                      </p>
                    )
                  })} */}
                </div>

                {/* <div className="md:w-full px-64 pt-5 mx-auto">
              <div className="h-1 flex items-center justify-between">
                <div className={`w-96 ${state?.detail?.status === 6 || state?.detail?.status === 7 ? 'bg-red-600 ' : state?.detail?.status >= 10 ? 'bg-green-500 ' : 'bg-gray-400 '} content-center h-1 flex items-center`}>
                  <div className={`bg-green-500 h-6 w-6 rounded-full shadow flex items-center justify-center`}>
                    <CheckIcon color={'white'}></CheckIcon>
                  </div>
                </div>
                <div className={`w-96 ${state?.detail?.status === 6 || state?.detail?.status === 7 ? 'bg-red-600 ' : state?.detail?.status >= 10 ? 'bg-green-500 ' : 'bg-gray-400 '} h-1 flex items-center`}>
                  <div className={`${state?.detail?.status === 6 || state?.detail?.status === 7 ? 'bg-red-600 ' : state?.detail?.status >= 9 ? 'bg-green-500 ' : 'bg-gray-400 '} h-6 w-6 rounded-full shadow flex items-center justify-center`}>

                    {state?.status === 6 || state?.status === 7 ? <XIcon color={'white'}></XIcon> : state?.status >= 9 ? <CheckIcon color={'white'}></CheckIcon> : <CheckIcon color={'gray'}></CheckIcon>}
                  </div>
                </div>
                <div className={`${state?.detail?.status === 6 || state?.detail?.status === 7 ? 'bg-red-600 ' : state?.detail?.status >= 10 ? 'bg-green-500 ' : 'bg-gray-400 '} h-1 flex items-center`}>
                  <div className={`${state?.detail?.status === 6 || state?.detail?.status === 7 ? 'bg-red-600 ' : state?.detail?.status >= 10 ? 'bg-green-500 ' : 'bg-gray-400 '} h-6 w-6 rounded-full shadow flex items-center justify-center`}>
                    {state?.detail?.status === 6 || state?.detail?.status === 7 ? <XIcon color={'white'}></XIcon> : state?.detail?.status >= 10 ? <CheckIcon color={'white'}></CheckIcon> : <CheckIcon color={'gray'}></CheckIcon>}
                  </div>
                </div>
              </div>

            </div> */}

                {/* <div class="content-center flex items-center justify-between w-full lg:w-full px-32  mx-auto ">



              <p className="text-xs font-medium pt-6 text-green-500 w-32">Order Placed <br />at {state?.detail?.hospitalName} <br />{moment(state?.detail?.createdDate, 'yyyy-MM-DD hh:mm:ss').format('DD,MMMM, hh:mm A')}</p>
              {state?.detail?.status === 6 || state?.detail?.status === 7 ? <p className={`text-xs font-medium pt-6 text-red-600`}>Order Canceled </p> :
                <>           {state?.detail?.status >= 9 ? <p className={`text-xs font-medium pt-6 text-green-500 `}>Order Picked up <br />from Pharmacy<br /> </p> : ''}
                  {state?.detail?.status >= 10 ? <p className={`text-xs font-medium pt-6 text-green-500`}>Order Delivered <br />{moment(state?.detail?.modifiedDate, 'yyyy-MM-DD hh:mm:ss').format('DD,MMMM, hh:mm A')} </p> : ''}</>
              }



            </div> */}
              </div>
            );
          })}

          {/* First SubOrder ends */}

          {/* button */}
          <div class="px-6 py-4 flex justify-between mt-5">
            <p></p>
          </div>
        </div>
      </body>
      <br />
    </>
  );
}
export default Medicinedeliveryorderdetails;
