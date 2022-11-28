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
import labImage from '../Assets/Images/lab.svg';
import {
  getlabPartnerslist,
  getElasticPartnerslist,
  getCommonLabTest
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
var isFirstTimeLeft=true
var positionScroll1 = 0;

function AllRadiology(props) {

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
  const [viewDetailDialog, setViewDetailDialog] = useState({
    flag: false,
    data: {}
  })
  const [pathName, setPathName] = useState(null)
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

  useEffect(() => {
    if (coords) {
      setIsFetchingPinCode(false);
      dispatch(getElasticPartnerslist(coords));
      console.log('sdsjdkfndjk', JSON.stringify(partnerlablisttData))
    }
  }, [coords]);

  useEffect(() => {
    dispatch(getCommonLabTest(coords)).then((res) => {

      console.log('commmmmm', JSON.stringify(res))

      setMostCommonLabtest(res)



    })
  }, [])

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
      behavior: 'smooth', block: 'nearest', inline: 'center'
    });
  };

  const handleScroll = (e, dir) => {







    if (dir == "rightArrow") {
			if(positionScroll==0){
				positionScroll=7
			}
			positionScroll = positionScroll + 1
		} else {

			if(isFirstTimeLeft){
				positionScroll = positionScroll - 6
				isFirstTimeLeft=false
			}else{
				positionScroll = positionScroll - 2
			}

		}
		if (positionScroll > partnerlablisttData.length) {
			positionScroll = partnerlablisttData.length - 3
		}
		if (positionScroll < 0) {
			positionScroll = 0
		}
		scrollRefs?.current[positionScroll]?.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });





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

    if (cartList && cartList.patientLabTestsOrder) {
      cartList.patientLabTestsOrder.map(res => {
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
        })
      })
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

  useEffect(() => {
    let temp=window.location.pathname
    setPathName(temp)
    console.log(temp,"qqqqqqqqqqq23");
  }, [])
  

  return (
    <>

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
          <a href="/diagnosis">Diagnostics</a>
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
        {/* <li className="inline-flex items-center">
          <a href="/diagnosis">Lab Test</a>
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
        </li> */}
        <li className="inline-flex items-center">
          <a >Lab Partners</a>
        </li>
      </ul>

      <br />
      <div className="w-full">
          {/* <SectionContainer link={APP_ROUTES.ALL_RADIOLOGY} title={'Lab Partners Near me'} subtitle={'Our trusted lab partners'} seeAll={'hide'} /> */}
          {partnerlablisttData && partnerlablisttData.length !== 0 && (
            <div className="w-full">
              <p className="flex justify-center text-lg sm:text-lg md:text-xl lg:text-xl font-bold text-gray-700 mb-0  mt-4">Available Lab Partners</p>
            </div>
          )}
          <div
            className={`${partnerlablisttData.length === 0
              ? "w-full lg:max-w-full lg:flex justify-center mt-3"
              : ""
              }`}
            style={{ marginTop: "45px" }}
          >
            {/* <div className="w-full lg:max-w-full lg:flex justify-center mt-3"> */}
            {partnerlablisttData.length === 0 ?
              <div className="mb-12 w-full flex flex-col items-center">
                <img
                className="h-24 lg:h-28 mt-5 lg:mt-3 "
                src={noDataFound}
                alt="No Data Found"
              />
              <h4 className="font-medium  text-gray-400 text-md">
                  No Diagnostic Service Available
                </h4>
              </div> :
              <div className="mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 px-3">
                  {partnerlablisttData?.filter(item=>item.labName !=="eClinic Lab")?.map((lablist, i) => {
                    // let link = lablist._source;
                    return (
                      <div
                        key={i}
                        onClick={(e) => {
                          redirectTo(e, lablist);
                          localStorage.setItem("pathName", pathName )
                        }}
                        className="cursor-pointer bg-white rounded-xl m-auto flex-none bg-cover text-center overflow-hidden pt-2 w-full"
                        style={{ border: "1px solid #E4E4E4", borderRadius: "7px" }}
                      >
                        <div className="flex items-center ">

                        <div
                          className="m-3 md:m-5 w-1/4 md:w-auto"
                          key={i}
                          ref={scrollRefs.current[i]}
                        >
                          <div className="w-full" style={{ textAlign: "-webkit-center" }} >
                            <img
                              src={
                                lablist.logo ? process.env.REACT_APP_IMG_BASEURL + lablist.logo : kaspersky
                              }
                              alt="lab0"
                              className={"w-24 h-16 md:w-32 mb-2 md:h-24"}

                            />
                            {/* <img src={lablist.photoName ? process.env.REACT_APP_IMG_BASEURL + lablist.photoName : kaspersky} alt="lab0" className={'rounded-md w-20 h-20 mr-3 '} style={{ maxWidth: "20rem", maxHeight: "7rem" }} />	 */}
                          </div>
                        </div>
                        <div className="w-44 md:w-auto text-left mt-2 mx-6">
                          <p className="w-full break-words text-sm md:text-center font-semibold truncate" style={{ color: "#262626" }}>
                            {lablist.labName}
                          </p>
                          <p className="text-brand-gunsmoke mb-5  text-xs font-normal mt-1  " style={{ color: "#262626" }}>
                            {lablist.city}
                          </p>
                        </div>

                        </div>

                        <div className="flex justify-center items-center" style={{ background: "#EAF8FF", padding: "9px 0px" }}>
                          <button style={{ color: "#18406D" }} className="font-semibold text-xs underline">View Details</button>
                          <i style={{ color: "#18406D", height: "10.62px", width: "5.43px" }} className="pi pi-angle-right"></i>
                        </div>

                      </div>
                    );
                  })}
                  {!isLoading &&
                    !isFetchingPinCode &&
                    partnerlablisttData &&
                    partnerlablisttData.length === 0 && (
                      <div className="w-full flex flex-col items-center justify-around">

                      </div>
                    )}
                </div>
              </div>
            }
          </div>
          {(isLoading || isFetchingPinCode) &&
            partnerlablisttData.length === 0 && (
              <div className="flex flex-wrap justify-center">
                <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
              </div>
            )}
        </div>
    </>
  );
}
export default AllRadiology;
