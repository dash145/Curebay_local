import React, { useState, useEffect } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import delet from "../Assets/Images/delete.svg";
import minus from "../Assets/Images/minus.svg";
import plus from "../Assets/Images/plus.svg";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import SectionContainer from "./SectionContainer";
import CartPrice from "./cartPrice";
import LabCart from "./LabCart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog } from "primereact/dialog";
import pills from "../Assets/Images/Medicines.jpg";
import akshay from "../Assets/Images/avatar.png";
import axios from "axios";
import FamilyDropdownCart from "../components/userprofilecomponents/FamilyDropdownCart";
import Geocode from "react-geocode";
import AddIcon from "@mui/icons-material/Add";
import {
  clearPrescription,
  patientaddresslists,
  getPatientDetails,
  onApplyCoupon,
  getCouponList,
} from "../Redux/Actions/UserprofileActions";
import moment from "moment";
import http from "../Redux/services/http-common";
import {
  AddtoCart,
  getCartDetails,
} from "../Redux/Actions/cartPlaceOrderAction";
import Upload_pres from "./Upload_pres";
import EmptyCart from "./EmptyCart";
import { encodeBase64File } from "../helper/filebase64";
import DiagnosticService from "../Redux/services/CartPlaceService";
import Addaddresspopup from "./userprofilecomponents/addaddresspopup";
import { walletdetails } from "../Redux/Actions/UserprofileActions";
import DeleteIcon from "@mui/icons-material/Delete";
import { log } from "@craco/craco/lib/logger";

function MedicineCart() {
  const familymemberinfo = useSelector((state) => state.familymembers);
  const { FamilymembersData } = familymemberinfo;

  const dispatch = useDispatch();
  const history = useHistory();

  const addressinfo = useSelector((state) => state.patientaddresslist);

  const couponCart = useSelector((state) => state.couponCart);

  const { couponListCart } = couponCart;
  const { patientaddressinfoData } = addressinfo;
  const [memberList, setMemeberList] = useState([]);
  const walletinfo = useSelector((state) => state.patientwallet);

  const patientinfo = useSelector((state) => state.patientinfo);
  const [openDialog, setDialog] = useState(false);
  const [radioChecked, setRadioChecked] = useState(null)
  const { patientinfoData, isSuccess } = patientinfo;

  const userData = useSelector((state) => state.authReducer.patientData);
  const cartList = useSelector((state) => state.cartReducer.cartList);
  // const isLoading = cartList?.patientLabTestsOrder;
  const patientLabTestsOrder = cartList?.patientLabTestsOrder;
  const patientMedicineOrder = cartList?.patientMedicineOrder;
  const [patient, setPatient] = useState(userData);
  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };

  const [isMed, setMedOpen] = useState(true);
  const [isDia, setDiaOpen] = useState(true);
  const [isAdd, setAddress] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [totalAmount, setTotalAmount] = useState("0");
  const [totalAmountFinal, setTotalAmountFinal] = useState("0");
  const [medicineTotalAmount, setMedicineTotalAmount] = useState("0");
  const [medicineTotalAmountFinal, setMedicineTotalAmountFinal] = useState("0");
  const [medicineDiscountAmount, setMedicineTotalDiscountAmount] =
    useState("0");
  const [labTotalAmount, setLabTotalAmount] = useState("0");
  const [labTotalAmountFinal, setLabTotalAmountFinal] = useState("0");
  const [labDiscountAmount, setLabTotalDiscountAmount] = useState(0);
  const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);
  const [addressList, setAddressList] = useState([]);
  const [addressIndex, setAddressIndex] = useState(-1);
  const [tId, settId] = useState(moment.now().toString());
  const [code, setCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplyAmt, setCouponApplyAmt] = useState(0);
  const [couponVerify, setCouponVerify] = useState("");
  const [loadingDuringPayment, setLoadingDuringPayment] = useState(false);
  const [errorDuringPay, setErrorDuringPay] = useState("");
  const [selectedPayMode, setSelectedPayMode] = useState({
    wallet: false,
    card: false,
  });
  const [isUserReadyToPay, setIsUserReadyToPay] = useState(false);
  const [isPrescriptionUploaded, setisPrescriptionUploaded] = useState({
    prescriptionUploaded: false,
    prescriptionDoc: "",
    docType: "",
    loading: false,
  });
  const [emptycart, setemptycart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPreferredDate, setSelectedPreferredDate] = useState();
  const [selectedHomeSamplePreferredDate, setSelectedHomeSamplePreferredDate] =
    useState();
  const [VisitId, setVisitId] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [isCouponApply, setCouponApply] = useState(false);

  const [couponList, setCouponList] = useState([]);

  const [prescriptionUploadedDoc, setPrescriptionUploadedDoc] = useState("");
  const hiddenFileInput = React.useRef(null);
  const [showaddresspopup, setshowaddresspopup] = useState(false);
  const [filterPopup, setFilterPopup] = useState({
    flag: false,
    data: [],
  });
  const [showAddress, setShowAddress] = useState([]);
  const [isAddressChecked, setAddressChecked] = useState("");
  const [loading, setLoading] = useState(1);
  const [deliveryCoordinates, setdeliveryCordinates] = useState({
    lat: "",
    long: "",
  });
  /////////memebership///

  const loadPaymentFor = (patient) => {
    let params = {
      code: patient,
    };
    localStorage.setItem("patient", JSON.stringify(params));
    setPatient(params);
  };

  // useEffect(() =>{
  //   		var apiUrl = 'MMI/accesstoken'
  // 	    http.get(apiUrl).then(async (response) => {
  // 	        let data = response.data;
  // 	        console.log("res", data)
  // 	      const res =  await http.get(`https://atlas.mapmyindia.com/api/places/geocode?region=ind&address=237%20Okhla%20industrial%20estate%20phase%203%20new%20delhi%2C%20delhi%20110020&itemCount=1&bound=TAVI5S`);
  // 	      console.log(res, "vuyvyuvuycuycuycuycuyuc");
  // 	    });
  // },[])

  useEffect(() => {
    console.log(
      localStorage.getItem("paymentStatus"),
      localStorage.getItem("trancationid"),
      cartList
    );

    if (
      localStorage.getItem("paymentStatus") &&
      localStorage.getItem("trancationid") &&
      cartList &&
      (cartList?.patientMedicineOrder?.length ||
        cartList?.patientLabTestsOrder?.length)
    ) {
      console.log(
        localStorage.getItem("paymentStatus"),
        localStorage.getItem("trancationid"),
        cartList
      );
      localStorage.removeItem("paymentStatus");
      redirectAfterTxn(localStorage.getItem("trancationid"));
      console.log(
        localStorage.getItem("paymentStatus"),
        localStorage.getItem("trancationid"),
        cartList
      );
    } else if (
      localStorage.getItem("paymentStatus") === "failure" &&
      localStorage.getItem("paymentRemarks")
    ) {
      // toast(localStorage.getItem("paymentRemarks"));
      localStorage.removeItem("paymentStatus");
      localStorage.removeItem("paymentRemarks");
    }

    console.log("cart data ha", JSON.stringify(cartList));
  }, [cartList]);

  useEffect(() => {
    if (showAddress.length == 1) {
      setAddressIndex(0);
    } else {
      let selectItem = patientaddressinfoData.filter(
        (item) => item.isDefault == 1
      );
      if (selectItem?.length > 0) {
        setAddressIndex(0);
      } else {
        setAddressIndex(-1);
      }
    }

    // window.location.reload();
  }, [patientaddressinfoData, showaddresspopup, patientinfoData]);

  useEffect(() => {
    dispatch(getPatientDetails(userData?.code));
    dispatch(patientaddresslists(userData?.code));
    // window.location.reload();
  }, [showaddresspopup]);

  useEffect(() => {
    let medicineAmount = 0;
    let labAmount = 0;
    let labdiscountedAmount = 0;
    let medicinediscountedAmount = 0;

    patientLabTestsOrder?.map((res2) => {
      res2.patientLabTestsOrderDetailsList.map((res) => {
        if (res.status === 1) {
          labAmount += res.amount ?? 0;
          labdiscountedAmount += parseFloat(res.discountAmount)
            ? parseFloat(res.discountAmount)
            : parseFloat(res.amount);
        }
      });
      return null;
    });

    patientMedicineOrder?.map((res2) => {
      res2.patientMedicineOrderDetailsList.map((res) => {
        if (res.status === 1) {
          medicineAmount += res?.unitPrice ? res?.unitPrice * res?.quantity : 0;
          medicinediscountedAmount += res?.discountAmount
            ? parseFloat(res?.discountAmount * res?.quantity)
            : parseFloat(res?.totalAmount);
        }
      });
      return null;
    });

    setMedicineTotalAmount(medicineAmount);

    if (medicinediscountedAmount > 0) {
      setMedicineTotalAmountFinal(medicinediscountedAmount);
    } else {
      setMedicineTotalAmountFinal(medicineAmount);
    }

    setLabTotalAmount(labAmount);
    setLabTotalAmountFinal(labAmount);

    console.log("medicinediscountedAmount", medicinediscountedAmount);
    // console.log('medicineAmount',medicineAmount)
    let medAmount = medicinediscountedAmount
      ? medicinediscountedAmount
      : medicineAmount;
    let labRealAmount = labdiscountedAmount ? labdiscountedAmount : labAmount;
    let totalDiscount = 0;
    if (labdiscountedAmount > 0) {
      totalDiscount += labAmount - labdiscountedAmount;
      setLabTotalDiscountAmount(labdiscountedAmount);

      setLabTotalAmountFinal(labAmount);
    } else {
      setLabTotalDiscountAmount(0);

      setLabTotalAmountFinal(labAmount);
    }

    if (medicinediscountedAmount > 0) {
      totalDiscount += medicineAmount - medicinediscountedAmount;
      setMedicineTotalDiscountAmount(medicinediscountedAmount);
    } else {
      setMedicineTotalDiscountAmount(0);
    }

    setTotalAmountFinal(medicineAmount + labAmount);

    if (totalDiscount > 0) {
      setTotalDiscountAmount(totalDiscount);
      setTotalAmount(medAmount + labRealAmount);
    } else {
      setTotalAmount(medAmount + labRealAmount);
    }
    if (patientMedicineOrder?.length) {
      DiagnosticService.getPrescriptionDoc(
        patientMedicineOrder[0].orderId,
        "drugOrder"
      ).then((getres) => {
        if (getres.data.length) {
          let docType = getres.data[0].prescriptionDocName.split(".")[1];
          localStorage.setItem(
            "prescriptionDoc",
            getres.data[0].prescriptionDocName
          );
          setisPrescriptionUploaded({
            prescriptionUploaded: true,
            prescriptionDoc: getres.data[0].prescriptionDocName,
            docType: docType,
          });
        }
      });
    }

    console.log(
      "patientLabTestsOrderpatientLabTestsOrder",
      JSON.stringify(patientLabTestsOrder)
    );
  }, [patientLabTestsOrder, patientMedicineOrder]);

  useEffect(() => {
    let defaultAddress = [];

    let otherAddress = patientaddressinfoData.map((res) => {
      if (res.isDefault) {
        defaultAddress.push(res);
      }
      return res;
    });

    if (defaultAddress?.length) {
      setShowAddress(defaultAddress);
    } else if (otherAddress?.length) {
      setShowAddress([otherAddress[0]]);
    } else if (
      patientinfoData.address1 &&
      patientinfoData.address2 &&
      patientinfoData.pinCode &&
      patientinfoData.city
    )
    {
      setShowAddress([
        {
          address1: patientinfoData.address1,
          address2: patientinfoData.address2,
          city: patientinfoData.city,
          state: patientinfoData.state,
          pinCode: patientinfoData.pinCode,
        },
      ]);
    }
  }, [patientaddressinfoData, patientinfoData]);

  const onChangeMed = () => {
    setMedOpen(!isMed);
  };

  const onChangeDia = () => {
    setDiaOpen(!isDia);
  };

  const updateDiscount = (dis) => {
    // setDiscountAmount(dis);
  };

  const updateTotalAmount = (val) => {
    setTotalAmount(val);
  };

  const onChangeAdd = () => {
    setAddress(!isAdd);
  };

  useEffect(() => {
    localStorage.removeItem("couponCode");
    console.log("working cart", JSON.stringify(couponListCart));

    dispatch(walletdetails(userData.code));

    dispatch(getCartDetails(userData.code)).then((cartList) => {
      if (couponListCart?.data?.vouchersList?.length > 0) {
        let voucherData = couponListCart.data.vouchersList;
        let cart = cartList[0];

        if (cart?.patientMedicineOrder != null) {
          if (
            cart?.patientMedicineOrder[0]?.patientMedicineOrderDetailsList[0]
              ?.voucherCode
          ) {
            let index = voucherData.findIndex(
              (x) =>
                x.voucherCode ===
                cart?.patientMedicineOrder[0]
                  ?.patientMedicineOrderDetailsList[0]?.voucherCode
            );
            voucherData[index].isDefault = true;
            setCouponApply(true);
            setCouponCode(voucherData[index]?.voucherCode);
            localStorage.setItem("couponCode", JSON.stringify(voucherData[index]?.voucherCode));
            setCouponList([...voucherData]);
          } else {
            let list = [...voucherData];
            list.map((item) => {
              item.isDefault = false;
            });

            setCouponList(list);
          }
        } else if (cart?.patientLabTestsOrder != null) {
          if (cart?.patientLabTestsOrder[0]?.voucherCode) {
            let index = voucherData.findIndex(
              (x) =>
                x.voucherCode === cart?.patientLabTestsOrder[0]?.voucherCode
            );
            voucherData[index].isDefault = true;
            setCouponApply(true);
            setCouponCode(voucherData[index].voucherCode);
            localStorage.setItem("couponCode", JSON.stringify(voucherData[index]?.voucherCode));
            setCouponList([...voucherData]);
          } else {
            let list = [...voucherData];
            list.map((item) => {
              item.isDefault = false;
            });

            setCouponList([...list]);
          }
        } else {
          let list = [...voucherData];
          list.map((item) => {
            item.isDefault = false;
          });
          setCouponList([...list]);
        }
      } else {
        dispatch(getCouponList(userData?.code, "v_cart")).then((res) => {
          let cart = cartList[0];

          if (cart?.patientMedicineOrder != null) {
            if (
              cart?.patientMedicineOrder[0]?.patientMedicineOrderDetailsList[0]
                ?.voucherCode
            ) {
              let voucherData = res.data.vouchersList;
              let index = voucherData.findIndex(
                (x) =>
                  x.voucherCode ===
                  cart?.patientMedicineOrder[0]
                    ?.patientMedicineOrderDetailsList[0]?.voucherCode
              );
              voucherData[index].isDefault = true;
              setCouponList([...voucherData]);
              setCouponApply(true);
              setCouponCode(voucherData[index].voucherCode);
            } else {
              setCouponList([...res.data.vouchersList]);
            }
          } else if (cart?.patientLabTestsOrder != null) {
            if (cart?.patientLabTestsOrder[0]?.voucherCode) {
              let voucherData = res.data.vouchersList;
              let index = voucherData.findIndex(
                (x) =>
                  x.voucherCode === cart?.patientLabTestsOrder[0]?.voucherCode
              );
              voucherData[index].isDefault = true;
              setCouponApply(true);
              setCouponCode(voucherData[index].voucherCode);
              setCouponList([...voucherData]);
            } else {
              setCouponList([...res.data.vouchersList]);
            }
          } else {
            setCouponList([...res.data.vouchersList]);
          }
        });
      }
    });
  }, [couponListCart]);

  const setTxId = (val) => {
    settId(val);
  };

  const setPreferredDate = (id, date) => {
    date = moment(date).format("yyyy-MM-DD HH:mm:ss");
    setSelectedPreferredDate(date);
    patientLabTestsOrder.forEach((element) => {
      if (element.id == id) {
        element.preferDateTime = moment(date).format("yyyy-MM-DD HH:mm:ss");
      }
    });
  };

  const setPreferredLabDate = (id, date) => {
    date = moment(date).format("yyyy-MM-DD HH:mm:ss");
    setSelectedPreferredDate(date);
    patientLabTestsOrder.forEach((element) => {
      if (element.id == id) {
        element.preferDateTime = moment(date).format("yyyy-MM-DD HH:mm:ss");
      }
    });
  };

  /**
   * Delete Test/Medicine from Cart
   */
  const deleteCartItem = (e, { medicineId = -1, testId = -1 }) => {
    setTotalDiscountAmount(0);

    e.preventDefault();
    let cart = { ...cartList };
    let patientDrugOrder = cart.patientMedicineOrder?.map((orderData) => {
      orderData.patientMedicineOrderDetailsList.map((medicineData) => {
        if (medicineData.id == medicineId) {
          medicineData.status = 0;
        }
        //return medicine;
      });
      /*let order = orderData;
        let medicinesList = order.patientMedicineOrderDetailsList;

        if (order.id === medicineId) {
          order.status = 0;
        }*/
      orderData.txnId = "";
      return orderData;
    });
    cart.patientMedicineOrder = patientDrugOrder;

    if (cart && cart.patientMedicineOrder) {
      cart.patientMedicineOrder.forEach((element) => {
        if (element.patientMedicineOrderDetailsList) {
          let pharmaadded = false;
          element.patientMedicineOrderDetailsList.forEach((element2) => {
            if (element2.status == 1) {
              pharmaadded = true;
            }
          });
          if (pharmaadded) {
            element.status = 1;
          } else {
            element.status = 0;
          }
        }
      });
    }

    let patientTestOrder = cart.patientLabTestsOrder?.map((orderData) => {
      console.log("Test Id : " + testId);
      orderData.patientLabTestsOrderDetailsList.map((labTestData) => {
        console.log("Lab Test Id : " + labTestData.id);
        if (labTestData.id == testId) {
          console.log("Deleted Item : " + labTestData);
          labTestData.status = 0;
        }
      });
      /*let order = orderData;
      if (order.id === testId) {
        order.status = 0;
      }*/
      orderData.txnId = "";
      return orderData;
    });
    cart.patientLabTestsOrder = patientTestOrder;

    if (cart && cart.patientLabTestsOrder) {
      cart.patientLabTestsOrder.forEach((element) => {
        if (element.patientLabTestsOrderDetailsList) {
          let diaadded = false;
          element.patientLabTestsOrderDetailsList.forEach((element2) => {
            if (element2.status == 1) {
              diaadded = true;
            }
          });
          if (diaadded) {
            element.status = 1;
          } else {
            element.status = 0;
          }
        }
      });
    }

    let open = false;
    if (cart && cart.patientLabTestsOrder) {
      cart.patientLabTestsOrder.forEach((order) => {
        order.patientLabTestsOrderDetailsList.forEach((tests) => {
          if (tests.status == 1) {
            open = true;
          }
        });
      });
    }
    if (cart && cart.patientMedicineOrder) {
      cart.patientMedicineOrder.forEach((order) => {
        order.patientMedicineOrderDetailsList.forEach((medicines) => {
          if (medicines.status == 1) {
            open = true;
          }
        });
      });
    }
    if (!open) {
      cart.status = 0;
      setemptycart(true);
    }
    console.log(JSON.stringify(cart), "updated cart Items");
    setIsLoading(true);
    dispatch(AddtoCart(cart)).then(() => {
      dispatch(getCartDetails(userData.code));
    });
    setIsLoading(false);
  };

  /**
   * Update Quantity
   */
  const quantityUpdate = (e, res, quantity) => {
    e.preventDefault();

    let cart = { ...cartList };

    const patientDrugOrder = cart.patientMedicineOrder?.map((orderData) => {
      orderData.patientMedicineOrderDetailsList.map((medicineData) => {
        // if(res1.data && res1.data.length){
        //   if (medicineData.id == res.id) {
        //     medicineData.quantity = quantity;
        //     medicineData.totalAmount =
        //       medicineData.unitPrice  *
        //       quantity;
        //       medicineData.discountAmount =
        //       (medicineData.unitPrice/100) * parseFloat(res1.data[0].discountPercentage) *
        //       quantity;
        //   }
        // } else{
        if (medicineData.id == res.id) {
          medicineData.quantity = quantity;
          let realAmount = medicineData?.discountAmount
            ? medicineData?.discountAmount
            : medicineData.unitPrice;
          medicineData.totalAmount = realAmount * quantity;
          // sdfsdfsdf33222,..
        }
        // }
      });
      return orderData;
    });
    cart.patientMedicineOrder = patientDrugOrder;
    let patientTestsOrder = cart.patientLabTestsOrder?.map((orderData) => {
      let order = orderData;
      order.txnId = "";
      return order;
    });
    cart.patientLabTestsOrder = patientTestsOrder;
    dispatch(AddtoCart(cart));
  };

  const SelectAddress = (add) => {
    setShowAddress([add]);
  };

  const openMenu = (e) => {
    console.log(e);
    setFilterPopup({
      flag: true,
      data: [...patientaddressinfoData],
    });
  };

  const onHide = (name) => {
    console.log(name);
    setFilterPopup({
      flag: false,
      data: [],
    });
  };

  /**
   * Payment API Code
   */

  const redirectAfterTxn = async (txnid) => {
    try {
      setIsLoading(true);
      let ttlAmt = 0;
      let amountFromPayU = JSON.parse(localStorage.getItem("totalAmount"));
      let patient = JSON.parse(localStorage.getItem("patient"));
      let txnid = localStorage.getItem("trancationid");

      let address = { address1: "", address2: "", address3: "" };

      let showAddress = JSON.parse(localStorage.getItem("showAddress"));
      const pincodePackage = require("pincode-lat-long");
      let coords = JSON.parse(localStorage.getItem("deliveryCoordinates"));
      // let coords = pincodePackage.getlatlong(showAddress[0].pinCode)
      console.log(coords, "sdfdsofuhdofhdsifd");

      showAddress?.forEach((add) => {
        /* setting same address to all object */
        address.address1 = add.address1.slice(0, 25) ?? "";
        address.address2 = add.address2.slice(0, 25) ?? "";
        //address.address3 = (add.city ?? "") + ", " + (add.state ?? "");
        address.city = add.city ?? "";
        address.state = add.state ?? "";
        address.country = add.country ?? "India";
        address.pincode = add.pinCode ?? "";
      });

      let cartData = JSON.parse(localStorage.getItem("saveObj"));

      if (
        cartData.patientLabTestsOrder &&
        cartData.patientLabTestsOrder?.length > 0
      ) {
        cartData.preferDateTime = selectedPreferredDate
          ? selectedPreferredDate
          : selectedHomeSamplePreferredDate
          ? null
          : moment().format("yyyy-MM-DD HH:mm:ss");
        cartData.collectionSampleDate = selectedHomeSamplePreferredDate
          ? selectedHomeSamplePreferredDate
          : selectedPreferredDate
          ? null
          : moment().format("yyyy-MM-DD HH:mm:ss");
        cartData.patientLabTestsOrder = cartData.patientLabTestsOrder.map(
          (labTestData) => {
            let totalamount = 0;
            if (
              labTestData.patientLabTestsOrderDetailsList &&
              labTestData.patientLabTestsOrderDetailsList?.length > 0
            ) {
              let array = [];

              labTestData.patientLabTestsOrderDetailsList.forEach((data) => {
                if (data.status == 1) {
                  data.patientId = patient.code ?? userData.code;
                  array.push(data);
                }
              });
              labTestData.patientLabTestsOrderDetailsList = array;
              labTestData.patientLabTestsOrderDetailsList.forEach((data) => {
                console.log(data, "dsfiohaofhwpie");
                totalamount += parseFloat(data.discountAmount)
                  ? parseFloat(data.discountAmount)
                  : data.amount;
              });
            }
            labTestData.preferDateTime = selectedPreferredDate
              ? selectedPreferredDate
              : selectedHomeSamplePreferredDate
              ? null
              : moment().format("yyyy-MM-DD HH:mm:ss");
            labTestData.collectionSampleDate = selectedHomeSamplePreferredDate
              ? selectedHomeSamplePreferredDate
              : selectedPreferredDate
              ? null
              : moment().format("yyyy-MM-DD HH:mm:ss");

            labTestData.address1 = address.address1 ?? "";
            labTestData.address2 = address.address2 ?? "";
            labTestData.address3 = address.address3 ?? "";
            labTestData.payMode = localStorage.getItem("payMode");
            labTestData.deliveryAddress1 = address.address1 ?? "";
            labTestData.deliveryAddress2 = address.address2 ?? "";
            labTestData.deliveryAddress3 = address.address3 ?? "";
            labTestData.deliveryCity = address.city ?? "";
            labTestData.deliveryState = address.state ?? "";
            labTestData.deliveryZipcode = address.pincode ?? "";
            labTestData.deliveryCountry = address.country ?? "";
            labTestData.patientId = patient.code ?? userData.code;

            labTestData.latitude = coords.lat;
            labTestData.longitude = coords.long;
            labTestData.txnId = txnid;
            labTestData.paidAmount = totalamount.toFixed(2);
            labTestData.totalAmount = totalamount.toFixed(2);
            ttlAmt += totalamount;
            labTestData.procedureStatus = 0;
            if (labTestData.locationCurebayCenter == "Y") {
              labTestData.procedureStatus = 1;
              labTestData.curebayCenter = "Y";
            }
            return labTestData;
          }
        );
      }

      if (
        cartData.patientMedicineOrder &&
        cartData.patientMedicineOrder?.length > 0
      ) {
        let totalAmount = 0;
        let drugPayload = { ...cartData.patientMedicineOrder[0] };

        drugPayload["patientMedicineOrderDetailsList"] = [];
        cartData.patientMedicineOrder = cartData.patientMedicineOrder.map(
          (product) => {
            // }
            if (
              product.patientMedicineOrderDetailsList &&
              product.patientMedicineOrderDetailsList?.length > 0
            ) {
              product.patientMedicineOrderDetailsList.forEach((data) => {
                totalAmount += data.totalAmount;
                if (data.status == 1) {
                  drugPayload.patientId = patient.code ?? userData.code;

                  drugPayload.patientMedicineOrderDetailsList.push(data);
                  drugPayload.procedureStatus = 0;
                }
              });
            }
            /** Addresses Setup */
            product.address1 = address.address1 ?? "";
            product.address2 = address.address2 ?? "";
            product.address3 = address.address3 ?? "";
            product.payMode = localStorage.getItem("payMode");
            product.deliveryAddress1 = address.address1 ?? "";
            product.deliveryAddress2 = address.address2 ?? "";
            product.deliveryAddress3 = address.address3 ?? "";
            product.deliveryCity = address.city ?? "";
            product.patientId = patient.code ?? userData.code;

            product.deliveryState = address.state ?? "";
            product.latitude = coords.lat;
            product.longitude = coords.long;
            product.deliveryZipcode = address.pincode ?? "";
            product.deliveryCountry = address.country ?? "";
            product.txnId = txnid;
            product.docName = localStorage.getItem("prescriptionDoc")
              ? localStorage.getItem("prescriptionDoc")
              : null;
            product.paidAmount = totalAmount.toFixed(2);
            product.totalAmount = totalAmount.toFixed(2);
            ttlAmt += totalAmount;
            product.procedureStatus = 0;

            return product;
          }
        );

        drugPayload.totalAmount = totalAmount;
        drugPayload.txnId = txnid;
        drugPayload.docName = localStorage.getItem("prescriptionDoc")
          ? localStorage.getItem("prescriptionDoc")
          : null;
        drugPayload.paidAmount = totalAmount.toFixed(2);
        drugPayload.address1 = address.address1 ?? "";
        drugPayload.address2 = address.address2 ?? "";
        drugPayload.address3 = address.address3 ?? "";
        cartData.totalAmount = parseFloat(amountFromPayU).toFixed(2);
        drugPayload.deliveryAddress1 = address.address1 ?? "";
        drugPayload.deliveryAddress2 = address.address2 ?? "";
        drugPayload.deliveryAddress3 = address.address3 ?? "";
        drugPayload.deliveryCity = address.city ?? "";
        drugPayload.deliveryState = address.state ?? "";
        drugPayload.latitude = coords.lat;
        drugPayload.longitude = coords.long;
        drugPayload.deliveryZipcode = address.pincode ?? "";
        drugPayload.deliveryCountry = address.country ?? "";
      }

      console.log("is cart is hai", cartData);
      if (code) {
      }
      let link;
      let remark = "";
      let amount = JSON.parse(localStorage.getItem("totalAmount"))?.toFixed(2);
      if (
        cartData?.patientLabTestsOrder?.length &&
        cartData?.patientLabTestsOrder[0]?.patientLabTestsOrderDetailsList
          .length
      ) {
        link = "MY_ORDERS";
        remark = `Thank You. Your order status is success. Your Transaction ID for this transaction is ${txnid}. We have received a payment of Rs. ${amount}. ${
          cartData?.patientLabTestsOrder[0]?.patientLabTestsOrderDetailsList[0]
            ?.labTestType === "Radiology"
            ? "CureBay will call you shortly to schedule a convenient slot for appointment."
            : ""
        }`;
      } else if (
        cartData?.patientMedicineOrder?.length &&
        cartData?.patientMedicineOrder[0]?.patientMedicineOrderDetailsList
          .length
      ) {
        link = "PATIENTMEDICINEORDERS";
        remark = `Thank You. Your order status is success. Your Transaction ID for this transaction is ${txnid}. We have received a payment of Rs. ${amount}. Your order will soon be shipped.`;
      } else {
        link = "PATIENTMEDICINEORDERS";
        remark = `Thank You. Your order status is success. Your Transaction ID for this transaction is ${txnid}. We have received a payment of Rs. ${amount}. Your order will soon be shipped.`;
      }
      await http.post("PatientCart/", { ...cartData, status: 0 });
      localStorage.removeItem("paymentStatus");
      localStorage.removeItem("saveObj");
      localStorage.removeItem("showAddress");
      localStorage.removeItem("payMode");
      localStorage.removeItem("patient");
      localStorage.removeItem("prescriptionDoc");
      localStorage.removeItem("couponCode");
      dispatch(getCartDetails(userData?.code)).finally(() =>
        dispatch(clearPrescription())
      );
      let orderTimer = setTimeout(() => {
        localStorage.removeItem("trancationid");
        localStorage.removeItem("totalAmount");
        clearTimeout(orderTimer);
      }, 1000);
      history.push({
        pathname: APP_ROUTES.CART_ORDER_SUCESS,
        state: { remark: remark, link: link },
      });
    } catch (err) {
      localStorage.removeItem("paymentStatus");
      localStorage.removeItem("trancationid");
      localStorage.removeItem("saveObj");
      localStorage.removeItem("totalAmount");
      localStorage.removeItem("trancationid");
      localStorage.removeItem("showAddress");
      localStorage.removeItem("payMode");
      localStorage.removeItem("patient");
      localStorage.removeItem("prescriptionDoc");
      localStorage.removeItem("couponCode");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  //#region Payment Process Start

  const DoPayment = async (from) => {
    if (from == "") {
      if (!isCouponApply) {
        setDialog(true);
        return;
      }
    }

    if (showAddress[0].pinCode.length != 6) {
      toast("We can't deliver this order to selected address");
      return;
    }

    let uploadPres = [];

    if (patientMedicineOrder?.length) {
      patientMedicineOrder.map((res) => {
        uploadPres = res.patientMedicineOrderDetailsList.filter(
          (element) => element.prescriptionRequired == "Y"
        );
      });
    }

    if (uploadPres.length > 0 && !isPrescriptionUploaded.prescriptionUploaded) {
      toast("Upload prescription to order prescribed medicines.");
      return;
    }

    const pincodePackage = require("pincode-lat-long");
    let coords = pincodePackage.getlatlong(showAddress[0].pinCode);
    console.log(showAddress, "dsofjdsiohfdusgfids");

    let authPayload = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.REACT_APP_MMI_CLIENT_ID,
      client_secret: process.env.REACT_APP_MMI_CLIENT_SECRET_ID,
    });

    let auth = await http.post(
      `${process.env.REACT_APP_BASEURL}security/oauth/token`,
      authPayload,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(auth, "eifhohaoiehfipahpofahfpao");
    if (auth.data.access_token) {
      let eloc = await http.get(
        `${process.env.REACT_APP_BASEURL}places/geocode?address=${showAddress[0]?.address1} ${showAddress[0]?.address2} ${showAddress[0]?.city} ${showAddress[0]?.state} ${showAddress[0]?.pinCode}&itemCount=1`,
        {
          headers: {
            Authorization: `Bearer ${auth.data.access_token}`,
          },
        }
      );
      console.log(eloc, "wdfieuiheuwfuoewobcoecwou");
      if (!eloc.data.copResults.pincode) {
        toast("Please enter a vaild Address");
        return;
      }
      if (eloc.data.copResults.eLoc) {
        let coords = await axios.get(
          `${process.env.REACT_APP_BASEURL}O2O/entity/${eloc.data.copResults.eLoc}`,
          {
            headers: {
              Authorization: `Bearer ${auth.data.access_token}`,
            },
          }
        );
        console.log(coords, "sdfdsoufdsuohfodhfodsi");
        if (coords.data.latitude && coords.data.longitude) {
          if (
            patientMedicineOrder &&
            patientMedicineOrder.length &&
            patientMedicineOrder[0]?.patientMedicineOrderDetailsList?.length
          ) {
            const data = await axios.get(
              `${process.env.REACT_APP_ELASTIC_BASEURL}pharmacies/count?latitude=${coords.data.latitude}&longitude=${coords.data.longitude}`
            );
            if (!data.data) {
              toast("We can't deliver medicine order to selected address.");
              return;
            }
          }
          if (
            patientLabTestsOrder &&
            patientLabTestsOrder.length &&
            patientLabTestsOrder[0]?.patientLabTestsOrderDetailsList?.length
          ) {
            const data = await axios.get(
              `${process.env.REACT_APP_ELASTIC_BASEURL}labs/count?latitude=${coords.data.latitude}&longitude=${coords.data.longitude}`
            );
            if (!data.data) {
              toast("We don't have Lab partner nearby.");
              return;
            }
          }
          setdeliveryCordinates({
            lat: coords.data.latitude,
            long: coords.data.longitude,
          });
        } else {
          toast("Not able to use eLoc api");
          return;
        }
      } else {
        toast("Not able to use Geocode");
        return;
      }
    } else {
      toast("Not able to access MMI");
      return;
    }

    setDialog(false);
    setIsUserReadyToPay(true);
  };

  const DoPay = async () => {
    setErrorDuringPay("");
    if (!selectedPayMode.wallet && !selectedPayMode.card) {
      toast("Please select payment mode.");
      return;
    }

    if (selectedPayMode.wallet) {
      if (totalAmount > walletinfo?.patientwalletinfoData?.balance) {
        toast("Balance is not sufficient.");
        return;
      } else {
        setLoadingDuringPayment(true);
        let data = await http.put(
          `${process.env.REACT_APP_BASEURL}api/v1/payments/wallet/cart/${cartList?.cartId}`
        );
        console.log(data, "dsjfsduhfoshfoisd");
        if (data.status == 200) {
          setLoadingDuringPayment(false);
          localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
          localStorage.setItem("patient", JSON.stringify(patient));
          localStorage.setItem("saveObj", JSON.stringify(cartList));
          localStorage.setItem("showAddress", JSON.stringify(showAddress));
          localStorage.setItem("payMode", "CureBay wallet");
          localStorage.setItem(
            "paymentRemarks",
            "Your Order placed successfully"
          );
          localStorage.setItem(
            "trancationid",
            JSON.stringify(data.data.data.transcationId)
          );
          localStorage.setItem(
            "deliveryCoordinates",
            JSON.stringify(deliveryCoordinates)
          );
          redirectAfterTxn(data.data.data.transcationId);
        } else {
          setLoadingDuringPayment(false);
          setErrorDuringPay("Something went wrong try again.");
        }
      }
    }

    if (selectedPayMode.card) {
      localStorage.setItem("redirectUrl", APP_ROUTES.MEDICINE_CART);

      localStorage.setItem("patient", JSON.stringify(patient));
      let firstName = userData.firstName.split(/\s/).join("");
      localStorage.setItem("totalAmount", JSON.stringify(totalAmount));

      localStorage.setItem("payMode", "CC");
      localStorage.setItem("saveObj", JSON.stringify(cartList));
      localStorage.setItem("showAddress", JSON.stringify(showAddress));
      localStorage.setItem(
        "deliveryCoordinates",
        JSON.stringify(deliveryCoordinates)
      );
      const url =
        process.env.REACT_APP_PAYU_BASEURL +
        `patientId=${userData.code}&amount=${totalAmount}&firstname=${firstName}&email=${userData.email}&phone=${userData.mobile}&productinfo=cartpayment&udf1=Patient&service_provider=payu_paisa`;
      window.location.replace(url);

      console.log('url',url)
    }
  };

  const setTcode = (val) => {
    setCode(val);
  };

  if (localStorage.getItem("trancationid")) {
    return (
      <div className="flex flex-wrap justify-center">
        <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
      </div>
    );
  }

  if (!isLoading && !cartList?.cartId) {


    return (
      <>
        <EmptyCart />
      </>
    );
  }

  const clicktype = (e) => {
    hiddenFileInput.current.click();
    console.log(hiddenFileInput.current , "sdsdividosvhdsio");
    // document.getElementById(e).click();
  };

  const ViewPrescription = (res) => {
    console.log();
    if (res.visitId !== 0) {
      setVisitId(res.visitId);
      setOpen(true);
    }
  };

  const changeHandler = async (file, res1, type) => {
    console.log("photosachasuhua", type);
    let splitvalue = file.type.split("/");
    let validFormat = true;

    console.log(splitvalue, "sdfhduohdsouvusod", file);
    let b64File = await encodeBase64File(file);
    console.log(b64File, "b64Filedsvpisdvps");
    setPrescriptionUploadedDoc(b64File);
    // if (type == "labOrder") {
    //   let cart = cartList;
    //   let patientTestOrder = cart.patientLabTestsOrder?.map((orderData) => {
    //     if (orderData.id == res1.id) {
    //       orderData.prescriptionDoc = b64File;
    //       if (
    //         splitvalue[1].toLowerCase() == "pdf" ||
    //         splitvalue[1].toLowerCase() == "png" ||
    //         splitvalue[1].toLowerCase() == "jpeg" ||
    //         splitvalue[1].toLowerCase() == "jpg"
    //       ) {
    //         orderData.prescriptionDocType = splitvalue[1].toLowerCase();
    //       }
    //     }
    //     return orderData;
    //   });
    //   cart.patientLabTestsOrder = patientTestOrder;
    //   console.log(
    //     cart?.patientLabTestsOrder[0]?.orderId,
    //     cart,
    //     "egarebgjkbksjgbr"
    //   );
    //   DiagnosticService.uploadPrescriptionDoc(
    //     cart?.patientLabTestsOrder[0]?.orderId,
    //     cart
    //   ).then(
    //     () => {},
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // } else
    setisPrescriptionUploaded({
      loading: true,
    });
    if (type == "drugOrder") {
      let cart = cartList;
      console.log(cartList, "Sdsdihgoisdhifhsghsguho");
      console.log(cart);
      let patientDrugOrder = cart.patientMedicineOrder?.map((orderData) => {
        if (orderData.id == res1.id) {
          orderData.prescriptionDoc = b64File;
          if (
            (splitvalue[1].toLowerCase() == "pdf" ||
            splitvalue[1].toLowerCase() == "png" ||
            splitvalue[1].toLowerCase() == "jpeg" ||
            splitvalue[1].toLowerCase() == "jpg")
          ) {
            orderData.prescriptionDocType = splitvalue[1].toLowerCase();
            cart.prescriptionDocType = splitvalue[1].toLowerCase();
          } else {
            validFormat = false;
          }
        }
        return orderData;
      });
      if (!validFormat) {
        toast("Please upload a PDF or Image format document.");
        setisPrescriptionUploaded({
          loading: false,
        });
        return;
      }
      cart.patientMedicineOrder = patientDrugOrder;
      cart.drugsOrdersYN = true;
      cart.prescriptionDoc = b64File;
      console.log(cart, "patientDrugOrdersvidsn");
      DiagnosticService.uploadPrescriptionDoc(
        cart.patientMedicineOrder[0].orderId,
        cart
      )
        .then((res) => {
          console.log(res, "dsfdbdkbjfe");
          DiagnosticService.getPrescriptionDoc(
            cart.patientMedicineOrder[0].orderId,
            "drugOrder"
          )
            .then((getres) => {
              console.log(getres, "sdglsouvsoduvhlsajbvjsld");
              if (getres.data.length) {
                let docType = getres.data[0].prescriptionDocName.split(".")[1];
                localStorage.setItem(
                  "prescriptionDoc",
                  getres.data[0].prescriptionDocName
                );
                setisPrescriptionUploaded({
                  prescriptionUploaded: true,
                  prescriptionDoc: getres.data[0].prescriptionDocName,
                  docType: docType,
                  loading: false,
                });
              }
            })
            .catch((err) => {
              setisPrescriptionUploaded({
                loading: false,
              });
            });
        })
        .catch((err) => {
          setisPrescriptionUploaded({
            loading: false,
          });
        });
    }
  };

  const checkPrescriptionRequired = (data) => {
    let uploadPres = data.patientMedicineOrderDetailsList.filter(
      (element) => element.prescriptionRequired == "Y"
    );

    if (uploadPres?.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const onClickAt = (item, i) => {

    console.log('item',JSON.stringify(item))




    setAddressIndex(i);
    setCouponCode(item?.voucherCode);

    let list = [...couponList];

    list.map((item) => {
      item.isDefault = false;
    });

    list[i].isDefault = true;
    setCouponList(list);

    //couponApplyAt(item,i)
  };

  const checkPrescriptionUploaded = (data) => {
    if (isPrescriptionUploaded.prescriptionUploaded) {
      return true;
    } else {
      return false;
    }
  };

  const openCustumAddressWindow = (event) => {
    event.preventDefault();
    setshowaddresspopup(true);
  };

  if (localStorage.getItem("trancationid")) {
    return (
      <div className="flex flex-wrap justify-center">
        <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
      </div>
    );
  }

  const renderFooter = (name) => {
    return (
      <div>
        <div className="my-5 mx-3 flex justify-between items-center">
          <div className="flex justify-center items-center space-x-4">
            {/* <button className="bg-blue-50 p-2 text-sm font-semibold rounded-lg border-brand-secondary border hover:bg-blue-100" onClick={openCustumAddressWindow}>Add New Address</button> */}
            {/* {!isAdd ? (
              <MinusIcon onClick={onChangeAdd} className="w-6 h-6" />
            ) : (
              <PlusIcon onClick={onChangeAdd} className="w-6 h-6" />
            )} */}
          </div>
        </div>

        <button
          onClick={() =>{
            onHide(name)
            SelectAddress(radioChecked);
          }}
          className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
        >
          Ok
        </button>
      </div>
    );
  };

  const coupon = () => {





    if (couponCode == "") {
      setCouponVerify("Please enter valid Coupon code");
      return;
    }

    let amountLocalStorage = JSON.parse(localStorage.getItem("couponCode"));

    console.log('amountLocalStorage',amountLocalStorage)
    console.log('amountLocalStorage',couponCode)

    if(amountLocalStorage ===couponCode){
      return
    }

    let cart = { ...cartList };
    let payloads = {
      customer_identifier: cart?.patientId,
      total_transaction_cost: +totalAmountFinal.toFixed(2),
      cart_id: cart?.cartId,
      transaction_id: new Date(new Date()).getTime(),
      voucher_code: couponCode,
      total_medicine_bill: medicineTotalAmountFinal,
      customer_type: "Registered",
      total_labtest_bill: labTotalAmountFinal,
    };

    console.log("is request apply coupan", payloads);

    dispatch(onApplyCoupon(payloads)).then((res) => {
      localStorage.setItem("couponCode", JSON.stringify(couponCode));
      if (res.data.errors == null) {
        setCouponVerify("Coupon Applied");

        localStorage.setItem("couponCode", JSON.stringify(couponCode));

        setTotalAmount(res.data.totalDiscountedTransactionCost);

        setMedicineTotalDiscountAmount(res?.data?.totalDiscountedMedicineBill);
        setLabTotalDiscountAmount(res?.data?.totalDiscountedLabTestBill);

        setCouponApplyAmt(res?.data?.totalDiscountPercentage);

        setTotalDiscountAmount(
          totalAmountFinal.toFixed(2) - res.data.totalDiscountedTransactionCost
        );

        setCouponApply(true);
        dispatch(getCartDetails(userData.code));
      } else {
        setTotalDiscountAmount(0)
        setCouponVerify(res.data.errors[0].message);
        setCouponApply(false);
        dispatch(getCartDetails(userData.code));
      }

      console.log("is coupan response", res);
    });
  };

  const couponApplyAt = (item, i) => {
    setShowLoader(true);

    setCouponCode(item?.voucherCode);

    let cart = { ...cartList };
    let payloads = {
      customer_identifier: cart?.patientId,
      total_transaction_cost: totalAmount,
      cart_id: cart?.cartId,
      transaction_id: new Date(new Date()).getTime(),
      voucher_code: item?.voucherCode,
      total_medicine_bill: medicineDiscountAmount
        ? parseFloat(medicineDiscountAmount).toFixed(2)
        : parseFloat(medicineTotalAmount).toFixed(2),
      customer_type: "Registered",
      total_labtest_bill: labDiscountAmount
        ? parseFloat(labDiscountAmount).toFixed(2)
        : parseFloat(labTotalAmount).toFixed(2),
    };
    dispatch(onApplyCoupon(payloads))
      .then((res) => {
        setShowLoader(false);

        if (res.data.errors == null) {
          setCouponVerify("Coupon Applied");
          let labAmount = labDiscountAmount
            ? labDiscountAmount
            : labTotalAmount;
          let medAmount = medicineDiscountAmount
            ? medicineDiscountAmount
            : medicineTotalAmount;
          setTotalDiscountAmount(
            labAmount +
              medAmount -
              (res?.data?.totalDiscountedMedicineBill +
                res?.data?.totalDiscountedLabTestBill)
          );
          setTotalAmount(res.data.totalDiscountedTransactionCost);

          setMedicineTotalDiscountAmount(
            res?.data?.totalDiscountedMedicineBill
          );
          setLabTotalDiscountAmount(res?.data?.totalDiscountedLabTestBill);

          setCouponApplyAmt(res?.data?.totalDiscountPercentage);

          let list = [...couponList];
          list[i].isDefault = true;
          setCouponList(list);
          setCouponApply(true);
          dispatch(getCartDetails(userData.code));
        } else {
          setCouponVerify(res.data.errors[0].message);
          setCouponApply(false);
        }
      })
      .catch((err) => setShowLoader(false));
  };

  const onGetCouponCode = (code) => {
    setCouponCode(code);
  };

  const checkIsAddressSelectedinPopUp = (data) => {
    filterPopup.data.map((res) => {
      if (res.id == data.id) {
        setAddressChecked(res.id);
      }
    });
  };

  console.log("addressxxx",filterPopup);


  return (
    <>
      {/* breadcrumbs */}
      <ToastContainer />

      <ul className="hidden lg:flex text-brand-secondary text-sm lg:text-base pl-4 pt-5">
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
          <a>Cart</a>
        </li>
      </ul>
      <br />

      <Upload_pres
        documentType={"Prescription"}
        title={"Quick Order with Prescription"}
        subTitle={"Upload prescription & tell us what you need. We do the rest"}
      />
      {showLoader && (
        <div className="flex flex-wrap justify-center  absolute left-0 right-0 top-20">
          <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
        </div>
      )}
      <div className="lg:flex mb-20 mt-8 md:pl-4 md:mr-5">
        <div className="lg:w-8/12">
          <SectionContainer
            link={""}
            title={"Items in your cart"}
            subtitle={""}
            seeAll={"hide"}
          />

          <hr className="m-3 mx-3 " />
          <div className="ml-2 mr-4 flex justify-between">
            <p className="font-medium  text-gray-primary text-md">
              Product Details
            </p>
            {isMed ? (
              <MinusIcon onClick={onChangeMed} className="w-6 h-6" />
            ) : (
              <PlusIcon onClick={onChangeMed} className="w-6 h-6" />
            )}
          </div>
          {isMed && (
            <div>
              {patientMedicineOrder &&
                patientMedicineOrder?.length > 0 &&
                patientMedicineOrder.map((res2) => {
                  return res2.patientMedicineOrderDetailsList?.length > 0 ? (
                    <div className="m-auto md:-ml-3 lg:ml-0 bg-white lg:m-2 mt-5 p-2">
                      {res2.patientMedicineOrderDetailsList.map((res, i) =>
                        res.status == 1 ? (
                          <div className="  bg-white items-center flex shadow-lg mb-3 lg:mb-2 border border-gray-300 rounded-md lg:px-2 lg:w-full">
                            <div className="p-2 md:p-5 h-15 lg:h-auto lg:w-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
                              <img
                                src={pills}
                                alt="tablet"
                                className="h-20 lg:h-12 w-20 lg:w-12"
                              />
                            </div>
                            <div className="w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r p-2 lg:p-1 md:p-4 flex flex-col justify-between leading-normal">
                              <div className="md:flex justify-between">
                                <div className="mt-3 lg:mt-1 md:w-1/4">
                                  <div>
                                    <p className="text-md text-gray-800 flex items-center font-medium lg:font-medium">
                                      {res.drugName}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center mt-0 md:w-5/12 lg:ml-10">
                                  <p className="text-sm lg:text-base font-normal pt-0 pr-4 mt-1 lg:mt-0">
                                    Quantity :
                                  </p>
                                  <p className="text-gray-700 text-base">
                                    <div className="  flex space-x-2 bg-transparent text-blue-700 py-2 lg:py-1 px-2 lg:px-2 border border-gray-300 hover:border-transparent rounded">
                                      <img
                                        src={minus}
                                        alt="minus"
                                        className="w-3 cursor-pointer "
                                        onClick={(e) => {
                                          const quantity = res.quantity;
                                          if (quantity > 1) {
                                            quantityUpdate(
                                              e,
                                              res,
                                              quantity - 1,
                                              i
                                            );
                                          } else {
                                            deleteCartItem(e, {
                                              medicineId: res.id,
                                            });
                                          }
                                        }}
                                      />
                                      <p className="text-xs w-5 h-4 bg-green-500 rounded text-center text-white">
                                        {" "}
                                        {res.quantity
                                          .toString()
                                          .padStart(2, "0")}
                                      </p>
                                      <img
                                        src={plus}
                                        alt="plus"
                                        onClick={(e) => {
                                          const quantity = res.quantity;
                                          // if (quantity <= medicine.quantity)
                                          quantityUpdate(
                                            e,
                                            res,
                                            quantity + 1,
                                            i
                                          );
                                        }}
                                        className="w-3 cursor-pointer "
                                      />
                                    </div>
                                  </p>
                                </div>

                                <div className="   flex items-center mt-3 lg:mt-0 md:w-1/3">
                                  <p className="text-gray-900 leading-none text-sm lg:text-base font-normal pt-0">
                                    Price :{" "}
                                  </p>
                                  <p className="text-black font-medium text-base pl-2">
                                    ₹{" "}
                                    {res?.totalAmount > 0
                                      ? res?.totalAmount.toFixed(2)
                                      : parseFloat(res?.unitPrice).toFixed(2)}
                                  </p>
                                  {res?.discountAmount ? (
                                    <p className="text-xs line-through text-gray-500  pl-8">
                                      {" "}
                                      ₹{" "}
                                      {parseFloat(
                                        res?.unitPrice * res?.quantity
                                      ).toFixed(2)}{" "}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>

                                <div className="flex mt-1 justify-end lg:justify-center md:w-1/12">
                                  {/* <img src={heart} alt="heart" className=" w-4 mr-2 cursor-pointer" /> */}
                                  <DeleteIcon
                                    style={{ color: "#D22B2B" }}
                                    className="cursor-pointer"
                                    onClick={(e) => {
                                      deleteCartItem(e, {
                                        medicineId: res.id,
                                      });
                                    }}
                                  />
                                </div>
                                {/* <p className="text-xs text-green-500 mt-4">Delivery between June  30 06:00 PM-10:00 PM</p> */}
                              </div>
                            </div>
                          </div>
                        ) : null
                      )}
                      <div className="flex items-center">
                        {checkPrescriptionRequired(res2) &&
                        !checkPrescriptionUploaded(res2) ? (<>
                          <button
                            onClick={() => {
                              clicktype("drug" + res2.id);
                            }}
                            disabled={isPrescriptionUploaded.loading}
                            className="w-56 md:w-auto mr-2 flex items-center text-xs md:text-md justify-center md:text-right content-end bg-brand-secondary text-white font-medium  py-2 px-4 rounded-md disabled:opacity-50"
                          >
                            Upload Prescription
                            {isPrescriptionUploaded.loading && (
                              <div className="loader ml-2 float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5" />
                            )}
                          </button>
                          <span className="font-medium text-xs text-black-600" >(supports pdf, jpeg, png and jpg only)</span>
                          </>
                        ) : null}
                        {/* checkPrescriptionUploaded(res2) ? (
                          <button
                            onClick={() => {
                              ViewPrescription(res2);
                            }}
                            className=" mr-10 text-right content-end bg-brand-secondary text-white font-medium  py-2 px-4 rounded-md disabled:opacity-50"
                          >
                            View e-Prescription
                          </button>
                        ) :  */}
                        <input
                          ref={hiddenFileInput}
                          type="file"
                          id={"drug" + res2.id}
                          accept="application/image;application/pdf"
                          onChange={(e) => {
                            changeHandler(e.target.files[0], res2, "drugOrder");
                          }}
                          className="hidden"
                        />
                      </div>
                      {isPrescriptionUploaded.prescriptionUploaded &&
                      patientMedicineOrder &&
                      patientMedicineOrder?.length > 0 ? (
                        <div
                          style={{ width: "fit-content" }}
                          className="mt-4 relative"
                        >
                          <i
                            onClick={() => {
                              localStorage.removeItem("prescriptionDoc");
                              setisPrescriptionUploaded({
                                isPrescriptionUploaded: false,
                                prescriptionDoc: "",
                                docType: "",
                              });
                            }}
                            className="pi pi-times absolute -right-5 -top-2 cursor-pointer"
                          ></i>
                          {isPrescriptionUploaded.docType.toLowerCase() ==
                          "pdf" ? (
                            <div className="relative">
                              <div
                                className="absolute cursor-pointer"
                                style={{ height: "100px", width: "100px" }}
                                onClick={() => {
                                  setOpen(true);
                                }}
                              ></div>
                              <iframe
                                style={{ zIndex: -10 }}
                                height="100px"
                                width="100px"
                                className="border rounded cursor-pointer"
                                src={`${process.env.REACT_APP_IMG_BASEURL}${isPrescriptionUploaded.prescriptionDoc}`}
                              ></iframe>

                              <div className="mt-6 text-brand-primary">
                                <p
                                  className="text-sm lg:text-base font-normal  not-italic "
                                  style={{ color: "#005D8D" }}
                                >
                                  Uploaded Successful
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <img
                                onClick={() => setOpen(true)}
                                height="100px"
                                width="100px"
                                className="border rounded cursor-pointer"
                                src={`${process.env.REACT_APP_IMG_BASEURL}${isPrescriptionUploaded.prescriptionDoc}`}
                              />

                              <div className="mt-6 text-brand-primary">
                                <p
                                  className="text-sm lg:text-base font-normal  not-italic "
                                  style={{ color: "#005D8D" }}
                                >
                                  Uploaded Successful
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    ""
                  );
                })}
            </div>
          )}

          {isMed && <hr className="m-3 mx-3" />}

          {isDia && (
            <div>
              <div className="ml-2 mr-4 flex justify-between">
                <span className="font-normal font-rubik text-gray-primary text-md mt-2">
                  My Family
                </span>

                <FamilyDropdownCart title={""} onSelect={loadPaymentFor} />
              </div>
            </div>
          )}
          {!isMed && <hr className="m-3 mx-3" />}
          {!isDia && (
            <div className="my-5 mx-3 flex justify-between">
              <p className="font-medium fonr-rubik text-gray-primary text-md ">
                Diagnostics Prescribed
              </p>
              {isDia ? (
                <MinusIcon onClick={onChangeDia} className="w-6 h-6" />
              ) : (
                <PlusIcon onClick={onChangeDia} className="w-6 h-6" />
              )}
            </div>
          )}
          {isDia && (
            <div className="mb-5">
              {patientLabTestsOrder &&
                patientLabTestsOrder?.length > 0 &&
                patientLabTestsOrder.map((res, i) => (
                  <LabCart
                    labDetails={res}
                    data={res?.patientLabTestsOrderDetailsList}
                    id={res.id}
                    patientLabTestsOrder={patientLabTestsOrder}
                    deleteTest={deleteCartItem}
                    setPreferredDate={setPreferredDate}
                    setPreferredLabDate={setPreferredLabDate}
                  />
                ))}
            </div>
          )}
          <hr className="m-3 mx-3" />

          <div className="my-5 mx-3 flex justify-between items-center">
            <p className="font-medium  text-gray-primary text-md ">
              Address Details
            </p>

            <div className="flex justify-center items-center space-x-4">
              <button
                className="bg-blue-50 p-2 text-sm font-semibold rounded-lg border-brand-secondary border hover:bg-blue-100"
                onClick={openCustumAddressWindow}
              >
                <AddIcon />
                Add New Address
              </button>
            </div>
          </div>

          <div>
            {showAddress?.length > 0 &&
              showAddress?.map((res) => (
                <div>
                  {/* {res.isDefault == 1 ? */}
                  <div>
                    {/* {!isAdd ? ( */}

                    <div>
                      {res?.address1 === null ||
                      res?.address1 === "" ||
                      res?.address2 === null ||
                      res?.address1 === undefined ||
                      res?.address2 === undefined ||
                      res?.address2 === "" ||
                      res?.city === undefined ||
                      res?.city === null ||
                      res?.city === "" ||
                      res?.pinCode === null ||
                      res?.pinCode === undefined ||
                      res?.pinCode === "" ? (
                        <div className="flex justify-center">
                          <p className=" text-brand-primary m-6">
                            Please Add Address
                          </p>{" "}
                        </div>
                      ) : (
                        <div className="mb-5 flex flex-col lg:mx-0 md:mx-4 overflow-x-auto hide-scroll-bar break-words lg:w-full">
                          <div className="flex justify-between border m-2 rounded-lg p-2">
                            <div className="flex">
                              <div className="text-gray-primary w-full ml-2  font-medium  text-base">
                                <span className="font-semibold">
                                  <p className=" mb-2 text-brand-primary">
                                    {res.type == undefined
                                      ? "Others"
                                      : res.type}
                                  </p>
                                </span>
                                <p className="flex flex-wrap">
                                  {" "}
                                  {res.address1 && res.address1?.length > 30
                                    ? res.address1.substr(0, 30) + "..."
                                    : res.address1}
                                  ,{" "}
                                  {res.address2 && res.address2?.length > 30
                                    ? res.address2.substr(0, 30) + "..."
                                    : res.address2}
                                </p>
                                <p>
                                  {" "}
                                  {res.city},{res.state},{res.pinCode}{" "}
                                </p>
                              </div>
                            </div>

                            {/* <img className="flex h-8 items-center cursor-pointer rounded-lg p-1 transition hover:-translate-y-1 hover:scale-110  duration-300 ..." src={delet} alt="DeleteIcon" /> */}

                            {/* <img className="flex h-6 items-center" src={delet} alt="DeleteIcon" /> */}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            {showAddress?.length < 1 && (
              <div className="flex justify-center  text-brand-primary m-10">
                <p>Please Add Address</p>
              </div>
            )}
          </div>
          {/* ): (
            <div className="flex justify-center  text-brand-primary"><p>Please Add Address</p></div>
          )

          }  */}
          <div className="flex flex-col md:flex-row justify-between mr-2 mb-10">
            <button
              onClick={(e) => openMenu(e)}
              className="text-sm bg-transparent w-9/12 md:w-auto m-auto  md:ml-2 font-medium  text-brand-secondary text-white py-2 px-4 border border-brand-secondary rounded-md"
            >
              Change Address
            </button>

            <div className="hidden lg:block">
              <button
                onClick={(e) => {
                  redirectTo(e, APP_ROUTES.DASHBOARD);
                }}
                className=" ml-5 text-sm bg-transparent font-medium  text-brand-secondary text-white py-2 px-4 border border-brand-secondary rounded-md"
              >
                Search More
              </button>
              {patientaddressinfoData && (
                <button
                  onClick={() => {
                    // redirectTo(e, APP_ROUTES.MEDICINE_PAYMENT)
                    DoPayment("");
                  }}
                  className=" ml-4 text-sm content-end  text-white font-medium  py-2 px-4 rounded-md disabled:opacity-50"
                  style={{ background: "#66B889" }}
                  disabled={addressIndex < 0}
                >
                  Checkout
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="lg:w-4/12 ">
          <CartPrice
            m_Amount={medicineTotalAmount}
            m_DisAmount={medicineDiscountAmount}
            l_Amount={labTotalAmount}
            l_DisAmount={labDiscountAmount}
            totalDiscountAmount={totalDiscountAmount}
            totalAmount={totalAmount}
            updateTotal={updateTotalAmount}
            setTxnId={setTxId}
            code={setTcode}
            discountAmt={updateDiscount}
            couponList={couponList}
            onClickAt={onClickAt}
            onGetCouponCode={onGetCouponCode}
            couponCode={couponCode}
            couponVerify={couponVerify}
            coupon={coupon}
            couponApplyAmt={couponApplyAmt}
            isCouponApply={isCouponApply}
          />
        </div>
        <div className="lg:hidden flex justify-end mr-3 mb-10 mt-4 lg:mt-1">
          <button
            onClick={(e) => {
              redirectTo(e, APP_ROUTES.DASHBOARD);
            }}
            className=" ml-5 text-sm bg-transparent font-medium  text-brand-secondary text-white py-2 px-4 border border-brand-secondary rounded-md"
          >
            Search More
          </button>
          {patientaddressinfoData && (
            <button
              onClick={() => {
                // redirectTo(e, APP_ROUTES.MEDICINE_PAYMENT)
                DoPayment("");
              }}
              className=" ml-4 text-sm content-end  text-white font-medium  py-2 px-4 rounded-md disabled:opacity-50"
              style={{ background: "#66B889" }}
              disabled={addressIndex < 0}
            >
              Checkout
            </button>
          )}
        </div>
      </div>

      {isOpen ? (
        <Dialog
          header=""
          visible={isOpen}
          modal={true}
          style={{ width: "80vw" }}
          onHide={() => setOpen(false)}
        >
          <div className="flex justify-center">
            {isPrescriptionUploaded.docType.toLowerCase() == "pdf" ? (
              <iframe
                width="100%"
                height="500px"
                src={`${process.env.REACT_APP_IMG_BASEURL}${isPrescriptionUploaded.prescriptionDoc}`}
              ></iframe>
            ) : (
              <img
                style={{ width: "500px", height: "500px" }}
                src={`${process.env.REACT_APP_IMG_BASEURL}${isPrescriptionUploaded.prescriptionDoc}`}
                alt="profile image"
                class="w-12"
              />
            )}
          </div>
        </Dialog>
      ) : (
        ""
      )}
      {isUserReadyToPay ? (
        <Dialog
          header="Select Payment Mode"
          visible={isUserReadyToPay}
          modal={true}
          className="w-11/12 md:w-96"
          onHide={() => setIsUserReadyToPay(false)}
        >
          <div>
            <div>
              <div
                className="flex  font-medium text-sm justify-between items-center py-2 px-6 rounded mb-2 cursor-pointer"
                style={{
                  backgroundColor: "#e5e6e7",
                  border: selectedPayMode.wallet ? "2px solid #66B889" : "",
                }}
                onClick={() =>
                  setSelectedPayMode({ wallet: true, card: false })
                }
              >
                CureBay wallet - Rs{" "}
                {walletinfo?.patientwalletinfoData?.balance &&
                  walletinfo?.patientwalletinfoData?.balance.toFixed(2)}{" "}
                <i className="pi pi-angle-right"></i>
              </div>
            </div>
            <div
              className="flex justify-between  font-medium text-sm items-center py-2 px-6 rounded cursor-pointer"
              style={{
                backgroundColor: "#e5e6e7",
                border: selectedPayMode.card ? "2px solid #66B889" : "",
              }}
              onClick={() => setSelectedPayMode({ wallet: false, card: true })}
            >
              Debit/Credit Cards/UPI & Others{" "}
              <i className="pi pi-angle-right"></i>
            </div>
            {(moment().hour() >= 20 || moment().hour() <= 7)  ? (
              <p className="font-medium text-sm items-center py-2">
                Note -
                {`Your order will be delivered on ${
                  moment().hour() >= 0 && moment().hour() <= 8
                    ? moment().format("DD-MM-YYYY")
                    : moment().add(1, "days").format("DD-MM-YYYY")
                }. after 8:00am`}
              </p>
            ) : null}
            <div className="text-center">
              <button
                className=" font-normal text-xs py-2 px-6 rounded mt-4"
                style={{ backgroundColor: "#66B889", color: "#ffff" }}
                onClick={DoPay}
              >
                Pay
                {loadingDuringPayment && (
                  <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>
                )}
              </button>
            </div>
            {errorDuringPay.length > 0 ? (
              <div style={{ color: "red" }} className="font-normal text-sm">
                {" "}
                {errorDuringPay}{" "}
              </div>
            ) : (
              ""
            )}
          </div>
        </Dialog>
      ) : (
        ""
      )}

      {showaddresspopup ? (
        <Addaddresspopup
          onClose={() => {
            setshowaddresspopup(false);
          }}
        ></Addaddresspopup>
      ) : null}

      {filterPopup.flag && (
        <Dialog
          header="Select Address"
          visible={filterPopup.flag}
          modal={false}
          resizable={false}
          draggable={false}
          // style={{ width: "50vw", height: "auto" }}
          className="w-11/12 md:w-8/12 lg:w-1/2 h-auto "
          footer={renderFooter("displayModal")}
          onHide={() => onHide("displayModal")}
        >
          {/* {console.log("response11", patientaddressinfoData)} */}
          <div className="h-96 lg:h-auto overflow-y-auto hide-scroll-bar">
            {/* {console.log("response11", patientaddressinfoData)} */}
            {filterPopup.data.length ? (
              filterPopup.data?.filter((res=>res?.address1 !== null ||
                    res?.address1 !== "" ||
                    res?.address2 !== null ||
                    res?.address1 !== undefined ||
                    res?.address2 !== undefined ||
                    res?.address2 !== "" ||
                    res?.city !== undefined ||
                    res?.city !== null ||
                    res?.city !== "" ||
                    res?.pinCode !== null ||
                    res?.pinCode !== undefined ||
                    res?.pinCode !== "")).map((res, i) => (
                <div>

                      <div className="flex justify-between border m-2 rounded-lg p-2">
                        <div className="flex">
                          <input
                            type="radio"
                            className="mr-2 mb-20 radio-aligned"
                            checked={isAddressChecked == res.id ? true : false}
                            // checked={res.isDefault == 1 ? true : false}
                            onChange={() => {
                              setRadioChecked(res);
                              checkIsAddressSelectedinPopUp(res);

                            }}
                          />

                          <div className="text-gray-primary w-52 ml-5  font-medium  text-base">
                            <span className="font-semibold">
                              <p className=" mb-2 text-brand-primary">
                                {res.type == undefined ? "Others" : res.type}
                              </p>
                            </span>
                            <p className="flex flex-wrap">
                              {" "}
                              {res.address1 && res.address1?.length > 30
                                ? res.address1.substr(0, 10) + "..."
                                : res.address1}{" "}
                              {res.address2 && res.address2?.length > 30
                                ? res.address2.substr(0, 10) + "..."
                                : res.address2}
                            </p>
                            <p>
                              {" "}
                              {res.city},{" "}{res.state},{" "}{res.pinCode}{" "}
                            </p>
                            {/* && res.address2.length > 50 */}
                          </div>
                        </div>

                        <img className="flex h-6 ml-56 items-center cursor-pointer" />
                      </div>


                </div>
              ))
            ) : (
              <div className="flex justify-center">
                <p className=" text-brand-primary m-6">Please Add Address</p>{" "}
              </div>
            )}
          </div>
        </Dialog>
      )}

      <Dialog
        visible={openDialog}
        showHeader={true}
        modal={true}
        header={
          <div className="font-normal text-center text-md">
            Please select coupon for better discount
          </div>
        }
        // style={{ width: "500px"}}
        className="w-11/12 md:w-auto h-auto shadow-lg"
        onHide={() => setDialog(false)}
      >
        <>
          <div className="text-center">
            <div className="md:flex gap-3 justify-around mt-5">
              <button
                className="my-2 w-40 bg-brand-primary text-sm h-6 rounded-md text-white font-normal "
                onClick={() => setDialog(false)}
              >
                Select Coupon
              </button>

              <button
                className="my-2 w-60 bg-brand-primary text-sm h-6 rounded-md text-white font-normal "
                onClick={() => DoPayment("withoutcoupon")}
              >
                Proceed without Coupon
              </button>
            </div>
          </div>
        </>
      </Dialog>
    </>
  );
}
export default MedicineCart;
