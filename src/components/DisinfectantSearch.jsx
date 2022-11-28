import React, { useEffect, useState } from 'react'
import filter from '../Assets/Images/filter.svg';
import sort from '../Assets/Images/sort.svg';
import dettol from '../Assets/Images/dettol.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getMedicineByKeyword } from '../Redux/Actions/pharmacyAction';
import { AddtoCart } from '../Redux/Actions/cartPlaceOrderAction';
import moment from 'moment';

function DisinfectantSearch() {

  const dispatch = useDispatch();
  const location = useLocation();
  const [isAdding, setIsAdding] = useState(-1);

  const keyword = location.state;
  const medicines = useSelector(state => state.medicine.medicines);
  const isLoading = useSelector(state => state.medicine.isLoading);
  const userData = useSelector(state => state.authReducer.patientData)
  const { cartList } = useSelector(state => state.cartReducer);

  useEffect(() => {
    dispatch(getMedicineByKeyword(keyword));
  }, [dispatch, keyword])


  const addtoCart = (e, data, index, quantity = 1) => {
    e.preventDefault();
    setIsAdding(index);

    const totalAmount =
      data.discountPrice !== 0
        ? data.discountPrice * quantity
        : data.unitPrice * quantity;

    let dataObj = {
      "cartId": cartList && cartList.id ? cartList.cartId : '',
      "createdBy": userData.code,
      "createdDate": "2021-10-05 04:39:06",
      "drugsOrdersYN": true,
      "labOrdersYN": false,
      "modifiedBy": userData.code,
      "modifiedDate": moment().format("yyyy-MM-DD hh:mm:ss"),
      "orderId": null,
      "orderType": null,
      "patientId": userData.code,
      "patientLabTestsOrder": null,
      "prescriptionDoc": null,
      "status": 1,
      "patientDrugPrescriptionOrder": [
        {
          "address1": null,
          "address2": null,
          "address3": null,
          "billRefDocument": null,
          "billReferDocumentType": null,
          "cartId": cartList && cartList.id ? cartList.cartId : '',
          "cheBranchId": null,
          "cheBranchName": null,
          "cheCenterId": null,
          "cheCenterName": null,
          "collectionStatus": null,
          "createdBy": userData.code,
          "createdDate": "2021-10-05 04:39:06",
          "curebayCenter": "N",
          "deliveryAddress1": null,
          "deliveryAddress2": null,
          "deliveryAddress3": null,
          "deliveryBy": -1,
          "fromDate": null,
          "hospitalId": data.storeId,
          "locationId": data.locationId,
          "modifiedBy": userData.code,
          "modifiedDate": moment().format("yyyy-MM-DD hh:mm:ss"),
          "orderId": "",
          "packageCode": null,
          "patientId": userData.code,
          "payMode": null,
          "prescriptionDoc": "",
          "prescriptionId": 0,
          "procedureStatus": -1,
          "procedureStatusCount": 0,
          "procedureStatusName": null,
          "referralId": null,
          "referralName": null,
          "referredBy": "",
          "status": 1,
          "toDate": null,
          "totalAmount": totalAmount,
          "txnId": "",
          "userId": null,
          "visitId": 0,
          "patientDrugPrescriptionOrderDetailsList": [
            {
              "drugCode": data.productId,
              "drugName": data.drugsInfoMedicineName,
              "unitPrice": data.unitPrice,
              "discountAmount": data.discountPrice,
              "totalAmount": totalAmount,
              "gst": data.gst,
              "quantity": quantity,
              "address1": null,
              "address2": null,
              "cartId": cartList && cartList.id ? cartList.cartId : '',
              "city": null,
              "collectionStatus": null,
              "country": null,
              "createdBy": userData.code,
              "createdDate": "2021-10-05 04:39:06",
              "deliveryAddress1": null,
              "deliveryAddress2": null,
              "deliveryAddress3": null,
              "hospitalContactNumber": data.hospitalContactNumber1,
              "hospitalId": data.hospitalCode,
              "hospitalName": data.hospitalName,
              "locationId": data.locationId,
              "locationName": data.locationName,
              "modifiedBy": userData.code,
              "modifiedDate": moment().format("yyyy-MM-DD hh:mm:ss"),
              "orderId": null,
              "patientAddress1": userData.address1,
              "patientAddress2": userData.address2,
              "patientCity": userData.city,
              "patientCountry": userData.country,
              "patientDrugPrescriptionOrderId": "",
              "patientGender": userData.gender,
              "patientId": userData.code,
              "patientlabAddress1": null,
              "patientlabAddress2": null,
              "patientlabAddress3": null,
              "patientMobile": userData.mobile,
              "patientName": "",
              "patientState": userData.state,
              "pinCode": data.hospitalPinCode,
              "prescriptionId": "0",
              "state": null,
              "status": 1,
              "visitId": "0",
            }
          ],
          "hospitalAddress1": data.hospitalAddress1,
          "hospitalAddress2": data.hospitalAddress2,
          "hospitalCity": data.hospitalCity,
          "hospitalContactNumber1": data.hospitalContactNumber1,
          "hospitalCountry": data.hospitalCountry,
          "hospitalEmail": data.hospitalEmail,
          "hospitalName": data.hospitalName,
          "hospitalPinCode": 0,
          "hospitalState": data.hospitalState,
          "hospitalType": data.hospitalType,
          "hospitalWebSite": data.hospitalWebSite,
          "locationAddress1": "",
          "locationAddress2": "",
          "locationCity": "",
          "locationContactNumber": "",
          "locationDescription": "",
          "locationName": data.locationName,
          "locationPinCode": null,
          "locationState": "TN",
          "patientAddress1": userData.address1,
          "patientAddress2": userData.address2,
          "patientCity": userData.city,
          "patientCountry": userData.country,
          "patientDob": userData.dob,
          "patientEmail": userData.email,
          "patientGender": userData.gender,
          "patientLanguage": null,
          "patientMobile": userData.mobile,
          "patientName": userData.firstName,
          "patientPinCode": userData.pinCode,
          "patientSalutation": userData.salutation,
          "patientState": userData.state,
          "photoRequired": "N",
          "prescriptionDiagnositicsNotes": "",
          "userName": null,
          "userSalutation": null,
          "visitComplaints": " ",
          "visitConsultationType": "V",
          "visitConsultReason": " ",
          "visitDate": "2021-10-04 15:07:44",
          "visitdiagnostic": null,
          "visitFollowupVisitdate": "2021-10-21 00:00:00",
          "visitPrimaryDiagnosis": "",
          "visitPrimarySymptoms": "",
          "visitRecommendation": "",
          "visitRoleCode": "",
          "visitSaveStatus": "D",
          "visitSecondaryDiagnosis": "",
          "visitSecondarySymptoms": "",
          "visitSymptoms": "",
          "visitType": "V",
        }
      ]
    }
    dispatch(AddtoCart(dataObj)).then(() => setIsAdding(-1))
  }


  function getProductsIDs() {
    let ids = []
    if (cartList.length>0) {
      if (cartList.patientDrugPrescriptionOrder.length>0) {
        for (const product of cartList.patientDrugPrescriptionOrder) {
          if (product && product.patientDrugPrescriptionOrderDetailsList) {
            for (const drug of product.patientDrugPrescriptionOrderDetailsList) {
              ids.push(drug.drugCode)
            }
          }
        }
      }
    }
    console.log("Drug Info Ids", ids)
    return ids;
  }

  const drugIDsInCart = getProductsIDs();

  return (
    <>

      <div className="bg-gray-100 lg:py-4">
        {/* breadcrumbs */}
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
            <button>{keyword}</button>
          </li>
        </ul>

        <br />
        <p className="text-md pl-10 font-medium">Search result for “{keyword}”</p>
        <p className="text-xs text-gray-400 pl-10">Showing {medicines.length} search results</p>
        {!isLoading && <div className="bg-gray-100 lg:py-6 lg:flex lg:justify-center">
          <div className=" p-5 bg-white lg:mx-8 lg:w-full lg:shadow-lg lg:rounded-lg ">
            <div className="flex justify-between">
              <div className="flex">
                {/* <div className="h-6 w-16 pl-1 pt-1 bg-green-500 rounded-2xl">
                  <div className="flex justify-around ">
                    <p className="text-xs  text-white">Online</p>
                    <img src={close} alt="close" />
                  </div>
                </div>
                <div className="h-6 w-20 pl-1 pt-1 bg-green-500 rounded-2xl ml-3">
                  <div className="flex justify-around">
                    <p className="text-xs text-white">Location</p>
                    <img src={close} alt="close" />
                  </div>
                </div>
                <div className="h-6 w-24 pl-1 pt-1 bg-green-500 rounded-2xl ml-3">
                  <div className="flex justify-around ">
                    <p className="text-xs text-white">₹500 - ₹750</p>
                    <img src={close} alt="close" />
                  </div>
                </div> */}
              </div>

              <div className="flex">
                <div className=" flex justify-items-auto " >

                  <div className="">
                    <div className="flex justify-items-auto" >
                      <img src={filter} alt="filter" />
                      <p className="text-xs pl-2">Filter</p>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex justify-items-auto pl-4" >
                      <img src={sort} alt="sort" />
                      <p className="text-xs pl-2">Sort by: Popular</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* card 1 */}
            {medicines && medicines.length > 0 && medicines.map((res, i) => {
              return (
                <div className=" w-full lg:max-w-full lg:flex rounded-lg border border-gray-200 p-5 mt-3">
                  <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" >
                    <img src={dettol} alt="savlon" />
                  </div>
                  <div className="pl-16 w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                      <p className="text-sm text-gray-800 flex items-center font-medium">
                        {res.drugsInfoMedicineName}
                      </p>
                      {/* <div className="flex">
                        <img src={star} alt="star" className="w-3" />
                        <p className="text-xs pl-2">4.8</p>
                      </div> */}
                      <hr className="mt-2 pb-2 " />
                      <div className="text-blue-500  text-xs font-medium mb-2">{res.drugsInfoTypeOfSell}</div>
                      <p className="text-gray-500 text-xs">Manfacuture :  {res.drugsInfoManufacturer}</p>
                      <p className="text-gray-500 text-xs pt-2">Seller:&nbsp;
                        <span className="text-blue-500">
                          {res.hospitalName}
                        </span>{/* &nbsp;. 2km away  */}</p>
                      <hr className="mt-2" />
                    </div>
                    <div className=" ">
                      <div className="flex justify-between">
                        <div className=" flex ">
                          <p className="text-gray-900 leading-none text-xs pt-1">Price :  </p>
                          <p className="text-black font-medium text-sm pl-2">₹ {res.unitPrice - res.discountPrice}</p>
                          <p className="text-xs line-through text-gray-500  pl-4">₹ {res.unitPrice}</p>
                        </div>

                        <div className="flex">
                          {/* <p className="text-xs pt-1 pr-4">Quantity :</p>
                          <p className="text-gray-700 text-base">
                            <button className=" flex space-x-2 bg-transparent  text-blue-700 py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                              <img src={minus} alt="minus" className="w-3 mt-2 " />
                              <p className="text-xs w-5 h-4 bg-green-500 rounded text-white" > 01</p>
                              <img src={plus} alt="plus" className="w-3 pt-1 " />
                            </button>
                          </p> */}
                          <button
                            onClick={(e) => { addtoCart(e, res, i,) }}
                            disabled={i === isAdding || drugIDsInCart.indexOf(res.productId) !== -1}
                            className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 disabled:opacity-50">
                            {drugIDsInCart.indexOf(res.productId.toString()) === -1 ? 'Add to Cart' : 'Added'} {
                              i === isAdding &&
                              <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>
                            }
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )
            })}
            {(!medicines || medicines.length === 0) &&
              <div className="pl-16 w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                No Medicines Found
              </div>
            }
          </div>
        </div>}

        {isLoading &&
          <div className="flex flex-wrap justify-center pl-10 pr-10 pb-10">
            <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
          </div>}

      </div>



    </>
  );
}
export default DisinfectantSearch;