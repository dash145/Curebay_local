import { connect } from "react-redux";
import { setLoginModal } from "../Redux/Actions/userActions";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import { useSelector } from "react-redux";
import greenstar from "../Assets/Images/greenstar.svg";
import SectionContainer from "./SectionContainer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProduct } from "../Redux/Actions/pharmacyAction";
import { useHistory } from "react-router";
import { AddtoCart } from "../Redux/Actions/cartPlaceOrderAction";
import moment from "moment";
import { AddImgUrl } from '../config/constant';
import defaultMed from "../Assets/Images/defaultMedicine.jpeg";

function AllProducts() {
  const dispatch = useDispatch();
  const history = useHistory();
  const pharmaProductsList = useSelector(
    (state) => state.particularPharmacy.particularPharma
  );
  const userData = useSelector((state) => state.authReducer.patientData);
  const { cartList } = useSelector((state) => state.cartReducer);

  const [isAdding, setIsAdding] = useState(-1);

  const redirectToMedicine = (event, data) => {
    event.preventDefault();
    history.push({ pathname: APP_ROUTES.MEDICINE_PRODUCT, state: data });
  };

  const addtoCart = (e, data, index, quantity = 1) => {
    e.preventDefault();
    setIsAdding(index);

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
    dispatch(getAllProduct());
  }, [dispatch]);

  function getProductsIDs() {
    let ids = [];
    if (cartList) {
      if (cartList.patientDrugPrescriptionOrder) {
        for (const product of cartList.patientDrugPrescriptionOrder) {
          if (product && product.patientDrugPrescriptionOrderDetailsList) {
            for (const drug of product.patientDrugPrescriptionOrderDetailsList) {
              ids.push(drug.drugCode);
            }
          }
        }
      }
    }
    console.log("Drug Info Ids", ids);
    return ids;
  }

  const drugIDsInCart = getProductsIDs();

  return (
    <>
      <div className="flex flex-col m-auto p-auto pb-12 mx-4">
        <SectionContainer
          link={APP_ROUTES.PHARMACY_CATEGOTY}
          title={"All Products"}
          subtitle={"Consult with Doctors"}
          seeAll={"Products"}
          data={{ name: "All Medicines" }}
        />
        <div className="w-full lg:max-w-full lg:flex ">
          <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
            <div className="flex flex-nowrap  space-x-4">
              {pharmaProductsList &&
                pharmaProductsList.length > 0 &&
                pharmaProductsList.slice(0, 5).map((product, i) => (
                  <div
                    key={i}
                    className="p-4 bg-white lg:shadow-md shadow-sm lg:rounded-md rounded-2xl m-auto h-auto lg:h-auto lg:w-48 w-80 flex-none bg-cover overflow-hidden "
                  >
                    <div className="flex justify-center">
                      <img
                        src={product?.uploadFileName ? AddImgUrl(product?.uploadFileName) : defaultMed}
                        className="w-52 h-52"
                        alt="lab0"
                      />
                    </div>
                    <p
                      onClick={(e) => redirectToMedicine(e, product)}
                      className="cursor-pointer text-sm  pt-4 text-gray-700"
                    >
                      {product.drugsInfoMedicineName}
                    </p>
                    <div className="flex justify-between">
                      <p className="text-brand-manatee lg:text-xs text-md font-medium  mt-2  ">
                        {"15 Tablet in 1 Strip"}
                      </p>
                      <div className="flex pt-1">
                        <img
                          src={greenstar}
                          alt="star"
                          className="lg:w-3 w-5"
                        />
                        <p className="lg:text-xs text-lg text-green-500 pt-1 pl-1">
                          4.8
                        </p>
                      </div>
                    </div>
                    <div className=" flex justify-between mt-3">
                      <div>
                        <div className="flex">
                          <p className="lg:text-xs text-lg font-thin  line-through text-gray-500">
                            ₹ {product.unitPrice}
                          </p>
                          <p className="lg:text-xs text-lg font-thin  text-green-500">
                            {" "}
                            &nbsp; &nbsp;
                            {calcDiscount(
                              product.unitPrice,
                              product.discountPrice
                            )}
                          </p>
                        </div>
                        <p className="lg:text-xs text-lg font-medium text-gray-primary ">
                          ₹ {product.unitPrice - product.discountPrice}
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={(e) => {
                            addtoCart(e, product, i);
                          }}
                          disabled={
                            isAdding !== -1 ||
                            drugIDsInCart.indexOf(product.productId) !== -1
                          }
                          className="lg:block  bg-brand-secondary  text-sm text-white font-normal rounded-md py-1 px-2"
                        >
                          {drugIDsInCart.indexOf(
                            product.productId.toString()
                          ) === -1
                            ? "Add"
                            : "Added"}{" "}
                          {i === isAdding && (
                            <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setLoginModal: () => dispatch(setLoginModal()),
});

export default connect(null, mapDispatchToProps)(AllProducts);
