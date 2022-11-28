import { useEffect } from "react";
import akshay from "../Assets/Images/akshay.png";
import female_icon from '../Assets/Images/Female-Vector-icon.svg';
import male_icon from '../Assets/Images/Male-Vector-icon.svg';
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import { useState } from "react";
import { setLoginModal } from "../Redux/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorsslots, getParticularDoctors, getDoctorsAppointment } from "../Redux/Actions/doctorAction";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import DoctorSlots from "./DoctorSlots";
import NewDoctorSlots from "./NewDoctorSlots"
import DoctorSlotMobile from "./doctorSlotMobile";
import { Card } from "primereact/card";
import ic_doctor_loc from '../Assets/Images/ic_doctor_loc.svg';
import ic_doctor_exp from '../Assets/Images/ic_doctor_exp.svg';
import ic_doctor_edu from '../Assets/Images/ic_doctor_edu.svg';
import ic_consult_video from '../Assets/Images/ic_consult_video.svg';
import ic_consult_inperson from '../Assets/Images/ic_consult_inperson.svg';
import moment from 'moment';
function DrakshayShetty(props) {

  const dispatch = useDispatch();
  const params = useParams();

  const particulardoctor = useSelector((state) => state.particulardoctor);
  const { particularDoct, hospitalcliniclistData } = particulardoctor;
  const userData = useSelector((state) => state.authReducer.patientData);
  const { slotData } = useSelector((state) => state.doctorsslot);
  const doctorsAppointment = useSelector((state) => state.doctorAppointmentList);
  const { doctorappointmentList } = doctorsAppointment;
  const [carouseldata, setCarouselData] = useState();
  const [appointmentType, setAppointmentType] = useState("V");
  const [appointmentAmount, setAppointmentAmount] = useState(0);
  const [bg, setbgColor] = useState(true);
  const [feeDetails, setFeedetails] = useState({ videoConsFee: "", audioConsFee: "" });
  const [hospitalId, sethospitalId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)
  const [loading3, setLoading3] = useState(true)
  // const {bookedAppointments}=useSelector(state=>state.doctorsslot)
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    dispatch(getParticularDoctors(params.doctid)).then(res => setLoading1(false)).catch(err => setLoading1(false));
    dispatch(getDoctorsAppointment(params.doctid)).then(res => setLoading3(false)).catch(err => setLoading3(false));
  }, [dispatch, params]);


  // useEffect(()=>{
  //   dispatch(getDoctorsslots(params.doctid)).then(res => setLoading2(false)).catch(err => setLoading2(false));


  // },[slotData])

  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  // useEffect(() => {
  //   if (!userData?.id) {
  //     history.push({
  //       pathname: APP_ROUTES.LOGIN,
  //       state: { background: location, login: true },
  //     });
  //   }
  // }, []);

  useEffect(() => {
    if (hospitalcliniclistData.length > 0) {
      setLocationId(hospitalcliniclistData[0].locationId)
      sethospitalId(hospitalcliniclistData[0].hospitalId)
    }
  }, [hospitalcliniclistData.length]);

  useEffect(() => {
    let data = [];

    console.log('isssssssssssssss', JSON.stringify(particularDoct))
    if (particularDoct && particularDoct?.userConsultationFees?.length && particularDoct?.userConsultationFees[0]) {
      setFeedetails({
        videoConsFee: particularDoct?.userConsultationFees[0].videoConsFee != null ? particularDoct?.userConsultationFees[0].videoConsFee : 0.00,
        inPersonConsFee: particularDoct?.userConsultationFees[0].inPersonConsFee != null ? particularDoct?.userConsultationFees[0].inPersonConsFee : 0.00
      })
      if (particularDoct?.userConsultationFees[0].audioConsFee) {
        data.push({
          fee: particularDoct?.userConsultationFees[0].audioConsFee,
          text: "Audio Consult",
        });
      }
      if (particularDoct?.userConsultationFees[0].inPersonConsFee) {
        data.push({
          fee: particularDoct?.userConsultationFees[0].inPersonConsFee,
          text: "InPerson Consult",
        });
      }
      if (particularDoct?.userConsultationFees[0].quickConsultationFee) {
        data.push({
          fee: particularDoct?.userConsultationFees[0].quickConsultationFee,
          text: "Quick Consult",
        });
      }
      if (particularDoct?.userConsultationFees[0].VideoConsFee) {
        data.push({
          fee: particularDoct?.userConsultationFees[0].VideoConsFee,
          text: "Video Consult",
        });
      }
      setCarouselData(data);
    }

    console.log('dslkfklsdl',JSON.stringify(feeDetails))
  }, [particularDoct]);

  const getFeesStruture = (data) => {
    return (
      <>
        {data?.audioConsFee ? (
          <Card className="price-card">
            <div className="">
              <div className="  text-sm font-medium" style={{ color: "#02475B" }}>
                Audio Consult
              </div>
              <label style={{ color: "#1aaa2a", fontWeight: "600" }}>
                ₹ {data.audioConsFee}{" "}
              </label>
            </div>
          </Card>
        ) : (
          ""
        )}
        {data?.inPersonConsFee ? (
          <Card className="price-card">
            <div>
              <div
                className=" text-sm font-medium"
                style={{ color: "#02475B" }}
              >
                InPerson Consult
              </div>
              <label style={{ color: "#1aaa2a", fontWeight: "600" }}>
                ₹ {data.inPersonConsFee}
              </label>
            </div>
          </Card>
        ) : (
          ""
        )}
        {data?.quickConsultationFee ? (
          <Card className="price-card">
            <div>
              <div
                className=" text-sm font-medium"
                style={{ color: "#02475B" }}
              >
                Quick Consult
              </div>
              <label style={{ color: "#1aaa2a", fontWeight: "600" }}>
                ₹ {data.quickConsultationFee}
              </label>
            </div>
          </Card>
        ) : (
          ""
        )}
        {data?.VideoConsFee ? (
          <Card className="price-card">
            <div>
              <div
                className=" text-sm font-medium"
                style={{ color: "#02475B" }}
              >
                Video Consult
              </div>
              <label style={{ color: "#1aaa2a", fontWeight: "600" }}>
                ₹ {data.VideoConsFee}
              </label>
            </div>
          </Card>
        ) : (
          ""
        )}
      </>
    );
  };


  console.log(doctorappointmentList, "sdfsdvbsdfbvofdjvndf")

  const carouselTemplate = (data) => {
    console.log(data, "dsfsdgiuadgiufdgvuifd");
    return (
      <Card className="price-card m-4" style={{ width: "135px" }}>
        <div className="">
          <div
            className="  text-sm font-medium"
            style={{ color: "#02475B" }}
          >
            {data.text}
          </div>
          <label style={{ color: "#1aaa2a", fontWeight: "600" }}>
            ₹ {data.fee}{" "}
          </label>
        </div>
      </Card>
    );
  };

  if (loading1 && loading2 && loading3) {
    return (
      <div className="h-96 w-full flex justify-center items-center">
        <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
      </div>
    );
  }

  const onSelectHosptial = (e) => {
    let value = JSON.parse(e.target.value);
    console.log("value", value)
    setLocationId(value.locationId)
    sethospitalId(value.hospitalId)
  }
  console.log(particularDoct, "dsfildshfishdbfjkdbkjf");

  const handleImgError = (e, gender) => {
    if (gender === "M") {
      e.target.src = male_icon;
    } else {
      e.target.src = female_icon;
    }
  };

  return (
    <>
      <ul className="lg:flex hidden  text-brand-secondary  text-sm lg:text-base   pt-5 pb-4">
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
          <a  href="/doctors">Doctor</a>
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
          <a className="cursor-pointer"  onClick={() =>
                      history.push({
                        pathname: APP_ROUTES.DOCTOR_SEARCH,
                        speciality: particularDoct?.speciality,
                      })
                    }>{particularDoct?.speciality}</a>
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
          <p>
            {particularDoct.firstName} {particularDoct.lastName}
          </p>


        </li>
      </ul>
      <div className="flex mt-5 sm:mt-12 md:mt-0 lg:mt-0 gap-8 lg:gap-2 flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 xl:w-1/2 lg:mt-3 lg:bg-white rounded-md lg:p-6 px-2 h-full" style={{ boxShadow: "0 5px 20px 0 rgb(128 128 128 / 30%)", height: 'fit-content' }}>
          <div className="px-2 pt-4 flex justify-center sm:justify-center md:justify-start  ">
            <div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 justify-between">
              <div>
                <img className="mx-auto md:ml-0 rounded-md object-container object-top" src={particularDoct.photoName ? process.env.REACT_APP_IMG_BASEURL + particularDoct.photoName : particularDoct.gender === "M" ? male_icon : female_icon} alt="doctor"
                  onError={(e) => handleImgError(e, particularDoct.gender)}
                />
              </div>
              <div className="pl-1 md:pl-3 mt-3 sm:mt-3 md:mt-0 lg:mt-0">
                <h5 className="text-center md:text-left font-semibold not-italic text-xl "> {particularDoct?.salutation} {particularDoct?.firstName} {" "} {particularDoct?.lastName} {" "}</h5>
                <h6 className="text-center md:text-left text-xs text-gray-400 font-medium">{particularDoct?.speciality}</h6>
                <div className=" flex flex-wrap  mt-4 text-sm">
                  <div className="flex mr-3">
                    <img className="-ml-1" src={ic_doctor_edu} alt="right arrow" />
                    <span className="text-green-400 pl-1.5 text-md font-medium"> Qualification </span>
                  </div>
                  <label className="text-md font-medium " style={{ color: "#000000a6" }}>
                    {particularDoct?.qualification ? particularDoct?.qualification : ""}
                  </label>
                </div>

                <div className="flex  mt-1 text-sm">
                  <div className="flex mr-3">
                    <img className="-ml-0.5" src={ic_doctor_exp} alt="right arrow" />
                    <span className="text-green-400 pl-2 text-md font-medium">Year of Experience </span>
                  </div>
                  <label className="text-md font-medium" style={{ color: "#000000a6" }}>
                    {particularDoct.yearsOfExperience}yrs
                  </label>
                </div>

                <div className="flex  mt-1 text-sm">
                  <div className="flex mr-3">
                    <img className="" src={ic_doctor_loc} alt="right arrow" />
                    <span className="text-green-400 pl-2 text-md font-medium "> Location </span>
                  </div>
                  <label className="text-md font-medium" style={{ color: "#000000a6" }}>
                    {particularDoct?.city ? particularDoct?.city : ""}
                  </label>
                </div>

              </div>
            </div>
          </div>
          <hr className="mt-6" />
          <div className="about mt-3">
            <p className=" tw-12 h-8 not-italic font-bold text-lg leading-7 text-gray-900">
              About
            </p>
            <p
              className=" leading-6 mb-20 mx-3   not-italic font-normal text-sm leading-5 text-gray-900"
              style={{ color: "#000000a6" }}
            >
              {particularDoct.aboutMe ? particularDoct.aboutMe : `NA`}
            </p>
          </div>
          {/* <div className="w-full flex justify-end mt-8">
            <div className="flex lg:mt-0  justify-end mt-8 lg:mt-0">
              <img src={Chat} alt="chaticon" className="h-8 " />
              <div className="w-8 mr-4 h-8 flex flex-wrap  content-center  bg-blue-200 rounded-lg justify-center">
                <img src={Video} className="h-5 w-5" alt="" />
              </div>
            </div>
          </div> */}
          {/* <div className="pt-3 pr-8 lg:p-5  xl:p-10 lg:pl-0 w-full justify-between">
            <div className="md:flex justify-start w-full"> */}
          {/* <div className="mr-8 mb-2">
                <img
                  src={
                    particularDoct.photoName
                      ? process.env.REACT_APP_IMG_BASEURL + particularDoct.photoName
                      : akshay
                  }
                  alt="akshay"
                  height={250}
                  width={380}
                />
              </div> */}
          {/* <div className="px-4 w-full">
                <div className="flex">
                  <p
                    className="text-2xl "
                    style={{ color: "#02475b" }}
                  >
                    {particularDoct.salutation} {particularDoct.firstName}{" "}
                    {particularDoct.lastName}{" "}
                  </p>{" "}
                  <img src={exp} alt="exp" className="h-4 w-4 relative" />
                </div>
                <p className="text-brand-gunsmoke text-sm mt-3  ">
                  {particularDoct.specialityDept
                    ? particularDoct?.specialityDept
                    : ""}
                </p>
                <div className="grid  md:grid-cols-2 gap-4">
                  <div className="flex">
                    <div>
                      <AcademicCapIcon
                        height="25px"
                        width="25px"
                        style={{ color: "#0280af" }}
                      />
                    </div>
                    <div className="block ml-4 ">
                      <div
                        className="text-xs -mb-1"
                        style={{ color: "#0087BA" }}
                      >
                        {" "}
                        Education{" "}
                      </div>{" "}
                      <label className="text-sm" style={{ color: "#000000a6" }}>
                        {particularDoct?.qualification
                          ? particularDoct?.qualification
                          : ""}
                      </label>{" "}
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <LocationMarkerIcon
                        height="25px"
                        width="25px"
                        style={{ color: "#0280af" }}
                      />
                    </div>
                    <div className="block ml-4 ">
                      <div
                        className="text-xs -mb-1"
                        style={{ color: "#0087BA" }}
                      >
                        {" "}
                        Location{" "}
                      </div>{" "}
                      <label className="text-sm" style={{ color: "#000000a6" }}>
                        {particularDoct?.city ? particularDoct?.city : ""}
                      </label>{" "}
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <CalendarIcon
                        height="22px"
                        width="22px"
                        style={{ color: "#0280af" }}
                      />
                    </div>
                    <div className="block ml-4 ">
                      <div
                        className="text-xs -mb-1"
                        style={{ color: "#0087BA" }}
                      >
                        {" "}
                        Year of Experience{" "}
                      </div>{" "}
                      <label className="text-sm" style={{ color: "#000000a6" }}>
                        {particularDoct.yearsOfExperience}yrs
                      </label>{" "}
                    </div>
                  </div>
                </div>
              </div> */}
          {/* </div>
          </div> */}
          {/* <hr /> */}
          {/* <div className="about">
            <p className=" mb-4 mt-4">
              <b>About</b>
            </p>
            <p
              className=" font-normal text-sm leading-6 mb-20 mr-3"
              style={{ color: "#000000a6" }}
            >
              {particularDoct.aboutMe ? particularDoct.aboutMe : `NA`}
            </p>
          </div> */}
          {/* <hr /> */}
          {/* <div ref={myRef} className="lg:block hidden">
            <DoctorSlots
              doctorsAppointment={doctorappointmentList}
              userData={userData}
              doctorData={particularDoct}
              slots={slotData}
              fees={
                particularDoct &&
                particularDoct?.userConsultationFees?.length > 0 &&
                particularDoct.userConsultationFees[0]
              }
            />
          </div> */}
          {/* <div ref={myRef} className="lg:hidden block">
            <DoctorSlotMobile
              doctorsAppointment={doctorappointmentList}
              userData={userData}
              doctorData={particularDoct}
              slots={slotData}
              fees={
                particularDoct &&
                particularDoct?.userConsultationFees?.length > 0 &&
                particularDoct.userConsultationFees[0]
              }
            />
          </div> */}
        </div>
        <div className="w-full lg:w-1/2 lg:m-3 lg:bg-white rounded-md lg:px-3 px-2 lg:shadow-md h-fit" style={{ boxShadow: "0 5px 20px 0 rgb(128 128 128 / 30%)", height: "fit-content" }}>
          <div className="p-5 flex flex-col">
            <div className="flex w-full justify-between mb-5">
              <div className={`${bg === true ? 'bg-blue-50' : 'bg-white'} border-2 border-brand-secondary w-11/12 rounded flex mt-2`}>
                <div className="p-2 border-r-2 border-brand-secondary">
                  <img src={ic_consult_video} alt="right arrow" className="mt-1" />
                </div>
                <div className="p-2 flex justify-between w-full text-sm">
                  <label className={` ${bg === true ? 'font-medium' : 'font-semibold'}`}>Video consultation</label>
                  <p className={` ${bg === true ? 'font-medium' : 'font-semibold'}`}> ₹ {feeDetails?.videoConsFee}</p>
                </div>
              </div>
              <input type="radio" className="form-radio mt-4 mr-2" name="V" value="Video" checked={bg === true} onChange={() => {
                setAppointmentType("V"); setAppointmentAmount(feeDetails?.videoConsFee); setbgColor(true)
              }} />
            </div>

            {/* <div className="flex w-full justify-between mb-5 h-24">
              <div className={`${bg === false ? 'bg-blue-50' : 'bg-white'} border-2 border-brand-secondary w-11/12 rounded flex`} >
                <div className="p-2 border-r-2 border-brand-secondary">
                  
                  <img src={ic_consult_inperson} alt="right arrow" className="text-center mt-6" />
                </div>
                <div className="flex justify-between w-full text-sm">
                  <div className="flex border-brand-secondary flex-col w-full border-r-2">
                    <div className={` ${bg === false ? 'font-medium' : 'font-semibold'} w-full border-brand-secondary border-b-2`}>
                      <h5 className="p-4">In-Person consultation</h5>
                    </div>
                    <select className={`border-none text-gray-primary text-sm my-auto mx-3 ${bg === false ? 'bg-blue-50' : 'bg-white'}`} onChange={onSelectHosptial} disabled={appointmentType == "V" ? true : false}>
                      {hospitalcliniclistData.map((res, i) => (
                        <option value={JSON.stringify(res)}>{res.hospitalName}</option>
                      ))}
                    </select>
                  </div>
                  <p className={` ${bg === false ? 'font-medium' : 'font-semibold'} whitespace-nowrap mt-8 px-2`}>₹ {feeDetails?.inPersonConsFee}</p>
                </div>
              </div>
              <input type="radio" className="form-radio mt-4 mr-2" name="Inpersion" value="Audio" checked={bg === false} onChange={() => {
                setAppointmentType("I"); setAppointmentAmount(feeDetails?.inPersonConsFee); setbgColor(false)
              }} />
            </div> */}

            {/* <div className="flex w-full justify-between mb-5 ">
               <div className={`${ bg === false ? 'bg-blue-50' : 'bg-white'} w-full border-2 border-brand-secondary w-11/12 rounded-md flex`}>
                 <div className="p-2 border-r-2 border-brand-secondary">
                 <FontAwesomeIcon icon={faUser} className="text-green-300 w-4 h-5"/>
                 </div>
                 <div className="flex justify-between w-full ">
                    <div className="flex border-brand-secondary flex-col w-full border-r-2">
                        <div className={` ${ bg === false ? 'font-medium' : 'font-semibold'} w-full border-brand-secondary border-b-2`}>
                           <label className="p-4">In-Person Consulation</label>
                        </div>
                        <select className="border-none text-gray-primary text-sm" onChange={onSelectHosptial} >
                              {hospitalcliniclistData.map((res, i) => (
                                <option value={JSON.stringify(res)}>{res.hospitalName}</option>
                           ))}
                </select>
                    </div>
                    <p className={` ${ bg === false ? 'font-medium' : 'font-semibold'}`}>$ {feeDetails?.audioConsFee}</p>
                </div>
              </div>
              <input type="radio" className="form-radio mt-4 mr-2" name="Inpersion" value="Audio" checked={bg === false} onChange={() => {
                setAppointmentType("I"); setAppointmentAmount(props?.fees?.inPersonConsFee); setbgColor(false)}}/>
             </div> */}
             { (particularDoct?.starDoctor == "1" || particularDoct?.starDoctor == 1) ? 
              <div className="font-medium text-xs" >Note<span>&#42;</span> - Consultation with Dr. {particularDoct?.firstName} {particularDoct?.lastName} can be done from tomorrow onwards.</div> : null}
            <NewDoctorSlots
              doctorsAppointment={doctorappointmentList}
              userData={userData}
              doctorData={particularDoct}
              doctid = {params.doctid}
              slots={slotData}
              appointmentType={appointmentType}
              appointmentAmount={appointmentAmount}
              hospitalId={hospitalcliniclistData[0]?.hospitalId}
              locationId={hospitalcliniclistData[0]?.locationId}
              fees={
                particularDoct &&
                particularDoct?.userConsultationFees?.length > 0 &&
                particularDoct.userConsultationFees[0]
              }
            />
          </div>
          {/* {carouseldata && carouseldata.length && (
            <Carousel
              value={carouseldata}
              className="mb-2"
              itemTemplate={carouselTemplate}
              style={{ textAlign: "-webkit-center" }}
              autoplayInterval={2500}
              numVisible={1}
              numScroll={1}
            ></Carousel>)}
          */}
        </div>
      </div>
    </>
  );
}
const mapDispatchToProps = (dispatch) => ({
  setLoginModal: () => dispatch(setLoginModal()),
});

export default connect(null, mapDispatchToProps)(DrakshayShetty);
