
import React, { useState, useEffect } from 'react';
// import Patientprofilesidebar from './Patientprofilesidebar';
// import Patientprofileupbar from './Patientprofileupbar';
import { Link, useHistory, useLocation } from 'react-router-dom';
import circlepill from '../../Assets/Images/circlepill.svg';
import sort from '../../Assets/Images/sort_black_24dp.svg';
import { APP_ROUTES } from '../../application/Router/constants/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getPatientmedicinedeliveryList, getPatientmedicinedeliveryListFilter, getPatientmedicinedeliveryListOnFilter } from '../../Redux/Actions/patientAction';
import OrderListpopuomedicine from "./OrderListpopuomedicine";
import { Dropdown } from 'react-bootstrap';
import { MenuIcon } from '@heroicons/react/outline';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

import Patientprofileupbar from "./Patientprofileupbar";
import Userprofilesidebar from '../userprofilesidebar';
import Patientprofilesidebar from "../Patientprofilesidebar";
import PatientService from "../../Redux/services/patientService";
import FamilyDropdown from './FamilyDropdownMedicine';
import { getLocalTime , getLocalDateWithTime} from '../../Assets/utils/LocalTimeFormat';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";


// import steth from '../../Assets/Images/Ellipse 77.svg';
// import profileimg from '../../Assets/Images/Profileimg.svg';
// import camera from '../../Assets/Images/camera.svg';
// import Addmemberspopup from './addmemberspopup';
// import { PATIENTPROFILE_ROUTES } from '../../application/Router/constants/PatientProfileRoutes';
// import car from '../../Assets/Images/delivery_dining_black_24dp 1.svg'
// import { getPatientLabTestsList } from '../../Redux/Actions/Patientprofileaction';
// import Userprofilesidebar from '../../components/userprofilesidebar';

function PatientprofileMedicineOrders() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [showlistpopup, setshowlistpopup] = useState(false);
    const location = useLocation();
    const [showaddmemberpopup, setshowaddmemberpopup] = useState(false);
    const [showprofilelist, setshowprofilelist] = useState(false);
    const [pageStart, setPageStart] = useState(1);
    const [productByElasticSearch, setProductByElasticSearch] = useState([])
    const [hasMore, setHasMore] = useState(true);
    const [medicineList, setmedicineList] = useState([]);
    const [fetchingData, setfetchingData] = useState(false);
    const [isFilterApplied, setFilterApplied] = useState(false);

    let [list, setList] = useState([]);

    const redirectTo = (event, code) => {

        localStorage.setItem("detail", JSON.stringify(code));

        event.preventDefault();
        history.push(
            {
                pathname: APP_ROUTES.MEDICINEDELIVERYORDERDETAILS,
                state: { detail: code }
            }
        )
    }

    const medicinedeliverylist = useSelector((state) => state.patientmedicinedeliverylist);
    const { PatientmedicinedeliveryData, isLoading } = medicinedeliverylist;

    console.log("rrrrrrrrrr", PatientmedicinedeliveryData.data)

    const patientCode = useSelector(state => state.authReducer.patientCode);

    // const patientmyorderslist = useSelector((state) => state.patientmyorderslist);
    // const { patientmyordersData } = patientmyorderslist;
    useEffect(() => {
        const payload = {
            // toDate: moment().format("MM/DD/yyyy"),
            patientId: patientCode,
            photoRequired: "Y",
            status: 1
        }
        dispatch(getPatientmedicinedeliveryList(payload, pageStart))
        console.log(PatientmedicinedeliveryData)
    }, [dispatch, pageStart]);


    const filterCancelClick = (childData) => {
        setshowlistpopup(false);
    };

    const addFilter = () => {
        setshowlistpopup(true);
    }
    const filterOkClick = (payload) => {
        payload.photoRequired = "Y"
        // payload.status = 1
        // payload.patientId = patientCode
        setshowlistpopup(false);
        setFilterApplied(false);
        dispatch(getPatientmedicinedeliveryListOnFilter(payload))
            .then((result) => {
                setList(result)
                setmedicineList(result.data);
            });
    }
    useEffect(() => {
        if (PatientmedicinedeliveryData?.data?.length) {
            setList(PatientmedicinedeliveryData?.data);
            // debugger
        }
    }, [PatientmedicinedeliveryData?.data?.length]);


    const addZeroes = (num) => {
        //return num;
        return num.toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 })
    }


    const loadFunc = async () => {
        if (fetchingData && !isFilterApplied) {
            return;
        }

        setfetchingData(true);
        const data = {
            patientId: patientCode,
            photoRequired: "Y",
            status: 1
        }

        const res = await PatientService.getpatientmedicinedeliverydetails(data, pageStart);
        // debugger
        console.log(res.data.data, "dsifdsohaoihsda")
        if (res.data.data.length === 0) {
            setHasMore(false);
        } else {
            setPageStart(pageStart + 1);
            if (medicineList.length) {
                setmedicineList([...medicineList, ...res.data.data]);

            } else {
                setmedicineList(res.data.data);
            }

            setfetchingData(false);
            setHasMore(true);
        }
        // console.log();





    }


  const loadPaymentFor = (patientCode) =>{


    const payload = {
        // toDate: moment().format("MM/DD/yyyy"),
        patientId: patientCode,
        photoRequired: "Y",
        status: 1
    }
    dispatch(getPatientmedicinedeliveryList(payload, "1")).then((res)=>{
        setmedicineList([...res?.data]);
    })


    setHasMore(false)

   
}



    console.log("listxxxx", list);
    console.log("Responseeeee", medicineList);


    return (
        <>

            <Patientprofileupbar></Patientprofileupbar>
            <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base mb-2 mt-0">
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
                    <a >Medicine Orders</a>
                </li>
            </ul>

            <div class="flex justify-between mt-8" style={{ backgroundColor: "#F8F8F8" }}>
                <div class="lg:block hidden w-3/12 ml-6 mt-3">
                    <Userprofilesidebar></Userprofilesidebar>
                </div>


                {isLoading && list.length === 0 ?
                    <div className="flex w-full relative  flex-wrap items-center justify-center m-5">
                        <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
                    </div> :
                    list.length === 0 ?
                        <>
                            <div class="lg:w-8/12 w-full lg:mr-16 lg:mt-6">

                                <div className="mx-2  bg-white border border-gray-200">

                                    <div class="flex justify-between">
                                        <p class="text-medium font-bold text-2xl  ">Medicine Orders</p>

                                        {
                                            list?.length > 0 &&

                                            <div class="float-right py-2">
                                                <div class="flex space-x-4">
                                                    <div class="flex space-x-2">
                                                        <img src={sort} alt="sort" class="w-5" />
                                                        <p onClick={addFilter} class="text-brand-secondary text-sm font-medium">Filter</p>
                                                    </div>
                                                </div>
                                            </div>

                                        }
                                    </div>
                                </div>
                                <div class="rounded-lg shadow-lg bg-white-600 w-full h-112 p-5 antialiased justify-between border border-gray-200 mt-2 lg:pb-4 mb-10 bg-white">
                                    <div class=" w-full align-center text-center  ">
                                        <p className="text-center item-center mt-40 mb-40 text-gray-400">No orders available</p>
                                    </div>
                                </div>

                            </div>
                        </> :


                        <div class="lg:w-8/12 w-full lg:mr-16 -mt-10 lg:mt-6">

                            <p className="text-2xl font-bold text-gray-800 mb-5 ml-2">Medicine Orders</p>

                            <div className="mx-2  bg-white border border-gray-200">
                                <div class="flex justify-between ">
                                    <p class="flex text-medium font-bold text-2xl text-neutral-800">
                                        <div className="hidden md:block lg:hidden relative  mr-4 ml-2 top-0" >
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />

                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className="z-10" >
                                                    <Userprofilesidebar />
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                        </p>

                                     


                                    <div class="flex justify-between w-full mt-3 mx-4">
                                    <FamilyDropdown  title={'Get Medicine Orders For'} onSelect={loadPaymentFor} />


                                        <div class="float-right ">
                                            <div class="flex space-x-4">
                                                <div class="flex space-x-2">
                                                    
                                                    <div onClick={addFilter} className=" flex justify-center bg-brand-secondary  rounded items-center text-white mx-2 h-9 w-9 cursor-pointer mt-2">
                                                        <FontAwesomeIcon icon={faFilter} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className='mt-0 bg-white p-5' style={{ minHeight: '250px', width: '100%' }}>
                                    <InfiniteScroll
                                        pageStart={0}
                                        loadMore={(e) => loadFunc(e)}
                                        hasMore={hasMore}
                                        className="w-full"



                                        // style={{minHeight: '700px'}}
                                        loader={<div className="flex flex-wrap justify-center pl-10 pr-10 pb-10">
                                            <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
                                        </div>}
                                    >
                                        {medicineList?.length > 0 && medicineList.sort((a, b) => {
                                            console.log(b, "dsfdlsnfjdb")
                                            return (
                                                moment(b.createdOn, "yyyy-MM-DD HH:mm:ss") - moment(a.createdOn, "yyyy-MM-DD HH:mm:ss")
                                            );
                                        })
                                            .map((user, i) => (


                                                <div class=" bg-white w-full h-112 p-5 antialiased justify-between border border-gray-200 mt-2 lg:pb-4 mb-10" key={i} style={{ borderRadius: "5px" }}>
                                                    <div class="lg:flex w-full">
                                                        {/* <img src={user.hospitalPhoto ? process.env.REACT_APP_IMG_BASEURL + user.hospitalPhoto : circlepill} alt="pills" class="w-24 h-24 profileRound mt-2 ml-4" /> */}
                                                        <div className="w-full">
                                                            <div class="flex justify-between">
                                                                {/* <p class="pl-3 pt-2  ml-4 text-medium font-medium text-lg  my-2 ">{user?.patientDrugPrescriptionOrderDetailsList[0]?.hospitalName}</p> */}
                                                                {/* <p class="text-sm pr-4 text-brand-lightgreen font-medium  my-4">
                                                            {user.procedureStatus === 0 ? 'Ordered' :
                                                                user.procedureStatus === 1 ? "Order Confirmed" :
                                                                    user.procedureStatus === 2 ? "Packed" :
                                                                        user.procedureStatus === 3 ? "Ready For Delivery" :
                                                                            user.procedureStatus === 4 ? "Dispatched" :
                                                                                user.procedureStatus === 5 ? "Delivered" :
                                                                                    user.procedureStatus === 6 ? " Cancel By Patient" :
                                                                                        user.procedureStatus === 7 ? " Cancel By Pharmacy" : ""}
                                                        </p> */} 
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                                                                    <p class=" w-full  text-xs text-gray-600   font-medium  my-1">OrderID : <b>{user.patientOrderId}</b></p>
                                                                    <p class=" w-full flex  md:ml-5  text-xs text-gray-600   font-medium  my-1">Placed On : <b>{getLocalDateWithTime(user.paymentDateTime)} </b></p>
                                                                    <p class="text-xs w-full flex  text-gray-600   font-medium  my-1">Scheduled Delivery <b>:{" "}{getLocalDateWithTime(user.scheduledDelivery)}</b></p>
                                                                </div>
                                                                {/* <p class=" w-1/2 flex justify-start md:ml-5  text-sm text-gray-600   font-medium  my-1">Scheduled Delivery: {user.scheduledDelivery}<b> </b></p> */}
                                                                <p class=" w-full flex justify-start   text-xs text-gray-600   font-medium  my-1">Number of Items :<b> {user.totalOrderItems} </b></p>
                                                            </div>
                                                            {/* {user.orderDetails.
                                                                map((user1, i) => (<>
                                                                    <div class="flex  md:justify-between gap-2">
                                                                        <p class="pl-2 w-1/2  md:ml-5  text-sm text-gray-600   font-medium  my-1"><b >{user1?.drugName}</b></p>

                                                                        <p class="pl-2 w-1/2 flex justify-end md:ml-5  text-sm text-gray-600   font-medium  my-1">INR <b> {addZeroes(user1?.totalAmount)} </b></p>
                                                                        <p class="text-sm   ml-5 text-sm text-gray-600   font-medium  my-1">OrderID : <b>{user.orderId}</b></p>
                                                                    </div>
                                                                </>))} */}
                                                            <div class="flex justify-between">
                                                                <p class=" w-1/2  md:ml-5 text-xs text-gray-600   font-medium  my-1"></p>
                                                                <p class="text-xs   md:ml-5  text-gray-600   font-medium  my-1">Total INR: <b>{user.orderAmount.toFixed(2)}
                                                                    {/*    {addZeroes(user.patientOrderId)}  */}
                                                                </b></p>
                                                            </div>
                                                            <hr className="mt-2"></hr>
                                                            <div class="lg:flex justify-end mt-4 ">

                                                                <div className="flex justify-end ">

                                                                    <button onClick={
                                                                        (e) => redirectTo(e, user)

                                                                    } style={{ backgroundColor: "#66B889", borderRadius: "5px" }} className=" text-white p-2 mr-2 font-semibold text-xs">View Details</button>
                                                                </div>

                                                            </div>



                                                        </div>

                                                    </div>

                                                </div>


                                            ))}
                                    </InfiniteScroll>
                                </div>


                                <div className="mb-20"></div>
                            </div>
                            {/* </InfiniteScroll> */}
                        </div>


                }
                {showlistpopup ? (
                    <OrderListpopuomedicine
                        onClose={() => {
                            setshowlistpopup(false);
                            setshowprofilelist(true);
                        }}
                        parentCallback={filterOkClick}
                        cancelCallback={filterCancelClick}
                    ></OrderListpopuomedicine>
                ) : null}


            </div>
        </>
    );
}

export default PatientprofileMedicineOrders;

