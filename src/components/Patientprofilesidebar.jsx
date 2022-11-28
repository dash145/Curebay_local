import React, { Fragment, useEffect, useState } from "react";
import location from "../Assets/Images/locash.svg";
import downarrow from "../Assets/Images/arrow.alt.down.svg";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getloggincheadminuser } from "../Redux/Actions/dashboardaction";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import {
  getLoginchepatientdetails,
  getparticularPatientdetails,
  getparticularPatientdetailsbynumber,
} from "../Redux/Actions/patientAction";
import patientService from "../Redux/services/patientService";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Patientprofileupbar(props) {
  const params = useParams();
  const history = useHistory();
  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };

  const [currrentdate, setCurrentdate] = useState("");
  const [patientFromLs, setPatientFromLs] = useState();
  const [activePatient, setActivePatient] = useState();

  const dispatch = useDispatch();

  const loggincheadminuserdetails = useSelector(
      (state) => state.loggincheadminuser
  );
  const { loggincheadminData } = loggincheadminuserdetails;

  const logginchepatientdetails = useSelector(
    (state) => state.logginedchepatientdetails
  );
  const { logginchepatientData } = logginchepatientdetails;

  const particularpatiendetailsbynumber = useSelector(
    (state) => state.particularpatiendetailsbynumber
  );
  const { particularpatientdetailsbynumberData } =
    particularpatiendetailsbynumber;

  const patientdetails = useSelector((state) => state.particularpatientdetails);
  const { particularpatientdetailsData } = patientdetails;
  const UserData = useSelector((state) => state.authReducer.userData);

  const viewprofile = (e, pat) => {
    e.preventDefault();
    console.log(pat.code);
    localStorage.setItem("patientprofile", pat.code);
    history.push({
      pathname: "/profile/mydetails",
      patientcode: pat.code,
    });
  };

  const checkInUser = (e, user, parent) => {
    console.log(user);
    setActivePatient(user);
    localStorage.setItem("activePatient", JSON.stringify(user));
    localStorage.setItem("patientprofile", user.code);
    localStorage.setItem("patientloggineduser", user.mobile ?? parent.mobile);
    localStorage.setItem("patientlogginedusercode", user.code);
    /*history.push({
      pathname: "/profile/mydetails",
      patientcode: user.code,
    });*/
    props.patientChanged();
    //refreshhistory.go(0);
  };

  const changeActivePatient = (user) => {
    console.log('Patient Updated : ' + user.code);
    setActivePatient(user);
    localStorage.setItem("activePatient", JSON.stringify(user));
    localStorage.setItem("patientprofile", user.code);
    //localStorage.setItem("patientloggineduser", user.mobile ?? parent.mobile);
    localStorage.setItem("patientlogginedusercode", user.code);
    /*history.push({
      pathname: "/profile/mydetails",
      patientcode: user.code,
    });*/
    props.patientChanged();
  }


  //   useEffect(() => {
  //     if (props.refresh) {
  //       console.log('Refresh Called');
  //       let patient = localStorage.getItem("patientlogginedusercode");
  //       if (patient) {
  //         patientService.getparticularpatientdetails(patient).then((res) => {
  //           if (res.data) {
  //             console.log(res.data);
  //             let patient = res.data;
  //             const patientList = localStorage.getItem("patientsObj")
  //               ? JSON.parse(localStorage.getItem("patientsObj"))
  //               : [];

  //             const index = patientList.findIndex((element) => element.code === patient.code);
  //             patientList.forEach(element => {
  //               console.log(element.code);
  //             });
  //             console.log(patient.code);
  //             console.log(index);
  //             if (index != -1) {
  //               patientList[index] = patient;
  //               console.log(JSON.stringify(patientList));
  //               localStorage.setItem("patientsObj", JSON.stringify(patientList));
  //               changeActivePatient(patient);
  //             }
  //           }
  //         }, (err) => {
  //           console.log(err);
  //         })
  //       }
  //     }
  //   }, [props.refresh]);

  // useEffect(() => {
  //   setPatientFromLs(JSON.parse(localStorage.getItem("patientsObj")));
  //   if (patientFromLs && patientFromLs.length) {
  //     const lcPatient = JSON.parse(localStorage.getItem("activePatient"));
  //     // console.log(lcPatient);
  //     setActivePatient(lcPatient || patientFromLs[0]);
  //   }
  // }, []);

  useEffect(() => {
    let patientFormLogs = JSON.parse(localStorage.getItem("patientsObj"));
    setPatientFromLs(JSON.parse(localStorage.getItem("patientsObj")));

    if (patientFormLogs && patientFormLogs.length) {
      const lcPatient = JSON.parse(localStorage.getItem("activePatient"));
      console.log('Active : ' + JSON.stringify(lcPatient))
      setActivePatient(lcPatient || patientFormLogs[0]);
    }

    if (particularpatientdetailsbynumberData.length !== 0) {
      const patientcode = particularpatientdetailsbynumberData[0].mobile;
    }
  }, []);

  // patientFromLs removed this variable due to ram overloading

  useEffect(() => {
    let patient = localStorage.getItem("patientloggineduser");
    console.log("patient", patient);

    dispatch(getloggincheadminuser(UserData.code));
    dispatch(getparticularPatientdetailsbynumber(patient));

    // dispatch(getparticularPatientdetails(patient))
    // console.log(particularpatientdetailsData)
    // dispatch(getLoginchepatientdetails(patient))
    console.log("numberrrrrrrrrrrrr", particularpatientdetailsbynumberData);
  }, [dispatch]);
  return (
    <>
      <div class="overflow-hidden px-10 py-4">
        <div class="flex justify-between">
          {loggincheadminData.slice(0, 1).map((user, i) => (
            <div class="flex space-x-3">
              {/* <img src={user.photo ? `data:image/jpeg;base64,${user.photo}` : profileimg} alt="profile image" class="w-12" /> */}
              {user.photoName ? (
                <div>
                  <img
                    src={`${process.env.REACT_APP_IMG_BASEURL + user.photoName}`}
                    alt="profile img"
                    class="w-14 profileRound"
                    style={{ borderRadius: '50%' }}
                  />
                </div>
              ) : (
                <div className="bg-white p-3 w-14 flex justify-center      rounded-lg">
                  <span className="font-medium text-2xl">
                    {user.firstName.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <p class="text-xl text-gray-700 font-normal ">
                  {user.firstName} {user.lastName}
                </p>
                <div class="flex space-x-2">
                  <p class="text-xs text-gray-400  ">
                    {user.hospitalName}
                  </p>
                </div>
                <div class="flex space-x-2">
                  <img src={location} alt="location" />
                  <p class="text-xs text-gray-400  ">
                    {user.city ? user.city : `Bhubaneswar`}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div class="flex flex-wrap justify-end">
            {/* <p class="text-xs text-gray-900 font-medium ">{currrentdate} </p> */}

            {activePatient ? (
              <>
                {/* {patientFromLs
                    .slice(0, 1)
                    .map((user, i) => ( */}
                <div class="flex flex-wrap justify-end mr-16">
                  {/* <img src={user.photo ? `data:image/jpeg;base64,${user.photo}` : profileimg} alt="profile image" class="w-12" /> */}
                  {activePatient.photoName ? (
                    <div>
                      <img
                        src={`${process.env.REACT_APP_IMG_BASEURL + activePatient.photoName}`}
                        alt="profile img"
                        class="w-14 profileRound"
                      />
                    </div>
                  ) : (
                    <div className="bg-white p-3 w-14 flex justify-center      rounded-lg">
                      <span className="font-medium text-2xl">
                        {activePatient.firstName.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div class="pl-3">
                    <p class="text-sm text-gray-700 font-normal  font-medium">
                      {activePatient.firstName ? activePatient.firstName : '' + ' ' + activePatient.lastName ? activePatient.lastName : ''}
                    </p>

                    <button
                      onClick={(e) => viewprofile(e, activePatient)}
                      className="text-brand-secondary pt-1 font-medium  text-xs"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
                {/* ))} */}
              </>
            ) : null}

            {patientFromLs?.length > 0 && (
              <div className="absolute">
                <Menu as="div" className="mt-3 relative ">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button
                          className={`${!UserData.id && "hidden"
                            } flex text-sm rounded-full focus:outline-none`}
                        >
                          <span className="sr-only">Open menu</span>
                          {/* <img src={profile} alt="" /> */}
                          <div className="p-3 flex justify-center  w-10 h-15  ">
                            <ChevronDownIcon />
                          </div>
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          {patientFromLs?.map((user) => {
                            return (
                              <Menu.Item onClick={(e) => checkInUser(e, user)}>
                                {({ active }) => (
                                  <div
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-6 py-2 cursor-pointer"
                                    )}
                                  >
                                    <div className={"text-black"}>
                                      {user.firstName + " " + user.lastName}
                                    </div>
                                    <div className="text-xs">
                                      {user.mobile ?? ""}
                                    </div>
                                  </div>
                                )}
                              </Menu.Item>
                            );
                          })}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Patientprofileupbar;
