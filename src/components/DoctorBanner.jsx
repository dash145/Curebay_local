import React, { useState, Fragment, useEffect, useRef } from "react";
import NavBarSearch from "./navbarSearch";
import StarDoctors from "./StarDoctors";

import { useLocation } from "react-router-dom";

import "../Assets/css/custom-style.scss";

function DoctorBanner(props) {
  const [banner, setBanner] = useState("");

  const location = useLocation();

  useEffect(() => {
    console.log("Location changed", location);
    setBanner(location.pathname);
  }, [location]);

  return (
    <>
      <div
        className={
          "flex items-center h-cust nav-header-home-bg containerMargin1 " +
          (banner == "/" ? "home-banner" : "other-banner")
        }

        // style = { props.screen < 700 && props.screen >= 405  && banner == "/" ? {height: '100vh'} : props.screen >= 700 && props.screen < 1000 && banner == "/" ? {top: "-85px"} : props.screen < 405 ? {top: '-80px'} : {} }
      >
        {/* <NavBarSearch /> */}
        <StarDoctors screen={props.screen} />
      </div>

    </>
  );
}

export default DoctorBanner;
