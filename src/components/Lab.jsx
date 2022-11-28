import kaspersky from "../Assets/Images/Laboratory-bro.svg";
import noDataFound from "../Assets/Images/No data-found.svg";
import LabTestIcon from "../Assets/Images/LabTestIcon.svg";
import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setLoginModal } from "../Redux/Actions/userActions";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentlocation } from "../Redux/Actions/userActions";
import labImage from "../Assets/Images/lab.svg";
import {
  MinusIcon,
  PlusIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowCircleDownIcon,
} from "@heroicons/react/outline";

import {
  getlabPartnerslist,
  getElasticPartnerslist,
  getCommonLabTest,
} from "../Redux/Actions/DiagnosticsActions";

import {
  AddtoCart,
  getCartDetails,
} from "../Redux/Actions/cartPlaceOrderAction";
import SectionContainer from "./SectionContainer";
import moment from "moment";
import axios from "axios";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { Dialog } from "primereact/dialog";

var positionScroll = 4;
var isFirstTimeLeft = true;
var positionScroll1 = 0;

function Lab(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const address = useSelector((state) => state.authReducer.address);
  const lablistData = useSelector((state) => state.listpartnerslab);
  const { partnerlablisttData, isLoading } = lablistData;
  const { coords } = useSelector((state) => state.authReducer);
  const history = useHistory();
  const [isAdding, setIsAdding] = useState(-1);
  const [openDialog, setDialog] = useState(false);
  const { cartList } = useSelector((state) => state.cartReducer);
  const userData = useSelector((state) => state.authReducer.patientData);
  const [labNewName, setLabNewName] = useState("");

  const search_params = useLocation().search;
  const search_query = new URLSearchParams(search_params).get("search_query");
  const [isFetchingPinCode, setIsFetchingPinCode] = useState(false);
  const [currentPinCode, setCurrentPincode] = useState("");
  const [searchedLabtest, setSearchedLabtest] = useState([]);
  const [mostCommonLabtest, setMostCommonLabtest] = useState([]);
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

  const [viewDetailDialog, setViewDetailDialog] = useState({
    flag: false,
    data: {},
  });
  const redirectTo = (event, data) => {
    console.log(data, "sdvucgsdiuvgius");
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

  useEffect(() => {
    if (coords) {
      setIsFetchingPinCode(false);
      dispatch(getElasticPartnerslist(coords));
      console.log("sdsjdkfndjk", JSON.stringify(partnerlablisttData));
    }
  }, [coords]);

  useEffect(() => {
    dispatch(getCommonLabTest(coords)).then((res) => {
      console.log("commmmmm", JSON.stringify(res));

      setMostCommonLabtest(res);
    });
  }, []);

  useEffect(() => {
    if (coords && search_query) {
      axios
        .get(
          `${process.env.REACT_APP_ELASTIC_BASEURL}labtest?latitude=${coords.lat}&longitude=${coords.long}&freeTextSearch=${search_query}`
        )
        .then((res) => {
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

  scrollRefs1.current = [...Array(mostCommonLabtest?.length).keys()].map(
    (_, i) => scrollRefs1?.current[i] ?? createRef()
  );

  // Curried handler to take index and return click handler

  const handleScroll1 = (e, dir) => {
    if (dir == "rightArrow") {
      positionScroll1 = positionScroll1 + 9;
    } else {
      positionScroll1 = positionScroll1 - 9;
    }
    if (positionScroll1 > mostCommonLabtest?.length) {
      positionScroll1 = mostCommonLabtest?.length - 1;
    }
    if (positionScroll1 < 0) {
      positionScroll1 = 0;
    }
    scrollRefs1?.current[positionScroll1]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const handleScroll = (e, dir) => {
    if (dir == "rightArrow") {
      if (positionScroll == 0) {
        positionScroll = 7;
      }
      positionScroll = positionScroll + 1;
    } else {
      if (isFirstTimeLeft) {
        positionScroll = positionScroll - 6;
        isFirstTimeLeft = false;
      } else {
        positionScroll = positionScroll - 2;
      }
    }
    if (positionScroll > partnerlablisttData.length) {
      positionScroll = partnerlablisttData.length - 3;
    }
    if (positionScroll < 0) {
      positionScroll = 0;
    }
    scrollRefs?.current[positionScroll]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

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

  const drugIDsInCart = getProductsIDs();

  const addtoCart = (e, data, index, quantity = 1) => {
    if (!userData.code) {
      redirectToLogin(e, {
        pathname: APP_ROUTES.LOGIN,
        state: { background: location, login: true },
      });
    }

    if (cartList?.patientLabTestsOrder) {
      let availableItem = cartList?.patientLabTestsOrder.find(
        (item) => item.hospitalId === data.labId
      );

      if (availableItem === undefined) {
        setDialog(true);
        setLabNewName(
          cartList?.patientLabTestsOrder[0]?.patientLabTestsOrderDetailsList[0]
            ?.hospitalName
        );
        return;
      }
    }

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
          status: 1,
          labTestType: data.testType,

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
      setIsAdding(-1);
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
        <p className="flex justify-center text-lg sm:text-lg md:text-xl lg:text-xl font-bold text-gray-700 mb-0 w-full">
          Available Lab Test(s)
        </p>

        <div
          className="w-full sm:w-4/5 md:w-5/6 mt-6"
          style={{ margin: "auto", marginTop: "2rem" }}
        >
          {searchedLabtest?.map((res, index) => {
            return (
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
                          <div className="flex justify-between items-center">
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
                )
                }
              </>
            );
          })}

          <Dialog
            visible={openDialog}
            modal={false}
            style={{ width: "700px", height: "auto" }}
            // className="w-20 m-auto lg:w-5/6 h-auto"
            onHide={() => setDialog(false)}
          >
            <>
              <div className="flex justify-center  align-middle inline-bloc">
                <div className="flex">
                  <img src={LabTestIcon} alt="No Lab test found Available" />
                </div>
                <div className="font my-8 text-center  ">
                  {" "}
                  {`You have added tests from  ${labNewName} lab in your cart. Select this test from the same lab or replace the tests in your cart.`}
                  {``}
                </div>
              </div>
            </>
          </Dialog>
        </div>
      </div>
    );
  }

  if (search_query) {
    return (
      <div className="w-full flex flex-col items-center justify-around">
        <img
          className="h-24 lg:h-28 mt-5 lg:mt-0 "
          src={noDataFound}
          alt="No Lab test found Available"
        />
        <h4 className="font-medium  text-gray-400 text-md">No Lab found</h4>
      </div>
    );
  }

  console.log(mostCommonLabtest, "mostCommonLabtestmostCommonLabtest");

  return (
    <>
      <div className="flex flex-col p-auto mt-10 px-4">
        <div>
          {/* <SectionContainer link={APP_ROUTES.ALL_RADIOLOGY} title={'Lab Partners Near me'} subtitle={'Our trusted lab partners'} seeAll={'hide'} /> */}
          {partnerlablisttData && partnerlablisttData.length !== 0 && (
            <SectionContainer
              data={partnerlablisttData}
              link={APP_ROUTES.ALL_RADIOLOGY}
              title={"Available Lab Partners"}
              subtitle={"Our trusted lab partners"}
              seeAll={partnerlablisttData.length > 4 ? "diagnosis" : "hide"}
              handelSroll={handleScroll}
              style={{ textAlign: "center" }}
            />
          )}
          <div
            className={`${partnerlablisttData.length === 0
                ? "w-full lg:max-w-full lg:flex justify-center mt-3"
                : "w-full lg:max-w-full lg:flex mt-3"
              }`}
            style={{ marginTop: "45px" }}
          >
            {/* <div className="w-full lg:max-w-full lg:flex justify-center mt-3"> */}
            {partnerlablisttData.length === 0 ? (
              <div className="mb-12 w-full flex flex-col items-center">
                <img
                  className="h-24 lg:h-28 mt-5 lg:mt-3 "
                  src={noDataFound}
                  alt="No Data Found"
                />
                <h4 className="font-medium  text-gray-400 text-md">
                  No Diagnostic Service Available
                </h4>
              </div>
            ) : (
              <div className="flex overflow-x-scroll pb-10 hide-scroll-bar ">
                <div className="flex flex-nowrap     space-x-6">
                  {partnerlablisttData?.filter(item=>item.labName !=="eClinic Lab")?.map((lablist, i) => {
                    // let link = lablist._source;
                    return (
                      <div
                        key={i}
                        onClick={(e) => {
                          redirectTo(e, lablist);
                        }}
                        className="cursor-pointer bg-white rounded-xl m-auto flex-none bg-cover text-center overflow-hidden pt-2"
                        style={{
                          border: "1px solid #E4E4E4",
                          borderRadius: "7px",
                          width: "225px",
                        }}
                      >
                        <div
                          className="flex justify-center m-auto"
                          key={i}
                          ref={scrollRefs.current[i]}
                        >
                          <div
                            className="w-full"
                            style={{ textAlign: "-webkit-center" }}
                          >
                            <img
                              src={
                                lablist.logo
                                  ? process.env.REACT_APP_IMG_BASEURL +
                                  lablist.logo
                                  : kaspersky
                              }
                              alt="lab0"
                              className={"w-full mb-2"}
                              style={{
                                maxWidth: "23rem",
                                maxHeight: "13rem",
                                height: "61px",
                                width: "61px",
                              }}
                            />
                            {/* <img src={lablist.photoName ? process.env.REACT_APP_IMG_BASEURL + lablist.photoName : kaspersky} alt="lab0" className={'rounded-md w-20 h-20 mr-3 '} style={{ maxWidth: "20rem", maxHeight: "7rem" }} />	 */}
                          </div>
                        </div>
                        <div className="text-left mt-2">
                          <p
                            className="break-words text-sm text-center font-semibold  truncate"
                            style={{ color: "#262626" }}
                          >
                            {lablist.labName}
                          </p>
                          <p
                            className="text-brand-gunsmoke mb-5 text-center text-xs font-normal mt-1  "
                            style={{ color: "#262626" }}
                          >
                            {lablist.city}
                          </p>
                        </div>
                        <div
                          className="flex justify-center items-center"
                          style={{ background: "#EAF8FF", padding: "9px 0px" }}
                        >
                          <button
                            style={{ color: "#18406D" }}
                            className="font-semibold text-xs underline"
                          >
                            View Details
                          </button>
                          <i
                            style={{
                              color: "#18406D",
                              height: "10.62px",
                              width: "5.43px",
                            }}
                            className="pi pi-angle-right"
                          ></i>
                        </div>
                      </div>
                    );
                  })}
                  {!isLoading &&
                    !isFetchingPinCode &&
                    partnerlablisttData &&
                    partnerlablisttData.length === 0 && (
                      <div className="w-full flex flex-col items-center justify-around"></div>
                    )}
                </div>
              </div>
            )}
          </div>
          {(isLoading || isFetchingPinCode) &&
            partnerlablisttData.length === 0 && (
              <div className="flex flex-wrap justify-center">
                <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
              </div>
            )}
        </div>
        <div className="overflow-hidden w-full ">
          {mostCommonLabtest?.length > 0 ? (
            //  <div className="text-center">
            <SectionContainer
              data={mostCommonLabtest}
              link={APP_ROUTES.SEE_ALL_COMMON_LABTEST}
              title={"Most Common Test"}
              subtitle={""}
              seeAll={mostCommonLabtest?.length > 3 ? "Tests" : "hide"}
              handelSroll={handleScroll1}
              style={{ textAlign: "center" }}
            />
          ) : (
            // </div>
            <div></div>
          )}
          <div
            className="flex flex-nowrap my-4  space-x-6 w-full overflow-scroll  no-scrollbar"
            style={{ marginTop: "45px" }}
          >
            {mostCommonLabtest?.filter(item=>item.labName !=="eClinic Lab")?.map((lablist, i) => {
              return (
                <div className="w-64 md:w-96">
                  <div
                    className=" rounded-lg bg-white pt-2 shadow-sm"
                    key={i}
                    ref={scrollRefs1.current[i]}
                    style={{
                      border: "1px solid #E4E4E4",
                      borderRadius: "7px",
                      width: "225px",
                    }}
                  >
                    <div className="px-4 mb-3 truncate text-xs font-bold text-gray-700 ">
                      {lablist.labName}
                    </div>

                    <div className=" mx-3 sm:flex md:flex items-center justify-between">
                      <div className="m-auto mr-2">
                        <img
                          src={
                            lablist.labImage
                              ? process.env.REACT_APP_IMG_BASEURL +
                              lablist.labImage
                              : kaspersky
                          }
                          alt="lab0"
                          className={
                            "rounded-md w-9/12 md:w-28 h-28  m-auto object-fill"
                          }
                          style={{ width: "60px", height: "46px" }}
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="text-xs font-normal text-gray-700  ">
                          {lablist.labTestName.length > 13
                            ? lablist?.labTestName.substr(0, 12) + "..."
                            : lablist.labTestName}
                        </div>
                        <div className="text-xs font-normal text-gray-700  ">
                          {`${lablist.city},${lablist.state}-${lablist.pincode}`}
                        </div>
                        <div
                          className="text-sm font-semibold "
                          style={{ color: "#66B889" }}
                        >
                          <span>&#8377;</span>
                          {lablist.amount}
                        </div>
                      </div>
                    </div>

                    <hr className="mt-6" />
                    <div className="py-2.5 mx-3.5 justify-between flex flex-col md:flex-row gap-2">
                      <div className="flex items-center">
                        <button
                          onClick={() => {
                            setViewDetailDialog({
                              flag: true,
                              data: lablist,
                            });
                          }}
                          style={{ color: "#18406D" }}
                          className="font-semibold text-xs underline"
                        >
                          View Details
                        </button>
                        <i
                          style={{
                            color: "#18406D",
                            height: "10.62px",
                            width: "5.43px",
                          }}
                          className="pi pi-angle-right"
                        ></i>
                      </div>
                      <button
                        className={`${drugIDsInCart.indexOf(lablist.labTestCode) !== -1
                            ? "text-red-500 font-medium text-xs py-1 cursor-not-allowed lg:m-auto border-2 border-gray pb-1 rounded-md px-2 h-8 lg:ml-12"
                            : "hover:scale-150 w-full rounded sm:w-auto sm:mb-0 bg-brand-lightgreen  text-xs text-white font-semibold rounded-sm py-2 px-2 md:px-4"
                          }`}
                        // className="w-full rounded sm:w-auto sm:mb-0 bg-brand-secondary  text-xs text-white font-semibold rounded-sm py-2 px-2 md:px-4"
                        onClick={(e) => {
                          addtoCart(e, lablist, i);
                        }}
                        // style ={{background:"#66B889"}}
                        disabled={
                          drugIDsInCart.indexOf(lablist.labTestCode) !== -1
                            ? true
                            : false
                        }
                      >
                        {drugIDsInCart.indexOf(lablist.labTestCode) === -1
                          ? "Add to cart"
                          : "Added"}{" "}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Dialog
        visible={openDialog}
        modal={false}
        style={{ width: "700px", height: "auto" }}
        // className="w-20 m-auto lg:w-5/6 h-auto"
        onHide={() => setDialog(false)}
      >
        <>
          <div className="flex justify-center  align-middle inline-bloc">
            <div className="flex">
              <img src={LabTestIcon} alt="No Lab test found Available" />
            </div>
            <div className="font my-8 text-center  ">
              {" "}
              {`You have added tests from  ${labNewName} lab in your cart. Select this test from the same lab or replace the tests in your cart.`}
              {``}
            </div>
          </div>
        </>
      </Dialog>

      <Dialog
        visible={viewDetailDialog.flag}
        modal={false}
        style={{ width: "500px", height: "auto" }}
        // className="w-20 m-auto lg:w-5/6 h-auto"
        onHide={() =>
          setViewDetailDialog({
            flag: false,
            data: {},
          })
        }
        header={<div>Common Lab Tests</div>}
      >
        <>
          <div className="w-full py-6 px-6 lg:w-full">
            {/* <p className="text-base text-gray-600"> {labData.hospitalName}</p> */}
            <p className=" text-lg font-medium textgray-700">
              {viewDetailDialog.data?.labName}
            </p>
            <div className="mt-4 w-full lg:flex lg:justify-between">
              <div>
                <p className="text-xs font-medium text-brand-secondary ">
                  Location
                </p>
                <p className="text-xs  text-gray-400">
                  {" "}
                  {viewDetailDialog.data?.address1}{" "}
                  {viewDetailDialog.data?.address2 === "NULL"
                    ? ""
                    : viewDetailDialog.data?.address2}{" "}
                  <br /> {viewDetailDialog.data?.pinCode}
                  {","} {viewDetailDialog.data?.city}
                </p>
              </div>
              <div className="sm:mt-4 lg:mt-0">
                {viewDetailDialog.data?.contactNumber ? (
                  <div>
                    <p className="text-xs font-medium text-brand-secondary  pt-5">
                      Phone
                    </p>
                    <p className="text-xs  text-gray-400">
                      {viewDetailDialog.data?.contactNumber
                        ? viewDetailDialog.data?.contactNumber
                        : viewDetailDialog.data?.mobileNUmber
                          ? viewDetailDialog.data?.mobileNUmber
                          : ""}
                    </p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="border mb-6 p-2 px-4 rounded">
            <h6 className="text-sm  font-medium text-gray-900">
              {viewDetailDialog.data?.labTestName}
            </h6>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs  text-gray-400">
                  {viewDetailDialog.data?.locationName}
                </div>
                <div className="text-sm  text-gray-900 my-1">
                  Lab -{" "}
                  <span className="text-xs  text-gray-400">
                    {viewDetailDialog.data?.labName}
                  </span>
                </div>
              </div>
              {viewDetailDialog.data?.discountPercentage ? (
                <div>
                  <div>
                    {" "}
                    <span className="text-gray-500 line-through text-xs font-medium">
                      ₹ {viewDetailDialog.data?.amount}
                    </span>{" "}
                    <span className="text-xs text-green-500 font-medium">
                      ₹ {viewDetailDialog.data?.discountAmount}
                    </span>{" "}
                  </div>
                  <div className="border border-dashed border-green-500 text-xs bg-green-50 text-green-500 font-medium py-1 px-2">
                    {viewDetailDialog.data?.discountPercentage}% off
                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    {" "}
                    <span className="text-sm text-green-500 font-medium">
                      ₹ {viewDetailDialog.data?.amount}
                    </span>{" "}
                  </div>
                  {/* <div className='border border-dashed border-green-500 text-xs bg-green-50 text-green-500 font-medium py-1 px-2' >{viewDetailDialog.data?.discountPercentage}% off</div> */}
                </div>
              )}
            </div>
            {/* <div className="flex justify-end mt-4">
                          <button
                            className="bg-brand-secondary text-white  text-sm font-medium px-2 py-2 rounded cursor-pointer"
                            onClick={(e) => {
                              addtoCart(e, viewDetailDialog.data, index);
                            }}
                            disabled={
                              drugIDsInCart.indexOf(viewDetailDialog.data.labTestCode) !== -1
                                ? true
                                : false
                            }
                          >
                            {drugIDsInCart.indexOf(viewDetailDialog.data.labTestCode) === -1
                              ? "Add to cart"
                              : "ADDED"}{" "}
                          </button>
                        </div> */}
          </div>
        </>
      </Dialog>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setLoginModal: () => dispatch(setLoginModal()),
});

export default connect(null, mapDispatchToProps)(Lab);
