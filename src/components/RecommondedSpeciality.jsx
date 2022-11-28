import React from "react";
import fusion from "../Assets/Images/fusion.svg";
import star from "../Assets/Images/starh.svg";
import sun from "../Assets/Images/sun.svg";
import madhavbaug from "../Assets/Images/madhavbaug.svg";
import right from "../Assets/Images/right.svg";
import left from "../Assets/Images/left.svg";
import SectionContainer from "./SectionContainer";
import { data } from "autoprefixer";

function RecommondedSpeciality() {
  const Data = [
    {
      img: fusion,
      add: "Thane,Mumbai",
      name: "Fusion Health and Cardiac care",
      doc: "124",
      spec: "25+",
      beds: "50+",
    },
    {
      img: star,
      add: "",
      name: "",
      doc: "",
      spec: "",
      beds: "",
    },
    {
      img: sun,
      add: "",
      name: "",
      doc: "",
      spec: "",
      beds: "",
    },
    {
      img: madhavbaug,
      add: "",
      name: "",
      doc: "",
      spec: "",
      beds: "",
    },
  ];

  const handleScroll = (e, dir) => {
    e.preventDefault();
    let slideList = document.querySelector(".slider");
    const lenghtCount = slideList.querySelectorAll(".slide_list").length;
    if (dir === "rightArrow") {
      slideList.style.transform = `translateX(${
        slideList.computedStyleMap().get("transform")[0].x.value - 950
      }px)`;
    }
    if (dir === "leftArrow") {
      slideList.style.transform = `translateX(${
        slideList.computedStyleMap().get("transform")[0].x.value + 950
      }px)`;
    }
  };
  return (
    <>
      <div className="flex flex-col m-auto p-auto">
        <SectionContainer
        
          title={"Recommended Speciality Hospitals"}
          subtitle={"See some Recommended Hospitals"}
          seeAll={"Specialities"}
        />
        <div className="w-full lg:max-w-full lg:flex ">
          <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
            <div className="flex flex-nowrap lg:ml-10 md:ml-20 ml-10  space-x-6">
              {Data.map((i) => (
                <div className="w-1/4  border  lg:bg-white lg:rounded-lg rounded-2xl  lg:justify-between lg:flex leading-normal p-4 bg-white shadow-sm flex-none text-center overflow-hidden">
                  <img
                    src={fusion}
                    alt="fusion"
                    className="flex mx-auto lg:w-20 h-24 "
                  />
                  <div className="lg:pl-3 mt-2">
                    <p className="text-base  lg:text-brand-secondary lg:font-medium flex text-left">
                      Fusion Health
                    </p>
                    <div className="lg:flex justify-between mt-2">
                      <p className="lg:text-xs text-sm  text-brand-gunsmoke  flex items-center">
                        Thane, Mumbai
                      </p>
                      {/*<div className="flex lg:mt-0 mt-2">
                        <img src={star} alt="star" className="w-4" />
                        <span className="lg:text-xs text-sm  text-brand-gunsmoke  flex items-center">4.8 (456 Reviews)</span>
                      </div>*/}
                    </div>

                    <div className="flex lg:justify-between justify-around pt-4">
                      <div>
                        <p className="text-xs text-brand-gunsmoke">Doctors</p>
                        <p className="text-xs text-brand-secondary font-medium">
                          124+
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-brand-gunsmoke">Beds</p>
                        <p className="text-xs text-brand-secondary font-medium">
                          10K+
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-brand-gunsmoke">
                          Specialities
                        </p>
                        <p className="text-xs text-brand-secondary font-medium pl-4">
                          25+
                        </p>
                      </div>
                    </div>
                    <button className="lg:w-auto lg:ml-20 w-full loat-right mt-4 bg-brand-secondary text-sm text-white py-2 px-4 rounded">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default RecommondedSpeciality;
