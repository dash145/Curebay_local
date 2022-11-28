import kaspersky from "../Assets/Images/Laboratory-bro.svg";
import noDataFound from "../Assets/Images/No data-found.svg";
import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setLoginModal } from "../Redux/Actions/userActions";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import {
  MinusIcon,
  PlusIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowCircleDownIcon,
} from "@heroicons/react/outline";

import { getElasticPartnerslist } from "../Redux/Actions/DiagnosticsActions";

import {
  AddtoCart,
  getCartDetails,
} from "../Redux/Actions/cartPlaceOrderAction";
import SectionContainer from "./SectionContainer";
import moment from "moment";

import axios from "axios";

import labImage from "../Assets/Images/lab.svg";

var positionScroll = 0;
var positionScroll1 = 0;

function AllLabs(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const address = useSelector((state) => state.authReducer.address);
  const lablistData = useSelector((state) => state.listpartnerslab);
  const { partnerlablisttData, isLoading } = lablistData;
  const { coords } = useSelector((state) => state.authReducer);
  const history = useHistory();
  const [isAdding, setIsAdding] = useState(-1);
  const { cartList } = useSelector((state) => state.cartReducer);
  const userData = useSelector((state) => state.authReducer.patientData);

  const search_params = useLocation().search;
  const drugIDsInCart = getProductsIDs();
  const search_query = new URLSearchParams(search_params).get("search_query");
  const [isFetchingPinCode, setIsFetchingPinCode] = useState(false);
  const [currentPinCode, setCurrentPincode] = useState("");
  const [searchedLabtest, setSearchedLabtest] = useState([]);
  const [position, setPosition] = useState({});

  const [screen, setscreen] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;

      setscreen(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  const redirectTo = (event, data) => {
    event.preventDefault();
    if (!props.ePrescription) {
      history.push({ pathname: APP_ROUTES.LALPATH_LAB, state: data });
    }
  };

  const redirectToLogin = (event, location) => {
    event.preventDefault();
    history.push(location);
  };

  const redirectToSearch = (event, data) => {
    event.preventDefault();
    if (props.ePrescription) {
      props.diagnosticsSelected({
        storeId: data.hospitalCode,
        locationId: data.code,
      });
    }
  };
  console.log(props, "gettingpreops");

  function getProductsIDs() {
    let ids = [];
    if (cartList) {
      if (cartList.patientLabTestsOrder) {
        for (const product of cartList.patientLabTestsOrder) {
          // if (product && product.patientLabTestsOrderDetailsList) {
          for (const drug of product.patientLabTestsOrderDetailsList) {
            ids.push(drug.labTestCode);
          }
          // }
        }
      }
    }
    console.log("Drug Info Ids", ids);
    return ids;
  }

  useEffect(() => {
    if (coords) {
      setIsFetchingPinCode(false);
      dispatch(getElasticPartnerslist(coords));
    }
  }, [coords]);

  useEffect(() => {
    if (coords && search_query) {
      axios
        .get(
          `${process.env.REACT_APP_ELASTIC_BASEURL}labtest?latitude=${coords.lat}&longitude=${coords.long}&freeTextSearch=${search_query}`
        )
        .then((res) => {
          console.log("isddddass", JSON.stringify(res.data));
          setSearchedLabtest(res.data);
        });
    }
  }, [coords, search_query]);

  const onClickAt = (index) => {
    searchedLabtest[index].isActive =
      searchedLabtest[index].isActive === true ? false : true;

    setSearchedLabtest([...searchedLabtest]);
  };

  // React ref to store array of refs
  const scrollRefs = useRef([]);

  const scrollRefs1 = useRef([]);

  // Populate scrollable refs, only create them once
  // if the selectedElements array length is expected to change there is a workaround
  scrollRefs.current = [...Array(partnerlablisttData.length).keys()].map(
    (_, i) => scrollRefs?.current[i] ?? createRef()
  );

  scrollRefs1.current = [...Array(partnerlablisttData?.length).keys()].map(
    (_, i) => scrollRefs1?.current[i] ?? createRef()
  );

  // Curried handler to take index and return click handler

  const handleScroll1 = (e, dir) => {
    if (dir == "rightArrow") {
      positionScroll1 = positionScroll1 + 10;
    } else {
      positionScroll1 = positionScroll1 - 3;
    }
    if (positionScroll1 > partnerlablisttData.length) {
      positionScroll1 = partnerlablisttData.length - 1;
    }
    if (positionScroll1 < 0) {
      positionScroll1 = 0;
    }
    scrollRefs1?.current[positionScroll1]?.current?.scrollIntoView({
      block: "end",
      inline: "nearest",
      behavior: "smooth",
    });
  };

  const handleScroll = (e, dir) => {
    if (dir == "rightArrow") {
      positionScroll = positionScroll + 8;
    } else {
      positionScroll = positionScroll - 3;
    }
    if (positionScroll > partnerlablisttData.length) {
      positionScroll = partnerlablisttData.length - 1;
    }
    if (positionScroll < 0) {
      positionScroll = 0;
    }
    scrollRefs?.current[positionScroll]?.current?.scrollIntoView({
      block: "end",
      inline: "nearest",
      behavior: "smooth",
    });
  };

  const addtoCart = (e, data, index, quantity = 1) => {
    if (!userData.code) {
      redirectToLogin(e, {
        pathname: APP_ROUTES.LOGIN,
        state: { background: location, login: true },
      });
    }
    e.preventDefault();
    setIsAdding(index);
    console.log("data hai", JSON.stringify(data));
    let prescriptionRequired = "N";
    let ePrescriptionRequired = "N";

    if (data?.medicinePrescriptionRequired == "N") {
      prescriptionRequired = "N";
      ePrescriptionRequired = "N";
    } else if (data?.medicinePrescriptionRequired == "Y") {
      prescriptionRequired = "Y";
      ePrescriptionRequired = "Y";
    }
    let calculatedAmount = data?.amount;
    const totalAmount = calculatedAmount * quantity;

    console.log("totalAmount", totalAmount);
    let dataObj = {};

    if (cartList && cartList.patientLabTestsOrder) {
      cartList.patientLabTestsOrder.map((res) => {
        res.patientLabTestsOrderDetailsList.push({
          patientLabTestOrderId: data.id,
          labTestCode: data.labTestCode,
          labTestName: data.labTestName,
          hospitalId: data.labId,
          locationId: data.locationId,
          amount: data.amount,
          discountAmount: data?.discountAmount,
          totalAmount: totalAmount,
          labTestType: data.testType,
          status: 1,

          quantity: quantity,
          cartId: cartList && cartList.id ? cartList.cartId : "",
          createdBy: userData.code,
          createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
          modifiedBy: userData.code,
          modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
          orderId: null,
          patientId: userData.code,
          prescriptionRequired: prescriptionRequired,
          ePrescriptionRequired: ePrescriptionRequired,
          medicineTypeOfSell: null,
        });
      });
      dataObj = cartList;
    } else {
      dataObj = {
        cartId: cartList && cartList.id ? cartList.cartId : "",
        createdBy: userData.code,
        createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
        modifiedBy: userData.code,
        modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
        orderId: null,
        patientId: userData.code,
        status: 1,

        labOrdersYN: true,
        drugsOrdersYN: false,
        totalAmount: totalAmount,
        patientLabTestsOrder: [
          {
            hospitalId: data.labId,
            locationId: data.locationId,

            orderId: "",
            patientId: userData.code,
            orderDetailsRequired: "Y",
            prescriptionId: null,
            cartId: cartList && cartList.id ? cartList.cartId : "",
            txnId: "",
            amount: totalAmount,
            address1: data.address1,
            address2: data.address2,
            address3: null,
            city: data.city,
            state: data.state,
            country: null,
            pincode: data.pinCode,
            deliveryAddress1: data.address1,
            deliveryAddress2: data.address2,
            deliveryAddress3: null,
            deliveryCity: data.city,
            deliveryState: data.state,
            deliveryCountry: null,
            deliveryZipcode: data.pinCode,
            createdBy: userData.code,
            createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
            modifiedBy: userData.code,
            modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
            status: 1,
            procedureStatus: -1,
            payMode: "E",
            collectionStatus: null,
            paymentLinkForPatient: "N",
            discountCouponCode: null,
            patientName: userData.firstName,
            patientGender: userData?.gender,
            patientMobile: userData?.mobile,
            patientLabTestsOrderDetailsList: [
              {
                patientLabTestOrderId: data.id,
                labTestCode: data.labTestCode,
                labTestName: data.labTestName,
                hospitalId: data.labId,
                locationId: data.locationId,
                amount: data.amount,
                discountAmount: data?.discountAmount,
                totalAmount: totalAmount,
                status: 1,
                labTestType: data.testType,
                tat: data?.tat,
                description: data?.description,
                

                quantity: quantity,
                cartId: cartList && cartList.id ? cartList.cartId : "",
                createdBy: userData.code,
                createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
                modifiedBy: userData.code,
                modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
                orderId: null,
                patientId: userData.code,
                prescriptionRequired: prescriptionRequired,
                ePrescriptionRequired: ePrescriptionRequired,
                medicineTypeOfSell: null,
              },
            ],
          },
        ],
        // };
      };
    }
    console.log(JSON.stringify(dataObj), "helloooo");

    dispatch(AddtoCart(dataObj)).then((res) => {
      dispatch(getCartDetails(userData.code));
    });
  };

  const renderAmount = (res) => {
    return (
      <>
        {" "}
        {res?.discountPercentage ? (
          <div>
            <div>
              {" "}
              <span className="text-gray-500 line-through text-xs font-medium">
                ₹ {res?.amount}
              </span>{" "}
              <span className="text-xs text-green-500 font-medium">
                ₹ {res?.discountAmount}
              </span>{" "}
            </div>
            <div className="border border-dashed border-green-500 text-xs bg-green-50 text-green-500 font-medium py-1 px-2">
              {res?.discountPercentage}% off
            </div>
          </div>
        ) : (
          <div className="w-full ">
            <div>
              {" "}
              <span className="text-xl text-neutral-800 font-bold">
                ₹ {res?.amount}
              </span>{" "}
            </div>
          </div>
        )}
      </>
    );
  };

  if (searchedLabtest && searchedLabtest.length && search_query) {
    return (
      <div className="mt-5">
        <p className="text-lg sm:text-lg md:text-xl lg:text-xl font-bold text-gray-800 mb-0 w-full  flex justify-center">
          Available Lab Test(s)
        </p>

        <div
          className="w-full sm:w-4/5 md:w-5/6 mt-6"
          style={{ margin: "auto", marginTop: "2rem" }}
        >
          {searchedLabtest.map((res, index) => {
            return (
              // <div key={res.id} className="border mb-6 p-2 px-4 rounded shadow">
              //   <h6 className="text-sm  font-medium text-gray-900">
              //     {res?.labTestName}
              //   </h6>
              //   <div className="flex justify-between items-center">
              //     <div>
              //       <div className="text-xs  text-gray-400">
              //         {res?.locationName}
              //       </div>
              //       <div className="text-sm  text-gray-900 my-1">
              //         Lab -{" "}
              //         <span className="text-xs  text-gray-400">
              //           {res?.labName}
              //         </span>
              //       </div>
              //     </div>
              //     {res?.discountAmount ? (
              //       <div>
              //         <div>
              //           {" "}
              //           <span className="text-gray-500 line-through text-xs font-medium">
              //             ₹ {res?.amount}
              //           </span>{" "}
              //           <span className="text-xs text-green-500 font-medium">
              //             ₹ {res?.discountAmount}
              //           </span>{" "}
              //         </div>
              //         <div className="border border-dashed border-green-500 text-xs bg-green-50 text-green-500 font-medium py-1 px-2">
              //           {res?.discountPercentage}% off
              //         </div>
              //       </div>
              //     ) : (
              //       <div>
              //         <div>
              //           {" "}
              //           <span className="text-sm text-green-500 font-medium">
              //             ₹ {res?.amount}
              //           </span>{" "}
              //         </div>

              //       </div>
              //     )}
              //   </div>
              //   <div className="flex justify-end mt-4">
              //     <button className="bg-brand-secondary text-white  text-sm font-medium px-2 py-2 rounded cursor-pointer"

              //     onClick={(e) => {addtoCart(e, res, index);}}
              //   >
              // 	Add to cart

              //     </button>
              //   </div>
              // </div>


              <>
                {screen > 450 ? (

                  <div
                    key={res.id}
                    className=" mb-6 p-2 px-4"
                    style={{
                      border: "1px solid #E8E8E8",
                      boxShadow: "12px 0px 80px rgba(222, 222, 222, 0.25)",
                      borderRadius: "7px",
                      marginBottom: "39px",
                    }}

                  // onClick={() => onClickAt(index)}
                  >


                    <div className="flex flex-col">
                      <div className="flex flex-col sm:flex-row items-center mb-3 md:mb-0">
                        <img
                          className="h-12 md:h-16 lg:h-8"
                          src={labImage}
                          alt=""
                        />
                        <div
                          style={{
                            height: "48px",
                            width: "1.12px",
                            background: "#E8E8E8",
                          }}
                          className="mx-8 hidden sm:block"
                        ></div>
                        <div className="lg:w-8/12 mb-2">
                          <div className="flex justify-between items-center mr-10">
                            <h6 className="text-lg text-center sm:text-left font-semibold text-neutral-800">
                              {res?.labTestName}
                            </h6>

                            {/* {res?.isActive ? (
                      <ArrowDownIcon className="w-4 h-4" />
                    ) : (
                      <ArrowUpIcon className="w-4 h-4" />
                    )} */}
                          </div>
                          {/* <div className="flex flex-col md:flex-row justify-between items-center mt-4 sm:mt-0 sm:w-4/5">
                    <div className="text-xs font-normal text-neutral-800">
                    {res?.locationName}
                    </div>
                    <div className="text-xs font-bold  text-neutral-800 my-1">
                    Labs -{" "}
                    <span className="text-xs font-normal  text-neutral-800">
                      {res?.labName}
                    </span>
                    </div>
                    </div> */}
                        </div>
                        <div className="hidden sm:block sm:w-1/5"> </div>
                        <div className="flex mt-4 sm:mt-0 justify-between w-full lg:w-4/12">
                          <div className="block sm:hidden">{renderAmount(res)}</div>

                          <div className="hidden sm:block sm:w-3/5 ">
                            {renderAmount(res)}
                          </div>

                          <button
                            className=" text-white  text-sm font-bold px-2 py-2 rounded cursor-pointer lg:px-18"
                            style={{ backgroundColor: "#66B889" }}
                            onClick={(e) => {
                              addtoCart(e, res, index);
                            }}
                            disabled={
                              drugIDsInCart.indexOf(res.labTestCode) !== -1
                                ? true
                                : false
                            }
                          >
                            {drugIDsInCart.indexOf(res.labTestCode) === -1
                              ? "Add to cart"
                              : "ADDED"}{" "}
                          </button>
                        </div>
                      </div>

                      <div className="flex ml-0 md:ml-24 w-full">
                        <p className="ml-1 text-xs w-10/12 md:w-6/12">
                          <b>Test Display Name:</b> {res.testDisplayName}
                        </p>
                        {/* <div className="hidden sm:block sm:w-1/5 ml-36">
                          {renderAmount(res)}
                        </div> */}
                      </div>

                      <div className="flex mt-3 md:mt-3 ml-0 md:ml-24 w-full">
                        <div className="flex w-11/12 md:w-6/12">
                          <p className="ml-1 mr-6 text-xs">
                            <b>Test Type:</b> {res.testType}
                          </p>

                          <div className="flex">
                            <p className="ml-1 mr-1 text-xs cursor-pointer">
                              <b>Lab Name:</b>
                            </p>

                            <p
                              className="ml-1 mr-6 text-xs underline cursor-pointer"
                              style={{ color: "#38bdf8" }}
                              onClick={(e) => {
                                redirectTo(e, res);
                              }}
                            >
                              {res.labName}
                            </p>
                          </div>
                          <p className="ml-1 mr-6 text-xs">
                            <b>City:</b> {res.city}
                          </p>
                        </div>
                        <div
                          className="flex justify-center ml-8 text-xs w-4/12"
                          onClick={() => onClickAt(index)}
                        >
                          {res?.isActive ? (
                            <>
                              {screen > 450 ? (
                                <p
                                  className="flex cursor-pointer"
                                  style={{ color: "#38bdf8" }}
                                >
                                  Read More
                                  <ArrowDownIcon className="w-3 h-3 ml-1" />
                                </p>
                              ) : (
                                <p
                                  className="flex cursor-pointer"
                                  style={{ color: "#38bdf8" }}
                                >
                                  <ArrowDownIcon className="w-3 h-3 ml-1" />
                                </p>
                              )}
                            </>
                          ) : (
                            <>
                              {screen > 450 ? (
                                <p
                                  className="flex cursor-pointer"
                                  style={{ color: "#38bdf8" }}
                                >
                                  Read Less
                                  <ArrowUpIcon className="w-3 h-3 ml-1" />
                                </p>
                              ) : (
                                <p
                                  className="flex cursor-pointer"
                                  style={{ color: "#38bdf8" }}
                                >
                                  <ArrowUpIcon className="w-3 h-3 ml-1" />
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {!res?.isActive && (
                      <div className="text-xs font-normal text-neutral-800 lg:ml-24 mt-2">
                        {/* <div className="mt-3">
                  <p className="ml-1"><b>Description:{" "}</b></p>
                </div> */}

                {
                  res?.description &&
                

                <div className="mt-4">
                          <p className="ml-1">
                            <b>Description:</b> {res?.description}{" "}
                            
                          </p>
                        </div>
                }
                        <div className="mt-4">
                          <p className="ml-1">
                            <b>Address:</b> {res?.address1}{" "}
                            {res?.address2 === "NULL" ? "" : res?.address2}{" "}
                            {res?.pinCode}
                            {","} {res?.city}
                          </p>
                        </div>
                        {res?.testType === "Radiology" ? (
                          <div className="mt-4 ml-1 text-xs">
                            <p>
                              <b>Remark: </b>Someone from customer service will
                              connect with you to schedule the appointment
                            </p>
                          </div>
                        ) : (
                          <p></p>
                        )}
                        { res?.tat &&
                          <div className="mt-4">
                          <p className="ml-1">
                            <b>TAT: </b>
                            {res?.tat}
                          </p>
                        </div>
                        }
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    key={res.id}
                    className=" mb-6 p-2 px-4"
                    style={{
                      border: "1px solid #E8E8E8",
                      boxShadow: "12px 0px 80px rgba(222, 222, 222, 0.25)",
                      borderRadius: "7px",
                      marginBottom: "39px",
                    }}

                  // onClick={() => onClickAt(index)}
                  >


                    <div className="flex flex-col">
                      <div className="flex flex-col sm:flex-row items-center mb-3 md:mb-0">
                        <img
                          className="h-12 md:h-16 lg:h-8"
                          src={labImage}
                          alt=""
                        />
                        <div
                          style={{
                            height: "48px",
                            width: "1.12px",
                            background: "#E8E8E8",
                          }}
                          className="mx-8 hidden sm:block"
                        ></div>
                        <div className="lg:w-3/6">
                          <div className="flex justify-between items-center ">
                            <h6 className="text-lg text-center sm:text-left font-semibold text-neutral-800">
                              {res?.labTestName}
                            </h6>

                            {/* {res?.isActive ? (
                      <ArrowDownIcon className="w-4 h-4" />
                    ) : (
                      <ArrowUpIcon className="w-4 h-4" />
                    )} */}
                          </div>
                          {/* <div className="flex flex-col md:flex-row justify-between items-center mt-4 sm:mt-0 sm:w-4/5">
                    <div className="text-xs font-normal text-neutral-800">
                    {res?.locationName}
                    </div>
                    <div className="text-xs font-bold  text-neutral-800 my-1">
                    Labs -{" "}
                    <span className="text-xs font-normal  text-neutral-800">
                      {res?.labName}
                    </span>
                    </div>
                    </div> */}
                        </div>
                        <div className="hidden sm:block sm:w-1/5"> </div>
                        <div className="flex mt-4 sm:mt-0 justify-between w-full lg:w-1/5 sm:justify-end">
                          <div className="block sm:hidden">{renderAmount(res)}</div>
                          <button
                            className=" text-white  text-sm font-bold px-2 py-2 rounded cursor-pointer lg:px-12"
                            style={{ backgroundColor: "#66B889" }}
                            onClick={(e) => {
                              addtoCart(e, res, index);
                            }}
                            disabled={
                              drugIDsInCart.indexOf(res.labTestCode) !== -1
                                ? true
                                : false
                            }
                          >
                            {drugIDsInCart.indexOf(res.labTestCode) === -1
                              ? "Add to cart"
                              : "ADDED"}{" "}
                          </button>
                        </div>
                      </div>

                      <div className="flex ml-0 md:ml-24 w-full">
                        <p className="ml-1 text-xs w-10/12 md:w-6/12">
                          <b>Test Display Name:</b> {res.testDisplayName}
                        </p>
                        <div className="hidden sm:block sm:w-1/5 ml-36">
                          {renderAmount(res)}
                        </div>
                      </div>

                      <div className="flex flex-col mt-3 md:mt-1 ml-0 md:ml-24 w-full">
                        <div className="flex w-11/12 md:w-6/12">
                          <p className="ml-1 mr-6 text-xs">
                            <b>Test Type:</b> {res.testType}
                          </p>
                        </div>

                        <div className="flex mt-4">
                          <p className="ml-1 mr-1 text-xs cursor-pointer">
                            <b>Lab Name:</b>
                          </p>

                          <p
                            className="ml-1 mr-6 text-xs underline cursor-pointer"
                            style={{ color: "#38bdf8" }}
                            onClick={(e) => {
                              redirectTo(e, res);
                            }}
                          >
                            {res.labName}
                          </p>
                        </div>

                        <div className="flex mt-4 w-full">

                          <p className="ml-1 mr-6 text-xs w-1/2">
                            <b>City:</b> {res.city}
                          </p>

                          <div
                            className="flex justify-end text-xs w-1/2"
                            onClick={() => onClickAt(index)}
                          >
                            {res?.isActive ? (


                              <p
                                className="flex cursor-pointer"
                                style={{ color: "#38bdf8" }}
                              >
                                Read More
                                <ArrowDownIcon className="w-3 h-3 ml-1" />
                              </p>



                            ) : (

                              <p
                                className="flex cursor-pointer"
                                style={{ color: "#38bdf8" }}
                              >
                                Read Less
                                <ArrowUpIcon className="w-3 h-3 ml-1" />
                              </p>

                            )}
                          </div>

                        </div>

                      </div>
                    </div>
                    {!res?.isActive && (
                      <div className="text-xs font-normal text-neutral-800 lg:ml-24 mt-2">
                        {/* <div className="mt-3">
                  <p className="ml-1"><b>Description:{" "}</b></p>
                </div> */}

                <div className="mt-4">
                          <p className="ml-1">
                            <b>Description:</b> {res?.description}{" "}
                            
                          </p>
                        </div>
                        <div className="mt-4">
                          <p className="ml-1">
                            <b>Address:</b> {res?.address1}{" "}
                            {res?.address2 === "NULL" ? "" : res?.address2}{" "}
                            {res?.pinCode}
                            {","} {res?.city}
                          </p>
                        </div>
                        {res?.testType === "Radiology" ? (
                          <div className="mt-4 ml-1 text-xs">
                            <p>
                              <b>Remark: </b>Someone from customer service will
                              connect with you to schedule the appointment
                            </p>
                          </div>
                        ) : (
                          <p></p>
                        )}

                        { res?.tat &&
                          <div className="mt-4">
                          <p className="ml-1">
                            <b>TAT: </b>
                            {res?.tat}
                          </p>
                        </div>
                        }
                      </div>
                    )}
                  </div>
                )
                }
              </>

            );
          })}
        </div>
      </div>
    );
  }

  if (search_query) {
    return (
      <div className="w-full flex flex-col items-center justify-around"></div>
    );
  }

  //   function getProductsIDs() {
  //     let ids = [];
  //     if (cartList.length>0) {
  //       if (cartList.patientLabTestsOrder.length>0) {
  //         for (const product of cartList.patientLabTestsOrder) {
  //           if (product && product.patientLabTestsOrderDetailsList) {
  //             for (const drug of product.patientLabTestsOrderDetailsList) {
  //               ids.push(drug.labTestCode);
  //             }
  //           }
  //         }
  //       }
  //     }
  //     console.log("Drug Info Ids", ids);
  //     return ids;
  //   }

  // const drugIDsInCart = getProductsIDs()

  return (
    <>
      <div className="flex flex-col p-auto mt-10 px-4">
        <div>
          {/* <SectionContainer link={APP_ROUTES.ALL_RADIOLOGY} title={'Lab Partners Near me'} subtitle={'Our trusted lab partners'} seeAll={'hide'} /> */}
          {partnerlablisttData && partnerlablisttData.length !== 0 && (
            <SectionContainer
              data={partnerlablisttData}
              link={APP_ROUTES.ALL_RADIOLOGY}
              title={"Lab Partners Near me"}
              subtitle={"Our trusted lab partners"}
              seeAll={partnerlablisttData.length > 4 ? "diagnosis" : "hide"}
              handelSroll={handleScroll}
            />
          )}
          <div
            className={`${partnerlablisttData.length === 0
              ? "w-full lg:max-w-full lg:flex justify-center mt-3"
              : "w-full lg:max-w-full lg:flex mt-3"
              }`}
          >
            {/* <div className="w-full lg:max-w-full lg:flex justify-center mt-3"> */}
            <div className="flex overflow-x-scroll pb-10 hide-scroll-bar ">
              <div className="flex flex-nowrap     space-x-6">
                {partnerlablisttData.map((lablist, i) => {
                  // let link = lablist._source;
                  return (
                    <div
                      onClick={(e) => {
                        redirectTo(e, lablist);
                      }}
                      className="cursor-pointer p-2 bg-white  p-5 rounded-xl m-auto w-auto  flex-none bg-cover  text-center overflow-hidden "
                    >
                      <div
                        className="flex justify-start"
                        key={i}
                        ref={scrollRefs.current[i]}
                      >
                        <div className="w-full">
                          <img
                            src={
                              lablist.logo
                                ? process.env.REACT_APP_IMG_BASEURL +
                                lablist.logo
                                : kaspersky
                            }
                            alt="lab0"
                            className={"rounded-md w-full "}
                            style={{ maxWidth: "23rem", maxHeight: "13rem" }}
                          />
                          {/* <img src={lablist.photoName ? process.env.REACT_APP_IMG_BASEURL + lablist.photoName : kaspersky} alt="lab0" className={'rounded-md w-20 h-20 mr-3 '} style={{ maxWidth: "20rem", maxHeight: "7rem" }} />	 */}
                        </div>
                      </div>
                      <div className="text-left mt-2">
                        <p className="break-words text-lg font-normal ">
                          {lablist.labName}
                        </p>
                        <p className="text-brand-gunsmoke text-sm font-thin mt-1  ">
                          {lablist.city}
                        </p>
                      </div>
                      {props.ePrescription && (
                        <div class="flex mt-5 justify-end">
                          {/* <button
                                            class="lg:bg-transparent bg-brand-secondary w-full text-md font-medium lg:text-brand-secondary text-white px-4   hover:border-transparent rounded-xl">View Details</button>
                                        <button
                                            onClick={(e) => redirectTo(e, APP_ROUTES.PHARMACYALLPRODUCTS)} className="w-full bg-brand-secondary  text-sm text-white font-medium text-lg rounded-md py-2 px-3">Buy Medicines</button> */}

                          <button
                            onClick={(e) => redirectToSearch(e, lablist)}
                            className="bg-brand-secondary  text-sm text-white font-medium text-lg rounded-md py-2 px-3"
                          >
                            Book
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
                {!isLoading &&
                  !isFetchingPinCode &&
                  partnerlablisttData &&
                  partnerlablisttData.length === 0 && (
                    <div className="w-full flex flex-col items-center justify-around">
                      <img
                        className="h-24 lg:h-28 mt-5 lg:mt-0 "
                        src={noDataFound}
                        alt="No Diagnostics Appointments Available"
                      />
                      <h4 className="font-medium  text-brand-lightgreen text-md">
                        No Labs near by in your Area
                      </h4>
                    </div>
                  )}
              </div>
            </div>
          </div>
          {(isLoading || isFetchingPinCode) &&
            partnerlablisttData.length === 0 && (
              <div className="flex flex-wrap justify-center">
                <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
              </div>
            )}
        </div>
        <div className="overflow-hidden w-full ">
          {partnerlablisttData?.length > 0 ? (
            <SectionContainer
              data={partnerlablisttData}
              link={APP_ROUTES.ALL_RADIOLOGY}
              title={"Most Common Tests"}
              subtitle={""}
              seeAll={partnerlablisttData?.length > 3 ? "Tests" : "hide"}
              handelSroll={handleScroll1}
            />
          ) : (
            <div></div>
          )}
          <div className="flex flex-nowrap my-4  space-x-6 w-full overflow-scroll  no-scrollbar  ">
            {partnerlablisttData.map((lablist, i) => {
              return (
                <div
                  className="border  w-96 rounded-lg py-4 bg-white shadow-sm"
                  key={i}
                  ref={scrollRefs1.current[i]}
                >
                  <div className="px-4 text-lg font-medium text-gray-700 ">
                    {lablist.labName}
                  </div>
                  <div className=" px-4 text-base font-normal text-gray-700 ">
                    Test includes 11
                  </div>
                  <div className=" px-4 text-sm font-normal text-gray-700 ">
                    Free test includes
                  </div>
                  <p className=" px-4 text-brand-gunsmoke  text-xs font-thin mt-1 ">
                    Please consult with doctor
                  </p>
                  <div className=" mx-4 sm:flex md:flex items-center justify-between">
                    <div className="">
                      <img
                        src={
                          lablist.logo
                            ? process.env.REACT_APP_IMG_BASEURL + lablist.logo
                            : kaspersky
                        }
                        alt="lab0"
                        className={"rounded-md w-28 h-28 mr-3 "}
                        style={{ maxWidth: "20rem", maxHeight: "7rem" }}
                      />
                    </div>
                    <div className="flex flex-col w-40">
                      <div className="text-base font-medium text-gray-700  ">
                        Dr Lal Path Labs
                      </div>
                      <div className="text-xs font-medium text-gray-700  ">
                        Jaipur-Rajasthan
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-700 ">
                      <span>&#8377;</span>800
                    </div>
                  </div>
                  <hr className="mt-4 mb-3" />
                  <div className="mt-1 justify-end flex px-4">
                    <button className="hidden rounded sm:block border border-brand-secondary  text-sm font-medium  text-brand-secondary rounded-sm py-2 px-6 mr-3">
                      View Details
                    </button>
                    <button
                      className="w-full rounded sm:w-auto mx-3 mb-3 sm:mx-0 sm:mb-0 bg-brand-secondary  text-sm text-white font-normal rounded-sm py-2 px-4 "
                      onClick={(e) => {
                        addtoCart(e, lablist, i);
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* <CommonTestConditions /> */}
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setLoginModal: () => dispatch(setLoginModal()),
});

export default connect(null, mapDispatchToProps)(AllLabs);

// import kaspersky from '../Assets/Images/image 140.png';
// import React from 'react'
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { setLoginModal, } from '../Redux/Actions/userActions';
// import { APP_ROUTES } from '../application/Router/constants/AppRoutes';

// import SectionContainer from './SectionContainer';
// import { process.env.REACT_APP_IMG_BASEURL } from "../config/constant";
// function AllLabs(props) {
// 	const [searchedLabtest, setSearchedLabtest] = useState([]);
// 	const lablistData = useSelector((state) => state.listpartnerslab);
// 	const { partnerlablisttData, isLoading } = lablistData;
// 	const history = useHistory();
// 	const redirectTo = (event, data) => {
// 		event.preventDefault();
// 		history.push({ pathname: APP_ROUTES.LALPATH_LAB, state: data });
// 	};

// 	return (
// 		<>

// 			{!props.isLoading && props.data && props.data.length != 0 &&
// 				<div className="flex flex-col p-auto mt-10 px-4">
// 					{/* <SectionContainer link={APP_ROUTES.ALL_RADIOLOGY} title={'Lab Partners Near me'} subtitle={'Our trusted lab partners'} seeAll={'Partners'} /> */}

// 						<SectionContainer
// 							data={partnerlablisttData}
// 							link={APP_ROUTES.ALL_RADIOLOGY}
// 							title={"Lab Partners Near me"}
// 							subtitle={"Our trusted lab partners"}
// 							seeAll={"diagnosis"}

// 						/>

// 					<div className="w-full lg:max-w-full lg:flex ">
// 						<div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
// 							<div className="flex flex-nowrap     space-x-6">
// 								{props.data.map((lablist, i) => {
// 									return (
// 										<div onClick={(e) => { redirectTo(e, lablist) }} className="cursor-pointer p-2 bg-white  p-5 rounded-xl m-auto  flex-none bg-cover  text-center overflow-hidden ">
// 											<div className="flex justify-start">
// 												<div>
// 													<img src={lablist.photoName ? IMG_URL + lablist.photoName : kaspersky} alt="lab0" className={'rounded-md w-20 h-20'} />
// 												</div>
// 											</div>
// 											<div className="text-left mt-2">
// 												<p className="break-words text-lg font-normal ">{lablist.name}</p>
// 												<p className="text-brand-gunsmoke text-sm font-thin mt-1  " >{lablist.address}</p>
// 											</div>
// 										</div>
// 									)
// 								})}
// 								{/* {!props.isLoading && props.data && props.data.length === 0 && <p>No LAB Test near by in your Area</p>} */}
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			}

// 			{props.isLoading &&
// 				<div className="flex flex-wrap justify-center">
// 					<div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
// 				</div>
// 			}

// 		</>
// 	);
// }

// const mapDispatchToProps = (dispatch) => ({
// 	setLoginModal: () => dispatch(setLoginModal()),

// });

// export default connect(null, mapDispatchToProps,)(AllLabs);
