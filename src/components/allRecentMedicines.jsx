import React, { useState } from "react";
import { AddImgUrl } from '../config/constant';
import defaultMed from "../Assets/Images/defaultMedicine.jpeg";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { useDispatch } from "react-redux";
import { AddtoCart } from "../Redux/Actions/cartPlaceOrderAction";
import dettol from "../Assets/Images/dettol.svg";

function RecentMedicines() {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
  const { recentOrders, patientCode } = data;

  const userData = useSelector((state) => state.authReducer.patientData);
  const isLoading = useSelector((state) => state.cartReducer.isLoading);
  const { cartList } = useSelector((state) => state.cartReducer);

  const [isAdding, setIsAdding] = useState(-1);

  const addtoCart = (e, data, index) => {
    e.preventDefault();
    setIsAdding(index);

    let dataObj = {
      cartId: cartList && cartList.id ? cartList.cartId : "",
      createdBy: userData.code,
      createdDate: moment().format("yyyy-MM-DD hh:mm:ss"),
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
          createdDate: moment().format("yyyy-MM-DD hh:mm:ss"),
          curebayCenter: "N",
          deliveryAddress1: null,
          deliveryAddress2: null,
          deliveryAddress3: null,
          deliveryBy: -1,
          fromDate: null,
          hospitalId: data.hospitalId,
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
          totalAmount: data.totalAmount,
          txnId: "",
          userId: null,
          visitId: 0,
          patientDrugPrescriptionOrderDetailsList: [
            {
              drugCode:
                data.patientDrugPrescriptionOrderDetailsList[0].drugCode,
              drugName:
                data.patientDrugPrescriptionOrderDetailsList[0]
                  .drugName,
              unitPrice:
                data.patientDrugPrescriptionOrderDetailsList[0].unitPrice,
              discountAmount:
                data.patientDrugPrescriptionOrderDetailsList[0].discountAmount,
              totalAmount:
                data.patientDrugPrescriptionOrderDetailsList[0].totalAmount,
              gst: data.patientDrugPrescriptionOrderDetailsList[0].gst,
              quantity:
                data.patientDrugPrescriptionOrderDetailsList[0].quantity,
              address1: null,
              address2: null,
              cartId: cartList && cartList.id ? cartList.cartId : "",
              city: null,
              collectionStatus: null,
              country: null,
              createdBy: userData.code,
              createdDate: moment().format("yyyy-MM-DD hh:mm:ss"),
              deliveryAddress1: null,
              deliveryAddress2: null,
              deliveryAddress3: null,
              hospitalContactNumber:
                data.patientDrugPrescriptionOrderDetailsList[0]
                  .hospitalContactNumber,
              hospitalId:
                data.patientDrugPrescriptionOrderDetailsList[0].hospitalId,
              hospitalName:
                data.patientDrugPrescriptionOrderDetailsList[0].hospitalName,
              locationId:
                data.patientDrugPrescriptionOrderDetailsList[0].locationId,
              locationName:
                data.patientDrugPrescriptionOrderDetailsList[0].locationName,
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
    dispatch(AddtoCart(dataObj)).then(() => setIsAdding(-1));
  };

  console.log(data);

  return (
    <>
      <div className="lg:py-4">
        <br />
        <p className="text-md pl-10 font-medium">Recent Order History</p>
        <div className="lg:py-6 lg:flex lg:justify-center mb-10">
          <div className=" p-5 bg-white lg:mx-8 lg:w-full lg:rounded-lg ">
            {recentOrders?.map(
              (res, i) =>
                res.patientDrugPrescriptionOrderDetailsList[0] && (
                  <>
                    <hr className="mt-4 mb-2"></hr>

                    {/* card 1 */}
                    <div className="lg:w-full w-28 lg:max-w-full flex ">
                      <div className="lg:h-48 lg:h-auto lg:w-48 w-20 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
                      <img
                      src={res.patientDrugPrescriptionOrderDetailsList[0]?.uploadFileName ? AddImgUrl(res.patientDrugPrescriptionOrderDetailsList[0]?.uploadFileName) : defaultMed}
                      alt="lab0"
                    />
                      </div>
                      <div className="lg:pl-16 w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div className="lg:mb-8">
                          <p className="w-96 text-lg text-gray-800 flex items-center font-medium">
                            {res.patientDrugPrescriptionOrderDetailsList &&
                              res.patientDrugPrescriptionOrderDetailsList[0]
                                ?.drugName}
                          </p>
                          <p className="w-96 text-gray-500 text-xs pt-2">
                            Seller:&nbsp;
                            <span className="text-blue-500">
                              {res.hospitalName + ", " + res.locationName}
                            </span>{" "}
                            {/* &nbsp;. 2km away{" "} */}
                          </p>
                          <hr className="mt-2 lg:w-full w-52" />
                        </div>
                        <div className=" ">
                          <div className="lg:lex justify-between">
                            <div className="w-full flex pt-2 ">
                              {/* <p className="text-gray-900 leading-none text-xs pt-1">Price :  </p>
                                <p className="text-black font-medium text-sm pl-2">₹ 295.00</p>
                                <p className="text-xs line-through text-gray-500  pl-4">₹ 250.00</p> */}
                              <p className=" lg:text-xs text-sm text-gray-900 pt-1">
                                Charges:{" "}
                              </p>
                              <span className=" text-lg text-gray-600 font-medium pl-2">

                                {`₹${res.patientDrugPrescriptionOrderDetailsList[0].unitPrice - res.patientDrugPrescriptionOrderDetailsList[0].discountAmount}`}
                              </span>
                              {res.patientDrugPrescriptionOrderDetailsList[0]
                                .discountAmount !== 0 && (
                                  <p className="line-through lg:text-xs text-sm text-gray-400 pt-2 pl-2">
                                    ₹{res.patientDrugPrescriptionOrderDetailsList[0].unitPrice}
                                  </p>
                                )}
                            </div>

                            <div className="flex">
                              <span className="lg:text-xs text-sm pt-2 pr-2 py-3 text-gray-600">
                                Quantity:
                              </span>
                              <div className="flex text-gray-700 text-base">
                                <button className="flex space-x-2 bg-transparent  text-blue-700 lg:py-2 py-2 px-2 lg:border  rounded ">
                                  <p className="text-xs w-5 h-4 bg-green-500 rounded text-white">
                                    {
                                      res
                                        .patientDrugPrescriptionOrderDetailsList[0]
                                        .quantity
                                    }
                                  </p>
                                </button>
                                <p className="w-28  text-sm font-normal p-2   ml-3  rounded-xl mr-2">
                                  Total: ₹
                                  {parseFloat(
                                    res
                                      .patientDrugPrescriptionOrderDetailsList[0]
                                      .totalAmount
                                  ).toFixed(2)}{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={(e) => addtoCart(e, res, i)}
                          disabled={isAdding !== -1}
                          className="lg:block lg:ml-0 ml-24 bg-brand-secondary  text-sm text-white font-normal rounded-md py-1 px-2 disabled:opacity-50"
                        >
                          Add
                          {i === isAdding && (
                            <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>
                          )}
                        </button>
                        {/* <button className="lg:hidden bg-brand-secondary  text-lg text-white font-normal mt-2 rounded-xl py-3 px-5">Add to cart</button> */}
                      </div>
                    </div>
                  </>
                )
            )}

            <hr className="mt-4 mb-2"></hr>
          </div>
        </div>
      </div>
    </>
  );
}
export default RecentMedicines;
