import React from "react";
import filter from "../Assets/Images/filter.svg";
import sort from "../Assets/Images/sort.svg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { getPathologyTestlist } from "../Redux/Actions/DiagnosticsActions";
import DiagnosticService from "../Redux/services/Diagnosticsservice";
import LabTestModal from "./labtestNameModal";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import LabTestIcon from "../Assets/Images/LabTestIcon.svg";
import labImage from "../Assets/Images/lab.svg";
import noDataFound from "../Assets/Images/No data-found.svg";
import {
  AddtoCart,
  getCartDetails,
} from "../Redux/Actions/cartPlaceOrderAction";
import { useEffect, useState } from "react";
import moment from "moment";
import { SearchIcon } from "@heroicons/react/outline";
import InfiniteScroll from "react-infinite-scroller";
import { Dialog } from "primereact/dialog";

import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/outline";

function AllLabtest(props) {
  const location = useLocation();
  const history = useHistory();

  const [isOpen, setOpen] = useState(false);
  const { state } = location;
  const userData = useSelector((state) => state.authReducer.patientData);
  const { cartList } = useSelector((state) => state.cartReducer);
  console.log("location", location);
  const [labData] = useState(location?.state);
  const dispatch = useDispatch();
  const pathListData = useSelector((state) => state.pathoLogyReducer);
  const { pathlogyTestData } = pathListData;
  //const labTestlistData = useSelector((state) => state.labTestList);
  //const { labTestlist, isLoading } = labTestlistData;

  const [labTestlistData, setLabTestlistData] = useState([]);

  const [childData, setchilData] = useState([]);
  const [userCartDetails, setUserCartDetails] = useState({});
  const [chosenTests, setChosenTests] = useState([]);
  const [isOrderUpdate, setisOrderUpdate] = useState(false);
  const [pageStart, setPageStart] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [fetchingData, setfetchingData] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  let pageNumber = 1;

  const [isAdding, setIsAdding] = useState(-1);
  const [showSlot, setShowSlotBook] = useState(-1);
  const [parentTest, setParentTest] = useState({});
  const [openDialog, setDialog] = useState(false);

  const [text, setText] = useState("");
  const [labNewName, setLabNewName] = useState("");
  const [masterLabPartnerTestsListData, setMasterLabPartnerTestsListData] =
    useState([]);
  const [labPartnerTestsListData, setLabPartnerTestsListData] = useState([]);
  const [labPartnerTestsListAllData, setLabPartnerTestsListAllData] = useState(
    []
  );
  const [refeshTest, setRefeshTest] = useState(false);




  const [screen, setscreen] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;

      setscreen(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);



  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };

  useEffect(() => {
    dispatch(getPathologyTestlist());

    // alert('djdj')
  }, [location]);

  useEffect(() => {
    loadFunc();
  }, []);

  const loadFunc = async () => {
    if (isSearch) {
      return;
    }

    if (fetchingData) {
      return;
    }

    setfetchingData(true);
    const res = await DiagnosticService.getLabTestList(
      location?.state?.locationId,
      pageStart
    );
    // debugger
    console.log(res.data, "dsifdsohaoihsda");
    if (res.data.length === 0) {
      setHasMore(false);
    } else {
      setPageStart(pageStart + 1);
      if (labPartnerTestsListData?.length) {
        setLabPartnerTestsListData([...labPartnerTestsListData, ...res?.data]);
        setLabPartnerTestsListAllData([
          ...labPartnerTestsListData,
          ...res?.data,
        ]);
      } else {
        setLabPartnerTestsListData(res.data);
        setLabPartnerTestsListAllData(res.data);
      }
      setfetchingData(false);

      setHasMore(true);
    }
  };

  useEffect(() => {
    // setMasterLabPartnerTestsListData(labTestlistData.labTestlist);
    setLabTestlistData(labPartnerTestsListData);
  }, [labPartnerTestsListData]);

  useEffect(() => {
    dispatch(getCartDetails(userData.code)).then((result) => {
      if (result.length) {
        setUserCartDetails(result[0]);

        if (
          result[result.length - 1].patientLabTestsOrder &&
          result[result.length - 1].patientLabTestsOrder[0]
            .patientLabTestsOrderDetailsList
        ) {
          let cartest = [];
          let lastOrderDetails =
            result[result.length - 1].patientLabTestsOrder[0]
              .patientLabTestsOrderDetailsList;
          for (var i = 0; i < lastOrderDetails.length; i++) {
            let cartchild = {
              id: lastOrderDetails[i].id,
              amount: lastOrderDetails[i].amount,
              discountedAmount: lastOrderDetails[i].discountedAmount,
              hospitalId: lastOrderDetails[i].hospitalId,
              labTestCode: lastOrderDetails[i].labTestCode,
              code: lastOrderDetails[i].labTestCode,
              labTestName: lastOrderDetails[i].labTestName,
              locationId: lastOrderDetails[i].locationId,
              parentId: lastOrderDetails[i].parentId,
              parentTestName: lastOrderDetails[i].parentTestName,
              parentTestCode: lastOrderDetails[i].parentTestCode,
              status: 1,
            };
            cartest.push(cartchild);
          }
          setChosenTests(cartest);
        }
      }
    });
  }, []);

  const addtoCart = (e, data, index, quantity = 1) => {
    if (!userData.code) {
      redirectTo(e, {
        pathname: APP_ROUTES.LOGIN,
        state: { background: location, login: true },
      });
    }

    if (cartList?.patientLabTestsOrder) {
      let availableItem = cartList?.patientLabTestsOrder.find(
        (item) => item.hospitalId === data.labId
      );
      console.log("issssssssss", JSON.stringify(data));

      if (availableItem === undefined) {
        setDialog(true);
        setLabNewName(
          cartList?.patientLabTestsOrder[0]?.patientLabTestsOrderDetailsList[0]
            ?.hospitalName
        );
        return;
      }
    }

    if (!userData.code) {
      redirectTo(e, {
        pathname: APP_ROUTES.LOGIN,
        state: { background: location, login: true },
      });
    }
    e.preventDefault();
    setIsAdding(index);
    console.log("data hai", JSON.stringify(data));
    let prescriptionRequired = "N";
    let ePrescriptionRequired = "N";

    if (data?.medicinePrescriptionRequired == "N") {
      prescriptionRequired = "N";
      ePrescriptionRequired = "N";
    } else if (data?.medicinePrescriptionRequired == "Y") {
      prescriptionRequired = "Y";
      ePrescriptionRequired = "Y";
    }
    let calculatedAmount = data?.amount;
    const totalAmount = calculatedAmount * quantity;

    console.log("totalAmount", totalAmount);
    let dataObj = {};

    if (cartList && cartList.patientLabTestsOrder) {
      cartList.patientLabTestsOrder.map((res) => {
        res.patientLabTestsOrderDetailsList.push({
          patientLabTestOrderId: data.id,
          labTestCode: data.labTestCode,
          labTestName: data.labTestName,
          hospitalId: data.labId,
          locationId: data.locationId,
          amount: data.amount,
          discountAmount: data?.discountAmount,
          labTestType: data.testType,
          totalAmount: totalAmount,
          status: 1,

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

        labOrdersYN: true,
        drugsOrdersYN: false,
        totalAmount: totalAmount,
        patientLabTestsOrder: [
          {
            hospitalId: data.labId,
            locationId: data.locationId,

            orderId: "",
            patientId: userData.code,
            orderDetailsRequired: "Y",
            prescriptionId: null,
            cartId: cartList && cartList.id ? cartList.cartId : "",
            txnId: "",
            amount: totalAmount,
            address1: data.address1,
            address2: data.address2,
            address3: null,
            city: data.city,
            state: data.state,
            country: null,
            pincode: data.pinCode,
            deliveryAddress1: data.address1,
            deliveryAddress2: data.address2,
            deliveryAddress3: null,
            deliveryCity: data.city,
            deliveryState: data.state,
            deliveryCountry: null,
            deliveryZipcode: data.pinCode,
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
            patientLabTestsOrderDetailsList: [
              {
                patientLabTestOrderId: data.id,
                labTestCode: data.labTestCode,
                labTestName: data.labTestName,
                hospitalId: data.labId,
                locationId: data.locationId,
                amount: data.amount,
                labTestType: data.testType,
                discountAmount: data?.discountAmount,
                totalAmount: totalAmount,
                status: 1,
                tat: data?.tat,
                description: data?.description,

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
        // };
      };
    }
    console.log(JSON.stringify(dataObj), "helloooo");
    dispatch(AddtoCart(dataObj)).then((res) => {
      dispatch(getCartDetails(userData.code));
    });
  };

  function getProductsIDs() {
    let ids = [];
    if (cartList) {
      if (cartList.patientLabTestsOrder) {
        for (const product of cartList.patientLabTestsOrder) {
          // if (product && product.patientLabTestsOrderDetailsList) {
          for (const drug of product.patientLabTestsOrderDetailsList) {
            ids.push(drug.labTestCode);
          }
          // }
        }
      }
    }
    console.log("Drug Info Ids", ids);
    return ids;
  }

  const drugIDsInCart = getProductsIDs();

  const handleChange = (e, test) => {
    setisOrderUpdate(true);
    const checked = e.target.checked;
    let array = [...chosenTests];

    let index = array.findIndex((data) => data.code === test.code);

    if (index == -1 && checked) {
      test.isAdded = true;
      delete test.id;
      array.push(test);
    } else {
      array[index].status = checked ? 1 : 0;
      if (!array[index].id) {
        array.splice(index, 1);
      }
      // if (index > -1) array.splice(index, 1);
    }
    setChosenTests(array);
  };

  const toggleAllChange = (e) => {
    setisOrderUpdate(true);
    const checked = e.target.checked;
    let array = [...chosenTests];
    if (!array.every((t) => t.parentTestCode === parentTest.code)) {
      //array = [];
    }
    if (checked) {
      //   array.push();
      labPartnerTestsListData
        ?.filter(
          (x) =>
            x.parentTestCode === parentTest.code &&
            x.locationId === parentTest.locationId
        )
        .filter(
          (a, i, arr) =>
            arr.findIndex(
              (l) => l.code === a.code && l.locationId === a.locationId
            ) === i
        )
        .forEach((test) => {
          if (array.findIndex((t) => t.id === test.id) === -1) {
            test.isAdded = true;
            array.push(test);
          }
        });
    } else {
      labPartnerTestsListData
        ?.filter(
          (test) =>
            test.parentTestCode === parentTest.code &&
            test.locationId === parentTest.locationId
        )
        .forEach((test) => {
          let index = array.findIndex((data) => data.code === test.code);
          if (index > -1) array.splice(index, 1);
        });
    }
    setChosenTests(array);
  };

  const _handleKeyDown = async (e) => {
    setHasMore(false);
    setIsSearch(true);

    if (text == "") {
      return;
    }
    const res = await DiagnosticService.getLabTestListSearch(
      location?.state?.locationId,
      text
    );
    // debugger

    if (res.data.length != 0) {
      setLabPartnerTestsListData(res.data);
      setLabPartnerTestsListAllData(res.data);
      setPageStart(1);
      setText("");
      setHasMore(false);
    } else {
      setText("");
      setLabPartnerTestsListData([]);
      setLabPartnerTestsListAllData([]);
      setPageStart(1);
    }
  };

  useEffect(() => {
    console.log("LB details", JSON.stringify(labData));
    // action on update of movies
    console.log("LB Item", JSON.stringify(labPartnerTestsListData));
    setRefeshTest(false);
    setTimeout(() => {
      setRefeshTest(true);
    }, 100);
  }, [labPartnerTestsListData]);

  const renderAmount = (res) => {
    return (
      <>
        {" "}
        {res?.discountPercentage ? (
          <div>
            <div>
              {" "}
              <span className="text-gray-500 line-through text-xs font-medium">
                ₹ {res?.amount}
              </span>{" "}
              <span className="text-xs text-green-500 font-medium">
                ₹ {res?.discountAmount}
              </span>{" "}
            </div>
            <div className="border border-dashed border-green-500 text-xs bg-green-50 text-green-500 font-medium py-1 px-2">
              {res?.discountPercentage}% off
            </div>
          </div>
        ) : (
          <div className="w-full ">
            <div>
              {" "}
              <span className="text-xl text-neutral-800 font-bold">
                ₹ {res?.amount}
              </span>{" "}
            </div>
          </div>
        )}
      </>
    );
  };

  const onClickAt = (index) => {
    labPartnerTestsListData[index].isActive =
      labPartnerTestsListData[index].isActive === true ? false : true;

    setLabPartnerTestsListData([...labPartnerTestsListData]);
    setLabPartnerTestsListAllData([...labPartnerTestsListData]);
  };

  const onChangeMed = async (text) => {


    setText(text)



    setHasMore(false);
    setIsSearch(true);

    if (text.length < 3) {
      setLabPartnerTestsListData([...labPartnerTestsListAllData]);
      return;

    }
    const res = await DiagnosticService.getLabTestListSearch(
      location?.state?.locationId,
      text
    );
    // debugger

    if (res.data.length != 0) {
      setLabPartnerTestsListData(res.data);

      setPageStart(1);

      setHasMore(false);
    } else {

      setLabPartnerTestsListData([]);

      setPageStart(1);
    }

    // setText(key)

    // setHasMore(false);
    // setIsSearch(true);
    // const searchItem = labPartnerTestsListAllData.filter((item) =>
    //   item?.labTestName?.toLowerCase()?.includes(key.toLowerCase())

    // );



    // setLabPartnerTestsListData([...searchItem]);




  };

  return (
    <>
      <div
        className="p-3 lg:py-4"
        style={{ border: "1px solid #E4E4E4", borderRadius: "7px" }}
      >
        <p
          style={{ color: "#262626", marginBottom: "18px" }}
          className="text-lg md:text-2xl font-bold text-center"
        >{`All Labtest Provided by ${labData?.labName}`}</p>
        <p
          class=" text-normal text-md md:text-xl text-center"
          style={{ color: "#262626", marginBottom: "23px" }}
        >
          {" "}
          Search and find the test that suits your needs
        </p>
        <div className="m-auto md:ml-1">
          <div class=" my-2 w-11/12 md:w-96 flex m-auto justify-center md:w-auto  relative pr-2">
            <input
              onChange={(e) => {
                onChangeMed(e.target.value);
              }}
              class="w-full sm:w-1/2 rounded text-sm text-gunsmoke pl-2"
              type="text"
              value={text ?? ""}
              placeholder={"Search Lab Test"}
              style={{
                border: "1px solid #CED6E3",
                borderRadius: "5px",
                height: "45px",
              }}
            />
            <button
              onClick={_handleKeyDown}
              class=" relative md:right-12 text-white px-4"
              style={{
                background: "#18406D",
                height: "43px",
                margin: "1px 0px",
                borderTopRightRadius: "7px",
                borderBottomRightRadius: "7px",
              }}
            >
              <SearchIcon color={"white"} height="18px" width="18px" />
            </button>
          </div>
        </div>
        <div className="lg:py-6 lg:flex lg:justify-center">
          <div className="bg-white lg:mx-4 lg:w-full  lg:rounded-lg ">
            <div className="flex justify-end py-4 px-8">
              <div className=" hidden">
                <div className=" flex justify-items-auto ">
                  <div className="">
                    <div className="flex justify-items-auto">
                      <img src={filter} alt="filter" />
                      <p className="text-xs pl-2">Filter</p>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex justify-items-auto pl-4">
                      <img src={sort} alt="sort" />
                      <p className="text-xs pl-2">Sort by: Popular</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* {isLoading ?
              <div
                className="flex relative flex-wrap items-center justify-center m-5"
                style={{ height: "50vh" }}
              >
                <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
              </div>
              : ""
            } */}

            <div
              className="mx-0 sm:mx-12 md:mx-16  lg:mx-20"
              style={{
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse",
                // marginLeft:"91px",
                // marginRight:"91px"
                // minHeight: "700px"
              }}
            >
              {labPartnerTestsListData?.length > 0 ? (
                <InfiniteScroll
                  // dataLength={labPartnerTestsListData.length}

                  pageStart={0}
                  loadMore={(e) => loadFunc(e)}
                  hasMore={hasMore}
                  // style={{minHeight: '700px'}}
                  loader={
                    <div className="flex flex-wrap justify-center pl-10 pr-10 pb-10">
                      <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
                    </div>
                  }
                >
                  {labPartnerTestsListData?.length > 0 &&
                    labPartnerTestsListData?.map((res, index) => {
                      return (
                        <>
                          {screen > 450 ? (

                            <div
                              key={res.id}
                              className=" mb-6 p-2 px-4"
                              style={{
                                border: "1px solid #E8E8E8",
                                boxShadow: "12px 0px 80px rgba(222, 222, 222, 0.25)",
                                borderRadius: "7px",
                                marginBottom: "39px",
                              }}

                            // onClick={() => onClickAt(index)}
                            >


                              <div className="flex flex-col">
                                <div className="flex flex-col sm:flex-row items-center mb-3 md:mb-0">
                                  <img
                                    className="h-12 md:h-16 lg:h-8"
                                    src={labImage}
                                    alt=""
                                  />
                                  <div
                                    style={{
                                      height: "48px",
                                      width: "1.12px",
                                      background: "#E8E8E8",
                                    }}
                                    className="mx-8 hidden sm:block"
                                  ></div>
                                  <div className="lg:w-8/12 mb-2">
                                    <div className="flex justify-between items-center mr-10">
                                      <h6 className="text-lg text-center sm:text-left font-semibold text-neutral-800">
                                        {res?.labTestName}
                                      </h6>

                                      {/* {res?.isActive ? (
                      <ArrowDownIcon className="w-4 h-4" />
                    ) : (
                      <ArrowUpIcon className="w-4 h-4" />
                    )} */}
                                    </div>
                                    {/* <div className="flex flex-col md:flex-row justify-between items-center mt-4 sm:mt-0 sm:w-4/5">
                    <div className="text-xs font-normal text-neutral-800">
                    {res?.locationName}
                    </div>
                    <div className="text-xs font-bold  text-neutral-800 my-1">
                    Labs -{" "}
                    <span className="text-xs font-normal  text-neutral-800">
                      {res?.labName}
                    </span>
                    </div>
                    </div> */}
                                  </div>
                                  <div className="hidden sm:block sm:w-1/5"> </div>
                                  <div className="flex mt-4 sm:mt-0 justify-between w-full lg:w-4/12">
                                    <div className="block sm:hidden">{renderAmount(res)}</div>

                                    <div className="hidden sm:block sm:w-3/5 ">
                                      {renderAmount(res)}
                                    </div>

                                    <button
                                      className=" text-white  text-sm font-bold px-2 py-2 rounded cursor-pointer lg:px-18"
                                      style={{ backgroundColor: "#66B889" }}
                                      onClick={(e) => {
                                        addtoCart(e, res, index);
                                      }}
                                      disabled={
                                        drugIDsInCart.indexOf(res.labTestCode) !== -1
                                          ? true
                                          : false
                                      }
                                    >
                                      {drugIDsInCart.indexOf(res.labTestCode) === -1
                                        ? "Add to cart"
                                        : "ADDED"}{" "}
                                    </button>
                                  </div>
                                </div>

                                <div className="flex ml-0 md:ml-24 w-full">
                                  <p className="ml-1 text-xs w-10/12 md:w-6/12">
                                    <b>Test Display Name:</b> {res.testDisplayName}
                                  </p>
                                  {/* <div className="hidden sm:block sm:w-1/5 ml-36">
                          {renderAmount(res)}
                        </div> */}
                                </div>

                                <div className="flex mt-3 md:mt-3 ml-0 md:ml-24 w-full">
                                  <div className="flex w-11/12 md:w-6/12">
                                    <p className="ml-1 mr-6 text-xs">
                                      <b>Test Type:</b> {res.testType}
                                    </p>

                                    {/* <div className="flex">
                                      <p className="ml-1 mr-1 text-xs cursor-pointer">
                                        <b>Lab Name:</b>
                                      </p>

                                      <p
                                        className="ml-1 mr-6 text-xs underline cursor-pointer"
                                        onClick={(e) => {
                                          redirectTo(e, res);
                                        }}
                                      >
                                        {res.labName}
                                      </p>
                                    </div> */}
                                    {/* <p className="ml-1 mr-6 text-xs">
                                      <b>City:</b> {res.city}
                                    </p> */}
                                  </div>

                                  {
                                    (res?.tat || res?.description || res?.testType === "Radiology") &&
                                  
                                  <div
                                    className="flex justify-center ml-8 text-xs w-4/12"
                                    onClick={() => onClickAt(index)}
                                  >
                                    {res?.isActive ? (
                                      <>
                                        {screen > 450 ? (
                                         

                                          <p
                                            className="flex cursor-pointer"
                                            style={{ color: "#38bdf8" }}
                                          >
                                            Read More
                                            <ArrowDownIcon className="w-3 h-3 ml-1" />
                                          </p>
                                        ) : (
                                          <p
                                            className="flex cursor-pointer"
                                            style={{ color: "#38bdf8" }}
                                          >
                                            <ArrowDownIcon className="w-3 h-3 ml-1" />
                                          </p>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        {screen > 450 ? (
                                          <p
                                            className="flex cursor-pointer"
                                            style={{ color: "#38bdf8" }}
                                          >
                                            Read Less
                                            <ArrowUpIcon className="w-3 h-3 ml-1" />
                                          </p>
                                        ) : (
                                          <p
                                            className="flex cursor-pointer"
                                            style={{ color: "#38bdf8" }}
                                          >
                                            <ArrowUpIcon className="w-3 h-3 ml-1" />
                                          </p>
                                        )}
                                      </>
                                    )}
                                  </div>
                          }
                                </div>
                              </div>
                              {!res?.isActive && (
                                <div className="text-xs font-normal text-neutral-800 lg:ml-24 mt-2">
                                  {/* <div className="mt-3">
                  <p className="ml-1"><b>Description:{" "}</b></p>
                </div> */}
                                  {/* <div className="mt-4">
                                    <p className="ml-1">
                                      <b>Address:</b> {res?.address1}{" "}
                                      {res?.address2 === "NULL" ? "" : res?.address2}{" "}
                                      {res?.pinCode}
                                      {","} {res?.city}
                                    </p>
                                  </div> */}


                                  {res?.description && 
                                    <div className="mt-4 ml-1 text-xs">
                                      <p>
                                        <b>Description: </b>{res?.description}
                                      </p>
                                    </div>
                                  }

                                  {res?.testType === "Radiology" ? (

                                    
                                    <div className="mt-4 ml-1 text-xs">
                                      <p>
                                        <b>Remark: </b>Someone from customer service will
                                        connect with you to schedule the appointment
                                      </p>
                                    </div>
                                  ) : (
                                    <p></p>
                                  )}

                                  {res?.tat && 
                                    <div className="mt-4 ml-1 text-xs">
                                      <p>
                                        <b>TAT: </b>{res?.tat}
                                      </p>
                                    </div>
                                  }
                                  
                                </div>
                              )}
                            </div>
                          ) : (
                            <div
                              key={res.id}
                              className=" mb-6 p-2 px-4"
                              style={{
                                border: "1px solid #E8E8E8",
                                boxShadow: "12px 0px 80px rgba(222, 222, 222, 0.25)",
                                borderRadius: "7px",
                                marginBottom: "39px",
                              }}

                            // onClick={() => onClickAt(index)}
                            >


                              <div className="flex flex-col">
                                <div className="flex flex-col sm:flex-row items-center mb-3 md:mb-0">
                                  <img
                                    className="h-12 md:h-16 lg:h-8"
                                    src={labImage}
                                    alt=""
                                  />
                                  <div
                                    style={{
                                      height: "48px",
                                      width: "1.12px",
                                      background: "#E8E8E8",
                                    }}
                                    className="mx-8 hidden sm:block"
                                  ></div>
                                  <div className="lg:w-3/6">
                                    <div className="flex justify-between items-center">
                                      <h6 className="text-lg text-center sm:text-left font-semibold text-neutral-800">
                                        {res?.labTestName}
                                      </h6>

                                      {/* {res?.isActive ? (
                      <ArrowDownIcon className="w-4 h-4" />
                    ) : (
                      <ArrowUpIcon className="w-4 h-4" />
                    )} */}
                                    </div>
                                    {/* <div className="flex flex-col md:flex-row justify-between items-center mt-4 sm:mt-0 sm:w-4/5">
                    <div className="text-xs font-normal text-neutral-800">
                    {res?.locationName}
                    </div>
                    <div className="text-xs font-bold  text-neutral-800 my-1">
                    Labs -{" "}
                    <span className="text-xs font-normal  text-neutral-800">
                      {res?.labName}
                    </span>
                    </div>
                    </div> */}
                                  </div>
                                  <div className="hidden sm:block sm:w-1/5"> </div>
                                  <div className="flex mt-4 sm:mt-0 justify-between w-full lg:w-1/5 sm:justify-end">
                                    <div className="block sm:hidden">{renderAmount(res)}</div>
                                    <button
                                      className=" text-white  text-sm font-bold px-2 py-2 rounded cursor-pointer lg:px-12"
                                      style={{ backgroundColor: "#66B889" }}
                                      onClick={(e) => {
                                        addtoCart(e, res, index);
                                      }}
                                      disabled={
                                        drugIDsInCart.indexOf(res.labTestCode) !== -1
                                          ? true
                                          : false
                                      }
                                    >
                                      {drugIDsInCart.indexOf(res.labTestCode) === -1
                                        ? "Add to cart"
                                        : "ADDED"}{" "}
                                    </button>
                                  </div>
                                </div>

                                <div className="flex ml-0 md:ml-24 w-full">
                                  <p className="ml-1 text-xs w-full md:w-6/12">
                                    <b>Test Display Name:</b> {res.testDisplayName}
                                  </p>
                                  <div className="hidden sm:block sm:w-1/5 ml-36">
                                    {renderAmount(res)}
                                  </div>
                                </div>

                                <div className="flex mt-3 md:mt-1 ml-0 md:ml-24 w-full">
                                  <div className="flex w-1/2 md:w-6/12">
                                    <p className="ml-1 text-xs">
                                      <b>Test Type:</b> {res.testType}
                                    </p>
                                  </div>

                                  {/* <div className="flex mt-4">
                                    <p className="ml-1 mr-1 text-xs cursor-pointer">
                                      <b>Lab Name:</b>
                                    </p>

                                    <p
                                      className="ml-1 mr-6 text-xs underline cursor-pointer"
                                      onClick={(e) => {
                                        redirectTo(e, res);
                                      }}
                                    >
                                      {res.labName}
                                    </p>
                                  </div> */}

                                  <div className="flex  w-1/2">

                                    {/* <p className="ml-1 mr-6 text-xs w-1/2">
                                      <b>City:</b> {res.city}
                                    </p> */}
                                   { (res?.tat || res?.description || res?.testType === "Radiology") &&
                                    <div
                                      className="flex justify-end ml-4 text-xs w-10/12"
                                      onClick={() => onClickAt(index)}
                                    >
                                      {res?.isActive ? (
                                    

                                       


                                        <p
                                          className="flex cursor-pointer"
                                          style={{ color: "#38bdf8" }}
                                        >
                                          Read More
                                          <ArrowDownIcon className="w-3 h-3 ml-1" />
                                        </p>



                                      ) : (

                                        <p
                                          className="flex cursor-pointer"
                                          style={{ color: "#38bdf8" }}
                                        >
                                          Read Less
                                          <ArrowUpIcon className="w-3 h-3 ml-1" />
                                        </p>

                                      )}
                                    </div>

                          }

                                  </div>

                                </div>
                              </div>
                              {!res?.isActive && (
                                <div className="text-xs font-normal text-neutral-800 lg:ml-24 mt-2">
                                  {/* <div className="mt-3">
                  <p className="ml-1"><b>Description:{" "}</b></p>
                </div> */}
                                  {/* <div className="mt-4">
                                    <p className="ml-1">
                                      <b>Address:</b> {res?.address1}{" "}
                                      {res?.address2 === "NULL" ? "" : res?.address2}{" "}
                                      {res?.pinCode}
                                      {","} {res?.city}
                                    </p>
                                  </div> */}

                                  {res?.description && 
                                    <div className="mt-4 ml-1 text-xs">
                                      <p>
                                        <b>Description: </b>{res?.description}
                                      </p>
                                    </div>
                                  }
                                  {res?.testType === "Radiology" ? (
                                    <div className="mt-4 ml-1 text-xs">
                                      <p>
                                        <b>Remark: </b>Someone from customer service will
                                        connect with you to schedule the appointment
                                      </p>
                                    </div>
                                  ) : (
                                    <p></p>
                                  )}

                                  {res?.tat && 
                                    <div className="mt-4 ml-1 text-xs">
                                      <p>
                                        <b>TAT: </b>{res?.tat}
                                      </p>
                                    </div>
                                  }
                                </div>
                              )}
                            </div>
                          )
                          }
                        </>
                      );
                    })}
                </InfiniteScroll>
              ) : (
                <div className="w-full flex flex-col items-center justify-around">
                  <img
                    className="h-24 lg:h-28  lg:mt-0 "
                    src={noDataFound}
                    alt="No Lab test found Available"
                  />
                  <h4 className="font-medium  text-gray-400 text-md">
                    No Test found
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
        {isOpen ? (
          <LabTestModal
            open={isOpen}
            handleChange={handleChange}
            toggleSelectAll={toggleAllChange}
            onClose={() => {
              setOpen(false);
              addtoCart();
            }}
            data={childData}
            tests={chosenTests}
          />
        ) : (
          ""
        )}
      </div>

      <Dialog
        visible={openDialog}
        modal={false}
        style={{ width: "700px", height: "auto" }}
        // className="w-20 m-auto lg:w-5/6 h-auto"
        onHide={() => setDialog(false)}
      >
        <>
          <div className="flex justify-center  align-middle inline-bloc">
            <div className="flex">
              <img src={LabTestIcon} alt="No Lab test found Available" />
            </div>
            <div className="font my-8 text-center  ">
              {" "}
              {`You have added tests from  ${labNewName} lab in your cart. Select this test from the same lab or replace the tests in your cart.`}
              {``}
            </div>
          </div>
        </>
      </Dialog>
    </>
  );
}
export default AllLabtest;
