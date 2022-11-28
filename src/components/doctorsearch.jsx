import { useEffect, useState } from "react";
import akshay from "../Assets/Images/akshay.png";
import Chat from "../Assets/Images/person.svg";
import Video from "../Assets/Images/videocall.svg";
import noDataFound from "../Assets/Images/No data-found.svg";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorslist } from "../Redux/Actions/doctorAction";
import { useHistory, useLocation } from "react-router-dom";
import { clearDoctorData } from "../Redux/Actions/doctorAction";
import DoctorSlots from "./DoctorSlots";
import useGAEventsTrackers from "../config/useGAEventsTrackers";
import InfiniteScroll from "react-infinite-scroller";
import female_icon from '../Assets/Images/Female-Vector-icon.svg';
import male_icon from '../Assets/Images/Male-Vector-icon.svg';



function Doctorsearch(props) {
  console.log(props, "hey props");
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const GAEventsTrackers = useGAEventsTrackers();

  const { speciality, healthConcerns } = location;
  //const doctorlist = useSelector((state) => state.doctorlist);
  //  const { doctorData, total, currentPage } = doctorlist;
  const particulardoctor = useSelector((state) => state.particulardoctor);
  const { particularDoct } = particulardoctor;
  const userData = useSelector((state) => state.authReducer.patientData);
  const specialistDoctor = useSelector(
    (state) => state.particulardoctorspeciality
  );
  const { specialityData, isLoading } = specialistDoctor;
  const { slotData } = useSelector((state) => state.doctorsslot);
  const doctorsAppointment = useSelector(
    (state) => state.doctorAppointmentList
  );
  const { doctorappointmentList } = doctorsAppointment;
  const [stateindex, setIndex] = useState(-1);
  const { coords } = useSelector((state) => state.authReducer);
  const search = useSelector((state) => state.authReducer.search);
  const [currentPinCode, setCurrentPincode] = useState("");
  const [doctorData, setsearchData] = useState([]);
  const [isFetchingPinCode, setIsFetchingPinCode] = useState(false);
  const [position, setPosition] = useState({});


  const [pageStart, setPageStart] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const viewprofile = (e, doct) => {
    e.preventDefault();
    history.push(`/doctors/${doct.userId}`);
  };



  const onDoctorSelect = (e, doct) => {
    e.preventDefault();
    history.push(`/doctors/${doct.userId}`);
    GAEventsTrackers("Doctor", "Book Apointment", "Book Apointment");
  };

  const loadFunc = async () => {
    let searchKey=""

    if(speciality || healthConcerns){
        searchKey=  speciality ? speciality : healthConcerns

    }else{
        searchKey=""
    }
    //getPinCode();
    dispatch(getDoctorslist(coords, searchKey, pageStart, 20)).then((res) => {
      console.log("add doctor data", JSON.stringify(res));
      if (res.length === 0) {
        //history.goBack();


        setHasMore(false);
      } else {

        if (doctorData.length) {
          if(res.length<4){
            setHasMore(false);
            return
          }
          setsearchData([...doctorData, ...res]);
        } else {
          setsearchData(res);

        }
        setPageStart(pageStart + 1);
        setHasMore(true);
      }
    });






  };
  const handleImgError = (e , gender) => {
		if(gender==="M"){
			e.target.src=male_icon;
		} else{
			e.target.src=female_icon;
		}
	};


  return (
    <>
      <div className="">

        <ul className="lg:flex  text-brand-secondary text-sm lg:text-base px-3  pt-5">
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
            <a >Doctor</a>
            
          </li>
          
        </ul>
        <div className="lg:block text-gray-primary font-medium text-lg px-3 my-1  my-4">
          Available Doctors
        </div>
        <div className=" justify-end py-4 px-4">

            {doctorData.length === 0 && (
              <div className="w-full flex flex-col items-center justify-around">
                <img
                  className="h-24 lg:h-28 mt-5 lg:mt-0 "
                  src={noDataFound}
                  alt="No Diagnostics Appointments Available"
                />
                <h4 className="font-medium  text-brand-lightgreen text-md">
                Sorry, we don't have a specialist right now but we will be adding soon.
                </h4>
              </div>
            )}

            <div
              style={{
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse",

              }}
            >
              <InfiniteScroll


               initialLoad={true}
                pageStart={0}
                loadMore={(e) => loadFunc(e)}
                hasMore={hasMore &&!isLoading}
                className="w-full"


                loader={
                  <div  className="flex flex-wrap justify-center pl-10 pr-10 pb-10">
                    <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
                  </div>
                }
              >
                { doctorData.length > 0 && doctorData.map((doct, i) => {
                  return (
                    <div   key={i} className="flex sm:block md:block lg:block border border-gray-200 shadow-md pb-1 sm:pb-5 md:pb-5 lg:pb-5 rounded-md mb-5 sm:mb-5 md:mb-5 lg:mb-5">
                      <div className="pt-5 sm:pt-5 md:pt-2 lg:pt-2 px-2 lg:pb-5 mb-3 md:mb-0 h-auto md:h-48 ">
                        <div className="flex justify-around md:justify-between lg:justify-between flex-wrap md:flex-nowrap">
                          <div className="md:px-4 md:pt-4 p-0 m-0 md:mr-2 bg-teal-600 w-full md:w-auto">
                            <div className="flex px-3 md:p-0">
                            <img src={doct.userPhoto ? `${process.env.REACT_APP_IMG_BASEURL}${doct.userPhoto}` : doct.gender === "M" ? male_icon : female_icon}
                                alt="akshay"
                                className="border rounded-full md:rounded-xl w-24 h-24 object-cover md:w-16 md:h-16"
                                onError={(e) => handleImgError(e , doct.gender)}

                              />
                              <div className="pl-4">
                                <p className="text-lg font-semibold md:font-normal">
                                  {doct.userSalutation} {doct.userName}
                                </p>
                                <p className="text-md font-semibold sm:text-md  md:text-md lg:text-sm  text-brand-primary pt-1">
                                  {doct.specialities ? doct.specialities : ""}
                                </p>
                                <p className="text-md font-semibold sm:text-md  md:text-md lg:text-sm  text-brand-primary pt-1">
                                  {doct?.yearOfExperience} years experience
                                </p>
                                <div className="flex">
                                  <p className=" items-center text-md md:text-lg flex font-thin mt-1 ">
                                    {/* <LocationMarkerIcon color="#5dbb63" className="h-5 mr-2 relative" /> */}
                                    <span className="text-md font-semibold sm:text-md  md:text-md lg:text-sm  text-brand-primary pt-1">
                                      {doct.city ? doct.city : "NA"}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 w-4/5 md:w-auto flex md:block justify-between px-3 md:p-0">
                            <div className="hidden md:flex gap-4 justify-end">
                              {/* <div className="h-8 w-8 rounded-lg p-2 bg-green-100">
                                <img src={Chat} alt="chaticon" />
                              </div> */}
                              <div className="h-8 w-8 rounded-lg p-2 bg-blue-100">
                                <img src={Video} alt="videoicon" />
                              </div>
                            </div>
                            <div className="w-full my-2">
                              {/* {doct.inPersonConsultCharges && (
                                <div className="flex md:block justify-between">
                                  <p className="text-green-500  text-sm flex md:justify-end font-thin mt-3">
                                    {" "}
                                    In Person: ₹
                                    {doct.inPersonConsultCharges
                                      ? doct.inPersonConsultCharges
                                      : ``}
                                  </p>
                                  <div className="w-6 mr-1 h-6 mt-1 flex md:hidden flex-wrap   content-center  rounded-lg justify-center">
                                    <img
                                      src={Chat}
                                      alt="chaticon"
                                      className="h-7 w-7"
                                    />
                                  </div>
                                </div>
                              )} */}

                              {doct.videoConsultCharges && (
                                <div className="flex md:block justify-between">
                                  <p className="text-blue-600  text-sm flex md:justify-end font-thin mt-1">
                                    {" "}
                                    Video Consultation: ₹
                                    {doct.videoConsultCharges
                                      ? doct.videoConsultCharges
                                      : ``}
                                  </p>
                                  <div className="w-6 mr-1 h-6 mt-1 flex md:hidden flex-wrap  content-center  bg-blue-200 rounded-lg justify-center">
                                    <img
                                      src={Video}
                                      alt="videoicon"
                                      className="h-4 w-4"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <hr className="mt-2 mb-4  border-gray-100 hidden md:block" />
                        <div className="  md:float-right flex  md:block justify-center sm:justify-end md:justify-end lg:justify-end pr-3 mt-3 md:mt-0 md:p-0">
                          <div className="flex  gap-4 ">
                            <button
                              onClick={(e) => viewprofile(e, doct)}
                              className="block sm:block bg-transparent hover:bg-brand-secondary text-brand-secondary font-medium hover:text-white py-1 px-7 lg:px-2 border border-brand-secondary hover:border-transparent rounded-md text-sm"
                            >
                              View Profile
                            </button>
                            <button
                              onClick={(e) => onDoctorSelect(e, doct)}
                              className="block sm:block  bg-brand-secondary hover:bg-brand-secondary text-white font-medium py-2 px-2 lg:px-6 rounded-md text-sm"
                            >
                              Book Appointment
                            </button>
                          </div>
                        </div>
                        {/* <hr className='block md:hidden w-full mt-4' /> */}
                      </div>
                      {stateindex == i && (
                        <DoctorSlots
                          doctorsAppointment={doctorappointmentList}
                          userData={userData}
                          slots={slotData}
                          doctorData={particularDoct}
                          fees={
                            particularDoct &&
                            particularDoct?.userConsultationFees?.length > 0 &&
                            particularDoct.userConsultationFees[0]
                          }
                        />
                      )}
                      {/* <hr className="font-normal border-1" /> */}
                    </div>
                  );
                })}
              </InfiniteScroll>
            </div>

        </div>
        <br />
      </div>
    </>
  );
}
export default Doctorsearch;

