import React from "react";
import { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import newLogo from "../Assets/Images/newLogo.png";
import insta from "../Assets/Images/instagram.png";
import facebook from "../Assets/Images/facebook.png";
import twitter from "../Assets/Images/Twitter.png";
import linkedin from "../Assets/Images/linkedin.png";
import Boticon from '../Assets/Images/Footer_Bot_icon.svg';
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import { USERPROFILE_ROUTES } from "../application/Router/constants/UserProfileRoutes";
export default function FooterMobileVersion() {

  let location = useLocation();



  // useEffect(() => {
  //   getLocation();
  //   dispatch(getCartDetails(UserData.code));
  // }, [])


  return (
    <>
      <div className={` ${location.pathname == APP_ROUTES.SIEBAR ? 'hidden' : ''}`}>
        <footer className="relative pt-3 pb-3" style={{ backgroundColor: "rgb(241, 245, 246)" }}>
          <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-16 lg:px-10">
            <div className="grid gap-8 md:gap-16 row-gap-10 mb-14 lg:grid-cols-6">
              <div className="md:max-w-md lg:col-span-2">
                <a
                  href="/"
                  aria-label="Go home"
                  title="Company"
                  className="inline-flex items-center"
                >
                  <img
                    className="block h-10 w-auto"
                    src={newLogo}
                    alt="Curebay"
                  />
                </a>

                <div>
                  <p className="font-semibold tracking-wide text-gray-800 ">
                    Connect with us
                  </p>
                  <div className="flex mt-2 mb-2">
                    <a
                      href="https://twitter.com/cure_bay?s=11"
                      target="_blank"
                      className="transition-colors duration-300 hover:underline   cursor-pointer mr-3"
                    >
                      <img src={twitter} className=" h-8 " alt="twitter" />
                    </a>

                    <a
                      href="https://www.linkedin.com/company/80637697/admin/"
                      target="_blank"
                      className="transition-colors duration-300 hover:underline   cursor-pointer mr-3"
                    >
                      <img src={linkedin} className=" h-8 " alt="linkedin" />
                    </a>

                    <a
                      href="https://instagram.com/cure_bay?utm_medium=copy_link"
                      target="_blank"
                      className="transition-colors duration-300 hover:underline   cursor-pointer mr-3"
                    >
                      <img src={insta} className=" h-8 " alt="insta" />
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
                <div className="mt-4 max-w-md mx-auto mb-4">
                  <div className="flex">
                    <svg
                      className="h-6 w-6 text-gray-800"
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
                    <p className="pl-3">contact@curebay.com</p>
                  </div>
                  <div className="flex mt-3">
                    <svg
                      className="h-6 w-6 text-gray-800"
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
                    <p className="pl-3">+91-8335 000 999</p>
                  </div>

                  <div className="flex mt-3">
                    <img src={Boticon} alt="bot" />
                    <p className="pl-2">+91-8334 000 999</p>
                  </div>

                  <div className="flex gap-1 mt-3">
                    <svg
                      className="h-6 w-6 text-gray-800"
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
                    <div className="w-11/12 md:w-auto">
                      <p className="pl-3">CureBay Technologies Pvt Ltd</p>
                      <p className="pl-3">Plot No. A-98, Budha Nagar, Laxmisagar, Bhubaneswar, Khordha Odisha 751006</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
