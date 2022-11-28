import React, { useState, useEffect } from 'react';
import Homemedicine from '../Assets/Images/ic_home_medicine.svg';
import Hometopdoc from '../Assets/Images/ic_home_topdoc.svg';
import Homesavedata from '../Assets/Images/ic_home_safedata.svg';
import { getStarDoctors } from '../Redux/Actions/doctorAction';
import female_icon from '../Assets/Images/Female-Vector-icon.svg';
import male_icon from '../Assets/Images/Male-Vector-icon.svg';


import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import akshay from '../Assets/Images/akshay.png';
import { IMG_URL } from '../config/constant';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "../Assets/css/custom-style.scss";
import useGAEventsTrackers from '../config/useGAEventsTrackers';
import { useHistory, useLocation } from 'react-router-dom';
import { getDoctorslist } from '../Redux/Actions/doctorAction';




function StarDoctorsInfo() {

    // Star Doctors
    const GAEventsTrackers = useGAEventsTrackers("BooK Appointment")
    const dispatch = useDispatch();
    const history = useHistory();

    const doctorlist = useSelector((state) => state.doctorlist);
    console.log("wwwwwwwwwwwwwwww", doctorlist);

    const { doctorData, isLoading } = doctorlist;

    const { coords } = useSelector(state => state.authReducer);

    const [isFetchingPinCode, setIsFetchingPinCode] = useState(false);


    const [starDoctor, setStarDoctors] = useState([]);




    ////////// Custom Pincode Condition was removed by Vishal ///////////////

    useEffect(() => {

        setIsFetchingPinCode(false);
        dispatch(getDoctorslist(coords, "", 1, 100)).then((res) => {
            setStarDoctors(res)
        });


    }, []);

    ///////////////

    console.log("DOctor Data", JSON.stringify(doctorData));

    const viewprofile = (e, doct) => {
        e.preventDefault();
        history.push(`/doctors/${doct.userId}`);
        GAEventsTrackers("Doctor", "View Profile", "View Profile");
    }

    // const handleImgError = (e) => {
    // 	e.target.src = akshay;
    //   };

    const handleImgError = (e, gender) => {
        if (gender === "M") {
            e.target.src = male_icon;
        } else {
            e.target.src = female_icon;
        }
    };

    console.log(starDoctor , "sdoihdsuds");

    return (
        <div className=' items-center w-11/12 mx-auto md:w-60 mt-5   self-center' >
            {starDoctor?.filter((item) => item?.starDoctor != null).length > 0 ?
                <Carousel
                    autoPlay
                    infiniteLoop
                    showArrows={false}
                    showStatus={false}
                    showThumbs={false}
                    showIndicators={false}
                    interval={3000}
                >
                    {starDoctor && starDoctor.length > 0 && starDoctor.filter((item) => item?.starDoctor == 1).map((doct, i) => {
                        let link = doct?._source;

                        return (
                            <div className='flex justify-center cursor-pointer flex-col  items-center md:w-64 text-center my-auto' key={i} onClick={(e) => viewprofile(e, doct)} >


                                <div className='  shadow border-gray-800 h-40  w-40  rounded-full  m-auto block overflow-hidden'>

                                    {/* <img className="border shadow border-gray-800 h-40  w-40 object-top rounded-full object-cover m-auto block overflow-hidden" src={doct.userPhoto ? `${IMG_URL}${doct.userPhoto}` : "https://media.istockphoto.com/photos/doctor-holding-digital-tablet-at-meeting-room-picture-id1189304032?k=20&m=1189304032&s=612x612&w=0&h=ovTNnR0JX2cRZkzMBed9exRO_PamZLlysLDFkXesr4Q="} alt=""

                                        onError={handleImgError} /> */}


                                    <img src={doct.userPhoto ? `${process.env.REACT_APP_IMG_BASEURL}${doct.userPhoto}` : doct.gender === "M" ? male_icon : female_icon}
                                        alt="" className="border shadow border-gray-800 h-40  w-40 object-top rounded-full object-cover m-auto block overflow-hidden"

                                        onError={(e) => handleImgError(e, doct.gender)}
                                    />

                                    {/* </div>

                                    <img className="border shadow border-gray-800 h-40  w-40 object-top rounded-full object-cover m-auto block overflow-hidden"  src={doct.userPhoto ? `${IMG_URL}${doct.userPhoto}` : "https://media.istockphoto.com/photos/doctor-holding-digital-tablet-at-meeting-room-picture-id1189304032?k=20&m=1189304032&s=612x612&w=0&h=ovTNnR0JX2cRZkzMBed9exRO_PamZLlysLDFkXesr4Q="} alt=""

                                    onError={handleImgError} /> */}
                                    {/* <div className="absolute bottom-0 left-0 text-white text-sm text-left pl-5 w-full starDoctorBio">
                                        <h3 className="font-semibold md:text-sm md:-ml-3 w-11/12 break-all">{doct?.userName.toUpperCase()}</h3>
                                        <p className=" md:text-xs lg:text-sm md:-ml-3 w-11/12 break-all">{doct?.specialities}</p>

                                */}


                                </div>

                                <div className="  text-black text-sm   mt-5 ml-4  w-52">
                                    <h3 className="font-semibold md:text-sm md:-ml-6">{doct?.userName?.length < 24 ? doct?.userName?.toUpperCase() : doct?.userName.split(" ")[0].toUpperCase()}</h3>
                                    <p className=" md:text-xs lg:text-sm md:-ml-6  break-all">{doct?.specialities}</p>
                                </div>
                            </div>




                        )
                    })}


                </Carousel>
                :
                <div className="flex items-center justify-center container mx-auto">

                    <div className="">
                        <div className="loader float-center ease-linear text-center rounded-full border-1 border-t-1 border-gray-200 h-8 w-8" />
                    </div>

                </div>

            }
        </div>
    )
}

export default StarDoctorsInfo;
