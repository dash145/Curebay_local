import diagno from "../Assets/Images/Prescriptionicon.svg";
import { useLocation, useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { setLoginModal } from "../Redux/Actions/userActions";
import { XIcon } from "@heroicons/react/outline";
import { AddImgUrl } from "../config/constant";
import defaultMed from "../Assets/Images/Medicines.jpg";

import { Suspense, useEffect, useState } from "react";
import { getBrandFilter } from "../Redux/Actions/pharmacyAction";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import { getMembershipList } from "../Redux/Actions/packages";
import {
  AddtoCart,
  getCartDetails,
} from "../Redux/Actions/cartPlaceOrderAction";
import moment from "moment";
import Upload_pres from "./Upload_pres";
import { InputText } from "primereact/inputtext";

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
import InfiniteScroll from "react-infinite-scroller";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import { Divider } from "primereact/divider";
import { Carousel } from "primereact/carousel";
import Lady from "../Assets/Images/08.png";
import shape from "../Assets/Images/shape.png";
import Vectorpres from "../Assets/Images/Vector-pres.png"
import PackageService from "../Redux/services/packagesService";
import http from "../Redux/services/http-common";
import { SHA512 } from "crypto-js";
import { ToastContainer, toast } from "react-toastify";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Autocomplete, TextField, InputAdornment, IconButton } from "@mui/material";
import prescription from "../Assets/Images/pre.svg";
import Image1 from "../Assets/Images/medicinePageImage1.png"
import Image2 from "../Assets/Images/medicinePageImage2.png"
import Image3 from "../Assets/Images/medicinePageImage3.png"
// import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import Membership from "./membership";
const resolvePharamcyImageq = (Image) => {
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

function PharmaProducts() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [textSearch, setSearchText] = useState("");
  const { name, storeId, locationId, isPOS, ePrescription } = {};

  const [isAdding, setIsAdding] = useState(-1);

  const [screen, setscreen] = useState(window.innerWidth);

  const redirectToMedicine = (event, data) => {
    event.preventDefault();
    history.push({
      pathname: APP_ROUTES.MEDICINE_PRODUCT,
      search: `?code=${data.medicineCode}`,
    });
  };

  const redirectToMedicineProduct = (event, id) => {
    event.preventDefault();
    history.push({
      pathname: APP_ROUTES.MEDICINE_PRODUCT,
      search: `?code=${id}`,
    });
  }

  const redirectToMedicineAllProduct = (event, name) => {
    event.preventDefault();
    history.push({
      pathname: APP_ROUTES.MEDICINE_ALL_PRODUCTS,
      search: `?search_query=${textSearch}`,
    });
  }

  const onClickAtSearch = () => {
    if (textSearch.length == 0) {
      return
    }
    history.push({
      pathname: APP_ROUTES.MEDICINE_ALL_PRODUCTS,
      search: `?search_query=${textSearch}`,
    });

  }

  const brandList = useSelector((state) => state.particularPharmacy.brandInfo);

  const userData = useSelector((state) => state.authReducer.patientData);
  const membershipData = useSelector((state) => state.packageReducer);
  const { promotionList, membershipList } = membershipData;

  const { cartList } = useSelector((state) => state.cartReducer);
  const fileName = useSelector((state) => state.uploadedPrescription.fileName);
  const [showModel, setShowModel] = useState(false);
  const [productByElasticSearch, setProductByElasticSearch] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageStart, setPageStart] = useState(1);
  const [brandFilterSearch, setBrandFilterSearch] = useState("");
  const [filterDialog, setFilterDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState("");
  const [conData, setconData] = useState();
  const [labData, setlabData] = useState();
  const [actualAmount, setActualAmount] = useState(0);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [tId, settId] = useState(moment.now().toString());
  const [paymentDone, setPaymentDone] = useState(false);
  const [filterData, setFilterData] = useState([])
  const [selectedMedicineFromSearch, setselectedMedicineFromSearch] = useState("")
  const [isAutoCompleteFocused, setAutoCompleteFocused] = useState(false)
  const addtoCart = (e, data, index, quantity = 1) => {
    if (!userData.code) {
      redirectTo(e, { pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } })
    }
    e.preventDefault();
    setIsAdding(index);
    console.log("index", index);
    console.log(ePrescription, data, "afjkaskjvwekvesvew");
    let prescriptionRequired = "N";
    let ePrescriptionRequired = "N";

    if (data.medicinePrescriptionRequired == "N") {
      prescriptionRequired = "N";
      // ePrescriptionRequired = "N";
    } else if (data.medicinePrescriptionRequired == "Y") {
      prescriptionRequired = "Y";
      // ePrescriptionRequired = "Y";
    }

    const totalAmount = data.medicineRate * quantity;
    // data.discountPrice !== 0
    //   ? (data.unitPrice - data.discountPrice) * quantity
    //   :
    console.log("totalAmount", totalAmount);
    let dataObj = {};

    let isAdded = false;

    if (cartList && cartList.patientMedicineOrder) {
      cartList.patientMedicineOrder.forEach(element => {
        element.patientMedicineOrderDetailsList.push({
          drugCode: data.medicineCode,
          drugName: data.medicineName,
          unitPrice: data.medicineRate,
          discountAmount: data.discountedPrice,
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
        labOrdersYN: false,
        drugsOrdersYN: true,
        // totalAmount: totalAmount,
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
                drugCode: data.medicineCode,
                drugName: data.medicineName,
                unitPrice: data.medicineRate,
                discountAmount: data.discountedPrice,
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

  var bg_blue = {
    "Blue": "#C0E3F4",
  }

  // const redirectTo = (event, location) => {
  //   event.preventDefault();
  //   history.push(location)
  // }

  const isLoading = useSelector((state) => state.particularPharmacy.isLoading);

  useEffect(() => {
    dispatch(getBrandFilter());
    dispatch(getMembershipList());
  }, [dispatch, locationId, storeId]);

  useEffect(() => {
    if (
      localStorage.getItem("paymentStatus") &&
      localStorage.getItem("trancationid")
    ) {
      localStorage.removeItem("paymentStatus");
      redirectAfterTxn(localStorage.getItem("trancationid"));
    } else if (
      localStorage.getItem("paymentStatus") === "failure" &&
      localStorage.getItem("paymentRemarks")
    ) {
      toast(localStorage.getItem("paymentRemarks"));
      localStorage.removeItem("trancationid")
      localStorage.removeItem("paymentStatus")
      localStorage.removeItem("totalAmount")
    }
  }, [])

  useEffect(() => {
    dispatch(getCartDetails(userData.code));
  }, [dispatch, userData]);


  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;

      setscreen(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);


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
  const openModel = () => {
    setShowModel(true);
  };

  const onSearch = (data) => {
    let textTemp = text && text.trim();
    setProductByElasticSearch([]);
    if (data) {
      axios
        .get(
          `${process.env.REACT_APP_ELASTIC_BASEURL}medicine?freeTextSearch=${textTemp}&pageNo=1&pageSize=20`
        )
        .then((response) => {
          console.log(response, "dspwejiepivewnpie");
          if (response.data.length == 0) {
            setHasMore(false);
          } else {
            setProductByElasticSearch(response.data);
            setPageStart(2);
            setHasMore(true);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setPageStart(1);
      setHasMore(true);
    }
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(text);
    }
  };

  const loadFunc = (pageNumber) => {
    console.log(pageNumber, "dsvewbouvbewouevw", pageStart);
    if (text) {
      axios
        .get(
          `${process.env.REACT_APP_ELASTIC_BASEURL}medicine/search?freeTextSearch=${text}&pageNo=${pageStart}&pageSize=20`
        )
        .then((response) => {
          console.log(response, "dspwejiepivewnpie");
          if (response.data.length == 0) {
            setHasMore(false);
          } else {
            if (productByElasticSearch.length) {
              setProductByElasticSearch(
                productByElasticSearch.concat(response.data)
              );
            } else {
              setProductByElasticSearch(response.data);
            }
            setPageStart(pageStart + 1);
            setHasMore(true);
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(
          `${process.env.REACT_APP_ELASTIC_BASEURL}medicine/search?pageNo=${pageStart}&pageSize=20`
        )
        .then((response) => {
          console.log(response, "dspwejiepivewnpie");
          if (response.data.length == 0) {
            setHasMore(false);
          } else {
            if (productByElasticSearch.length) {
              setProductByElasticSearch(
                productByElasticSearch.concat(response.data)
              );
            } else {
              setProductByElasticSearch(response.data);
            }
            setPageStart(pageStart + 1);
            setHasMore(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const checkFilter = (e) => {
    if (e.target.value == text) {
      if (e.target.name == "Brand") {
        setText("");
        onSearch("");
      }
    } else {
      if (e.target.name == "Brand") {
        setText(e.target.value);
        onSearch(e.target.value);
      }
    }
    setFilterDialog(false);
  };

  const handleFilterDialog = () => {
    setFilterDialog(true);
  };

  const handlePackageClick = (data) => {
    if (userData?.id) {
      // (e) => redirectTo(e, APP_ROUTES.UPLOADED_PRESCRIPTION)
      PackageService.getPackageInfo(data).then((res) => {
        console.log(res, "resofPakcage");
        let discountedAmount = 0;
        let actualAmount = 0;
        res.data.forEach((res) => (discountedAmount += res.discountAmount));
        res.data.forEach((res) => (actualAmount += res.actualAmount));
        let data = res.data.filter((res) => res.groupCode == "C");
        let data1 = res.data.filter((res) => res.groupCode == "D");
        setconData(data);
        setlabData(data1);
        setOpenDialog(true);
        setActualAmount(actualAmount);
        setDiscountedAmount(discountedAmount);
      });
    }
    else {
      history.push({ pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } });
    }
  };



  const orderPlaced = () => {
    return (
      <>
        <div style={{ fontSize: "34px" }} className="text-center font-medium">
          Order Placed
        </div>
      </>
    );
  };

  const redirectAfterTxn = async (txnid) => {
    // try {
    localStorage.removeItem("trancationid")
    localStorage.removeItem("paymentStatus")
    localStorage.removeItem("totalAmount")
    localStorage.removeItem("redirectUrl")
    setOpenDialog(true)
    setPaymentDone(true);

    //   history.push(APP_ROUTES.MEDICINE_ORDERPLACE);
    // } catch (err) {
    //   console.error(err);
    // } finally {
    //   setTimeout(() => {
    // 	setIsLoading(false);
    //   }, 1000);
    // }
  };

  //#region Payment Process Start

  const DoPayment = () => {
    const amount = discountedAmount;
    localStorage.setItem('redirectUrl', APP_ROUTES.PHARMACY_CATEGOTY);
    let firstName = userData.firstName.split(/\s/).join('');
    localStorage.setItem('totalAmount', JSON.stringify(amount))
    const url = process.env.REACT_APP_PAYU_BASEURL + `patientId=${userData.code}&amount=${amount}&firstname=${firstName}&email=${userData.email}&phone=${userData.mobile}&productinfo=medicinePackage&udf1=Patient&service_provider=payu_paisa`;
    window.location.replace(url);
  };


  console.log(cartList, "sdiohseviosdhjvi")

  const packageTemplate = (product) => {
    //  console.log(product,"xyz");
    return (
      <div
        key={product.code}
        className=" grow w-auto lg:flex-shrink-0 lg:w-full"
      >
        <div
          className={`${product.id % 2 === 0
            ? "bg-brand-frenchpass"
            : "bg-brand-lightyellow"
            } card h p-4  rounded-2xl mr-2 `}
        >
          <div className="flex w-auto justify-between md:flex">
            <div className="flex items-center">
              <img
                className="lg:h-36 h-28 max-w-none"
                src={product.photoName ? process.env.REACT_APP_IMG_BASEURL + product.photoName : Lady}
                alt=""
              />
            </div>
            <div className="flex flex-col  pr-3 lg:pr-8">
              <p className="lg:  lg:font-medium font-thin text-base lg:text-2xl text-center lg:text-right ml-1 text-brand-primary ">
                <b>
                  {product.name} starting at ₹{product?.amount}
                </b>
              </p>
              <div className="flex content-end justify-around lg:justify-end">
                <button
                  onClick={() => handlePackageClick(product.code)}
                  type="button"
                  className="mt-2 lg:mt-5 bg-brand-secondary lg: text-xs lg:text-md lg:font-medium font-thin  text-white px-2 py-2 ml-3 lg:p-3 rounded-xl"
                  style={{ backgroundColor: "#005D8D" }}
                >
                  <b style={{ Color: "white" }}>Get Membership</b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const previousOrderTemplate = (product, index) => {
    return (
      <div
        key={product.key}
        className="-mt-2 mr-8 lg:mt-5 py-2 w- lg:py-0 md:p-5 bg-white rounded-lg duration-300 relative shadow-md border border-gray-200 md:shadow-md min-h-[300px]"
      >
        {
          // Show Prescription Required Icon
          product.medicinePrescriptionRequired === "Y" && (
            <img src={diagno} alt="prescription" className="float-right" />
          )
        }
        <div className="flex md:block ">
          <div className="flex flex-wrap items-center md:items-start justify-center mr-6 md:mr-0 lg:mt-5 pl-2 lg:pl-0">
            <img
              src={
                product?.uploadFileName
                  ? AddImgUrl(product?.uploadFileName)
                  : resolvePharamcyImageq(product.medicineTypeOfSell)
              }
              className="w-14 h-20 lg:h-16 md:w-12 md:h-16"
              alt="lab0"
            />
          </div>
          <div className="mx-1 lg:mx-0">
            <div
              onClick={(e) => redirectToMedicine(e, product)}
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
              className="cursor-pointer text-sm font-medium pt-0 lg:pt-3 text-gray-700 my-4"
            >
              {product.medicineName}
            </div>
            <p
              className="text-brand-gunsmoke font-medium lg:font-semibold text-sm mt-0 lg:mt-1"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {product.medicineTypeOfSell}
            </p>
            <div className="mt-1 mb-10 font-medium lg:font-semibold flex md:block">
              <span className="text-grat-500 text-xs">MRP:</span>
              <span className="text-gray-500 line-through text-xs pl-2">
                {product.medicineRate}
              </span>
              <br />
              <span className="text-xs text-green-500">
                {calcDiscount(product.medicineRate, product.discountedPrice)}
              </span>
            </div>
            <div className="flex justify-between items-center text-gray-800 lg:text-md mt-1 absolute bottom-1 w-9/12">
              <div className=" text-lg lg:text-sm font-medium lg:font-semibold lg:w-32 lg:mt-4">
                ₹{" "}
                {Math.abs(
                  product.medicineRate - product.discountedPrice
                ).toFixed(1)}
              </div>

              <button
                onClick={(e) => {
                  addtoCart(e, product, index);
                }}
                disabled={
                  isAdding !== -1 ||
                  drugIDsInCart.indexOf(product.medicineCode) !== -1
                }
                className="hover:scale-150  text-sm font-medium text-brand-secondary  rounded-md py-2 px-3 mr-4 lg:mr-0 disabled:opacity-50 border border-width-2 border-[#005D8D] md:border-none lg:w-40"
              >
                {drugIDsInCart.indexOf(product.medicineCode.toString()) === -1
                  ? "Add to cart"
                  : "ADDED"}{" "}
                {index === isAdding && (
                  <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-300 h-5 w-5"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getMedicineSearchFilter = async (medicineName) => {
    console.log(medicineName, 1, "sdfouuvoeuwhpew")
    const data = await http.get(`${process.env.REACT_APP_ELASTIC_BASEURL}medicine?freeTextSearch=${medicineName}&pageNo=1&pageSize=20`);
    console.log(data, "jkbdbvwovjie")
    setFilterData(data.data)
    // debugger;
  }

  const medicineFunctiondebounce = (...args) => {
    console.log(args, "spihvsihepihs")
    // setFilterData(medicineName)
    // setValue(medicineName)
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        getMedicineSearchFilter.apply(this, args)
      }, 300)
    }

  }

  const betterFunction = medicineFunctiondebounce()

  const handleMedicineSelect = (name, e, selected) => {
    console.log(e.type, 'sdcsdihvsd')

    if (e.target.value != undefined) {
      setSearchText(e.target.value)
    }



    if (e.key == "Enter" && e.type == "keyup") {
      redirectToMedicineAllProduct(e, name)
      // alert('dj')
    } else if (e.type !== "keyup") {
      redirectToMedicineProduct(e, name.id)
    }
    console.log(name, e, "dsfidsosdvoidsfh")

  }

  const redirectTo = (data) => {
    if (userData?.id) {
      // (e) => redirectTo(e, APP_ROUTES.UPLOADED_PRESCRIPTION)
      history.push({ pathname: APP_ROUTES.UPLOADED_PRESCRIPTION, state: data });
    }
    else {
      history.push({ pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } });
    }
  };

  const goToPrescription = () => {
    redirectTo();
  }

  return (
    <div className="mt-6 mb-16 mx-6">
      <div className="flex justify-center relative -top-2 sm:-top-14 md:-top-14 lg:-top-14"> 
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

      <div className=" border-2 mt-8 pb-24 rounded-lg shadow-xl md:h-80 lg:h-3/5 ">
        <div className="flex justify-center">
          <h1 className=" font-bold md:text-lg lg:text-xl mt-8 mb-10 w-60 sm:w-auto md:w-auto lg:w-auto text-center sm:text-center md:text-center lg:text-center">How CureBay finds the best medicine for you</h1>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row sm:justify-around md:justify-around lg:justify-around">
          <div className="flex flex-col  sm:flex-col md:flex-col lg:flex-col items-center sm:items-center md:items-center lg:items-center text-center relative sm:w-1/3 md:w-1/3 lg:w-1/3 sm:h-3/5 md:h-3/5 lg:h-3/5" style={{ textAlign: "-webkit-center" }} >
            <img src={Image1}
              // width="200px" height="150px"   
              className="w-36 sm:w-24 sm:h-24 md:w-36 lg:w-48 h-32 md:h-32 lg:h-40" />
            <div className="lg:absolute sm:absolute md:absolute sm:top-28 md:top-36 lg:top-52 w-52 sm:w-52 md:w-64 lg:w-96">
              <h2 className=" font-medium  sm:text-sm  md:text-sm lg:text-xl text-brand-lightgreen" >Bring pharmacies together</h2>
              <p className=" font-normal sm:text-xs md:text-xs lg:text-base" style={{ color: "#3A3A3A" }} > CureBay collects prices from partner pharmacies</p>
            </div>
          </div>

          <div className=" -ml-0.2 w-0.5 sm:h-42 md:h-44 lg:h-56 " style={{ background: "#C0E3F4" }} ></div>

          <div className="flex  flex-col sm:flex-col md:flex-col lg:flex-col mt-8 sm:mt-0 md:mt-0 lg:mt-0 items-center sm:items-center md:items-center lg:items-center text-center relative  sm:w-1/3 md:w-1/3 lg:w-1/3  sm:h-3/5  md:h-3/5 lg:h-3/5" style={{ textAlign: "-webkit-center" }} >
            <img src={Image2}
              // width="200px" height="150px"
              className="w-36 sm:w-24 sm:h-24 md:w-36 lg:w-44 h-32 md:h-32 lg:h-36"
            />
            <div className="lg:absolute  sm:absolute   md:absolute  sm:top-28  md:top-36 lg:top-52  w-52 sm:w-52 md:w-64 lg:w-96">
              <h2 className=" font-medium  sm:text-sm  md:text-sm lg:text-xl text-brand-lightgreen" >Find out the best price</h2>
              <p className=" font-normal  sm:text-xs  md:text-xs lg:text-base" style={{ color: "#3A3A3A" }}>Compare the prices using our algorithm, to find out the best price for our customers</p>
            </div>
          </div>

          <div className=" -ml-0.5 w-0.5 sm:h-42 md:h-44 lg:h-56" style={{ background: "#C0E3F4" }}></div>

          <div className="flex  flex-col sm:flex-col md:flex-col lg:flex-col  mt-8 sm:mt-0 md:mt-0 lg:mt-0 items-center sm:items-center md:items-center lg:items-center text-center relative sm:w-1/3 md:w-1/3 lg:w-1/3  sm:h-3/5  md:h-3/5 lg:h-3/5" style={{ textAlign: "-webkit-center" }} >
            <img src={Image3}
              // width="200px" height="150px"
              className="w-36 sm:w-24 sm:h-24 md:w-36 lg:w-44 h-32 md:h-32 lg:h-40"
            />
            <div className="lg:absolute  sm:absolute  md:absolute  sm:top-28  md:top-36 lg:top-52  w-52 sm:w-52 md:w-64 lg:w-96">
              <h2 className=" font-medium  sm:text-sm  md:text-sm lg:text-xl text-brand-lightgreen" >Doorstep Delivery</h2>
              <p className=" font-normal  sm:text-xs  md:text-xs lg:text-base" style={{ color: "#3A3A3A" }}>Deliver medicine at your doorstep with real time order tracking</p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center mt-16 mb-0 sm:mb-0 md:mb-0 lg:-mb-10 "><p className="font-bold text-xl sm:text-xl md:text-xl lg:text-xl">Healthcare Packages</p></div> */}
      <Membership />
      {/* <div className="flex overflow-x-hidden space-x-5 pt-3 px-3 w-full example mt-10 lg:mt-24 -ml-4 md:ml-0">

        <div className=" hidden sm:block " style={{ width: "100%" }}>
          <Carousel
            className=""
            style={{ width: "100%" }}
            value={membershipList}
            itemTemplate={packageTemplate}
            autoplayInterval={2800}
            numVisible={2}
            numScroll={1}
          ></Carousel>
        </div>
        <div className="block md:hidden" style={{ width: "100%" }}>
          <Carousel
            className=""
            style={{ width: "100%" }}
            value={membershipList}
            itemTemplate={packageTemplate}
            autoplayInterval={2500}
            numVisible={1}
            numScroll={1}
          ></Carousel>
        </div>
      </div> */}
      {/* <div className="flex flex-col items-center gap-4 lg:gap-0 lg:flex-row justify-center autocomplete my-6" >
        <div className="relative w-full md:11/12 lg:w-8/12 xl:w-9/12" >
          <Autocomplete
            disablePortal
            // freeSolo
            id="google-map-demo"
            forcePopupIcon={false}
            filterOptions={(x) => x}
            options={filterData}
            disableClearable


            // popupIcon={ <SearchIcon className="h-6 p-1 rounded-md bg-blue-600" color={"white"} />}
            onFocus={() => setAutoCompleteFocused(true)}
            onBlur={() => setAutoCompleteFocused(false)}
            freeSolo={true}

            // filterSelectedOptions
            // autoComplete
            getOptionLabel={(option) => option ? option.medicineName : ""}
            renderOption={(props, option, selected) => (
              <li id={option.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", justifyItems: 'center' }} {...props} onClick={(e) => handleMedicineSelect(option, e)}>
                <div >
                  <div className="font-medium text-sm" >{option.medicineName}</div>
                  <div className="text-xs font-extrabold" >{option.medicineTypeOfSell}</div>
                </div>
                <div className="font-medium text-sm items-center" >
                  ₹{" "}{option.medicineRate}
                </div>
              </li>
            )}
            // value={textSearch}
            onKeyUp={(e, newValue) => betterFunction(e.target.value)}
            // onInputChange={(event, newInputValue) => {
            //   setselectedMedicineFromSearch(newInputalue)
            // }}
            sx={{ width: 200 }}

            // onClose ={(e) => }
            // onHighlightChange = {(e) => console.log(e , "sdihvivhsdispdivispd")}
            renderInput={(params) => <TextField {...params}
              // InputProps={{
              //   endAdornment: <InputAdornment position="end">
              //     <IconButton>
              //   <SearchIcon />
              // </IconButton>
              // </InputAdornment>,
              // }}
              label={textSearch ? "" : "Search Medicines here..."} onKeyUp={(e) => handleMedicineSelect(e.target.value, e)} InputLabelProps={{ shrink: false }} />}
          />
          <div onClick={() => onClickAtSearch()} className="absolute right-3 top-5"  ><SearchIcon /></div>
        </div>

      </div> */}

      <div className="flex flex-col bg-white m-auto p-auto">
        {showModel && (
          <div className="justify-center mb-4 items-center bg-gray-600   opacity-90  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="m-4 p-4 rounded-lg bg-white ">
              <div className="flex w-full">
                <p>Please Upload piscription First</p>
                <XIcon
                  onClick={() => {
                    setShowModel(false);
                  }}
                  className=" cursor-pointer font-medium w-6 ml-16"
                />
              </div>
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
        <Dialog
          visible={filterDialog}
          modal={true}
          closeOnEscape={true}
          dismissableMask={true}
          header="Filters"
          onHide={() => setFilterDialog(false)}
          position="bottom"
          className="rounded-none"
        >
          <div
            className=" w-80 pt-2 bg-white"
            style={{ height: "fit-content" }}
          >
            <div className="px-4 flex">
              <div
                style={{
                  fontSize: "14px",
                  color: "#212121",
                  fontWeight: "bold",
                }}
                className="my-2"
              >
                Brands
              </div>
              <Divider layout="vertical" />
              <div className="pt-2">
                <div className="mb-4">
                  <InputText
                    placeholder="Search Brand"
                    className="w-full h-10"
                    style={{ fontSize: "14px" }}
                    onChange={(e) => setBrandFilterSearch(e.target.value)}
                  />
                </div>

                <div className="max-h-72 overflow-scroll">
                  {brandList
                    .sort((a, b) =>
                      a.displayName > b.displayName
                        ? 1
                        : b.displayName > a.displayName
                          ? -1
                          : 0
                    )
                    .filter((res) =>
                      res.displayName
                        .toLowerCase()
                        .includes(brandFilterSearch.toLowerCase())
                    )
                    .map((res, index) => {
                      return (
                        <div className="flex mb-2 ">
                          <input
                            type="checkbox"
                            className="mr-4"
                            checked={res.code == text ? true : false}
                            name="Brand"
                            value={res.code}
                            onChange={(e) => checkFilter(e)}
                          />
                          <span style={{ fontSize: "12px", color: "#212121" }}>
                            {res.displayName}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </Dialog>
        <Dialog
          header="Package Info"
          visible={openDialog}
          modal={false}
          //  style={{ width: "800px", height: 'auto' }}
          className="w-11/12 m-auto lg:w-5/6 h-auto"
          onHide={() => setOpenDialog(false)}
        >
          {!paymentDone ? (
            <>
              {conData && conData?.length ? (
                <div className="">
                  {" "}
                  <h4>Package Name: {conData[0].packagesName}</h4>{" "}
                  <p>Description: {conData[0].packagesDescription}</p>{" "}
                </div>
              ) : labData && labData.length ? (
                <div>
                  {" "}
                  <h4>Package Name: {labData[0].packagesName}</h4>{" "}
                  <p>Description: {labData[0].packagesDescription}</p>{" "}
                </div>
              ) : (
                ""
              )}
              {conData && conData.length > 0 && (
                <>
                  <div className="my-5 ml-2">
                    <h1 className="font-medium"> Consultation </h1>
                  </div>

                  <DataTable value={conData} responsiveLayout="scroll">
                    <Column field="servicesName" header="Consultation"></Column>
                    <Column field="quantity" header="Quantity"></Column>
                    <Column
                      field="actualAmount"
                      header="Actual Amount"
                    ></Column>
                    <Column
                      field="discountAmount"
                      header="Discount Amount"
                    ></Column>
                  </DataTable>
                </>
              )}
              {labData && labData.length > 0 && (
                <>
                  <div className="my-5 ml-2">
                    <h1 className="font-medium"> Lab Tests </h1>
                  </div>
                  <DataTable value={labData} responsiveLayout="scroll">
                    <Column field="labName" header="Lab Test"></Column>
                    <Column field="quantity" header="Quantity"></Column>
                    <Column
                      field="actualAmount"
                      header="Actual Amount"
                    ></Column>
                    <Column
                      field="discountAmount"
                      header="Discount Amount"
                    ></Column>
                  </DataTable>
                </>
              )}
              <div className="text-center">
                <div className="font-medium my-2 mx-4">
                  {" "}
                  Actual Amount : {`\u20B9`}
                  {actualAmount}{" "}
                </div>
                <div className="font-medium mb-2 mx-4">
                  {" "}
                  Discounted Amount : {`\u20B9`}
                  {discountedAmount}{" "}
                </div>
                <div className="font-medium mb-2 mx-4 text-red-500">
                  {" "}
                  You Save : {`\u20B9`}
                  {actualAmount - discountedAmount} (
                  {Math.round(
                    ((actualAmount - discountedAmount) / actualAmount) * 100
                  )}
                  %){" "}
                </div>
              </div>
              <div className="text-center mt-6">
                <button
                  onClick={DoPayment}
                  className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-8 mr-2"
                >
                  Pay
                </button>
              </div>
            </>
          ) : (
            orderPlaced()
          )}
        </Dialog>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setLoginModal: () => dispatch(setLoginModal()),
});

export default connect(null, mapDispatchToProps)(PharmaProducts);
