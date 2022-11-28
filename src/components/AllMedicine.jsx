import kaspersky from '../Assets/Images/image 140.png';
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import SectionContainer from './SectionContainer';
import { AddImgUrl } from '../config/constant';

import Bottles from '../Assets/pharamacyImages/Bottles.png';
import Capsules from '../Assets/pharamacyImages/Capsules.png';
import Creams from '../Assets/pharamacyImages/Creams.png';
import Curebay from '../Assets/pharamacyImages/Curebay.png';
import Devices from '../Assets/pharamacyImages/Devices.png';
import Dispensers from '../Assets/pharamacyImages/Dispensers.png';
import Droplets from '../Assets/pharamacyImages/Droplets.png';
import Emulsions from '../Assets/pharamacyImages/Emulsions.png';
import Injections from '../Assets/pharamacyImages/Injections.png';
import Lotions from '../Assets/pharamacyImages/Lotions.png';
import Satchels from '../Assets/pharamacyImages/Satchels.png';
import Tablets from '../Assets/pharamacyImages/Tablets.png';
import defaultMed from "../Assets/Images/Medicines.jpg";
import InfiniteScroll from 'react-infinite-scroller';
import moment from "moment";
import {
  AddtoCart,
} from "../Redux/Actions/cartPlaceOrderAction";
import SectionContainerMedicine from './SectionContainerMedicine';

const resolvePharamcyImageq = (Image) => {
  let PharamncyImage;
  if (Image.toUpperCase().includes('BOTTLE')) {
    PharamncyImage = Bottles;
  } else if (Image.toUpperCase().includes('CAPSULE') || Image.toUpperCase().includes('CAPSULES')) {
    PharamncyImage = Capsules;
  } else if (Image.toUpperCase().includes('CREAM') || Image.toUpperCase().includes('CREAMS')) {
    PharamncyImage = Creams;
  } else if (Image.toUpperCase().includes('CUREBAY')) {
    PharamncyImage = Curebay;
  } else if (Image.toUpperCase().includes('DEVICES')) {
    PharamncyImage = Devices;
  } else if (Image.toUpperCase().includes('DISPENSERS')) {
    PharamncyImage = Dispensers;
  } else if (Image.toUpperCase().includes('DROPLETS')) {
    PharamncyImage = Droplets;
  } else if (Image.toUpperCase().includes('EMULSIONS')) {
    PharamncyImage = Emulsions;
  } else if (Image.toUpperCase().includes('INJECTION') || Image.toUpperCase().includes('INJECTIONS')) {
    PharamncyImage = Injections;
  } else if (Image.toUpperCase().includes('LOTIONS')) {
    PharamncyImage = Lotions;
  } else if (Image.toUpperCase().includes('SATCHELS')) {
    PharamncyImage = Satchels;
  } else if (Image.toUpperCase().includes('TABLET') || Image.toUpperCase().includes('TABLETS')) {
    PharamncyImage = Tablets;
  } else {
    PharamncyImage = defaultMed;
  }
  return PharamncyImage;
}
const AllMedicine = (props) => {
  const history = useHistory();
  const location = useLocation();
  const search = useLocation().search;
  const [isAdding, setIsAdding] = useState(-1);
  const dispatch = useDispatch();
  const [medicineData, setMedicineData] = useState("");
  const { name, storeId, locationId, isPOS, ePrescription } = {};
  const { cartList } = useSelector((state) => state.cartReducer);

  const drugIDsInCart = getProductsIDs();

  const userData = useSelector((state) => state.authReducer.patientData);



  const redirectTo = (event, data) => {
    event.preventDefault();
    history.push({ pathname: APP_ROUTES.MEDICINE_PRODUCT, state: data });
  };

  const redirectToLogin = (event, location) => {

    event.preventDefault();
    history.push(location);
  };
  function calcDiscount(unitPrice, discounted) {
    if (discounted === 0) {
      return "0 %off";
    }
    return `(${parseFloat((discounted / unitPrice) * 100).toFixed(2)} %off)`;
  }

  const redirectToMedicine = (event, data) => {
    event.preventDefault();
    history.push({ pathname: APP_ROUTES.MEDICINE_PRODUCT, search: `?code=${data.id}` })
  };

  const addThreeDots = (text) => {
    if (text.length > 20) {
      return `${text.substring(0, 20)}...`
    }
    return text
  }


  function getProductsIDs() {
    let ids = [];
    if (cartList) {
      if (cartList.patientMedicineOrder) {
        for (const product of cartList.patientMedicineOrder) {
          if (product && product.patientMedicineOrderDetailsList) {
            for (const drug of product.patientMedicineOrderDetailsList) {
              ids.push(drug.drugCode);
            }
          }
        }
      }
    }
    console.log("Drug Info Ids", ids);
    return ids;
  }

  const addtoCart = (e, data, index, quantity = 1) => {

    // if (!userData.code) {
    //   redirectToLogin(e, { pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } })
    // }


    if (!userData.code) {
      redirectToLogin(e, {
        pathname: APP_ROUTES.LOGIN,
        state: { background: location, login: true },
      });
    }
    e.preventDefault();


    setIsAdding(index);
    console.log("medicineData", JSON.stringify(medicineData));
    console.log(ePrescription, data, "afjkaskjvwekvesvew");
    let prescriptionRequired = "N";
    let ePrescriptionRequired = "N";

    if (data?.prescriptionRequired == "No") {
      prescriptionRequired = "N";
      // ePrescriptionRequired = "N";
    } else if (data?.prescriptionRequired == "Yes") {
      prescriptionRequired = "Y";
      // ePrescriptionRequired = "Y";
    }
    let calculatedAmount = data?.drugsInfoDiscountedRate
      ? data?.drugsInfoDiscountedRate
      : data.medicineRate;
    const totalAmount = calculatedAmount * quantity;
    // data.discountPrice !== 0
    //   ? (data.unitPrice - data.discountPrice) * quantity
    //   :
    console.log("totalAmount", totalAmount);
    let dataObj = {};

    let isAdded = false;

    if (cartList && cartList.patientMedicineOrder) {
      cartList.patientMedicineOrder.forEach((element) => {
        element.patientMedicineOrderDetailsList.push({
          drugCode: data.id,
          drugName: data.medicineName,
          unitPrice: data.medicineRate,
          discountAmount: 0.00,
          totalAmount: totalAmount,
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
        labOrdersYN: false,
        drugsOrdersYN: true,
        totalAmount: totalAmount,
        patientMedicineOrder: [
          {
            orderId: "",
            patientId: userData.code,
            prescriptionId: null,
            cartId: cartList && cartList.id ? cartList.cartId : "",
            txnId: "",
            totalAmount: totalAmount,
            address1: null,
            address2: null,
            address3: null,
            city: null,
            state: null,
            country: null,
            pincode: null,
            deliveryAddress1: null,
            deliveryAddress2: null,
            deliveryAddress3: null,
            deliveryCity: null,
            deliveryState: null,
            deliveryCountry: null,
            deliveryZipcode: null,
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
            patientMedicineOrderDetailsList: [
              {
                drugCode: data.id,
                drugName: data.medicineName,
                unitPrice: data.medicineRate,
                discountAmount: 0.00,
                totalAmount: totalAmount,
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
      };
    }
    console.log(dataObj, "dsihdspisdhpids");
    dispatch(AddtoCart(dataObj)).then(() => setIsAdding(-1));
  };



  return (
    <>
      <div className="flex flex-col p-auto mt-2 lg:mt-10 px-4">
        {!props.isLoading && props.data && props.data.length > 0 &&
          <SectionContainerMedicine link={APP_ROUTES.MEDICINE_PRODUCT} title={'Medicine List'}  />

        }

        <div className="w-full lg:max-w-full mt-10 md:mt-10 lg:mt-0">
          <div className="flex pt-3 pb-10 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 pb-4  gap-5 w-full">
              {props.data.map((lablist, index) => {
                return (
                  // <div key={lablist.id} style={{ boxShadow: "0 0 7px 0 rgb(0 0 0 / 7%)" }} className="cursor-pointer mt-2 p-4 w-48 bg-white rounded-md transition ease-in-out delay-75 hover:-translatex-3 duration-300 relative" onClick={(e) => redirectToMedicine(e, lablist)}>
                  //   <div style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: 'hidden' }} className="cursor-pointer text-sm  pb-2 text-gray-700 my-2">
                  //     {lablist.medicineName.length > 30
                  //       ? `${lablist.medicineName.substring(0, 30)}…`
                  //       : lablist.medicineName}

                  //     {/* {lablist.medicineName} */}
                  //   </div>
                  //   <div className="flex flex-wrap justify-center">
                  //     <img
                  //       src={lablist?.uploadFileName ? AddImgUrl(lablist?.uploadFileName) : resolvePharamcyImageq(lablist?.medicineTypeOfSell)}
                  //       className="w-12 h-16"
                  //       alt="lab0"
                  //     />
                  //   </div>

                  //   <p className="text-brand-gunsmoke text-xs mt-1" style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: 'hidden' }}>
                  //     {lablist.medicineTypeOfSell}
                  //   </p>
                  //   <div className="mt-1 mb-5">
                  //     <span className="text-grat-500 text-xs">MRP:</span>
                  //     <span className="text-gray-500  pl-2">{lablist.medicineRate}</span>
                  //     <br />

                  //     {lablist?.drugsInfoDiscountPercentage > 0 &&
                  //       <span className="text-xs text-green-500">
                  //         {`${lablist?.drugsInfoDiscountPercentage}% Off`}
                  //       </span>
                  //     }
                  //   </div>

                  //   {
                  //     lablist?.drugsInfoDiscountedRate > 0 &&
                  //     <div className="flex justify-between items-center mt-1 absolute bottom-1 w-9/12">
                  //       <div className=" text-lg font-semibold">
                  //         ₹ {Math.abs(lablist.drugsInfoDiscountedRate).toFixed(1)}
                  //       </div>
                  //     </div>
                  //   }
                  // </div>










                  <>
                    <div
                      key={lablist.id}
                      style={{ maxHeight: "350px" }}
                      className="mb-5 sm:mb-5 md:mb-5 m-auto lg:mb-0 -mt-2 lg:mt-5 py-1 lg:py-0 md:p-2 px-4 bg-white rounded-lg duration-300 relative  border border-gray-200 w-11/12 md:w-56"
                    >
                      <div className="mx-1 lg:mx-0 lg:px-1">
                        <div className="flex flex-col ">
                          <div className="flex flex-col  items-start gap-2 justify-center mr-6 md:mr-0 lg:mt-3 mb-2 lg:mb-3">
                            <div className="border-2 rounded-full w-12 h-12 items-center left-40 sm:left-64 md:left-44 lg:left-20 bg-white absolute -top-6">
                              <img

                                onClick={(e) => redirectToMedicine(e, lablist)}

                                src={lablist?.uploadFileName ? AddImgUrl(lablist?.uploadFileName) : resolvePharamcyImageq(lablist?.medicineTypeOfSell)}

                                className={`${lablist?.uploadFileName
                                  ? "cursor-pointer h-7 m-auto absolute top-1.5 left-2"
                                  : "cursor-pointer h-7 m-auto absolute top-1.5 left-2"
                                  }`}
                                alt="medicine"
                              />
                            </div>

                            {/* <div
                          onClick={(e) => redirectToMedicine(e, product.id)}
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                          }}
                          className="cursor-pointer h-auto text-sm font-medium pt-0 text-gray-700 mt-2"
                        >
                          {addThreeDots(product?.medicineName)}
                        </div> */}

                          </div>
                          <div className="lg:mx-0 lg:mt-2">

                            <div
                              onClick={(e) => redirectToMedicine(e, lablist)}
                              style={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                overflow: "hidden",
                              }}
                              className="cursor-pointer h-auto text-sm font-semibold pt-0 text-gray-700 mt-2"
                            >
                              {addThreeDots(lablist?.medicineName)}
                            </div>

                            <div
                              // onClick={(e) => redirectToMedicine(e, product.id)}
                              style={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                overflow: "hidden",
                              }}
                              className="cursor-pointer h-auto text-sm font-semibold pt-0 text-gray-700 mt-0"
                              onClick={(e) => redirectToMedicine(e, lablist)}
                            >
                              <span>Mfg </span>{addThreeDots(lablist?.manufacturer)}
                            </div>
                            {/* <div
                          onClick={(e) => redirectToMedicine(e, product.id)}
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                          }}
                          className="cursor-pointer h-auto text-sm font-medium pt-0 text-gray-700 mt-2"
                        >

                          <span style={{ visibility: product?.packagingType ? "visible" : "hidden" }}>Pkg type- </span> {product?.packagingType}
                        </div> */}


                            <div className="flex items-center mt-5 justify-between">
                              <div className="flex flex-col">
                                <p
                                 onClick={(e) => redirectToMedicine(e, lablist)}

                                  className="cursor-pointer text-brand-gunsmoke font-medium text-xs mt-0 lg:mt-1"
                                  style={{
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: 2,
                                    overflow: "hidden",
                                  }}
                                >
                                  {addThreeDots(lablist.medicineTypeOfSell)}
                                </p>
                                {/* <div className="mt-1  font-medium lg:font-semibold flex md:block">
                              {product.drugsInfoDiscountedRate ? (
                                <>
                                  {" "}

                                  <span className="text-gray-500 line-through text-xs ">
                                    ₹{product.medicineRate}
                                  </span>{" "}
                                </>
                              ) : (
                                ""
                              )}
                              {product?.drugsInfoDiscountPercentage ? (
                                <span className="text-xs text-green-500">
                                  ( {product.drugsInfoDiscountPercentage}% Off )
                                </span>
                              ) : (
                                ""
                              )}

                            </div> */}
                                <div className="flex mb-2">
                                  <div className=" text-lg lg:text-sm font-medium text-brand-lightgreen lg:font-semibold lg:w-32 lg:mt-0 lg:mb-2">
                                    ₹{" "}
                                    {lablist.drugsInfoDiscountedRate
                                      ? lablist.drugsInfoDiscountedRate
                                      : lablist.medicineRate}
                                  </div>


                                </div>
                              </div>

                              <button
                                onClick={(e) => {
                                  addtoCart(e, lablist, index);
                                }}
                                disabled={
                                  isAdding !== -1 ||
                                  drugIDsInCart.indexOf(lablist.id) !== -1
                                }

                                className={`${drugIDsInCart.indexOf(lablist.id) !== -1
                                  ? "text-red-500 font-medium text-xs py-1 cursor-not-allowed lg:m-auto border-2 border-gray pb-1 rounded-sm px-2 h-8"
                                  : "hover:scale-150 cursor-pointer py-2  text-xs font-normal bg-brand-lightgreen text-white mb-3 rounded-sm px-2 h-8"
                                  }`}


                              >
                                {drugIDsInCart.indexOf(lablist.id.toString()) === -1
                                  ? "+ Add"
                                  : "Added"}{" "}
                                {index === isAdding && (
                                  <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-300 h-1 w-5"></div>
                                )}
                              </button>

                            </div>


                          </div>
                        </div>
                      </div>
                    </div>

                  </>






                )
              })}
            </div>
          </div>
        </div>
        {props.isLoading &&
          <div className="flex flex-wrap justify-center">
            <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
          </div>
        }
      </div>
      {/* <div>
                Medicine
            </div> */}
    </>
  )
}

export default AllMedicine
