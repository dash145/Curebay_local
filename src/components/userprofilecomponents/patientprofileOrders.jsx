import tubee from "../../Assets/Images/Icons.svg";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import sort from "../../Assets/Images/sort_black_24dp.svg";
import { APP_ROUTES } from "../../application/Router/constants/AppRoutes";
import { getPatientLabTestsList, getPatientLabTestsListFilter } from "../../Redux/Actions/UserprofileActions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import OrderListpopup from "./OrderListpopup";
import FamilyDropdown from './FamilyDropDown';
import { Dropdown } from "react-bootstrap";
import { MenuIcon } from "@heroicons/react/outline";

import Userprofilesidebar from "../userprofilesidebar";
import Patientprofilesidebar from "../Patientprofilesidebar";
import { getLocalTime } from '../../Assets/utils/LocalTimeFormat';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";


// import Userprofilesidebar from '../../components/userprofilesidebar';
// import circlepill from '../../Assets/Images/circlepill.svg';
// import car from '../../Assets/Images/delivery_dining_black_24dp 1.svg'
// import steth from '../../Assets/Images/Ellipse 77.svg';
// import profileimg from '../../Assets/Images/Profileimg.svg';
// import camera from '../../Assets/Images/camera.svg';
// import Addmemberspopup from './addmemberspopup';
// import { PATIENTPROFILE_ROUTES } from '../../application/Router/constants/PatientProfileRoutes';

function Patientprofileorders() {

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [showaddmemberpopup, setshowaddmemberpopup] = useState(false);
  const [showlistpopup, setshowlistpopup] = useState(false);
  const [showprofilelist, setshowprofilelist] = useState(false);
  let [list, setList] = useState([]);

  const userData = useSelector((state) => state.authReducer.patientData);

  const redirectTo = (event) => {
    event.preventDefault();
    // setshowaddmemberpopup(true)
    history.push(APP_ROUTES.ORDER_DETAILS);
    // history.push(USERPROFILE_ROUTES.ADDDMEMBERS);
  };

  const viewnow = (event, code) => {
    event.preventDefault();
    history.push({
      pathname: APP_ROUTES.ORDER_DETAILS,
      state: code,
    });
  };
  const filterCancelClick = (childData) => {
    setshowlistpopup(false);
  };

  const addFilter = () => {
    setshowlistpopup(true);
  };
  const filterOkClick = (payload) => {
    console.log('Filter request', payload)
    setshowlistpopup(false);
    dispatch(getPatientLabTestsListFilter(payload)).then((result) => {
      let data = result?.filter(item => item.procedureStatus !== -1)
      setList(data);
    });
  };

  const patientmyorderslist = useSelector((state) => state.patientmyorderslist);
  const { patientmyordersData, isLoading } = patientmyorderslist;

  useEffect(() => {
    //let patient = localStorage.getItem("patientprofile");
    dispatch(getPatientLabTestsList(userData.code));
  }, [dispatch]);

  useEffect(() => {
    let data = patientmyordersData?.filter(item => item.procedureStatus !== -1)
    setList(data);
  }, [patientmyordersData.length]);
  console.log(list, "sdpfodhifhoufd");


  const loadPaymentFor = (patient) => {


    console.log(patient, 'vpovjsipdvhipsps');

    dispatch(getPatientLabTestsList(patient));
  }

  return (
    <>
      <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base mb-2 mt-8">
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
          <a href="/profile/mydetails">Profile</a>
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
          <a>Lab Orders</a>
        </li>
      </ul>

      <br />


      <div className="flex justify-between " style={{ backgroundColor: "#F8F8F8" }} >
        <div className="lg:block hidden w-3/12 ml-6 mt-3">
          <Userprofilesidebar></Userprofilesidebar>
        </div>

        <>

          <div className="lg:w-8/12 w-full lg:mr-16 lg:mt-6 ">
            <p className="text-2xl font-bold text-gray-800 mb-5 ml-2">Lab Orders</p>
            <div className="mx-2 bg-white border border-gray-200 ">
              <div className="flex justify-between">
                <div className="md:ml-3 flex justify-between items-center w-full mr-10" >

                  <div className="pl-6">
                    <FamilyDropdown title={'Get Lab Orders For'} onSelect={loadPaymentFor} />

                  </div>


                  {/* {
                    list?.length > 0 && */}

                    <div className="float-right py-2">
                      <div className="flex space-x-4">
                        <div className="flex space-x-2">


                          <div onClick={addFilter} className=" flex justify-center bg-brand-secondary  rounded items-center text-white mx-2 h-9 w-9 cursor-pointer">
                            <FontAwesomeIcon icon={faFilter} />
                          </div>

                        </div>
                      </div>
                    </div>
                  {/* } */}

                </div>
                <p className="flex text-medium font-medium text-2xl  ">
                  <div className="hidden md:block lg:hidden relative  mr-4 ml-2 top-0">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <MenuIcon
                          className="hidden h-6 w-6"
                          aria-hidden="true"
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="z-10">
                        <Patientprofilesidebar />
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  {/* <div className="mt-8">My Lab Orders</div> */}

                </p>
                {/* <p onClick={Addmembers} className="text-sm text-brand-secondary font-medium pr-4"> + Add Members</p> */}
                {/* <div className="float-right py-2">
                                        <div className="flex space-x-4">
                                            <div className="flex space-x-2">
                                                <img src={sort} alt="sort" className="w-5" />
                                                <p onClick={addFilter} className="text-brand-secondary text-sm font-medium">Filter</p>
                                            </div>
                                        </div>
                                    </div> */}
              </div>

              {
                list.length > 0 ?

                  list?.map((user, i) => (
                    <div className="bg-white w-11/12 h-112 p-2 md:p-5 antialiased justify-between border border-gray-200  lg:pb-4 m-auto mb-10" style={{ borderRadius: "5px" }}>
                      <div className="lg:flex w-full">
                        <img
                          src={
                            user.hospitalPhoto
                              ? process.env.REACT_APP_IMG_BASEURL + user.hospitalPhoto
                              : tubee
                          }
                          alt="pills"
                          className="w-24 h-24 mt-2 ml-4"
                        />
                        <div className="w-full">
                          <div className="flex justify-between gap-2 px-4 md:px-0 items-center py-4 md:py-0">
                            <p className="md:pl-3 md:pt-2  md:ml-4 text-sm md:text-medium font-bold md:font-medium text-md  md:my-2 ">
                              {
                                user?.patientLabTestsOrderDetailsList[0]
                                  ?.hospitalName
                              }
                            </p>
                            <p className=" text-brand-lightgreen text-xs font-medium  md:my-4">
                              {user.procedureStatus === 1
                                ? "Ordered"
                                : user.procedureStatus === 2
                                  ? "Completed"
                                  : user.procedureStatus === 3
                                    ? "CollectionStatus"
                                    : user.procedureStatus === 5
                                      ? "Cancelled By Patient "
                                      : user.procedureStatus === 6
                                        ? "Cancelled By Diagnostics"
                                        : "Pending"}
                            </p>
                          </div>
                          <div className="flex gap-2 mb-2 md:justify-between px-4 md:px-0">
                            <p className=" flex flex-col md:flex-row w-1/2  md:ml-5 text-xs text-gray-600   font-medium  my-1 lg:pl-2">
                              OrderID : <b>{user.orderId}</b>
                            </p>
                            <p className=" flex flex-col md:flex-row justify-end w-1/2 md:ml-5 text-xs text-gray-600 text-right  font-medium  my-1">
                              Placed On :{" "}
                              <b>
                                {getLocalTime(user?.preferDateTime)}
                              </b>
                            </p>
                          </div>

                          {user.patientLabTestsOrderDetailsList.map(
                            (user1, i) => (
                              <>
                                <div className={`flex mb-2 px-4 md:px-0 items-center ${user.packageCode ? "md:justify-end" : "md:justify-between"}`} key={i}>
                                  <p className={`md:pl-2 w-1/2 ${user.packageCode && "text-right"} md:ml-5  text-xs text-gray-600   font-medium  my-1`}>
                                    <b>{user1?.labTestName}</b>
                                  </p>
                                  <p className={`md:pl-2 ${user.packageCode && "hidden"} flex justify-end w-1/2 md:ml-5  text-xs text-gray-600   font-medium  my-1`}>
                                    <span className="mr-1">INR</span><b> {parseFloat(user1?.discountAmount) ? user1?.discountAmount : user1?.amount} </b>
                                  </p>
                                  {/* <p className="text-sm   ml-5 text-sm text-gray-600   font-medium  my-1">OrderID : <b>{user.orderId}</b></p> */}
                                </div>
                              </>
                            )
                          )}
                          {!user.packageCode ? <div className="flex justify-between">
                            <p className="text-xs   ml-5  text-gray-600   font-medium  my-1"></p>
                            <p className="text-xs   ml-5  text-gray-600   font-medium  my-1">
                              Total INR<b> {parseFloat(user.paidAmount)} </b>
                            </p>
                          </div> : <div className="flex justify-center text-xs font-medium text-brand-lightgreen">Redeemed from '{user.packageName}' Package</div>}
                          {/* <hr className="mt-2"></hr>

                                                    <div className="lg:flex justify-end mt-4 ">

                                                        <div className="flex justify-end ">

                                                            <button onClick={
                                                                (e) => viewnow(e, user)

                                                            } className="bg-brand-secondary text-white p-2 rounded-xl mr-2">Track </button>
                                                        </div>

                                                    </div>*/}
                        </div>
                      </div>
                    </div>
                  ))

                  : <div className=" w-full align-center text-center ">
                    <p className="text-center item-center mt-40 mb-40 text-gray-400  ">
                      No orders available
                    </p>
                  </div>
              }

              <div className="mb-20"></div>
            </div>
          </div>



        </>

        {showlistpopup ? (
          <OrderListpopup
            onClose={() => {
              setshowlistpopup(false);
              setshowprofilelist(true);
            }}
            parentCallback={filterOkClick}
            cancelCallback={filterCancelClick}
          ></OrderListpopup>
        ) : null}
      </div>
    </>
  );
}

export default Patientprofileorders;
