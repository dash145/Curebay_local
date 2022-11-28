import { useState, useEffect, createRef, useRef } from 'react'
import right from '../Assets/Images/right.svg';
import left from '../Assets/Images/left.svg';
import rooms1 from '../Assets/Images/room1.svg';
import noDataFound from "../Assets/Images/No data-found.svg";
import star from '../Assets/Images/starr.svg';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getElastichospitallist } from '../Redux/Actions/hospitalpageActions';
import SectionContainer from './SectionContainer';
import http from '../Redux/services/http-common';
import { gethospitallist } from '../Redux/Actions/hospitalpageActions'
import './userprofilecomponents/input.css'
import bethanyhospital from '../Assets/Images/bethanyhospital.svg';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { faL } from '@fortawesome/free-solid-svg-icons';
var positionScroll = 6;
var isFirstTimeLeft=true
function RecommondedHospitals() {

    const dispatch = useDispatch();
    const [screen, setscreen] = useState(window.innerWidth);
    const hospitallist = useSelector((state) => state.hospitallist);
    const { coords } = useSelector(state => state.authReducer);
    const { hospitallistData, isLoading } = hospitallist;
    const [currentPinCode, setCurrentPincode] = useState("");
    const [isFetchingPinCode, setIsFetchingPinCode] = useState(false)
    const [position, setPosition] = useState({})
    const search_params = useLocation().search;
    const search_query = new URLSearchParams(search_params).get('search_query');
    const viewDetails = (e, hosp) => {
        e.preventDefault();
        // console.log(hosp.code)
        // history.push({
        //     pathname: APP_ROUTES.HOSPITAL_DETAILS,
        //     search: `?q=${hosp.locationCode}`,
        //   });
        history.push({ pathname: `/hospitaldetails/${hosp.locationCode}`, state: hosp });
    }

    // useEffect(() =>{
    // 	getLocation();
    // },[])

    // useEffect(() =>{
    // 	// console.log(position ,"inrequiredeffects")

    // 	if(Object.keys(coords).length > 0){
    // 		console.log("inrequiredeffect")
    // 		getPinCode();
    // 	}
    // },[coords])

    useEffect(() => {
        if (sessionStorage.getItem('customPinCode')) {
            setIsFetchingPinCode(false);
            dispatch(gethospitallist(coords, search_query ? search_query : "", 1, 80));
        }
    }, [sessionStorage.getItem('customPinCode'), search_query]);

    // const getPinCode = () =>{
    // 	// console.log("ingetPincode" , position)
    //     setIsFetchingPinCode(true);
    // 	var apiUrl = 'MMI/accesstoken'
    //     http.get(apiUrl).then(async (response) => {
    //         let data = response.data;
    //         console.log("res", data)
    //       const res =  await http.get(`https://apis.mapmyindia.com/advancedmaps/v1/${data.access_token}/rev_geocode?lat=${coords.lat}&lng=${coords.long}`);
    //       setCurrentPincode(res.data.results[0].pincode)
    //     });
    // }


    // function getLocation() {
    //     setIsFetchingPinCode(true)
    //     if (window.navigator.geolocation) {
    //         window.navigator.geolocation.getCurrentPosition(showPosition);
    //     } else {
    //         console.log("helloosd fsd")
    //     }
    // }

    // function showPosition(position) {
    //     const { coords } = position;
    //     console.log("coordsinLab", coords)
    //     let coordsObj = {
    //         lat: coords.latitude,
    //         long: coords.longitude
    //     }
    // 	setPosition({...coordsObj})
    // }

    // useEffect(() => {
    //     if (hospitallistData.length === 0)
    //         fetchNearByHospital();
    // }, [hospitallistData.length]);

    // const fetchNearByHospital = () => {
    //     var dataobj = {
    //         page: 1,
    //         limit: 100,
    //         lat: "28.461007",//coords.lat,
    //         lon: "77.04652",//coords.long,
    //         keyword: ""
    //     }
    //     dispatch(getElastichospitallist(dataobj));
    // }

    const history = useHistory();
    const redirectTo = (event, location) => {
        event.preventDefault();
        history.push(location)
    }

    console.log("hospitallistData", hospitallistData)


    // React ref to store array of refs
    const scrollRefs = useRef([]);

    // Populate scrollable refs, only create them once
    // if the selectedElements array length is expected to change there is a workaround
    scrollRefs.current = [...Array(hospitallistData.length).keys()].map(
        (_, i) => scrollRefs?.current[i] ?? createRef()
    );

    const handleScroll = (e, dir) => {
        e.preventDefault();
        // let slideList = document.querySelector('.hostipalSlider');
        // const lenghtCount = slideList.querySelectorAll('.hos_slide_list').length;
        // if (dir === "rightArrow") {
        //     slideList.style.transform = `translateX(${slideList.computedStyleMap().get('transform')[0].x.value - 950}px)`;
        // }
        // if (dir === "leftArrow") {
        //     slideList.style.transform = `translateX(${slideList.computedStyleMap().get('transform')[0].x.value + 950}px)`;
        // }


        if (dir == "rightArrow") {
            if(positionScroll==0){
                positionScroll=6

            }
            positionScroll = positionScroll + 2
        } else {

            if(isFirstTimeLeft=true){

                positionScroll = positionScroll - 6
                isFirstTimeLeft=false
            }else{
                positionScroll = positionScroll - 2
            }

        }

        if (positionScroll > hospitallistData.length) {
            positionScroll = hospitallistData.length - 1
        }

        if (positionScroll < 0) {
            positionScroll = 0
        }

        scrollRefs?.current[positionScroll]?.current?.scrollIntoView({ block: "end", inline: "nearest", behavior: 'smooth' });
    }

    useEffect(() => {
        const updateWindowDimensions = () => {
            const newWidth = window.innerWidth;

            setscreen(newWidth);
        };

        window.addEventListener("resize", updateWindowDimensions);
        return () => window.removeEventListener("resize", updateWindowDimensions);
    }, []);


    const handleImgError = e => {
        e.target.src = bethanyhospital
    }



    return (
        <>
            <div className="flex flex-col m-auto px-4 mt-4">
                {/* <SectionContainer link={APP_ROUTES.HOSPITAL_SEARCH} title={'Recommended Hospitals in your locality'} seeAll={'hospitals'} handelSroll={handleScroll} /> */}

                {screen < 445 ?
                    <>
                        {hospitallistData && hospitallistData.length !== 0 &&
                            <SectionContainer link={APP_ROUTES.HOSPITAL_SEARCH} title={'Available Hospitals'} seeAll={'Hospitals'} handelSroll={handleScroll} />
                        }
                    </> : <>
                        {hospitallistData && hospitallistData.length !== 0 &&
                            <SectionContainer data={hospitallistData} link={APP_ROUTES.HOSPITAL_SEARCH} title={'Available Hospitals'} seeAll={'Hospitals'} handelSroll={handleScroll} />
                        }
                    </>
                }
                <div className="w-full lg:max-w-full lg:flex ">
                    <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                        <div id="hostipalSlider" className="hostipalSlider flex flex-nowrap space-x-14">
                            {hospitallistData && hospitallistData.map((hosp, i) => {
                                let link = hosp?._source ? hosp._source : {};
                                return (
                                    <div onClick={(e) => viewDetails(e, hosp)} className="hos_slide_list translate-x-0 border  leading-normal bg-white shadow-sm flex-none bg-cover overflow-hidden " style={{ width: "230px", height: "263px" }} key={i} ref={scrollRefs.current[i]}>
                                        <div className="flex text-center justify-center content-center">
                                            <img className="" style={{ width: "228px", height: "153px" }} src={hosp.hospitalPhoto ? `${process.env.REACT_APP_IMG_BASEURL}${hosp.hospitalPhoto}` : rooms1} alt="rooms1"
                                                onError={handleImgError}



                                            />
                                            {/* <div className="absolute bottom-0 right-0 h-16 w-16">₹ 1500/bed</div> */}
                                        </div>
                                        <div className=" lg:my-3">
                                            <div className="flex justify-center text-base lg:text-gray-700 h-6 lg:h-auto text-gray-800  text-md mt-2">
                                                <h5 className="truncate font-bold">{hosp.hospitalName}</h5>
                                            </div>
                                            <div className="lg:flex md:flex justify-center lg:mt-2">
                                                <div className="flex justify-center items-center">
                                                    <RoomOutlinedIcon style={{ height: "18.28px", color: "#66B889" }} />
                                                    <p className="text-gray-500 font-normal text-sm md:text-xs lg:text-sm">{hosp.city ? hosp.city : 'NA'} </p>
                                                </div>

                                            </div>
                                            <div className="flex lg:my-2 my-2">
                                                <button 
                                                // onClick={
                                                //     (e) => viewDetails(e, hosp)
                                                // }
                                                    className="lg:bg-transparent md:bg-white lg:bg-white w-full text-xs md:text-sm lg:text-xs font-medium  text-white lg:px-4 py-2  hover:border-transparent " style={{ background: "#EAF8FF", color: "#18406D" }}>View Details <span><ArrowForwardIosOutlinedIcon style={{ color: "#18406D", height: "10.62px" }} /></span>
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {!isLoading && !isFetchingPinCode && hospitallistData && hospitallistData.length === 0 &&
                    <div className="w-full flex flex-col items-center justify-around">
                        <img
                            className="h-24 lg:h-28 mt-5 lg:mt-0 "
                            src={noDataFound}
                            alt="No Diagnostics Appointments Available"
                        />
                        <h4 className="font-medium  text-gray-400 text-md">
                            No Recommended Hospital Found
                        </h4>
                    </div>
                }
                {/* <div className="flex justify-center lg:w-full mt-8">
                    <p className="text-lg sm:text-lg md:text-xl lg:text-xl font-bold">Healthcare Packages</p>
                </div> */}
                {(isLoading || isFetchingPinCode) && hospitallistData && hospitallistData.length === 0 &&
                    <div className="flex flex-wrap justify-center">
                        <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
                    </div>
                }
            </div>
        </>
    );
}
export default RecommondedHospitals;
