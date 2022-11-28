import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useHistory, useLocation } from "react-router-dom";
import { USERPROFILE_ROUTES } from "../../application/Router/constants/UserProfileRoutes";
import { useDispatch, useSelector } from "react-redux";
import {
  addingpatientaddress,
  editingpatientaddress,
  patientaddresslists,
} from "../../Redux/Actions/UserprofileActions";
import { APP_ROUTES } from "../../application/Router/constants/AppRoutes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Addaddresspopup(props) {
  
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authReducer.userData);
  const [showEditaddress, setshowEditaddress] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [state, setState] = useState(null);
  const redirectTo = (event) => {
    event.preventDefault();
    props.onClose();
  };
  const style = {

  };

  // useEffect(() => {
  //   fetch("/api/state/list")
  //     .then((res) => res.json())
  //     .then((result) => setItems(result))
  //     .catch((error) => setError(error))
  //     .finally(() => setIsLoaded(true));
  // }, []);

  useEffect(() => {
    fetch(process.env.REACT_APP_BASEURL + "state/list")
      .then((res) => res.json())
      .then((result) => setItems(result))
      .catch((error) => setError(error));
    if (props?.Editaddress?.id) {
      setshowEditaddress(true);

      console.log("editadrressdata", props);
    } else {
      setshowEditaddress(false);
    }
  }, []);

  const [addaddress, setaddaddress] = useState({
    patientId: localStorage.getItem("patientprofile"),
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
    console.log("statevalue", e.target.description);
    if (e?.target.name === "isDefault") {
      setaddaddress({ ...addaddress, [e.target.name]: e.target.checked });
    } else {
      setaddaddress({ ...addaddress, [e.target.name]: e.target.value });
    }
    // if(e.target.name==="description"){

    // }
  };
  
  const patientCode = useSelector(state => state.authReducer.patientCode);
  const saveaddaddress = (e) => {
    e.preventDefault();
    if (!addaddress.address1) {
      toast("Enter Street Name")
    } else if (!addaddress.address2) {
      toast("Enter Address")
    } else if (!addaddress.pinCode) {
      toast("Enter Pin code")
    } else if (!addaddress.city) {
      toast("Enter city")
    } else if (!addaddress.state) {
      toast("Select State")
    } else if (!addaddress.type) {
      toast("Select Address type")
    } else {
      let data = addaddress;
      data.isDefault = addaddress.isDefault ? 1 : 0;

      if (props?.Editaddress?.id) {
        dispatch(editingpatientaddress(props?.Editaddress?.id, addaddress));
        dispatch(patientaddresslists(patientCode));
        props.onClose();
        dispatch(patientaddresslists(patientCode));
      } else {
        dispatch(addingpatientaddress(addaddress));
        dispatch(patientaddresslists(patientCode));
        props.onClose();
      }
    }

  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*body*/}
            <div className="rounded-lg shadow-lg bg-white-600 w-full h-112 p-5 antialiased justify-between border border-gray-200">
              <div className="flex justify-between">
                {showEditaddress ? (
                  <h1 className="text-medium font-medium text-2xl text-brand-secondary ">
                    Edit New Address
                  </h1>
                ) : (
                  <h1 className="text-medium font-medium text-lg text-brand-secondary ">
                    Add New Address
                  </h1>
                )}
                {/* <h1 className="text-medium font-medium text-2xl text-brand-secondary ">Add New Address</h1> */}
                <XIcon onClick={redirectTo} className="h-5 cursor-pointer" />
              </div>
              <hr className="mt-2"></hr>

              <div className="flex pt-2 w-full ">
                <div className="w-full">
                  <div className="lg:flex justify-between py-6 lg:space-x-10">
                    <div className="relative mb-6">
                      <div className="flex">
                        <input
                          autocomplete="off"
                          id="address1"
                          name="address1"
                          type="text"
                          className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="Enter Street Name"
                          value={addaddress.address1}
                          onChange={handleChange}
                        />
                      </div>
                      {/* <input autocomplete="off" id="email" name="email" type="text" value="Enter Name" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" /> */}

                      <label
                        for="address1"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        House Number/Street{" "}
                      </label>
                    </div>
                    <div className="relative mb-6">
                      <div className="flex">
                        <input
                          autocomplete="off"
                          id="address2"
                          name="address2"
                          type="text"
                          className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="Enter address"
                          value={addaddress.address2}
                          onChange={handleChange}
                        />
                      </div>
                      <label
                        for="address2"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Address{" "}
                      </label>
                    </div>
                    <div className="relative ">
                      <div className="flex">
                        <input
                          autocomplete="off"
                          id="pinCode"
                          pattern="\d*"
                          maxLength="6"
                          name="pinCode"
                          className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="Enter Pincode"
                          value={addaddress.pinCode}
                          onChange={handleChange}
                        />
                      </div>
                      <label
                        for="pinCode"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Pincode
                      </label>
                    </div>

                    {/* {showinput ? <input autocomplete="off" id="email" name="email" type="text" value="hello" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" /> : null}   */}
                  </div>
                  <div className="lg:flex justify-between lg:py-6 lg:space-x-10">
                    <div className="relative mb-6">
                      <div className="flex">
                        <input
                          autocomplete="off"
                          id="city"
                          name="city"
                          type="text"
                          className="peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                          placeholder="Enter City"
                          value={addaddress.city}
                          onChange={handleChange}
                        />
                      </div>
                      {/* <input autocomplete="off" id="email" name="email" type="text" value="Enter Name" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" /> */}

                      <label
                        for="city"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        City
                      </label>
                    </div>
                    <div className="relative mb-2">
                      <div className="flex">
                        <select
                          id="state"
                          name="state"
                          value={addaddress.state}
                          className="w-48  py-2 outline-none peer   border-b-2 border-gray-300"
                          onChange={handleChange}
                        >
                          <option value="">Select State</option>
                          {items.map((result) => (
                            <option
                              key={result.code}
                              value={result.code}
                            >
                              {result.description}
                            </option>
                          ))}
                        </select>
                      </div>
                      <label
                        for="state"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        State{" "}
                      </label>
                    </div>
                    <div class="relative mb-5">
                      <div className="flex">
                        <select
                          class="w-48  py-2 outline-none peer   border-b-2 border-gray-300 "
                          name="type"
                          value={addaddress.type}
                          onChange={handleChange}
                        >
                          <option value="">Select Address Type</option>
                          <option class="py-1" value="Home">Home </option>
                          <option class="py-1" value="Office">Office</option>
                          <option class="py-1" value="others">others</option>
                        </select>
                      </div>
                      <label
                        for="type"
                        class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Address Type
                      </label>
                    </div>
                  </div>

                  <div className="relative ">
                    <div className="flex">
                    <input
                        autocomplete="off"
                        id="isDefault"
                        name="isDefault"
                        type="checkbox"
                        className="w-3  mr-2 "
                        checked={addaddress.isDefault}
                        onChange={handleChange}
                      />
                      <label for="mobile" className="text-gray-600 text-sm">
                        Is Default
                      </label>
                     
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      onClick={saveaddaddress}
                      className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
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
      <ToastContainer />
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default Addaddresspopup;
