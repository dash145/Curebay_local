import React, { useEffect, useState } from 'react';
import minus from '../Assets/Images/minus.svg';
import plus from '../Assets/Images/plus.svg';
import medicinePhoto from '../Assets/Images/Medicines.jpg';
import line47 from '../Assets/Images/line-47@2x.svg';
import pres from '../Assets/Images/img1 (1).jpg';
import Icon24pxx from '../Assets/Images/img1 (2).jpg';
import Icon25pxx from '../Assets/Images/img1 (3).jpg';
import { useHistory ,useParams } from 'react-router-dom';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import locationh from '../Assets/Images/Locationh.svg';
import { useLocation } from 'react-router';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { AddtoCart } from '../Redux/Actions/cartPlaceOrderAction';
import Upload_pres from './Upload_pres';
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
import {getParticularPharmacy } from "../Redux/Actions/pharmacyAction";
const resolvePharamcyImageq = (Image) => {
  console.log(Image , "divhewiovhoijewov")
  let PharamncyImage; 
  if(Image.toUpperCase().includes('BOTTLE')) {
    PharamncyImage = Bottles;
  } else if(Image.toUpperCase().includes('CAPSULE') || Image.toUpperCase().includes('CAPSULES')) {
    PharamncyImage = Capsules;
  } else if(Image.toUpperCase().includes('CREAM') || Image.toUpperCase().includes('CREAMS')) {
    PharamncyImage = Creams;
  } else if(Image.toUpperCase().includes('CUREBAY')) {
    PharamncyImage = Curebay;
  } else if (Image.toUpperCase().includes('DEVICES')) {
    PharamncyImage = Devices;
  } else if(Image.toUpperCase().includes('DISPENSERS')) {
    PharamncyImage = Dispensers;
  } else if (Image.toUpperCase().includes('DROPLETS')) {
    PharamncyImage = Droplets;
  } else if(Image.toUpperCase().includes('EMULSIONS')) {
    PharamncyImage = Emulsions;
  } else if (Image.toUpperCase().includes('INJECTION') || Image.toUpperCase().includes('INJECTIONS')) {
    PharamncyImage = Injections;
  } else if (Image.toUpperCase().includes('LOTIONS')) {
    PharamncyImage = Lotions;
  } else if (Image.toUpperCase().includes('SATCHELS')) {
    PharamncyImage = Satchels;
  }else if (Image.toUpperCase().includes('TABLET') || Image.toUpperCase().includes('TABLETS')) {
    PharamncyImage = Tablets;
  } else { 
    PharamncyImage = defaultMed; 
  }
  return PharamncyImage;
}

const MedicineProductMobile = (props) => {
  
  const history = useHistory();
  const location = useLocation();
  const search = useLocation().search;
  const code = new URLSearchParams(search).get('code');
  const dispatch = useDispatch();
  const userData = useSelector(state => state.authReducer.patientData);
  const { cartList } = useSelector(state => state.cartReducer);
  const fileName = useSelector(state => state.uploadedPrescription.fileName)
  const [showModel, setShowModel] = useState(false)
  const [isAdding, setIsAdding] = useState(false);
  const pharmaProductsList = useSelector((state) => state.particularPharmacy.particularPharma);
  const [quantity, setQuantity] = useState(1);
  const [present, setPresent] = useState(false);
  
  useEffect(() =>{
    console.log(code ,"dsvdnoivnoivew")
    let payload = {
      productId: code,
      status: 1
    }
    console.log(code ,"dsvdnoivnoivew")
    dispatch(getParticularPharmacy(payload));
  },[])
  const openModel = () => {
    setShowModel(true)
  }


  const buyNow = (e) => {

  }
  const addtoCart = (e, data, quantity = 1) => {
    if(!userData.code){
      redirectTo(e, { pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } })
    }
    e.preventDefault();
    setIsAdding(true);

    const totalAmount =
      data.discountPrice !== 0
        ? data.discountPrice * quantity
        : data.unitPrice * quantity;

    let dataObj = {
      cartId: cartList && cartList.id ? cartList.cartId : "",
      createdBy: userData.code,
      createdDate: "2021-10-05 04:39:06",
      drugsOrdersYN: true,
      labOrdersYN: false,
      modifiedBy: userData.code,
      modifiedDate: moment().format("yyyy-MM-DD hh:mm:ss"),
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
          cheBranchId: null,
          cheBranchName: null,
          cheCenterId: null,
          cheCenterName: null,
          collectionStatus: null,
          createdBy: userData.code,
          createdDate: "2021-10-05 04:39:06",
          curebayCenter: "N",
          deliveryAddress1: null,
          deliveryAddress2: null,
          deliveryAddress3: null,
          deliveryBy: -1,
          fromDate: null,
          hospitalId: data.storeId,
          locationId: data.locationId,
          modifiedBy: userData.code,
          modifiedDate: moment().format("yyyy-MM-DD hh:mm:ss"),
          orderId: "",
          packageCode: null,
          patientId: userData.code,
          payMode: null,
          prescriptionDoc: "",
          prescriptionId: 0,
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
              quantity: quantity,
              address1: null,
              address2: null,
              cartId: cartList && cartList.id ? cartList.cartId : "",
              city: null,
              collectionStatus: null,
              country: null,
              createdBy: userData.code,
              createdDate: "2021-10-05 04:39:06",
              deliveryAddress1: null,
              deliveryAddress2: null,
              deliveryAddress3: null,
              hospitalContactNumber: data.hospitalContactNumber1,
              hospitalId: data.hospitalCode,
              hospitalName: data.hospitalName,
              locationId: data.locationId,
              locationName: data.locationName,
              modifiedBy: userData.code,
              modifiedDate: moment().format("yyyy-MM-DD hh:mm:ss"),
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
              ePrescriptionRequired: "N",
              prescriptionRequired: "N",
              prescriptionId: "0",
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
          hospitalPinCode: 0,
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
        },
      ],
    };
    dispatch(AddtoCart(dataObj)).then(() => setIsAdding(false));
  };



  useEffect(() => {
    console.log(code , "dsvdnoivnoivew")

    let present = false;
    let quantity = 0;
    if( pharmaProductsList?.length > 0) {
       cartList?.patientDrugPrescriptionOrder?.forEach((med) => {
         if (med.patientDrugPrescriptionOrderDetailsList[0]?.drugCode && med.patientDrugPrescriptionOrderDetailsList[0]?.drugCode === pharmaProductsList[0]?.productId) {
            present = true;
            setQuantity(++quantity);
         }
      });
    }
    setPresent(present);
  }, [cartList, pharmaProductsList?.length])

  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location)
  }

  const createMarkup = (data) =>{
    return {__html: data}; 
  }

console.log(pharmaProductsList , "pharmaProductsListdneow" , code)

if(!pharmaProductsList.length){
  return<></>
}

  return (
    <div className='block md:hidden'>
      <div className = "" >
        <div className="flex flex-col">
          <div className="">
            <div className="flex ">
              <div className="lg:block hidden justify-between h-96 ">
              </div>
              <div className="w-80 h-80 text-center lg:mx-5 shadow-sm border border-gray-100 mx-auto flex justify-center items-center">
                <img className="w-30 h-52 p-5" src={pharmaProductsList[0]?.uploadFileName ? AddImgUrl(pharmaProductsList[0]?.uploadFileName) : resolvePharamcyImageq(pharmaProductsList[0]?.drugsInfoTypeOfSell)} alt="dettol" />
              </div>
            </div>
          </div>

          <div className="lg:w-1/3  pt-5 pl-5 ">
            <div className="flex justify-between">
              <div>
              <p className="lg:w-full text-2xl font-medium">{pharmaProductsList[0]?.drugsInfoMedicineName}</p>
                {pharmaProductsList[0]?.drugsInfoLiverInteraction && pharmaProductsList[0]?.drugsInfoLiverInteraction.length && <div className = " text-xs"  dangerouslySetInnerHTML = {createMarkup(pharmaProductsList[0]?.drugsInfoLiverInteraction)} />}
              <p style = {{fontSize: '12px'}} className = "text-brand-secondary" > {pharmaProductsList[0]?.drugsInfoManufacturer} </p>
              </div>
            </div>
            <img src={line47} alt="line47" />
            <div className=" flex mt-3 w-96">
              <p className="text-gray-900 leading-none text-xs pt-1">Price</p>
              <p className="text-black font-medium text-base pl-20">₹ {pharmaProductsList[0].unitPrice - pharmaProductsList[0].discountPrice}</p>
              {pharmaProductsList[0].discountPrice && <p className="text-xs line-through text-gray-500 pl-2">₹ {pharmaProductsList[0].unitPrice}</p>}
              <p className="text-xs text-brand-secondary pl-6">Inclusive of all taxes</p>
            </div>

            <div className="flex mt-3">
              <p className="text-xs pt-1 pr-4">Quantity</p>
              <p className="text-gray-700 text-center pl-10">
                <div className=" flex space-x-2 bg-transparent text-blue-700 py-1 px-2 border border-gray-300 hover:border-transparent rounded">
                  {!present && <img
                    src={minus}
                    alt="minus"
                    className="w-3 cursor-pointer "
                    onClick={(e) => {
                      if (quantity > 1) setQuantity(quantity - 1);
                    }}
                  />}
                  <p className="text-xs w-5 h-4 bg-blue-500 rounded text-white">
                    {" "}
                    {quantity.toString().padStart(2, "0")}
                  </p>
                  {!present && <img
                    src={plus}
                    alt="plus"
                    onClick={(e) => {
                      if (quantity <= pharmaProductsList[0].quantity)
                        setQuantity(quantity + 1);
                    }}
                    className="w-3 cursor-pointer "
                  />}
                </div>
                    
              </p>
              <span className = "ml-2 text-brand-secondary" >{pharmaProductsList[0].drugsInfoTypeOfSell}</span>
            </div>
            <div className="flex">
              <div>
                <p className="text-xs pt-1 pr-4">Services</p>
              </div>
              <div className="pl-12">
                {pharmaProductsList[0].drugsInfoPrescription !== "N" &&
                  <div className="flex items-center my-2">
                    <img src={pres} alt="prescription" />
                    <p className="text-xs text-brand-secondary pl-2">Prescription required for this medicine</p>
                  </div>
                }
                <div className="flex items-center my-2">
                  <img src={Icon24pxx} alt="refresh " className="h-4 w-4" />
                  <p className="text-xs text-brand-secondary pl-2">No Returns Applicable</p>
                </div>
                <div className="flex items-center my-2">
                  <img src={Icon25pxx} alt="correct" className="h-4 w-4" />
                  <p className="text-xs text-brand-secondary pl-2">Cash on delivery</p>
                </div>
              </div>
            </div>
            {/* <div className="flex mt-1" >
              <p className="text-xs pt-1 w-28">Seller</p>
              <span className="text-brand-secondary">
                {medicine.hospitalName}
                {medicine.hospitalCity ? `,&nbsp;${medicine.hospitalCity}` : ""}
              </span>
            </div> */}
            <div className="flex">
              <p className="text-xs pt-1 w-28"> Sell Type</p>
              <span className="text-brand-secondary">
                {pharmaProductsList[0].drugsInfoTypeOfSell}
              </span>

            </div>
            <br />
            <div className="flex ">
              <button
                onClick={(e) => pharmaProductsList[0].drugsInfoPrescription === "Prescription Required" && !!!fileName ?
                  openModel() : present ? redirectTo(e, APP_ROUTES.MEDICINE_CART)
                    : addtoCart(e, pharmaProductsList[0])}
                className="border border-brand-secondary bg-secondary w-full text-sm text-white rounded-md py-2 px-10 mr-2 disabled:opacity-50 " style ={{background: "#005D8D"}} >
                {present ? 'Go To Cart' : 'Add to cart'}
                {isAdding && (
                          <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>
                        )}
              </button>
            </div>
            
          </div>
        </div>

        <div className="lg:w-1/3 w-52 lg:pr-5 pr-12 lg:ml-12 lg:mt-5 mt-5">
          <nav className="flex flex-col sm:flex-row justify-between">
            <button className="font-medium font-normal  py-2 mx-5 lg:px-8 block  focus:outline-none text-brand-secondary border-brand-primary border-b-2 font-medium">
              Product Details
            </button>
          </nav>
        </div>
        <div className="w-full pt-5 px-4 mb-20 productdetail">
          <p className=" text-sm " style = {{color: '#000000a6'}} >

          {pharmaProductsList[0]?.drugsInfoAlcoholLabel?.length && <><h1 className= "font-medium text-brand-secondary">Alcohol Consumption: {" "} {pharmaProductsList[0].drugsInfoAlcoholLabel == "SAFE"? <label className = "text-green-500" >{pharmaProductsList[0].drugsInfoAlcoholLabel}</label> : <label className = "text-red-500" >{pharmaProductsList[0].drugsInfoAlcoholLabel}</label>}</h1></>}
                {pharmaProductsList[0]?.drugsInfoAlcoholInteraction?.length && <><p>{pharmaProductsList[0].drugsInfoAlcoholInteraction}</p><br/></>} 
                
                {pharmaProductsList[0]?.drugsInfoDosAndDont?.length && <><h1 className= "font-medium text-brand-secondary">Do's and Dont's</h1></>}
                  <div  dangerouslySetInnerHTML = {createMarkup(pharmaProductsList[0]?.drugsInfoDosAndDont)} />
                  <br />
                
                {pharmaProductsList[0]?.drugsInfoDrivingLabel?.length && <><h1 className= "font-medium text-brand-secondary">Driving: {" "}{pharmaProductsList[0].drugsInfoDrivingLabel == "SAFE"? <label className = "text-green-500" >{pharmaProductsList[0].drugsInfoDrivingLabel}</label> : <label className = "text-red-500" >{pharmaProductsList[0].drugsInfoDrivingLabel}</label>}</h1></>}
                <div  dangerouslySetInnerHTML = {createMarkup(pharmaProductsList[0]?.drugsInfoDrivingInteraction)} />
                <br />
                {pharmaProductsList[0]?.drugsInfoLactationLabel?.length && <><h1 className= "font-medium text-brand-secondary">Lactation: {" "}{pharmaProductsList[0].drugsInfoLactationLabel}</h1></>}
                <div  dangerouslySetInnerHTML = {createMarkup(pharmaProductsList[0]?.drugsInfoLactationInteraction)} />
                <br />
                {pharmaProductsList[0]?.drugsInfoLiverLabel?.length && <><h1 className= "font-medium text-brand-secondary">Liver Health: {" "}{pharmaProductsList[0].drugsInfoLiverLabel == "CAUTION"? <label className = "text-red-500" >{pharmaProductsList[0].drugsInfoLiverLabel}</label> : <label className = "text-green-500" >{pharmaProductsList[0].drugsInfoLiverLabel}</label>}</h1></>}
                <div  dangerouslySetInnerHTML = {createMarkup(pharmaProductsList[0]?.drugsInfoLiverInteraction)} />
                <br />
                {pharmaProductsList[0]?.drugsInfoRenalLabel?.length && <><h1 className= "font-medium text-brand-secondary">Kidney Health: {" "} {pharmaProductsList[0].drugsInfoRenalLabel == "CAUTION"? <label className = "text-red-500" >{pharmaProductsList[0].drugsInfoRenalLabel}</label> : <label className = "text-green-500" >{pharmaProductsList[0].drugsInfoRenalLabel}</label>}</h1></>}
                <div  dangerouslySetInnerHTML = {createMarkup(pharmaProductsList[0]?.drugsInfoRenalInteraction)} />
                <br />
                {pharmaProductsList[0]?.drugsInfoPregnancyLabel?.length && <><h1 className= "font-medium text-brand-secondary">During Pregnancy: {pharmaProductsList[0].drugsInfoPregnancyLabel}</h1></>}
                <div  dangerouslySetInnerHTML = {createMarkup(pharmaProductsList[0]?.drugsInfoPregnancyInteraction)} />
                <br/>
            {pharmaProductsList[0]?.drugsInfoUses?.length  && <><h1 className="font-medium text-brand-secondary">Use</h1><br /></>}
            <ul className="list-disc">
              {lodash.split(pharmaProductsList[0].drugsInfoUses, ",").map((text ,i) => text ?
                <li  >{text}</li> :
                "")}
            </ul><br />
            {pharmaProductsList[0]?.drugsInfoDirection?.length &&<><h1 className="font-medium text-brand-secondary">How to use</h1><br /></>}
            <ul className="list-disc">
              {lodash.split(pharmaProductsList[0].drugsInfoDirection, ". ").map(howToUse => howToUse ?
                <li>{howToUse}</li> :
                "")}
            </ul><br />
            {pharmaProductsList[0]?.drugsInfoComposition?.length && <><h1 className="font-medium text-brand-secondary">Composition</h1><br /></>}
            <ul className="list-disc">
              {lodash.split(pharmaProductsList[0].drugsInfoComposition, ". ").map(text => text ?
                <li>{text}</li> :
                "")}
            </ul><br />
           {pharmaProductsList[0]?.drugsInfoSideEffects?.length && <> <h1 className="font-medium text-brand-secondary">Side Effects</h1><br /></>}
            <ul className="list-disc">
              {lodash.split(pharmaProductsList[0].drugsInfoSideEffects, ",").map(text => text ?
                <li>{text}</li> :
                "")}
            </ul><br />

            
            {pharmaProductsList[0]?.drugsInfoAlternateMedicine?.length && <><h1 className="font-medium text-brand-secondary">Alternative Medicines</h1><br /></>}
            <ul className="list-disc">
              {lodash.split(pharmaProductsList[0].drugsInfoAlternateMedicine, ",").map(text => text ?
                <li>{text}</li> :
                "")}
            </ul><br />
            {/* <img src={line47} alt="line47" /> */}
            {
              (pharmaProductsList[0]?.drugsInfoChemicalClass?.length || pharmaProductsList[0]?.drugsInfoHabitforming?.length || pharmaProductsList[0]?.drugsInfoTherapeuticClass || pharmaProductsList[0]?.drugsInfoFoodInteraction?.length) &&
              <><h1 className="font-medium text-brand-secondary">Other information</h1><br /></>
            }
            {pharmaProductsList[0]?.drugsInfoFoodInteraction?.length && <><h2 className="text-brand-secondary">Food Consumption</h2><p>{pharmaProductsList[0].drugsInfoFoodInteraction}</p></>}
            {pharmaProductsList[0]?.drugsInfoChemicalClass?.length && <><h2 className="text-brand-secondary">Chemical Class</h2><p>{pharmaProductsList[0].drugsInfoChemicalClass}</p></>}
            {pharmaProductsList[0]?.drugsInfoHabitforming?.length && <><h2 className="text-brand-secondary">Habitforming</h2>{pharmaProductsList[0].drugsInfoHabitforming}</>}
            {pharmaProductsList[0]?.drugsInfoTherapeuticClass?.length && <><h2 className="text-brand-secondary">Therapeutic Class</h2>{pharmaProductsList[0].drugsInfoTherapeuticClass}</>}
          </p>
        </div>
        <br />
        {/* <SimilarProducts /> */}
        {showModel && <div className="justify-center mb-4 items-center bg-gray-600   opacity-90  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="m-4 p-4 rounded-lg bg-white " >
            Please Upload piscription First
            <Upload_pres documentType={'Prescription'} title={'Quick Order with E-Prescription'} subTitle={'Upload e-prescription & tell us what you need. We do the rest'} />

          </div>
        </div>}
      </div>
    </div>
  )
}
export default MedicineProductMobile;
