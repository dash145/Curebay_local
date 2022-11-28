import Chat from '../Assets/Images/person.svg';
import Video from '../Assets/Images/videocall.svg';
import Location from '../Assets/Images/Location.svg';
import { useHistory, } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLoginModal, } from '../Redux/Actions/userActions';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import { useDispatch } from 'react-redux';
import SectionContainer from './SectionContainer';
import female_icon from '../Assets/Images/Female-Vector-icon.svg';
import male_icon from '../Assets/Images/Male-Vector-icon.svg';

function AllDoctors(props) {

	

	const viewprofile = (e, doct) => {
		e.preventDefault();
		history.push(`/doctors/${doct.userId}`);
	}

	const bookappointment = (e, doct) => {
		e.preventDefault();
		history.push(`/doctors/${doct.userId}`);
	}
	const history = useHistory();
	console.log(props, "ojfpweifhipw")


	const handleImgError = (e , gender) => {
		if(gender==="M"){
			e.target.src=male_icon;
		} else{
			e.target.src=female_icon;
		}
	};


	return (
		<>
			<br />
			<div className="flex flex-col px-3 ">

				{
					props && props?.data.length > 0 &&
					<SectionContainer link={APP_ROUTES.DOCTOR_SEARCH} data={props.data} title={'Available Doctors'} subtitle={'Consult the best Physicians'} seeAll={'Doctors'} />

				}

				<div className="w-full lg:max-w-full lg:flex ">
					<div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
						<div className="lg:flex hidden flex-nowrap space-x-8">
							{props?.data?.map((doct, i) => {
								return (
									<div className="slide_list p-3 bg-white border border-gray-200 translate-x-0 rounded-2xl mx-2 h-auto lg:h-48 lg:w-auto flex-none bg-cover text-center overflow-hidden" key={i}>
										<div className="flex justify-start">
											<div className="">
												<img src={doct.userPhoto ? `${process.env.REACT_APP_IMG_BASEURL}${doct.userPhoto}` : doct.gender === "M" ? male_icon : female_icon}
													alt="" className="w-44 m-auto mt-3 lg:mt-1 mb-2 sm:w-20 h-40 sm:h-20 border rounded-xl  sm:rounded-2xl"

													onError={(e) => handleImgError(e, doct.gender)}
												/>
											</div>
											<div className="flex">
												<div className="px-3 text-left">
													<span className="text-sm text-left font-medium ">{doct.userSalutation} {doct.userName}</span><br />
													<span className="text-brand-gunsmoke text-left text-xs font-thin mt-1 ">{doct?.specialities ? doct?.specialities : ''}</span>
													<span className="text-brand-gunsmoke text-xs flex font-thin mt-2 " >
														{/* <img src={Location} className="h-4 w-4 mr-2" alt="" />{(doct.hospitals && doct.hospitals.length > 0 && doct.hospitals[0]?.locations && doct.hospitals[0]?.locations.length > 0) ?doct.hospitals[0]?.locations[0].address   : 'NA'} */}
														<img src={Location} className="h-4 w-4 mr-2" alt="" />{doct?.city ? doct?.city : 'NA'}
													</span>
												</div>
												<div className="justify-end ml-8">
													<div className="flex flex-wrap justify-end content-between">
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
													<div className="flex flex-col m-auto">
														{/* {doct.inPersonConsultCharges &&
															<p className="text-green-500  text-xs flex font-thin mt-3" > In Person: ₹{doct.inPersonConsultCharges ? doct.inPersonConsultCharges : ``}</p>
														} */}
														{doct.videoConsultCharges &&
															<p className="text-blue-600  text-xs flex font-thin mt-3" > Video Consultation: ₹{doct.videoConsultCharges ? doct.videoConsultCharges : ``}</p>
														}
													</div>
												</div>
											</div>
										</div>
										<hr className="mt-4 mb-3" />
										<div className="mt-1 justify-end flex">
											<button onClick={(e) => viewprofile(e, doct)} className="border border-brand-secondary  text-sm font-medium  text-brand-secondary rounded-md py-2 px-6 mr-6">View Profile</button>
											<button onClick={(e) => bookappointment(e, doct)} className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-4 ">Book Appointment</button>
										</div>
									</div>
								)
							})}


							{props?.data?.length === 0 && <p>No doctors available</p>}
						</div>
						<div className="lg:hidden flex flex-nowrap space-x-8">
							{props && props?.data?.map((doct, i) => {
								return (
									<div onClick={(e) => viewprofile(e, doct)} className="slide_list p-3 bg-white border border-gray-200 translate-x-0 rounded-2xl mx-2 h-auto w-64 sm:w-auto lg:w-auto flex-none bg-cover text-center overflow-hidden" key={i}>
										<div className="">
											<div className="">
												<img src={doct.userPhoto ? `${process.env.REACT_APP_IMG_BASEURL}${doct.userPhoto}` : doct.gender === "M" ? male_icon : female_icon} onError={(e) => handleImgError(e, doct.gender)} alt="" className="w-full h-40 sm:h-20 md:h-20 lg:h-20 border rounded-2xl" />
											</div>
											<div className="mt-2">
												<div className="px-3 text-left">
													<span className="text-sm text-left font-medium ">{doct.userSalutation} {doct.userName}</span><br />
													<span className="text-brand-gunsmoke text-left text-xs font-thin mt-1 ">{doct?.specialities ? doct?.specialities : ''}</span>
													<span className="text-brand-gunsmoke text-xs flex font-thin mt-2 " >
														{/* <img src={Location} className="h-4 w-4 mr-2" alt="" />{(doct.hospitals && doct.hospitals.length > 0 && doct.hospitals[0]?.locations && doct.hospitals[0]?.locations.length > 0) ?doct.hospitals[0]?.locations[0].address   : 'NA'} */}
														<img src={Location} className="h-4 w-4 mr-2" alt="" />{doct?.city ? doct?.city : 'NA'}
													</span>
												</div>
												<div className="flex justify-between lg:justify-end ml-2 mt-2">
													<div className="flex flex-col justify-end gap-2 md:gap-1 mt-5 sm:mt-0 md:mt-0 lg:mt-0 content-between">
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
													<div className="flex flex-col m-auto">
														{/* {doct.inPersonConsultCharges &&
															<p className="text-green-500  text-xs flex font-thin mt-3" > In Person: ₹{doct.inPersonConsultCharges ? doct.inPersonConsultCharges : ``}</p>
														} */}
														{doct.videoConsultCharges &&
															<p className="text-blue-600  text-xs flex font-thin mt-3" > Video Consultation: ₹{doct.videoConsultCharges ? doct.videoConsultCharges : ``}</p>
														}
													</div>
												</div>
											</div>
                      <hr className="mt-4 mb-3" />
										<div className="mt-1 flex flex-col items-center gap-2">
											<button onClick={(e) => viewprofile(e, doct)} className="w-44 border border-brand-secondary  text-sm font-medium  text-brand-secondary rounded-md p-2">View Profile</button>
											<button onClick={(e) => bookappointment(e, doct)} className="w-44 bg-brand-secondary  text-sm text-white font-normal rounded-md p-2">Book Appointment</button>
										</div>
										</div>
									</div>
								)
							})}
							{props?.data?.length === 0 && <p>No doctors available</p>}

						</div>
					</div>
				</div>
				{props.isLoading &&
					<div className="flex flex-wrap justify-center">
						<div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
					</div>
				}
			</div>
		</>
	);
}

const mapDispatchToProps = (dispatch) => ({
	setLoginModal: () => dispatch(setLoginModal()),

});
export default connect(null, mapDispatchToProps,)(AllDoctors);
