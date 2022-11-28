import React, { useState, useEffect } from 'react'

import { PlusIcon, DotsVerticalIcon } from '@heroicons/react/outline'
import { APP_ROUTES } from '../../application/Router/constants/AppRoutes';
import NoAppointmentData from '../NoAppointmentData';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import AddAllergy from "./AddAllergy";
import Addmedication from "./Addmedication";
import Addmedicalhistory from "./Addmedicalhistory";
import Addfamilyhistory from "./Addfamilyhistory";
import Addsurgicalhistory from "./Addsurgicalhistory";
import Addsocialhistory from "./Addsocialhistory";
import AddChronicalHistory from "./AddChronicalHistory";
//import Addmedicalcondition from "./AddmedicalCondition.";

import { getLocalTime } from '../../Assets/utils/LocalTimeFormat'


function DetailCard(props) {
  const history = useHistory();
  const location = useLocation();
  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location);
  };

  const [showaddallergypopup, setshowaddallergypopup] = useState(false);
  const [showhealthrestrictionpopup, setshowhealthrestrictionpopup] =
    useState(false);
  const [showmedicationpopup, setshowmedicationpopup] = useState(false);
  const [showmedicalhistorypopup, setshowmedicalhistorypopup] = useState(false);
  const [showsurgicalhistorypopup, setshowsurgicalhistorypopup] = useState(false);
  const [showfamilyhistorypopup, setshowfamilyhistorypopup] = useState(false);
  const [showsocialhistorypopup, setshowsocialhistorypopup] = useState(false);
  const [showchronicalhistorypopup, setshowchronicalhistorypopup] = useState(false);
  const [showmedicalconditionpopup, setshowmedicalconditionpopup] =
    useState(false);

  const [editallergy, seteditallergy] = useState();
  const [edithealthrestrictions, setedithealthrestrictions] = useState();
  const [editmedication, seteditmedication] = useState();
  const [editmedicalhistory, seteditmedicalhistory] = useState();
  const [editsurgicalhistory, seteditsurgicalhistory] = useState();
  const [editfamilyhistory, seteditfamilyhistory] = useState();
  const [editsocialhistory, seteditsocialhistory] = useState();
  const [editchronicalhistory, seteditchronicalhistory] = useState();
  const [editmedicalcondition, seteditmedicalcondition] = useState();

  const [addTitle, setAddTitle] = useState('');
  const [addType, setAddType] = useState('');

  const [medicalcondition, setmedicalcondtion] = useState(true);

  const addallergy = (event, data) => {
    event.preventDefault();
    setshowaddallergypopup(true);
    seteditallergy(data);
  };

  const addhealthrestrictions = (event, data) => {
    event.preventDefault();
    setshowhealthrestrictionpopup(true);
    setedithealthrestrictions(data);
  };

  const addmedication = (event, data) => {
    event.preventDefault();
    setshowmedicationpopup(true);
    seteditmedication(data);
  };

  const addmedicalhistory = (event, data) => {
    event.preventDefault();
    setshowmedicalhistorypopup(true);
    seteditmedicalhistory(data);
  };

  const addsurgicalhistory = (event, data) => {
    event.preventDefault();
    setshowsurgicalhistorypopup(true);
    seteditsurgicalhistory(data);
  };

  const addfamilyhistory = (event, data) => {
    event.preventDefault();
    setshowfamilyhistorypopup(true);
    seteditfamilyhistory(data);
  };

  const addsocialhistory = (event, data) => {
    event.preventDefault();
    setshowsocialhistorypopup(true);
    seteditsocialhistory(data);
  };



  const addchronicalhistory = (event, data) => {
    event.preventDefault();
    setshowchronicalhistorypopup(true);
    seteditchronicalhistory(data);
  };

  const addmedicalcondition = (event, data) => {
    event.preventDefault();
    setshowmedicalconditionpopup(true);
    seteditmedicalcondition(data);
  };
  console.log('iddidididi', JSON.stringify(props?.data))


  const loadData = () => {


    props.loadData();

  }


  return (
    <div class="w-auto mx-4 sm:mx-0 md:w-80 lg:w-96 p-4 border border-gray-200 rounded-xl justify-between my-3 h-56 overflow-hidden" style={{ borderRadius: "7px" }}>
      <div class="flex justify-between mb-2 px-1">

        <p class="text-sm  font-semibold text-neutral-800 cursor-pointer">
          {props.heading}
        </p>

        {props?.seeAll ? (
          <div className="flex space-x-3 -mr-1">
            {props?.data?.length === 0 ? null : (
              props.heading !== "Chronic Conditions" ? (
                <p
                  onClick={(e) => redirectTo(e, props.seeAll)}
                  class="inline underline text-xs font-semibold cursor-pointer"
                  style={{ color: "#18406D" }}
                >
                  See all
                </p>
              ) : null

            )}

            {false ? null : (
              <>
                {props?.heading === "Allergy Details" ? (
                  <PlusIcon
                    onClick={(e) => addallergy(e, "")}
                    className="h-5  text-white cursor-pointer"
                    style={{ background: "#4FAFD9" }}
                  />
                ) : null}
              </>
            )}

            {false ? null : (
              <>
                {props?.heading === "Health Restriction" ? (
                  <PlusIcon
                    onClick={(e) => addhealthrestrictions(e, "")}
                    className="h-5  text-white cursor-pointer"
                    style={{ background: "#4FAFD9" }}
                  />
                ) : null}
              </>
            )}

            {false ? null : (
              <>
                {props?.heading === "Medication" ? (
                  <PlusIcon
                    onClick={(e) => addmedication(e, "")}
                    className="h-5  text-white cursor-pointer"
                    style={{ background: "#4FAFD9" }}
                  />
                ) : null}
              </>
            )}

            {false ? null : (
              <>
                {props?.heading === "Medical History" ? (
                  <PlusIcon
                    onClick={(e) => addmedicalhistory(e, "",)}
                    className="h-5  text-white cursor-pointer"
                    style={{ background: "#4FAFD9" }}
                  />
                ) : null}
              </>
            )}

            {false ? null : (
              <>
                {props?.heading === "Medical Condition" ? (
                  <PlusIcon
                    onClick={(e) => addmedicalcondition(e, "")}
                    className="h-5  text-white cursor-pointer"
                    style={{ background: "#4FAFD9" }}
                  />
                ) : null}
              </>
            )}

            {false ? null : (
              <>
                {props?.heading === "Surgical History" ? (
                  <PlusIcon
                    onClick={(e) => addsurgicalhistory(e, "")}
                    className="h-5  text-white cursor-pointer"
                    style={{ background: "#4FAFD9" }}
                  />
                ) : null}
              </>
            )}

            {false ? null : (
              <>
                {props?.heading === "Family History" ? (
                  <PlusIcon
                    onClick={(e) => addfamilyhistory(e, "")}
                    className="h-5  text-white cursor-pointer"
                    style={{ background: "#4FAFD9" }}
                  />
                ) : null}
              </>
            )}

            {false ? null : (
              <>
                {props?.heading === "Social History" ? (
                  <PlusIcon
                    onClick={(e) => addsocialhistory(e, "")}
                    className="h-5  text-white cursor-pointer"
                    style={{ background: "#4FAFD9" }}
                  />
                ) : null}
              </>
            )}

            {false ? null : (
              <>
                {props?.heading === "Chronic Conditions" ? (
                  <PlusIcon
                    onClick={(e) => addchronicalhistory(e, "")}
                    className="h-5  text-white cursor-pointer"
                    style={{ background: "#4FAFD9" }}
                  />
                ) : null}
              </>
            )}

            {/* <PlusIcon onClick={(e) => redirectTo(e, props.location)} className="h-5  text-white cursor-pointer"
                    style={{background:"#4FAFD9"}} /> */}
          </div>
        ) : null}
      </div>
      <hr className="mt-2" />

      {/* allergy card starts here */}

      {
        props?.data?.length === 0 && props?.heading === "Allergy Details" ? <p className="text-center item-center mt-16 mb-20  ">No Allergy Details</p> :

          <>
            {
              props?.data?.length > 0 && props?.heading === "Allergy Details" &&

              <div className="overflow-auto overflow-y-scroll scroll-bar bg-white ring-1 ring-gray-600 ring-opacity-5 h-40 ">
                {props?.data?.
                  sort((a, b) => {
                    return (
                      moment(b.createdDate, "yyyy-MM-DD HH:mm:ss") - moment(a.createdDate, "yyyy-MM-DD HH:mm:ss")
                    );
                  })
                  .map((user, i) => (
                    <>
                      <div key={i} className="flex py-2 px-2">
                        <div
                          className={`flex ${props.icon ? " " : "justify-between "
                            }flex-wrap  my-1  font-normal w-full`}
                        >
                          {props.icon && (
                            <div>
                              <img src={props.icon} />
                            </div>
                          )}
                          {!props.icon ? (
                            <div className='w-full'>
                              {/* <div className="mt-1 p-1">
                                  <p className="text-gray-700 text-right font-semibold  text-xs ">
                                    Chemical Allergy : {user.chemicalAllergy}
                                  </p>
                                </div>
                                <div className="mt-1 p-1 align-left">
                                  <p className="text-gray-700 text-right font-semibold  text-xs ">
                                    Food Allergy : {user.foodAllergy}
                                  </p>
                                </div> */}
                              <span class="mt-1  text-netural-800  font-normal  text-xs content-center flex flex-wrap ">
                                <span className='w-28'>Drug Allergy</span> <span className='mr-6 '>:</span>{user.drugAllergy}
                              </span>
                              <span className="mt-1 text-netural-800 font-normal  text-xs content-center flex flex-wrap ">
                                <span className='w-28'>Chemical Allergy</span> <span className='mr-6 '>:</span> {user.chemicalAllergy}
                              </span>
                              <span className="mt-1  text-netural-800 font-normal  text-xs content-center flex flex-wrap ">
                                <span className='w-28'>Food Allergy</span> <span className='mr-6 '>:</span> {user.foodAllergy}
                              </span>
                              <div className="mt-1 w-max  text-netural-800 font-semibold mt-2 text-xs content-center flex flex-wrap px-4 py-2" style={{ color: "#66B889", backgroundColor: "#F6FCF7", borderRadius: "5px" }} >
                                Check up Date: {getLocalTime(user.givenDate.split(" ")[0])}
                              </div>
                            </div>
                          ) : null}
                          <div className="flex">
                            <div className=" font-semibold  text-right text-sm">

                              {/* <div className="mt-1 p-1">
                                  <p className="text-gray-700 text-right font-semibold  text-xs ">
                                    Drug Allergy:{user.drugAllergy}
                                  </p>
                                </div> */}

                              {/* <div className="">
                                  <span className="text-brand-lightgreen text-right font-semibold  text-xs ">
                                    Check up Date : {moment(user.givenDate).format("DD/MM/yyyy")}
                                  </span>
                                </div> */}
                            </div>
                            {/* <div>
                                <DotsVerticalIcon
                                  onClick={(e) => addallergy(e, user)}
                                  className="cursor-pointer text-gray-secondary h-6 mt-2 relative left-3"
                                />
                              </div> */}
                          </div>
                        </div>
                      </div>
                      {i !== 1 && <hr className="mt-2" />}
                    </>

                  ))
                }
              </div>}
          </>
      }









      {/* allergy card ends here */}

      {/* health restrictioncard starts here */}

      {props?.data?.length === 0 && props?.heading === "Health Restriction" ? (
        <p className="text-center item-center mt-20 mb-20  ">
          No Health Restriction
        </p>
      ) : (
        <>
          {props?.heading === "Health Restriction"
            ? props?.data?.slice(0, 2).map((user, i) => (
              <>
                <div key={i} className="flex py-2 px-2">
                  <div
                    className={`flex ${props.icon ? " " : "justify-between "
                      }flex-wrap  my-1  font-normal w-full`}
                  >
                    {props.icon && (
                      <div>
                        <img src={props.icon} />
                      </div>
                    )}
                    {!props.icon ? (
                      <div>
                        <span class="text-base text-gray-primary normal  ">
                          {user.drugAllergy}
                        </span>
                        <span className="mt-1  text-gray-primary font-thin  text-sm content-center flex flex-wrap ">
                          Mild
                        </span>
                      </div>
                    ) : null}
                    <div className="flex">
                      <div className=" font-semibold  text-right text-sm">
                        <div className="">
                          <span className="text-brand-lightgreen text-right font-semibold  text-xs ">
                            Check up Date : {getLocalTime(user.givenDate.split(" ")[0])}
                          </span>
                        </div>
                        <div className="mt-1 p-1">
                          <p className="text-gray-700 text-right font-semibold  text-xs ">
                            Reaction Type:{user.foodAllergy}
                          </p>
                        </div>
                      </div>
                      <div>
                        <DotsVerticalIcon
                          onClick={(e) => addhealthrestrictions(e, user)}
                          className="cursor-pointer text-gray-secondary h-6 mt-2 relative left-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {i !== 1 && <hr className="mt-2" />}
              </>
            ))
            : null}
        </>
      )}
      {/* health restrictioncard ends here */}

      {/* medication card starts here */}

      {props?.data?.length === 0 && props?.heading === "Medication" ? (
        <p className="text-center item-center mt-20 mb-20  ">No Medication</p>
      ) : (
        <div >
          {props?.data?.length > 0 && props?.heading === "Medication" &&

            <div className="overflow-auto overflow-y-scroll scroll-bar bg-white ring-1 ring-gray-600 ring-opacity-5 h-40 ">
              {props?.data?.map((user, i) => (
                <div className="">
                  <div key={i} className="flex flex-col py-2 px-2">
                    <div
                      className={`flex flex-col ${props.icon ? " " : "justify-between "
                        }flex-wrap  my-1  font-normal w-full`}
                    >
                      {props.icon && (
                        <div>
                          <img src={props.icon} />
                        </div>
                      )}
                      {!props.icon ? (
                        <div>
                          <span class="text-xs text-neutral-800 font-normal  ">
                            {user.drugName}
                          </span>

                        </div>
                      ) : null}
                      <div className="mt-1">
                        <p className="text-neutral-800 text-left font-normal  text-xs ">
                          <span className='font-bold text-xs'>Dosage Level:{" "}</span>
                          {user.dosage ? user.dosage : `Morning & Noon`}
                        </p>
                      </div>

                    </div>
                    <div className=" flex  mt-1 w-max  text-netural-800 font-semibold mt-2 text-xs content-center flex flex-wrap  py-2"  >
                      <p className="px-2 py-2 my-1" style={{ color: "#66B889", backgroundColor: "#F6FCF7", borderRadius: "5px" }}>From Date: {getLocalTime(user.startCreatedTime.split(" ")[0])}</p>
                      <p className="px-2 py-2 my-1 ml-2 " style={{ color: "#66B889", backgroundColor: "#F6FCF7", borderRadius: "5px" }}>To Date: {getLocalTime(user.endCreatedTime.split(" ")[0])}</p>
                    </div>
                  </div>
                  {i !== 1 && <hr className="mt-2" />}
                </div>
              ))}
            </div>
          }
        </div>
      )}
      {/* medication card ends here */}

      {/* medical history card starts here */}



      {
        props?.data?.length === 0 && props?.heading === "Medical History" ? <p className="text-center item-center mt-16 mb-20  ">No Medical History</p> :
          <>
            {
              props?.data?.length > 0 && props?.heading === "Medical History" &&

              <div className="overflow-auto overflow-y-scroll scroll-bar bg-white ring-1 ring-gray-600 ring-opacity-5 h-40 ">
                {props?.data?.
                  sort((a, b) => {
                    return (
                      moment(b.createdDate, "yyyy-MM-DD HH:mm:ss") - moment(a.createdDate, "yyyy-MM-DD HH:mm:ss")
                    );
                  }).

                  map((user, i) => (
                    <>
                      <div key={i} className="flex flex-col py-2 px-2">
                        <div
                          className={`flex ${props.icon ? " " : "justify-between "
                            }flex-wrap  my-1  font-normal w-full`}
                        >
                          {props.icon && (
                            <div>
                              <img src={props.icon} />
                            </div>
                          )}
                          {!props.icon ? (
                            <div>
                              <span class="text-xs font-normal text-gray-primary">
                                {user.description}
                              </span>
                            </div>
                          ) : null}

                        </div>
                        <div className="mt-1 w-max  text-netural-800 font-semibold mt-2 text-xs content-center flex flex-wrap px-4 py-2" style={{ color: "#66B889", backgroundColor: "#F6FCF7", borderRadius: "5px" }} >
                          Check up Date: {getLocalTime(user?.givenDate.split(" ")[0])}
                        </div>
                      </div>
                      {i !== 1 && <hr className="mt-2" />}
                    </>
                  ))
                }
              </div>}
          </>
      }

      {
        props?.data?.length === 0 && props?.heading === "Family History" ? <p className="text-center item-center mt-16 mb-20  ">No Family History</p> :
          <>
            {
              props?.data?.length > 0 && props?.heading === "Family History" &&

              <div className="overflow-auto overflow-y-scroll scroll-bar bg-white ring-1 ring-gray-600 ring-opacity-5 h-40 ">
                {props?.data?.
                  sort((a, b) => {
                    return (
                      moment(b.createdDate, "yyyy-MM-DD HH:mm:ss") - moment(a.createdDate, "yyyy-MM-DD HH:mm:ss")
                    );
                  }).

                  map((user, i) => (
                    <>
                      <div key={i} className="flex flex-col py-2 px-2">
                        <div
                          className={`flex ${props.icon ? " " : "justify-between "
                            }flex-wrap  my-1  font-normal w-full`}
                        >
                          {props.icon && (
                            <div>
                              <img src={props.icon} />
                            </div>
                          )}
                          {!props.icon ? (
                            <div>
                              <span class="text-xs text-neutral-800 font-normal  ">
                                {user.description}
                              </span>
                              {/* <span className="mt-1  text-gray-primary font-thin  text-sm content-center flex flex-wrap ">
                                  Relationship
                                </span> */}
                            </div>
                          ) : null}
                        </div>
                        <div className="mt-1 w-max  text-netural-800 font-semibold mt-2 text-xs content-center flex flex-wrap px-4 py-2" style={{ color: "#66B889", backgroundColor: "#F6FCF7", borderRadius: "5px" }} >
                          Check up Date: {getLocalTime(user.givenDate?.split(" ")[0])}
                        </div>
                      </div>
                      {i !== 1 && <hr className="mt-2" />}
                    </>
                  ))
                }
              </div>}
          </>
      }

      {
        props?.data?.length === 0 && props?.heading === "Surgical History" ? <p className="text-center item-center mt-16 mb-20  ">No Surgical History</p> :
          <>
            {
              props?.data?.length > 0 && props?.heading === "Surgical History" &&

              <div className="overflow-auto overflow-y-scroll scroll-bar bg-white ring-1 ring-gray-600 ring-opacity-5 h-40 ">
                {props?.data?.
                  sort((a, b) => {
                    return (
                      moment(b.createdDate, "yyyy-MM-DD HH:mm:ss") - moment(a.createdDate, "yyyy-MM-DD HH:mm:ss")
                    );
                  }).

                  map((user, i) => (
                    <>
                      <div key={i} className="flex flex-col py-2 px-2">
                        <div
                          className={`flex ${props.icon ? " " : "justify-between "
                            }flex-wrap  my-1  font-normal w-full`}
                        >
                          {props.icon && (
                            <div>
                              <img src={props.icon} />
                            </div>
                          )}
                          {!props.icon ? (
                            <div>
                              <span class="text-xs font-normal text-neutral-800 normal  ">
                                {user.description}
                              </span>
                              {/* <span className="mt-1  text-gray-primary font-thin  text-sm content-center flex flex-wrap ">
                                  Relationship
                                </span> */}
                            </div>
                          ) : null}

                        </div>
                        <div className="mt-1 w-max  text-netural-800 font-semibold mt-2 text-xs content-center flex flex-wrap px-4 py-2" style={{ color: "#66B889", backgroundColor: "#F6FCF7", borderRadius: "5px" }} >
                          Check up Date: {getLocalTime(user?.givenDate.split(" ")[0])}
                        </div>
                      </div>
                      {i !== 1 && <hr className="mt-2" />}
                    </>
                  ))
                }
              </div>}
          </>
      }

      {
        props?.data?.length === 0 && props?.heading === "Social History" ? <p className="text-center item-center mt-16 mb-20  ">No Social History</p> :
          <>
            {
              props?.data?.length > 0 && props?.heading === "Social History" &&

              <div className="overflow-auto overflow-y-scroll scroll-bar bg-white ring-1 ring-gray-600 ring-opacity-5 h-40 ">
                {props?.data?.
                  sort((a, b) => {
                    return (
                      moment(b.createdDate, "yyyy-MM-DD HH:mm:ss") - moment(a.createdDate, "yyyy-MM-DD HH:mm:ss")
                    );
                  }).

                  map((user, i) => (
                    <>
                      <div key={i} className="flex flex-col py-2 px-2">
                        <div
                          className={`flex ${props.icon ? " " : "justify-between "
                            }flex-wrap  my-1  font-normal w-full`}
                        >
                          {props.icon && (
                            <div>
                              <img src={props.icon} />
                            </div>
                          )}
                          {!props.icon ? (
                            <div>
                              <span class="text-xs text-netural-800 font-normal  ">
                                {user.description}
                              </span>
                              {/* <span className="mt-1  text-gray-primary font-thin  text-sm content-center flex flex-wrap ">
                                  Relationship
                                </span> */}
                            </div>
                          ) : null}

                        </div>
                        <div className="mt-1 w-max  text-netural-800 font-semibold mt-2 text-xs content-center flex flex-wrap px-4 py-2" style={{ color: "#66B889", backgroundColor: "#F6FCF7", borderRadius: "5px" }} >
                          Check up Date: {getLocalTime(user?.givenDate.split(" ")[0])}
                        </div>
                      </div>
                      {i !== 1 && <hr className="mt-2" />}
                    </>
                  ))
                }
              </div>}
          </>
      }


      {
        props?.data?.length === 0 && props?.heading === "Chronic Conditions" ? <p className="text-center item-center mt-16 mb-20  ">No Chronic Conditions</p> :
          <>
            {
              props?.data?.length > 0 && props?.heading === "Chronic Conditions" &&

              <div className="overflow-auto overflow-y-scroll scroll-bar bg-white ring-1 ring-gray-600 ring-opacity-5 h-40 ">
                {props?.data?.
                  map((user, i) => (
                    <>
                      <div key={i} className="flex py-2 px-2">
                        <div
                          className={`flex ${props.icon ? " " : "justify-between "
                            }flex-wrap  my-1  font-normal w-full`}
                        >
                          {props.icon && (
                            <div>
                              <img src={props.icon} />
                            </div>
                          )}
                          {!props.icon ? (
                            <div>
                              <span class="text-xs text-gray-primary font-normal  ">
                                {user.chronicDescription}
                              </span>
                              {/* <span className="mt-1  text-gray-primary font-thin  text-sm content-center flex flex-wrap ">
                                  Relationship
                                </span> */}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      {i !== 1 && <hr className="mt-2" />}
                    </>
                  ))
                }
              </div>}
          </>
      }

      {/* medical history card ends here */}

      {/* medical condition card starts here */}

      {props?.data?.length === 0 && props?.heading === "Medical Condition" ? (
        <p className="text-center item-center mt-20 mb-20  ">Not available</p>
      ) : (
        <>
          {props?.heading === "Medical Condition"
            ? props?.data?.slice(0, 2).map((user, i) => (
              <>
                <div key={i} className="flex py-2 px-2" >
                  <div
                    className={`flex ${props.icon ? " " : "justify-between "
                      }flex-wrap  my-1  font-normal w-full`}
                  >
                    {props.icon && (
                      <div>
                        <img src={props.icon} />
                      </div>
                    )}
                    {!props.icon ? (
                      <div>
                        <span class="text-base text-gray-primary normal  ">
                          Medical Condition
                        </span>
                        <span className="mt-1  text-gray-primary font-thin  text-sm content-center flex flex-wrap ">
                          Illness Type
                        </span>
                      </div>
                    ) : null}
                    <div className="flex">
                      <div className=" font-semibold  text-right text-sm">
                        <div className="">
                          <span className="text-brand-lightgreen text-right font-semibold  text-xs ">
                            Check up Date : 23 July 21
                          </span>
                        </div>
                        <div className="mt-1 p-1">
                          <p className="text-gray-700 text-right font-semibold  text-xs ">
                            End Date:{`23 August 21`}
                          </p>
                        </div>
                      </div>
                      <div>
                        <DotsVerticalIcon
                          onClick={(e) => addmedicalcondition(e, user)}
                          className="cursor-pointer text-gray-secondary h-6 mt-2 relative left-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {i !== 1 && <hr className="mt-2" />}
              </>
            ))
            : null}
        </>
      )}
      {/* medical condition card ends here */}

      {/* careplan card starts here */}

      {props?.data?.length === 0 && props?.heading === "Careplan" ? (
        <p className="text-center item-center mt-20 mb-20  ">Not available</p>
      ) : (
        <>
          {props?.heading === "Careplan"
            ? props?.data?.slice(0, 2).map((user, i) => (
              <>
                <div class="flex py-2 px-2" key={i}>
                  <div
                    className={`flex ${props.icon ? " " : "justify-between "
                      }flex-wrap  my-1  font-normal w-full`}
                  >
                    {props.icon && (
                      <div>
                        <img src={props.icon} />
                      </div>
                    )}
                    {!props.icon ? (
                      <div>
                        <span class="text-base text-gray-primary normal  ">
                          {user.description}
                        </span>
                        <span className="mt-1  text-gray-primary font-thin  text-sm content-center flex flex-wrap ">
                          Relationship
                        </span>
                      </div>
                    ) : (
                      <div className="px-1 py-1 lg:mr-0 mr-10">
                        <span className="px-1   font-thin text-sm  content-center flex flex-wrap ">
                          Full time nurse
                        </span>
                        <span className="mt-1 px-1  text-gray-primary font-thin  text-sm  content-center flex flex-wrap ">
                          24*7
                        </span>
                      </div>
                    )}
                    <div className="flex">
                      <div className=" font-semibold  text-right text-sm">
                        <div className="ml-40">
                          <span className="text-brand-lightgreen text-right font-semibold  text-xs ">
                            Expires
                          </span>
                        </div>
                        <div className="mt-1 p-1">
                          <p className="text-gray-700 text-right font-semibold  text-xs ">{`23 July`}</p>
                        </div>
                      </div>
                      <div>
                        {/* <DotsVerticalIcon onClick={(e) => redirectTo(e, APP_ROUTES.POST_CONSULTATION)} className="cursor-pointer text-gray-secondary h-6 mt-2 relative left-3" /> */}
                      </div>
                    </div>
                  </div>
                </div>
                {i !== 1 && <hr className="mt-2" />}
              </>
            ))
            : null}
        </>
      )}

      {/* careplan card ends here */}

      {/* all add popups starts here  */}

      {showaddallergypopup ? (
        <AddAllergy
          patient={props.patient}
          editallergy={editallergy}
          closePopup={() => setshowaddallergypopup(!showaddallergypopup)}
        ></AddAllergy>
      ) : null}

      {/* {showhealthrestrictionpopup ? (
          <AddHealthRestriction
            patient={props.patient}
            edithealthrestrictions={edithealthrestrictions}
            closePopup={() =>
              setshowhealthrestrictionpopup(!showhealthrestrictionpopup)
            }
          ></AddHealthRestriction>
        ) : null} */}

      {showmedicationpopup ? (
        <Addmedication
          patient={props.patient}
          editmedication={editmedication}
          closePopup={() => setshowmedicationpopup(!showmedicationpopup)}
        ></Addmedication>
      ) : null}

      {showmedicalhistorypopup ? (
        <Addmedicalhistory
          patient={props.patient}
          editmedicalhistory={editmedicalhistory}
          closePopup={() =>
            setshowmedicalhistorypopup(false)
          }
        ></Addmedicalhistory>
      ) : null}

      {showsurgicalhistorypopup ? (
        <Addsurgicalhistory
          patient={props.patient}
          editsurgicalhistory={editsurgicalhistory}
          loadData={() => {
            loadData()
          }}
          closePopup={() =>
            setshowsurgicalhistorypopup(!showsurgicalhistorypopup)
          }
        ></Addsurgicalhistory>
      ) : null}

      {
        showfamilyhistorypopup ? (
          <Addfamilyhistory
            patient={props.patient}
            editfamilyhistory={editfamilyhistory}
            loadData={() => {
              loadData()
            }}
            closePopup={() =>
              setshowfamilyhistorypopup(false)
            }
          ></Addfamilyhistory>
        ) : null}

      {showsocialhistorypopup ? (
        <Addsocialhistory
          patient={props.patient}
          editsocialhistory={editsocialhistory}
          loadData={() => {
            loadData()
          }}
          closePopup={() =>
            setshowsocialhistorypopup(false)
          }
        ></Addsocialhistory>
      ) : null}

      {showchronicalhistorypopup ? (
        <AddChronicalHistory
          patient={props.patient}
          //editsocialhistory={editchronicalhistory}
          loadData={() => {
            loadData()
          }}
          closePopup={() =>
            setshowchronicalhistorypopup(false)
          }
        ></AddChronicalHistory>
      ) : null}

      {/* {showmedicalconditionpopup ? (
          <Addmedicalcondition
            patient={props.patient}
            editmedicalcondition={editmedicalcondition}
            closePopup={() =>
              setshowmedicalconditionpopup(!showmedicalconditionpopup)
            }
          ></Addmedicalcondition>
        ) : null} */}
    </div>
  );
}
export default DetailCard;
