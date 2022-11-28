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


import {
  AddtoCart,
  getCartDetails,
} from "../Redux/Actions/cartPlaceOrderAction";
import SectionContainer from "./SectionContainer";
import moment from "moment";

import axios from "axios";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { Dialog } from "primereact/dialog";



function GlobalSearchLabs(props) {
  const dispatch = useDispatch();
  const location = useLocation();

  const { partnerlablisttData } = props;

  const history = useHistory();
  const [isAdding, setIsAdding] = useState(-1);
  const [openDialog, setDialog] = useState(false);
  const { cartList } = useSelector((state) => state.cartReducer);
  const userData = useSelector((state) => state.authReducer.patientData);
  const [labNewName, setLabNewName] = useState("");





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



  useEffect(()=>{
    console.log(JSON.stringify(props), "gettingpreops");
  },[])





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
      redirectToLogin(e, { pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } })
    }

    if (cartList?.patientLabTestsOrder) {
      let availableItem = cartList?.patientLabTestsOrder.find(
        (item) => item.hospitalId === data.labId
      );

      if (availableItem === undefined) {
        setDialog(true);
        setLabNewName(cartList?.patientLabTestsOrder[0]?.patientLabTestsOrderDetailsList[0]?.hospitalName)
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
    console.log(JSON.stringify(dataObj), "helloooo");

    dispatch(AddtoCart(dataObj)).then((res) => {
      dispatch(getCartDetails(userData.code));
      setIsAdding(-1);
    });
  };

 
  



  return (
    <>
      <div className="flex flex-col p-auto mt-10 px-4">
        <div>
          {partnerlablisttData && partnerlablisttData.length !== 0 && (
            <SectionContainer
              data={partnerlablisttData}
              link={APP_ROUTES.ALL_RADIOLOGY}
              title={"Available Lab Partners"}
              subtitle={"Our trusted lab partners"}
              seeAll={partnerlablisttData.length > 4 ? "diagnosis" : "diagnosis"}
             
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
                    key={i}
                      onClick={(e) => {
                        redirectTo(e, lablist);
                      }}
                      className="cursor-pointer p-2 bg-white h-80 p-5 rounded-xl m-auto w-64 flex-none bg-cover text-center overflow-hidden "
                    >
                      <div
                        className="flex justify-start w-52 m-auto"
                        key={i}
                       
                      >
                        <div className="w-full">
                          <img
                            src={
                              lablist.logo ? process.env.REACT_APP_IMG_BASEURL + lablist.logo : kaspersky
                            }
                            alt="lab0"
                            className={"rounded-md w-full mb-2"}
                            style={{
                              maxWidth: "23rem",
                              maxHeight: "13rem",
                              boxShadow: "2px 2px 20px #ccc",
                            }}
                          />
                          {/* <img src={lablist.photoName ? process.env.REACT_APP_IMG_BASEURL + lablist.photoName : kaspersky} alt="lab0" className={'rounded-md w-20 h-20 mr-3 '} style={{ maxWidth: "20rem", maxHeight: "7rem" }} />	 */}
                        </div>
                      </div>
                      <div className="text-left mt-2">
                        <p className="break-words text-lg font-normal  truncate">
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
             
              </div>
            </div>
          </div>
         
        </div>
       
      </div>

      
    </>
  );
}



export default GlobalSearchLabs;
