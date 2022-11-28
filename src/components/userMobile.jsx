import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import { USERPROFILE_ROUTES } from "../application/Router/constants/UserProfileRoutes";
import profile from "../Assets/Images/profile-1@2x.svg";
import steth from "../Assets/Images/avatar.png";

import {
  editPatientDetails,
  getPatientDetails,
} from "../Redux/Actions/UserprofileActions";


function UserMobile(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authReducer);

  const { patientData, patientSession, isOpen, index } = userData;

  console.log("patient data", patientData);

  const patientinfo = useSelector((state) => state.patientinfo);
  const { patientinfoData, isLoading, isSuccess } = patientinfo;

  useEffect(() => {
    dispatch(getPatientDetails(userData.code));
  }, [dispatch, userData.code, isSuccess, patientinfoData.id]);

  let location = useLocation();
  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };

  const [profile, setProfile] = useState({

    firstName: patientinfoData && patientinfoData.firstName ? patientinfoData.firstName : "",
    lastName: "",
    name: patientinfoData.firstName,

  });

  useEffect(() => {
    setProfile(patientinfoData);

  }, [patientinfoData]);

  useEffect(() => {
    dispatch(getPatientDetails(userData.code));
  }, [dispatch, userData.code, isSuccess, patientinfoData.id]);

  return (
    <>
      <div className=" mb-3 lg:hidden">
        {/* <span className="text-brand-secondary font-normal  text-2xl ">
          Providing{" "}
          <span className="text-green-500 font-normal  text-2xl">
            Cure with Care
          </span>
        </span> */}
        {/* <p className="text-brand-secondary font-normal  text-md">
          Log in and get complete care for your family
        </p> */}
      </div>
      {!patientData?.id ? (
        <div className="lg:hidden mb-1 justify-center content-center text-center">
          <button
            className="bg-brand-secondary w-2/3 text-2xl p-3 font-medium text-white rounded"
            onClick={(e) =>
              redirectTo(e, {
                pathname: APP_ROUTES.LOGIN,
                state: { background: location, login: true },
              })
            }
          >
            Login
          </button>
        </div>
      ) : (
        <></>
        // <div className="lg:hidden rounded-xl border border-brand-graynurse content-center text-center bg-white mr-5 mx-5 mb-5">
        //   <div className="p-2 flex items-center">

        //     <img src={patientData.photoName ? `${process.env.REACT_APP_IMG_BASEURL}${patientData.photoName}` : steth} alt="profile" className="" />


            
        //     <div className="ml-5">
        //       <p className="flex pl-2 pb-3 mt-6 ml-4 text-medium font-medium text-gray-800  text-xl  my-2">
        //         <span>{patientData.firstName}</span>
        //         &nbsp;
        //         <span>{patientData.lastName}</span>
        //       </p>
              
        //     </div>
        //   </div>
        // </div>
      )}
    </>
  );
}

export default UserMobile;
