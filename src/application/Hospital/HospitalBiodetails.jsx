import React, { useState } from "react";
import bethanyhospital from "../../Assets/Images/no-image.png";
import img1 from "../../Assets/Images/1.svg";
import img2 from "../../Assets/Images/2.svg";
import img3 from "../../Assets/Images/3.svg";
import img4 from "../../Assets/Images/4.svg";
import user from "../../Assets/Images/userh.svg";
import bed from "../../Assets/Images/bedh.svg";

//import SectionContainer from "'../../components/SectionContainer";
import { useHistory, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { APP_ROUTES } from "../../application/Router/constants/AppRoutes";
import Information from "../Doctors/Information";

// import { getparticularhospital } from "../../Redux/Actions/HospitalAction";
// import {
//   clearDoctorData,
//   getDoctorslist,
// } from "../../Redux/Actions/Doctoraction";

//import Dash from "../Dash";

// import Doctorservice from "../../Redux/services/Doctorservice";
import hospitalservice from "../../Redux/services/hospitalservice";

// import { useDispatch, useSelector } from "react-redux";
// import { useHistory, useLocation } from "react-router-dom";
// import { APP_ROUTES } from "../../application/Router/constants/AppRoutes";

import {
  getprocedurelist,
  postenquiryhospital,
} from "../../Redux/Actions/hospitalpageActions";

import moment from "moment";
import { useFormik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { getallactivePatientdetails } from "../../Redux/Actions/patientAction";
import { gethospitallist } from "../../Redux/Actions/hospitalpageActions";
import { MultiSelect } from "primereact/multiselect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Dashboardservice from "../../Redux/services/Dashboardservice";

import { SHA512 } from "crypto-js";

import http from "../../Redux/services/http-common";

import PatientService from "../../Redux/services/patientService";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const validationSchema = Yup.object({
  //   name: Yup.string().min(2, "Too Short!").required("Patient name is required"),
  dob: Yup.string().required("DOB is required"),
  emailId: Yup.string().email("Invalid email").required("Email is Required"),
  contactNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "phone number should be exact 10 digit!")
    .required("Phone number is required"),
  address1: Yup.string(),
  address2: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  country: Yup.string().required("Country is required"),
  nationality: Yup.string().required("Nationality is Required"),
  // insuranceName: Yup.string().required("Insurancename is Required"),
  passportNumber: Yup.string(),
  // passportNumber: Yup.string().when('nationality', (nationality) => {
  //     if (nationality.toLowerCase() !== "indian") {
  //         return Yup.string().required('Passport number is required')
  //     }
  // }),
  procedurePlannedDate: Yup.string().required(
    "ProcedurePlannedDate is Required"
  ),
  notes1: Yup.string(),
  insuranceId: Yup.string(),
  insuranceAmount: Yup.string(),
  procedureId: Yup.string().required("Procedurename is Required"),
  serviceType: Yup.string().required("Service Type is Required"),
});

function HospitalBiodetails(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [hospitalsList, setHospitalsList] = useState([]);

  const patientData = useSelector((state) => state.authReducer.patientData);
  const hospitallist = useSelector((state) => state.hospitallist);

  let { hospitallistData, isLoading } = hospitallist ? hospitallist : [];
  const [dob, setDOB] = useState("");
  const [stateList, setstateList] = useState([]);
  const location = useLocation();
  const { state } = location;

  const [showenquirypopup, setshowenquirypopup] = useState(false);
  const activePatient = JSON.parse(localStorage.getItem("activePatient"));
  const { coords } = useSelector((state) => state.authReducer);

  const procedurelist = useSelector((state) => state.procedurelist);
  const [selectedCities1, setSelectedCities1] = useState([]);
  const [HospitalDetailsDf, setHospitalDetails] = useState({});
  const { procedurelistData } = procedurelist;

  const loginObj = JSON.parse(localStorage.getItem("loginObj"));

  const registeredpatientlist = useSelector(
    (state) => state.allregisteredpatientlist
  );

  let { allregisteredpatientdetailsData } = registeredpatientlist;

  const [payAmount, setPayAmount] = useState(false);
  const [amt, setAmt] = useState("");
  const [err, setErr] = useState("");
  const [tId, settId] = useState(moment.now().toString());

  const userData = useSelector((state) => state.authReducer.userData);
  const [loading, setIsLoading] = useState(false);
  const hospitalid = localStorage.getItem("hospitalid");
  console.log("hospitalid", hospitalid);
  const locationid = localStorage.getItem("locationid");
  console.log("locationid", locationid);
  var totalAmount = 0;
  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };

  useEffect(() => {
    if (registeredpatientlist) {
      document.getElementById("patientId").value = state.patientId;
      document.getElementById("code").value = state.patientId;
    }
  }, [registeredpatientlist]);

  useEffect(() => {
    if (procedurelistData) {
      document.getElementById("procedureId").value = state.procedureId;
    }
  }, [procedurelistData]);

  useEffect(() => {
    if (hospitalsList) {
      setSelectedCities1([state.locationId]);
    }
  }, [hospitalsList]);



  

 
  const changePatient = (event) => {
    event.preventDefault();
    const selPatient = allregisteredpatientdetailsData.filter(
      (x) => x.code == event.target.value
    );
    values.name = selPatient[0].name;
    values.code = selPatient[0].code;
    values.contactNumber = selPatient[0].mobile;
    values.dob = selPatient[0].dob
      ? moment(new Date(selPatient[0].dob), "yyyy-MM-DD").format("yyyy-MM-DD")
      : "";
    values.emailId = selPatient[0].email;

    values.address1 = selPatient[0].address1;
    values.address2 = selPatient[0].address2;
    values.state = selPatient[0].state;
    values.city = selPatient[0].city;
    values.insuranceAmount = selPatient[0].insuranceAmount;
    values.insuranceId = selPatient[0].insuranceId;
    values.insuranceName = selPatient[0].insuranceName;
    console.log(values);
    document.getElementById("name").value = selPatient[0].name;
    document.getElementById("code").value = selPatient[0].code;
    document.getElementById("dob").defaultValue = values.dob || "2014-02-09";
    document.getElementById("contactNumber").value = selPatient[0].mobile;
    document.getElementById("emailId").value = selPatient[0].email;

    document.getElementById("address1").value = selPatient[0].address1;
    document.getElementById("address2").value = selPatient[0].address2;
    document.getElementById("state").value = selPatient[0].state;
    document.getElementById("city").value = selPatient[0].city;

    document.getElementById("insuranceAmount").value =
      selPatient[0].insuranceAmount;
    document.getElementById("insuranceId").value = selPatient[0].insuranceId;
    document.getElementById("insuranceName").value =
      selPatient[0].insuranceName;

    console.log(selPatient);

    console.log(values);
  };

  useEffect(() => {
    console.log("state", state);
    if (state === undefined || state === "" || state === null) {
    } else {
      //alert(JSON.stringify(state))
      setHospitalDetails(state);
      // const lcPatient = JSON.parse(localStorage.getItem("activePatient"));
      // setTimeout(()=>{
      //   document.getElementById('patientId').value = state.patientId;
      // },5000)
      console.log("lol", state);
      setSelectedCities1([state.locationId]);

      values.name = state.name;
      values.code = state.code;
      values.contactNumber = state.contactNumber
        ? state.contactNumber
        : state.mobile;
      document.getElementById("dob").defaultValue = state.dob
        ? moment(new Date(state.dob), "yyyy-MM-DD").format("yyyy-MM-DD")
        : "";
      values.emailId = state.emailId;
      values.passportNumber = state.passportNumber;
      //alert(moment(new Date(state.procedurePlannedDate), "yyyy-MM-DD hh:mm A").format("yyyy-MM-DD hh:mm A"))

      values.address1 = state.address1;
      values.address2 = state.address2;
      values.state = state.state;
      values.city = state.city;
      values.insuranceAmount = state.insuranceAmount;
      values.insuranceId = state.insuranceId;
      values.insuranceName = state.insuranceName;
      //values.serviceType = state.serviceType
      document.getElementById("serviceType").value = state.serviceType;
      document.getElementById("procedureId").value = state.procedureId;
      values.serviceType = state.serviceType;
      values.procedureId = state.procedureId;
      values.procedurePlannedDate = state.procedurePlannedDate
        ? moment(
            new Date(state.procedurePlannedDate),
            "yyyy-MM-DDThh:mm"
          ).format("yyyy-MM-DDThh:mm")
        : "";

      values.dob = state.dob;

      values.patientId = state.patientId;
      values.nationality = state.nationality;
      values.notes1 = state.notes1;
    }
    dispatch(getprocedurelist());
    console.log(procedurelistData);

    dispatch(gethospitallist(coords, "", 1, 20))
      .then((result) => {
        setstateList(result);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const hospitalid = localStorage.getItem("hospitalid");
    console.log("hospitalid", hospitalid);
    const locationid = localStorage.getItem("locationid");
    console.log("locationid", locationid);
    dispatch(getallactivePatientdetails(hospitalid, locationid))
      .then((result) => {
        console.log(result);
        allregisteredpatientdetailsData = result;
      })
      .catch((error) => {});
    console.log(allregisteredpatientdetailsData);

    const payload = {
      cheLocationId: localStorage.getItem("locationid"),
      type: "H",
      status: 1,
    };

    hospitalservice.getHopitalslist().then(
      (res) => {
        if (res.data) {
          for (let s = 0; s < res.data.length; s++) {
            res.data[s]["hospitalLocationNames"] =
              res.data[s].hospitalName + " (" + res.data[s].name + ")";
          }
          setHospitalsList(res.data);
          hospitallistData = res.data;
          console.log(JSON.stringify(hospitalsList));
        }
      },
      (err) => {
        console.log(err);
      }
    );

    /*dispatch(getAllhospitallist(payload))
      .then((result) => {
        console.log('Hospital List : ' + JSON.stringify(result));

        if(!result.message) {
          for (let s = 0; s < result.length; s++) {
            result[s]["hospitalLocationNames"] =
              result[s].hospitalName + " (" + result[s].name + ")";
          }
        }

        hospitallistData = result;
      })
      .catch((error) => {});*/
  }, [dispatch]);

  const patientCode = useSelector((state) => state.authReducer.patientCode);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      name: "",
      dob: "",
      emailId: "",
      contactNumber: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
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
      patientId: "",
      business: 0,
      preferredHospitalAndClinics: state?.hospitalCode,
      serviceType: "",
      hospitalId: state?.hospitalCode,
      hospitalName: state?.hospitalName,
      locationId: state?.code,
      status: 1,
      cheid: patientCode, //localStorage.getItem("hospitalid"),
      chelocationId: patientCode, //localStorage.getItem("locationid"),
      createdBy: patientCode, //loginObj.user.code,
      modifiedBy: patientCode, //loginObj.user.code,
    },

    validateOnChange: false,
    validationSchema,
    async onSubmit(values) {
      // setLoader(true);
      let arr = [];
      // setMsg('');
      // values.dob = dob;
      values.dob = values.dob
        ? moment(new Date(values.dob), "yyyy-MM-DD").format("MM/DD/yyyy")
        : moment(new Date(), "yyyy-MM-DD").format("MM/DD/yyyy");
      values.procedurePlannedDate = moment(values.procedurePlannedDate).format(
        "yyyy-MM-DD hh:mm:ss"
      );

      for (let s = 0; s < selectedCities1.length; s++) {
        const hospital = hospitalsList.filter(
          (x) => x.code == selectedCities1[s]
        );
        // console.log(hospital);
        // console.log(selectedCities1);
        const procedure = procedurelistData.filter(
          (x) => x.procedureId == values.procedureId
        );
        values.name = document.getElementById("name").value;
        values.patientId = document.getElementById("code").value;
        values.hospitalId = hospital[0].hospitalCode;
        values.hospitalName = hospital[0].hospitalName;
        values.locationId = hospital[0].code;
        values.locationName = hospital[0].name;
        values.preferredHospitalAndClinics = hospital[0].hospitalCode;
        values.procedureId = procedure[0].procedureId;
        values.procedureName = procedure[0].procedureName;
        const valueArr = JSON.parse(JSON.stringify(values));
        arr.push(valueArr);
      }

      //return;

      console.log(arr);
      dispatch(postenquiryhospital(arr))
        .then((result) => {
          console.log(result);
          toast("Service Enquiry Form Added Successfully");
          setshowenquirypopup(true);
        })
        .catch((error) => {
          // setLoader(false)
          // redirectTo();
        });

      // setTimeout(() => {
      //     history.goBack();
      // }, 2000)
    },
  });

  const [showImage, setImage] = useState("");
  const hospitaldetails = useSelector((state) => state.hospitaldetails);
  const { particularhospitalData } = hospitaldetails;
  const [doctorCount, setDoctorsCount] = useState();

  const doctorlist = useSelector((state) => state.doctorslist);
  const { doctorData } = doctorlist;
  

  useEffect(() => {
    console.log("state", state);
    console.log("doctdata", doctorData);
  }, [doctorData.length]);

  

  
  const PayNow = (e) => {
    e.preventDefault();
    setErr("");
    if (amt.trim() === "") {
      setErr("Please Enter The Amount");
    } else {
      var number = /^\d+$/;
      if (number.test(amt)) {
        totalAmount = amt;
        saveWithoutPayu(amt);
        return;
        var hashString =
          "7R4RJX1X" +
          "|" +
          tId +
          "|" +
          totalAmount +
          "|" +
          "Patient Order" +
          "|" +
          userData.firstName +
          "|" +
          userData.email +
          "|" +
          "||||||||||" +
          "jBgXAUMvjJ";
        var hashed = SHA512(hashString, "HEX").toString();
        var pd = {
          key: "7R4RJX1X",
          txnid: tId,
          amount: totalAmount,
          firstname: userData.firstName,
          email: userData.email,
          phone: userData.mobile,
          productinfo: "Patient Order",
          surl: "/",
          furl: "/",
          hash: hashed,
        };
        loadScript(pd);
      } else {
        setErr("Please Enter The Valid Amount");
      }
    }
  };

  function loadScript(pd) {
    //redirectToPayU(pd);
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src =
        "https://sboxcheckout-static.citruspay.com/bolt/run/bolt.min.js";
      script.id = "bolt";
      script.onload = () => {
        redirectToPayU(pd);
      };
      //redirectToPayU(pd);
      document.body.appendChild(script);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const saveWithoutPayu = (amt) => {
    HospitalDetailsDf.payAmount = +HospitalDetailsDf.payAmount + +amt;
    PatientService.patientServiceEnquiryFormUpdate([HospitalDetailsDf]).then(
      (res) => {
        setAmt("");
        setPayAmount(false);
        setIsLoading(false);
        history.replace({ state: HospitalDetailsDf });
      },
      (err) => {
        setErr("Something went wrong");
        setIsLoading(false);
      }
    );
  };

  const redirectToPayU = (pd) => {
    setIsLoading(true);
    window.bolt.launch(pd, {
      responseHandler: function (result) {
        const { response } = result;
        let obj = {
          amount: response.amount ? response.amount : 0,
          createdBy: userData.code,
          email: HospitalDetailsDf.emailId,
          firstname: HospitalDetailsDf.name,
          hash: response.hash,
          modifiedBy: userData.code,
          patientId: HospitalDetailsDf.patientId,
          paymentMode: response.mode,
          payuMoneyId: response.mihpayid,
          phone: HospitalDetailsDf.contactNumber,
          productinfo: response.productinfo,
          remarks: "",
          status: 1,
          txnDate: moment().format("yyyy-MM-DD HH:mm:ss"),
          txnid: response.txnid,
          //txnid: Math.random().toString().slice(2,11),
          hospitalId: hospitalid,
          locationId: locationid,
        };
        console.log(JSON.stringify(obj));
        http
          .post("PayUMoneyTransaction/", obj)
          .then((result) => {
            // redirectAfterTxn(response.txnid);
            //redirectAfterTxn(obj.txnid);
            HospitalDetailsDf.payAmount =
              +HospitalDetailsDf.payAmount + +response.amount;
            PatientService.patientServiceEnquiryFormUpdate([
              HospitalDetailsDf,
            ]).then(
              (res) => {
                setAmt("");
                setPayAmount(false);
                setIsLoading(false);
                history.replace({ state: HospitalDetailsDf });
              },
              (err) => {
                setErr("Something went wrong");
                setIsLoading(false);
              }
            );
          })
          .catch((err) => {
            console.log("err", err);
            setIsLoading(false);
          });
      },
      catchException: function (response) {
        console.log("error", response);
        setIsLoading(false);
      },
    });
  };

  const handleChangePay = (e) => {
    setErr("");
    setAmt(e.target.value);
  };

  return (
    <>
    

      {particularhospitalData.slice(0, 1).map((hosp, i) => (
        <div className="mt-4 hidden">
          <div class="flex ">
        

            <div className="lg:w-auto w-auto pl-4 pt-5 pr-4 flex sm:grid-cols-1 ">
              <div className="flex ">
                <div className="justify-between ">
                  <img
                    onClick={() => {
                      setImage(
                        hosp.photoName1 ? process.env.REACT_APP_IMG_BASEURL + hosp.photoName1 : img1
                      );
                    }}
                    src={
                      hosp.photoName1
                        ? `${
                            process.env.REACT_APP_IMG_BASEURL + hosp.photoName1
                          }`
                        : img1
                    }
                    alt="img1"
                    class="  w-16"
                  />
                  <img
                    onClick={() => {
                      setImage(
                        hosp.photoName2 ? process.env.REACT_APP_IMG_BASEURL + hosp.photoName2 : img2
                      );
                    }}
                    src={
                      hosp.photoName2
                        ? `${
                            process.env.REACT_APP_IMG_BASEURL + hosp.photoName2
                          }`
                        : img2
                    }
                    alt="img1"
                    class="pt-3 w-16"
                  />
                  <img
                    onClick={() => {
                      setImage(
                        hosp.photoName3 ? process.env.REACT_APP_IMG_BASEURL + hosp.photoName3 : img3
                      );
                    }}
                    src={
                      hosp.photoName3
                        ? `${
                            process.env.REACT_APP_IMG_BASEURL + hosp.photoName3
                          }`
                        : img3
                    }
                    alt="img1"
                    class="pt-3 w-16"
                  />
                  <img
                    onClick={() => {
                      setImage(
                        hosp.hospitalPhoto ? process.env.REACT_APP_IMG_BASEURL + hosp.hospitalPhoto : img4
                      );
                    }}
                    src={
                      hosp.hospitalPhoto
                        ? `${
                            process.env.REACT_APP_IMG_BASEURL +
                            hosp.hospitalPhoto
                          }`
                        : img4
                    }
                    alt="img1"
                    class="pt-3 w-16"
                  />
                </div>
                {/* <div className="h-72" > */}
                <img
                  src={
                    showImage
                      ? showImage
                      : hosp.hospitalPhoto
                      ? `${
                          process.env.REACT_APP_IMG_BASEURL + hosp.hospitalPhoto
                        }`
                      : bethanyhospital
                  }
                  alt="img1"
                  className="h-auto w-52 pl-5"
                />
                {/* </div> */}
              </div>
            </div>

            <div class="lg:w-2/3 pt-5 ml-6">
              <div class="flex justify-between">
                <p class="text-2xl font-medium">{hosp.hospitalName}</p>
                <div class="flex pr-5">
                  {/* <img onClick={(e) => redirectTo(e, APP_ROUTES.HOSPITAL_PAYMENT)} src={locations} alt="location" class="pr-5" />
                                    <img src={share} alt="share" /> */}
                </div>
              </div>
              <p class="text-xs text-brand-secondary pt-2">Location</p>
              <p class="text-sm text-gray-400 font-normal">{hosp.address1}</p>

              {/* <p class="text-xs text-brand-secondary pt-3">Hours</p>
                            <p class="text-sm text-gray-400 font-normal"> </p> */}

              <p class="text-xs text-brand-secondary pt-3">Phone</p>
              <p class="text-sm text-gray-400 font-normal">
                {hosp.contactNumber}
              </p>

              <div class="flex w-60 pt-8 justify-between">
                <div class="w-16 h-12 rounded bg-gray-100 p-2">
                  <p class="text-xs text-gray-600">Doctors</p>
                  <div class="flex">
                    <img src={user} alt="user" class="w-4 pt-1" />
                    <p class="text-xs font-medium text-brand-secondary pt-1 pl-1">
                      {doctorCount}
                    </p>
                  </div>
                </div>

                <div class="w-16 h-12 rounded bg-gray-100 p-2">
                  <p class="text-xs text-gray-600 pl-2">Beds</p>
                  <div class="flex">
                    <img src={bed} alt="beds" class="w-4 pt-1" />
                    <p class="text-xs font-medium text-brand-secondary pt-1 pl-1">
                      {hosp.noOfBed}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="flex ">
                    <button
                      onClick={(e) => {
                        if (!userData.code) {
                          redirectTo(e, {
                            pathname: APP_ROUTES.LOGIN,
                            state: {
                              background: location,
                              login: true,
                            },
                          });
                        } else {
                          history.push({
                            pathname: APP_ROUTES.HOSPITALENQUIRYFORM,
                            state: hosp,
                          });
                        }
                      }}
                      className="bg-brand-secondary   text-sm text-white font-normal p-3 rounded-xl mr-2"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="border-b-2 w-1/3 pr-5 ml-12  ">
            <nav class="flex flex-col sm:flex-row justify-between">
              <button class=" font-medium font-normal  py-3 px-8 block  focus:outline-none text-brand-secondary border-brand-primary border-b-2 font-medium border-blue-500">
                About
              </button>
            
            </nav>
          </div>
          <div class="w-full pt-5 px-16">
            <p class=" text-sm ">{hosp.description}</p>
          </div>

          <div className="ml-10 mt-6">
            {/* <SectionContainer title={`Facilities at ${hosp.hospitalName}`} /> */}

            <Information hosp={hosp}></Information>
          </div>
        </div>
      ))}
      <div>
        <div className="">
          <div className="mx-4 md:mx-10">
            <form onSubmit={handleSubmit}>
              <div className="rounded-lg  bg-white-600 w-full h-112 p-5 mt-3 antialiased justify-between border border-gray-200  lg:pb-4 mb-10">
                <p className="text-medium font-medium text-2xl  ">
                  Hospital Enquiry Form
                </p>
                <p className="text-black-900 font-medium text-lg mt-4">
                  Personal Details
                </p>
                <input type="hidden" id="code" />
                {/* <input type="hidden" id="code" /> */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-6 ">
                  <div className="relative mb-2 w-11/12">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        type="hidden"
                        className="peer bg-transparent h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Name"
                      />

                      <select
                        autocomplete="off"
                        id="patientId"
                        name="patientId"
                        onChange={(handleChange, changePatient)}
                        type="text"
                        // value={state.name}
                        className="peer bg-transparent h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="patient"
                      >
                        <option selected value="">
                          -- Select Patient --
                        </option>
                        {allregisteredpatientdetailsData
                          .sort((a, b) => {
                            return (
                              moment(b.createdDate, "yyyy-MM-DD HH:mm:ss") -
                              moment(a.createdDate, "yyyy-MM-DD HH:mm:ss")
                            );
                          })
                          .map((key) => (
                            <option value={key.patientId}> {key.name}</option>
                          ))}
                      </select>
                    </div>
                    <label
                      for="address2"
                      className="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Name of Patient{" "}
                    </label>
                    <div>
                      {errors.name && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div class="relative mb-2 w-11/12">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="dob"
                        name="dob"
                        readOnly={true}
                        onChange={handleChange}
                        type="date"
                        class="peer bg-transparent h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="DD-MM-YYYY"
                      />
                    </div>
                    <label
                      for="address2"
                      class="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      DOB{" "}
                    </label>
                    <div>
                      {errors.dob && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.dob}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative mb-2 w-11/12">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="emailId"
                        name="emailId"
                        onChange={handleChange}
                        value={values.emailId}
                        type="email"
                        readOnly={true}
                        className="peer bg-transparent  h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Emailid"
                      />
                    </div>
                    <label
                      for="address2"
                      className="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email ID{" "}
                    </label>
                    <div>
                      {errors.emailId && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.emailId}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative mb-2 w-11/12">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="contactNumber"
                        name="contactNumber"
                        value={values.contactNumber}
                        onChange={handleChange}
                        readOnly={true}
                        type="number"
                        className="peer h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Phone Number"
                      />
                    </div>
                    <label
                      for="address2"
                      className="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Phone Number{" "}
                    </label>
                    <div>
                      {errors.contactNumber && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.contactNumber}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative mb-2 w-11/12">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="address1"
                        name="address1"
                        value={values.address1}
                        onChange={handleChange}
                        type="text"
                        className="peer bg-transparent h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="address 1"
                      />
                    </div>
                    <label
                      for="address2"
                      className="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Address 1{" "}
                    </label>
                  </div>

                  <div className="relative mb-2 w-11/12">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="address2"
                        name="address2"
                        value={values.address2}
                        type="text"
                        onChange={handleChange}
                        className="peer bg-transparent h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="address 2"
                      />
                    </div>
                    <label
                      for="address2"
                      className="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Address 2{" "}
                    </label>
                  </div>

                  <div className="relative mb-2 w-11/12">
                    <div className="flex">
                      <select
                        autocomplete="off"
                        id="state"
                        name="state"
                        type="text"
                        value={values.state}
                        onChange={handleChange}
                        className="peer bg-transparent h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="state"
                      >
                        <option selected value="">
                          -- Select State --
                        </option>
                        {stateList.map((keys) => (
                          <option value={keys.code}> {keys.description}</option>
                        ))}
                      </select>
                    </div>
                    <label
                      for="address2"
                      className="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      State{" "}
                    </label>
                  </div>

                  <div className="relative mb-2 w-11/12">
                    <div className="flex">
           

                      <input
                        autocomplete="off"
                        id="city"
                        name="city"
                        onChange={handleChange}
                        value={values.city}
                        type="text"
                        className="peer bg-transparent h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="city"
                      />
                    </div>
                    <label
                      for="address2"
                      className="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      City{" "}
                    </label>
                  </div>

                  <div className="relative mb-2 w-11/12">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="country"
                        name="country"
                        value={values.country}
                        readOnly={true}
                        type="text"
                        onChange={handleChange}
                        className="peer bg-transparent h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="country"
                      />
                    </div>
                    <label
                      for="country"
                      className="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Country{" "}
                    </label>
                    <div>
                      {errors.country && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.country}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative mb-2 w-11/12">
                    <div className="flex">
                      {/* <input
                      autocomplete="off"
                      id="nationality"
                      name="nationality"
                      value={values.nationality}
                      readOnly={true}
                      type="text"
                      onChange={handleChange}
                      className="peer bg-transparent h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Nationality"
                    /> */}

                      <select
                        autocomplete="off"
                        id="nationality"
                        name="nationality"
                        onChange={handleChange}
                        value={values.nationality}
                        type="text"
                        className="peer bg-transparent h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      >
                        <option selected value="">
                          -- Select Nationality --
                        </option>
                        <option value="Indian"> Indian</option>
                        <option value="Others"> Others</option>
                      </select>
                    </div>
                    <label
                      for="nationality"
                      className="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Nationality{" "}
                    </label>
                    <div>
                      {errors.nationality && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.nationality}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative mb-2 w-11/12">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="passportNumber"
                        name="passportNumber"
                        onChange={handleChange}
                        value={values.passportNumber}
                        type="text"
                        disabled={values.nationality == "Indian"}
                        className="peer bg-transparent h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Enter passport number"
                      />
                    </div>
                    <label
                      for="address2"
                      className="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Passport Number{" "}
                    </label>
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

                  <div className="relative mb-2 w-11/12">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        value={values.procedurePlannedDate}
                        defalutValue={values.procedurePlannedDate}
                        id="procedurePlannedDate"
                        name="procedurePlannedDate"
                        onChange={handleChange}
                        type="datetime-local"
                        className="peer bg-transparent h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="DD/MM/YYYY"
                      />
                    </div>
                    <label
                      for="address2"
                      className="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Procedure Planned Date{" "}
                    </label>
                    <div>
                      {errors.procedurePlannedDate && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.procedurePlannedDate}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative mb-2 w-11/12">
                    <div className="flex">
                      <select
                        autocomplete="off"
                        id="serviceType"
                        name="serviceType"
                        onChange={handleChange}
                        type="text"
                        className="peer bg-transparent h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
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
                    <label
                      for="address2"
                      className="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Service Type{" "}
                    </label>
                    <div>
                      {errors.serviceType && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.serviceType}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative mb-2 w-11/12">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="insuranceName"
                        name="insuranceName"
                        onChange={handleChange}
                        value={values.insuranceName}
                        type="text"
                        className="peer bg-transparent h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Insurance Name"
                      />
                    </div>
                    <label
                      for="insuranceName"
                      className="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Insurance Name
                    </label>
                    <div>
                      {errors.insuranceName && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.insuranceName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative mb-2 w-11/12">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="insuranceId"
                        name="insuranceId"
                        onChange={handleChange}
                        value={values.insuranceId}
                        type="text"
                        className="peer bg-transparent h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Insurance Id"
                      />
                    </div>
                    <label
                      for="insuranceId"
                      className="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Insurance ID
                    </label>
                  </div>
                  <div className="relative mb-2 w-11/12">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="insuranceAmount"
                        name="insuranceAmount"
                        value={values.insuranceAmount}
                        onChange={handleChange}
                        type="number"
                        className="peer bg-transparent h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Enter InsuranceAmount"
                      />
                    </div>
                    <label
                      for="insuranceAmount"
                      className="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Insurance Amount{" "}
                    </label>
                  </div>

                 

                  <div className="relative mb-2 w-11/12">
                    <div className="flex">
                      <select
                        autocomplete="off"
                        id="procedureId"
                        name="procedureId"
                        onChange={handleChange}
                        type="text"
                        className="peer bg-transparent h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
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
                    <label
                      for="address2"
                      className="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Procedure Name{" "}
                    </label>
                    <div>
                      {errors.procedureId && (
                        <div style={{ color: "red", fontSize: 12 }}>
                          {errors.procedureId}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative mb-2 w-11/12">
                    <div className="flex">
                      <input
                        autocomplete="off"
                        id="notes1"
                        name="notes1"
                        value={values.notes1}
                        onChange={handleChange}
                        type="text"
                        className="peer bg-transparent h-10 w-72 lg:mt-5 xl:mt-0 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Write a note "
                      />
                      {/* <textarea id="notes1" name="notes1" rows="4" cols="50" className=" w-full focus:outline-none focus:borer-rose-600 mt-2 border-4" placeholder="Write notes" onChange={handleChange} > */}

                      {/* </textarea> */}
                    </div>
                    <label
                      for="notes1"
                      className="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Do you have any other medical conditions?
                    </label>
                  </div>

                  <div className="relative mb-2 w-11/12">
                    <div className="flex">
                      <MultiSelect
                        value={selectedCities1}
                        options={hospitalsList ? hospitalsList : []}
                        filter
                        onChange={(e) => setSelectedCities1(e.value)}
                        optionLabel="hospitalLocationNames"
                        id="facilityLocationId"
                        name="facilityHospitalName"
                        optionValue="code"
                        placeholder="Select a Hospital"
                        className="w-11/12"
                      />
                    </div>
                    <label
                      for="notes1"
                      className="w-full absolute left-0 -top-3.5 text-gray-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Hospitals
                    </label>
                  </div>
                </div>

                {!state?.patientId ? (
                  <div className="flex lg:justify-end mt-8">
                    <button
                      type="submit"
                      className="bg-brand-secondary  text-white py-3.5 px-6 font-medium rounded-xl"
                    >
                      Submit{" "}
                    </button>
                  </div>
                ) : null}
                <hr className="mt-8 mb-4" />

                <div className="flex flex-col gap-8 lg:gap-0 lg:flex-row justify-between mt-6">
                  <div className="flex gap-4 1/2">
                    <div className="flex">
                      <label
                        for="password"
                        className="peer-focus:text-gray-600 peer-focus:text-sm text-gray-600 "
                      >
                        Admin Reply :
                      </label>
                    </div>
                    {/* <label
                      for="password"
                      className="h-8 w-44 border-solid border-2 border-gray-300 rounded-lg px-3"
                    >
                      {HospitalDetailsDf.notes}{" "}
                    </label> */}
                    <input
                      for="password"
                      className={
                        HospitalDetailsDf.notes
                          ? "h-16 w-96 border-solid border-2 border-gray-300 rounded-lg px-3"
                          : "bg-gray h-8 w-44 border-solid border-2 border-gray-300 rounded-lg px-3"
                      }
                      style={{ display: "inline-table" }}
                      value={HospitalDetailsDf.notes}
                    ></input>
                  </div>
                  <div className=" items-center gap-4 1/3">
                    <div className="flex gap-4">
                      <div className="flex">
                        <label
                          for="password"
                          className="peer-focus:text-gray-600 peer-focus:text-sm text-gray-600 "
                        >
                          Estimated Amount (INR) :
                        </label>
                      </div>
                      <label
                        for="password"
                        className={
                          HospitalDetailsDf.quotatedAmount
                            ? "h-8 w-44 border-solid border-2 border-gray-300 rounded-lg px-3"
                            : "bg-gray h-8 w-44 border-solid border-2 border-gray-300 rounded-lg px-3"
                        }
                      >
                        {HospitalDetailsDf.quotatedAmount}{" "}
                      </label>
                    </div>
                   
                  </div>

                  {payAmount ? (
                    <>
                      <div class="h-9">
                        {loading && (
                          <div
                            className="flex flex-wrap justify-center m-5 absolute  left-0 right-0 m-auto"
                            style={{
                              width: "100px",
                              height: "100px",
                            }}
                          >
                            <div className="loader-inner float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
                          </div>
                        )}
                        <div className="">
                          <input
                            autocomplete="off"
                            id="insuranceId"
                            name="insuranceId"
                            onChange={handleChangePay}
                            type="text"
                            className="peer bg-transparent h-10 w-52 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                            placeholder="Pay Amount"
                          />
                        </div>
                        {err ? (
                          <span className="text-red-900 ">{err}</span>
                        ) : null}
                        <br />
                        <div className="flex justify-end ">
                          <button
                            disabled={loading}
                            onClick={PayNow}
                            className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3 mr-2"
                          >
                            Pay Now
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}

                 
                </div>

                <div className="flex sm:flex-col md:gap-8 lg:gap-0 lg:flex-row justify-between  mt-6">
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex"></div>
                  </div>
                  <div className="flex gap-4 items-center  p-4">
          
                  </div>

                  <div className="flex items-center gap-4 mt-4"></div>
                </div>
              </div>
            </form>
          </div>
          <div className="mb-20"></div>
        </div>
      </div>
     
    </>
  );
}
export default HospitalBiodetails;
