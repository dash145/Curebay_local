import akshay from "../Assets/Images/avatar.png";
import steth from "../Assets/Images/steth.svg";
import select from "../Assets/Images/select.svg";
import { useHistory, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { bookDoctorAppointment, confirmPostDoctorAppointment } from "../Redux/Actions/doctorAction";
import { useDispatch, useSelector } from "react-redux";
import Addmemberpopup from "./userprofilecomponents/addmemberpopup";
import moment from "moment";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import { USERPROFILE_ROUTES } from "../application/Router/constants/UserProfileRoutes";
import { memberColor } from "../config/constant";
import Down_Arrow from "../Assets/Images/Down_Arrow.svg";
import Up_Arrow from "../Assets/Images/Up_Arrow.svg";
import Markk from "../.../../Assets/Images/Markk.png";
import { ToastContainer, toast } from "react-toastify";
import { Dialog } from "primereact/dialog";
import http from "../Redux/services/http-common";
import { walletdetails, walletTransactiondetails } from '../Redux/Actions/UserprofileActions';
import {
  onApplyCoupon,
  getPatientfamilymembers,
  getCouponList,
  getCouponListDoctor
} from "../Redux/Actions/UserprofileActions";
import DoctorService from "../Redux/services/doctorService"
function Payment() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const userData = useSelector((state) => state.authReducer.patientData);
  const familymemberinfo = useSelector((state) => state.familymembers);
  const patientinfo = useSelector((state) => state.patientinfo);
  const [openDialog, setDialog] = useState(false);
  const { patientinfoData, isLoading } = patientinfo;
  const { FamilymembersData } = familymemberinfo;
  const [tId, settId] = useState("");
  const [showaddmemberpopup, setshowaddmemberpopup] = useState(false);

  const couponDoctor = useSelector((state) => state.couponDoctor);

  const { couponListDoctor } = couponDoctor

  const [isShowCouponList, setShowCouponList] = useState(true);
  const [addressIndex, setAddressIndex] = useState(-1);


  const walletinfo = useSelector((state) => state.patientwallet);
  const [loadingDuringPayment, setLoadingDuringPayment] = useState(false)
  const [errorDuringPay, setErrorDuringPay] = useState("")
  const [selectedPayMode, setSelectedPayMode] = useState({
    wallet: false,
    card: false
  })
  const [isUserReadyToPay, setIsUserReadyToPay] = useState(false)
  const [isPrescriptionUploaded, setisPrescriptionUploaded] = useState([
    { id: "" },
  ]);
  const [message, setMessage] = useState("")
  const [availablePackage, setAvailablePackages] = useState([])
  const search = useLocation().search;
  const search_query = new URLSearchParams(search).get('q');
  const id_search_param = new URLSearchParams(search).get('id');
  const reason_search_param = new URLSearchParams(search).get('reason');
  const rel_search_param = new URLSearchParams(search).get('rel');
  const key_search_param = new URLSearchParams(search).get('key');


  const [memberList, setMemeberList] = useState([]);
  let state;
  const [formData, setFormData] = useState({
    couponCode: "",
  });
  const [oldDiscount, updateDiscount] = useState(0);
  const [oldTotal, updateTotal] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [verify, upDateverify] = useState("");
  const [couponCodeMsg, setCouponVerify] = useState("");
  const [couponApplyAmt, setCouponApplyAmt] = useState(0);
  const [complain, setComplain] = useState(reason_search_param ? reason_search_param : "");
  const [patient, setPatient] = useState();
  const [couponList, setCouponList] = useState([]);
  const [toshowcomplain, setShowComplain] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState({
    packageName: "",
    remaining: "",
    packageIds: "",
    packageCode: ""
  })
  if (localStorage.getItem("state")) {
    state = JSON.parse(localStorage.getItem("state"));
  } else {
    state = location.state;
  }

  useEffect(() => {
    updateTotal(state?.amount);
  }, [state?.amount]);


  useEffect(() => {
    dispatch(walletdetails(userData.code));
    dispatch(walletTransactiondetails(userData.code));
    console.log(state, "iiugiuiububuibouboubuo");
    let consulationType = state?.consultationsType == "V" ? "APPT_VIDEO" : "APPT_INPERSON"
    DoctorService.getPackagesForDoctorPayment(userData.code, consulationType, state?.doctorType).then(res => {
      setAvailablePackages(res.data.data)
    }).catch(err => {
      console.log(err);
    })
    // debugger
  }, [userData.code]);


  //const { couponCode } = formData;


  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const coupon = async () => {
    if (couponCode == "") {
      setCouponVerify("Please enter valid Coupon code");
      upDateverify(false);
      return;
    }


    let payloads = {
      customer_identifier: userData.code,
      total_transaction_cost: state?.amount,
      cart_id: state?.userId,
      transaction_id: new Date(new Date()).getTime(),
      voucher_code: couponCode,
      total_medicine_bill: 0.0,
      total_labtest_bill: 0.0,
      customer_type: "Registered",
      total_doctor_bill: state?.amount,
    };

    console.log("is request apply coupan", payloads);
    dispatch(onApplyCoupon(payloads)).then((res) => {
      if (res.data.errors == null) {

        localStorage.setItem("voucherCode", JSON.stringify(couponCode));
        localStorage.setItem("voucherTransId", JSON.stringify(res?.data?.transactionId));

        setCouponVerify("Coupon Applied");
        console.log("issss", JSON.stringify(res));
        upDateverify(true);
        updateTotal(res?.data?.totalDiscountedDoctorBill);

        setCouponApplyAmt(res?.data?.totalDiscountPercentage);
      } else {
        setCouponVerify(res.data.errors[0].message);
      }

      console.log("is coupan response", res);
    });
  };

  const hideShow = () => {
    if (isShowCouponList) {
      setShowCouponList(false);
    } else {
      setShowCouponList(true);
    }
  };

  useEffect(() => {

    console.log('sdfnksdn', JSON.stringify(couponDoctor))


    if (couponListDoctor?.data?.vouchersList.length > 0) {
      setCouponList([...couponListDoctor.data.vouchersList]);
    } else {
      dispatch(getCouponListDoctor(userData?.code, 'v_doctor')).then((res) => {
        setCouponList([...res.data.vouchersList]);
      });
    }




  }, [couponListDoctor]);

  const onClickAt = (item, i) => {
    setAddressIndex(i);

    let list = [...couponList];
    list.map((item) => {
      item.isDefault = false

    })
    list[i].isDefault = true;
    setCouponList(list);
    setCouponCode(item?.voucherCode);
    //couponApplyAt(item, i);
  };



  const addSelf = () => {
    let data = {};
    data.firstName = userData.firstName;
    data.code = userData.code;
    data.relation = "Self";
    data.photoName = userData.photoName;
    data.email = userData.email
    var list = FamilymembersData;
    list.unshift(data);
    setMemeberList(FamilymembersData
      // list.filter(
      //   (v, i, a) => a.findIndex((t) => t.relation === v.relation) === i
      // )
    );
    console.log(
      "uniq list",
      list.filter(
        (v, i, a) => a.findIndex((t) => t.relation === v.relation) === i
      )
    );
    setPatient(data);
  };

  useEffect(() => {
    if (userData.code) {
      addSelf();
    }
    console.log(localStorage.getItem("paymentStatus"), localStorage.getItem("trancationid"), localStorage.getItem("state"), "dssdnoidfsdhfodu");
    if (
      localStorage.getItem("paymentStatus") &&
      localStorage.getItem("trancationid") &&
      localStorage.getItem("state")
    ) {
      redirectTo(localStorage.getItem("trancationid"));
      localStorage.removeItem("paymentStatus");
    } else if (
      localStorage.getItem("paymentStatus") === "failure" &&
      localStorage.getItem("paymentRemarks")
    ) {
      // toast(localStorage.getItem("paymentRemarks"));
      localStorage.removeItem("paymentStatus")
      localStorage.removeItem("paymentRemarks")
    }
  }, [userData, FamilymembersData]);

  // useEffect(()=>{

  // })

  const redirectTo = async (txnid) => {
    try {
      console.log(JSON.parse(localStorage.getItem("state")), 'ssdsdfhdoufsoudh');
      let state = JSON.parse(localStorage.getItem("state"));
      let data = state;
      let patient = JSON.parse(localStorage.getItem("patient"));
      let oldTotal = JSON.parse(localStorage.getItem("totalAmount"));
      let key_search_param = localStorage.getItem("key_search_param")
      let id_search_param = localStorage.getItem("id_search_param");
      let rel_search_param = localStorage.getItem("rel_search_param");
      let voucherCode = JSON.parse(localStorage.getItem("voucherCode"));
      let voucherTransId = JSON.parse(localStorage.getItem("voucherTransId"));

      let packagePayment = localStorage.getItem("payMode");
      data["txnId"] = localStorage.getItem("trancationid")
      data["consultationsReason"] = JSON.parse(
        localStorage.getItem("complain")
      );
      console.log(rel_search_param, id_search_param, "sfiwhgpwiehpiwehbvipwe");
      if (rel_search_param !== "null") {
        data["relation"] = rel_search_param
      } else {
        data["relation"] = patient.relation;
      }
      if (id_search_param !== "null") {
        data["patientId"] = id_search_param;
      } else {
        data["patientId"] = patient.code;
      }
      data["totalAmount"] = oldTotal
      data["payMode"] = packagePayment
      data["voucherCode"] = voucherCode
      data["voucherTransId"] = voucherTransId
      // console.log("dsisdvoshvsiov", data , patient, JSON.parse(localStorage.getItem("trancationid")),oldTotal, packagePayment);
      if (key_search_param !== "null") {
        data["isConfirm"] = 1
        dispatch(confirmPostDoctorAppointment(key_search_param, data))
      } else {
        dispatch(bookDoctorAppointment(data));
      }
      localStorage.removeItem("state");
      localStorage.removeItem("complain");
      localStorage.removeItem("redirectUrl");
      localStorage.removeItem("totalAmount");
      localStorage.removeItem("patient");
      localStorage.removeItem("paymentStatus");
      localStorage.removeItem("trancationid");
      localStorage.removeItem("payMode");
      localStorage.removeItem("key_search_param")
      localStorage.removeItem("id_search_param")
      localStorage.removeItem("rel_search_param")
      localStorage.removeItem("voucherCode");
      localStorage.removeItem("voucherTransId");
      console.log("dsisdvoshvsiov", data);
      history.push({ pathname: APP_ROUTES.APPOINMENT_CONFIRM, state: data });
    } catch (err) {
      console.log("dsisdvoshvsiov", localStorage.getItem("state"), localStorage.getItem("patient"), localStorage.getItem("trancationid"), localStorage.getItem("payMode"), localStorage.getItem("totalAmount"));


      localStorage.removeItem("state");
      localStorage.removeItem("complain");
      localStorage.removeItem("redirectUrl");
      localStorage.removeItem("totalAmount");
      localStorage.removeItem("patient");
      localStorage.removeItem("paymentStatus");
      localStorage.removeItem("trancationid");
      localStorage.removeItem("key_search_param")
      localStorage.removeItem("id_search_param")
      localStorage.removeItem("rel_search_param")
      localStorage.removeItem("payMode");
    }
  };

  const confirmAppontmentWithoutPay = async () => {
    try {
      let data = state;
      // data["txnId"] = localStorage.getItem("trancationid")
      data["consultationsReason"] = complain
      data["relation"] = patient.relation;
      data["patientId"] = patient.code;
      console.log(data, "sldvhsdvhsoduvh");
      dispatch(bookDoctorAppointment(data));
      setMessage("Our Customer support will contact you shortly for confirming the booking.")
      let clear = setTimeout(() => {
        clearTimeout(clear)
        setMessage("")
        history.push({ pathname: USERPROFILE_ROUTES.MYAPPOINTMENTS });
      }, 2500)
    } catch (err) {
      console.log("dsisdvoshvsiov", localStorage.getItem("state"), localStorage.getItem("patient"), localStorage.getItem("trancationid"), localStorage.getItem("payMode"), localStorage.getItem("totalAmount"));


      localStorage.removeItem("state");
      localStorage.removeItem("complain");
      localStorage.removeItem("redirectUrl");
      localStorage.removeItem("totalAmount");
      localStorage.removeItem("patient");
      localStorage.removeItem("paymentStatus");
      localStorage.removeItem("trancationid");

      localStorage.removeItem("payMode");
    }
  }

  console.log("complain", complain);

  const DoPayment = () => {
    if (complain.length == 0) {
      setShowComplain(true)

    } else {
      setShowComplain(false)
    }
    setTimeout(() => {
      if (complain.length == 0) {
        setShowComplain(false)



      }
    }, 3000);
    if (complain.length == 0 )
    {return
    }
    if (couponCode == "" && !openDialog) {
      setDialog(true)
      return
    }
    setIsUserReadyToPay(true)

  };


  const DoPay = async () => {


    setErrorDuringPay("")
    if (!selectedPayMode.wallet && !selectedPayMode.card) {
      toast("Please select payment mode.")
      return
    }
    let amount = oldTotal !== 0 ? oldTotal.toString() : 1;

    if (selectedPayMode.wallet) {
      if (amount > walletinfo?.patientwalletinfoData?.balance) {
        toast("Balance is not sufficient.")
        return;
      } else {
        setLoadingDuringPayment(true);

        let payload = {

          "patientCode": userData?.code,
          "doctorCode": state?.userId,
          "hospitalCode": state?.hospitalId,
          "locationCode": state?.locationId,
          "appointmentTimeFrom": state?.fromTime,
          "appointmentTimeTo": state?.toTime,
          "appointmentType": state?.consultationsType,
          "appointmentReason": reason_search_param ? reason_search_param : complain,
          "appointmentAmount": amount
        }
        let data = await http.put(`${process.env.REACT_APP_BASEURL}api/v1/payments/wallet/appointment`, payload)
        console.log(data, "dsjfsduhfoshfoisd");
        if (data.data.statusCode == 200) {
          setLoadingDuringPayment(false)
          setIsUserReadyToPay(false)
          let d = new Date();
          let txdId = tId ? tId : d.getTime().toString();
          localStorage.setItem("totalAmount", JSON.stringify(amount));
          localStorage.setItem("state", JSON.stringify(state));
          localStorage.setItem("complain", JSON.stringify(complain));
          localStorage.setItem("redirectUrl", APP_ROUTES.PAYMENT);
          localStorage.setItem("patient", JSON.stringify(patient));
          localStorage.setItem("trancationid", JSON.stringify(data.data.data.transcationId));
          localStorage.setItem("payMode", "CureBay wallet")
          localStorage.setItem("paymentRemarks", 'Your Order placed successfully')
          localStorage.setItem("key_search_param", key_search_param)
          localStorage.setItem("id_search_param", id_search_param)
          localStorage.setItem("rel_search_param", rel_search_param)
          redirectTo(data.data.data.transcationId)
        } else {
          setLoadingDuringPayment(false)
          setErrorDuringPay("Something went wrong try again.")
        }
      }
    }

    if (selectedPayMode.card) {

      let d = new Date();
      let txdId = tId ? tId : d.getTime().toString();
      let amount = oldTotal !== 0 ? oldTotal.toString() : 1;
      console.log("amount", amount);
      let firstName = patient.firstName.split(/\s/).join("");
      localStorage.setItem("totalAmount", JSON.stringify(amount));
      localStorage.setItem("state", JSON.stringify(state));
      localStorage.setItem("complain", JSON.stringify(complain));
      localStorage.setItem("redirectUrl", APP_ROUTES.PAYMENT);
      localStorage.setItem("patient", JSON.stringify(patient));
      localStorage.setItem("key_search_param", key_search_param)
      localStorage.setItem("payMode", "CC")
      localStorage.setItem("id_search_param", id_search_param)
      localStorage.setItem("rel_search_param", rel_search_param)
      const url =
        process.env.REACT_APP_PAYU_BASEURL +
        `patientId=${patient.code}&amount=${amount}&firstname=${firstName}&email=${patient.email}&phone=${patient.mobile}&productinfo=doctorpayment&udf1=Patient&service_provider=payu_paisa`;
      window.location.replace(url);

      // redirectAfterTxn("7575757858767");


    }
  }

  const selectPatient = (data) => {
    console.log("iohohiohoih", data);
    setPatient(data);
  };

  const redirectTos = (event) => {
    event.preventDefault();
    setshowaddmemberpopup(true);
    // history.push(USERPROFILE_ROUTES.ADDDMEMBERS);
  };

  console.log(state, "dvbdbvoudbu");

  useEffect(() => {
    dispatch(getPatientfamilymembers(userData.code));
  }, [showaddmemberpopup, patientinfoData, isLoading]);

  const onSelectPackage = (res) => {
    if (selectedPackageId.packageIds == res.id) {
      setSelectedPackageId("")
    } else {
      setSelectedPackageId({
        packageIds: res.id,
        packageName: res.packageName,
        remaining: res.remaining,
        packageCode: res.packageCode

      })
    }
  }

  const onRedeemNow = async () => {
    try {
      let data = state
      data["remaining"] = selectedPackageId.remaining;
      data["packageIds"] = selectedPackageId.packageIds;
      data["packageStatus"] = 1
      data["packageName"] = selectedPackageId.packageName
      data["packageCode"] = selectedPackageId.packageCode
      data["consultationsReason"] = complain
      // data["modifiedBy"] = patient.code
      data["email"] = patient.email ? patient.email : userData.email
      data["patientId"] = patient.code
      data["amount"] = null
      data["patientName"] = patient?.firstName + patient?.lastName
      console.log(data, "sadnsdlsoidbobvwdosd", patient);
      dispatch(bookDoctorAppointment(data));
      history.push({ pathname: APP_ROUTES.APPOINMENT_CONFIRM, state: data });
    } catch (err) {
    }
  }

  console.log(selectedPackageId, "selectedPackageId");

  return (
    <>
      <ToastContainer />
      <div className="block">
        <ul className="md:flex hidden  text-brand-secondary text-sm lg:text-base px-5 pt-5">
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
            <a href="/doctors">Doctor</a>
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
            <a>Payment</a>
          </li>
        </ul>
        <div className="flex justify-between flex-wrap">
          <div className="w-full md:w-8/12 h-auto mt-4 md:ml-5 pb-2 border border-gray-200">
            <div className="flex justify-between items-center mt-5">
              <div className="flex">
                <img src={select} alt="select" className="w-4 ml-3 " />
                <p className="pl-2 font-medium text-lg sm:text-2xl md:text-2xl lg:text-2xl text-brand-secondary">
                  Select a Patient
                </p>
              </div>
              <p
                onClick={redirectTos}
                className="text-sm text-brand-secondary font-medium pr-4 mt-1"
              >
                Add a Patient
              </p>
            </div>
            <div className="flex justify-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 ">
              {memberList.map((user, i) => (
                <div
                  key={i}
                  className="p-5 md:p-2 -mb-7 sm:-mb-7 md:-mb-2 lg:mb-2 cursor-pointer"
                  onClick={() => id_search_param ? null : selectPatient(user)}
                >
                  <div className="bg-white p-6 md:p-2  rounded-lg border">
                    <div className="flex pl-1 ">
                      <input
                        type="radio"
                        checked={user.code === (id_search_param ? id_search_param : patient.code)}
                        className="form-radio mt-4 mr-2"
                        name="accountType"
                        value="personal"
                      />
                      <div>
                        <img
                          src={
                            user.photoName
                              ? `${user.photoName}`
                              : akshay
                          }
                          alt=""
                          className="w-10 h-10 rounded-2xl"
                        />
                      </div>
                      <div className="">
                        <p className=" pl-3 text-sm font-medium">{user.name}</p>
                        {/* <p className=" pl-3 text-xs text-gray-400">
                          {user.relation}
                        </p> */}

                        <div
                          className={`h text-center px-2 flex justify-center bg-brand-${memberColor[user?.relation]
                            } rounded-2xl`}
                        >
                          <p className="text-sm text-white font-medium">
                            {user?.relation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative md:ml-5 mt-10 sm:mt-12 md:mt-10 lg:mt-7 w-full px-3 md:px-0">
              <div className="flex">
                {/* <lable className="py-2 w-36 text-xs text-gray-700 border-b-2 border-gray-300">Enter name of allergy </lable> */}
                <input
                  autocomplete="off"
                  id="chemicalAllergy"
                  name="chemicalAllergy"
                  maxLength="100"
                  type="text"
                  className="peer pl-2 bg-transparent w-full md:w-11/12 h-10 border-b border-gray-300 focus:outline-none truncate"
                  onChange={(e) => {
                    if (!reason_search_param) {
                      setComplain(e.target.value)
                    }
                  }}
                  placeholder="To book appointment, Please enter your Symptoms/Complaints"
                  value={complain}
                />

              </div>{
                toshowcomplain && <p><span style={{ color: 'red' }}>Please enter the Complain</span>{" "}</p>
              }

              <label
                for="chemicalAllergy"
                className="absolute md:left-0 -top-3.5  text-brand-manatee text-sm font-medium md:font-normal md:text-xs "
              >
                Chief Complaints <span style={{ color: 'red' }}>*</span>{" "}
              </label>
            </div>
            {availablePackage?.length ?
              <>
                <div className="ml-2 mt-4 font-bold text-md ">Available Packages to Redeem</div>
                <div className="flex my-2 mx-2 overflow-x-scroll overflow-auto">

                  {
                    availablePackage.map(res => {
                      return <div style={{ minWidth: "190px" }} className={` cursor-pointer rounded px-6 py-4 light-blue mr-2 ${res.id == selectedPackageId.packageIds ? "border border-blue-600" : ""}`} onClick={() => onSelectPackage(res)}>
                        <div className="font-medium text-sm mb-2"> {res.packageName} </div>
                        <div className="text-right font-normal text-sm"> Remaining: {res.remaining} </div>
                      </div>
                    })
                  }
                </div> </> : null}
            {!selectedPackageId.packageIds ? <div className="flex justify-end" > <button
              onClick={search_query == "confirm" ? confirmAppontmentWithoutPay : DoPayment}
              //disabled={((complain === "" ? true : false) || message ? true : false )}
              className="hidden md:block bg-brand-secondary mr-6 text-white  py-2 px-4 rounded text-sm mt-4 disabled:opacity-50"
            >
              {search_query == "confirm" ? "Confirm" : "Pay"}
            </button> </div> : <div className="flex justify-end"><button
              onClick={onRedeemNow}
              //disabled={complain === "" ? true : false}
              className="hidden md:block bg-brand-secondary mr-6 text-white  py-2 px-4 rounded text-sm mt-4 disabled:opacity-50"
            >
              Redeem Now
            </button> </div>}
            <div className="flex justify-end  font-medium text-sm text-green-600" >{message}</div>
          </div>

          <div className="w-full md:w-3/12 md:mr-6 mt-3">
            <div className="rounded-lg  bg-white-600 w-full  p-3 antialiased border border-gray-200">
              <p className="text-md font-medium text-gray-800">Price Detail</p>
              <hr />
              <div className="flex flex-wrap">
                <img src={steth} alt="stethescope" className="w-10 mt-2" />
                <div>
                  <div className="flex justify-between">
                    <p className="text-sm pl-2 pt-2">
                      {state?.userSalutation + " " + state?.userName}
                    </p>
                    <p className="text-xs pl-16 pt-3 text-green-600">
                      {moment(state?.whenAppointment, "MM/DD/YYYY").format(
                        "DD/MM/YYYY"
                      )}
                    </p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div
                      className={`h-4 text-center px-2 flex justify-center bg-brand-${memberColor[patient?.relation]
                        } rounded-2xl`}
                    >
                      <p className="text-xs text-white">{patient?.relation} </p>
                    </div>
                    <p className="text-sm mr-12">
                      {state?.consultationsType === "V" ? "Online" : "InPerson"}
                    </p>
                    <p className="text-xs font-medium">
                      {moment(state?.fromTime, "hh:mm").format("HH:mm A")}
                    </p>
                  </div>
                </div>
              </div>
              <hr className="mt-2" />
              {search_query == "confirm" ? null : <div>
                <input
                  name="couponCode"
                  placeholder="Enter Coupon Code"
                  className=" mt-4 bg-transparent w-40  font-medium text-gray-500  text-left pl-2 py-2   border border-brand-secondary rounded text-sm"
                  value={couponCode}
                  onChange={(e) => onChange(e)}
                />
              </div>}
              {search_query == "confirm" ? null : <div className="flex gap-4 w-60">
                <button
                  className="my-2 w-40 bg-brand-primary text-sm h-12 rounded-md text-white font-normal "
                  onClick={coupon}
                >
                  Select the coupon and click to apply
                </button>


              </div>}
              <span
                className={
                  verify
                    ? `text-green-600 mt-3  text-sm`
                    : `text-red-600 mt-3 text-sm `
                }
              >
                {couponCodeMsg}
              </span>


              <hr className="mt-2 mb-2" />
              <div className="flex justify-between">
                <p>Consultation Fee</p>
                <p>₹ {state?.amount ? state?.amount : 1}/-</p>
              </div>
              {
                state?.amount - oldTotal > 0 &&

                <div className="flex justify-between mt-3">
                  <p className="text-green-900 font-medium">Discount</p>
                  <p className="text-green-900 font-medium" name="Discount">
                    - ₹ {state?.amount - oldTotal}/-{" "}
                  </p>
                </div>
              }

              <hr className="mt-2 mb-2" />
              <div className="flex justify-between mt-3">
                <p className="text-brand-secondary"> Total</p>
                <p className="text-brand-secondary font-medium">
                  ₹ {oldTotal ? oldTotal : 1}/-
                </p>
              </div>

              <hr className="mt-2 mb-2" />

              {search_query == "confirm" ? null : <div>
                <div className="flex my-3">
                  <p
                    className="text-sm lg:text-base font-normal  not-italic "
                    style={{ color: "#005D8D" }}
                  >
                    See all Coupon Code List
                  </p>

                  <img
                    src={isShowCouponList ? Down_Arrow : Up_Arrow}
                    alt="plus"
                    onClick={(e) => {
                      hideShow();
                      // alert("djdj");
                      // if (quantity <= pharmaProductsList[0].quantity)
                      //   setQuantity(quantity + 1);
                    }}
                    className="w-3 cursor-pointer ml-auto"
                  />
                </div>

                {isShowCouponList && (
                  <div className="flex flex-col gap-4">
                    {couponList.map((item, i) => {
                      return (
                        <div
                          className="border-radius: 10px rounded-xl p-3"
                          style={{
                            border: "1px solid rgba(0, 93, 141, 0.15)",
                            background: !item?.isDefault
                              ? "rgba(188, 235, 255, 0.12)"
                              : "	rgba(25, 135, 84,0.23)",
                          }}
                          onClick={() => onClickAt(item, i)}
                        >
                          <div className="flex justify-end mb-2">
                            {item?.isDefault && (
                              <img
                                src={Markk}
                                alt="plus"
                                className="mr-2    mt-1"
                                checked={item?.isDefault == true ? true : false}
                              />
                            )}

                            <p
                              className="text-sm lg:text-base font-normal leading-6 not-italic"
                              style={{ color: "#3A3A3A" }}
                            >
                              {item.title}
                            </p>
                          </div>

                          <p
                            className="text-sm lg:text-base font-normal leading-6 not-italic"
                          >
                            {item.voucherCode}
                          </p>

                          <p style={{ color: "#005D8D" }} className="text-sm lg:text-base font-normal leading-6 not-italic font-[500]" >
                            {item.voucherCampDescription}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>}

            </div>
          </div>
          <div className="flex w-full justify-center md:hidden">
            {!selectedPackageId.packageIds ? <button
              onClick={search_query == "confirm" ? confirmAppontmentWithoutPay : DoPayment}
              disabled={((complain === "" ? true : false) || message ? true : false)}
              className=" bg-brand-secondary text-white  py-2 w-full sm:w-2/12 rounded text-sm mt-4 disabled:opacity-50"
            >
              {search_query == "confirm" ? "Confirm" : "Pay"}
            </button> : <button
              onClick={onRedeemNow}
              disabled={complain === "" ? true : false}
              className=" bg-brand-secondary text-white  py-2 w-full sm:w-2/12 rounded text-sm mt-4 disabled:opacity-50"
            >
              Redeem Now
            </button>}
            <div className="flex justify-end  font-medium text-sm text-green-600">{message}</div>
          </div>
        </div>
        <br />
        {showaddmemberpopup ? (
          <Addmemberpopup
            closePopup={() => setshowaddmemberpopup(!showaddmemberpopup)}
          ></Addmemberpopup>
        ) : null}
      </div>

      <Dialog
        visible={openDialog}
        showHeader={true}
        header={<div className="font my-2 mx-4 mt-5">
          Please select coupon for better discount
        </div>}
        modal={true}
        style={{ width: "500px" }}
        //  className="w-100 h-auto"
        onHide={() => setDialog(false)}
      >
        <>
          <div className="text-center">


            <div className="flex flex-col md:flex-row items-center justify-around mt-5">

              <button
                className="my-2 w-40 bg-brand-primary text-sm h-6 rounded-md text-white font-normal "
                onClick={() => setDialog(false)}
              >
                Select Coupon
              </button>

              <button
                className="my-2 w-60 bg-brand-primary text-sm h-6 rounded-md text-white font-normal "
                onClick={DoPayment}
                disabled={complain === "" ? true : false}
              >

                Proceed without Coupon
              </button>
            </div>

          </div>


        </>
      </Dialog>

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
              <div className="flex  font-medium text-sm justify-between items-center py-2 px-6 rounded mb-2 cursor-pointer" style={{ backgroundColor: "#e5e6e7", border: selectedPayMode.wallet ? "2px solid #66B889" : "" }} onClick={() => setSelectedPayMode({ wallet: true, card: false })}>CureBay wallet -  Rs {walletinfo?.patientwalletinfoData?.balance && walletinfo?.patientwalletinfoData?.balance.toFixed(2)} <i className="pi pi-angle-right"></i></div>
            </div>
            <div className="flex justify-between  font-medium text-sm items-center py-2 px-6 rounded cursor-pointer" style={{ backgroundColor: "#e5e6e7", border: selectedPayMode.card ? "2px solid #66B889" : "" }} onClick={() => setSelectedPayMode({ wallet: false, card: true })}>Debit/Credit Cards/UPI & Others <i className="pi pi-angle-right"></i></div>
            <div className="text-center">
              <button className=" font-normal text-xs py-2 px-6 rounded mt-4" style={{ backgroundColor: "#66B889", color: "#ffff" }} onClick={DoPay}>Pay{loadingDuringPayment && (
                <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>
              )}</button>
            </div>
            {
              errorDuringPay.length > 0 ? <div style={{ color: "red" }} className="font-normal text-sm"> {errorDuringPay} </div> : ""
            }
          </div>
        </Dialog>
      ) : (
        ""
      )}
    </>
  );
}
export default Payment;
