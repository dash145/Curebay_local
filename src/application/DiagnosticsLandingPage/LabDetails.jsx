import React from "react";
import LabDataDetails from "../../components/LalPathlab";
import AllLabTest from "../../components/AllLabtest";
import { useHistory } from "react-router-dom";

function LabDetails(props) {
  const history = useHistory();

  const buttonClicked = () => {
    // alert("qqwwerrtt")
    // let temp = "";
    // if (localStorage.getItem("pathName")=="/allradiology"){
    //     temp="/allradiology";
    // } else if(localStorage.getItem("pathName")=="/common-lab-test"){
    //     temp = "/common-lab-test";
    // }
    // window.location.href=temp;
    history.back();
  };

  console.log("dikndsjkn", JSON.stringify(props));
  return (
    <div>
      <ul className="lg:flex  hidden text-brand-secondary text-sm lg:text-base lg:pl-4 px-4 pt-5">
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
          <a href="/diagnosis">Diagnostics</a>
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
          {console.log(localStorage.getItem("pathName"), "qqqqqqqqqqqq")}
          <a className="cursor-pointer"
            // href={
            //   localStorage.getItem("pathName") == "/allradiology"
            //     ? "/allradiology"
            //     : localStorage.getItem("pathName") == "/common-lab-test"
            //     ? history.goBack()
            //     : null
            // }

            onClick={()=>history.goBack()}
          >
            {localStorage.getItem("pathName") == "/allradiology"
              ? "Lab Partners"
              : localStorage.getItem("pathName") == "/common-lab-test"
              ? "Lab Tests"
              : null}
          </a>
          {/* <p onClick={history.back()}>{localStorage.getItem("pathName")=="/allradiology" ?"Lab Partners":(localStorage.getItem("pathName")=="/common-lab-test"?"Lab Tests":null)}</p> */}
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
          <a>{props?.location?.state?.labName}</a>
          {/* <svg
                        className="h-5 w-auto text-brand-secondary"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        ></path>
                    </svg> */}
        </li>
        <li className="inline-flex items-center"></li>
      </ul>
      <LabDataDetails />
      <AllLabTest {...props} />
    </div>
  );
}
export default LabDetails;
