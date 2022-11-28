import React, { useState, useEffect } from "react";
import Homemedicine from "../Assets/Images/ic_home_medicine.svg";
import Hometopdoc from "../Assets/Images/ic_home_topdoc.svg";
import Homesavedata from "../Assets/Images/ic_home_safedata.svg";
import med_delivery from "../Assets/Images/med_delivery.png";
import { getStarDoctors } from "../Redux/Actions/doctorAction";
import StarDoctorsInfo from "./StarDoctorsInfo";
import { Carousel } from "primereact/carousel";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
// import akshay from "../Assetdoctors/Images/akshay.png";
import DoctorImage from "../Assets/Images/doctorBanner.png"
import "../Assets/css/custom-style.scss";
import Membership from "./membership";
import Count_doctor from "../Assets/Images/count_doctor.svg";
import Diag from "../Assets/Images/bannerDiag.png"
// Variable overrides first
// $primary: #900;
// $enable-shadows: true;
// $prefix: "mo-";

// Then import Bootstrap
// import "../node_modules/bootstrap/scss/bootstrap";

function StarDoctors(props) {
  // Star Doctors

  let history = useHistory();

  const dispatch = useDispatch();

  const data = useSelector((state) => state.packageReducer);
  const { promotionList, list } = data;

  const doctorlist = useSelector((state) => state.doctorlist);
  console.log("wwwwwwwwwwwwwwww", doctorlist);

  const { doctorData, isLoading } = doctorlist;

  const { coordinates } = useSelector(
    (state) => state.authReducer
  );

  const [isFetchingPinCode, setIsFetchingPinCode] = useState(false);

  const [stardoctors, setStardoctors] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem('customPinCode')) {
      setIsFetchingPinCode(false);
      dispatch(getStarDoctors(sessionStorage.getItem('customPinCode')));
    }
  }, [sessionStorage.getItem('customPinCode')]);

  ///////////////

  function handleClick() {
    history.push("/pharmacycategory");
  }

  function handleLabClick(){
    history.push("/diagnosis");
  }

  function handleClickDoctor() {
    history.push("/doctors");
  }

  function handleClickPrivacy() {
    history.push("/privacy-policy");
  }

  return (
    <div className="pt-20 md:pt-32 mb-12 md:mb-20 w-full" >
      {/* absolute  w-full */}
      <div className="" style={{marginTop:"55px"}}>
        {/* md:overflow-scroll scrollbar-hide */}
        <div className="grid grid-cols-1 md:grid-cols-2  xl:flex   lg:flex-row justify-center sm:items-center md:items-center w-full sm:w-auto lg:w-11/12 lg:m-auto xl:w-auto h-4/6 mb-2 sm:mb-5 md:mb-5 lg:mb-5 -mt-6 sm:mt-0">
        <div className=" lg:mt-3  flex flex-col md:flex md:flex-row md:h-auto lg:h-72 lg:flex lg:flex-row bg-white rounded-3xl border border-gray-300 shadow-xl pb-4  w-fix m-2 cursor-pointer"  >
            <div className=" flex md:flex md:flex-col lg:flex lg:flex-col">
              <div className="ml-6 md:ml-6 lg:ml-6 mr-5 lg:mx-2 xl:mx-10 mt-6 lg:mt-10 ">
                <img
                  className=" h-14 lg:h-14"
                  src={Hometopdoc}
                  alt="StarDoc"
                  // onError={handleImgError}
                />
              </div>
              <div className="text-2xl lg:text-3xl text-gray-800 font-bold mx-1 lg:mx-10 mt-3 lg:mt-1 py-0 sm:py-7 md:py-0 lg:py-5 "  onClick={handleClickDoctor}>
                <h1>
                  Consult
                  with Best Doctors
                </h1>
              </div>
            </div>

            <StarDoctorsInfo />
          </div>
            <div onClick={handleClick} className="relative mt-1 lg:mt-3 flex md:flex-row lg:flex-col bg-white rounded-3xl border border-gray-300 shadow-x md:w-11/12 xl:w-1/4 h-auto md:h-72 m-2 py-2 lg:py-1 cursor-pointer lg:m-auto">
              <div className=" ml-5 mr-3 mt-3 mb-5 lg:mx-10 sm:mt-8 md:mt-3 lg:mt-10 ">
                <img
                  className="mt-2 h-12 lg:mt-3 lg:h-14"
                  src={Homemedicine}
                  alt="homemedicine"
                />
              </div>

              <div className="text-2xl lg:text-3xl text-gray-800 font-bold mx-5 lg:mx-10 mt-3 lg:mt-1 py-0 sm:py-7 md:py-0 lg:py-5">
                <h1>
                  3 hr medicine
                  <br /> delivery
                </h1>
              </div>
              <img className="hidden md:block h-14 md:h-20 lg:w-24 absolute right-3 top-10 md:top-32 md:left-32 lg:left-auto lg:right-3 lg:top-40 xl:top-48" src={med_delivery} alt="med_image" />
            </div>

            <div onClick={handleLabClick} className="mt-3 md:mt-0 lg:mt-3 flex md:flex md:flex-row lg:flex-col bg-white rounded-3xl border border-gray-300 shadow-x md:w-11/12 xl:w-1/4 m-2 py-2 lg:h-72  lg:py-1 cursor-pointer" >
              <div className=" ml-5  mt-3 mb-5 lg:mx-10 sm:mt-8 md:mt-3 lg:mt-10 mr-8 ">
                <img
                  className="mt-2 h-12 lg:mt-3 lg:h-14"
                  src={Diag}
                  alt="homemedicine"
                />
              </div>

              <div className="text-2xl lg:text-3xl text-gray-800 font-bold mx-5 lg:mx-10 mt-3 lg:mt-1 py-0 sm:py-7 md:py-0 lg:py-5">
                <h1>
                  Lab test at your
                   doorstep
                </h1>
              </div>
            </div>


            {/* {props.screen >= 500 ? ( */}
              <div className="mt-3 md:mt-0 lg:mt-3 flex md:flex md:flex-row lg:flex-col bg-white rounded-3xl border border-gray-300 shadow-x md:w-11/12 xl:w-1/4 m-2 py-2 lg:h-72  lg:py-1 cursor-pointer" onClick={handleClickPrivacy}>
                <div className=" ml-5 mr-3 mt-3 mb-5 lg:mx-10 sm:mt-8 md:mt-3 lg:mt-10 ">
                  <img
                    className="mt-2 h-12 lg:mt-3 lg:h-14"
                    src={Homesavedata}
                    alt="homemedicine"
                  />
                </div>

                <div className="text-2xl lg:text-3xl text-gray-800 font-bold mx-5 lg:mx-10 mt-3 lg:mt-1 py-0 sm:py-7 md:py-0 lg:py-5">
                  <h1>
                    Your data <br />
                    is safe with us
                  </h1>
                </div>
              </div>
            {/* ) : (
              <Membership />
            )} */}
          </div>
        </div>


    </div>
  );
}

export default StarDoctors;

