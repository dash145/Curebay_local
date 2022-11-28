import React, { useEffect, useState } from "react";
import minus from "../Assets/Images/minus.svg";
import plus from "../Assets/Images/plus.svg";
import medicinePhoto from "../Assets/Images/Medicines.jpg";
import line47 from "../Assets/Images/line-47@2x.svg";
import pres from "../Assets/Images/img1 (1).jpg";
import Icon24pxx from "../Assets/Images/img1 (2).jpg";
import Icon25pxx from "../Assets/Images/img1 (3).jpg";
import { useHistory, useParams } from "react-router-dom";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import locationh from "../Assets/Images/Locationh.svg";
import placeholder_m from "../Assets/Images/placeholder_m.svg";
import { useLocation } from "react-router";
import lodash from "lodash";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { AddtoCart, getCartDetails } from "../Redux/Actions/cartPlaceOrderAction";
import Upload_pres from "./Upload_pres";
import { AddImgUrl } from "../config/constant";
import Bottles from "../Assets/pharamacyImages/Bottles.png";
import Capsules from "../Assets/pharamacyImages/Capsules.png";
import Creams from "../Assets/pharamacyImages/Creams.png";
import Curebay from "../Assets/pharamacyImages/Curebay.png";
import Devices from "../Assets/pharamacyImages/Devices.png";
import Dispensers from "../Assets/pharamacyImages/Dispensers.png";
import Droplets from "../Assets/pharamacyImages/Droplets.png";
import Emulsions from "../Assets/pharamacyImages/Emulsions.png";
import Injections from "../Assets/pharamacyImages/Injections.png";
import Lotions from "../Assets/pharamacyImages/Lotions.png";
import Satchels from "../Assets/pharamacyImages/Satchels.png";
import Tablets from "../Assets/pharamacyImages/Tablets.png";
import defaultMed from "../Assets/Images/Medicines.jpg";
import http from "../Redux/services/http-common";
import { getParticularPharmacy } from "../Redux/Actions/pharmacyAction";
import { Galleria } from 'primereact/galleria';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';


const resolvePharamcyImageq = (Image) => {
  if (!Image) {
    return "";
  }
  let PharamncyImage;
  if (Image.toUpperCase().includes("BOTTLE")) {
    PharamncyImage = Bottles;
  } else if (
    Image.toUpperCase().includes("CAPSULE") ||
    Image.toUpperCase().includes("CAPSULES")
  ) {
    PharamncyImage = Capsules;
  } else if (
    Image.toUpperCase().includes("CREAM") ||
    Image.toUpperCase().includes("CREAMS")
  ) {
    PharamncyImage = Creams;
  } else if (Image.toUpperCase().includes("CUREBAY")) {
    PharamncyImage = Curebay;
  } else if (Image.toUpperCase().includes("DEVICES")) {
    PharamncyImage = Devices;
  } else if (Image.toUpperCase().includes("DISPENSERS")) {
    PharamncyImage = Dispensers;
  } else if (Image.toUpperCase().includes("DROPLETS")) {
    PharamncyImage = Droplets;
  } else if (Image.toUpperCase().includes("EMULSIONS")) {
    PharamncyImage = Emulsions;
  } else if (
    Image.toUpperCase().includes("INJECTION") ||
    Image.toUpperCase().includes("INJECTIONS")
  ) {
    PharamncyImage = Injections;
  } else if (Image.toUpperCase().includes("LOTIONS")) {
    PharamncyImage = Lotions;
  } else if (Image.toUpperCase().includes("SATCHELS")) {
    PharamncyImage = Satchels;
  } else if (
    Image.toUpperCase().includes("TABLET") ||
    Image.toUpperCase().includes("TABLETS")
  ) {
    PharamncyImage = Tablets;
  } else {
    PharamncyImage = defaultMed;
  }
  return PharamncyImage;
};

const MedicineProductWeb = (props) => {
  const history = useHistory();
  const location = useLocation();
  const search = useLocation().search;
  const res = search.split("?code=");
  const code = res[1];
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authReducer.patientData);
  const { cartList } = useSelector((state) => state.cartReducer);
  const fileName = useSelector((state) => state.uploadedPrescription.fileName);
  const [showModel, setShowModel] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  // const pharmaProductsList = useSelector((state) => state.particularPharmacy.particularPharma);
  const [pharmaProductsList, setpharmaProductsList] = useState();
  const [quantity, setQuantity] = useState(1);
  const [present, setPresent] = useState(false);
  const [alternateMedicine, setAlternativeMedicineData] = useState([])
  const [zoomState, setZoomState] = useState({
    backgroundPosition: '0% 0%'
  })
  const searchMedicine = async () => {
    console.log("sdfidovufh", code);
    const payload = {
      medicineId: code,
    };
    const data = await http.get(`${process.env.REACT_APP_ELASTIC_BASEURL}medicine/${code}`);
    console.log(data, "sdfidovufh", code);
    if (data.data) {
      setpharmaProductsList(data.data);
      const alternateMedicine = await http.get(`${process.env.REACT_APP_ELASTIC_BASEURL}medicine/alternativeMedicine?medicineId=${data.data.id}&content=${data.data.composition} `);
      if (alternateMedicine.data) {
        setAlternativeMedicineData(alternateMedicine.data)
      } else {
        setAlternativeMedicineData([])
      }
      setpharmaProductsList(data.data);
    } else {
      setpharmaProductsList({});
    }

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    console.log(code, "dsvdnoivnoivew");
    dispatch(getCartDetails(userData.code));
    searchMedicine();
  }, [code]);

  const openModel = () => {
    setShowModel(true);
  };

  const buyNow = (e) => { };

  const addtoCart = (e, data, index) => {
    if (!userData.code) {
      redirectTo(e, {
        pathname: APP_ROUTES.LOGIN,
        state: { background: location, login: true },
      });
    }
    e.preventDefault();
    setIsAdding(true);
    console.log("index", data);
    console.log(data, "afjkaskjvwekvesvew");
    let prescriptionRequired = "N";
    let ePrescriptionRequired = "N";

    if (data.prescriptionRequired == "Yes") {
      prescriptionRequired = "Y";
      // ePrescriptionRequired = "Y";
    } else {
      prescriptionRequired = "N";
      // ePrescriptionRequired = "N";
    }
    let calculatedAmount = data?.drugsInfoDiscountedRate ? data?.drugsInfoDiscountedRate : data.medicineRate

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
          discountAmount: data?.drugsInfoDiscountedRate ? data?.drugsInfoDiscountedRate : 0.00,
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
                discountAmount: data?.drugsInfoDiscountedRate ? data?.drugsInfoDiscountedRate : 0.00,
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
    // if (
    //   dataObj?.patientMedicineOrder?.length &&
    //   dataObj.patientMedicineOrder[0].patientMedicineOrderDetailsList.length > 0
    // ) {
    //   let id =
    //     dataObj.patientMedicineOrder[0].patientMedicineOrderDetailsList.map(
    //       (item) => item.drugCode
    //     );
    //   id.map((item, index, self) => {
    //     if (self.indexOf(item) === index) {
    //     } else {
    //       dataObj.patientMedicineOrder[0].patientMedicineOrderDetailsList[
    //         self.indexOf(item)
    //       ].quantity +=
    //         dataObj.patientMedicineOrder[0].patientMedicineOrderDetailsList[
    //           index
    //         ].quantity;
    //       dataObj.patientMedicineOrder[0].patientMedicineOrderDetailsList[
    //         self.indexOf(item)
    //       ].totalAmount =
    //         dataObj.patientMedicineOrder[0].patientMedicineOrderDetailsList[
    //           self.indexOf(item)
    //         ].quantity *
    //         dataObj.patientMedicineOrder[0].patientMedicineOrderDetailsList[
    //           self.indexOf(item)
    //         ].unitPrice;
    //     }
    //   });

    //   let res =
    //     dataObj.patientMedicineOrder[0].patientMedicineOrderDetailsList.filter(
    //       (item, i, self) => {
    //         if (id.indexOf(item.drugCode) == i) {
    //           return item;
    //         }
    //       }
    //     );

    //   dataObj.patientMedicineOrder[0].patientMedicineOrderDetailsList = res;
    // }
    console.log(dataObj, "dsihdspisdhpids");
    dispatch(AddtoCart(dataObj)).then(() => setIsAdding(false));
  };

  useEffect(() => {


    let present = false;
    let quantity = 0;
    if (pharmaProductsList != undefined && cartList?.patientMedicineOrder) {
      console.log(cartList, "sdviodsnviodnov")
      cartList?.patientMedicineOrder[0]?.patientMedicineOrderDetailsList?.forEach((med) => {
        if (med?.drugCode &&
          med?.drugCode == pharmaProductsList?.id) {
          present = true;
          setQuantity(++quantity);
        }
      });
    }
    setPresent(present);
  }, [cartList, pharmaProductsList])

  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };

  const createMarkup = (data) => {
    return { __html: data };
  };


  // if(!pharmaProductsList?.length){
  //   return<></>
  // }


  const handleImgError = e => {
    e.target.src = placeholder_m
  }

  const handleAlternativeMedicineClick = (e, id) => {
    e.preventDefault();
    history.push({
      pathname: APP_ROUTES.MEDICINE_PRODUCT,
      search: `?code=${id}`,
    });
  };

  const responsiveOptions2 = [
    {
      breakpoint: '960px',
      numVisible: 4
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  const thumbnailTemplate = (item) => {
    console.log(item, "sdvdsvodsihvpijvpsd");
    return <div className="scrollbar-hide"> <img src={item} alt={item?.alt} style={{ width: "60px", display: 'block' }} /> </div>
  }

  const handleMouseMove = (e, item) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    setZoomState({ backgroundPosition: `${x}% ${y}%`, width: "250px" })
  }

  const itemTemplate = (item) => {
    console.log(item, "item image");
    return <figure style={{ backgroundImage: `url(${item})`, width: "200px", height: "max-content", display: 'block', ...zoomState }} onMouseLeave={() => setZoomState({ width: "200px" })} onMouseMove={(e) => handleMouseMove(e, item)}><img src={item} alt={item?.alt} /></figure>
  }

  console.log(pharmaProductsList, "sdvisdhoivsdhoivhiovds", alternateMedicine)

  return (
    <div className="block mx-0  md:mx-8 sm:mx-2 sm:my-4">
      {/* <div className="scrolleffect lg:hidden"></div> */}
      <ul className="lg:flex hidden sm:block text-brand-secondary text-sm lg:text-base pl-10 pt-5">
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
          <a href="/pharmacycategory">Medicine</a>
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
          <button>{pharmaProductsList?.medicineName}</button>
        </li>
      </ul>
      <div className="">
        <div className="lg:flex flex-col sm:flex-row  md:flex-row">
          <div className="w-auto  md:w-11/12 xl:w-4/12  pt-5 flex sm:grid-cols-1 ">
            <div className="w-full lg:w-full flex items-center justify-center border-2 overflow-hidden rounded-md" style={{ height: "304px" }}>
              {
                pharmaProductsList?.medicineImages?.length ? <Galleria value={pharmaProductsList?.medicineImages} responsiveOptions={responsiveOptions2} numVisible={3} thumbnailsPosition="left"
                  item={itemTemplate} circular thumbnail={thumbnailTemplate} /> :
                  <img
                    className="w-1/2 h-80 p-5"
                    style={{ width: "258px", height: "201px" }}
                    src={pharmaProductsList?.medicineImage ? pharmaProductsList?.medicineImage : resolvePharamcyImageq(pharmaProductsList?.medicineTypeOfSell)}
                    alt="Product Image"
                    referrerPolicy="no-referrer"
                    onError={handleImgError}
                  />
              }


            </div>
          </div>

          <div className="lg:ml-12 md:ml-8 sm:ml-4  pt-5 relative">
            <div className="md:flex justify-between lg:w-full">
              <div>
                <p className="lg:w-full text-2xl font-medium text-brand-lightgreen">
                  {pharmaProductsList?.medicineName.length > 30
                    ? `${pharmaProductsList?.medicineName.substring(0, 43)}…`
                    : pharmaProductsList?.medicineName}
                  {/* {pharmaProductsList?.medicineName} */}
                </p>
                {pharmaProductsList?.drugsInfoLiverInteraction &&
                  pharmaProductsList?.drugsInfoLiverInteraction.length > 0 && (
                    <div
                      className=" text-xs"
                      dangerouslySetInnerHTML={createMarkup(
                        pharmaProductsList?.drugsInfoLiverInteraction
                      )}
                    />
                  )}
                <p
                  className="text-gray-700 font-sm"
                >
                  <span className="font-normal" style={{ display: pharmaProductsList?.manufacturer ? "inline" : "none" }}>Manufacturer- </span> {pharmaProductsList?.manufacturer}

                </p>
              </div>
              <div className="  flex items-end right-0 relative mt-2 lg:ml-24 h-5 md:w-96">
                {/* <p className="text-gray-900 leading-none text-sm font-medium w-40 pt-1">Price</p> */}
                <p className="text-black font-semibold text-base"><span className="font-normal text-sm">MRP{" "}</span>₹ {pharmaProductsList?.drugsInfoDiscountedRate ? pharmaProductsList?.drugsInfoDiscountedRate : pharmaProductsList?.medicineRate}</p>

                <p className="text-sm font-medium text-gray-700 pl-3">
                  (Inclusive of all taxes)
                </p>
              </div>
            </div>
            <img src={line47} alt="line47" className="w-4/5" />
            <div>
              {/* <div className=" flex items-center mt-3 md:w-96">
              <p className="text-gray-900 leading-none text-sm font-medium w-40 pt-1">Price</p>
              <p className="text-black font-medium text-base">₹ {pharmaProductsList?.drugsInfoDiscountedRate?pharmaProductsList?.drugsInfoDiscountedRate  :pharmaProductsList?.medicineRate }</p>

              <p className="text-sm font-medium text-brand-secondary pl-6">
                Inclusive of all taxes
              </p>
            </div> */}

              <div className="flex items-start md:items-end mt-4">
                <div className="flex">
                  <p className="text-sm font-bold pt-1 w-40">Quantity</p>
                  <span className="mr-5 font-semibold">:</span>
                </div>

                <div className="flex gap-2 md:gap-0 flex-col md:flex-row">
                  <p className="text-gray-700 text-center rounded-md" style={{ background: "#18406D", height: "25px", width: "72px" }}>

                    <div className=" flex items-center space-x-2 bg-transparent text-white pb-1 px-2  hover:border-transparent rounded">

                      {!present && (
                        <RemoveIcon
                          className="cursor-pointer"
                          style={{ color: "white", width: "12px" }}
                          onClick={(e) => {
                            if (quantity > 1) setQuantity(quantity - 1);
                          }}
                        />
                      )}

                      {!present ?
                        <p className="text-sm font-semibold w-5 h-4 mb-1 rounded text-white">
                          {" "}
                          {quantity.toString().padStart(2, "0")}
                        </p>
                        :
                        <p className="text-sm font-semibold w-5 h-4 my-1 ml-4  rounded text-white">
                          {" "}
                          {quantity.toString().padStart(2, "0")}
                        </p>
                      }

                      {!present && (
                        <AddIcon
                          onClick={(e) => {
                            // if (quantity <= pharmaProductsList.quantity)
                            setQuantity(quantity + 1);
                          }}
                          className="cursor-pointer "
                          style={{ color: "white", width: "12px" }}
                        />
                      )}
                    </div>
                  </p>
                  <span className="md:ml-2 text-sm font-medium text-gray-700 pt-1">
                    {pharmaProductsList?.medicineTypeOfSell.charAt(0).toUpperCase() + pharmaProductsList?.medicineTypeOfSell.slice(1)}
                  </span>
                </div>
              </div>
              {pharmaProductsList?.prescriptionRequired &&
                <div className=" flex items-start mt-4 md:w-96">
                  <div className="flex">
                    <p className="text-gray-900 leading-none text-sm font-bold pt-1 w-40">Prescription</p>
                    <span className="mr-5  font-semibold">:</span>
                  </div>

                  <p className=" font-medium text-sm text-gray-700 font-normal pt-1"> {pharmaProductsList?.prescriptionRequired.charAt(0).toUpperCase() + pharmaProductsList?.prescriptionRequired.slice(1)}</p>
                </div>
              }
              {pharmaProductsList?.composition &&
                <div className="flex mt-4 items-start">
                  <div className="flex">
                    <p className="text-sm font-bold pt-1 w-40">Composition</p>
                    <span className="mr-5  font-semibold">:</span>
                  </div>
                  <div className="">
                    <p className="text-sm font-medium text-gray-700 pt-1">

                      {pharmaProductsList?.composition.charAt(0).toUpperCase() + pharmaProductsList?.composition.slice(1)}
                    </p>
                  </div>
                </div>
              }

              {pharmaProductsList?.medicineType &&
                <div className="flex mt-4 items-start">
                  <div className="flex">
                    <p className="text-sm font-bold pt-1  w-40">Medicine Type</p>
                    <span className="mr-5 font-semibold">:</span>
                  </div>
                  <div className="">
                    <p className="text-sm font-medium text-gray-700 pt-1">

                      {pharmaProductsList?.medicineType.charAt(0).toUpperCase() + pharmaProductsList?.medicineType.slice(1)}
                    </p>
                  </div>
                </div>
              }

              {pharmaProductsList?.drugForm &&
                <div className="flex mt-4 items-end">
                  <div className="flex">
                    <p className="text-sm font-bold pt-1 w-40">Drug Form</p>
                    <span className="mr-5 font-semibold">:</span>
                  </div>
                  <div className="">
                    <p className="text-sm font-medium text-gray-700 pt-1">

                      {pharmaProductsList?.drugForm.charAt(0).toUpperCase() + pharmaProductsList?.drugForm.slice(1)}
                    </p>
                  </div>
                </div>
              }
              {/* <div className="flex mt-1" >
              <p className="text-xs pt-1 w-28">Seller</p>
              <span className="text-brand-secondary">
                {medicine.hospitalName}
                {medicine.hospitalCity ? `,&nbsp;${medicine.hospitalCity}` : ""}
              </span>
            </div> */}

              {pharmaProductsList?.medicineTypeOfSell &&
                <div className="flex items-start mt-4">
                  <div className="flex">
                    <p className="text-sm font-bold pt-1 w-40"> Sell Type</p>
                    <span className="mr-5 font-semibold">:</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 pt-1">

                    {pharmaProductsList?.medicineTypeOfSell.charAt(0).toUpperCase() + pharmaProductsList?.medicineTypeOfSell.slice(1)}
                  </span>
                </div>
              }
            </div>
            <br />
            <div className="flex justify-center md:justify-start w-full bottom-0">
              <button
                onClick={(e) =>
                  //  pharmaProductsList?.drugsInfoPrescription === 1 && !!!fileName ?
                  // openModel() : present ? redirectTo(e, APP_ROUTES.MEDICINE_CART)
                  //   :
                  present ? redirectTo(e, APP_ROUTES.MEDICINE_CART) : addtoCart(e, pharmaProductsList)}
                className="border w-full  bg-secondary  text-base font-medium text-white rounded-md py-2 px-10 mr-2 disabled:opacity-50 " style={{ background: "#66B889", width: "245px", height: "45px" }} >
                {present ? 'Go To Cart' : 'Add to cart'}
                {isAdding && (
                  <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-start  mb-4 sm:mb-0 lg:mt-20 md:mt-16 sm:mt-12 flex-col sm:flex-row md:flex-row">
          {alternateMedicine?.length > 0 && (
            <div
              className="border mt-6 rounded-md w-full sm:w-2/6 md:w-2/6"
              style={{ height: "fit-content" }}
            >
              <div className="w-full mr-0 xl:mr-12">
                <div
                  style={{ background: "#005D8D" }}
                  className="py-2 rounded-t-md flex flex-col"
                >
                  <div className="font-semibold text-lg px-6 text-white">
                    Medicine from other Brands ({alternateMedicine?.length})
                  </div>
                  <div className="font-normal text-sm  px-6 text-white">
                    with similar composition
                  </div>
                </div>
                <div style={{ maxHeight: "450px", overflowY: "scroll" }}>
                  {alternateMedicine?.sort((a, b) => (a.medicineName > b.medicineName) ? 1 : ((b.medicineName > a.medicineName) ? -1 : 0)).map(
                    (product, i) => {
                      return (
                        <div key={i} className="mx-3 md:mx-6">
                          {" "}
                          <div
                            id={product.id}
                            onClick={(e) =>
                              handleAlternativeMedicineClick(e, product.id)
                            }
                            className="flex flex-row md:flex-col lg:flex-row justify-between items-center md:items-start lg:items-center gap-2 my-2 pb-2 cursor-pointer"
                          >
                            <div className="w-8/12 md:w-full lg:w-3/4">
                              <p className="font-semibold truncate">
                                {product?.medicineName}{" "}
                              </p>
                              <div className="font-normal text-xs text-gray-400 truncate">
                                {" "}
                                {product?.medicineTypeOfSell} |{" "}
                                {product?.manufacturer}{" "}
                              </div>
                            </div>
                            <div className="text-sm text-left lg:text-base font-semibold w-auto truncate">
                              ₹ {product?.medicineRate}{" "}
                            </div>
                          </div>
                          <hr />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          )}
          <>
            {pharmaProductsList?.length > 0 &&
              <div className="lg:ml-12 md:ml-8 sm:ml-4  pt-5 relative">

                <div className="lg:w-full mt-4 sm:mt-0 lg:pr-5 pr-8  sm:ml-4">
                  <nav className="flex flex-col sm:flex-row w-full justify-start">
                    <button className="text-left font-medium w-full font-normal  pb-2 lg:pr-8 block  focus:outline-none text-brand-secondary border-brand-primary border-b-2 font-medium">
                      Product Details
                    </button>
                  </nav>
                </div>

                <div className="w-full pt-5  md:ml-4 sm:ml-4 lg:mb-20">
                  <p className=" text-sm " style={{ color: "#000000a6" }}>
                    {pharmaProductsList?.drugsInfoAlcoholLabel?.length > 0 && (
                      <>
                        <h1 className="font-medium text-brand-secondary">
                          Alcohol Consumption:{" "}
                          {pharmaProductsList.drugsInfoAlcoholLabel == "SAFE" ? (
                            <label className="text-green-500">
                              {pharmaProductsList.drugsInfoAlcoholLabel}
                            </label>
                          ) : (
                            <label className="text-red-500">
                              {pharmaProductsList.drugsInfoAlcoholLabel}
                            </label>
                          )}
                        </h1>
                      </>
                    )}
                    {pharmaProductsList?.drugsInfoAlcoholInteraction?.length >
                      0 && (
                        <>
                          <p>{pharmaProductsList.drugsInfoAlcoholInteraction}</p>
                          <br />
                        </>
                      )}

                    {pharmaProductsList?.drugsInfoDosAndDont?.length > 0 && (
                      <>
                        <h1 className="font-medium text-brand-secondary">
                          Do's and Dont's
                        </h1>
                        <div
                          dangerouslySetInnerHTML={createMarkup(
                            pharmaProductsList?.drugsInfoDosAndDont
                          )}
                        />
                        <br />
                      </>
                    )}

                    {pharmaProductsList?.drugsInfoDrivingLabel?.length > 0 && (
                      <>
                        <h1 className="font-medium text-brand-secondary">
                          Driving:{" "}
                          {pharmaProductsList.drugsInfoDrivingLabel == "SAFE" ? (
                            <label className="text-green-500">
                              {pharmaProductsList.drugsInfoDrivingLabel}
                            </label>
                          ) : (
                            <label className="text-red-500">
                              {pharmaProductsList.drugsInfoDrivingLabel}
                            </label>
                          )}
                        </h1>
                        <div
                          dangerouslySetInnerHTML={createMarkup(
                            pharmaProductsList?.drugsInfoDrivingInteraction
                          )}
                        />
                        <br />
                      </>
                    )}
                    {pharmaProductsList?.drugsInfoLactationLabel?.length > 0 && (
                      <>
                        <h1 className="font-medium text-brand-secondary">
                          Lactation: {pharmaProductsList.drugsInfoLactationLabel}
                        </h1>
                        <div
                          dangerouslySetInnerHTML={createMarkup(
                            pharmaProductsList?.drugsInfoLactationInteraction
                          )}
                        />
                        <br />
                      </>
                    )}
                    {pharmaProductsList?.drugsInfoLiverLabel?.length > 0 && (
                      <>
                        <h1 className="font-medium text-brand-secondary">
                          Liver Health:{" "}
                          {pharmaProductsList.drugsInfoLiverLabel == "CAUTION" ? (
                            <label className="text-red-500">
                              {pharmaProductsList.drugsInfoLiverLabel}
                            </label>
                          ) : (
                            <label className="text-green-500">
                              {pharmaProductsList.drugsInfoLiverLabel}
                            </label>
                          )}
                        </h1>
                        <div
                          dangerouslySetInnerHTML={createMarkup(
                            pharmaProductsList?.drugsInfoLiverInteraction
                          )}
                        />
                        <br />
                      </>
                    )}
                    {pharmaProductsList?.drugsInfoRenalLabel?.length > 0 && (
                      <>
                        <h1 className="font-medium text-brand-secondary">
                          Kidney Health:{" "}
                          {pharmaProductsList.drugsInfoRenalLabel == "CAUTION" ? (
                            <label className="text-red-500">
                              {pharmaProductsList.drugsInfoRenalLabel}
                            </label>
                          ) : (
                            <label className="text-green-500">
                              {pharmaProductsList.drugsInfoRenalLabel}
                            </label>
                          )}
                        </h1>
                        <div
                          dangerouslySetInnerHTML={createMarkup(
                            pharmaProductsList?.drugsInfoRenalInteraction
                          )}
                        />
                        <br />
                      </>
                    )}
                    {pharmaProductsList?.drugsInfoPregnancyLabel?.length > 0 && (
                      <>
                        <h1 className="font-medium text-brand-secondary">
                          During Pregnancy:{" "}
                          {pharmaProductsList.drugsInfoPregnancyLabel}
                        </h1>
                        <div
                          dangerouslySetInnerHTML={createMarkup(
                            pharmaProductsList?.drugsInfoPregnancyInteraction
                          )}
                        />
                        <br />
                      </>
                    )}

                    {pharmaProductsList?.content?.length > 0 && (
                      <>
                        <h1 className="font-medium text-brand-secondary mb-2">
                          Salt Composition
                        </h1>
                        <p
                          dangerouslySetInnerHTML={createMarkup(
                            pharmaProductsList?.content
                          )}
                        />
                        <br />
                      </>
                    )}

                    {pharmaProductsList?.drugsInfoSideEffects?.length > 0 && (
                      <>
                        <h1 className="font-medium text-brand-secondary mb-2">
                          Side Effects
                        </h1>
                        <p
                          dangerouslySetInnerHTML={createMarkup(
                            pharmaProductsList?.drugsInfoSideEffects
                          )}
                        />
                        <br />
                      </>
                    )}

                    {pharmaProductsList?.drugsInfoDirection?.length > 0 && (
                      <>
                        <h1 className="font-medium text-brand-secondary mb-2">
                          How to use
                        </h1>
                        <p
                          dangerouslySetInnerHTML={createMarkup(
                            pharmaProductsList?.drugsInfoDirection
                          )}
                        />
                        <br />
                      </>
                    )}

                    {pharmaProductsList?.drugInfoHowsToWork?.length > 0 && (
                      <>
                        <h1 className="font-medium text-brand-secondary mb-2">
                          How {pharmaProductsList?.medicineName} works
                        </h1>
                        <p
                          dangerouslySetInnerHTML={createMarkup(
                            pharmaProductsList?.drugInfoHowsToWork
                          )}
                        />
                        <br />
                      </>
                    )}

                    <img src={line47} alt="line47" />
                    {(pharmaProductsList?.drugsInfoChemicalClass?.length > 0 ||
                      pharmaProductsList?.drugsInfoHabitforming?.length > 0 ||
                      pharmaProductsList?.drugsInfoTherapeuticClass ||
                      pharmaProductsList?.drugsInfoFoodInteraction?.length > 0) && (
                        <>
                          <h1 className="font-medium text-brand-secondary">
                            Other information
                          </h1>
                          <br />
                        </>
                      )}
                    {pharmaProductsList?.drugsInfoFoodInteraction?.length > 0 && (
                      <>
                        <h2 className="text-brand-secondary">Food Consumption</h2>
                        <p>{pharmaProductsList.drugsInfoFoodInteraction}</p>
                      </>
                    )}
                    {pharmaProductsList?.drugsInfoChemicalClass?.length > 0 && (
                      <>
                        <h2 className="text-brand-secondary">Chemical Class</h2>
                        <p>{pharmaProductsList.drugsInfoChemicalClass}</p>
                      </>
                    )}
                    {pharmaProductsList?.drugsInfoHabitforming?.length > 0 && (
                      <>
                        <h2 className="text-brand-secondary">Habitforming</h2>
                        {pharmaProductsList.drugsInfoHabitforming}
                      </>
                    )}
                    {pharmaProductsList?.drugsInfoTherapeuticClass?.length > 0 && (
                      <>
                        <h2 className="text-brand-secondary">Therapeutic Class</h2>
                        {pharmaProductsList.drugsInfoTherapeuticClass}
                      </>
                    )}
                  </p>
                </div>
              </div>
            }
          </>
        </div>
        {/* <SimilarProducts /> */}
        {showModel && (
          <div className="justify-center mb-4 items-center bg-gray-600   opacity-90  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="m-4 p-4 rounded-lg bg-white ">
              Please Upload piscription First
              <Upload_pres
                documentType={"Prescription"}
                title={"Quick Order with E-Prescription"}
                subTitle={
                  "Upload e-prescription & tell us what you need. We do the rest"
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MedicineProductWeb;
