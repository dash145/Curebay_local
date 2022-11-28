import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import consultation from "../Assets/Images/consultation.png";
import surgery_icon_2 from "../Assets/Images/surgery_icon_2.png";
import hospital_booking from "../Assets/Images/hospital-booking.png";
import surgery_icon_3 from "../Assets/Images/surgery_icon_3.png";
import emergency_services from "../Assets/Images/emergency-services.png";
import { ToastContainer, toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import { Dialog } from "primereact/dialog";

import image1 from "../Assets/footerImages/image1.jpg";
import image2 from "../Assets/footerImages/image2.jpg";
import image3 from "../Assets/footerImages/image3.jpg";
import image4 from "../Assets/footerImages/image4.jpg";
import image5 from "../Assets/footerImages/image5.jpg";
import image6 from "../Assets/footerImages/image6.jpg";
import image7 from "../Assets/footerImages/image7.jpg";
import image8 from "../Assets/footerImages/image8.jpg";
import image9 from "../Assets/footerImages/image9.jpg";
import image10 from "../Assets/footerImages/image10.jpg";
import curebayLogo from "../Assets/footerImages/newww.png";
import { Carousel } from "primereact/carousel";
import doc from "../Assets/footerImages/Blueoverlay.png";
import banne from "../Assets/footerImages/BannerImage.png";
import {
  patientContactus,
  getPatientDetails,
} from "../Redux/Actions/UserprofileActions";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";

const validationSchema = Yup.object({
  name: Yup.string().min(4, "Too Short!").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobileNo: Yup.number().min(6, "Too Short!").required("Phone number is required"),
  query: Yup.string().required("Enter your query"),
});

export const ContactWithUs = (props) => {
  const [color, setColor] = useState("red");
  const history = useHistory();
  const location = useLocation();

  const successinfo = useSelector((state) => state.contactinfo);
  const { issuccess, contactusData } = successinfo;
  const [openDialog, setDialog] = useState(false);
  const [msgResponse, setMessage] = useState(false);

  const [err, setErr] = useState("");

  const userData = useSelector((state) => state.authReducer.patientData);
  const patientinfo = useSelector((state) => state.patientinfo);
  const { patientinfoData } = patientinfo;

  const redirectTo = (location) => {
    // event.preventDefault();
    history.push(location);
  };


  const [enquiry, setEnquiry] = useState({
    content: "",
    createdBy: patientinfoData.code,
    createdDate: null,
    fromCode: userData.code,
    fromDate: null,
    modifiedBy: patientinfoData.code,
    modifiedDate: null,
    status: 1,
    subject: "string",
    toCode: contactusData.length > 0 ? contactusData[0].code : "",
    toDate: null,
  });

  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatientDetails(userData.code));
  }, []);


  const scrollToTop = () => {


    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

  }
  const products = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
  ];

  const itemTemplate = (products) => {
    return (
      <div className="flex w-auto justify-center md:justify-between md:flex">
        <div className="flex items-center" style={{ backgroundColor: "#ccc" }}>
          <img src={products} alt="#" />
        </div>
      </div>
    );
  };

  const { handleSubmit, handleChange, values, errors, resetForm } = useFormik({
    initialValues: {
      name: "",
      mobileNo: "",
      email: "",
      preferredLocation: "",
      query: "",
    },

    alidateOnChange: false,
    validationSchema,

    onSubmit: (data) => {
      let param = {
        name: data.name,
        phoneNumber: data.mobileNo,
        email: data.email,
        query: data.query,
        id: 0,
      };
      dispatch(patientContactus(param)).then((res) => {
        resetForm("");

        setMessage(true);
        setDialog(true);
      });
    },

  });

  return (
    <div className="relative">
      <ToastContainer />
      <div
        className="max-h-full relative rounded-lg w-full mt-2 pb-7 bg-cover bg-center bg-no-repeat"
        style={{
          height: "auto",
          backgroundSize: "cover",
          backgroundImage: `url(${banne})`,
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundSize: "cover",
            backgroundImage: `url(${doc})`,
            opacity: "0.9",
            width: "100%",
          }}
          className="p-4 absolute top-0 left-0"
        ></div>
        <div className="flex flex-col md:flex-row pt-7">
          <div className="w-11/12 md:w-1/2 pl-2 md:pl-4 z-40 mt-16 ml-2 md:ml-6 ">
            <div>
              <p className="text-cust hidden md:block">The best</p>
              <p className="text-cust hidden md:block">healthcare has</p>
              <p className="text-cust hidden md:block">reached your</p>
              <p className="text-cust hidden md:block">neighbourhood.</p>

              <p className="text-cust text-md md:hidden">The best healthcare</p>
              <p className="text-cust text-md md:hidden">has reached your</p>
              <p className="text-cust text-md md:hidden">neighbourhood.</p>

              {/* <div className="flex  mr-5">
                <button className="mt-5 px-8 py-2 text-2xl rounded-lg text-center text-white font-semibold bg-brand-mountaineadow cursor-pointer">
                  {" "}
                  Get a Call{" "}
                </button>
              </div> */}
            </div>
          </div>

          {!msgResponse ? (
            <div className="w-1/2 pr-7 hidden lg:flex justify-end">
              <div
                className="flex flex-col rounded-lg bg-white w-10/12 h-auto z-40 p-3"
                style={{ backgroundColor: "#ffffff !important" }}
              >
                <h1 className="text-left pl-4 text-2xl font-medium mt-5">
                  Register for Healthcare
                </h1>
                <h1 className="text-left pl-4 text-2xl font-medium mt-1">
                  Support Today!
                </h1>
                <div className="mt-5 pl-4 pr-4">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1">
                      <div className="flex flex-col">
                        <div className="flex flex-col relative">
                          <p className="ccl mb-3">Enter Your Name</p>
                          <input
                            maxLength="50"
                            type="text"
                            name="name"
                            id="name"
                            className={`appearance-none rounded-lg  border-2 py-2 p-2 w-full py-1 bg-white placeholder-gray-secondary  focus:outline-none ${"border-gray-highlight"}`}
                            placeholder="Enter Your Name"
                            value={values.name}
                            onChange={handleChange}
                          />
                          <div className="h-5">
                            {errors.name && (
                              <div style={{ color: "red", fontSize: 12 }}>
                                {errors.name}
                              </div>
                            )}
                          </div>
                        </div>

                      </div>

                      <div className="flex flex-col">
                        <div className="flex flex-col relative">
                          <p className="ccl mb-3">Enter Your Phone Number</p>
                          <input

                            name="mobileNo"
                            id="mobileNo"
                            // maxLength="10"
                            // pattern="\d*"
                            // type="number" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==4) return false;"
                            // type="number"
                            type="number"
                            onInput={(e) => e.target.value = e.target.value.slice(0, 10)}
                            className={`appearance-none rounded-lg  border-2 py-2 p-2 w-full py-1 bg-white placeholder-gray-secondary  focus:outline-none ${"border-gray-highlight"}`}
                            placeholder="Enter Your Phone Number"
                            value={values.mobileNo}
                            onChange={handleChange}
                          />
                          <div className="h-7">
                            {errors.mobileNo && (
                              <div style={{ color: "red", fontSize: 12 }}>
                                {errors.mobileNo}
                              </div>
                            )}
                          </div>
                        </div>

                      </div>

                      <div className="flex flex-col">
                        <div className="flex flex-col relative">
                          <p className="ccl mb-3">Enter Your Email</p>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className={`appearance-none rounded-lg  border-2 py-2 p-2 w-full py-1 bg-white placeholder-gray-secondary  focus:outline-none ${"border-gray-highlight"}`}
                            placeholder="Enter Your email"
                            value={values.email}
                            onChange={handleChange}
                          />
                          <div className="h-5">
                            {errors.email && (
                              <div style={{ color: "red", fontSize: 12 }}>
                                {errors.email}
                              </div>
                            )}
                          </div>
                        </div>


                      </div>

                      {/* <div className="flex flex-col mb-6">
                        <div className="flex relative">
                          <input
                            type="text"
                            name="preferredLocation"
                            id="preferredLocation"
                            className={`appearance-none rounded-lg  border-b-4 w-full py-1 bg-white placeholder-gray-secondary  focus:outline-none ${"border-gray-highlight"}`}
                            placeholder="Enter Your Name"
                            value={values.preferredLocation}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.preferredLocation && (
                          <div style={{ color: "red", fontSize: 12 }}>
                            {errors.preferredLocation}
                          </div>
                        )}
                      </div> */}

                      <div className="flex flex-col">
                        <div className="flex flex-col relative">
                          <p className="ccl mb-3">Enter Your Query</p>
                          <input
                            type="text"
                            name="query"
                            id="query"
                            className={`appearance-none rounded-lg  border-2 py-2 p-2 w-full py-1 bg-white placeholder-gray-secondary  focus:outline-none ${"border-gray-highlight"}`}
                            placeholder="Enter Your Query"
                            value={values.query}
                            onChange={handleChange}
                          />
                          <div className="h-5">
                            {errors.query && (
                              <div style={{ color: "red", fontSize: 12 }}>
                                {errors.query}
                              </div>
                            )}
                          </div>
                        </div>


                      </div>
                      <div className="flex w-full my-3">
                        <button
                          onClick={scrollToTop}
                          type="submit"
                          className={`p-2 bg-brand-secondary  text-white w-full  rounded-lg text-center text-base font-normal}`}
                        >
                          Submit
                        </button>
                      </div>
                      <div
                        className="my-2"
                        style={{ color: color, fontSize: 12 }}
                      >
                        {msg}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-1/2 pr-7 hidden lg:flex justify-end">
              <div
                className=" rounded-lg bg-white w-auto  z-40 p-3 "
                style={{ backgroundColor: "#ffffff !important" }}
              >
                <div className="mt-5 pl-4">
                  <div className="grid grid-cols-1">
                    <h1 className="text-left text-2xl font-medium mt-1 mb-5">
                      Contact us
                    </h1>
                    <div className="w-auto h-auto">
                      <div className="flex flex-col relative">
                        <h1 className="ccl mb-3 text-2xl font-medium">
                          Thank you for your interest.
                        </h1>
                        <p className="ccl mb-3">
                          One of our representatives will get in touch with you
                          soon.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* <div className="flex justify-end mr-5">
            <button className="mt-5 px-8 py-2 text-2xl rounded-lg text-center font-semibold bg-brand-mountaineadow cursor-pointer">
              {" "}
              Get a Call{" "}
            </button>
          </div>
          <div className="m-3 md:m-24 text-blue-50 mb-4">

            <p className="mt-8 text-blue-50 text-2xl">
              {" "}
              At CureBay eClinic in your village:{" "}
            </p>
            <div>
              <ul className="flex flex-wrap gap-2 text-brand-black font-semibold text-xl mt-3 mb-4">
                <li className="border-l-2 border-black px-4">
                  Top doctors’ diagnosis
                </li>
                <li className="border-l-2 border-black px-4">
                  Pathological test
                </li>
                <br />
                <li className="border-l-2 border-black px-4">Medicines</li>
                <li className="border-l-2 border-black px-4">
                  Best hospital access
                </li>
              </ul>
            </div>
          </div> */}
      </div>


      {!msgResponse ?
        <div className="mt-5 md:hidden border-2 rounded-lg pl-4 pr-4">
          <h1 className="text-left text-2xl font-medium mt-5">
            Register for Healthcare
          </h1>
          <h1 className="text-left text-2xl font-medium mt-1">Support Today!</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1">
              <div className="flex flex-col mb-4">
                <div className="flex flex-col relative">
                  <p className="ccl mb-3">Enter Your Name</p>
                  <input
                    maxLength="50"
                    type="text"
                    name="name"
                    id="name"
                    className={`appearance-none rounded-lg  border-2 py-2 p-2 w-full py-1 bg-white placeholder-gray-secondary  focus:outline-none ${"border-gray-highlight"}`}
                    placeholder="Enter Your Name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && (
                  <div style={{ color: "red", fontSize: 12 }}>{errors.name}</div>
                )}
              </div>

              <div className="flex flex-col mb-4">
                <div className="flex flex-col relative">
                  <p className="ccl mb-3">Enter Your Phone Number</p>
                  <input
                    // maxLength="10"
                    // pattern="\d*"
                    // type="number" pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==4) return false;"
                    // type="number"
                    type="number"
                    onInput={(e) => e.target.value = e.target.value.slice(0, 10)}
                    name="mobileNo"
                    id="mobileNo"
                    className={`appearance-none rounded-lg  border-2 py-2 p-2 w-full py-1 bg-white placeholder-gray-secondary  focus:outline-none ${"border-gray-highlight"}`}
                    placeholder="Enter Your Phone Number"
                    value={values.mobileNo}
                    onChange={handleChange}
                  />
                </div>
                {errors.mobileNo && (
                  <div style={{ color: "red", fontSize: 12 }}>
                    {errors.mobileNo}
                  </div>
                )}
              </div>

              <div className="flex flex-col mb-4">
                <div className="flex flex-col relative">
                  <p className="ccl mb-3">Enter Your Email</p>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className={`appearance-none rounded-lg  border-2 py-2 p-2 w-full py-1 bg-white placeholder-gray-secondary  focus:outline-none ${"border-gray-highlight"}`}
                    placeholder="Enter Your email"
                    value={values.email}
                    onChange={handleChange}
                    onFocus={{}}
                  />
                </div>

                {errors.email && (
                  <div style={{ color: "red", fontSize: 12 }}>{errors.email}</div>
                )}
              </div>

              {/* <div className="flex flex-col mb-6">
                        <div className="flex relative">
                          <input
                            type="text"
                            name="preferredLocation"
                            id="preferredLocation"
                            className={`appearance-none rounded-lg  border-b-4 w-full py-1 bg-white placeholder-gray-secondary  focus:outline-none ${"border-gray-highlight"}`}
                            placeholder="Enter Your Name"
                            value={values.preferredLocation}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.preferredLocation && (
                          <div style={{ color: "red", fontSize: 12 }}>
                            {errors.preferredLocation}
                          </div>
                        )}
                      </div> */}

              <div className="flex flex-col mb-4">
                <div className="flex flex-col relative">
                  <p className="ccl mb-3">Enter Your Query</p>
                  <input
                    type="text"
                    name="query"
                    id="query"
                    className={`appearance-none rounded-lg  border-2 py-2 p-2 w-full py-1 bg-white placeholder-gray-secondary  focus:outline-none ${"border-gray-highlight"}`}
                    placeholder="Enter Your Query"
                    value={values.query}
                    onChange={handleChange}
                    preventScroll={true}
                  />
                </div>

                {errors.query && (
                  <div style={{ color: "red", fontSize: 12 }}>{errors.query}</div>
                )}
              </div>
              <div className="flex w-full my-3">
                <button
                  onClick={scrollToTop}
                  type="submit"
                  className={`p-2 bg-brand-secondary  text-white w-full  rounded-lg text-center text-base font-normal}`}
                >
                  Submit
                </button>
              </div>
              <div className="my-2" style={{ color: color, fontSize: 12 }}>
                {msg}
              </div>
            </div>
          </form>
        </div>

        :
        <div className="mt-5 md:hidden border-2 rounded-lg pl-4 pr-4">
          <div className="mt-5 pl-4">
            <div className="grid grid-cols-1">
              <h1 className="text-left text-2xl font-medium mt-1 mb-5">
                Contact us
              </h1>
              <div className="w-auto h-auto">
                <div className="flex flex-col relative">
                  <h1 className="ccl mb-3 text-2xl font-medium">
                    Thank you for your interest.
                  </h1>
                  <p className="ccl mb-3">
                    One of our representatives will get in touch with you
                    soon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <div className="mt-4 w-11/12 m-auto">
        <div className="flex flex-col lg:flex-row flex-wrap justify-between">
          <span className="sizeS p-2">At curebay eClinic in your village:</span>
          <div className="flex flex-wrap items-center sizeSs">
            <div className="border-r-2 p-2 px-4">Top Doctor's diagnosis</div>
            <div className="border-r-2 p-2 px-4">Pathalogical Test</div>
            <div className="border-r-2 p-2 px-4">Medicines</div>
            <div className="border-r-2 p-2 px-4">Best Hospital Access</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-12 lg::mt-0 lg:relative z-10 justify-center content-center items-center bottom-60 w-full h-1/2"></div>

      {/* <div className="flex lg:relative mt-4 lg:mt-0 z-10 bottom-40 justify-center flex-col items-center content-center">
        <h1 className="text-center text-5xl font-semibold text-brand-secondary">
          We Cure with Care!
        </h1>
        <p className="font-semibold text-center mt-3">
          Now, you don’t need to travel miles for a good doctor, essential
          medicines, <br />
          medical tests or well-facilitated world-class hospitals. We are
          bringing everything to you.
        </p>
        <div className="mt-5">
          <video className="w-full h-full rounded-xl" controls>
            <source src={CureBay} type="video/mp4"></source>
          </video>
        </div>
      </div> */}
      <div className="flex mb-10 flex-col justify-center content-center items-center  bg-gray-50 w-full">
        <h1 className="text-2xl lg:text-5xl text-brand-secondary my-10 text-center">
          {" "}
          <span className="font-semibold">Our Service Partners</span>
        </h1>
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          <div className="greyAnto">
            <img src={image1} alt="#" />
          </div>
          <div className="greyAnto">
            <img src={image2} alt="#" />
          </div>
          <div className="greyAnto">
            <img src={image3} alt="#" />
          </div>
          <div className="greyAnto">
            <img src={image4} alt="#" />
          </div>
          <div className="greyAnto">
            <img src={image5} alt="#" />
          </div>
          <div className="greyAnto">
            <img src={image6} alt="#" />
          </div>
          <div className="greyAnto">
            <img src={image7} alt="#" />
          </div>
          <div className="greyAnto">
            <img src={image8} alt="#" />
          </div>
          <div className="greyAnto">
            <img src={image9} alt="#" />
          </div>
          <div className="greyAnto">
            <img src={image10} alt="#" />
          </div>
        </div>
        <div className="md:hidden w-11/12 h-auto">
          <Carousel
            value={products}
            itemTemplate={itemTemplate}
            numVisible={1}
            numScroll={1}
            autoplayInterval={3500}
          ></Carousel>
        </div>
      </div>

      <div className="flex flex-col justify-center content-center items-center mt-10 w-full">
        <h1 className="my-10 font-semibold text-2xl md:text-5xl text-center text-brand-secondary">
          {" "}
          <span className="font-semibold">Welcome to</span> CureBay eClinics!
        </h1>
        <div className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 lg:gap-1">
          <div className="flex flex-col w-11/12 m-auto my-7 rounded-lg border-2 px-3 pl-4">
            <div className="mt-10 text-center">
              <img src={consultation} alt="#" className="m-auto" />
            </div>
            <h3 className="text-xl font-semibold mt-3 text-center">
              Doctor Consultation
            </h3>
            <ul className="mb-5">
              <li className="flex mt-2">
                <span className="mr-4 space-x-3">
                  {" "}
                  <i
                    className="pt-1 ml-2 fa fa-check"
                    style={{ fontSize: "18px", color: "#0053a1" }}
                  ></i>{" "}
                </span>
                Online consultation with highly qualified and experienced
                doctors
              </li>
              <li className="flex mt-2">
                <span className="mr-4 space-x-3">
                  {" "}
                  <i
                    className="pt-1 ml-2 fa fa-check"
                    style={{ fontSize: "18px", color: "#0053a1" }}
                  ></i>{" "}
                </span>
                Provision for second opinion available
              </li>
              <li className="flex mt-2">
                <span className="mr-4 space-x-3">
                  {" "}
                  <i
                    className="pt-1 ml-2 fa fa-check"
                    style={{ fontSize: "18px", color: "#0053a1" }}
                  ></i>{" "}
                </span>
                Reputed specialists consulting
              </li>
            </ul>
          </div>

          <div className="flex flex-col w-11/12 m-auto my-7 rounded-lg border-2 px-3 pl-4">
            <div className="mt-10 text-center">
              <img src={surgery_icon_2} alt="#" className="m-auto" />
            </div>
            <h3 className="text-xl font-semibold mt-3 text-center">
              Diagnostic Tests
            </h3>
            <ul className="mb-5">
              <li className="flex mt-2">
                <span className="mr-4 space-x-3">
                  {" "}
                  <i
                    className="pt-1 ml-2 fa fa-check"
                    style={{ fontSize: "18px", color: "#0053a1" }}
                  ></i>{" "}
                </span>
                All tests conducted at the eClinic through reliable high quality
                lab partners
              </li>
              <li className="flex mt-2">
                <span className="mr-4 space-x-3">
                  {" "}
                  <i
                    className="pt-1 ml-2 fa fa-check"
                    style={{ fontSize: "18px", color: "#0053a1" }}
                  ></i>{" "}
                </span>
                Sample and report collection at the same venue
              </li>
            </ul>
          </div>

          <div className="flex flex-col w-11/12 m-auto my-7 rounded-lg border-2 px-3 pl-4">
            <div className="mt-10 text-center">
              <img src={hospital_booking} alt="#" className="m-auto" />
            </div>
            <h3 className="text-xl font-semibold mt-3 text-center">
              Hospital Booking
            </h3>
            <ul className="mb-5">
              <li className="flex mt-2">
                <span className="mr-4 space-x-3">
                  {" "}
                  <i
                    className="pt-1 ml-2 fa fa-check"
                    style={{ fontSize: "18px", color: "#0053a1" }}
                  ></i>{" "}
                </span>
                Information on a wide network of hospitals
              </li>
              <li className="flex mt-2">
                <span className="mr-4 space-x-3">
                  {" "}
                  <i
                    className="pt-1 ml-2 fa fa-check"
                    style={{ fontSize: "18px", color: "#0053a1" }}
                  ></i>{" "}
                </span>
                Hassle free price check of room and bed availability directly at
                e-clinic
              </li>
              <li className="flex mt-2">
                <span className="mr-4 space-x-3">
                  {" "}
                  <i
                    className="pt-1 ml-2 fa fa-check"
                    style={{ fontSize: "18px", color: "#0053a1" }}
                  ></i>{" "}
                </span>
                Stress-free booking and assisted admission through eClinic
              </li>
            </ul>
          </div>

          <div className="flex flex-col w-11/12 m-auto my-7 rounded-lg border-2 px-3 pl-4">
            <div className="mt-10 text-center">
              <img src={surgery_icon_3} alt="#" className="m-auto" />
            </div>
            <h3 className="text-xl font-semibold mt-3 text-center">Pharmacy</h3>
            <ul className="mb-5">
              <li className="flex mt-2">
                <span className="mr-4 space-x-3">
                  {" "}
                  <i
                    className="pt-1 ml-2 fa fa-check"
                    style={{ fontSize: "18px", color: "#0053a1" }}
                  ></i>{" "}
                </span>
                All prescribed medicines can be made available at the eClinic.
              </li>
              <li className="flex mt-2">
                <span className="mr-4 space-x-3">
                  {" "}
                  <i
                    className="pt-1 ml-2 fa fa-check"
                    style={{ fontSize: "18px", color: "#0053a1" }}
                  ></i>{" "}
                </span>
                Authentic, genuine medicines at best price
              </li>
            </ul>
          </div>

          <div className="flex flex-col w-11/12 m-auto my-7 rounded-lg border-2 px-3 content-center pl-4">
            <div className="mt-10 text-center">
              <img src={emergency_services} alt="#" className="m-auto" />
            </div>
            <h3 className="text-xl font-semibold mt-3 text-center">
              Emergency Services
            </h3>
            <ul className="mb-5">
              <li className="flex mt-2">
                <span className="mr-4 space-x-3">
                  {" "}
                  <i
                    className="pt-1 ml-2 fa fa-check"
                    style={{ fontSize: "18px", color: "#0053a1" }}
                  ></i>{" "}
                </span>
                Ambulance service available.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex gap-7 flex-col md:flex-row py-12">
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-4xl text-center md:text-left font-medium pb-7 text-brand-secondary">
            We Cure With Care
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl w-full md:w-11/12">
            Now, you don't need to travel miles for doctor, essential medicines,
            medical tests or well-facilitated world-class hospitals. We are
            bringing everything to you
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img src={curebayLogo} alt="logo image" />
        </div>
      </div>
    </div>
  );
};

export default ContactWithUs;
