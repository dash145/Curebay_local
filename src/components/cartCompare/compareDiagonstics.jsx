import React, { useEffect, useState } from "react";
import Diagnostics from "../../Assets/Images/Diagnostics.svg";
import info from "../../Assets/Images/info.svg";
import SectionContainer from "../SessionContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getLabTestsViaVisit,
  getPrescribedDiagonisCenters,
} from "../../Redux/Actions/getQuotation";
import {
    AddtoCart,
    getCartDetails,
  } from "../../Redux/Actions/cartPlaceOrderAction";
import { useLocation } from "react-router";
import getQuotation from "../../Redux/services/getQuotation";
import Lab from "../../components/Lab";
import { propTypes } from "react-bootstrap/esm/Image";
import { ToastContainer, toast } from "react-toastify";
import {clearLabTestData, getlabPartnerslist} from '../../Redux/Actions/DiagnosticsActions';

function CompareDiagnosisPrescription(props) {
  const location = useLocation();
  const data = location.state;

  // const quotLabTests = useSelector((state) => state.quotLabTests);
  const quotDiagnosis = useSelector((state) => state.quotDiagnosis);
  const userData = useSelector((state) => state.authReducer.patientData);
  const { cartList } = useSelector((state) => state.cartReducer);
  const cheUserData = useSelector((state) => state.authReducer.userData);
  const lablistData = useSelector(state => state.listpartnerslab);
	const { partnerlablisttData, isLoading } = lablistData
  const [diagnosticsList, setDiagnosticsList] = useState([]);
  const {coords} = useSelector(state => state.authReducer);

  const [isAdding, setIsAdding] = useState(-1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLabTestsViaVisit(data.visitId));
    dispatch(getPrescribedDiagonisCenters(data.prescriptionId));
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(getCartDetails(userData.code));
  }, [dispatch, userData.code]);

  useEffect(() => {
    console.log('Added To Cart : ' + props.addedToCart);
    dispatch(getCartDetails(userData.code));
  }, [dispatch, props.addedToCart]);

  useEffect(() => {
    dispatch(clearLabTestData());
    const loginObj = JSON.parse(localStorage.getItem("loginObj"));
    const hospitalid = localStorage.getItem("hospitalid")
    console.log("hospitalid", hospitalid)
    const locationid = localStorage.getItem("locationid")
    console.log("locationid", locationid)
    dispatch(getlabPartnerslist(sessionStorage.getItem('customPinCode'))).then((res) => {
      console.log(res, "dsvbsdljblsdbjsd");
    });
    console.log(partnerlablisttData);
  }, [dispatch]);

  const calculateTotal = (tests) => {
    let total = 0;

    tests?.forEach((test) => {
      if(test.serviceDiscountPercentage){
        total += (test.amount - ((test.amount/100) * test.serviceDiscountPercentage));
      } else{
        total += test.amount;
      }
     
    });
    return total;
  };

  const handleChange = (e) => {
    let payload = {
      status: 1,
      prescriptionId: data.prescriptionId,
      locationId: e.target.value
    }
    getQuotation.getPrescriptionDiagnosticsCenters(payload).then((res) => {
      if (res.data) {
        setDiagnosticsList(res.data);
      }
    }, (err) => {
      console.log(err);
    })
  }

  const selectedDiagnostics = (e) => {
    let payload = {
      status: 1,
      locationId: e.locationId,
      prescriptionId: data.prescriptionId,
    }
    console.log(payload , "payloaddddd")
    getQuotation.getPrescriptionDiagnosticsCenters(payload).then((res) => {
      if(res.data.length == 0) {
        toast("Prescribed tests are not available in the diagnostic center");
      } else{
        setDiagnosticsList(res.data);
      }
    }, (err) => {
      console.log(err);
    })
  }

  const checkAlreadyAdded = (test) => {
    if(cartList && cartList.patientLabTestsOrder) {
      let added = false;
      cartList.patientLabTestsOrder.forEach(element => {
        if(element.locationId == test.locationId) {
          added = true;
        }
      });
      console.log('Order Location : ' + test.locationId);
      return added;
    }
    return false;
  }

  const addLabTestToCart = (e, prescribedTest, index) => {
    e.preventDefault();
    setIsAdding(index);

    let dataObj = {};

    let isAdded = false;

    if (cartList && cartList.patientLabTestsOrder) {
      cartList.patientLabTestsOrder.forEach(element => {
        if (element.locationId == prescribedTest.locationId) {
          isAdded = true;
          for (const data of prescribedTest.labTestList) {
            element.patientLabTestsOrderDetailsList.push(
              {
                amount: data.amount,
                discountAmount : data.serviceDiscountPercentage ? (data.amount/100) * data.serviceDiscountPercentage : "",
              discountPercentage:  data.serviceDiscountPercentage ? data.serviceDiscountPercentage : 0,
              serviceDiscountPercentage: data.discountPercentage,
                createdBy: userData.code,
                hospitalId: prescribedTest.hospitalId,
                labTestCode: data.code,
                labTestName: data.labTestName,
                locationId: prescribedTest.locationId,
                modifiedBy: userData.code,
                parentId: data.parentId,
                parentTestCode: data.parentTestCode,
                parentTestName: data.parentTestName,
                preferDateTime: "",
                patientId: userData.code,
                photoRequired: data.photoRequired,
                status: 1,
                visitId: data.visitId ? data.visitId : 0
              }
            )
          }
        }
      });
      if (!isAdded) {
        let diagnosticsObj = {
          cartId: cartList && cartList.id ? cartList.cartId : "",
          createdBy: userData.code,
          hospitalId: prescribedTest.hospitalId,
          hospitalName: prescribedTest.hospitalName,
          locationId: prescribedTest.locationId,
          locationName: prescribedTest.locationName,
          cheid: localStorage.getItem('hospitalid'),
          chelocationId: localStorage.getItem('locationid'),
          cheBranchId: localStorage.getItem('locationid'),
          cheCenterId: localStorage.getItem('hospitalid'),
          modifiedBy: userData.code,
          homeSampleCollectionStatus: -1,
          patientId: userData.code,
          txnId: "",
          preferDateTime: "",
          requestDateTime: "",
          visitdiagnostic: "Y",
          patientLabTestsOrderDetailsList: [],
          status: 1,
          visitId: data.visitId ? data.visitId : 0
        }
        for (const data of prescribedTest.labTestList) {
          diagnosticsObj.patientLabTestsOrderDetailsList.push(
            {
              amount: data.amount,
              discountAmount : data.serviceDiscountPercentage ? (data.amount/100) * data.serviceDiscountPercentage : "",
              discountPercentage:  data.serviceDiscountPercentage ? data.serviceDiscountPercentage : 0,
              serviceDiscountPercentage: data.discountPercentage,
              createdBy: userData.code,
              hospitalId: prescribedTest.hospitalId,
              labTestCode: data.code,
              labTestName: data.labTestName,
              locationId: prescribedTest.locationId,
              modifiedBy: userData.code,
              parentId: data.parentId,
              parentTestCode: data.parentTestCode,
              parentTestName: data.parentTestName,
              preferDateTime: "",
              patientId: userData.code,
              photoRequired: data.photoRequired,
              status: 1,
              visitId: data.visitId ? data.visitId : 0
            }
          )
        }
        cartList.patientLabTestsOrder.push(diagnosticsObj);
      }
      dataObj = cartList;
    } else {
      dataObj = {
        cartId: cartList && cartList.id ? cartList.cartId : "",
        createdBy: userData.code,
        drugsOrdersYN: false,
        labOrdersYN: true,
        modifiedBy: userData.code,
        patientId: userData.code,
        visitId: data.visitId ? data.visitId : 0,
        patientLabTestsOrder: [
          {
            createdBy: userData.code,
            hospitalId: prescribedTest.hospitalId,
            hospitalName: prescribedTest.hospitalName,
            locationId: prescribedTest.locationId,
            locationName: prescribedTest.locationName,
            cheid: localStorage.getItem('hospitalid'),
        chelocationId: localStorage.getItem('locationid'),
        cheBranchId: localStorage.getItem('locationid'),
        cheCenterId: localStorage.getItem('hospitalid'),
            modifiedBy: userData.code,
            homeSampleCollectionStatus: -1,
            patientId: userData.code,
            txnId: "",
            preferDateTime: "",
            requestDateTime: "",
            visitdiagnostic: "Y",
            patientLabTestsOrderDetailsList: [],
            status: 1,
            visitId: data.visitId ? data.visitId : 0
          }
        ],
        status: 1,
      }

      for (const data of prescribedTest.labTestList) {
        dataObj.patientLabTestsOrder[0].patientLabTestsOrderDetailsList.push(
          {
            amount: data.amount,
            discountAmount : data.serviceDiscountPercentage ? (data.amount/100) * data.serviceDiscountPercentage : "",
              discountPercentage:  data.serviceDiscountPercentage ? data.serviceDiscountPercentage : 0,
              serviceDiscountPercentage: data.discountPercentage,
            createdBy: userData.code,
            hospitalId: prescribedTest.hospitalId,
            labTestCode: data.code,
            labTestName: data.labTestName,
            locationId: prescribedTest.locationId,
            modifiedBy: userData.code,
            parentId: data.parentId,
            parentTestCode: data.parentTestCode,
            parentTestName: data.parentTestName,
            preferDateTime: "",
            patientId: userData.code,
            photoRequired: data.photoRequired,
            status: 1,
            visitId: data.visitId ? data.visitId : 0,
          }
        )
      }
    }
    console.log(JSON.stringify(dataObj));
    dispatch(AddtoCart(dataObj)).then(() => {
      setIsAdding(-1);
      props.cartRefresh();
    });
  };

  console.log(data , "partnerlablisttData")
  console.log(quotDiagnosis?.prescribedDiagnosisCenters , "partnerlablisttData")

  return (
    <>
    <ToastContainer />
      {/* breadcrumbs */}
      <ul className="hidden flex text-brand-secondary text-sm lg:text-base pl-10 pt-5">
        <li className="inline-flex items-center">
          <a href="/dashboard">Home</a>
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
          <a href="/components">Medicines</a>
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
          <a href="/components">Prescription Approved</a>
        </li>
      </ul>
      <br />
      {quotDiagnosis?.prescribedDiagnosisCenters?.length > 0 && (
        <div className="flex justify-between">
          <SectionContainer
            link={""}
            title={"Choose from one of our trusted Labs"}
          //subtitle={"Complete cart from one Labs"}
          //seeAll={"hide"}
          />
        </div>
      )}
      {quotDiagnosis?.prescribedDiagnosisCenters?.length == 0 && (
        <div className="flex justify-between">
          <SectionContainer
            link={""}
            title={"Requested tests not available"}
          />
        </div>
      )}
      {!data.search && (
        <div className="pl-10 pr-10 pt-5 pb-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {!data.search && partnerlablisttData.length >0 && quotDiagnosis?.prescribedDiagnosisCenters?.filter(item =>{
              if(partnerlablisttData.find(res => res.facilityHospitalName == item.hospitalName)){
                return item
            }
          }).map((res, i) => {
            console.log(res);
            return (
              <div
                key={i}
                className="rounded-xl overflow-hidden shadow-sm border border-gray-200 "
              >
                <div className="flex ">
                  <div className="w-12 h-12 rounded bg-red-100 ml-5 pt-2 mt-2 ">
                    <img
                      className="w-8 ml-2 "
                      src={Diagnostics}
                      alt="Diagnostics"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <p className="text-xs pt-2 pl-3 font-medium">
                        {res.diagnosticName}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-xs pl-3 text-gray-400">
                        {res.locationName}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 border-t border-b">
                  <div className="px-6 py-2">
                    {res.labTestList?.map((test, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-2 space-x-10 gap-24 justify-start mt-3 "
                      >
                        <span className="text-xs flex font-medium mt-1 justify-between">
                          {test.labTestName}
                          <img src={info} alt="info" className="w-5 " />
                        </span>
                        {test.serviceDiscountPercentage ?(
                      <div>
                        <p className="text-xs flex justify-end font-medium text-black mt-1 line-through">
                      ₹{test.amount}
                    </p>
                     <p className="text-xs flex justify-end font-medium text-black mt-1">
                     ₹{test.amount - ((test.amount/100) * test.serviceDiscountPercentage)}
                   </p>
                        </div>
                    
                    ): (
                    <p className="text-xs flex justify-end font-medium text-black mt-1">
                      ₹{test.amount}                    
                    </p>)}
                      </div>
                    ))}
                  </div>

                  <div className="px-6 pt-4 pb-2">
                    <div className="flex justify-between">
                      <div className="flex">
                        <p className="text-sm font-medium">Total Bill: </p>
                        <div className="flex pl-3">
                          <p className="text-sm font-medium">
                            ₹{calculateTotal(res.labTestList)}
                          </p>
                          {/* <p className="text-xs line-through text-gray-300">
                          ₹900
                        </p> */}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          addLabTestToCart(e, res, i);
                        }}
                        disabled={
                          isAdding !== -1 || !(res.labTestList?.length > 0) || checkAlreadyAdded(res)
                        }
                        className="bg-brand-secondary  text-white text-xs py-2 px-2 rounded disabled:opacity-50"
                      >
                        {checkAlreadyAdded(res) ? 'Added' : 'Add to Cart'}
                        {/*Add to Cart*/}
                        {i === isAdding && (
                          <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5 disabled:opacity-50"></div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      )}

      {data.search && quotDiagnosis?.prescribedDiagnosisCenters?.length > 0 && (
        <Lab
          ePrescription={true}
          diagnosticsSelected={selectedDiagnostics}
        ></Lab>
      )}

      {data.search && diagnosticsList.map((res, i) => {
        console.log(res);
        return (
          <div
            key={i}
            className="rounded-xl overflow-hidden shadow-sm border border-gray-200 mb-10 "
          >
            <div className="flex ">
              <div className="w-12 h-12 rounded bg-red-100 ml-5 pt-2 mt-2 ">
                <img
                  className="w-8 ml-2 "
                  src={Diagnostics}
                  alt="Diagnostics"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <p className="text-xs pt-2 pl-3 font-medium">
                    {res.diagnosticName}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs pl-3 text-gray-400">
                    {res.locationName}
                  </p>
                  {/* <p className="text-xs pl-6 text-gray-400">ETA - 56 mins</p> */}
                </div>
              </div>
            </div>
            <div className="mt-2 border-t border-b">
              <div className="px-6 py-2">
                {res.labTestList?.map((test, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 space-x-10 gap-24 justify-start mt-3 "
                  >
                    <span className="text-xs flex font-medium mt-1 justify-between">
                      {test.labTestName}
                      {/*<img src={info} alt="info" className="w-5 " />*/}
                    </span>
                    {test.serviceDiscountPercentage ?(
                      <div>
                        <p className="text-xs flex justify-end font-medium text-black mt-1 line-through">
                      ₹{test.amount}
                    </p>
                     <p className="text-xs flex justify-end font-medium text-black mt-1">
                     ₹{test.amount - ((test.amount/100) * test.serviceDiscountPercentage)}
                   </p>
                        </div>
                    
                    ): (
                    <p className="text-xs flex justify-end font-medium text-black mt-1">
                      ₹{test.amount}
                    </p>)}
                    
                  </div>
                ))}
              </div>

              <div className="px-6 pt-2 pb-2"><div className="flex justify-end">
                    <p className="text-sm font-medium">Total Bill: </p>
                    <div className="flex pl-3">
                      <p className="text-sm font-medium">
                        ₹{calculateTotal(res.labTestList)}
                      </p>
                      {/* <p className="text-xs line-through text-gray-300">
                          ₹900
                        </p> */}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={(e) => {
                        addLabTestToCart(e, res, i);
                      }}
                      disabled={
                        checkAlreadyAdded(res) || isAdding !== -1 || !(res.labTestList?.length > 0)
                      }
                      className="bg-brand-secondary  text-white text-xs py-2 px-2 mt-4 rounded disabled:opacity-50"
                    >
                      {checkAlreadyAdded(res) ? 'Added' : 'Add to Cart'}
                      {i === isAdding && (
                        <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5 disabled:opacity-50"></div>
                      )}
                    </button>

                  </div>

              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default CompareDiagnosisPrescription;
