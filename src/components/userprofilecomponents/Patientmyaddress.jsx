/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from "react";

import { getPatientDetails, getPatientfamilymembers, patientaddresslists,
} from "../../Redux/Actions/UserprofileActions";

import { useDispatch, useSelector } from "react-redux";
import { USERPROFILE_ROUTES } from "../../application/Router/constants/UserProfileRoutes";
import { useHistory, useLocation, Link } from "react-router-dom";

import Patientprofilesidebar from "../Patientprofilesidebar";
import Patientprofileupbar from "./Patientprofileupbar";
import Userprofilesidebar from '../userprofilesidebar';

import { getparticularPatientdetails } from "../../Redux/Actions/patientAction";
import Addaddresspopup from "./addaddresspopupMy";
import {Dropdown} from 'react-bootstrap'
import { MenuIcon} from '@heroicons/react/outline'

function Patientmyaddress(props) {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const [showprofileaddress, setshowprofileaddress] = useState(true);
  const [showaddnewaddress, setshowaddnewaddress] = useState(false);
  const [showeditnewaddress, setshoweditnewaddress] = useState(false);

  const [Editaddress, setEditaddress] = useState();

  const [showaddresspopup, setshowaddresspopup] = useState(false);

  const userData = useSelector((state) => state.authReducer.patientData);
  console.log("userData", userData);
  
  const patientCode = useSelector(state => state.authReducer.patientCode);
  const patientdetails = useSelector((state) => state.particularpatientdetails);
  const { particularpatientdetailsData } = patientdetails;

  const addressinfo = useSelector((state) => state.patientaddresslist);
  const { patientaddressinfoData } = addressinfo;

  const Addnewaddress = (event) => {
    event.preventDefault();
    setEditaddress({});
    setshowaddnewaddress(true);
    setshowprofileaddress(false);
    setshoweditnewaddress(false);
    setshowaddresspopup(true);
    // history.push(USERPROFILE_ROUTES.ADDADDRESS);
    // dispatch(getPatientfamilymembers(userData.code))
  };

  const redirectTo = (event) => {
    event.preventDefault();
    history.push(USERPROFILE_ROUTES.ADDADDRESS);
  };

  const Editnewaddress = (event, user) => {
    event.preventDefault();
    setshowprofileaddress(false);
    setshoweditnewaddress(true);
    setshowaddnewaddress(true);

    setEditaddress(user);
    setshowaddresspopup(true);
  };

  const profileaddress = (event) => {
    event.preventDefault();
    setshowprofileaddress(true);
    setshoweditnewaddress(false);
    setshowaddnewaddress(false);
  };
  
  useEffect(() => {
    // let patient = localStorage.getItem("patientprofile");
    // console.log("patient", patient);
    dispatch(getparticularPatientdetails(patientCode));
    console.log(particularpatientdetailsData);
  }, []);

  useEffect(() => {
    dispatch(patientaddresslists(patientCode));
  }, [showaddresspopup]);

  return (
    <>
      <Patientprofileupbar></Patientprofileupbar>
      <ul class="lg:flex hidden text-brand-secondary text-sm lg:text-base pl-10 pt-2">
        <li class="inline-flex items-center">
          <a href="/">Home</a>
          <svg
            class="h-5 w-auto text-brand-secondary"
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
        <li class="inline-flex items-center">
          <a href="/profile/mydetails"> Profile</a>
        </li>
      </ul>

      <div class="flex justify-between ">
        <div class="lg:block hidden w-3/12 ml-6 mt-6">
          <Userprofilesidebar></Userprofilesidebar>
        </div>

        <div className="lg:w-8/12 w-full mx-4 mr-4 lg:mr-12 mr-1 mt-5 ">
          {showprofileaddress && (
            <div>
              <div className="flex justify-between">
                <p className="flex text-medium font-bold text-2xl text-brand-secondary ">
                <div className = "hidden md:block lg:hidden relative  mr-4 ml-2 top-0 " >
                <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
              <MenuIcon className="block h-6 w-6" aria-hidden="true"/>

              </Dropdown.Toggle>

              <Dropdown.Menu className = "z-10" >
                <Patientprofilesidebar/>
              </Dropdown.Menu>
            </Dropdown>
            </div>Saved Address
                </p>

                <p
                  onClick={Addnewaddress}
                  className="text-sm text-brand-secondary font-medium pr-4"
                >
                  Add New address
                </p>
              </div>

              {
                patientaddressinfoData?.length>0 &&
                <p className=" text-black-900 font-bold text-lg mt-4">
                Default Address
              </p>
              }

              
              {patientaddressinfoData.map((user, i) => {
                if (user.isDefault === 1) {
                  return (
                    <div className="rounded-lg  bg-white-600 w-full h-112  pt-5 antialiased justify-between border border-gray-200 mt-2" key={i}>
                      <div className="flex w-full  ">
                        <div className="w-full">
                          <div className="flex justify-between">
                            <p className="pl-2 pt-2  ml-4 text-medium font-medium text-2xl  my-2 ">
                              {particularpatientdetailsData.firstName}
                              {user.type ?
                                <span className="text-sm pr-6 text-green-600 font-medium  my-4 "> ({user.type})</span> : null}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <div className=" flex ">
                              <p className="text-sm pl-2 text-center text-gray-600  font-medium ml-5">
                                {user.address1 ? <span>{user.address1},</span> : null}
                                {user.address2 ? <span>{user.address2},</span> : null}
                                {user.city ? <span>{user.city},</span> : null}
                                {user.stateName ? <span>{user.stateName},</span> : null}
                                {user.pinCode ? <span>{user.pinCode},</span> : null}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between mt-3 w-full">
                            <button
                              onClick={(e) => Editnewaddress(e, user)}
                              className="bg-white text-brand-secondary p-2 w-full rounded-xl "
                            >
                              Edit
                            </button>
                            {/* <button className="bg-white text-brand-secondary p-2 w-full rounded-xl  ">Remove</button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              <p className=" text-black-900 font-medium text-lg mt-4">
                Other Address
              </p>
              {patientaddressinfoData.map((user, i) => {
                if (!user.isDefault) {
                  return (
                    <div className="rounded-lg  bg-white-600 w-full h-112  pt-5 antialiased justify-between border border-gray-200 mt-2" key={i}>
                      <div className="flex w-full  ">
                        <div className="w-full">
                          <div className="flex justify-between">
                            <p className="pl-2 pt-2  ml-4 text-medium font-medium text-2xl  my-2 ">
                              {particularpatientdetailsData.firstName}
                              {user.type ?
                                <span className="text-sm pr-6 text-green-600 font-medium  my-4 "> ({user.type})</span> : null}
                            </p>
                            {/* <p className="text-sm pr-6 text-green-600 font-medium  my-4 ">
                              {user.type}
                            </p> */}
                          </div>

                          <div className="flex justify-between">
                            <div className=" flex ">
                              <p className="text-sm pl-2 text-center text-gray-600  font-medium ml-5">
                                {user.address1 ? <span>{user.address1},</span> : null}
                                {user.address2 ? <span>{user.address2},</span> : null}
                                {user.city ? <span>{user.city},</span> : null}
                                {user.stateName ? <span>{user.stateName},</span> : null}
                                {user.pinCode ? <span>{user.pinCode},</span> : null}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between mt-3 w-full">
                            <button
                              onClick={(e) => Editnewaddress(e, user)}
                              className="bg-white text-brand-secondary p-2 w-full rounded-xl "
                            >
                              Edit
                            </button>
                            {/* <button className="bg-white text-brand-secondary p-2 w-full rounded-xl  ">Remove</button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}

          {
          showaddresspopup ? (
            <Addaddresspopup
              onClose={() => {
                setshowaddresspopup(false);
                setshowprofileaddress(true);
              }}
              Editaddress={Editaddress}
            ></Addaddresspopup>
          ) : null}
        </div>
      </div>
    </>
  );
}
export default Patientmyaddress;
