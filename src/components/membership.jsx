import Lady from "../Assets/Images/08.png";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import {
  getMembershipList,
  onMemberSubs,
  onMemberCheck,
} from "../Redux/Actions/packages";
import { useEffect, useState } from "react";
import PackageService from "../Redux/services/packagesService";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import moment from "moment";

import http from "../Redux/services/http-common";
import { SHA512 } from "crypto-js";
import { ToastContainer, toast } from "react-toastify";
import { Carousel } from "primereact/carousel";
import percentlogo from "../Assets/Images/percentlogo.png";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import {getLocalTime} from '../Assets/utils/LocalTimeFormat'


import {
  walletdetails,
  walletTransactiondetails,
} from "../Redux/Actions/UserprofileActions";

function Membership(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  // @ts-ignore
  const membershipData = useSelector((state) => state.packageReducer);
  const { promotionList, membershipList } = membershipData;
  const [openDialog, setOpenDialog] = useState("");
  const [conData, setconData] = useState();
  const [labData, setlabData] = useState();
  const userData = useSelector((state) => state.authReducer.patientData);
  const [actualAmount, setActualAmount] = useState(0);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [tId, settId] = useState(moment.now().toString());
  const [isLoading, setIsLoading] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [packageCode, setPackageCode] = useState("");
  const [screen, setscreen] = useState(window.innerWidth);

  const walletinfo = useSelector((state) => state.patientwallet);
  const [loadingDuringPayment, setLoadingDuringPayment] = useState(false);
  const [errorDuringPay, setErrorDuringPay] = useState("");
  const [selectedPayMode, setSelectedPayMode] = useState({
    wallet: false,
    card: false,
  });
  const [isUserReadyToPay, setIsUserReadyToPay] = useState(false);
  const [isPrescriptionUploaded, setisPrescriptionUploaded] = useState([
    { id: "" },
  ]);

  useEffect(() => {
    dispatch(walletdetails(userData.code));
    dispatch(walletTransactiondetails(userData.code));


    console.log('locationlocation', JSON.stringify(location.pathname))
    // debugger
  }, [userData.code]);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setscreen(newWidth);
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  useEffect(() => {
    dispatch(getMembershipList());
    // dispatch(getPromotionList());
  }, [dispatch]);

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
    }
  }, []);

  const DoPay = async () => {
    setErrorDuringPay("");
    if (!selectedPayMode.wallet && !selectedPayMode.card) {
      toast("Please select payment mode.");
      return;
    }

    if (selectedPayMode.wallet) {
      if (discountedAmount > walletinfo?.patientwalletinfoData?.balance) {
        toast("Balance is not sufficient.");
        return;
      } else {
        setLoadingDuringPayment(true);

        let payload = {
          patientCode: userData?.code,
          packageCode: packageCode,
          actualAmount: actualAmount,
          discountAmount: discountedAmount,
        };

        let data = await http.put(
          `${process.env.REACT_APP_BASEURL}api/v1/payments/wallet/package`,
          payload
        );
        // console.log(JSON.stringify(data.data.statusCode), "dsjfsduhfoshfoisd");
        console.log("qqqqqqqq", data);
        if (data.data.statusCode == 200) {
          // let d = new Date();
          // let txdId = tId ? tId : d.getTime().toString();

          setLoadingDuringPayment(false);
          setIsUserReadyToPay(false);
          setOpenDialog(false);

          localStorage.setItem("redirectUrl", APP_ROUTES.DASHBOARD);
          localStorage.setItem("saveCon", JSON.stringify(conData));
          localStorage.setItem("saveLab", JSON.stringify(labData));
          localStorage.setItem("amount", JSON.stringify(discountedAmount));
          localStorage.setItem("actualAmount", JSON.stringify(actualAmount));
          localStorage.setItem("patient", JSON.stringify(userData));
          localStorage.setItem("packageCode", JSON.stringify(packageCode));

          localStorage.setItem("payMode", "CureBay wallet");
          localStorage.setItem(
            "paymentRemarks",
            "Your Order placed successfully"
          );
          redirectAfterTxn(data.data.data.transcationId);
        } else {
          setLoadingDuringPayment(false);
          setErrorDuringPay("Something went wrong try again.");
        }
      }
    }

    if (selectedPayMode.card) {
      dispatch(onMemberCheck(packageCode, userData?.code)).then((res) => {
        if (res.status == 200) {
          let firstName = userData.firstName.split(/\s/).join("");
          localStorage.setItem("redirectUrl", APP_ROUTES.DASHBOARD);
          localStorage.setItem("saveCon", JSON.stringify(conData));
          localStorage.setItem("saveLab", JSON.stringify(labData));
          localStorage.setItem("amount", JSON.stringify(discountedAmount));
          localStorage.setItem("actualAmount", JSON.stringify(actualAmount));
          localStorage.setItem("patient", JSON.stringify(userData));
          localStorage.setItem("packageCode", JSON.stringify(packageCode));
          localStorage.setItem("payMode", "CC");

          const amount = discountedAmount;
          const url =
            process.env.REACT_APP_PAYU_BASEURL +
            `patientId=${userData.code}&amount=${amount}&firstname=${firstName}&email=${userData.email}&phone=${userData.mobile}&productinfo=cartpayment&udf1=Patient&service_provider=payu_paisa`;
          window.location.replace(url);

          // redirectAfterTxn("7575757858767");
        } else {
        }
      });
    }
  };

  const handlePackageClick = (code) => {
    if (!userData?.id) {
      history.push({
        pathname: APP_ROUTES.LOGIN,
        state: { background: location, login: true },
      });
      return;
    }

    PackageService.getPackageInfo(code).then((res) => {
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
      setPackageCode(res?.data[0]?.packageCode);
    });
  };

  const orderPlaced = () => {
    // let status = localStorage.getItem("paymentRemarks");
    /////////////////////////////////////////////////////////
    let status = ""
    let amount = JSON.parse(localStorage.getItem("amount"))?.toFixed(2);
    let id = localStorage.getItem("trancationid")
    if (id) {
      status = `Thank You. Your order status is success. Your Transaction ID for this transaction is ${id}. We have received a payment of Rs. ${amount}.`
    } else {
      status = `Thank You. Your order status is success. We have received a payment of Rs. ${amount}.`
    }
    let time = setTimeout(() => {
      localStorage.removeItem("trancationid");
      localStorage.removeItem("amount");
      clearTimeout(time)
    }, 1000)

    ///////////////////////////////////////////////////////////

    return (
      <>
        <div className="text-brand-primary text-lg font-normal text-center  mb-8">
          {status}
        </div>
      </>
    );
  };

  const redirectAfterTxn = async (txnid) => {
    // try {
    let con = JSON.parse(localStorage.getItem("saveCon"));
    let lab = JSON.parse(localStorage.getItem("saveLab"));
    let amount = JSON.parse(localStorage.getItem("amount"));
    let actualAmount = JSON.parse(localStorage.getItem("actualAmount"));
    let patient = JSON.parse(localStorage.getItem("patient"));
    let packageCode = JSON.parse(localStorage.getItem("packageCode"));
    let packagePayment = localStorage.getItem("payMode");

    let payload = {
      patientCode: patient?.code,
      packageCode: packageCode,
      txnId: txnid ? txnid : null,
      status: 1,
      createdBy: patient?.code,
      modifiedBy: patient?.code,
      packagesAmount: actualAmount,
      discountedAmount: amount,
      payMode: packagePayment,
      packagesFromDate: moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
      packagesToDate: moment(new Date())
        .add(1, "months")
        .format("YYYY-MM-DD hh:mm:ss"),
    };

    try {
      dispatch(onMemberSubs(payload)).then((res) => {
        setconData(con);
        setlabData(lab);

        setOpenDialog(true);
        setPaymentDone(true);
        localStorage.removeItem("paymentStatus");
        // localStorage.removeItem("trancationid");
        localStorage.removeItem("totalAmount");
        // localStorage.removeItem("trancationid");
        localStorage.removeItem("saveCon");
        localStorage.removeItem("saveLab");
        localStorage.removeItem("redirectUrl");
        localStorage.removeItem("patient");
        // localStorage.removeItem("amount");
        localStorage.removeItem("actualAmount");
        localStorage.removeItem("packageCode");
        localStorage.removeItem("payMode");


      });
    } catch (err) {
      localStorage.removeItem("paymentStatus");
      localStorage.removeItem("trancationid");
      localStorage.removeItem("totalAmount");
      localStorage.removeItem("trancationid");
      localStorage.removeItem("saveCon");
      localStorage.removeItem("saveLab");
      localStorage.removeItem("redirectUrl");
      localStorage.removeItem("patient");
      localStorage.removeItem("amount");
      localStorage.removeItem("actualAmount");
      localStorage.removeItem("packageCode");
      localStorage.removeItem("payMode");
    }

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
    setIsUserReadyToPay(true);
  };

  console.log("membership list", membershipList);

  const packageTemplate = (product) => {
    //  console.log(product,"xyz");
    return (
      <div
        key={product.code}
        className="w-auto lg:flex lg:w-11/12 -ml-3 md:ml-6 px-2 md:px-4 lg:bg-white h-64 md:h-56 "
      >
        <div
          className={`${product.id % 2 === 0 ? "light-blue" : "light-yellow"
            } card h p-4  rounded-md mr-0 w-11/12 lg:w-full h-48 sm:h-40 md:h-44 lg:h-56`}
          style={{ boxShadow: "12px 20px 23px rgba(226, 226, 226, 0.6)" }}
        >
          <div className="flex flex-col w-auto justify-between md:flex h-20 sm:h-20 md:h-24 lg:h-32">
            {/* <div className="flex items-center">
              <img
                className="lg:h-36 h-28 max-w-none"
                src={product.photoName ? process.env.REACT_APP_IMG_BASEURL + product.photoName : Lady}
                alt=""
              />
            </div> */}

            {/* <img src={percentlogo} alt="" className="absolute -top-5 flex items-end" style={{width:"35px", height:"39.61px"}} /> */}
            <div className="flex flex-col h-6 sm:h-6 md:h-8 lg:h-16 md:p-3 lg:pr-0">
              <p
                className="sm:font-medium md:font-medium lg:font-bold font-semibold text-lg sm:text-lg md:text-lg lg:text-xl ml-1 text-black "
                style={{ fontFamily: "open sans" }}
              >
                <p>
                  {product.name} starting at ₹{product?.amount}
                </p>
              </p>
              {/* <div className="flex mt-8  justify-around lg:justify-center">
                <button
                  onClick={() => handlePackageClick(product.code)}
                  type="button"
                  className="mt-2 lg:mt-5 bg-brand-secondary lg: text-xs lg:text-md lg:font-medium font-thin  text-white px-4 py-2 ml-3 lg:p-3 rounded-md"
                  style={{ backgroundColor: "#66B889" }}
                >
                  <b style={{ color: "#ffff" }}>Get Package</b>
                </button>
              </div> */}
            </div>
          </div>

          <div className="flex justify-around lg:justify-center items-end">
            <button
              onClick={() => handlePackageClick(product.code)}
              type="button"
              className="mt-2 lg:mt-5 bg-brand-secondary sm:text-sm md:text-sm lg:text-md lg:font-bold font-medium  px-4 py-2 ml-3 lg:p-3 rounded-md"
              style={{ backgroundColor: "#66B889" }}
            >
              <div style={{ color: "#ffffff", fontFamily: "open sans" }}>
                Get Package
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  };


  const packageTemplate1 = (product) => {
    //  console.log(product,"xyz");
    return (
      <div
        key={product.code}
        className="w-auto lg:flex lg:w-11/12 lg:ml-6 px-4 lg:bg-white h-64 md:h-56 "
      >
        <div
          className={`${product.id % 2 === 0 ? "light-blue" : "light-yellow"
            } card h p-4  rounded-md mr-0 w-11/12 lg:w-full h-48 sm:h-40 md:h-44 lg:h-48`}
          style={{ boxShadow: "12px 20px 23px rgba(226, 226, 226, 0.6)" }}
        >
          <div className="flex flex-col w-auto justify-between md:flex h-20 sm:h-20 md:h-24 lg:h-24">
            {/* <div className="flex items-center">
              <img
                className="lg:h-36 h-28 max-w-none"
                src={product.photoName ? process.env.REACT_APP_IMG_BASEURL + product.photoName : Lady}
                alt=""
              />
            </div> */}

            {/* <img src={percentlogo} alt="" className="absolute -top-5 flex items-end" style={{width:"35px", height:"39.61px"}} /> */}
            <div className="flex flex-col h-6 sm:h-6 md:h-8 lg:h-16 md:p-3 lg:pr-0">
              <p
                className="sm:font-medium md:font-medium lg:font-bold font-semibold text-lg sm:text-lg md:text-lg lg:text-xl ml-1 text-black "
                style={{ fontFamily: "open sans" }}
              >
                <p>
                  {product.name} starting at ₹{product?.amount}
                </p>
              </p>
              {/* <div className="flex mt-8  justify-around lg:justify-center">
                <button
                  onClick={() => handlePackageClick(product.code)}
                  type="button"
                  className="mt-2 lg:mt-5 bg-brand-secondary lg: text-xs lg:text-md lg:font-medium font-thin  text-white px-4 py-2 ml-3 lg:p-3 rounded-md"
                  style={{ backgroundColor: "#66B889" }}
                >
                  <b style={{ color: "#ffff" }}>Get Package</b>
                </button>
              </div> */}
            </div>
          </div>

          <div className="flex justify-around lg:justify-center items-end">
            <button
              onClick={() => handlePackageClick(product.code)}
              type="button"
              className="mt-2 lg:mt-5 bg-brand-secondary sm:text-sm md:text-sm lg:text-md lg:font-bold font-medium  px-4 py-2 ml-3 lg:p-3 rounded-md"
              style={{ backgroundColor: "#66B889" }}
            >
              <div style={{ color: "#ffffff", fontFamily: "open sans" }}>
                Get Package
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  };


  console.log("@@@@@", props.screen, props.screen > 500);
  return (
    <div className=" w-full mt-5 lg:mt-9">
      <ToastContainer />
      {/* {
        props.screen >= 300 ? <div className="text-center mt-8 lg:mt-20 mb-4">
          <span className="mx-3 font-bold text-xl md:text-xl" style={{ color: "#262626" }}>
            Healthcare Packages
          </span>
        </div>
          : <div></div>
      } */}


      <div className="">
      {membershipList.length > 0 &&
        <div className="flex justify-center mt-3 mb-0 sm:mb-0 md:mb-0 lg:-mb-10 ">
          <p className="font-bold text-xl sm:text-xl md:text-xl lg:text-xl">Packages & Promotions</p>
        </div>
      }


        <div className="pr-0 sm:pr-0 md:pr-0 lg:pr-20">
          {membershipList.length >= 4 &&

            <div className="flex overflow-x-hidden space-x-4 md:space-x-5 pt-3 w-full example mt-4 lg:mt-16 mx-auto sm:ml-0 md:ml-0 lg:ml-8 lg:px-4 xl:px-16 bg-white">

              <div className="hidden lg:block mb-4" style={{ width: "100%" }}>
                <Carousel
                  className=""
                  style={{ width: "100%" }}
                  value={membershipList}
                  itemTemplate={packageTemplate}
                  autoplayInterval={2800}
                  numVisible={3}
                  numScroll={1}
                ></Carousel>
              </div>
              <div className="hidden sm:block lg:hidden" style={{ width: "100%" }}>
                <Carousel
                  className=""
                  style={{ width: "100%" }}
                  value={membershipList}
                  itemTemplate={packageTemplate}
                  autoplayInterval={2500}
                  numVisible={2}
                  numScroll={1}
                ></Carousel>
              </div>
              <div className="block sm:hidden" style={{ width: "100%" }}>
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


            </div>
          }
          <div className="pr-0 sm:pr-0 md:pr-0 lg:pr-20">
            {membershipList.length == 3 &&

              <div className="flex overflow-x-hidden space-x-5 pt-3 px-3 w-full example mt-4 lg:mt-16 ml-0 sm:ml-0 md:ml-0 lg:ml-8 lg:px-4 xl:px-16 bg-white">

                <div className="hidden lg:block mb-4 ml-0 md:ml-8" style={{ width: "100%" }}>
                  <Carousel
                    className=""
                    style={{ width: "100%" }}
                    value={membershipList}
                    itemTemplate={packageTemplate1}
                    autoplayInterval={2800}
                    numVisible={2}
                    numScroll={1}
                  ></Carousel>
                </div>
                <div className="hidden sm:block lg:hidden" style={{ width: "100%" }}>
                  <Carousel
                    className=""
                    style={{ width: "100%" }}
                    value={membershipList}
                    itemTemplate={packageTemplate}
                    autoplayInterval={2500}
                    numVisible={2}
                    numScroll={1}
                  ></Carousel>
                </div>
                <div className="block sm:hidden" style={{ width: "100%" }}>
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
              </div>


              // <div className="flex justify-center">
              //   <div className="flex w-11/12 mr-10">
              //     {membershipList && membershipList.map((product, i) => {

              //       return (
              //         <div className="flex overflow-x-hidden space-x-5 pt-3 px-0 w-full example mt-4 lg:mt-16 ml-0 sm:ml-0 md:ml-0 lg:px-0 xl:px-16 bg-white">

              //           <div
              //             key={product.code}
              //             className="w-auto lg:flex lg:w-96 mb-10 px-0 lg:bg-white h-64 md:h-56 "
              //           >
              //             <div
              //               className={`${product.id % 2 === 0 ? "light-blue" : "light-yellow"
              //                 } card h p-4  rounded-md mr-0 w-full lg:w-80 h-48 sm:h-40 md:h-44 lg:h-56`}
              //               style={{ boxShadow: "12px 20px 23px rgba(226, 226, 226, 0.6)" }}
              //             >
              //               <div className="flex flex-col w-auto justify-between md:flex h-20 sm:h-20 md:h-24 lg:h-32">


              //                 {/* <img src={percentlogo} alt="" className="absolute -top-5 flex items-end" style={{width:"35px", height:"39.61px"}} /> */}
              //                 <div className="flex flex-col h-6 sm:h-6 md:h-8 lg:h-16 md:p-3 lg:pr-0">
              //                   <p
              //                     className="sm:font-medium md:font-medium lg:font-bold font-semibold text-lg sm:text-lg md:text-lg lg:text-xl ml-1 text-black "
              //                     style={{ fontFamily: "open sans" }}
              //                   >
              //                     <p>
              //                       {product.name} starting at ₹{product?.amount}
              //                     </p>
              //                   </p>

              //                 </div>
              //               </div>

              //               <div className="flex justify-around lg:justify-center items-end">
              //                 <button
              //                   onClick={() => handlePackageClick(product.code)}
              //                   type="button"
              //                   className="mt-2 lg:mt-5 bg-brand-secondary sm:text-sm md:text-sm lg:text-md lg:font-bold font-medium  px-4 py-2 ml-3 lg:p-3 rounded-md"
              //                   style={{ backgroundColor: "#66B889" }}
              //                 >
              //                   <div style={{ color: "#ffffff", fontFamily: "open sans" }}>
              //                     Get Package
              //                   </div>
              //                 </button>
              //               </div>
              //             </div>
              //           </div>

              //         </div>
              //       )
              //     })}
              //   </div>
              // </div>

            }
          </div>


          <div className="pr-0 sm:pr-0 md:pr-0 lg:pr-0">
            {membershipList.length == 2 &&

              <div className="flex justify-center">
                <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row w-full sm:w-auto md:w-auto lg:w-full xl:w-auto lg:ml-40 xl:ml-36">
                  {membershipList && membershipList.map((product, i) => {

                    return (
                      <div>

                        <div className="">
                          {screen >= 1118 &&
                            <div className="flex  space-x-5 pt-3 px-0 w-full example mt-4 lg:mt-16 ml-0 sm:ml-0 md:ml-0 md:px-0 lg:px-12 xl:px-5 bg-white">

                              <div
                                key={product.code}
                                className="w-auto lg:flex lg:w-96 mb-10 px-0 lg:bg-white h-64 md:h-56 "
                              >
                                <div
                                  className={`${product.id % 2 == 0 ? "light-blue" : "light-yellow"
                                    } card h p-4  rounded-md mr-0 w-full lg:w-80 h-48 sm:h-40 md:h-44 lg:h-56`}
                                  style={{ boxShadow: "12px 20px 23px rgba(226, 226, 226, 0.6)" }}
                                >
                                  <div className="flex flex-col w-auto justify-between md:flex h-20 sm:h-20 md:h-24 lg:h-32">


                                    {/* <img src={percentlogo} alt="" className="absolute -top-5 flex items-end" style={{width:"35px", height:"39.61px"}} /> */}
                                    <div className="flex flex-col h-6 sm:h-6 md:h-8 lg:h-16 md:p-3 lg:pr-0">
                                      <p
                                        className="sm:font-medium md:font-medium lg:font-bold font-semibold text-lg sm:text-lg md:text-lg lg:text-xl ml-1 text-black "
                                        style={{ fontFamily: "open sans" }}
                                      >
                                        <p>
                                          {product.name} starting at ₹{product?.amount}
                                        </p>
                                      </p>

                                    </div>
                                  </div>

                                  <div className="flex justify-around lg:justify-center items-end">
                                    <button
                                      onClick={() => handlePackageClick(product.code)}
                                      type="button"
                                      className="mt-2 lg:mt-5 bg-brand-secondary sm:text-sm md:text-sm lg:text-md lg:font-bold font-medium  px-4 py-2 ml-3 lg:p-3 rounded-md"
                                      style={{ backgroundColor: "#66B889" }}
                                    >
                                      <div style={{ color: "#ffffff", fontFamily: "open sans" }}>
                                        Get Package
                                      </div>
                                    </button>
                                  </div>
                                </div>
                              </div>

                            </div>
                          }

                        </div>

                        <div className="">
                          {screen < 1118 &&

                            <div className="flex flex-col  space-x-5 pt-3 px-0 w-full example mt-4 lg:mt-16 ml-0 sm:ml-0 md:ml-0 sm:px-3 md:px-3 lg:px-12 xl:px-16 bg-white items-center">

                              <div
                                key={product.code}
                                className="w-9/12 sm:w-52 lg:flex lg:w-96 -mb-8 sm:mb-10 px-0 lg:bg-white h-48 md:h-56 "
                              >
                                <div
                                  className={`${product.id % 2 === 0 ? "light-blue" : "light-yellow"
                                    } card h p-4  rounded-md mr-0 w-full lg:w-80 h-32 sm:h-40 md:h-44 lg:h-56`}
                                  style={{ boxShadow: "12px 20px 23px rgba(226, 226, 226, 0.6)" }}
                                >
                                  <div className="flex flex-col w-auto justify-between md:flex h-12 sm:h-20 md:h-24 lg:h-32">


                                    {/* <img src={percentlogo} alt="" className="absolute -top-5 flex items-end" style={{width:"35px", height:"39.61px"}} /> */}
                                    <div className="flex flex-col h-6 sm:h-6 md:h-8 lg:h-16 md:p-3 lg:pr-0">
                                      <p
                                        className="sm:font-medium md:font-medium lg:font-bold font-semibold text-sm sm:text-sm md:text-sm lg:text-xl ml-1 text-black "
                                        style={{ fontFamily: "open sans" }}
                                      >
                                        <p>
                                          {product.name} starting at ₹{product?.amount}
                                        </p>
                                      </p>

                                    </div>
                                  </div>

                                  <div className="flex justify-around lg:justify-center items-end">
                                    <button
                                      onClick={() => handlePackageClick(product.code)}
                                      type="button"
                                      className="mt-2 lg:mt-5 bg-brand-secondary text-xs sm:text-xs md:text-xs lg:text-md lg:font-bold font-medium  px-4 py-2 ml-3 lg:p-3 rounded-md"
                                      style={{ backgroundColor: "#66B889" }}
                                    >
                                      <div className="text-xs sm:text-xs md:text-xs" style={{ color: "#ffffff", fontFamily: "open sans" }}>
                                        Get Package
                                      </div>
                                    </button>
                                  </div>
                                </div>
                              </div>

                            </div>



                          }

                        </div>


                      </div>
                    )
                  })}
                </div>
              </div>

            }
          </div>


          <div className="pr-0 sm:pr-0 md:pr-0 lg:pr-0">
            {membershipList.length == 1 &&

              <div className="flex justify-center">
                <div className="flex w-full mr-0">
                  {membershipList && membershipList.map((product, i) => {

                    return (

                      <div className="flex overflow-x-hidden space-x-5 pt-3 px-0 w-full example mt-4 lg:mt-16 ml-0 sm:ml-0 md:ml-0 lg:px-0 xl:px-16 bg-white justify-center">

                        <div
                          key={product.code}
                          className="w-8/12 sm:w-8/12 md:w-6/12 lg:flex lg:w-full mb-10 px-0 lg:bg-white h-64 md:h-56 justify-center lg:ml-20"
                        >
                          <div
                            className={`${product.id % 2 === 0 ? "light-blue" : "light-yellow"
                              } card h p-4  rounded-md mr-0 w-full lg:w-6/12 h-48 sm:h-40 md:h-44 lg:h-56`}
                            style={{ boxShadow: "12px 20px 23px rgba(226, 226, 226, 0.6)" }}
                          >
                            <div className="flex flex-col w-auto justify-between md:flex h-20 sm:h-20 md:h-24 lg:h-32">


                              {/* <img src={percentlogo} alt="" className="absolute -top-5 flex items-end" style={{width:"35px", height:"39.61px"}} /> */}
                              <div className="flex flex-col h-6 sm:h-6 md:h-8 lg:h-16 md:p-3 lg:pr-0">
                                <p
                                  className="sm:font-medium md:font-medium lg:font-bold font-semibold text-lg sm:text-lg md:text-lg lg:text-xl ml-1 text-black "
                                  style={{ fontFamily: "open sans" }}
                                >
                                  <p>
                                    {product.name} starting at ₹{product?.amount}
                                  </p>
                                </p>

                              </div>
                            </div>

                            <div className="flex justify-around lg:justify-center items-end">
                              <button
                                onClick={() => handlePackageClick(product.code)}
                                type="button"
                                className="mt-2 lg:mt-5 bg-brand-secondary sm:text-sm md:text-sm lg:text-md lg:font-bold font-medium  px-4 py-2 ml-3 lg:p-3 rounded-md"
                                style={{ backgroundColor: "#66B889" }}
                              >
                                <div style={{ color: "#ffffff", fontFamily: "open sans" }}>
                                  Get Package
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>


                    )
                  })}
                </div>
              </div>

            }
          </div>



        </div>
      </div>
      {isLoading && membershipList.length === 0 && (
        <div className="flex flex-wrap justify-center">
          <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-20 h-20 w-20" />
        </div>
      )}
      <Dialog
        header="Package Information"
        visible={openDialog}
        modal={false}
        //  style={{ width: "800px", height: 'auto' }}
        className="w-11/12 m-auto lg:w-5/6 h-auto"
        onHide={() => { setOpenDialog(false); setPaymentDone(false) }}
      >
        {!paymentDone ? (
          <>
            {conData && conData?.length ? (
              <div className="md:flex justify-between">
                {" "}
                <div>
                  <h4><b>Package Name:</b> {conData[0].packagesName}</h4>{" "}
                  <p><b>Description:</b> {conData[0].packagesDescription}</p>{" "}
                </div>
                <div className="">
                  <h1 className="font-medium font-bold">From Date</h1>
                  <h1 className="font-medium">
                    { getLocalTime(conData[0]?.fromDate)?.split(" ")[0]}
                  </h1>
                </div>
                <div>
                  <h1 className="font-medium font-bold">To Date</h1>
                  <h1 className="font-medium">
                    {getLocalTime(conData[0]?.toDate)?.split(" ")[0]}
                  </h1>
                </div>
              </div>
            ) : labData && labData.length ? (
              <div className="md:flex justify-between">
                {" "}
                <div>
                  <h4><b>Package Name:</b> {labData[0].packagesName}</h4>{" "}
                  <p><b>Description:</b> {labData[0].packagesDescription}</p>{" "}
                </div>
                <div>
                  <h1 className="font-medium font-bold">From Date</h1>
                  <h1 className="font-medium">
                    {labData[0]?.fromDate.split(" ")[0]}
                  </h1>
                </div>
                <div>
                  <h1 className="font-medium font-bold">To Date</h1>
                  <h1 className="font-medium">
                    {labData[0]?.toDate.split(" ")[0]}
                  </h1>
                </div>
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
                  <Column field="quantity" header="Number"></Column>
                  <Column field="actualAmount" header="Original Amount"></Column>
                  <Column
                    field="discountAmount"
                    header="Discounted Amount"
                  ></Column>
                </DataTable>
              </>
            )}
            {labData && labData.length > 0 && (
              <>
                <div className="my-5 ml-2 ">
                  <h1 className="font-medium font-bold">Lab Tests</h1>
                  <h1 className="font-medium">{labData[0]?.labName}</h1>
                  <h1 className="font-medium">
                    {labData[0]?.address1} {labData[0]?.address2} -{" "}
                    {labData[0]?.pinCode}
                  </h1>
                </div>
                <DataTable value={labData} responsiveLayout="scroll">
                  <Column field="testName" header="Lab Test"></Column>
                  <Column field="quantity" header="Number"></Column>
                  <Column field="actualAmount" header="Original Amount"></Column>
                  <Column
                    field="discountAmount"
                    header="Discounted Amount"
                  ></Column>
                </DataTable>
              </>
            )}
            <div className="text-center">
              <div className="font-medium my-2 mx-4">
                {" "}
                Original Amount : {`\u20B9`}
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
              Debit/Credit Cards/UPI & Others <i className="pi pi-angle-right"></i>
            </div>
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
    </div>
  );
}

export default Membership;
