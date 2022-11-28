import React, { useState, useEffect, createRef, useRef } from "react";
import profile from "../Assets/Images/avatar.png";
import Nofamily from "../Assets/Images/No Family member illustration.svg";
import Add from "../Assets/Images/add.svg";
import { getPatientfamilymembers } from "../Redux/Actions/UserprofileActions";
import { useDispatch, useSelector } from "react-redux";

import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import Addmemberpopup from "./userprofilecomponents/addmemberpopup";
import { memberColor } from "../config/constant";
import SectionContainer from './SectionContainer';


function FamilyMember() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authReducer.patientData);
  const [showaddmemberpopup, setshowaddmemberpopup] = useState(false);
  const familymemberinfo = useSelector((state) => state.familymembers);
  const { FamilymembersData } = familymemberinfo;
  var positionScroll = 7;
  var isFirstTimeLeft = true
  const redirectTo = (event) => {
    event.preventDefault();
    setshowaddmemberpopup(true);
  };


  const scrollRefs = useRef([]);

  // Populate scrollable refs, only create them once
  // if the selectedElements array length is expected to change there is a workaround
  scrollRefs.current = [...Array(FamilymembersData?.length).keys()].map(
    (_, i) => scrollRefs?.current[i] ?? createRef()
  );

  const handleScroll = (e, dir) => {
    if (dir == "rightArrow") {
      if (positionScroll == 0) {
        positionScroll = 7
      }
      positionScroll = positionScroll + 1
    } else {

      if (isFirstTimeLeft) {
        positionScroll = positionScroll - 3
        isFirstTimeLeft = false
      } else {
        positionScroll = positionScroll - 1
      }

    }
    if (positionScroll > FamilymembersData.length) {
      positionScroll = FamilymembersData.length - 3
    }
    if (positionScroll < 0) {
      positionScroll = 0
    }
    scrollRefs?.current[positionScroll]?.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  useEffect(() => {
    console.log(FamilymembersData);
    dispatch(getPatientfamilymembers(userData.code));
  }, []);

  console.log("Family members", FamilymembersData);

  return (
    <>
      <div className="mt-5 hidden lg:block">
        <div className="items-center mt-8 my-1 w-full flex md:justify-between">
          <span className="mx-3 text-center text-black-500 font-bold text-lg md:text-xl">
            My Family
          </span>

          <div
            onClick={redirectTo}
            className="rounded-xl w-60 px-1   items-center border border-brand-graynurse bg-white "
          >
            <div className=" py-2 flex items-center cursor-pointer">
              <img src={Add} alt="/" className="rounded-full h-10" />
              <p className="inline rounded-full text-base  text-brand-primary font-medium">
                Add Family Member
              </p>
            </div>
          </div>

          <div className="mt-0 md:-mt-8">
            {
              FamilymembersData?.length > 0 &&


              <SectionContainer className="" link={APP_ROUTES.FAMILY_SEARCH} data={FamilymembersData} title={''} subtitle={'Available Family'} seeAll={'My Family'} handelSroll={handleScroll} />
            }
          </div>
        </div>

        {/* {
          FamilymembersData?.length > 0 &&


          <SectionContainer link={APP_ROUTES.FAMILY_SEARCH} data={FamilymembersData} title={''} subtitle={'Available Family'} seeAll={'My Family'} handelSroll={handleScroll} />
        } */}

        {FamilymembersData?.length == 0 ?

          <div className="w-full flex flex-col items-center">
            <img className="h-32 mt-8" src={Nofamily} alt="nofamily" />
            <p className="text-gray-400 text-sm font-medium ">No Family Member Added</p>
          </div>
          :

          <div className="mx-2 mt-1 flex  justify-start gap-8">
            <div className="overflow-x-scroll hide-scroll-bar flex ">
              {FamilymembersData && FamilymembersData.length > 0 && FamilymembersData.map((user, i) => (
                <div
                  key={i}
                  className="rounded-xl mr-4 px-3 my-10 items-center border border-brand-graynurse bg-white w-80"
                  ref={scrollRefs.current[i]}
                >
                  <div className="pt-3 flex items-center space-x-3">
                    <div className="w-3/12">
                      <img
                        src={
                          user?.photoName
                            ? `${user.photoName}`
                            : profile
                        }
                        alt="/"
                        className="rounded-full w-10 h-10"
                      />
                    </div>
                    <div className="flex justify-between w-60">
                      <div className="items-center justify-between">
                        <p className=" rounded-full text-sm  text-gray-primary font-medium">
                          {user.name}
                        </p>
                        <div className="rounded-full text-xs  text-gray-primary font-medium w-28">
                          <span>Blood Group: </span>
                          <span className="font-normal">{user.bloodGroup}</span>
                        </div>
                      </div>
                      <div className="text-xs">
                        <span
                          className={`bg-brand-${memberColor[user.relation]
                            } px-2  p-1 text-xs rounded-2xl text-white`}
                        >
                          {user.relation}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        }
      </div>
      <div className="mx-3 mt-6 md:mt-8 lg:hidden lg:my-9">
        <div className="text-center mt-6 lg:mt-8 my-6">
          <span className="mx-3 text-black-500 font-bold text-xl md:text-2xl">
            My Family
          </span>
        </div>
        <div className="md:mt-1 overflow-x-scroll grid grid-flow-row-dense grid-cols-2 sm:grid-cols-4 md:grid-cols-5">
          {FamilymembersData.length > 0 && FamilymembersData.map((user, i) => (
            <div key={i} className="m-auto md:mt-2  sm:mt-2  mt-2 justify-center text-center content-center w-36 lg:w-48 items-center rounded-md border border-brand-nurse">
              <img src={
                user?.photoName
                  ? `${user.photoName}`
                  : profile
              } alt="" className="rounded-md m-auto h-24 mt-1" />
              <div className="w-full px-1 py-1 flex justify-center">
                <span
                  className={`bg-brand-${memberColor[user.relation]
                    } relative bottom-5 mt-5 w-44 px-6 py-1 text-md rounded-2xl text-white`}
                >
                  {user.relation}
                </span>
              </div>
              <p className=" rounded-full text-sm w-11/12 m-auto break-all  text-gray-primary font-medium">
                {user.name}
              </p>
              <div className="rounded-full text-xs pb-2  text-gray-primary font-medium">
                <span>Blood Group: </span>
                <span className="font-normal">{user.bloodGroup}</span>
              </div>
            </div>
          ))}
          {/* <div className="h-24 w-24 justify-center text-center content-center  items-center rounded-full border border-brand-nurse">
                        <img src={Add} alt="/" className="rounded-full h-24 p-5" />
                        <span className="bg-green-500  relative bottom-5 mt-1 px-2 py-1 text-md rounded-2xl text-white">Add New</span>
                    </div> */}
        </div>
        <div
          onClick={redirectTo}
          className="rounded-xl w-64 px-1 m-auto my-10  items-center border border-brand-graynurse bg-white "
        >
          <div className=" py-2 flex gap-2 items-center justify-center cursor-pointer">
            <img src={Add} alt="/" className="rounded-full h-8 w-8" />
            <p className="inline rounded-full text-base  text-brand-primary font-medium">
              Add Family Member
            </p>
          </div>
        </div>
      </div>
      {showaddmemberpopup ? (
        <Addmemberpopup
          editmembers=""
          closePopup={() => setshowaddmemberpopup(!showaddmemberpopup)}
        />
      ) : null}
    </>
  );
}
export default FamilyMember;
