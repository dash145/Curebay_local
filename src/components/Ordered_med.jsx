import dettol from "../Assets/Images/img1.svg";
import defaultMed from "../Assets/Images/defaultMedicine.jpeg";
import { connect } from "react-redux";
import { setLoginModal } from "../Redux/Actions/userActions";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import { useSelector } from "react-redux";
import SectionContainer from "./SectionContainer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  AddtoCart,
  getRecentOrders,
} from "../Redux/Actions/cartPlaceOrderAction";
import moment from "moment";

function Orderedmed() {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.authReducer.patientData);
  const recentOrders = useSelector((state) => state.cartReducer.previousOrders);
  const isLoading = useSelector((state) => state.cartReducer.isLoading);
  const { cartList } = useSelector((state) => state.cartReducer);

  const [isAdding, setIsAdding] = useState(-1);

  // const redirectTo = (event) => {
  // 	event.preventDefault();
  // 	history.push(APP_ROUTES.Lab_BIO);
  // };

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

  /**
   * Calculates the Percent discount applied
   * @param {number} unitPrice MRP or Actual Price
   * @param {number} discounted Rupees Off on Price
   * @returns Percentage of Discount applied
   */
  function calcDiscount(unitPrice, discounted) {
    if (discounted === 0) {
      return "0 %off";
    }
    return `(${parseFloat((discounted / unitPrice) * 100).toFixed(2)} %off)`;
  }

  useEffect(() => {
    dispatch(getRecentOrders(userData.code));
  }, [dispatch, userData]);

  useEffect(() => {
    dispatch(getRecentOrders(userData.code));
  }, [dispatch, userData]);

  // const data = [
  // 	{ img: dettol },
  // 	{ img: img2 },
  // 	{ img: img3 },
  // 	{ img: img4 },
  // 	{ img: img5 }
  // ]
  return (
    <>
      {recentOrders.length > 0 && userData.code ? <div className="flex flex-col m-auto p-auto mx-4">
        <SectionContainer
          link={APP_ROUTES.RECENT_MED}
          title={"Recently Ordered"}
          subtitle={"See what you have purchased recently"}
          seeAll={"Products"}
          data={{ recentOrders }}
        />
        <div className="w-full lg:max-w-full lg:flex ">
          <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
            <div className="flex flex-nowrap   space-x-4">
              {recentOrders.length > 0 &&
                recentOrders.slice(0, 5).map(
                  (res, i) =>
                    res.patientDrugPrescriptionOrderDetailsList[0] && (
                      <div
                        key={i}
                        className="p-4 bg-white lg:shadow-md shadow-sm lg:rounded-md rounded-2xl m-auto h-auto lg:h-auto lg:w-48 w-80 flex-none bg-cover overflow-hidden "
                      >
                        <div className="flex justify-center">
                          <img
                            src={defaultMed}
                            className="w-52 h-52"
                            alt="lab0"
                          />
                        </div>
                        <p className="lg:text-xs text-lg lg: text-left  font-normal text-gray-primary">
                          {res.patientDrugPrescriptionOrderDetailsList &&
                            res.patientDrugPrescriptionOrderDetailsList[0]
                              ?.drugName}
                        </p>
                        <div className=" flex justify-between mt-3">
                          <div>
                            {res.patientDrugPrescriptionOrderDetailsList &&
                              res.patientDrugPrescriptionOrderDetailsList[0]
                                ?.discountAmount > 0 && (
                                <div className="flex">
                                  <p className="lg:text-xs text-lg font-thin  line-through text-gray-500">
                                    ₹
                                    {
                                      res
                                        .patientDrugPrescriptionOrderDetailsList[0]
                                        ?.unitPrice
                                    }
                                  </p>
                                  <p className="lg:text-xs text-lg font-thin  text-green-500">
                                    {calcDiscount(
                                      res
                                        .patientDrugPrescriptionOrderDetailsList[0]
                                        .unitPrice,
                                      res
                                        .patientDrugPrescriptionOrderDetailsList[0]
                                        ?.discountAmount
                                    )}
                                  </p>
                                </div>
                              )}
                            <p className="lg:text-xs text-lg font-medium text-gray-primary ">
                              ₹{" "}
                              {res.patientDrugPrescriptionOrderDetailsList[0]
                                ?.unitPrice -
                                res.patientDrugPrescriptionOrderDetailsList[0]
                                  ?.discountAmount}
                            </p>
                          </div>
                          <div>
                            <button
                              onClick={(e) => addtoCart(e, res, i)}
                              disabled={isAdding !== -1}
                              className="lg:block bg-brand-secondary  text-sm text-white font-normal rounded-md py-1 px-2 disabled:opacity-50"
                            >
                              Add
                              {i === isAdding && (
                                <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                )}
            </div>
          </div>
        </div>
        {isLoading && recentOrders.length === 0 && (
          <div className="flex flex-wrap justify-center">
            <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
          </div>
        )}
      </div> : ""
      }
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setLoginModal: () => dispatch(setLoginModal()),
});

export default connect(null, mapDispatchToProps)(Orderedmed);
