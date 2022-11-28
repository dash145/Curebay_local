import React, { useEffect, useState } from "react";
import Diagnostics from "../Assets/Images/Diagnostics.svg";
import info from "../Assets/Images/info.svg";
import { useHistory, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import SectionContainer from "./SectionContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getLabTestsViaVisit,
  getPrescribedDiagonisCenters,
} from "../Redux/Actions/getQuotation";
import {
  AddtoCart,
  getCartDetails,
} from "../Redux/Actions/cartPlaceOrderAction";
function PrescriptionMed() {
  const history = useHistory();
  const location = useLocation();
  const data = location.state;

  const quotLabTests = useSelector((state) => state.quotLabTests);
  const quotDiagnosis = useSelector((state) => state.quotDiagnosis);
  const userData = useSelector((state) => state.authReducer.patientData);
  const { cartList } = useSelector((state) => state.cartReducer);

  const [isAdding, setIsAdding] = useState(-1);

  const dispatch = useDispatch();
  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };

  useEffect(() => {
    dispatch(getLabTestsViaVisit(data.visitId));
    dispatch(getPrescribedDiagonisCenters(data.prescriptionId));
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(getCartDetails(userData.code));
  }, [dispatch, userData]);

  const calculateTotal = (tests) => {
    let total = 0;
    tests?.forEach((test) => {
      total += test.amount;
    });
    return total;
  };

  const addLabTestToCart = (e, prescribedTest, index) => {
    e.preventDefault();
    setIsAdding(index);
    let labTests = [];
    for (const data of prescribedTest.labTestList) {
      const payload = {
        createdBy: userData.code,
        hospitalId: prescribedTest.hospitalId,
        hospitalName: prescribedTest.hospitalName,
        locationId: prescribedTest.locationId,
        locationName: prescribedTest.locationName,
        modifiedBy: userData.code,
        homeSampleCollectionStatus: -1,
        patientId: userData.code,
        txnId: "",
        preferDateTime: "",
        requestDateTime: "",
        visitdiagnostic: "Y",
        patientLabTestsOrderDetailsList: [
          {
            amount: data.amount,
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
          },
        ],
        status: 1,
      };
      labTests.push(payload);
    }
    let dataObj = {
      cartId: cartList && cartList.id ? cartList.cartId : "",
      createdBy: userData.code,
      drugsOrdersYN: false,
      labOrdersYN: true,
      modifiedBy: userData.code,
      patientId: userData.code,
      patientLabTestsOrder: labTests,
      status: 1,
    };
    dispatch(AddtoCart(dataObj)).then(() => setIsAdding(-1));
  };

  return (
    <>
      {/* breadcrumbs */}
      <ul className="hidden flex text-brand-secondary text-sm lg:text-base pl-5 pt-5">
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
      <div className="mb-20 mx-4">
        <SectionContainer
          link={""}
          title={"Choose from one of our trusted Labs"}
          subtitle={"Complete cart from one Labs"}
          seeAll={"hide"}
        />
        <div className="pl-3 pr-10 pt-5 pb-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {/* Card 1 start */}
          {quotDiagnosis.prescribedDiagnosisCenters?.map((res, i) => {
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
                          <img src={info} alt="info" className="w-5 " />
                        </span>
                        <p className="text-xs font-medium text-black mt-1">
                          ₹{test.amount}
                        </p>
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
                          <p className="text-xs line-through text-gray-300">
                            ₹900
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          addLabTestToCart(e, res, i);
                        }}
                        disabled={isAdding !== -1}
                        className="bg-brand-secondary  text-white text-xs py-2 px-2 rounded disabled:opacity-50"
                      >
                        Add to Cart
                        {i === isAdding && (
                          <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5"></div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default PrescriptionMed;
