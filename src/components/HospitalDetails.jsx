import React, { useState } from 'react';
import bethanyhospital from '../Assets/Images/bethanyhospital.svg';
import img1 from '../Assets/Images/1.svg';
import img2 from '../Assets/Images/2.svg';
import img3 from '../Assets/Images/3.svg';
import img4 from '../Assets/Images/4.svg';
// import location from '../Assets/Images/location.arrow.svg';
import share from '../Assets/Images/share-2.svg';
import user from '../Assets/Images/userh.svg';
import bed from '../Assets/Images/iv_no_of_beds.svg';
import noDataFound from '../Assets/Images/No data-found.svg';
import { useHistory, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { getparticularhospital } from '../Redux/Actions/hospitalpageActions';
import NavBarSearch from '../components/navbarSearch';
import HospitalDoctors from '../components/hospitalDoctors';
import { Galleria } from 'primereact/galleria';
import placeholder_m from "../Assets/Images/placeholder_m.svg";


import Bottles from "../Assets/pharamacyImages/Bottles.png";
import Capsules from "../Assets/pharamacyImages/Capsules.png";
import Creams from "../Assets/pharamacyImages/Creams.png";


function HospitalDetails(props) {
  const dispatch = useDispatch();
  const paricularhospital = useSelector((state) => state.particularhospital);
  const { particularhospitalData, isLoading } = paricularhospital;
  const userData = useSelector((state) => state.authReducer.patientData);
  const params = useParams()
  const history = useHistory();
  const location = useLocation();
  const [showImage, setImage] = useState('');
  const [noOfBeds, setnoBeds] = useState(0);
  const [hospitalImages, setHospitalImages] = useState([]);

  const [zoomState, setZoomState] = useState({
    backgroundPosition: '0% 0%'
  })

  const redirectTo = (event, location) => {
    event.preventDefault();
    history.push(location)
  }
  const { state } = location;

  const setBeds = (val) => {
    setnoBeds(val);
  }

  const handleImgError = e => {
    e.target.src = placeholder_m
  }


  const onGotoEnquiryForm = (e) => {
    if (!userData.code) {
      redirectTo(e, { pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } })
    } else {
      history.push({ pathname: APP_ROUTES.HOSPITAL_ENQUIRY, search: `hospitalcode=${particularhospitalData[0].hospitalCode}&code=${particularhospitalData[0].code}` })

    }
  }



  useEffect(() => {
    //@ts-ignore
    dispatch(getparticularhospital(params.hospitalid));
  }, [dispatch, props, params, sessionStorage.getItem('customPinCode')]);

  console.log(particularhospitalData, "particularhospitalData")



  // const image_container = document.getElementById("image_container");
  // const img = document.querySelector("img");

  // image_container.addEventListener("mousemove", (e) => {
  //   const x = e.clientX - e.target.offsetLeft;
  //   const y = e.clientY - e.target.offsetTop;

  //   img.style.transformOrigin = `${x}px ${y}px`;
  //   img.style.transform = "scale(2)"
  // })

  useEffect(() => {
    let temp = []
    setHospitalImages([])
    console.log("hospital images", hospitalImages);
    particularhospitalData?.map((el) => {
      console.log(el, "viyviyivivvuiuv");
      if(el.photoName){
        temp.push(el.photoName)
      }
      if(el.photoName1){
        temp.push(el.photoName1)
      }
      if(el.photoName2){
        temp.push(el.photoName2)
      }
      if(el.photoName3){
        temp.push(el.photoName3)
      }
      // temp.push(el.photoName, el.photoName1, el.photoName2, el.photoName3)
    })
    if(temp.length > 0){
    console.log(temp, "savhousabvuabuod");
      setHospitalImages(temp);
    }

  }, [params, particularhospitalData])


  const responsiveOptions2 = [
    {
      breakpoint: '960px',
      numVisible: 4
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  const thumbnailTemplate = (item) => {
    console.log(item, "sdvdsvodsihvpijvpsd");
    return <img src={process.env.REACT_APP_IMG_BASEURL+item} alt={item?.alt} style={{ width: "60px", display: 'block' }} />
  }

  const handleMouseMove = (e, item) => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    setZoomState({ backgroundPosition: `${x}% ${y}%`, width: "300px" })
  }

  const itemTemplate = (item) => {
    console.log(item, "item image");
    return <figure style={{ backgroundImage: `url(${process.env.REACT_APP_IMG_BASEURL+item})`, width: "200px", height: "max-content", display: 'block', ...zoomState }} onMouseLeave={() => setZoomState({ width: "200px" })} onMouseMove={(e) => handleMouseMove(e, item)}><img src={process.env.REACT_APP_IMG_BASEURL+item} alt={item?.alt} /></figure>
  }

  console.log(hospitalImages, "hospitalImageskk");


  return (
    <div className="pb-20">
      {/* <NavBarSearch /> */}
      {/* breadcrumbs */}
      <ul className="lg:flex hidden  text-brand-secondary  text-sm lg:text-base   pt-5 ">
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
          <a href="/hospital">Hospital</a>
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
          <a >{particularhospitalData[0]?.hospitalName}</a>
        </li>
      </ul>
      <div className="text-center">
        {!isLoading && particularhospitalData.length === 0 && <span>

          <div className="w-full flex flex-col items-center justify-around">
            <img
              className="h-24 lg:h-28 mt-5 lg:mt-3 "
              src={noDataFound}
              alt="No Data Found"
            />
            <h4 className="font-medium  text-brand-lightgreen text-md">
              No Data Found
            </h4>
          </div>

        </span>}
      </div>
      {particularhospitalData?.length > 0 && particularhospitalData.map((hosp, i) => (
        <div className="mt-8 md:mt-8">
          <div key={i} className=" md:flex lg:flex">
            <div className="w-auto lg:w-4/12  pt-5 flex sm:grid-cols-1 ">
              <div className="overflow-x-scroll lg:overflow-x-visible example w-full mx-auto md:w-full flex items-center overflow-hidden justify-center border-2 rounded-md" style={{ height: "304px" }}>
               


                {
                  hospitalImages?.length ? <Galleria value={hospitalImages} responsiveOptions={responsiveOptions2} numVisible={3} thumbnailsPosition="left"
                    item={itemTemplate} circular thumbnail={thumbnailTemplate} /> :
                    <img
                      className="w-1/2 h-80 p-5"
                      style={{ width: "258", height: "201px" }}
                      src={bethanyhospital}
                      alt="ProductImage"
                      referrerPolicy="no-referrer"
                      onError={handleImgError}
                    />
                }

              </div>
            </div>

            <div className="md:w-2/3  w-full md:pl-4 lg:pl-16 mt-5 md:mt-0 ">
              <div className="flex justify-between">
                <p className="text-2xl  font-semibold md:leading-5 not-italic text-green-400">{hosp.hospitalName}</p>

                {/* <div className="flex pr-5">
                  <img onClick={(e) => redirectTo(e, APP_ROUTES.HOSPITAL_PAYMENT)} src={location} alt="location" className="pr-5" />
                  <img src={share} alt="share" />
                </div> */}
              </div>
              <hr className="mt-5 mb-5" />
              <div className='flex mt-3'>
                <p className="text-xs w-32 md:w-48 font-bold  text-sm leading-5  top-0 left-0 not-italic">Location</p>
                <p className="mr-5 font-bold h-5 text-sm leading-5  text-black not-italic w-1">:</p>
                <p className="text-sm text-black-400 font-normal w-36 md:-44 lg:w-2/3 ">{hosp.address1},{hosp.city} </p>
              </div>

              <div className='flex items-center mt-5'>
                <p className="text-xs w-32 md:w-48 font-bold h-5 text-sm leading-5  top-0 left-0 not-italic">Hours</p>
                <p className="mr-5 font-bold h-5 text-sm leading-5  text-black not-italic w-1">:</p>
                <p className="text-sm text-black-400 font-normal">Open 24 hours </p>

              </div>
              <div className='flex items-center mt-5'>
                <p className="text-xs w-32 md:w-48 font-bold h-5 text-sm leading-5  top-0 left-0 not-italic">Phone</p>
                <p className="mr-5 font-bold h-5 text-sm leading-5  text-black not-italic w-1">:</p>
                <p className="text-sm text-black-400 font-normal ">{hosp.contactNumber}</p>
              </div>

              <div className="flex lg:pb-0 pb-10 mt-5">

                <div className="flex items-center ">

                  <div className="flex items-center w-32 md:w-48">
                    <img src={bed} alt="beds" className="w-4 mr-2" />
                    <p className="text-xs text-brand-secondary  w-48 font-bold h-5 text-sm leading-5  top-0 left-0 not-italic">Beds Available</p>

                  </div>
                  <p className="mr-5 font-bold h-5 text-sm leading-5  text-black not-italic w-1">:</p>

                  <p className="text-sm text-black-400 font-normal">{hosp.noOfBed}</p>
                </div>
              </div>



              <div className="flex justify-center lg:block mt-5 ">
                <button onClick={(e) => onGotoEnquiryForm(e)} className="bg-green-400 w-64 font-semibold text-md text-white rounded-md py-2 px-3">Enquire</button>
              </div>

              <div className="w-20 pr-5 mt-12">
                <p className=" font-medium font-normal   block  focus:outline-none font-bold h-5 text-sm leading-5  top-0 left-0 not-italic">
                  About
                </p>
              </div>

              <hr className="mt-6 mb-6" />
              <div className="w-full ">
                <p className=" text-sm text-black-400 font-normal leading-5 ">
                  {hosp.description}
                </p>
              </div>

            </div>


          </div>

        </div>
      ))}
      {isLoading && particularhospitalData.length === 0 &&
        <div className="flex flex-wrap justify-center">
          <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
        </div>
      }
      <div className="my-4">
        {/* <Rooms /> */}
        <HospitalDoctors data={state} noOfBeds={setBeds} />
        {/* <Package /> */}
      </div>
    </div>
  )
}
export default HospitalDetails;
