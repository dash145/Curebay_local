import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import { saveEnquiry } from "../Redux/Actions/hospitalpageActions";
import bethanyhospital from "../Assets/Images/bethanyhospital.svg";
import img1 from "../Assets/Images/1.svg";
import img2 from "../Assets/Images/2.svg";
import img3 from "../Assets/Images/3.svg";
import img4 from "../Assets/Images/4.svg";
import moment from "moment";
import states from "../helper/state.json";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MultiSelect } from "primereact/multiselect";
import { ToastContainer, toast } from "react-toastify";
import bed from "../Assets/Images/no_of_beds_black.svg";
import HospitalDoctors from "../components/hospitalDoctors";
import FamilyDropdown from '../components/userprofilecomponents/FamilyDropdownEnquire';
import {
  getprocedurelist,
  postenquiryhospital,
} from "../Redux/Actions/hospitalpageActions";
import { Galleria } from 'primereact/galleria';
import placeholder_m from "../Assets/Images/placeholder_m.svg";

import { getAllStates } from "../Redux/Actions/hospitalpageActions";
import hospitalservice from "../Redux/services/hospitalservice";
import {getLocalTime} from '../Assets/utils/LocalTimeFormat'

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const validationSchema = Yup.object({
  dob: Yup.string().required("DOB is required"),
  contactNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "phone number should be exact 10 digit!")
    .required("Phone number is required"),
  city: Yup.string().nullable(true).required("Please enter City "),
  address1: Yup.string().nullable(true).required("Please enter address"),
  state: Yup.string().nullable(true).required("Please select state"),
  country: Yup.string().nullable(true).required("Country is required"),
  nationality: Yup.string().nullable(true).required("Nationality is required"),
  notes1: Yup.string(),
  procedureId: Yup.string().required("Please select procedure name"),
  serviceType: Yup.string().required("Please select service type"),
});

function Hospitalenquiryform(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [stateList, setstateList] = useState([]);
  const patientData = useSelector((state) => state.authReducer.patientData);
  const { coords } = useSelector((state) => state.authReducer);
  const [dob, setDOB] = useState(patientData?.dob);

  const search = useLocation().search;
  const hospital_code = new URLSearchParams(search).get('code');
  const hospital_id = new URLSearchParams(search).get('hospitalcode');
  const procedurelist = useSelector((state) => state.procedurelist);
  const { procedurelistData } = procedurelist;
  const [selectedCities1, setSelectedCities1] = useState([]);
  const [showImage, setImage] = useState("");
  const [hospitalImages, setHospitalImages] = useState([]);

  const [patient, setPatient] = useState(patientData);

  const [particularhospitalData, setHospitalsList] = useState([]);
  // const paricularhospital = useSelector((state) => state.particularhospital);
  // const { particularhospitalData, isLoading } = paricularhospital;
  const [load, setLoad] = useState(false);

  const [vanish, setVanish] = useState(false);

  const [toDate, settoDate] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [fromDateValue, setfromDateValue] = useState("");
  const [toDateValue, settoDateValue] = useState("");
  const [dobValue, setDOBValue] = useState("");
  const [ProcedureDateError, setProcedureDateError] = useState("");
  const [dobError, setDOBError] = useState("");
  const [noOfBeds, setnoBeds] = useState(0);
  const [zoomState, setZoomState] = useState({
    backgroundPosition: '0% 0%'
  })
  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };

  const setBeds = (val) => {
    setnoBeds(val);
  };

  useEffect(() => {
    console.log("is host", JSON.stringify(hospital_code));
    dispatch(getprocedurelist());
    dispatch(getAllStates())
      .then((result) => {
        setstateList(result);
      })
      .catch((error) => { });
  }, []);

  useEffect(() => {
    if (hospital_code) {
      hospitalservice.getparticularhospital(hospital_code).then(
        (res) => {
          if (res.data) {
            for (let s = 0; s < res.data.length; s++) {
              res.data[s]["hospitalLocationNames"] =
                res.data[s].hospitalName + " (" + res.data[s].name + ")";
            }
            setHospitalsList(res.data);
            // hospitallistData = res.data;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }

    console.log("patient Data", JSON.stringify(patientData));

    setDOBValue(patientData.dob != null ? patientData?.dob : "");
  }, [hospital_code]);

  useEffect(() => {
    let temp = []
    setHospitalImages([])
    console.log("hospital images", hospitalImages);
    particularhospitalData?.map((el) => {
      console.log(el, "viyviyivivvuiuv");
      if (el.photoName) {
        temp.push(el.photoName)
      }
      if (el.photoName1) {
        temp.push(el.photoName1)
      }
      if (el.photoName2) {
        temp.push(el.photoName2)
      }
      if (el.photoName3) {
        temp.push(el.photoName3)
      }
      // temp.push(el.photoName, el.photoName1, el.photoName2, el.photoName3)
    })
    if (temp.length > 0) {
      console.log(temp, "savhousabvuabuod");
      setHospitalImages(temp);
    }
  }, [particularhospitalData])


  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      name: patientData?.firstName,
      dob:
        patientData?.dob != null
          ? patientData?.dob
          : moment().format("YYYY-MM-DD HH:mm:ss"),
      emailId: patientData?.email,
      contactNumber: patientData?.mobile,
      address1: patientData?.address1,
      address2: "",
      city: patientData?.city,
      state: patientData?.state,
      country: "India",
      nationality: "Indian",
      insuranceName: "",
      insuranceId: 0,
      insuranceAmount: 0,
      procedureName: "",
      procedureId: "",
      passportNumber: "",
      procedurePlannedDate: "",
      notes: "",
      notes1: "",
      patientId: patientData?.code,
      business: 0,
      preferredHospitalAndClinics: hospital_id,
      serviceType: "",
      hospitalId: hospital_id,

      // hospitalName: search?.hospitalName,
      locationId: hospital_code,
      status: 1,
      createdDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      modifiedDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      fromDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      toDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      fixedDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      createdBy: patientData?.code,
      modifiedBy: patientData?.code,
      hospitalId: hospital_id,
      // hospitalName: search?.hospitalName,
      // locationId: search?.code,
      // locationName: search.name,
      preferredHospitalAndClinics: hospital_id,
    },

    validateOnChange: true,
    validationSchema,
    async onSubmit(values) {
      if (!dobValue) {
        setDOBError(true);
      } else if (!fromDate) {
        setProcedureDateError(true);
      } else if (!toDate) {
        setProcedureDateError(true);
      } else {
        setProcedureDateError(false);
        setDOBError(false);
        setLoad(true);

        let arr = [];
        // setMsg('');
        values.dob = dobValue;

        values.procedurePlannedStartDate = fromDate;
        values.procedurePlannedEndDate = toDate;
        values.procedurePlannedDate = "";

        const procedure = procedurelistData.filter(
          (x) => x.procedureId == values.procedureId
        );

        values.procedureId = procedure[0].procedureId;
        values.procedureName = procedure[0].procedureName;

        // for (let s = 0; s < selectedCities1.length; s++) {
        //   // const hospital = hospitalsList.filter(
        //   //   (x) => x.code == selectedCities1[s]
        //   // );

        //   const procedure = procedurelistData.filter(
        //     (x) => x.procedureId == values.procedureId
        //   );

        //   values.procedureId = procedure[0].procedureId;
        //   values.procedureName = procedure[0].procedureName;
        //   const valueArr = JSON.parse(JSON.stringify(values));
        //   arr.push(values);
        //   console.log("values", values);
        // }
        if (patient?.code) {
          values.name = patient?.firstName
          values.patientId = patient?.code
          values.createdBy = patient?.code
          values.modifiedBy = patient?.code
        }
        const valueArr = JSON.parse(JSON.stringify(values));
        arr.push(values);
        console.log(patient, "valueskkk", values);

        dispatch(saveEnquiry(arr))
          .then((res) => {
            console.log("reee", res);
            setLoad(true);
            toast("Service Enquiry Form Added Successfully");
            setTimeout(() => {
              history.goBack();
            }, 1000);
          })
          .catch(() => {
            setLoad(false);
          });
      }
    },
  });

  const changePatient = () => { };

  const changeDate = (e) => {
    setDOBValue(moment(new Date(e), "yyyy-MM-DD").format("MM/DD/yyyy"));
  };


  const loadPaymentFor = (patient, name) => {
    let params = {
      code: patient,
      firstName: name
    }
    setPatient(params)
  }

  const responsiveOptions2 = [
    {
      breakpoint: '960px',
      numVisible: 4
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  const handleImgError = e => {
    e.target.src = placeholder_m
  }

  const thumbnailTemplate = (item) => {
    console.log(item, "sdvdsvodsihvpijvpsd");
    return <img src={process.env.REACT_APP_IMG_BASEURL + item} alt={item?.alt} style={{ width: "60px", display: 'block' }} />
  }

  const handleMouseMove = (e, item) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    setZoomState({ backgroundPosition: `${x}% ${y}%`, width: "300px" })
  }

  const itemTemplate = (item) => {
    console.log(item, "item image");
    return <figure style={{ backgroundImage: `url(${process.env.REACT_APP_IMG_BASEURL + item})`, width: "200px", height: "max-content", display: 'block', ...zoomState }} onMouseLeave={() => setZoomState({ width: "200px" })} onMouseMove={(e) => handleMouseMove(e, item)}><img src={process.env.REACT_APP_IMG_BASEURL + item} alt={item?.alt} /></figure>
  }

  console.log(particularhospitalData, "sdivsdhivhsoduds");


  const hide = () => {
    setVanish(!vanish);
  }


  return (
    <>
      <ToastContainer />
      <div className="lg:flex">
        <div className="lg:pb-20 lg:w-6/12 xl:w-5/12">
          {/* <NavBarSearch /> */}
          {/* breadcrumbs */}
          <ul className="lg:flex hidden  text-brand-secondary   text-sm lg:text-base  pt-5">
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
              <a href="/hospital">Hospital</a>
              <svg
                className="h-5 w-auto "
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
              <a className="cursor-pointer" onClick={
                () => {
                  history.push({ pathname: `/hospitaldetails/${hospital_code}`, state: particularhospitalData[0] });
                }
              }>
                {particularhospitalData[0]?.hospitalName}
              </a>
              <svg
                className="h-5 w-auto "
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
              <a>
                Enquiry
              </a>
            </li>
          </ul>
          <div className="text-center"></div>
          {particularhospitalData.map((hosp, i) => (
            <div className="mt-4 md:mt-0 lg:mt-8">
              <div key={i} className="md:flex md:flex-col lg:flex lg:flex-col">
                {/* <div className="flex flex-col md:flex-row lg:flex-col md:gap-5"> */}
                  <div className="w-auto lg:w-auto  pt-5 flex sm:grid-cols-1 ">
                    <div className="overflow-x-scroll lg:overflow-x-visible example w-full mx-auto md:w-full flex items-center overflow-hidden justify-center border-2 rounded-md" style={{ height: "304px" }}>



                      {
                        hospitalImages?.length ? <Galleria value={hospitalImages} responsiveOptions={responsiveOptions2} numVisible={3} thumbnailsPosition="left"
                          item={itemTemplate} circular thumbnail={thumbnailTemplate} /> :
                          <img
                            className="w-1/2 h-80 p-5"
                            style={{ width: "258", height: "201px" }}
                            src={bethanyhospital}
                            alt="ProductImage"
                            referrerPolicy="no-referrer"
                            onError={handleImgError}
                          />
                      }

                    </div>
                  </div>

                  <div className="mt-5 ">
                    <p className="text-2xl  font-semibold  leading-5  not-italic text-green-400">
                      {hosp.hospitalName}
                    </p>

                    <hr className="mt-5 mb-5" />

                    <div className="text-xs">

                      <div className="flex mt-3">

                        <div className="">
                          <p className="text-xs w-36 md:w-48  lg:w-36 font-bold h-5  leading-5  top-0 left-0 not-italic">
                            Location
                          </p>
                        </div>
                        <div className="flex">
                          <p className="mr-5 font-bold h-5  leading-5  text-black not-italic w-1">
                            :
                          </p>
                          <p className="text-aligned text-black-400 font-normal w-32 md:-44 lg:w-56 xl:w-auto ">
                            {hosp.address1},{hosp.city}{" "}
                          </p>
                        </div>
                      </div>

                      <div className="flex mt-5">
                        <div>
                          <p className="text-xs w-36 md:w-48  lg:w-36 font-bold h-5 leading-5  top-0 left-0 not-italic">
                            Hours
                          </p>
                        </div>
                        <div className="flex">
                          <p className="mr-5 font-bold h-5  leading-5  text-black not-italic w-1">
                            :
                          </p>
                          <p className="text-aligned text-black font-normal">
                            Open 24 hours{" "}
                          </p>
                        </div>
                      </div>
                      <div className="flex  mt-5">
                        <div>
                          <p className="text-xs w-36 md:w-48  lg:w-36 font-bold h-5  leading-5  top-0 left-0 not-italic">
                            Phone
                          </p>
                        </div>
                        <div className="flex">
                          <p className="mr-5 font-bold h-5  leading-5  text-black not-italic w-1">
                            :
                          </p>
                          <p className="text-aligned1 text-xs text-black font-normal leading-5">
                            {hosp.contactNumber}
                          </p>
                        </div>
                      </div>

                      <div className="flex lg:pb-0 pb-1 mt-5">
                        <div className="flex  ">
                          <div className="flex items-center w-36 md:w-48 lg:w-36">

                            <img src={bed} alt="beds" className="w-4 mr-2" />
                            <p className="text-xs w-36 md:w-48 font-bold h-5  leading-5  top-0 left-0 not-italic">
                              Beds Available
                            </p>

                          </div>
                          <div className="flex">
                            <p className="mr-5 font-bold h-5  leading-5  text-black not-italic w-1">
                              :
                            </p>

                            <p className="text-aligned text-black font-normal">
                              {hosp.noOfBed}
                            </p>
                          </div>
                        </div>
                      </div>


                    </div>


                  </div>
                {/* </div> */}
              </div>
            </div>
          ))}

          <div className="my-4">
            <HospitalDoctors data={search} noOfBeds={setBeds} />
          </div>
        </div>

        <div className=" lg:ml-5 mt-14">
          <form onSubmit={handleSubmit}>
            <div className="rounded-lg  bg-white-600 w-full h-112 p-5 mt-3 antialiased justify-between  lg:pb-4 mb-10">
              <p className="text-medium font-medium text-2xl  ">
                Hospital Enquiry Form
              </p>
              <hr className="mt-5 mb-3" />
              <p className="text-black-900 font-medium text-lg mb-4">
                Personal Details
              </p>
              <input type="hidden" id="code" />
              {/* <input type="hidden" id="code" /> */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 ">
                <fieldset className="border rounded border-solid border-gray-300 pl-3 border-[#EFEFEF]">
                  <legend className="text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown: transition-all peer-focus:text-gray-600 peer-focus:text-sm ">
                    {" "}
                    Name of Patient{" "}
                  </legend>
                  <div className="flex ">

                    <FamilyDropdown title={''} onSelect={loadPaymentFor} />

                    {/* <input
                    autocomplete="off"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    type="hidden"
                    className="peer bg-transparent text-xs md:text-sm w-full md:w-42 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Name"
                  />
                  <select
                    id="patientId"
                    name="patientId"
                    onChange={changePatient}
                    type="text"
                    className="peer text-xs md:text-sm bg-transparent w-full md:w-42  text-gray-900 focus:outline-none focus:borer-rose-600"
                  >
                    <option selected value={""}>
                      -- Select Patient --
                    </option>
                    <option selected value={patientData?.code}>
                      {`${patientData.firstName} ${patientData.lastName}`}
                    </option>
                  </select> */}
                  </div>

                  <div>
                    {errors.name && (
                      <div style={{ color: "red", fontSize: 12 }}>
                        {errors.name}
                      </div>
                    )}
                  </div>
                </fieldset>
                <fieldset className="border rounded border-solid border-gray-300 pl-3 pb-2 border-[#EFEFEF]  ">
                  <legend className="text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown: transition-all peer-focus:text-gray-600 peer-focus:text-sm ">
                    DOB
                  </legend>
                  <div class=" w-42">

                    <div>
                      <DatePicker
                        showMonthDropdown
                        showYearDropdown
                        id="dob"
                        name="dob"
                        className="peer text-xs md:text-xs bg-transparent  w-full border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 "
                        dropdownMode="select"
                        maxDate={new Date()}
                        dateFormat="MM/dd/yyyy"
                        value={getLocalTime(dobValue)}
                        onSelect={changeDate}
                        autocomplete="off"
                        placeholderText={"dd/MM/yyyy"}
                        disabledKeyboardNavigation={true}
                        autoFocus={false}
                      />
                    </div>


                    <div>
                      {dobError && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          Please select valid DOB
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>

                <fieldset className="border rounded border-solid border-gray-300 pl-3 border-[#EFEFEF]  w-42 ">
                  <legend className="text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown: transition-all peer-focus:text-gray-600 peer-focus:text-sm ">
                    {" "}
                    Email ID{" "}
                  </legend>
                  <div className="">
                    <input
                      autocomplete="off"
                      id="emailId"
                      name="emailId"
                      onChange={handleChange}
                      value={values.emailId}
                      type="email"
                      readOnly={true}
                      className="peer bg-transparent text-xs md:text-xs w-full md:w-42  border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email id"
                    />

                    <div>
                      {errors.emailId && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.emailId}
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>

                <fieldset className="border rounded border-solid border-gray-300 pl-3 border-[#EFEFEF] ">
                  <legend className="text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown: transition-all peer-focus:text-gray-600 peer-focus:text-sm ">
                    {" "}
                    Phone Number{" "}
                  </legend>
                  <div >
                    <input
                      autocomplete="off"
                      id="contactNumber"
                      name="contactNumber"
                      value={values.contactNumber}
                      onChange={handleChange}
                      // readOnly={true}
                      type="number"
                      className="peer text-xs md:text-xs  w-full md:w-42  text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Phone Number"
                    />

                    <div>
                      {errors.contactNumber && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.contactNumber}
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>

                <fieldset className="border rounded border-solid border-gray-300 pl-3 border-[#EFEFEF] ">
                  <legend className="text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown: transition-all peer-focus:text-gray-600 peer-focus:text-sm ">
                    {" "}
                    Address 1{" "}
                  </legend>
                  <div className="relative mb-2 w-42">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="address1"
                        name="address1"
                        value={values.address1}
                        onChange={handleChange}
                        type="text"
                        className="peer bg-transparent text-xs md:text-xs w-full md:w-42 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="address 1"
                      />
                    </div>



                    <div>
                      {errors.address1 && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.address1}
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>

                <fieldset className="border rounded border-solid border-gray-300 pl-3 border-[#EFEFEF] ">
                  <legend className="text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown: transition-all peer-focus:text-gray-600 peer-focus:text-sm ">
                    Address 2{" "}
                  </legend>
                  <div className="relative mb-2 w-42">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="address2"
                        name="address2"
                        value={values.address2}
                        type="text"
                        onChange={handleChange}
                        className="peer bg-transparent  w-full text-xs md:text-xs md:w-42  text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="address 2"
                      />
                    </div>
                  </div>
                </fieldset>

                <fieldset className="border rounded border-solid border-gray-300 pl-3 border-[#EFEFEF] ">
                  <legend className="text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown: transition-all peer-focus:text-gray-600 peer-focus:text-sm ">
                    State{" "}
                  </legend>
                  <div className="relative mb-2 w-42">
                    <div className="flex">
                      <select
                        autocomplete="off"
                        id="state"
                        name="state"
                        type="text"

                        value={values.state}
                        onChange={handleChange}
                        className="peer bg-transparent text-xs md:text-xs  w-full md:w-42  text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="state"
                      >
                        <option selected value={patientData?.state}>
                          {`${patientData.state}`}
                        </option>

                        {stateList.map((keys) => (
                          <option value={keys.code}> {keys.description}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      {errors.state && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.state}
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>

                <fieldset className="border rounded border-solid border-gray-300 pl-3 border-[#EFEFEF] ">
                  <legend className="text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown: transition-all peer-focus:text-gray-600 peer-focus:text-sm ">
                    {" "}
                    City{" "}
                  </legend>
                  <div className="relative mb-2 w-42">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="city"
                        name="city"
                        onChange={handleChange}
                        value={values.city}
                        type="text"
                        className="peer text-xs md:text-xs bg-transparent  w-full md:w-42 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="city"
                      />
                    </div>

                    <div>
                      {errors.city && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.city}
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>

                <fieldset className="border rounded border-solid border-gray-300 pl-3 border-[#EFEFEF] ">
                  <legend className="text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown: transition-all peer-focus:text-gray-600 peer-focus:text-sm ">
                    Country{" "}
                  </legend>
                  <div className="relative mb-2 w-42">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="country"
                        name="country"
                        value={values.country}
                        readOnly={true}
                        type="text"
                        onChange={handleChange}
                        className="peer text-xs md:text-xs bg-transparent  w-full md:w-42 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="country"
                      />

                    </div>

                    <div>
                      {errors.country && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.country}
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>

                <fieldset className="border rounded border-solid border-gray-300 pl-3 border-[#EFEFEF] ">
                  <legend className="text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown: transition-all peer-focus:text-gray-600 peer-focus:text-sm ">
                    {" "}
                    Nationality{" "}
                  </legend>
                  <div className="relative mb-2 w-42">

                    <div className="flex">
                      <select
                        autocomplete="off"
                        id="nationality"
                        name="nationality"
                        onChange={handleChange}
                        value={values.nationality}
                        type="text"
                        className="peer text-xs md:text-xs bg-transparent  w-full md:w-42  text-gray-900 focus:outline-none focus:borer-rose-600"
                      >
                        <option selected value="">
                          -- Select Nationality --
                        </option>
                        <option value="Indian"> Indian</option>
                        <option value="Others"> Others</option>
                      </select>

                    </div>

                    <div>
                      {errors.nationality && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.nationality}
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>

                <fieldset className="border rounded border-solid border-gray-300 pl-3 border-[#EFEFEF] ">
                  <legend className="text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown: transition-all peer-focus:text-gray-600 peer-focus:text-sm ">
                    Passport Number{" "}
                  </legend>
                  <div className="w-42">
                    <input
                      autocomplete="off"
                      id="passportNumber"
                      name="passportNumber"
                      onChange={handleChange}
                      type="text"
                      disabled={values.nationality == "Indian"}
                      className="peer bg-transparent w-full md:w-42  text-xs md:text-xs  focus:outline-none focus:borer-rose-600"
                      placeholder="Enter passport number"
                    />

                    {/* <div>
                                        {
                                            values.nationality.toLocaleLowerCase() !== "indian" ? <p className="text-red-600">Passport number is compulsory</p> : ''
                                        }
                                    </div> */}
                    <div>
                      {errors.passportNumber && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.passportNumber}
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>

                <fieldset className="border rounded border-solid border-gray-300 pl-3 border-[#EFEFEF] ">
                  <legend className="text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown: transition-all peer-focus:text-gray-600 peer-focus:text-sm ">
                    {" "}
                    Procedure Planned From and To Date
                  </legend>
                  <div className="flex flex-col">
                    <div className="flex">
                      <DatePicker
                        // disabled={isEdit === i ? false : true}
                        dropdownMode="select"
                        showMonthDropdown
                        showYearDropdown
                        dateFormat={"DD/MM/yyyy"}
                        value={fromDateValue}
                        minDate={new Date()}

                        autocomplete="off"
                        placeholderText="From Date"
                        className="peer text-xs md:text-xs bg-transparent w-full  focus:outline-none focus:borer-rose-600 "
                        onChange={(date) => {
                          setfromDate(moment(date).format("yyyy-MM-DD hh:mm:ss"));
                          setfromDateValue(moment(date).format("DD-MM-yyyy"));
                          settoDateValue("");
                        }}
                      />
                      <DatePicker
                        // disabled={isEdit === i ? false : true}
                        dropdownMode="select"
                        showMonthDropdown
                        showYearDropdown
                        dateFormat={"DD/MM/yyyy"}
                        value={toDateValue}
                        minDate={fromDate ? new Date(fromDate) : new Date()}
                        // maxDate={new Date()}
                        placeholderText="To Date"
                        autocomplete="off"
                        className="peer text-xs md:text-xs w-full focus:outline-none focus:borer-rose-600"
                        onChange={(date) => {
                          settoDate(moment(date).format("yyyy-MM-DD hh:mm:ss"));
                          settoDateValue(moment(date).format("DD-MM-yyyy"));
                        }}
                      />
                    </div>

                    <label
                      for="address2"
                      className="w-full hidden md:block absolute left-0 -top-3.5 text-gray-500 text-xs md:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Procedure Planned From and To Date{" "}
                    </label>
                    <div>
                      {ProcedureDateError && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          Please select procedure planned date
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>

                <fieldset className="border rounded border-solid border-gray-300 pl-3 border-[#EFEFEF] ">
                  <legend className="text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown: transition-all peer-focus:text-gray-600 peer-focus:text-sm ">
                    {" "}
                    Service Type{" "}
                  </legend>
                  <div className="relative mb-2 w-42">
                    <div className="flex">
                      <select
                        autocomplete="off"
                        id="serviceType"
                        name="serviceType"
                        onChange={handleChange}
                        type="text"
                        className="text-xs md:text-xs peer bg-transparent w-full md:w-42  text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="serviceType"
                      >
                        <option selected value="">
                          -- Select Service Type --
                        </option>
                        <option value={"1"}> Surgery</option>
                        <option value={"2"}> in-patient admission</option>
                        <option value={"3"}> Procedures</option>
                        <option value={"4"}>
                          {" "}
                          Maternity Package (Labour/Delivery/Recovery)
                        </option>
                        <option value={"5"}> Transplant</option>
                        <option value={"6"}>
                          {" "}
                          Cosmetic / Plastic Procedures
                        </option>
                        <option value={"7"}> Cosmetic / Plastic Surgery</option>
                      </select>
                    </div>

                    <div>
                      {errors.serviceType && (
                        <div

                          style={{ color: "red", fontSize: 12 }}>
                          {errors.serviceType}
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>

                <fieldset className="border rounded border-solid border-gray-300 pl-3 border-[#EFEFEF] ">
                  <legend className="text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown: transition-all peer-focus:text-gray-600 peer-focus:text-sm ">
                    {" "}
                    Insurance Name
                  </legend>

                  <div className="relative mb-2 w-42">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="insuranceName"
                        name="insuranceName"
                        onChange={handleChange}
                        value={values.insuranceName}
                        type="text"
                        className="peer text-xs md:text-xs bg-transparent w-full md:w-42 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Insurance Name"
                      />
                    </div>

                    <div>
                      {errors.insuranceName && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.insuranceName}
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>
                <fieldset className="border rounded border-solid border-gray-300 pl-3 border-[#EFEFEF] ">
                  <legend className="text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown: transition-all peer-focus:text-gray-600 peer-focus:text-sm ">
                    {" "}
                    Insurance ID
                  </legend>
                  <div className="relative mb-2 w-42">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="insuranceId"
                        name="insuranceId"
                        onChange={handleChange}
                        value={values.insuranceId}
                        type="text"
                        className="peer bg-transparent text-xs md:text-xs w-full md:w-42 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Insurance Id"
                      />
                    </div>
                  </div>
                </fieldset>
                <fieldset className="border rounded border-solid border-gray-300 pl-3 border-[#EFEFEF] ">
                  <legend className="text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown: transition-all peer-focus:text-gray-600 peer-focus:text-sm ">
                    Insurance Amount{" "}
                  </legend>
                  <div className="relative mb-2 w-42">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="insuranceAmount"
                        name="insuranceAmount"
                        value={values.insuranceAmount}
                        onChange={handleChange}
                        type="number"
                        className="peer text-xs md:text-xs bg-transparent md:text-sm  w-full md:w-42 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Enter InsuranceAmount"
                      />
                    </div>
                  </div>
                </fieldset>

                {/* <div className="relative mb-2 ">
                                    <div className="flex">
                                        <input autocomplete="off" id="procedureName" name="procedureName" onChange={handleChange} type="text" className="peer bg-transparent h-10 w-32 md:w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter procedureName" />
                                    </div>
                                    <label for="procedureName" className="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Procedure Name</label>
                                    <div>
                                        {errors.procedureName && <div style={{ color: 'red', fontSize: 12 }}>{errors.procedureName}</div>}
                                    </div>
                                </div> */}






                <fieldset className="border rounded border-solid border-gray-300 pl-3 border-[#EFEFEF] ">
                  <legend className="text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown: transition-all peer-focus:text-gray-600 peer-focus:text-sm ">
                    Procedure Name{" "}
                  </legend>

                  <div className="relative mb-2 ">
                    <div className="flex">
                      <select
                        autocomplete="off"
                        id="procedureId"
                        name="procedureId"
                        onChange={handleChange}
                        type="text"
                        className="peer text-xs md:text-xs bg-transparent w-full md:w-42  text-gray-900 focus:outline-none focus:borer-rose-600 items-center"
                        placeholder="procedureId"
                      >
                        <option selected value="">
                          -- Select Procedure Name --
                        </option>
                        {procedurelistData.map((key) => (
                          <option value={key.procedureId.toString()}>
                            {" "}
                            {key.procedureName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      {errors.procedureId && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.procedureId}
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>

                <fieldset className="border rounded border-solid border-gray-300 pl-3 ">
                  <legend className="text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown: transition-all peer-focus:text-gray-600 peer-focus:text-sm ">
                    Any other medical conditions?
                  </legend>
                  <div className="relative mb-2 ">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="notes1"
                        name="notes1"
                        onChange={handleChange}
                        type="text"
                        className="peer bg-transparent text-xs md:text-xs w-full md:w-48 lg:mt-5 xl:mt-0 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Write a note "
                      />
                      {/* <textarea id="notes1" name="notes1" rows="4" cols="50" className=" w-full focus:outline-none focus:borer-rose-600 mt-2 border-4" placeholder="Write notes" onChange={handleChange} > */}

                      {/* </textarea> */}
                    </div>
                  </div>
                </fieldset>
                {/* <fieldset className="border rounded border-solid border-gray-300 pl-3 border-[#EFEFEF] ">
  <legend className="text-gray-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown: transition-all peer-focus:text-gray-600 peer-focus:text-sm ">
    {" "}
    Hospital{" "}
  </legend>
  <div class="relative mb-2 w-42">
  <div className="flex">

      <input
        autocomplete="off"
        id="dob"
        name="dob"
        readOnly={true}
        onChange={handleChange}
        type="text"
        class="peer bg-transparent text-xs md:text-sm  w-full md:w-42 text-gray-900 focus:outline-none focus:borer-rose-600"

        value={values.hospitalName}
      />
      </div>

  </div>
</fieldset> */}
              </div>


              <div className="flex lg:justify-end mt-8">
                <button
                  disabled={load}
                  type="submit"
                  className={
                    load
                      ? "disabled:opacity-70 bg-green-400 text-white py-3.5 px-6 font-medium rounded-md"
                      : " bg-green-400  text-sm text-white py-2 px-6 font-medium rounded-md"
                  }
                >
                  Submit{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="mb-20"></div>
      </div>
    </>
  );
}

export default Hospitalenquiryform;
