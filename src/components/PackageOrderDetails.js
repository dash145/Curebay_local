import React from 'react'
import { useEffect, useState } from "react";

// import back from '../Assets/Images/track.jpeg';
// import steth from '../Assets/Images/steth.svg';
import circlepill from '../Assets/Images/circlepill.svg';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import OrderDetailMap from './orderDetailMap';
import moment from 'moment';
import { XIcon, CheckIcon } from '@heroicons/react/outline';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import PackageService from "../Redux/services/packagesService";
import { date } from 'yup';
import axios from 'axios';
import {getMyPackagesList} from "../Redux/Actions/packages";
import { toast , ToastContainer } from 'react-toastify';
import { Dialog } from "primereact/dialog";
import {USERPROFILE_ROUTES} from "../application/Router/constants/UserProfileRoutes"
import {getLocalTime} from '../Assets/utils/LocalTimeFormat'

function PackageOrderDetails(props) {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch()
  const { state } = location;



  //const {detail}=state
  const [conData, setconData] = useState();
  const [labData, setlabData] = useState();
  const userData = useSelector((state) => state.authReducer.patientData);
  const [actualAmount, setActualAmount] = useState(0);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [tId, settId] = useState(moment.now().toString());
  const [isLoading, setIsLoading] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [packageCode, setPackageCode] = useState("");
  const [packageDetails, setPackageDetails] = useState({})
  const [showLoader , setShowLoader] = useState(false)


  const [detail,setDetails]= useState(JSON.parse(localStorage.getItem("myPackage")))
  console.log('lksdnkfc',JSON.stringify(detail))





  const [successMessage,  setSuccessMessage] = useState({
    message: "",
    isOpen: false
  })
  useEffect(()=>{
    if(detail){
      let data = detail.patientPackagesDetailslist.filter(item => item.groupCode == 'D')
      let data1 = detail.patientPackagesDetailslist.filter(item => item.groupCode == 'C')
      setconData(data1)
      setlabData(data)
      setPackageDetails(detail)
    }
  },[detail])



  // const handlePackageClick = (code) => {
  //   if (!userData?.id) {
  //     history.push({
  //       pathname: APP_ROUTES.LOGIN,
  //       state: { background: location, login: true },
  //     });
  //     return;
  //   }

  //   PackageService.getPackageInfo(code).then((res) => {
  //     console.log(res, "resofPakcage");
  //     let discountedAmount = 0;
  //     let actualAmount = 0;
  //     res.data.forEach((res) => (discountedAmount += res.discountAmount));
  //     res.data.forEach((res) => (actualAmount += res.actualAmount));
  //     let data = res.data.filter((res) => res.groupCode == "C");
  //     let data1 = res.data.filter((res) => res.groupCode == "D");
  //     setconData(data);
  //     console.log(data1 , "sdivhwdoivhspidhvpi");
  //     setlabData(data1);

  //     setActualAmount(actualAmount);
  //     setDiscountedAmount(discountedAmount);
  //     setPackageCode(res?.data[0]?.packageCode);
  //   });
  // };


  const onRedeemPackage=(data)=>{
    let allowRedeem = []
     allowRedeem = data?.filter(item => item.remaining != 0)
    if(allowRedeem.length == 0 ){
      toast("Already Redeemed");
      return
    }
    setShowLoader(true)
    PackageService.redeemPackage(userData.code , packageDetails?.packageCode , packageDetails?.patientPackageId).then(res =>{
      if(res.data.status == 200){
        setSuccessMessage({
          message: res.data.message,
          isOpen: true
        })
        dispatch(getMyPackagesList(userData.code)).then((res) => {
          if(res){
            let data = res.find(item1 => item1.id == packageDetails.id)
            console.log(data , "Sdfdsofjisdhifdhid");
            let data1 = data.patientPackagesDetailslist.filter(item => item.groupCode == 'D')
            let data2 = data.patientPackagesDetailslist.filter(item => item.groupCode == 'C')
            setconData(data2)
            setlabData(data1)
          setPackageDetails(data)
          setShowLoader(false)
          }
      }).catch(err =>{
        toast(err.message)
        setShowLoader(false)
      })
      }


    }).catch(err =>{
      toast(err.message)
      console.log(err , "sdfhdsiofhdsifhsdip");
      setShowLoader(false)
    })
  }

console.log(conData , "packageDetails");

  return (
    <>
      <ToastContainer />
      <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base ml-4 pt-5">
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
          <a href="/profile/mediceineorders">My Profile</a>
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
          <a>Package Details</a>
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
      </ul>


      <div class="w-full md:w-11/12 flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden mt-4 item-center md:m-10 mt-15">
          <div class="text-gray-700 text-lg px-6 py-4 border-b border-gray-200 items-center">
          <p class="text-2xl  text-gray-600 font-medium pb-5 ">Package Details</p>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p class="text-sm font-medium text-gray-400">Package Name</p>
                <p class="text-sm font-medium text-gray-500">{packageDetails?.packagesName}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-400">Patient Name</p>
                <p class="text-sm font-medium text-gray-500">{packageDetails?.patientName}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-400">Start Date </p>
                <p class="text-sm font-medium text-gray-500">{packageDetails?.packagesFromDate === null ? "" : getLocalTime(packageDetails?.packagesFromDate)?.split(" ")[0]}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-400">Expiry Date</p>
                <p class="text-sm font-medium text-gray-500">{packageDetails?.packagesToDate === null ? "" : getLocalTime(packageDetails?.packagesToDate)?.split(" ")[0]} </p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-400">Amount Paid</p>
                <p class="text-lg font-medium text-gray-600 text-brand-secondary">INR {parseFloat(packageDetails?.packagesAmount === null || packageDetails?.packagesAmount === 0 ? "" : packageDetails?.packagesAmount).toFixed(2)}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-400">Order Status</p>
                <p class="text-sm font-medium text-brand-lightgreen">{packageDetails?.status === 1 ? "Pending" : packageDetails?.status}</p>
              </div>

            </div>


          </div>

          <>
            {labData?.length > 0 && (
              <>
                <div className="my-5 ml-2 flex flex-col md:flex-row justify-between mx-5" >
                <div className="my-5 ml-2 ">
                  <h1 className="font-medium font-bold">Lab Tests</h1>
                  <h1 className="font-medium">{labData[0]?.labName}</h1>
                  <h1 className="font-medium">
                    {labData[0]?.address1} {labData[0]?.address2} -{" "}
                    {labData[0]?.pinCode}
                  </h1>
                </div>
                  <h1 className="font-medium text-brand-secondary font-bold text-xl cursor-pointer flex items-center justify-end" onClick={()=>onRedeemPackage(labData)}> Redeem Package  {showLoader && (
                            <div className="loader float-right ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-5 w-5 ml-2"></div>
                          )} </h1>
                </div>
                <DataTable value={labData} responsiveLayout="scroll">
                  <Column field="testName" header="Lab Test"></Column>
                  <Column field="quantity" header="Number"></Column>
                  <Column field="packagesAmount" header="Actual Amount"></Column>
                  <Column
                    field="discountedAmount"
                    header="Discounted Amount"
                  ></Column>
                  <Column field="remaining" header="Remaining quantity"></Column>
                </DataTable>
              </>
            )}
                        {conData && conData.length > 0 && (
              <>
                <div className="my-5 ml-2 flex flex-col md:flex-row justify-between mx-5">
                  <h1 className="font-medium font-bold"> Doctor Consultation </h1>
                  <h1 className="font-medium text-brand-secondary font-bold text-xl cursor-pointer text-right" onClick={() => history.push(APP_ROUTES.DOCTORS)}> Redeem Package </h1>
                </div>

                <DataTable value={conData} responsiveLayout="scroll">
                  <Column field="servicesName" header="Consultation"></Column>
                  <Column field="quantity" header="Number"></Column>
                  <Column field="packagesAmount" header="Actual Amount"></Column>
                  <Column
                    field="discountedAmount"
                    header="Discounted Amount"
                  ></Column>
                  <Column field="remaining" header="Remaining quantity"></Column>
                </DataTable>
              </>
            )}
          </>
      </div>
      <Dialog
        visible={successMessage.isOpen}
        modal={false}
        style={{ width: "700px", height: "auto" }}
        // className="w-20 m-auto lg:w-5/6 h-auto"
        onHide={() => setSuccessMessage({
          message: "",
          isOpen: false
        })}
      >
        <>
          <div className="flex justify-center flex-col  align-middle inline-block">
            <div className="font-semibold text-lg my-8 text-center  ">
              {" "}
              {successMessage.message}
              {``}
            </div>
            <div className='text-center'>
            <button className='font-normal text-base px-4 py-2 rounded cursor-pointer' style={{backgroundColor:"#66B889",color:"#ffff"}} onClick = {() => history.push(USERPROFILE_ROUTES.MY_ORDERS)} >Go to Lab Orders</button>
            </div>
          </div>
        </>
      </Dialog>
    </>
  );
}
export default PackageOrderDetails;
