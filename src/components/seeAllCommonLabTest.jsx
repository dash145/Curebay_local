import React, { useState } from 'react'
import diagno from '../Assets/Images/prescription.svg';
import report from '../Assets/Images/tube.svg';
import location from '../Assets/Images/Locationh.svg';
import { useDispatch, useSelector } from "react-redux";
import labImage from '../Assets/Images/lab.svg';

import SectionContainer from './SectionContainer';
import { useLocation, useHistory } from 'react-router-dom';
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import moment from "moment";
import {
  AddtoCart,
  getCartDetails,
} from "../Redux/Actions/cartPlaceOrderAction";
import { Dialog } from "primereact/dialog";
import { MinusIcon, PlusIcon, ArrowDownIcon, ArrowUpIcon, ArrowCircleDownIcon } from "@heroicons/react/outline";


function SeeAllCommonLabTest() {

  const { state } = useLocation();
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.authReducer.patientData);
  const { cartList } = useSelector((state) => state.cartReducer);
  const [openDialog, setDialog] = useState(false);
  const [labNewName, setLabNewName] = useState("");
  const [isAdding, setIsAdding] = useState(-1);

  const [searchedLabtest, setSearchedLabtest] = useState([...state]);
  const [pathName, setPathName] = useState(null)
  const history = useHistory();

  console.log(JSON.stringify(state), "Labs data")




  const [screen, setscreen] = React.useState(window.innerWidth);

  React.useEffect(() => {

    let temp=window.location.pathname
    setPathName(temp)
    console.log(temp,"qqqqqqqqqq22222222");
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;

      setscreen(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
    

  }, []);




  const redirectToLogin = (event, location) => {

    event.preventDefault();
    history.push(location);
  };
  const addtoCart = (e, data, index, quantity = 1) => {
    console.log(data, "sdisdhvod")
    if (!userData.code) {
      redirectToLogin(e, { pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } })
    }

    if (cartList?.patientLabTestsOrder) {
      let availableItem = cartList?.patientLabTestsOrder.find(
        (item) => item.hospitalId === data.labId
      );

      if (availableItem === undefined) {
        setDialog(true);
        setLabNewName(cartList?.patientLabTestsOrder[0]?.patientLabTestsOrderDetailsList[0]?.hospitalName)
        return;
      }
    }



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
              discountAmount: data?.discountAmount,
              totalAmount: totalAmount,
              status: 1,
              labTestType: data?.labTestType,
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
    console.log(JSON.stringify(dataObj), "helloooo");

    dispatch(AddtoCart(dataObj)).then((res) => {
      dispatch(getCartDetails(userData.code));
      setIsAdding(-1);
    });
  };


  const redirectTo = (event, data) => {
    event.preventDefault();

    history.push({ pathname: APP_ROUTES.LALPATH_LAB, state: data });

  };


  const onClickAt = (index) => {

    searchedLabtest[index].isActive = searchedLabtest[index].isActive === true ? false : true

    setSearchedLabtest([...searchedLabtest])
  }

  const drugIDsInCart = getProductsIDs();

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
  const renderAmount = (res) => {
    return <> {res?.discountPercentage ? (
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
  }

  return (
    <>

      <ul className="flex text-brand-secondary text-sm lg:text-base pl-10 pt-5">
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
          <a href="/diagnosis">Diagnostics</a>
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
          <a>Lab Tests</a>
          
        </li>
       
      </ul>

      <br />
      <div className="w-full px-0 xl:px-16 pt-5 ">
        <SectionContainer link={''} title={'Available Lab Test(s)'} subtitle={'Showing 9 of 24 items'} seeAll={'hide'} />
        <div className="mt-5">

          <div className="lg:w-5/6 mt-6" style={{ margin: "auto", marginTop: "2rem" }}>
            {searchedLabtest?.filter(item=>item.labName !=="eClinic Lab")?.map((res, index) => {
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
                          {res.testDisplayName &&
                            <p className="ml-1 text-xs w-10/12 md:w-6/12">
                              <b>Test Display Name:</b> {res.testDisplayName}
                            </p>
                          }
                          {/* <div className="hidden sm:block sm:w-1/5 ml-36">
                          {renderAmount(res)}
                        </div> */}
                        </div>

                        <div className="flex mt-3 md:mt-3 ml-0 md:ml-24 w-full">
                          <div className="flex w-11/12 md:w-6/12">

                            {res.labTestType &&
                              <p className="ml-1 mr-6 text-xs">
                                <b>Test Type:</b> {res.labTestType}
                              </p>
                            }

                            <div className="flex">
                              <p className="ml-1 mr-1 text-xs cursor-pointer">
                                <b>Lab Name:</b>
                              </p>

                              <p
                                className="ml-1 mr-6 text-xs underline cursor-pointer"
                                style={{ color: "#38bdf8" }}
                                onClick={(e) => {
                                  redirectTo(e, res);
                                  localStorage.setItem("pathName", pathName )
                                }}
                              >
                                {res.labName}
                              </p>
                            </div>

                            {res.city &&
                              <p className="ml-1 mr-6 text-xs">
                                <b>City:</b> {res.city}
                              </p>
                            }

                          </div>
                          <div
                            className="flex justify-center ml-8 text-xs w-4/12"
                            onClick={() => onClickAt(index)}
                          >
                            {!res?.isActive ? (
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
                        </div>
                      </div>
                      {res?.isActive && (
                        <div className="text-xs font-normal text-neutral-800 lg:ml-24 mt-2">
                         

                {
                  res?.description &&
                

                <div className="mt-4">
                          <p className="ml-1">
                            <b>Description:</b> {res?.description}{" "}
                            
                          </p>
                        </div>
                }
                          <div className="mt-4">
                            <p className="ml-1">
                              <b>Address:</b> {res?.address1}{" "}
                              {res?.address2 === "NULL" ? "" : res?.address2}{" "}
                              {res?.pinCode}
                              {","} {res?.city}
                            </p>
                          </div>
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

                          { res?.tat &&
                          <div className="mt-4">
                          <p className="ml-1">
                            <b>TAT: </b>
                            {res?.tat}
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

                          {res.testDisplayName &&
                            <p className="ml-1 text-xs w-10/12 md:w-6/12">
                              <b>Test Display Name:</b> {res.testDisplayName}
                            </p>
                          }
                          <div className="hidden sm:block sm:w-1/5 ml-36">
                            {renderAmount(res)}
                          </div>
                        </div>

                        <div className="flex flex-col mt-3 md:mt-1 ml-0 md:ml-24 w-full">

                          {res.labTestType &&
                            <div className="flex w-11/12 md:w-6/12">
                              <p className="ml-1 mr-6 text-xs">
                                <b>Test Type:</b> {res.labTestType}
                              </p>
                            </div>
                          }

                          <div className="flex mt-4">
                            <p className="ml-1 mr-1 text-xs cursor-pointer">
                              <b>Lab Name:</b>
                            </p>

                            <p
                              className="ml-1 mr-6 text-xs underline cursor-pointer"
                              style={{ color: "#38bdf8" }}
                              onClick={(e) => {
                                redirectTo(e, res);
                                localStorage.setItem("pathName", pathName )
                              }}
                            >
                              {res.labName}
                            </p>
                          </div>

                          <div className="flex mt-4 w-full">

                            {res.city &&
                              <p className="ml-1 mr-6 text-xs w-1/2">
                                <b>City:</b> {res.city}
                              </p>
                            }

                            <div
                              className="flex justify-end text-xs w-1/2"
                              onClick={() => onClickAt(index)}
                            >
                              {!res?.isActive ? (


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

                          </div>

                        </div>
                      </div>
                      {res?.isActive && (
                        <div className="text-xs font-normal text-neutral-800 lg:ml-24 mt-2">
                          {/* <div className="mt-3">
                  <p className="ml-1"><b>Description:{" "}</b></p>
                </div> */}

                {
                  res?.description &&
                

                <div className="mt-4">
                          <p className="ml-1">
                            <b>Description:</b> {res?.description}{" "}
                            
                          </p>
                        </div>
                }
                          <div className="mt-4">
                            <p className="ml-1">
                              <b>Address:</b> {res?.address1}{" "}
                              {res?.address2 === "NULL" ? "" : res?.address2}{" "}
                              {res?.pinCode}
                              {","} {res?.city}
                            </p>
                          </div>
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

                          { res?.tat &&
                          <div className="mt-4">
                          <p className="ml-1">
                            <b>TAT: </b>
                            {res?.tat}
                          </p>
                        </div>
                        }
                        </div>
                      )}
                    </div>
                  )
                  }
                </>

                //     <div key={res.id} className="border mb-6 p-2 px-4 rounded shadow">
                //       <h6 className="text-sm  font-medium text-gray-900">
                //         {res?.labTestName}
                //       </h6>
                //       <div className="flex justify-between items-center">
                //         <div>
                //           <div className="text-xs  text-gray-400">
                //             {res?.locationName}
                //           </div>
                //           <div className="text-sm  text-gray-900 my-1">
                //             Lab -{" "}
                //             <span className="text-xs  text-gray-400">
                //               {res?.labName}
                //             </span>
                //           </div>
                //         </div>
                //         {res?.discountAmount ? (
                //           <div>
                //             <div>
                //               {" "}
                //               <span className="text-gray-500 line-through text-xs font-medium">
                //                 ₹ {res?.amount}
                //               </span>{" "}
                //               <span className="text-xs text-green-500 font-medium">
                //                 ₹ {res?.discountAmount}
                //               </span>{" "}
                //             </div>
                //             <div className="border border-dashed border-green-500 text-xs bg-green-50 text-green-500 font-medium py-1 px-2">
                //               {res?.discountPercentage}% off
                //             </div>
                //           </div>
                //         ) : (
                //           <div>
                //             <div>
                //               {" "}
                //               <span className="text-sm text-green-500 font-medium">
                //                 ₹ {res?.amount}
                //               </span>{" "}
                //             </div>
                //             {/* <div className='border border-dashed border-green-500 text-xs bg-green-50 text-green-500 font-medium py-1 px-2' >{res?.discountPercentage}% off</div> */}
                //           </div>
                //         )}
                //       </div>
                //       <div className="flex justify-end mt-4">
                //         <button className="bg-brand-secondary text-white  text-sm font-medium px-2 py-2 rounded cursor-pointer"



                // onClick={(e) => {
                //                       addtoCart(e, res, index);
                //                     }}

                // 			>
                // 			Add to cart

                //         </button>
                //       </div>
                //     </div>
              );
            })}
          </div>
        </div>

      </div>
      <Dialog

        visible={openDialog}
        modal={false}
        style={{ width: "500px", height: 'auto' }}
        // className="w-20 m-auto lg:w-5/6 h-auto"
        onHide={() => setDialog(false)}
      >
        <>
          <div className="text-center">


            <div className="font-medium my-2 mx-4">
              {" "}
              {`Radiology and Pathology Tests cannot be booked together`}
            </div>
          </div>
        </>
      </Dialog>
    </>
  );
}
export default SeeAllCommonLabTest;
