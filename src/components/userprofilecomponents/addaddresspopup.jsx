import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addingpatientaddress,
  editingpatientaddress,
  patientaddresslists,
} from "../../Redux/Actions/UserprofileActions";

import "./input.css";
import { ToastContainer, toast } from "react-toastify";
import { faL } from "@fortawesome/free-solid-svg-icons";
import states from "../../helper/state.json";

function Addaddresspopup(props) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authReducer.patientData);
  const [showEditaddress, setshowEditaddress] = useState(false);

  const [isHouseNumber, setHouseNumber] = useState(false);
  const [isAddress, setAddress] = useState(false);
  const [isPinCode, setPinCode] = useState(false);
  const [isCity, setCity] = useState(false);
  const [isState, setState] = useState(false);
  const [isAddressType, setAddressType] = useState(false);
  



  const [stateList, setStateList] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_BASEURL + "state/list")
      .then((res) => res.json())
      .then((result) => setStateList(result));

  }, [])

  const redirectTo = (event) => {
    event.preventDefault();
    props.onClose();
  };

  useEffect(() => {
    if (props?.Editaddress?.id) {
      setshowEditaddress(true);
    } else {
    }
  }, [props]);

  const [addaddress, setaddaddress] = useState({
    patientId: userData.code,
    address1: props?.Editaddress?.address1,
    address2: props?.Editaddress?.address2,
    mobile: props?.Editaddress?.mobile,
    type: props?.Editaddress?.type,
    isDefault: props?.Editaddress?.isDefault ? true : false,
    pinCode: props?.Editaddress?.pinCode,
    state: props?.Editaddress?.state,
    city: props?.Editaddress?.city,
    country: props?.Editaddress?.country,
    status: 1,
    createdDate: props?.Editaddress?.createdDate,
    modifiedDate: props?.Editaddress?.modifiedDate,
    createdBy: userData.code,
    modifiedBy: userData.code,
  });

  const handleChange = (e) => {
    if (e?.target.name === "isDefault") {
      setaddaddress({ ...addaddress, [e.target.name]: e.target.checked });
    } else {
      setaddaddress({ ...addaddress, [e.target.name]: e.target.value });
    }
  };

  const saveaddaddress = (e) => {
    e.preventDefault();
    let data = addaddress;
    data.isDefault = addaddress.isDefault ? 1 : 0;

    if (data.address1 == undefined || data.address1 == "") {
      setHouseNumber(true);
      setAddressType(false);
      setCity(false);
      setPinCode(false);
      setAddress(false);
      setState(false);

      return;
    } else if (data.address2 == undefined || data.address2 == "") {
      setHouseNumber(false);
      setAddressType(false);
      setCity(false);
      setPinCode(false);
      setAddress(true);
      setState(false);

      return;
    } else if (data.pinCode == undefined || data.pinCode == "") {
      setHouseNumber(false);
      setAddressType(false);
      setCity(false);
      setPinCode(true);
      setAddress(false);
      setState(false);

      return;
    } else if (data.city == undefined || data.city == "") {
      setHouseNumber(false);
      setAddressType(false);
      setCity(true);
      setPinCode(false);
      setAddress(false);
      setState(false);

      return;
    } else if (data.state == undefined || data.state == "") {
      setHouseNumber(false);
      setAddressType(false);
      setCity(false);
      setPinCode(false);
      setAddress(false);
      setState(true);

      return;
    } else if (data.type == undefined || data.type == "") {
      setAddressType(true);
      setCity(false);
      setPinCode(false);
      setAddress(false);
      setHouseNumber(false);
      setState(false);
      return;
    }
    setHouseNumber(false);
    setAddressType(false);
    setCity(false);
    setPinCode(false);
    setAddress(false);
    setState(false);

    if (props?.Editaddress?.id) {
      dispatch(editingpatientaddress(props?.Editaddress?.id, addaddress));
      props.onClose();
      toast("Address Saved Successfully");
      dispatch(patientaddresslists(userData?.code));
    } else {
      dispatch(addingpatientaddress(addaddress));
      props.onClose();
      toast("Address Saved Successfully");
      dispatch(patientaddresslists(userData?.code));
    }
  };

  const [city, setCityAll] = useState([]);

  useEffect(() => {
    setCityAll(states[addaddress.state]);
  }, [addaddress.state]);


  return (
    <>
      <ToastContainer />
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*body*/}
            <div className="rounded-lg shadow-lg bg-white-600 w-full h-96 md:h-112 overflow-y-scroll lg:overflow-y-hidden  p-5 antialiased justify-between border border-gray-200">
              <div className="flex justify-between items-center">
                {showEditaddress ? (
                  <h1 className="text-medium font-medium text-xl md:text-2xl text-brand-secondary ">
                    Edit Address
                  </h1>
                ) : (
                  <h1 className="text-medium font-bold text-lg text-gray-800 ">
                    Add New Address
                  </h1>
                )}
                {/* <h1 className="text-medium font-medium text-2xl text-brand-secondary ">Add New Address</h1> */}
                <XIcon onClick={redirectTo} className="h-5 cursor-pointer" />
              </div>
              <hr className="mt-2"></hr>
              <div className="flex pt-2 w-full ">
                <div className="w-full">
                  <div className="lg:flex justify-between mt-6 lg:mt-0 lg:py-6 lg:space-x-10">
                    <div className="relative mb-6">
                      <div className="flex">
                        <input
                          autocomplete="off"
                          id="address1"
                          name="address1"
                          type="text"
                          className="peer  h-10 w-full border-b-2 text-xs border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="Enter Street Name"
                          value={addaddress.address1}
                          onChange={handleChange}
                        />
                      </div>
                      {/* <input autocomplete="off" id="email" name="email" type="text" value="Enter Name" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" /> */}
                      <label
                        for="address1"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        House Number/Street
                      </label>
                      {isHouseNumber && (
                        <label
                          for="address1"
                          className=" left-0 -top-3.5 text-red-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Please enter House Number/Street
                        </label>
                      )}
                    </div>
                    <div className="relative mb-6">
                      <div className="flex">
                        <input
                          autocomplete="off"
                          id="address2"
                          name="address2"
                          type="text"
                          className="peer  h-10 w-full border-b-2 text-xs border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="Enter address"
                          value={addaddress.address2}
                          onChange={handleChange}
                        />
                      </div>
                      <label
                        for="address2"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Address{" "}
                      </label>
                      {isAddress && (
                        <label
                          for="address2"
                          className=" left-0 -top-3.5 text-red-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Please enter Address{" "}
                        </label>
                      )}
                    </div>
                    <div className="relative mb-6">
                      <div className="flex">
                        <input
                          autoComplete="off"
                          id="pinCode"
                          name="pinCode"
                          type="number"
                          className="peer h-10 w-full border-b-2 text-xs border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="Enter Pincode"
                          value={addaddress.pinCode}
                          onChange={handleChange}
                        />
                      </div>
                      <label
                        for="pinCode"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Pincode
                      </label>
                      {isPinCode && (
                        <label
                          for="pinCode"
                          className="left-0 -top-3.5 text-red-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Please enter Pincode
                        </label>
                      )}
                    </div>

                    {/* {showinput ? <input autocomplete="off" id="email" name="email" type="text" value="hello" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" /> : null}   */}
                  </div>
                  <div className="lg:flex justify-between mt-3 lg:mt-0 lg:py-6 lg:space-x-10">

                  <div className="relative mb-6">
                      <div className="flex">

                      <select
                    autocomplete="off"
                    id="state"
                    name="state"
                    value={addaddress.state}
                   
                    className={`${true
                      ? "border-b-2  border-gray-300"
                      : " border-0 appearance-none"
                      } w-11/12 md:w-48 appearance-none pt-2 bg-transparent text-gray-900 text-xs focus:outline-none`}
                    placeholder=""
                    onChange={handleChange}
                  >
                    
                      <option  value={""}>
                         {addaddress.state ||"Select State" }
                      </option>
                   
                    {Object.keys(states).map((key) => (
                      <option value={key}> {key}</option>
                    ))}
                  </select>

                        {/* <input
                          autocomplete="off"
                          id="state"
                          name="state"
                          type="text"
                          className="peer  h-10 w-full border-b-2 text-sm border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="Enter State"
                          value={addaddress.state}
                          onChange={handleChange}
                        /> */}
                      </div>
                      <label
                        for="state"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        State{" "}
                      </label>
                      {isState && (
                        <label
                          for="state"
                          className=" left-0 -top-3.5 text-red-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Please enter State{" "}
                        </label>
                      )}
                    </div>
                    <div className="relative mb-6">
                      <div className="flex">
                        {/* <input
                          autocomplete="off"
                          id="city"
                          name="city"
                          type="text"
                          className="peer  h-10 w-full border-b-2 text-sm border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="Enter City"
                          value={addaddress.city}
                          onChange={handleChange}
                        /> */}


                        <select
                    autocomplete="off"
                    id="city"
                    name="city"
                    value={addaddress.city}
                   
                    className={`${true
                      ? "border-b-2 border-gray-300"
                      : "border-0 appearance-none"
                      } w-11/12 md:w-36 pt-2 bg-transparent text-gray-900 text-xs focus:outline-none`}
                    placeholder="Maharashtra"
                    onChange={handleChange}
                  >
                   
                     

                      <option  value={""}>

                      {addaddress?.city ||"   Select City"}
                   
                      </option>
              
                    
                    { city?.map((cit, i) => (
                        <option key={i} value={cit}> {cit}</option>
                      ))
                    }
                  </select>
                      </div>
                      {/* <input autocomplete="off" id="email" name="email" type="text" value="Enter Name" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" /> */}
                      <label
                        for="city"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        City
                      </label>
                      {isCity && (
                        <label
                          for="city"
                          className=" left-0 -top-3.5 text-red-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Please enter City
                        </label>
                      )}
                    </div>
                    
                    <div className="relative mb-6">
                      <div className="flex">
                        <select
                          className="lg:w-48 w-full text-xs  py-1 outline-none peer border-b-2 border-gray-300 "
                          name="type"
                          value={addaddress.type}
                          onChange={handleChange}
                        >
                          <option
                            className="py-1 text-xs text-gray-500"
                            value="AddressType"
                          >
                            {" "}
                            Address Type{" "}
                          </option>
                          <option className="py-1 text-xs" value="Home">
                            {" "}
                            Home{" "}
                          </option>
                          <option className="py-1 text-xs" value="Office">
                            Office
                          </option>
                          <option className="py-1 text-xs" value="Others">
                            Others
                          </option>
                          {/* {props.homeAdded? <option className="py-1" value="Home"> Home </option>:null}
                                                  {props.officeAdded?  <option className="py-1" value="Office" >Office</option>:null}
                                                  {props.otherAdded?  <option className="py-1" value="Others">Others</option>:null} */}
                        </select>
                      </div>
                      <label
                        for="type"
                        className="absolute left-0 -top-3.5 text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Type
                      </label>
                      {isAddressType && (
                        <label
                          for="type"
                          className=" left-0 -top-3.5 text-red-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Please select address type
                        </label>
                      )}
                    </div>
                    {/* <div className="relative ">
                                            <div className="flex">
                                                <input autocomplete="off" id="mobile" name="mobile" type="number" className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Mobile Number" value={addaddress.mobile} onChange={handleChange} />

                                            </div>
                                            <label for="mobile" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Mobile</label>
                                        </div> */}
                  </div>
                  <div className="relative mt-0 md:mb-4">
                    <div className="flex ">
                      <input
                        autocomplete="off"
                        id="isDefault"
                        name="isDefault"
                        type="checkbox"
                        className="w-3  mr-2 text-sm"
                        checked={addaddress.isDefault}
                        onChange={handleChange}
                      />

                      <label for="mobile" className="text-gray-600 text-xs">
                        Is Default
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end mt-0 md:mt-6">
                    <button
                      type="submit"
                      onClick={saveaddaddress}
                      className="  text-sm text-white font-normal rounded-md py-2 px-3 mr-2 bg-brand-secondary"
                    >
                      Save{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default Addaddresspopup;
