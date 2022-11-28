
import React, { useState, useEffect } from 'react';
// import Patientprofilesidebar from './Patientprofilesidebar';
// import Patientprofileupbar from './Patientprofileupbar';
import { Link, useHistory, useLocation } from 'react-router-dom';
import circlepill from '../../Assets/Images/circlepill.svg';
import sort from '../../Assets/Images/sort_black_24dp.svg';
import { APP_ROUTES } from '../../application/Router/constants/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getPatientmedicinedeliveryList } from '../../Redux/Actions/patientAction';
import PackageService from "../../Redux/services/packagesService";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";


import {
    getMembershipList,
    onMemberSubs,
    onMemberCheck,
    getMyPackagesList
} from "../../Redux/Actions/packages";
import OrderListpopuomedicine from "./OrderListpopuomedicine";
import { Dropdown } from 'react-bootstrap';
import { MenuIcon } from '@heroicons/react/outline';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

import Patientprofileupbar from "./Patientprofileupbar";
import Userprofilesidebar from '../userprofilesidebar';
import Patientprofilesidebar from "../Patientprofilesidebar";
import PatientService from "../../Redux/services/patientService";


import {getLocalTime} from '../../Assets/utils/LocalTimeFormat'


// import steth from '../../Assets/Images/Ellipse 77.svg';
// import profileimg from '../../Assets/Images/Profileimg.svg';
// import camera from '../../Assets/Images/camera.svg';
// import Addmemberspopup from './addmemberspopup';
// import { PATIENTPROFILE_ROUTES } from '../../application/Router/constants/PatientProfileRoutes';
// import car from '../../Assets/Images/delivery_dining_black_24dp 1.svg'
// import { getPatientLabTestsList } from '../../Redux/Actions/Patientprofileaction';
// import Userprofilesidebar from '../../components/userprofilesidebar';

function PatientprofilePackageOrders() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [paymentDone, setPaymentDone] = useState(true);

    const [showlistpopup, setshowlistpopup] = useState(false);
    const userData = useSelector((state) => state.authReducer.patientData);
    const location = useLocation();
    const [showaddmemberpopup, setshowaddmemberpopup] = useState(false);
    const [showprofilelist, setshowprofilelist] = useState(false);
    const [pageStart, setPageStart] = useState(1);
    const [productByElasticSearch, setProductByElasticSearch] = useState([])
    const [hasMore, setHasMore] = useState(true);
    const [medicineList, setmedicineList] = useState([]);
    const [fetchingData, setfetchingData] = useState(false);

    const [actualAmount, setActualAmount] = useState(0);
    const [discountedAmount, setDiscountedAmount] = useState(0);

    const [openDialog, setOpenDialog] = useState("");
    const [conData, setconData] = useState();
    const [labData, setlabData] = useState();

    let [list, setList] = useState([]);

    const redirectTo = (event, code) => {

        localStorage.setItem("myPackage", JSON.stringify(code));


        event.preventDefault();
        history.push(
            {
                pathname: APP_ROUTES.PACKAGEORDERDETAILS,
                state: { detail: code }
            }
        )

        // console.log('isdcksd',JSON.stringify(user))
        // setconData(user);
        // setlabData(user.patientPackagesDetailslist);

        // setOpenDialog(true)


        // let discountedAmount = 0;
        // let actualAmount = 0;
        // user.patientPackagesDetailslist.forEach((res) => (discountedAmount += res.discountedAmount));
        // user.patientPackagesDetailslist.forEach((res) => (actualAmount += res.packagesAmount));


        // setOpenDialog(true);
        // setActualAmount(actualAmount);
        // setDiscountedAmount(discountedAmount);


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
        dispatch(getMyPackagesList(patientCode)).then((res) => {
            setList(res)
        })

    }, [dispatch]);




    const addFilter = () => {
        setshowlistpopup(true);
    }






    console.log(list, "list")






    return (
        <>

            <Patientprofileupbar></Patientprofileupbar>
            <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base ">
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
                    <a >My Packages</a>
                </li>
            </ul>

            <div class="flex justify-between mt-9" style={{ background: "#F8F8F8" }}>
                <div class="lg:block hidden w-3/12 ml-6 mt-3">
                    <Userprofilesidebar></Userprofilesidebar>
                </div>



                <div class="lg:w-8/12 w-full lg:mr-16 lg:mt-5 ">

                <p class=" font-bold text-2xl  ml-2 mb-5">My Packages</p>


                {isLoading && list.length === 0 ?
                    <div class=" ">
                        <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
                    </div> :
                    list.length === 0 ?
                        <>
                       

                            <div  style={{ minHeight: '250px', width: '100%' }} class="lg:w-8/12 w-full lg:mr-16 lg:mt-5 bg-white">

                                <div className="mx-2">
                              

                                    
                                </div>
                                <div class="rounded-lg shadow-lg bg-white-600 w-full h-112 p-5 antialiased justify-between border border-gray-200 mt-2 lg:pb-4 mb-10">
                                    <div class=" w-full align-center text-center ">
                                        <p className="text-center item-center mt-40 mb-40 text-gray-400">No packages available</p>
                                    </div>
                                </div>

                            </div>
                        </> :


                        <div  style={{ minHeight: '250px', width: '100%' }} class="lg:w-8/12 w-full lg:mr-16 lg:mt-5 ">


                            <div className="mx-2 p-4 bg-white border border-gray-200">



                                <div style={{ minHeight: '250px', width: '100%' }}>
                                    <InfiniteScroll
                                        pageStart={0}


                                        className="w-full"



                                        // style={{minHeight: '700px'}}
                                        loader={<div className="flex flex-wrap justify-center pl-10 pr-10 pb-10">
                                            <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
                                        </div>}
                                    >
                                        {list.map((user, i) => (


                                            <div class="rounded-lg  bg-white-600 w-full h-112 p-5 antialiased justify-between border border-gray-200 mt-2 lg:pb-4 mb-10" key={i}>
                                                <div class="lg:flex w-full">
                                                    {/* <img src={user.hospitalPhoto ? process.env.REACT_APP_IMG_BASEURL + user.hospitalPhoto : circlepill} alt="pills" class="w-24 h-24 profileRound mt-2 ml-4" /> */}
                                                    <div className="w-full">
                                                        <div class="flex justify-between">

                                                        </div>
                                                        <div className="flex flex-col">
                                                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 flex items-center">
                                                                <p class="text-sm w-full  text-sm text-gray-600   font-medium  my-1">Package : <b>{user?.packagesName}</b></p>
                                                                <p class="text-sm w-full flex  text-sm text-gray-600   font-medium  my-1">Status : <b>{user?.status == 1 ? 'Pending' : 'Redeemed'}</b></p>
                                                            </div>
                                                            {/* <p class=" w-1/2 flex justify-start md:ml-5  text-sm text-gray-600   font-medium  my-1">Scheduled Delivery: {user.scheduledDelivery}<b> </b></p> */}

                                                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 flex items-center">
                                                                <p class=" w-full flex justify-start   text-sm text-gray-600   font-medium  my-1">Start Date :<b> {getLocalTime(user?.packagesFromDate)?.split(" ")[0]} </b></p>
                                                                <p class=" w-full flex justify-start   text-sm text-gray-600   font-medium  my-1">Expiry Date :<b> {getLocalTime(user?.packagesToDate)?.split(" ")[0] } </b></p>

                                                            </div>
                                                        </div>

                                                        <div class="flex justify-between">
                                                            <p class="text-sm w-1/2  md:ml-5 text-sm text-gray-600   font-medium  my-1"></p>
                                                            <p class="text-sm   md:ml-5 text-sm text-gray-600   font-medium  my-1">Total INR: <b>{user?.packagesAmount.toFixed(2)}
                                                                {/*    {addZeroes(user.patientOrderId)}  */}
                                                            </b></p>
                                                        </div>
                                                        <hr className="mt-2"></hr>
                                                        <div class="lg:flex justify-end mt-4 ">

                                                            <div className="flex justify-end ">

                                                                <button onClick={
                                                                    (e) => redirectTo(e, user)

                                                                } className=" text-white p-2 rounded-md mr-2 text-sm" style={{background:"#66B889"}}>View Details</button>
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

                </div>



            </div>


            <Dialog
                header="Package Info"
                visible={openDialog}
                modal={false}
                //  style={{ width: "800px", height: 'auto' }}
                className="w-11/12 m-auto lg:w-5/6 h-auto"
                onHide={() => setOpenDialog(false)}
            >

                <>
                    {labData && labData.length ?

                        <div className='flex justify-between'>
                            <div>
                                <h4>Package Name: {labData[0].packagesName}</h4>{" "}
                                <p>Description: {labData[0].packagesDescription}</p>{" "}
                            </div>

                            <div>

                                <h4>Purchased Date: {labData[0].packagesName}</h4>{" "}
                                <p>Expire Date: {labData[0].packagesDescription}</p>{" "}
                            </div>
                        </div>

                        : null
                    }

                    {labData && labData.length > 0 && (
                        <>
                            <div className="my-5 ml-2">
                                <h1 className="font-medium"> Lab Tests </h1>
                            </div>
                            <DataTable value={labData} responsiveLayout="scroll">
                                <Column field="packagesName" header="Package"></Column>
                                <Column field="quantity" header="Purchased Date"></Column>
                                <Column field="packagesAmount" header="Actual Amount"></Column>
                                <Column
                                    field="discountedAmount"
                                    header="Discount Amount"
                                ></Column>

                                <Column
                                    field="status"
                                    header="Status"
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

                </>

            </Dialog>
        </>
    );
}

export default PatientprofilePackageOrders;

