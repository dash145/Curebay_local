import http from "../Redux/services/http-common";
import { useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import prescription from "../Assets/Images/pre.svg";
import { encodeBase64File } from '../helper/filebase64';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getmypriscriptionlist } from "../Redux/Actions/UserprofileActions";
import { APP_ROUTES } from "../application/Router/constants/AppRoutes";
import { useLocation, useHistory } from "react-router";
import Vectorpres from "../Assets/Images/Vector-pres.png"

function Uploadpres(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const userData = useSelector((state) => state.authReducer.patientData);

	const fileName = useSelector(state => state.uploadedPrescription.fileName)

	// const redirectTo = (event, location) => {
	// 	event.preventDefault();
	// 	history.push(location)
	// }

	const redirectTo = (data) => {
		if (userData?.id) {
			// (e) => redirectTo(e, APP_ROUTES.UPLOADED_PRESCRIPTION)
			history.push({ pathname: APP_ROUTES.UPLOADED_PRESCRIPTION, state: data });
		}
		else {
			history.push({ pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } });
		}
	};

	const goToPrescription = () => {
		redirectTo();
	}

	return (
		<>
			<div className="flex justify-center lg:flex">
				<div className="w-full lg:w-3/4 h-auto p-2 mt-2 sm:mt-0 border border-gray-100  rounded-xl flex justify-center flex-col leading-normal shadow-lg h-16 px-2 backdrop-opacity-50 relative" style={{ background: "#EAF8FF " }}>
					{!fileName && <div className="md:flex sm:flex flex-row lg:flex-col xl:flex-row gap-3 lg:gap-0 xl:gap-3 justify-center items-center lg:justify-between">
						<div className="flex items-center justify-between w-full">
							<div className="block">
								{/* <img src={shape} alt="shape" className="absolute -ml-2" style={{ height:"-webkit-fill-available", bottom:"2px",
                background:"linear-gradient(89.87deg, #EAF8FF 6.09%, rgba(234, 248, 255, 0) 24.25%)" 
                }} /> */}
								<div className="bg-brand-lightgreen rounded-full z-1 h-12 w-12 flex justify-center items-center">
									<img src={Vectorpres} alt="prescription" className=" h-6  " style={{ zindex: 1 }} />
								</div>
							</div>
							<div className="mb-1">
								<div className="pl-1 lg:pl-3 items-center text-center" >
									<p className="block lg:text-lg font-medium lg:text-gray-900">Quick Order with E-Prescription</p>
									<p className=" block text-gray-700 font-normal text-sm lg:text-base  lg:mt-1 lg: " >Upload e-prescription & tell us what you need. We will do the rest.</p>
								</div>
							</div>
						</div>
						<div className="flex items-center justify-center xl:justify-end ml-2 lg:w-1/2">
							<label className="bg-brand-secondary cursor-pointer text-white lg:text-base text-sm lg:font-medium font-medium py-2 w-48 lg:w-auto pl-3 lg:pl-3 lg:px-4 rounded-lg">Order with E-Prescription
								<button onClick={goToPrescription} className="hidden" />
							</label>
						</div>

					</div>}
					{fileName && <p>Uploaded E-Prescription File:{fileName}</p>}
				</div>
			</div>
		</>
	);
}
export default Uploadpres;
