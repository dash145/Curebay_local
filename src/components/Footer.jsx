import React from "react";
import { Link } from "react-router-dom";
import newLogo from "../Assets/Images/newLogo.png";
import Boticon from "../Assets/Images/Footer_Bot_icon.svg";
import insta from "../Assets/Images/instagram.png";
import facebook from "../Assets/Images/facebook.png";
import twitter from "../Assets/Images/Twitter.png";
import linkedin from "../Assets/Images/linkedin.png";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import { USERPROFILE_ROUTES } from "../application/Router/constants/UserProfileRoutes";
import { useSelector } from "react-redux";

export default function Footer() {
  const userData = useSelector((state) => state.authReducer.patientData);
  return (
    <>
      <footer
        className=" relative bg-white pt-12 pb-2"
        style={{ backgroundColor: "#F1F5F6" }}
      >
        <div className=" mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl sm:px-5 px-10 md:px-16 lg:px-10">
          <div className="flex justify-between mb-8">
            <a
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <img className="block h-12 w-auto" src={newLogo} alt="Curebay" />
            </a>
            <div className="flex items-center mr-2">
              <p className="text-black-500 font-bold mr-8">Connect with us</p>

              {/* <a
                href="https://instagram.com/cure_bay?utm_medium=copy_link"
                target="_blank"
                className="transition-colors duration-300 hover:underline   cursor-pointer"
              >
                <img className="h-8 ml-8 mr-3 cursor-pointer" src={facebook} alt="facebook" />
              </a> */}

              <a
                href="https://www.linkedin.com/company/80637697/admin/"
                target="_blank"
                className="transition-colors duration-300 hover:underline  cursor-pointer"
              >
                <img className="h-8  mr-3 " src={linkedin} alt="linkedin" />
              </a>

              <a
                href="https://twitter.com/cure_bay?s=11"
                target="_blank"
                className=" transition-colors duration-300 hover:underline   cursor-pointer"
              >
                <img className="h-8  mr-3" src={twitter} alt="twitter" />
              </a>

              <a
                href="https://instagram.com/cure_bay?utm_medium=copy_link"
                target="_blank"
                className="transition-colors duration-300 hover:underline   cursor-pointer"
              >
                <img className="h-8  mr-3  cursor-pointer" src={insta} alt="instagram" />
              </a>

              <a
                href="https://m.facebook.com/CureBay-106822021819382/"
                target="_blank"
                className="transition-colors duration-300 hover:underline   cursor-pointer"
              >
                <img className="h-8  mr-3  cursor-pointer" src={facebook} alt="facebook" />
              </a>

            </div>
          </div>

          <div className="flex justify-between">
            <div className="md:max-w-md lg:col-span-2">
              <div className=" flex flex-col justify-between ml-0  mt-0 max-w-md mx-auto">
                <div className="flex">
                  <svg
                    className="h-8 w-8 text-gray-800"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <rect x="3" y="5" width="18" height="14" rx="2" />{" "}
                    <polyline points="3 7 12 13 21 7" />
                  </svg>
                  <p className="pl-3 pt-1 text-gray-600 text-sm">
                    contact@curebay.com
                  </p>
                </div>

                <div className="flex mt-3">
                  <svg
                    className="h-8 w-8 text-gray-800"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />{" "}
                    <line x1="15" y1="7" x2="15" y2="7.01" />{" "}
                    <line x1="18" y1="7" x2="18" y2="7.01" />{" "}
                    <line x1="21" y1="7" x2="21" y2="7.01" />
                  </svg>
                  <p className="pl-3 pt-1 text-gray-600 text-sm">
                    +91-8335 000 999
                  </p>
                </div>

                <div className="flex mt-3">
                  {/* <svg className="h-8 w-8 text-gray-800" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />  <line x1="15" y1="7" x2="15" y2="7.01" />  <line x1="18" y1="7" x2="18" y2="7.01" />  <line x1="21" y1="7" x2="21" y2="7.01" /></svg> */}
                  <img className="ml-1" src={Boticon} alt="Bot" />
                  <p className="pl-3 pt-1 text-gray-600 text-sm">
                    +91-8334 000 999
                  </p>
                </div>

                <div className="flex mt-3">
                  <svg
                    className="h-8 w-8 text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <div>
                    <p className="pl-3 pt-1 text-gray-700 font-semibold text-sm">
                    CureBay Technologies Pvt Ltd
                    </p>
                    <p className="pl-3 pt-1 text-gray-600 text-sm">
                      Plot No. A-98, Budha Nagar, Laxmisagar, Bhubaneswar,
                      Khordha Odisha 751006
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-16 lg:col-span-4 md:grid-cols-4">
              <div className="hidden md:block">
                <p className="font-bold tracking-wide text-black-500  mb-6">
                  Services
                </p>
                <ul className="mt-2 space-y-4">
                  <li>
                    <a
                      href="/doctors"
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      Find Doctor
                    </a>
                  </li>
                  <li>
                    <a
                      href="/doctors"
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      Book an Appointment
                    </a>
                  </li>
                  <li>
                    <a
                      href="/pharmacycategory"
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      Order Medicine
                    </a>
                  </li>
                  <li>
                    <a
                      href="/diagnosis"
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      Book a Lab Test
                    </a>
                  </li>
                  <li>
                    <a
                      href="/hospital"
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      Book a Hospital Bed
                    </a>
                  </li>
                  <li>
                    <a
                      href="/comingSoon"
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      Healthcare Service
                    </a>
                  </li>

                  {/* <li>
                    <a
                      href="/"
                      className="text-gray-600 transition-colors duration-300 hover:underline">
                      Emergency Services
                    </a>
                  </li> */}
                </ul>
              </div>
              <div>
                <p className="font-bold tracking-wide text-black-500  mb-6">
                  About{" "}
                </p>
                <ul className="mt-2 space-y-4">
                  <li>
                  <a
                      href={'https://curebay.com/about-us'}
                      target="_blank" rel="noreferrer noopener"
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <Link
                      to={APP_ROUTES.MEDIA}
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      Article, Blogs & Press
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={APP_ROUTES.CONTACTWITHUS}
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      Contact Us
                    </Link>
                    {/* <a
                      href="/"
                      className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
                      Contact Us
                    </a> */}
                  </li>
                  <li>
                    <Link
                      to={APP_ROUTES.OUR_TEAM}
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      Our Team
                    </Link>
                  </li>
                  {/* <li>
                    <a
                      href={'https://curebay.com/about'}
                      target="_blank" rel="noreferrer noopener"
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      CureBay About
                    </a>
                  </li> */}
                  {userData?.id && (
                    <li>
                      <a
                        href="/profile/feedback"
                        className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                      >
                        Feedback
                      </a>
                    </li>
                  )}
                  {/* <li>
                    <Link
                      to={APP_ROUTES.MEDIA}
                      className="text-gray-600 transition-colors duration-300 hover:underline">
                      Press
                    </Link>
                  </li> */}
                </ul>
              </div>
              <div className="hidden md:block">
                <p className="font-bold tracking-wide text-black-800  mb-6">
                  Policies
                </p>
                <ul className="mt-2 space-y-4">
                  <li>
                    <Link
                      to={APP_ROUTES.PRIVACY_POLICY}
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={APP_ROUTES.TERMS_AND_CONDITION}
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={APP_ROUTES.REFUND_POLICY}
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      Return & Refund Policy
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to={APP_ROUTES.REFUND_POLICY}
                      className="text-gray-600 transition-colors duration-300 hover:underline">
                      Return Policy
                    </Link>
                  </li> */}

                  <br />
                </ul>
              </div>

              <div className="hidden md:block">
                <p className="font-bold tracking-wide text-black-500  mb-6">
                  CureBay
                </p>
                <ul className="mt-2 space-y-4">
                  <li>
                    <Link
                      to={APP_ROUTES.DOCTORS}
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      Doctor
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={APP_ROUTES.HOSPITAL}
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      Hospital
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={APP_ROUTES.PHARMACY_CATEGOTY}
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      Medicine
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={APP_ROUTES.DIAGNOSIS}
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      Diagnostics
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={USERPROFILE_ROUTES.MYMEDICALHISTORY}
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      Health Records
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={APP_ROUTES.COMINGSOON}
                      className="text-gray-600 text-sm transition-colors duration-300 hover:underline"
                    >
                      Health Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={APP_ROUTES.CONTACTWITHUS}
                      className="text-gray-700 text-sm font-semibold transition-colors duration-300 hover:underline"
                    >
                      Help & Support
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to={APP_ROUTES.REFUND_POLICY}
                      className="text-gray-600 transition-colors duration-300 hover:underline">
                      Return Policy
                    </Link>
                  </li> */}

                  <br />
                </ul>
              </div>

              {/* <div>
                <p className="font-semibold tracking-wide text-gray-800 ">Connect with us</p>
                <div className="flex mt-2">

                  <a
                    href="https://twitter.com/cure_bay?s=11"
                    target="_blank"
                    className="text-gray-600 transition-colors duration-300 hover:underline">
                    <img src={twitter} alt="twitter" />
                  </a>

                  <a
                    href="https://www.linkedin.com/company/80637697/admin/"
                    target="_blank"
                    className="ml-4 text-gray-600 transition-colors duration-300 hover:underline">
                    <img src={linkedin} alt="linkedin" />
                  </a>

                  <a href="https://instagram.com/cure_bay?utm_medium=copy_link" target="_blank" className=" ml-4  text-gray-600 transition-colors duration-300 hover:underline">
                    <img src={insta} alt="insta" />
                  </a>
                </div>

                <br/>


                  <div>
                  <a
                    href="/contact-with-us"
                    className="text-gray-700 font-semibold transition-colors duration-300 hover:underline">
                    Help & Support
                  </a>
                </div>


              </div> */}
            </div>
          </div>
          {/* <div className="hidden md:grid lg:justify-end">

            <div className="md:grid grid-cols-6 relative  md:divide-x divide-gray-500 mb-4 flex justify-center flex-wrap gap-4 divide-x ">
              <a href="/doctors" className="text-center cursor-pointer text-gray-600 text-sm pl-2 md:w-38 transform transition duration-500 hover:scale-125">Doctor</a>
              <a href="/hospital" className="text-center cursor-pointer text-gray-600 text-sm pl-2 md:w-38 transform transition duration-500 hover:scale-125">Hospital </a>
              <a href="/pharmacycategory" className="text-center cursor-pointer text-gray-600 text-sm pl-2 md:w-38 transform transition duration-500 hover:scale-125">Medicine</a>
              <a href="/diagnosis" className="text-center cursor-pointer text-gray-600 text-sm pl-2 md:w-38 transform transition duration-500 hover:scale-125">Diagnostics</a>
              <a href="/profile/mymedicalhistory" className="text-center cursor-pointer text-gray-600 text-sm pl-2 md:w-38 transform transition duration-500 hover:scale-125">Health Records </a>
              <a href="/comingSoon" className="text-center cursor-pointer text-gray-600 text-sm pl-2 md:w-38 transform transition duration-500 hover:scale-125">Health Services</a>
            </div>
          </div> */}
        </div>
        <div
          style={{ backgroundColor: "#E9F0F3" }}
          className="flex flex-col justify-center pt-5 pb-5 sm:flex-row"
        >
          <p className="text-sm text-black-600">
            Copyright © {new Date().getFullYear()} CureBay. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
