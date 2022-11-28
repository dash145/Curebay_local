import React, { useEffect, useState } from "react";
import pillss from "../Assets/Images/pillss.svg";
import minus from "../Assets/Images/minus.svg";
import plus from "../Assets/Images/plus.svg";
import { useHistory, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import SectionContainer from "./SectionContainer";
import { useDispatch } from "react-redux";
import {
  getDrugPrescriptionsData,
  getPrescribedPharmaCenters,
} from "../Redux/Actions/getQuotation";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  AddtoCart,
  getCartDetails,
} from "../Redux/Actions/cartPlaceOrderAction";
function Prescription() {
  const history = useHistory();
  const location = useLocation();
  const data = location.state;
console.log(data, "datainmypresc")
  const quotDrugs = useSelector((state) => state.quotDrugs);
  const quotPharmas = useSelector((state) => state.quotPharmas);
  const { cartList } = useSelector((state) => state.cartReducer);
  const userData = useSelector((state) => state.authReducer.patientData);

  const [isAdding, setIsAdding] = useState(-1);

  const dispatch = useDispatch();
  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };

  useEffect(() => {
    dispatch(getCartDetails(userData.code));
  }, [dispatch, userData]);

  useEffect(() => {
    dispatch(getDrugPrescriptionsData(data.visitId));
    dispatch(getPrescribedPharmaCenters(data.prescriptionId));
  }, [dispatch, data]);

  const calculateTotal = (productList) => {
    let total = 0;
    productList?.forEach((product) => {
      total += product.unitPrice * product.prescribedQuantity;
    });
    return total;
  };

  const addPrescriptionToCart = (e, prescribedMed, index) => {
    setIsAdding(index);
    let prescribedDrugList = [];
    for (const data of prescribedMed.storeProductList) {
      const totalAmount = data.unitPrice * data.prescribedQuantity;
      const payload = {
        address1: null,
        address2: null,
        address3: null,
        billRefDocument: null,
        billReferDocumentType: null,
        cartId: cartList && cartList.id ? cartList.cartId : "",
        cheBranchId: null,
        cheBranchName: null,
        cheCenterId: null,
        cheCenterName: null,
        collectionStatus: null,
        createdBy: userData.code,
        createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
        curebayCenter: "N",
        deliveryAddress1: null,
        deliveryAddress2: null,
        deliveryAddress3: null,
        deliveryBy: -1,
        fromDate: null,
        hospitalId: prescribedMed.hospitalId,
        locationId: prescribedMed.locationId,
        modifiedBy: userData.code,
        modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
        orderId: "",
        packageCode: null,
        patientId: userData.code,
        payMode: null,
        prescriptionDoc: "",
        prescriptionId: prescribedMed.prescriptionId,
        procedureStatus: -1,
        procedureStatusCount: 0,
        procedureStatusName: null,
        referralId: null,
        referralName: null,
        referredBy: "",
        status: 1,
        toDate: null,
        totalAmount: totalAmount,
        txnId: "",
        userId: null,
        visitId: 0,
        patientDrugPrescriptionOrderDetailsList: [
          {
            drugCode: data.productId,
            drugName: data.drugsInfoMedicineName,
            unitPrice: data.unitPrice,
            discountAmount: data.discountPrice,
            totalAmount: totalAmount,
            gst: data.gst,
            quantity: data.prescribedQuantity,
            address1: null,
            address2: null,
            cartId: cartList && cartList.id ? cartList.cartId : "",
            city: null,
            collectionStatus: null,
            country: null,
            createdBy: userData.code,
            createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
            deliveryAddress1: null,
            deliveryAddress2: null,
            deliveryAddress3: null,
            hospitalContactNumber: data.hospitalContactNumber1,
            hospitalId: prescribedMed.hospitalId,
            hospitalName: prescribedMed.hospitalName,
            locationId: prescribedMed.locationId,
            locationName: prescribedMed.locationName,
            modifiedBy: userData.code,
            modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
            orderId: null,
            patientAddress1: userData.address1,
            patientAddress2: userData.address2,
            patientCity: userData.city,
            patientCountry: userData.country,
            patientDrugPrescriptionOrderId: "",
            patientGender: userData.gender,
            patientId: userData.code,
            patientlabAddress1: null,
            patientlabAddress2: null,
            patientlabAddress3: null,
            patientMobile: userData.mobile,
            patientName: "",
            patientState: userData.state,
            pinCode: data.hospitalPinCode,
            prescriptionId: prescribedMed.prescriptionId,
            state: null,
            status: 1,
            visitId: "0",
          },
        ],
        hospitalAddress1: data.hospitalAddress1,
        hospitalAddress2: data.hospitalAddress2,
        hospitalCity: data.hospitalCity,
        hospitalContactNumber1: data.hospitalContactNumber1,
        hospitalCountry: data.hospitalCountry,
        hospitalEmail: data.hospitalEmail,
        hospitalName: data.hospitalName,
        hospitalPinCode: data.hospitalPinCode,
        hospitalState: data.hospitalState,
        hospitalType: data.hospitalType,
        hospitalWebSite: data.hospitalWebSite,
        locationAddress1: "",
        locationAddress2: "",
        locationCity: "",
        locationContactNumber: "",
        locationDescription: "",
        locationName: data.locationName,
        locationPinCode: null,
        locationState: "TN",
        patientAddress1: userData.address1,
        patientAddress2: userData.address2,
        patientCity: userData.city,
        patientCountry: userData.country,
        patientDob: userData.dob,
        patientEmail: userData.email,
        patientGender: userData.gender,
        patientLanguage: null,
        patientMobile: userData.mobile,
        patientName: userData.firstName,
        patientPinCode: userData.pinCode,
        patientSalutation: userData.salutation,
        patientState: userData.state,
        photoRequired: "N",
        prescriptionDiagnositicsNotes: "",
        userName: null,
        userSalutation: null,
        visitComplaints: " ",
        visitConsultationType: "V",
        visitConsultReason: " ",
        visitDate: "2021-10-04 15:07:44",
        visitdiagnostic: null,
        visitFollowupVisitdate: "2021-10-21 00:00:00",
        visitPrimaryDiagnosis: "",
        visitPrimarySymptoms: "",
        visitRecommendation: "",
        visitRoleCode: "",
        visitSaveStatus: "D",
        visitSecondaryDiagnosis: "",
        visitSecondarySymptoms: "",
        visitSymptoms: "",
        visitType: "V",
      };
      prescribedDrugList.push(payload);
    }

    let dataObj = {
      cartId: cartList && cartList.id ? cartList.cartId : "",
      createdBy: userData.code,
      createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
      drugsOrdersYN: true,
      labOrdersYN: false,
      modifiedBy: userData.code,
      modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
      orderId: null,
      orderType: null,
      patientId: userData.code,
      patientLabTestsOrder: null,
      prescriptionDoc: null,
      status: 1,
      patientDrugPrescriptionOrder: prescribedDrugList,
    };

    dispatch(AddtoCart(dataObj)).then(() => setIsAdding(-1));
  };

  return (
    <>
      {/* breadcrumbs */}
      <ul className="flex text-brand-secondary text-sm lg:text-base pl-4 pt-5">
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
          <a href="/pharmacycategory">Medicines</a>
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
          <a href="#1">Prescription Approved</a>
        </li>
      </ul>
      <br />
      <div className="mx-4">
        <SectionContainer
          link={""}
          title={"Choose from one of our trusted Pharmacies"}
          subtitle={"Complete cart from one pharmacy"}
          seeAll={"hide"}
        />
        <div className="lg:pl-1 pr-10 pt-5  grid grid-cols-1 sm:grid-cols-1 overflow-x-auto hide-scroll-bar md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 ">
          {/* Card 1 start */}
          {quotPharmas.prescribedPharmaCenters?.map((res, index) => {
            return (
              <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200 ">
                <div className="flex ">
                  <img className="w-12 ml-5 pt-2" src={pillss} alt="pills" />
                  <div>
                    <div className="flex justify-between">
                      <p className="text-xs pt-2 pl-3 font-medium">
                        {res.pharamacyName}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-xs pl-3 text-gray-400">
                        {res.locationName}
                      </p>
                      {/* <p className="text-xs pl-6 text-gray-400">ETA - 56 mins</p> */}
                    </div>
                  </div>
                </div>
                <div className="mt-2 border-t border-b overflow-x-auto hide-scroll-bar">
                  {res.storeProductList &&
                    res.storeProductList.map((product) => (
                      <>
                        <div className="px-6 py-2">
                          <div className="flex justify-between">
                            <p className="text-xs font-medium mt-2">
                              {product.drugsInfoMedicineName}
                              &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                            </p>
                            <p className="text-gray-700 text-base">
                              <div
                                onClick={(e) => {
                                  // redirectTo(e, APP_ROUTES.MEDICINE_CART);
                                }}
                                className=" flex space-x-2 bg-transparent  py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                              >
                                {/* <img
                                src={minus}
                                alt="minus"
                                className="w-3 mt-2 "
                              /> */}
                                <p className="text-xs h-4 text">
                                  ₹{product.unitPrice}
                                </p>
                                <p className="text-xs h-4 text">
                                  {"x "}
                                  {product.prescribedQuantity}
                                </p>
                                {/* <img
                                src={plus}
                                alt="plus"
                                className="w-3 pt-1 "
                              /> */}
                              </div>
                            </p>
                            <p className="text-xs font-medium text-black mt-2">
                              ₹{product.unitPrice * product.prescribedQuantity}
                            </p>
                          </div>
                        </div>
                      </>
                    ))}
                  <div className="px-6 pt-4 pb-2">
                    <div className="flex justify-between">
                      <div className="flex">
                        <p className="text-sm font-medium">Total Bill: </p>
                        <div className="flex pl-3">
                          <p className="text-sm font-medium">
                            ₹{calculateTotal(res.storeProductList)}
                          </p>
                          <p className="text-xs line-through text-gray-300">
                            ₹900
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          // redirectTo(e, APP_ROUTES.MEDICINE_CART);
                          addPrescriptionToCart(e, res, index);
                        }}
                        disabled={isAdding !== -1}
                        className="bg-brand-secondary  text-white text-xs py-2 px-2 rounded disabled:opacity-50"
                      >
                        Add to Cart
                        {index === isAdding && (
                          <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Prescription;
