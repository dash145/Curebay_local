import female_icon from '../Assets/Images/Female-Vector-icon.svg';
import male_icon from '../Assets/Images/Male-Vector-icon.svg';
import Chat from '../Assets/Images/person.svg';
import Video from '../Assets/Images/videocall.svg';
import noDataFound from "../Assets/Images/No data-found.svg";

import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState, createRef, useRef } from 'react'
import { connect } from 'react-redux';
import { setLoginModal, } from '../Redux/Actions/userActions';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorslist } from '../Redux/Actions/doctorAction';
import SectionContainer from './SectionContainer';
import SectionContainerQuickDoctor from './SectionContainerQuickDoctor';
import useGAEventsTrackers from '../config/useGAEventsTrackers';
import './userprofilecomponents/input.css'
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { getPatientAppointmentList } from "../Redux/Actions/patientAction";
import { getappointmentlist } from "../Redux/Actions/UserprofileActions";
import "../Assets/css/custom-style.scss";

var isFirstTimeLeft = true

var positionScroll = 4;
var positionScroll1 = 4;


function Doctor(props) {

	const dispatch = useDispatch();
	const doctorlist = useSelector((state) => state.doctorlist);
	const { doctorData, isLoading } = doctorlist;
	const { coords } = useSelector(state => state.authReducer);
	const [currentPinCode, setCurrentPincode] = useState("");
	const [isFetchingPinCode, setIsFetchingPinCode] = useState(false)
	const [position, setPosition] = useState({})
	const [appointmentdetails, setappointmentdetails] = useState();
	const [isHide, setHide] = useState(true);
	const patientCode = useSelector((state) => state.authReducer.patientCode);
	const patientappointmentlist = useSelector((state) => state.patientappointmentlist);
	const searchss = useLocation().search;
	const search_query =  new URLSearchParams(searchss).get('search_query');
	// useLocation();
	// const {search_query} = props
	console.log(search_query , "Sdvdsihoihdsofuds");

	const [appointmentlistData, setAppointmentlistData] = useState()
	const [test, settest] = useState('')


	const GAEventsTrackers = useGAEventsTrackers()

	const viewprofile = (e, doct) => {
		e.preventDefault();
		history.push(`/doctors/${doct.userId}`);
		GAEventsTrackers("Doctor", "View Profile", "View Profile");
	}

	const bookappointment = (e, doct) => {
		e.preventDefault();
		history.push(`/doctors/${doct.userId}`);
		GAEventsTrackers("Doctor", "Book Apointment", "Book Apointment");
	}

	const openModal = (val) => {
		setappointmentdetails(val);
		setHide(false);
	};



	// const handleScroll = (e, dir) => {

	// 		if (dir == "rightArrow") {
	// 		positionScroll = positionScroll + 1
	// 	} else {
	// 		positionScroll = positionScroll - 1
	//  	}

	// 	let slideList = document.querySelector('.slider');
	// 	const lenghtCount = slideList.querySelector('.slide_list');

	// 	//const element = document.getElementById(doctorData[10].userName);

	// 	//const position = window;
	// 	//console.log('element',window)

	// 	//var containerScrollPosition = document.getElementById('container').scrollLeft







	// 	e.preventDefault();

	// 	if (dir === "rightArrow") {

	// 		slideList.style.transform = `translateX(${slideList.computedStyleMap().get('transform')[0].x.value - 650}px)`;

	// 	//	console.log('element',slideList.style.transform,"fff" ,slideList.computedStyleMap().get('transform'))
	// 	}
	// 	if (dir === "leftArrow") {
	// 		let left=slideList.computedStyleMap().get('transform')[0].x.value+850

	// 		// if(left>0){
	// 		// 	left=0

	// 		// }

	// 		slideList.style.transform = `translateX(${left}px)`;


	// 	}
	// }
	//finding duplicate



	// useEffect(() => {
	// 	let payload = {
	// 		patientId: patientCode,
	// 		status: 2,

	// 		photoRequired: "Y"



	// 	};
	// 	dispatch(getPatientAppointmentList(payload));

	// }, []);


	useEffect(() => {
		dispatch(getappointmentlist(userData.code));
	}, [patientappointmentlist.length]);



	useEffect(() => {
		var dups = [];
		let rr = patientappointmentlist?.appointmentlistData.filter(function (el) {
			if (el.status == 2) {
				if (el.isActiveDoctor === 1) {
					if (dups.indexOf(el.userName) == -1) {
						dups.push(el.userName);
						return true;
					}
				}
			}
			return false;
		});
		console.log(patientappointmentlist, "patientappointmentlist")

		console.log('USer Phot', JSON.stringify(rr))
		setAppointmentlistData(rr)
	}, [patientappointmentlist])




	useEffect(() => {
		if (coords) {
			setIsFetchingPinCode(false);
			dispatch(getDoctorslist(coords, search_query ? search_query : "", 1, 30));
		}

	}, [coords, search_query]);

	// const getPinCode = () =>{
	// 	setIsFetchingPinCode(true);
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

	const userData = useSelector(state => state.authReducer.patientData);
	const history = useHistory();

	const scrollRefs = useRef([]);

	const scrollRefs1 = useRef([]);

	// Populate scrollable refs, only create them once
	// if the selectedElements array length is expected to change there is a workaround
	scrollRefs.current = [...Array(doctorData.length).keys()].map(
		(_, i) => scrollRefs?.current[i] ?? createRef()
	);

	scrollRefs1.current = [...Array(appointmentlistData?.length).keys()].map(
		(_, i) => scrollRefs1?.current[i] ?? createRef()
	);

	// Curried handler to take index and return click handler

	const handleScroll1 = (e, dir) => {
		if (dir == "rightArrow") {
			positionScroll1 = positionScroll1 + 2
		} else {
			positionScroll1 = positionScroll1 - 1
		}
		if (positionScroll1 > appointmentlistData.length) {
			positionScroll1 = appointmentlistData.length - 1
		}
		if (positionScroll1 < 0) {
			positionScroll1 = 0
		}
		scrollRefs1?.current[positionScroll1]?.current?.scrollIntoView({ block: "end", inline: "nearest", behavior: 'smooth' });
	};

	const handleScroll = (e, dir) => {
		if (dir == "rightArrow") {
			if (positionScroll == 0) {
				positionScroll = 4
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
		if (positionScroll > doctorData.length) {
			positionScroll = doctorData.length - 3
		}
		if (positionScroll < 0) {
			positionScroll = 0
		}
		scrollRefs?.current[positionScroll]?.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
	};



	// let icon
	// if(gender==="M"){
	// 	 icon=male_icon;
	// } else {
	// 	 icon=female_icon
	// }


	const handleImgError = (e, gender) => {
		if (gender === "M") {
			e.target.src = male_icon;
		} else {
			e.target.src = female_icon;
		}
	};




	// console.log(doctorData, "Appointmentlistsafe")
	console.log("Appointmentlist", doctorData);



	return (
		<div className="z-10 mx-0 md:mx-8">
			{appointmentlistData?.length === 0 || userData?.email == undefined ? (
				<p className="hidden ">
					No previous appointments available
				</p>
			) : (
				<div className="flex flex-col ">
					<div className="mb-5 flex justify-center">

						<SectionContainerQuickDoctor link={APP_ROUTES.DOCTOR_SEARCH} data={appointmentlistData} title={'Past Consultations'} seeAll={appointmentlistData?.length > 4 ? 'Doctors' : 'hide'} handelSroll={handleScroll1} />

						{/* <p className="text-sm text-gray-500 font-semibold">Doctors you previously consulted</p> */}
					</div>
					<div className="flex gap-2 overflow-scroll scrollbar-hide mb-5">
						{appointmentlistData && appointmentlistData?.map((user, i) => (


							<div className="md:pr-5" key={i}>
								{user.status === 2 &&
									// let {uniqueObjArray}=[..new Map(appointmentlistData.map((item)=>[item[{user.userName}],item])).values()];
									<div className=" bg-white border border-gray-200 rounded-2xl md:space-x-2 w-max lg:w-full mx-4 px-3  lg:mx-0 flex-none bg-cover" key={i} ref={scrollRefs1.current[i]}>
										<div className="px-0 py-2 md:px-1 md:py-3 whitespace-nowrap">
											<div className="flex items-center">
												<div className="flex flex-col space-x-2">

													<img className="w-48 h-36 m-auto border object-center object-top rounded-2xl" src={user.userPhotoName ? `${process.env.REACT_APP_IMG_BASEURL}${user.userPhotoName}` : user.gender === "M" ? male_icon : female_icon} alt="" onError={(e) => handleImgError(e, user.userSpecialityList[0].userGender)} />


													<div className="flex flex-col items-center text-sm font-medium text-gray-800 ">
														<div className=" pt-2">{user.userSalutation} {user.userName}</div>
														<div className="py-2 whitespace-nowrap w-full text-right text-sm font-medium">
															<div className="flex flex-col gap-2 ">
																{user.status === 2 &&
																	<button
																		onClick={(e) => viewprofile(e, user)}
																		className="bg-brand-secondary rounded-lg  text-sm text-white font-normal rounded-sm py-2 px-4 "
																	>
																		Book Appointment
																	</button>}
																<button
																	onClick={() => history.push({ pathname: APP_ROUTES.POST_CONSULTATION, search: `?id=${user.id}` })}
																	className="border border-brand-secondary rounded-lg  text-sm font-medium  text-brand-secondary rounded-sm py-2 px-4"
																>
																	Last Consultation
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								}
							</div>
						))}
					</div>

				</div>

			)}


			{/* Consulted Doctor End  */}



			<div className="flex flex-col">

				{doctorData && doctorData.length > 3 &&
					<SectionContainer link={APP_ROUTES.DOCTOR_SEARCH} data={doctorData} title={'Available Doctors'} subtitle={'Consult the best General Physicians in your locality'} seeAll={'Doctors'} handelSroll={handleScroll} />
				}

				{/* <SectionContainer link={APP_ROUTES.DOCTOR_SEARCH} data={doctorData} title={'Doctors in your locality'} subtitle={'Consult the best General Physicians in your locality'} seeAll={'Doctors'} handelSroll={handleScroll} /> */}
				<div className={`${doctorData.length === 0 ? "w-full lg:max-w-full lg:flex justify-center" : "w-full lg:max-w-full lg:flex"}`}>
					<div className="flex overflow-x-scroll py-2 scrollbar-hide">
						<div id="slider" className="slider flex lg:h-56 w-full">
							{doctorData && doctorData.length > 0 && doctorData.map((doct, i) => {
								let link = doct?._source;
								return (
									<div id={doct.userName} style={{ boxShadow: "2px 2px 15px #ccc" }} className="w-fix1 slide_list doctors_list sm:p-3 bg-white border border-gray-300 translate-x-0 rounded-xl sm:rounded-2xl mr-4 h-auto lg:h-48 sm:w-auto flex-none bg-cover text-center overflow-hidden" key={i} ref={scrollRefs.current[i]}>
										<div className="flex justify-start flex-wrap sm:flex-nowrap ">
											<div className="w-full sm:w-auto">
												<img src={doct.userPhoto ? `${process.env.REACT_APP_IMG_BASEURL}${doct.userPhoto}` : doct.gender === "M" ? male_icon : female_icon}
													alt="" className="w-44 m-auto mt-3 lg:mt-1 mb-2 sm:w-20 h-40 sm:h-20 border rounded-xl  sm:rounded-2xl"

													onError={(e) => handleImgError(e, doct.gender)}
												/>
											</div>
											<div className="flex flex-col sm:flex-row w-full sm:w-auto">
												<div className="px-3 text-left">
													<span className="text-sm text-left font-medium ">{doct?.userSalutation} {doct.userName}</span><br />
													<span className="text-brand-gunsmoke text-left text-xs font-thin mt-1 ">{doct?.specialities}</span>
													<span className="text-brand-gunsmoke text-xs items-center flex font-thin mt-2 " >
														{/* <img src={Location} className="h-4 w-4 mr-2" alt="" />{(doct.hospitals && doct.hospitals.length > 0 && doct.hospitals[0]?.locations && doct.hospitals[0]?.locations.length > 0) ?doct.hospitals[0]?.locations[0].address   : 'NA'} */}
														<LocationMarkerIcon color="#5dbb63" className="h-5 mr-2 relative" />
														<span>{doct?.city ? doct?.city : 'NA'}</span>
													</span>
												</div>
												<div className="sm:justify-end ml-3 sm:ml-8 text-left">
													<div className="hidden sm:flex flex-wrap justify-end content-between">
														{/* {
															doct.inPersonConsultCharges ?
																<div className="w-7 mr-1 h-7 flex flex-wrap   content-center  rounded-lg justify-center">
																	<img src={Chat} className="h-7 w-7" alt="" />
																</div> : ""
														} */}
														{
															doct.videoConsultCharges &&
															<div className="w-7 mr-1 h-7 flex flex-wrap  content-center  bg-blue-200 rounded-lg justify-center">
																<img src={Video} className="h-4 w-4" alt="" />
															</div>
														}
														{/* {
															doct.audioConsFee ?
																<div className="w-7 mr-1 h-7 flex flex-wrap  content-center  bg-blue-200 rounded-lg justify-center">
																	<img src={Audio} className="h-4 w-4" alt="" />
																</div> : ""
														} */}

													</div>
													<div className="flex flex-col m-0 sm:m-auto mt-0 md:mt-5  w-4/5 sm:w-auto ">
														{/* {doct.inPersonConsultCharges &&
															<div className='flex sm:block justify-between'><p className="text-green-500  text-xs flex font-thin mt-3" > In Person: ₹{doct.inPersonConsultCharges ? doct.inPersonConsultCharges : ``}</p>
																<div className="w-6 mr-1 h-6 mt-1 flex sm:hidden flex-wrap   content-center  rounded-lg justify-center">
																	<img src={Chat} className="h-7 w-7" alt="" />
																</div>
															</div>
														} */}
														{doct.videoConsultCharges &&
															<div className='flex sm:block justify-between'>
																<p className="text-blue-600  text-xs flex font-thin mt-3" > Video Consultation: ₹{doct.videoConsultCharges ? doct.videoConsultCharges : ``}</p>
																<div className="w-6 mr-1 h-6 mt-1 flex sm:hidden flex-wrap  content-center  bg-blue-200 rounded-lg justify-center">
																	<img src={Video} className="h-4 w-4" alt="" />
																</div>
															</div>
														}
													</div>
												</div>
											</div>
										</div>
										<hr className="mt-4 mb-3" />
										<div className="mt-1 justify-end gap-2 md:gap-0 flex flex-col md:flex-row">
											<button onClick={(e) => viewprofile(e, doct)} className="w-11/12 m-auto md:w-full border border-brand-secondary  text-sm font-medium  text-brand-secondary rounded-sm py-2 px-6 md:mr-6">View Profile</button>
											<button onClick={(e) => bookappointment(e, doct)} className="w-11/12  m-auto sm:w-full md:mx-3 mb-3 sm:mx-0 sm:mb-0 bg-brand-secondary  text-sm text-white font-normal rounded-sm py-2 px-4 ">Book Appointment</button>
										</div>
									</div>
								)
							})}
							{!isLoading && !isFetchingPinCode && doctorData && doctorData.length === 0 &&
								<div className="w-full flex flex-col items-center justify-around">
									<img
										className="h-24 lg:h-28 mt-5 lg:mt-0 "
										src={noDataFound}
										alt="No Diagnostics Appointments Available"
									/>
									<h4 className="font-medium  text-brand-lightgreen text-md">
										No Doctors Available
									</h4>
								</div>
							}
						</div>
					</div>
				</div>
				{/* {!isLoading && !isFetchingPinCode && doctorData && doctorData.length === 0 && <p>No doctors near by in your Area</p>} */}
				{(isLoading || isFetchingPinCode) && doctorData.length === 0 &&
					<div className="flex flex-wrap justify-center">
						<div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
					</div>
				}
			</div>

		</div>



	);
}

const mapDispatchToProps = (dispatch) => ({
	setLoginModal: () => dispatch(setLoginModal()),

});

export default connect(null, mapDispatchToProps,)(Doctor);
