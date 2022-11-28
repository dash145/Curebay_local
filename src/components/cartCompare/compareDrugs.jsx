import React, { useEffect, useState } from "react";
import pillss from "../../Assets/Images/pillss.svg";
import { useLocation } from "react-router-dom";
import SectionContainer from "../SessionContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getDrugPrescriptionsData,
  getPrescribedPharmaCenters,
} from "../../Redux/Actions/getQuotation";
import {
    AddtoCart,
    getCartDetails,
  } from "../../Redux/Actions/cartPlaceOrderAction";
import moment from "moment";
import getQuotation from "../../Redux/services/getQuotation";
import Pharmacy from '../../components/Pharmacy';
import { array } from "yup/lib/locale";
import { getPharmacyList } from '../../Redux/Actions/pharmacyAction';
import Diagnosticsservice from "../../Redux/services/Diagnosticsservice";
import { ToastContainer, toast } from "react-toastify";

function CompareDrugPrescription(props) {
  const location = useLocation();
  const data = location.state;

  // const quotDrugs = useSelector((state) => state.quotDrugs);
  const quotPharmas = useSelector((state) => state.quotPharmas);

  const { pharmacyData } = useSelector((state) => state.pharmalist);
  const { cartList } = useSelector((state) => state.cartReducer);
  const userData = useSelector((state) => state.authReducer.patientData);
  const cheUserData = useSelector((state) => state.authReducer.userData);

  const [pharmaciesList, setPharmaciesList] = useState([]);
  const [MedDiscPercent, setMedDiscPercent] = useState("0");
  const {coords} = useSelector(state => state.authReducer);

  const [isAdding, setIsAdding] = useState(-1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartDetails(userData.code));
  }, []);

  useEffect(() => {
    dispatch(getDrugPrescriptionsData(data.visitId));
    dispatch(getPrescribedPharmaCenters(data.prescriptionId));
    // Diagnosticsservice.getFacilityDiscountPercent(e.locationId).then((res1) => {
    //   if(res1.data && res1.data.length){
    //     setMedDiscPercent(res1.data[0].discountPercentage);
    //   }
    // });
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(getCartDetails(userData.code));
    console.log('Added To Cart : ' + props.addedToCart);
  }, [dispatch, props.addedToCart]);

  useEffect(() => {
    if(sessionStorage.getItem('customPinCode')){
        dispatch(getPharmacyList({ location: null, pincode: sessionStorage.getItem('customPinCode') }))

    }
}, [sessionStorage.getItem('customPinCode')]);



  const calculateTotal = (productList) => {

    let total = 0;
    if(MedDiscPercent){
      productList?.forEach((product) => {
        total += (product.unitPrice - ((product.unitPrice/100) * parseFloat(MedDiscPercent))) * product.prescribedQuantity;
       // (unit - ((unit/100) * discount)) *quantity
      });
    } else{
      productList?.forEach((product) => {
        total += product.unitPrice * product.prescribedQuantity;
      });
    }

    return total;
  };

  const selectedPharmacy = (e) => {
    Diagnosticsservice.getFacilityDiscountPercent(e.locationId).then((res1) => {
      if(res1.data && res1.data.length){
        setMedDiscPercent(res1.data[0].discountPercentage);
      }
      let payload = {
        status: 1,
        locationId: e.locationId,
        prescriptionId: data.prescriptionId,
        //locationId: e.target.value
      }
      console.log(payload,data, "kjhfjksdbvjdsb")
      getQuotation.getPrescriptionPharmacyCenters(payload).then((res) => {
        if(res.data.length == 0) {
          toast("Prescribed Medicine are not available in the Pharmacy center");
        }
        if (res.data) {
          console.log(JSON.stringify(res.data));
          console.log(JSON.stringify(data.drugsList));
          res.data.forEach((ele) => {
            ele.storeProductList.forEach((element) => {
              if(element?.discountPrice)
              element.discountPrice = parseFloat((element.unitPrice/100) * parseFloat(res1.data[0].discountPercentage));
            });
          });
          // res.data.storeProductList.forEach((element) => {
          //   element.discountPrice = parseFloat((element.unitPrice/100) * parseFloat(res1.data[0].discountPercentage));
          // });
          console.log(res.data , "sfkdjsbkdjsbv")
          setPharmaciesList(res.data);
        }
      }, (err) => {
        console.log(err);
      })

    });
    console.log(JSON.stringify(data));
  }

  const checkAlreadyAdded = (prescription) => {
    console.log(cartList, "prescriptiondfjewwehu", prescription)
    if(cartList && cartList.patientDrugPrescriptionOrder) {
      let added = false;
      cartList.patientDrugPrescriptionOrder.forEach(element => {
        if(element.locationId == prescription.locationId) {
          added = true;
        }
      });
      console.log('Order Location : ' + prescription.locationId);
      return added;
    }
    return false;
  }

  const addPrescriptionToCart = (e, prescribedMed, index, discount) => {

    console.log(JSON.stringify(prescribedMed));

    let prescriptionRequired = 'N';
    let ePrescriptionRequired = 'Y';

    setIsAdding(index);

    let dataObj = {};

    let isAdded = false;
    if (cartList && cartList.patientDrugPrescriptionOrder) {
      cartList.patientDrugPrescriptionOrder.forEach(element => {
        if (element.locationId == prescribedMed.locationId) {
          isAdded = true;
          for (const data of prescribedMed.storeProductList) {

            const totalAmount = data.unitPrice * data.prescribedQuantity;
            element.patientDrugPrescriptionOrderDetailsList.push(
              {
                drugCode: data.productId,
                drugName: data.drugsInfoMedicineName,
                unitPrice: data.unitPrice,
                discountAmount: ((data.unitPrice/100) * discount) * data.prescribedQuantity,
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
                visitId: data.visitId ? data.visitId : "0",
                prescriptionRequired: prescriptionRequired,
                ePrescriptionRequired: ePrescriptionRequired
              });
          }
        }
      });
      if (!isAdded) {
        let pharmacyObj = {
          address1: null,
          address2: null,
          address3: null,
          billRefDocument: null,
          billReferDocumentType: null,
          cartId: cartList && cartList.id ? cartList.cartId : "",
          cheid: localStorage.getItem('hospitalid'),
        chelocationId: localStorage.getItem('locationid'),
        cheBranchId: localStorage.getItem('locationid'),
        cheCenterId: localStorage.getItem('hospitalid'),
          cheBranchName: null,
          cheCenterName: null,
          collectionStatus: null,
          createdBy: userData.code,
          createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
          curebayCenter: "N",
          deliveryAddress1: null,
          deliveryAddress2: null,
          deliveryAddress3: null,
          deliveryBy: 0,
          fromDate: null,
          hospitalId: prescribedMed.hospitalId,
          locationId: prescribedMed.locationId,
          modifiedBy: userData.code,
          modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
          orderId: "",
          packageCode: null,
          patientId: userData.code,
          paymode: 'E',
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
          totalAmount: '',
          txnId: "",
          userId: null,
          visitId: data.visitId ? data.visitId : 0,
          isPOS: !prescribedMed.locationIsPOS ? 0 : 1,
          patientDrugPrescriptionOrderDetailsList: []
        }

        let finalTotalAmount = 0.00;
        for (const data of prescribedMed.storeProductList) {
          const totalAmount = data.unitPrice * data.prescribedQuantity;
          pharmacyObj.patientDrugPrescriptionOrderDetailsList.push(
            {
              drugCode: data.productId,
              drugName: data.drugsInfoMedicineName,
              unitPrice: data.unitPrice,
              discountAmount: ((data.unitPrice/100) * discount) * data.prescribedQuantity,
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
              visitId: data.visitId ? data.visitId : "0",
              prescriptionRequired: prescriptionRequired,
              ePrescriptionRequired: ePrescriptionRequired
            });
        }
        pharmacyObj.totalAmount = finalTotalAmount;
        cartList.patientDrugPrescriptionOrder.push(pharmacyObj);
      }
      dataObj = cartList;
    } else {
      dataObj = {
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
        patientDrugPrescriptionOrder: [
          {
            address1: null,
            address2: null,
            address3: null,
            billRefDocument: null,
            billReferDocumentType: null,
            cartId: cartList && cartList.id ? cartList.cartId : "",
            cheid: localStorage.getItem('hospitalid'),
        chelocationId: localStorage.getItem('locationid'),
        cheBranchId: localStorage.getItem('locationid'),
        cheCenterId: localStorage.getItem('hospitalid'),

            cheBranchName: null,

            cheCenterName: null,
            collectionStatus: null,
            createdBy: userData.code,
            createdDate: moment().format("yyyy-MM-DD HH:mm:ss"),
            curebayCenter: "N",
            deliveryAddress1: null,
            deliveryAddress2: null,
            deliveryAddress3: null,
            deliveryBy: 0,
            fromDate: null,
            hospitalId: prescribedMed.hospitalId,
            locationId: prescribedMed.locationId,
            modifiedBy: userData.code,
            modifiedDate: moment().format("yyyy-MM-DD HH:mm:ss"),
            orderId: "",
            packageCode: null,
            patientId: userData.code,
            paymode: 'E',
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
            //totalAmount: totalAmount,
            txnId: "",
            userId: null,
            visitId: data.visitId ? data.visitId : 0,
            isPOS: !prescribedMed.locationIsPOS ? 0 : 1,
            patientDrugPrescriptionOrderDetailsList: [],
          }
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
        visitId: data.visitId ? data.visitId : 0
      }

      let finalTotalAmount = 0.00;
      for (const data of prescribedMed.storeProductList) {
        const totalAmount = data.unitPrice * data.prescribedQuantity;
        finalTotalAmount += totalAmount;
        dataObj.patientDrugPrescriptionOrder[0].patientDrugPrescriptionOrderDetailsList.push(
          {
            drugCode: data.productId,
            drugName: data.drugsInfoMedicineName,
            unitPrice: data.unitPrice,
            discountAmount: ((data.unitPrice/100) * discount) * data.prescribedQuantity,
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
            visitId: data.visitId ? data.visitId : "0",
            prescriptionRequired: prescriptionRequired,
            ePrescriptionRequired: ePrescriptionRequired
          }
        )
      }
      dataObj.patientDrugPrescriptionOrder[0].totalAmount = finalTotalAmount;
    }

    console.log(JSON.stringify(dataObj));
    dispatch(AddtoCart(dataObj)).then(() => {
      props.cartRefresh();
      setIsAdding(-1);
    });
  }

  const handleChange = (e) => {
    let payload = {
      status: 1,
      prescriptionId: data.prescriptionId,
      locationId: e.target.value
    }
    getQuotation.getPrescriptionPharmacyCenters(payload).then((res) => {
      if (res.data) {
        setPharmaciesList(res.data);
      }
    }, (err) => {
      console.log(err);
    })
  }

  const calDisc = (unit,discount,quantity) => {
let amount = (unit - ((unit/100) * discount)) *quantity;
return amount;
  };

  const getdiscount = (locationId) => {
   Diagnosticsservice.getFacilityDiscountPercent(locationId).then((res1) => {
      if(res1.data && res1.data.length){
        setMedDiscPercent(res1.data[0].discountPercentage);
      }
    });
      };



      console.log( "locationState:" , location )


  return (
    <>
      {/* breadcrumbs */}
    <ToastContainer />

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
      {quotPharmas?.prescribedPharmaCenters?.length > 0 && (
        <div className="flex justify-between">
          <SectionContainer
            link={""}
            title={"Choose from one of our trusted Pharmacies"}
          //subtitle={"Complete cart from one pharmacy"}
          // seeAll={"hide"}
          />
        </div>

      )}
      {quotPharmas?.prescribedPharmaCenters?.length == 0 && (
        <div className="flex justify-between">
          <SectionContainer
            link={""}
            title={"Requested medicines not available"}
          //subtitle={"Complete cart from one pharmacy"}
          // seeAll={"hide"}
          />
        </div>

      )}
      {!data.search && (
        <div className="pl-6 md:pl-10 pr-10 pt-5 pb-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {!data.search && pharmacyData?.length > 0 && quotPharmas?.prescribedPharmaCenters?.filter(item =>{
              if(pharmacyData.find(res => res.hospitalName == item.hospitalName)){
                return item
            }
          }).map((res, index) => {
            return (
              <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200 " key={index}>
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
                <div className="mt-2 border-t border-b">
                  {data.drugsList &&
                  data.drugsList.map((product,i) => (
                    <>
                        <div className="px-6 py-2" key={i}>
                          <div className="flex justify-between">
                            <p className="text-xs font-medium mt-2">
                              {product.drugName}
                              &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                            </p>
                            <p className="text-gray-700 text-base">
                              <div
                                onClick={(e) => {
                                  // redirectTo(e, APP_ROUTES.MEDICINE_CART);
                                }}
                                className=" flex space-x-2 bg-transparent  py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                              >
                                <p className="text-xs h-4 text">
                                  ₹{res.storeProductList.filter((x) => x.productId === product.pharmacyStockId).length > 0 ? res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].unitPrice : 0}
                                </p>
                                <p className="text-xs h-4 text">
                                  {"x "}
                                  {getdiscount(res.locationId)}
                                  {res.storeProductList.filter((x) => x.productId === product.pharmacyStockId).length > 0 ? res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].prescribedQuantity : 0}
                                </p>
                              </div>
                            </p>
                            {MedDiscPercent != "0" ? (
                              <div>
                              <p className="text-xs font-medium text-black mt-2 line-through">
                              ₹{res.storeProductList.filter((x) => x.productId === product.pharmacyStockId).length > 0 ? (res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].unitPrice * res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].prescribedQuantity) : 0}
                            </p>
                            <p className="text-xs font-medium text-black mt-2">
                              {/* ₹{res.storeProductList.filter((x) => x.productId === product.pharmacyStockId).length > 0 ? ((res.storeProductList.filter((x) => x.productId === (product.pharmacyStockId))[0].unitPrice) - ((res.storeProductList.filter((x) => x.productId === (product.pharmacyStockId))[0].unitPrice.unitPrice/100) * parseFloat(MedDiscPercent)) * (res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].prescribedQuantity)) : 0} */}
                              ₹{res.storeProductList.filter((x) => x.productId === product.pharmacyStockId).length > 0 ? calDisc(res.storeProductList.filter((x) => x.productId === (product.pharmacyStockId))[0].unitPrice,MedDiscPercent,res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].prescribedQuantity) : "0"}
                            </p>
                            </div>
                            //   <div>
                            //   <p className="text-xs font-medium text-black mt-2 line-through">
                            //   ₹{res.storeProductList.filter((x) => x.productId === product.pharmacyStockId).length > 0 ? (res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].unitPrice * res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].prescribedQuantity) : 0}
                            // </p>
                            // <p className="text-xs font-medium text-black mt-2">
                            //   ₹{res.storeProductList.filter((x) => x.productId === product.pharmacyStockId).length > 0 ? (res.storeProductList.filter((x) => x.productId === ((product.pharmacyStockId)[0].unitPrice - ((product.pharmacyStockId)[0].unitPrice/100) * parseFloat(MedDiscPercent))) * res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].prescribedQuantity) : 0}
                            // </p>
                            // </div>


                            ): (
                              <p className="text-xs font-medium text-black mt-2">
                              ₹{res.storeProductList.filter((x) => x.productId === product.pharmacyStockId).length > 0 ? (res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].unitPrice * res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].prescribedQuantity) : 0}
                            </p>)}

                          </div>
                        </div>
                      </>
                  ))}
                  {/*res.storeProductList &&
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
                                <p className="text-xs h-4 text">
                                  ₹{product.unitPrice}
                                </p>
                                <p className="text-xs h-4 text">
                                  {"x "}
                                  {product.prescribedQuantity}
                                </p>
                              </div>
                            </p>
                            <p className="text-xs font-medium text-black mt-2">
                              ₹{product.unitPrice * product.prescribedQuantity}
                            </p>
                          </div>
                        </div>
                      </>
                              ))*/}
                  <div className="px-6 pt-2 pb-2">
                    <div className="flex justify-end">
                      <div className="flex">
                        <p className="text-sm font-medium">Total Bill: </p>
                        <div className="flex pl-3">
                          <p className="text-sm font-medium">
                            ₹{calculateTotal(res.storeProductList)}
                          </p>
                        </div>
                      </div>
                    </div></div>
                  <div className="px-6 pt-2 pb-2">
                    <div className="flex justify-end">

                      <button
                        onClick={(e) => {
                          // redirectTo(e, APP_ROUTES.MEDICINE_CART);
                          addPrescriptionToCart(e, res, index,MedDiscPercent);
                        }}
                        disabled={
                          isAdding !== -1 || !(res.storeProductList?.length > 0) || checkAlreadyAdded(res)
                        }
                        className="bg-brand-secondary  text-white text-xs py-2 px-2 rounded disabled:opacity-50"
                      >
                        {checkAlreadyAdded(res) ? 'Added to cart' : 'Add to Cart'}
                        {/*Add to Cart*/}
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
      )}

      {data.search && quotPharmas?.prescribedPharmaCenters?.length > 0 && (
        <Pharmacy
          ePrescription={true}
          pharmacySelected={selectedPharmacy}
        ></Pharmacy>
      )}

      {pharmaciesList.length > 0 && pharmaciesList.map((res, index) => {
        return (
          <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200 " key={index}>
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
            <div className="mt-2 border-t border-b">
              {data.drugsList && data.drugsList.map((product,i) => (
                <>
                <div className="px-6 py-2" key={i}>
                  <div className="flex justify-between">
                    <p className="text-xs w-2/3 font-medium mt-2">
                      {product.drugName}
                      &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <p className="text-gray-700 w-1/7 text-base">
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
                          ₹{res.storeProductList.filter((x) => x.productId === product.pharmacyStockId).length > 0 ? res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].unitPrice : 0}
                        </p>
                        <p className="text-xs h-4 text">
                          {"x "}
                          {res.storeProductList.filter((x) => x.productId === product.pharmacyStockId).length > 0 ? res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].prescribedQuantity : 0}
                        </p>
                        {/* <img
                          src={plus}
                          alt="plus"
                          className="w-3 pt-1 "
                        /> */}
                      </div>
                    </p>
                    {MedDiscPercent ? (
                              <div>
                              <p className="text-xs font-medium text-black mt-2 line-through">
                              ₹{res.storeProductList.filter((x) => x.productId === product.pharmacyStockId).length > 0 ? (res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].unitPrice * res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].prescribedQuantity) : 0}
                            </p>
                            <p className="text-xs font-medium text-black mt-2">
                              {/* ₹{res.storeProductList.filter((x) => x.productId === product.pharmacyStockId).length > 0 ? ((res.storeProductList.filter((x) => x.productId === (product.pharmacyStockId))[0].unitPrice) - ((res.storeProductList.filter((x) => x.productId === (product.pharmacyStockId))[0].unitPrice.unitPrice/100) * parseFloat(MedDiscPercent)) * (res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].prescribedQuantity)) : 0} */}
                              ₹{res.storeProductList.filter((x) => x.productId === product.pharmacyStockId).length > 0 ? calDisc(res.storeProductList.filter((x) => x.productId === (product.pharmacyStockId))[0].unitPrice,MedDiscPercent,res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].prescribedQuantity) : "0"}
                            </p>
                            </div>


                            ): (
                              <p className="text-xs font-medium text-black mt-2">
                              ₹{res.storeProductList.filter((x) => x.productId === product.pharmacyStockId).length > 0 ? (res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].unitPrice * res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].prescribedQuantity) : 0}
                            </p>)}


                    {/* <p className="text-xs w-1/7 font-medium text-black mt-2">
                      ₹{res.storeProductList.filter((x) => x.productId === product.pharmacyStockId).length > 0 ? (res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].unitPrice * res.storeProductList.filter((x) => x.productId === product.pharmacyStockId)[0].prescribedQuantity) : 0}
                    </p> */}
                  </div>
                </div>
              </>

              ))}
              {/*res.storeProductList &&
                res.storeProductList.map((product) => (
                  <>
                    <div className="px-6 py-2">
                      <div className="flex justify-between">
                        <p className="text-xs w-2/3 font-medium mt-2">
                          {product.drugsInfoMedicineName}
                          &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                        </p>
                        <p className="text-gray-700 w-1/7 text-base">
                          <div
                            onClick={(e) => {
                              // redirectTo(e, APP_ROUTES.MEDICINE_CART);
                            }}
                            className=" flex space-x-2 bg-transparent  py-1 px-3 border border-blue-500 hover:border-transparent rounded"
                          >
                            <p className="text-xs h-4 text">
                              ₹{product.unitPrice}
                            </p>
                            <p className="text-xs h-4 text">
                              {"x "}
                              {product.prescribedQuantity}
                            </p>
                          </div>
                        </p>
                        <p className="text-xs w-1/7 font-medium text-black mt-2">
                          ₹{product.unitPrice * product.prescribedQuantity}
                        </p>
                      </div>
                    </div>
                  </>
                ))*/}
              <div className="px-6 pt-2 pb-2">
                <div className="flex justify-end">
                  <div className="flex">
                    <p className="text-sm font-medium">Total Bill: </p>
                    <div className="flex pl-3">
                      <p className="text-sm font-medium">
                        ₹{calculateTotal(res.storeProductList)}
                      </p>
                      {/* <p className="text-xs line-through text-gray-300">
                        ₹900
                      </p> */}
                    </div>
                  </div>
                </div></div>
              <div className="px-6 pt-2 pb-2">
                <div className="flex justify-end">

                  <button
                    onClick={(e) => {
                      // redirectTo(e, APP_ROUTES.MEDICINE_CART);
                      addPrescriptionToCart(e, res, index,MedDiscPercent);
                    }}
                    disabled={
                      checkAlreadyAdded(res) || isAdding !== -1 || !(res.storeProductList?.length > 0)
                    }
                    className="bg-brand-secondary  text-white text-xs py-2 px-2 rounded disabled:opacity-50"
                  >
                    {checkAlreadyAdded(res) ? 'Added to cart' : 'Add to Cart'}
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

    </>
  );
}
export default CompareDrugPrescription;

