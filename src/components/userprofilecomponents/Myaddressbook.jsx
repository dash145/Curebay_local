/* This example requires Tailwind CSS v2.0+ */
import React, { useState, useEffect } from "react";
import {
  getPatientfamilymembers,
  patientaddresslists,
  deletePatientAddress,
} from "../../Redux/Actions/UserprofileActions";
import Userprofilesidebar from "../userprofilesidebar";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import Addaddresspopup from "./addaddresspopup";
import { ToastContainer, toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { Dialog } from "primereact/dialog";

function Myaddressbook(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [confirmDeleteDefault, setConfirmDeleteDefault] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const [showprofileaddress, setshowprofileaddress] = useState(true);
  const [showaddnewaddress, setshowaddnewaddress] = useState(false);
  const [showeditnewaddress, setshoweditnewaddress] = useState(false);

  const [Editaddress, setEditaddress] = useState();
  // const [optionAdded, setOptionAdded] = useState([{office:false, home:false, others:false} ]);
  const [officeAdded, setofficeAdded] = useState(false);
  const [homeAdded, sethomeAdded] = useState(false);
  const [otherAdded, setotherAdded] = useState(false);
  const [showaddresspopup, setshowaddresspopup] = useState(false);

  const [notDefaultAddress, setNotDefaultAddress] = useState([]);

  const userData = useSelector((state) => state.authReducer.patientData);
  console.log("userData", userData);

  const patientinfo = useSelector((state) => state.patientinfo);
  const { patientinfoData } = patientinfo;
  console.log("patientinfoData", patientinfoData);

  const addressinfo = useSelector((state) => state.patientaddresslist);
  const { patientaddressinfoData } = addressinfo;

  const Addnewaddress = (event) => {
    event.preventDefault();
    setshowprofileaddress(false);
    setshoweditnewaddress(false);
    setshowaddnewaddress(true);
    setshowaddresspopup(true);
    setEditaddress("");
    // history.push(USERPROFILE_ROUTES.ADDADDRESS);
    // dispatch(getPatientfamilymembers(userData.code))
  };

  const Editnewaddress = (event, user) => {
    event.preventDefault();
    setshowprofileaddress(false);
    setshoweditnewaddress(true);
    setshowaddnewaddress(false);
    setEditaddress(user);
    setshowaddresspopup(true);
    dispatch(getPatientfamilymembers(userData.code));
  };

  useEffect(() => {
    dispatch(patientaddresslists(userData.code));
  }, [showaddresspopup]);

  useEffect(() => {
    patientaddressinfoData?.map((el) => {
      if (el.type == "Office") {
        setofficeAdded(true);
      }
      if (el.type == "Home") {
        sethomeAdded(true);
      }
      if (el.type == "Others") {
        setotherAdded(true);
      }
    });
  }, []);

  const onDeleteDefaultAddress = (item, index) => {
    let payloads = {
      id: item?.id,
    };
    dispatch(deletePatientAddress(payloads))
      .then((res) => {
        if (res) {
          dispatch(patientaddresslists(userData?.code));
          setConfirmDeleteDefault(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const onDeleteOtherAddress = (item, index) => {
    let payloads = {
      id: item?.id,
    };
    dispatch(deletePatientAddress(payloads)).then((res) => {
      if (res) {
        dispatch(patientaddresslists(userData?.code));
        setConfirmDelete(false);
      }
    });
  };

  useEffect(() => {
    const temp = [];

    // {patientaddressinfoData?.map((user, i) => {
    //     {user.isDefault === 0 &&
    //         temp=

    patientaddressinfoData?.map((el) => {
      if (el.isDefault === 0) {
        temp.push(el);
      }
    });
    setNotDefaultAddress(temp);
  }, [patientaddressinfoData]);

  console.log("address dataxx", notDefaultAddress);

  return (
    <>
      <ToastContainer />
      <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base mt-8 mb-2">
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
          <a>My Address Book</a>

          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </li>
      </ul>
      <br />

      <div className="flex justify-between " style={{ background: "#F8F8F8" }}>
        <div className="lg:block hidden w-3/12 ml-6 mt-3">
          <Userprofilesidebar></Userprofilesidebar>
        </div>
        <div className="m-auto w-11/12 lg:w-8/12 lg:mx-4 lg:mr-4 lg:mr-12 mb-10 mt-5  ">
          <div>
            <div className="flex justify-between mb-5">
              <p className="text-medium font-bold text-2xl  text-gray-800">
                Saved Address
              </p>
              {/* <p onClick={Addnewaddress} className="text-md text-brand-secondary font-bold pr-4 cursor-pointer"><AddIcon />{" "}Add New Address</p> */}
            </div>

            <div className="bg-white border border-gray-200 pb-8">
              <div className="flex justify-end ">
                <p
                  onClick={Addnewaddress}
                  className="text-xs text-gray-900 font-bold px-2 py-2 mt-3 mr-3 cursor-pointer border border-gray-700 rounded-md"
                >
                  <AddIcon style={{ height: "16px" }} />
                  Add New Address
                </p>
              </div>

              {patientaddressinfoData?.length > 0 && (
                <div className="ml-5">
                  <p className=" text-black-900 font-bold text-lg mt-4">
                    Default Address
                  </p>
                  <hr className="mt-1 w-11/12 mx-3 "></hr>
                </div>
              )}

              {patientaddressinfoData?.map((user, i) => {
                if (user.isDefault) {
                  return (
                    <>
                      <div
                        className="rounded-xl  bg-white-600 m-auto w-11/12 lg:w-96 h-112 pt-3 lg:pt-5 antialiased justify-between border md:ml-4 mt-2"
                        key={i}
                      >
                        <div className="flex w-full px-3 lg:px-0">
                          <div className="w-full">
                            <div className="flex justify-between">
                              <p className="lg:pl-7 font-bold text-sm  mb-2  ">
                                {userData.firstName}
                              </p>
                              <p className="text-xs lg:pr-6 text-green-600 font-semibold mb-2 ">
                                {user.type}
                              </p>
                            </div>
                            <div className="flex justify-between">
                              <div className=" flex overflow-hidden">
                                <p className="text-sm w-11/12 break-words md:w-full  text-left text-gray-600  font-medium lg:pl-2 lg:ml-5">
                                  {user.address1},{user.address2},{user.city},
                                  {user.state},{user.pinCode}
                                </p>
                              </div>
                            </div>
                            <div className="flex bg-white justify-end mt-3 lg:pr-5 border-t-2 w-full py-2 text-xs">
                              <button
                                onClick={(e) => Editnewaddress(e, user)}
                                className=" font-normal mr-2 p-2   text-white  py-1 px-2  rounded-md cursor-pointer"
                                style={{ background: "#66B889" }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => setConfirmDeleteDefault(true)}
                                className=" font-normal   p-2  lg:mr-2   text-gray-800 border border-gray-800  py-1 px-2 rounded-md disabled:opacity-50  cursor-pointer"
                              >
                                Delete
                              </button>
                              {/* <button onClick={() => onDeleteAddress(user, i)} className=" font-normal   p-2  mr-2  bg-brand-secondary text-white   py-1 px-2 rounded-md disabled:opacity-50  cursor-pointer">Delete</button> */}
                              {/* <div className=" vertical m-2 "></div>
                                                        <button className="bg-white text-brand-secondary font-normal p-2 w-full rounded-xl m-2 ">Remove</button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Dialog
                        visible={confirmDeleteDefault}
                        modal={false}
                        // style={{ width: "800px", height: 'auto' }}
                        className="w-11/12 md:w-8/12 lg:w-2/5 "
                        onHide={() => setConfirmDeleteDefault(false)}
                      >
                        <>
                          <div className=" mb-7 mt-4">
                            <p className="font-semibold">
                              Are you sure you want to delete this address?
                            </p>
                          </div>
                          <div>
                            <button
                              onClick={() => setConfirmDeleteDefault(false)}
                              className="text-xs text-white font-normal rounded-md py-2 px-3 mr-2"
                              style={{ background: "#66B889" }}
                            >
                              Cancel
                            </button>

                            <button
                              onClick={() => onDeleteDefaultAddress(user, i)}
                              className="text-xs text-white font-normal rounded-md py-2 px-3 mr-2"
                              style={{ background: "#66B889" }}
                            >
                              Yes
                            </button>
                          </div>
                        </>
                      </Dialog>
                    </>
                  );
                }
              })}

              <div className="ml-5 pt-4">
                {notDefaultAddress?.length > 0 && (
                  <p className=" text-black-900 font-bold text-lg mt-4">
                    Other Address
                  </p>
                )}
              </div>

              {notDefaultAddress?.length > 0 && (
                <hr className="mt-1 w-11/12 mx-3 "></hr>
              )}

              <div className=" items-center grid grid-cols-1   lg:grid-cols-2 ">
                {patientaddressinfoData.map((user, i) => {
                  if (!user.isDefault) {
                    return (
                      <>
                        <div key={i}>
                          {user?.address1 === null ||
                          user?.address1 === "" ||
                          user?.address2 === null ||
                          user?.address1 === undefined ||
                          user?.address2 === undefined ||
                          user?.address2 === "" ||
                          user?.city === undefined ||
                          user?.city === null ||
                          user?.city === "" ||
                          user?.pinCode === null ||
                          user?.pinCode === undefined ||
                          user?.pinCode === "" ? (
                            <div></div>
                          ) : (
                            <div className="rounded-xl  bg-white-600 w-11/12 lg:w-96 h-112 pt-3 lg:pt-5 antialiased justify-between border m-auto md:ml-4 mt-2">
                              <div className="flex w-full px-3 lg:px-0">
                                <div className="w-full">
                                  <div className="flex justify-between">
                                    <p className="lg:pl-7 font-bold text-sm  mb-2   ">
                                      {patientinfoData.firstName}
                                    </p>
                                    <p className="text-xs lg:pr-6 text-green-600 font-semibold  mb-2 ">
                                      {user.type}
                                    </p>
                                  </div>

                                  <div className="flex justify-between">
                                    <div className=" flex w-11/12">
                                      <p className="text-sm lg:pl-2 w-full break-words  text-left text-gray-600  font-medium lg:ml-5">
                                        {user.address1 &&
                                       user.address1}
                                        ,
                                        {user.address2 &&
                                        user.address2}
                                        ,{user.city},{user.state},{user.pinCode}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex bg-white justify-end mt-3 lg:pr-5 border-t-2 w-full py-2 text-xs">
                                    <button
                                      onClick={(e) => Editnewaddress(e, user)}
                                      className=" font-normal mr-2 p-2   text-white  py-1 px-2  rounded-md cursor-pointer"
                                      style={{ background: "#66B889" }}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => setConfirmDelete(true)}
                                      className=" font-normal   p-2  lg:mr-2   text-gray-800 border border-gray-800  py-1 px-2 rounded-md disabled:opacity-50  cursor-pointer"
                                    >
                                      Delete
                                    </button>
                                    {/* <div className=" vertical m-2 "></div>
                                                        <button className="bg-white text-brand-secondary font-normal p-2 w-full rounded-xl m-2 ">Remove</button> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <Dialog
                          visible={confirmDelete}
                          modal={false}
                          // style={{ width: "800px", height: 'auto' }}
                          className="w-11/12 md:w-8/12 lg:w-2/5 "
                          onHide={() => setConfirmDelete(false)}
                        >
                          <>
                            <div className=" mb-7 mt-4">
                              <p>
                                Are you sure you want to delete this address?
                              </p>
                            </div>
                            <div>
                              <button
                                onClick={() => setConfirmDelete(false)}
                                className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
                              >
                                Cancel
                              </button>

                              <button
                                onClick={() => onDeleteOtherAddress(user, i)}
                                className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
                              >
                                Yes
                              </button>
                            </div>
                          </>
                        </Dialog>
                      </>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          {/* addnewaddress casrt starts here */}
          {
            showaddresspopup ? (
              <Addaddresspopup
                onClose={() => {
                  setshowaddresspopup(false);
                  setshowprofileaddress(true);
                }}
                Editaddress={Editaddress}
              />
            ) : null
            // officeAdded={officeAdded} otherAdded={otherAdded} homeAdded={homeAdded}
          }
        </div>
      </div>
    </>
  );
}
export default Myaddressbook;
