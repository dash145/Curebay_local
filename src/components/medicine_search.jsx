import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useLocation, useHistory } from "react-router-dom";
import http from "../Redux/services/http-common";
import { AddImgUrl } from "../config/constant";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  AddtoCart,
  getCartDetails,
} from "../Redux/Actions/cartPlaceOrderAction";
import moment from "moment";

import Vectorpres from "../Assets/Images/Vector-pres.png"

import defaultMed from "../Assets/Images/Medicines.jpg";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";

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
import { Autocomplete, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';




const MedicineSearch = () => {
  const location = useLocation();
  const history = useHistory();
  const search = useLocation().search;
  const res = search.split("?search_query=");
  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.cartReducer);
  const userData = useSelector((state) => state.authReducer.patientData);

  const fileName = useSelector((state) => state.uploadedPrescription.fileName);

  const [screen, setscreen] = useState(window.innerWidth);

  const medicineName = res[1];
  const [filterData, setFilterData] = useState([]);
  const [medicineData, setMedicineData] = useState("");
  const [isAdding, setIsAdding] = useState(-1);
  const { name, storeId, locationId, isPOS, ePrescription } = {};
  const [isAutoCompleteFocused, setAutoCompleteFocused] = useState(false);
  const [open, setOpen] = useState(false);

  const searchMedicines = async () => {
    const data = await http.get(
      `${process.env.REACT_APP_ELASTIC_BASEURL}medicine?freeTextSearch=${medicineName}&pageNo=1&pageSize=3000`
    );
    console.log(data, "jkbdbvwovjie");
    setMedicineData(data.data);
  };

  const [textSearch, setSearchText] = useState("");

  const redirectTo = (data) => {
    if (userData?.id) {
      
      history.push({ pathname: APP_ROUTES.UPLOADED_PRESCRIPTION, state: data });
    }
    else {
      history.push({ pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } });
    }
  };

  useEffect(() => {
    searchMedicines();
  }, [medicineName]);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;

      setscreen(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  const resolvePharamcyImageq = (Image) => {
    let PharamncyImage;
    if (!Image) {
      return "";
    }
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

  function getProductsIDs() {
    let ids = [];
    if (cartList) {
      if (cartList.patientMedicineOrder) {
        for (const product of cartList.patientMedicineOrder) {
          if (product && product.patientMedicineOrderDetailsList) {
            for (const drug of product.patientMedicineOrderDetailsList) {
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

  const addtoCart = (e, data, index, quantity = 1) => {
    if (!userData.code) {
      redirectTo(e, {
        pathname: APP_ROUTES.LOGIN,
        state: { background: location, login: true },
      });
    }
    e.preventDefault();
    setIsAdding(index);
    console.log("medicineData", JSON.stringify(medicineData));
    console.log(ePrescription, data, "afjkaskjvwekvesvew");
    let prescriptionRequired = "N";
    let ePrescriptionRequired = "N";

    if (data?.prescriptionRequired == "No") {
      prescriptionRequired = "N";
      // ePrescriptionRequired = "N";
    } else if (data?.prescriptionRequired == "Yes") {
      prescriptionRequired = "Y";
      // ePrescriptionRequired = "Y";
    }
    let calculatedAmount = data?.drugsInfoDiscountedRate
      ? data?.drugsInfoDiscountedRate
      : data.medicineRate;
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
          discountAmount: 0.00,
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
                discountAmount: 0.00,
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
    console.log(dataObj, "dsihdspisdhpids");
    dispatch(AddtoCart(dataObj)).then(() => setIsAdding(-1));
  };

  const redirectToMedicine = (event, id) => {
    event.preventDefault();
    history.push({
      pathname: APP_ROUTES.MEDICINE_PRODUCT,
      search: `?code=${id}`,
    });
  };

  const redirectToMedicineAllProduct = (event, name) => {
    //  setSearchText("")
    event.preventDefault();
    history.push({
      pathname: APP_ROUTES.MEDICINE_ALL_PRODUCTS,
      search: `?search_query=${textSearch}`,
    });
  };

  const onClickAtSearch = () => {
    if (textSearch.length == 0) {
      return;
    }
    history.push({
      pathname: APP_ROUTES.MEDICINE_ALL_PRODUCTS,
      search: `?search_query=${textSearch}`,
    });
  };

  console.log(filterData, "spodvfouvosu");
  const getMedicineSearchFilter = async (medicineName) => {
    console.log(medicineName, 1, "sdfouuvoeuwhpew");
    const data = await http.get(
      `${process.env.REACT_APP_ELASTIC_BASEURL}medicine?freeTextSearch=${medicineName}&pageNo=1&pageSize=20`
    );
    console.log(data, "jkbdbvwovjie");
    setFilterData(data.data);
    // debugger;
  };

  const medicineFunctiondebounce = (...args) => {
    console.log(args, "spihvsihepihs");
    // setFilterData(medicineName)
    // setValue(medicineName)
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        getMedicineSearchFilter.apply(this, [...args]);
      }, 300);
    };
  };

  const betterFunction = medicineFunctiondebounce();

  const handleMedicineSelect = (name, e) => {
    if (e.target.value != undefined) {
      setSearchText(e.target.value);
    }
    if (e.key == "Enter" && e.type == "keyup") {
      redirectToMedicineAllProduct(e, name);
    } else if (e.type !== "keyup") {
      redirectToMedicine(e, name.id);
    }
    console.log(name, e, "dsfidsosdvoidsfh");
  };

  const addThreeDots = (text) => {
    if (text.length > 20) {
      return `${text.substring(0, 20)}...`
    }
    return text
  }


  const goToPrescription = () => {
    redirectTo();
  }

  console.log(medicineData, "medicineDataihdvoihwub");

  return (
    <>

      <div className="flex justify-center relative top-0 sm:-top-9 md:-top-9 lg:-top-9">
        <div className="w-full lg:w-3/4 h-auto p-2 mt-2 sm:mt-0 border border-gray-100  rounded-xl flex justify-center flex-col leading-normal shadow-lg h-16 px-2 backdrop-opacity-50 relative" style={{ background: "#EAF8FF " }}>
          {!fileName && <div className="md:flex-row sm:flex-row flex flex-col lg:flex-row xl:flex-row gap-3 lg:gap-0 xl:gap-3 justify-center items-center md:justify-around lg:justify-between">
            <div className="flex items-center justify-around sm:justify-start md:justify-between w-full">
              <div className="block">
                {/* <img src={shape} alt="shape" className="absolute -ml-2" style={{ height:"-webkit-fill-available", bottom:"2px",
                background:"linear-gradient(89.87deg, #EAF8FF 6.09%, rgba(234, 248, 255, 0) 24.25%)"
                }} /> */}
                <div className="bg-brand-lightgreen rounded-full z-1 h-8 sm:h-12 md:h-12 lg:h-12 w-8 sm:w-12 md:w-12 lg:w-12 flex justify-center items-center">
                  <img src={Vectorpres} alt="prescription" className="h-4 sm:h-6 md:h-6 lg:h-6  " style={{ zindex: 1 }} />
                </div>
              </div>
              <div className="mb-1 ml-0 mr-10 sm:mr-0 md:mr-10 lg:mr-0 sm:ml-10 md:ml-0 lg:ml-0">
                <div className="pl-1 lg:pl-3 items-center text-center" >
                  <p className="block text-sm sm:text-lg md:text-lg lg:text-lg font-medium lg:text-gray-900">Quick Order with E-Prescription</p>

                  {screen > 640 ?
                    <p className=" block text-gray-700 font-normal text-sm lg:text-base  lg:mt-1 lg: " >Upload e-prescription & tell us what you need. We will do the rest.</p>
                    : <></>
                  }
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center xl:justify-end ml-2 lg:w-1/2">
              <label className="bg-brand-secondary cursor-pointer text-white lg:text-base text-sm lg:font-medium font-medium py-2 w-48 lg:w-auto pl-3 lg:pl-3 lg:px-4 rounded-lg">Order with E-Prescription
                <button onClick={goToPrescription} className="hidden" />
              </label>
            </div>

          </div>}
          {fileName && <p>Uploaded E-Prescription File:{fileName}</p>}
        </div>
      </div>

      {/* <div className="flex justify-center autocomplete py-8 scrolleffect">
        <div className="relative w-11/12 md:w-2/5 mt-2 md:mt-10 md:mt-36">
          <Autocomplete
            // disablePortal
            //freeSolo
            id="google-map-demo"
            forcePopupIcon={false}
            filterOptions={(x) => x}
            options={filterData}
            disableClearable
            //onC

            autoComplete
            includeInputInList

            onFocus={() => setAutoCompleteFocused(true)}
            onBlur={() => setAutoCompleteFocused(false)}
            noOptionsText=""
            getOptionLabel={(option) => (option ? option.medicineName : "")}
            renderOption={(props, option, selected) =>
              selected && (
                <li
                  id={option.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    justifyItems: "center",
                  }}
                  {...props}
                  onClick={(e) => handleMedicineSelect(option, e)}
                >
                  <div>
                    <div className="font-medium text-sm">
                      {option.medicineName}
                    </div>
                    <div className="text-xs font-extrabold">
                      {option.medicineTypeOfSell}
                    </div>
                  </div>
                  <div className="font-medium text-sm items-center">
                    ₹ {option.medicineRate}
                  </div>
                </li>
              )
            }
            // value={value}
            onKeyUp={(e, newValue) => betterFunction(e.target.value)}
            sx={{ width: 300 }}
            // onBlur = {() => setAutoCompleteFocused(true)}
            // onClose ={(e) => }
            // onHighlightChange = {(e) => console.log(e , "sdihvivhsdispdivispd")}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  // type: 'search',
                }}
                label={"Search Medicines here..."}
                onKeyUp={(e) => handleMedicineSelect(e.target.value, e)}
              />
            )}
          />
          <div
            onClick={() => onClickAtSearch()}
            className="absolute right-3 top-5"
          >
            <SearchIcon />
          </div>
        </div>
      </div> */}
      <div style={{ minHeight: "700px" }} className="w-11/12 md:w-full m-auto lg:mt-7">
        {/* <InfiniteScroll
              pageStart={pageStart}
              loadMore={(e) => loadFunc(e)}
              hasMore={hasMore}
              className="w-full"
              loader={
                <div className="flex flex-wrap justify-center pl-10 pr-10 pb-10">
                  <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
                </div>
              }
            > */}
        <div className="mt-8 lg:mt-0 px-0 md:pl-10 md:pt-8 lg:pt-0 md:pr-10 pb-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-20 bg-white-100  hover:bg-slate-600">
          {medicineData?.length > 0 &&
            medicineData.map((product, index) => (
              <>
                <div
                  key={index}
                  style={{ maxHeight: "350px" }}
                  className="mb-5 sm:mb-5 md:mb-5 lg:mb-0 -mt-2 lg:mt-5 py-1 lg:py-0 md:p-2 px-4 bg-white rounded-lg duration-300 relative  border border-gray-200  lg:w-56"
                >
                  <div className="mx-1 lg:mx-0 lg:px-1">
                    <div className="flex flex-col ">
                      <div className="flex flex-col  items-start gap-2 justify-center mr-6 md:mr-0 lg:mt-3 mb-2 lg:mb-3">
                        <div className="border-2 rounded-full w-12 h-12 items-center left-40 sm:left-64 md:left-44 lg:left-20 bg-white absolute -top-6">
                          <img
                            onClick={(e) => redirectToMedicine(e, product.id)}
                            src={
                              product?.medicineImage
                                ? AddImgUrl(product?.medicineImage)
                                : resolvePharamcyImageq(
                                  product.medicineTypeOfSell
                                )
                            }

                            className={`${product?.medicineImage
                              ? "cursor-pointer h-7 m-auto absolute top-1.5 left-2"
                              : "cursor-pointer h-7 m-auto absolute top-1.5 left-2"
                              }`}
                            alt="medicine"
                          />
                        </div>

                        {/* <div
                          onClick={(e) => redirectToMedicine(e, product.id)}
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                          }}
                          className="cursor-pointer h-auto text-sm font-medium pt-0 text-gray-700 mt-2"
                        >
                          {addThreeDots(product?.medicineName)}
                        </div> */}

                      </div>
                      <div className="lg:mx-0 lg:mt-2">

                        <div
                          onClick={(e) => redirectToMedicine(e, product.id)}
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                          }}
                          className="cursor-pointer h-auto text-sm font-semibold pt-0 text-gray-700 mt-2"
                        >
                          {addThreeDots(product?.medicineName)}
                        </div>

                        <div
                          onClick={(e) => redirectToMedicine(e, product.id)}
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                          }}
                          className="cursor-pointer h-auto text-sm font-semibold pt-0 text-gray-700 mt-0"
                        >
                          <span>Mfg</span>{addThreeDots(product?.manufacturer)}
                        </div>
                        {/* <div
                          onClick={(e) => redirectToMedicine(e, product.id)}
                          style={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                          }}
                          className="cursor-pointer h-auto text-sm font-medium pt-0 text-gray-700 mt-2"
                        >

                          <span style={{ visibility: product?.packagingType ? "visible" : "hidden" }}>Pkg type- </span> {product?.packagingType}
                        </div> */}


                        <div className="flex items-center mt-5 justify-between">
                          <div className="flex flex-col">
                            <p
                              onClick={(e) => redirectToMedicine(e, product.id)}
                              className="cursor-pointer text-brand-gunsmoke font-medium text-xs mt-0 lg:mt-1"
                              style={{
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                                overflow: "hidden",
                              }}
                            >
                              {addThreeDots(product.medicineTypeOfSell)}
                            </p>
                            {/* <div className="mt-1  font-medium lg:font-semibold flex md:block">
                              {product.drugsInfoDiscountedRate ? (
                                <>
                                  {" "}

                                  <span className="text-gray-500 line-through text-xs ">
                                    ₹{product.medicineRate}
                                  </span>{" "}
                                </>
                              ) : (
                                ""
                              )}
                              {product?.drugsInfoDiscountPercentage ? (
                                <span className="text-xs text-green-500">
                                  ( {product.drugsInfoDiscountPercentage}% Off )
                                </span>
                              ) : (
                                ""
                              )}

                            </div> */}
                            <div className="flex mb-2">
                              <div className=" text-lg lg:text-sm font-medium text-brand-lightgreen lg:font-semibold lg:w-32 lg:mt-0 lg:mb-2">
                                ₹{" "}
                                {product.drugsInfoDiscountedRate
                                  ? product.drugsInfoDiscountedRate
                                  : product.medicineRate}
                              </div>


                            </div>
                          </div>

                          <button
                            onClick={(e) => {
                              addtoCart(e, product, index);
                            }}
                            disabled={
                              isAdding !== -1 ||
                              drugIDsInCart.indexOf(product.id) !== -1
                            }

                            className={`${drugIDsInCart.indexOf(product.id) !== -1
                              ? "text-red-500 font-medium text-xs py-1 cursor-not-allowed lg:m-auto border-2 border-gray pb-1 rounded-sm px-2 h-8"
                              : "hover:scale-150 cursor-pointer py-2  text-xs font-normal bg-brand-lightgreen text-white mb-3 rounded-sm px-2 h-8"
                              }`}


                          >
                            {drugIDsInCart.indexOf(product.id.toString()) === -1
                              ? "+ Add"
                              : "Added"}{" "}
                            {index === isAdding && (
                              <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-300 h-1 w-5"></div>
                            )}
                          </button>

                        </div>


                      </div>
                    </div>
                  </div>
                </div>

              </>
            ))}
        </div>
        {/* </InfiniteScroll> */}
        {(!medicineData || medicineData.length === 0) && (
          <div className="flex  justify-center text-gray-400">
            <h2> No Matching Product Available</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default MedicineSearch;
