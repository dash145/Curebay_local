import React, { useState } from "react";
import lalpath from "../Assets/Images/Laboratory-bro.svg";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { getLocalTime } from "../Assets/utils/LocalTimeFormat";

function LalPathlab() {
  const location = useLocation();
  const [labData] = useState(location?.state);

  console.log("lab data", labData);

  return (
    <>
      <div>
        <div className="mt-6 md:mt-0 lg:py-8 lg:flex lg:justify-center">
          <div className="bg-white lg:w-full  lg:rounded-lg">
            <div className="items-center text-center sm:text-left sm:items-start flex flex-col sm:flex-row lg:flex">
              <div
                className="w-1/2 lg:w-2/12"
                style={{
                  width: "357px",
                  height: "200px",
                  border: "1px solid #E4E4E4",
                  borderRadius: "7px",
                  textAlign: "-webkit-center",
                }}
              >
                <img
                  src={
                    labData?.logo
                      ? process.env.REACT_APP_IMG_BASEURL + labData?.logo
                      : lalpath
                  }
                  alt="lab0"
                  style={{ width: "184px" }}
                />
              </div>
              <div className="mt-4 sm:mt-0 pb-6 px-0 sm:px-6 w-full sm:w-10/12">
                {/* <p className="text-base text-gray-600"> {labData.hospitalName}</p> */}
                <p
                  className=" text-2xl font-semibold"
                  style={{ color: "#66B889" }}
                >
                  {labData?.labName}
                </p>
                <hr className="mt-4 mb-3" />
                <div className="mt-4 text-left lg:w-full lg:flex flex-col lg:justify-between">
                  <div className="flex mb-5">
                    <p
                      className="text-sm font-bold text-brand-secondary w-28 md:w-36"
                      style={{ color: "#262626" }}
                    >
                      About
                    </p>

                    <div className="flex w-8/12 lg:w-auto">
                      <span className="mr-5 font-normal h-5 text-sm leading-5  text-black not-italic w-1">
                        :
                      </span>
                      <p
                        className="text-sm font-normal  max-w-3xl"
                        style={{ color: "#262626" }}
                      >
                        {labData?.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-5">
                    <p
                      className="text-sm font-bold text-brand-secondary w-28 md:w-36"
                      style={{ color: "#262626" }}
                    >
                      Location
                    </p>

                    <div className="flex">
                      <span className="mr-5 font-normal h-5 text-sm leading-5  text-black not-italic w-1">
                        :
                      </span>
                      <p
                        className="text-sm font-normal w-36 md:w-10/12"
                        style={{ color: "#262626" }}
                      >
                        {" "}
                        {labData?.address1}{" "}
                        {labData?.address2 === "NULL" ? "" : labData?.address2}{" "}
                        {labData?.pinCode}
                        {","} {labData?.city}
                      </p>
                    </div>
                  </div>
                  <div className="sm:mt-4 lg:mt-0 flex mb-5">
                    <p
                      className="text-sm font-bold text-brand-secondary w-28 md:w-36"
                      style={{ color: "#262626" }}
                    >
                      Hours
                    </p>
                    <span className="mr-5 font-normal h-5 text-sm leading-5  text-black not-italic w-1">
                      :
                    </span>
                    <p
                      className="text-sm font-normal  md:w-10/12"
                      style={{ color: "#262626" }}
                    >
                      {moment(labData?.labStartTime, "h:mm:ss A").format(
                        "hh:mm A"
                      )}{" "}
                      -{" "}
                      {moment(labData?.labEndTime, "h:mm:ss A").format(
                        "hh:mm A"
                      )}
                    </p>

                    {labData?.contactNumber ? (
                      <div>
                        <p
                          className="text-sm font-bold text-brand-secondary w-28"
                          style={{ color: "#262626" }}
                        >
                          Phone
                        </p>
                        <span className="sm:mr-8">:</span>
                        <p
                          className="text-sm font-normal"
                          style={{ color: "#262626" }}
                        >
                          {labData?.contactNumber
                            ? labData?.contactNumber
                            : labData?.mobileNUmber
                            ? labData?.mobileNUmber
                            : ""}
                        </p>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LalPathlab;
