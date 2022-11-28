import { useRef } from "react";
import checkUp from "../Assets/Images/check-up@2x.svg";
import medicine from "../Assets/Images/general-medicine@2x.svg";
import noDataFound from "../Assets/Images/No data-found.svg";
import Diagnostics from "../Assets/Images/diagnostisc.svg";
import NoAppointmentData from "./NoAppointmentData";
import AppointmentData from "./AppointmentData";
import OrderedCard from "./orderedCard";
import steth from "../Assets/Images/steth.svg";
import labs from "../Assets/Images/bg-labs.svg";
import { useHistory, useLocation } from "react-router-dom";
import { USERPROFILE_ROUTES } from "../application/Router/constants/UserProfileRoutes";
import React, { useEffect, useState } from "react";
import { getappointmentlist } from "../Redux/Actions/UserprofileActions";
import { getPatientAppointmentList } from "../Redux/Actions/patientAction";
import { useDispatch, useSelector } from "react-redux";
import { getlabappointmentlist } from "../Redux/Actions/DiagnosticsActions";
import moment from "moment";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import {
  getpatientorders,
  getpatientDrugorders,
} from "../Redux/Actions/UserprofileActions";
import AppointmentLabData from "./AppointmentLabData";

function PaitientRecord() {
  const history = useHistory();
  const location = useLocation();
  const ref = useRef();
  const [screen, setscreen] = useState(window.innerWidth);

  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push({pathname:location,
      state: { detail: "homePage" }
    });
  };

  const dispatch = useDispatch();
  const recentlabappointments = useSelector(
    (state) => state.recentlabappointments
  );
  const myordersinfo = useSelector((state) => state.myorders);
  const { MyordersData } = myordersinfo;
  const { recentlabappointmentData } = recentlabappointments;
  const userData = useSelector((state) => state.authReducer.patientData);
  const appointmentlistinfo = useSelector(
    (state) => state.patientappointmentlist
  );
  const { appointmentlistData } = appointmentlistinfo;

  const [showModal, setShowModal] = useState(false);

  const [appointmentdetails, setappointmentdetails] = useState();

  const [isHide, setHide] = useState(true);

  const [pendingData, setPendingData]=useState([]);

  const patientCode = useSelector((state) => state.authReducer.patientCode);

  useEffect(() => {
    dispatch(getappointmentlist(userData.code));
  }, [appointmentlistData.length]);

  useEffect(() =>{
    if(location?.state?.fromPayment){
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start"
      })
    }
  },[location?.state])

  // console.log(state, "sdicsidvsoivoisdv");


  useEffect(() => {
      dispatch(getpatientorders(userData.code))
      dispatch(getpatientDrugorders(userData.code));

  }, [location.pathname]);

  useEffect(() => {
    let temp=[]

    console.log(appointmentlistData, "data111111");
    appointmentlistData?.map(el=>{
        if(el.status == 1 || el.status == 15){
            temp.push(el)
        }

    })
    setPendingData(temp)
}, [appointmentlistData.length]);



  return (
    <>
      <div ref={ref} className="flex flex-wrap lg:mt-9">
        <div className="lg:flex-1 md:flex flex-col lg:flex-row space-y-2 md:space-y-0 gap-2 justify-center md:items-center sm:items-stretch m-auto w-full md:w-11/12 sm:py-5">
          <div className="rounded-xl max-h-56 h-56 lg:h-56 border border-brand-gray overflow-y-scroll hide-scrollbar nurse mx-2 bg-white md:w-2/3 lg:w-4/12">
            <div className="pl-2 pr-5 py-4  flex items-center justify-between">
              <p className="inline px-4 rounded-full text-md font-bold cursor-pointer">
                Doctor Appointments
              </p>
              <p
                onClick={(e) => {
                  redirectTo(e, USERPROFILE_ROUTES.MYAPPOINTMENTS);
                }}
                className={`${pendingData.length === 0
                  ? "hidden"
                  : "inline rounded-full text-sm  text-brand-secondary font-medium cursor-pointer"
                  }`}
              >
                See All
              </p>
            </div>
            <hr className="mx-3" />

            {pendingData && pendingData.length === 0 ? (
              <div className="w-full flex flex-col items-center justify-around">
                <img
                  className="h-24 lg:h-28 mt-5 lg:mt-3 "
                  src={noDataFound}
                  alt="No Data Found"
                />
                <h4 className="font-medium  text-gray-400 text-md">
                  No Appointments Available
                </h4>
              </div>
            ) : (
              <div className="">
                {/* {appointmentlistData && appointmentlistData.length > 0 && appointmentlistData.filter(x => x?.whenAppointment >= moment().format('MM/DD/yyyy') || x?.status !== 2 || x?.status !== 4)?.length === 0 ?
                  <NoAppointmentData img={checkUp} title={""} code={''} link={APP_ROUTES.DOCTORS} name={"Book Now"} /> : */}
                  <AppointmentData type={'appointment'} img={steth} data={appointmentlistData} data1={appointmentlistData}/>

              </div>

            )
          }

          </div>




          <div className="rounded-xl max-h-56 h-56 border border-brand-gray nurse mx-2 overflow-y-scroll hide-scrollbar bg-white  md:w-2/3 lg:w-4/12">
            <div className="px-3 py-4 flex items-center justify-between">
              <p className="inline px-4 rounded-full text-md font-bold cursor-pointer">
                Medicine Orders
              </p>
              <p
                onClick={(e) =>
                  redirectTo(e, USERPROFILE_ROUTES.PATIENTMEDICINEORDERS)
                }
                className={`${MyordersData?.length === 0
                  ? "hidden"
                  : "inline rounded-full text-sm  text-brand-secondary font-semibold cursor-pointer"
                  }`}
              >
                See All
              </p>
            </div>
            <hr className="mx-3" />
            {MyordersData?.length === 0 ? (
              <div className="w-full flex flex-col items-center justify-around">
                <img
                  className="h-24 lg:h-28 mt-5 lg:mt-3 "
                  src={noDataFound}
                  alt="No Medicine Orders Available"
                />
                <h4 className="font-medium  text-gray-400 text-md">
                  No Orders Available
                </h4>
              </div>
            ) : (
              <OrderedCard data={MyordersData} />
            )}
          </div>




          <div className="rounded-xl max-h-56 h-56 border border-brand-graynurse mx-2 bg-white overflow-y-scroll hide-scrollbar md:w-2/3 lg:w-4/12">
            <div className="px-3 py-4 flex items-center justify-between">
              <p className="inline px-4 rounded-full text-md  font-bold cursor-pointer">
                Diagnostics Appointments
              </p>
              <p
                onClick={(e) => redirectTo(e, USERPROFILE_ROUTES.MY_ORDERS)}
                className={`${MyordersData &&

                  MyordersData.filter(
                    (x) => x?.patientLabTestsOrderDetailsList?.length > 0
                  )?.length === 0
                  ? "hidden"
                  : "inline rounded-full text-sm  text-brand-secondary font-semibold cursor-pointer"
                  }`}
              >
                See All
              </p>
            </div>
            <hr className="mx-3" />
            {MyordersData &&

              MyordersData.filter(
                (x) => x?.patientLabTestsOrderDetailsList?.length > 0
              )?.length === 0 ? (
              <div className="w-full flex flex-col items-center justify-around">
                <img
                  className="h-24 lg:h-28 mt-5 lg:mt-3 "
                  src={noDataFound}
                  alt="No Diagnostics Appointments Available"
                />
                <h4 className="font-medium  text-gray-400 text-md">
                  No Appointments Available
                </h4>
              </div>
            ) : (
              <AppointmentLabData type={"labs"} img={labs} data={MyordersData} />
            )}
          </div>



        </div>
      </div>
    </>
  );
}
export default PaitientRecord;
