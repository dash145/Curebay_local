import pillss from '../Assets/Images/pillss.svg';
import { useHistory, } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { setLoginModal, } from '../Redux/Actions/userActions';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { getPharmacyList } from '../Redux/Actions/pharmacyAction';
import SectionContainer from './SectionContainer';
import { currentlocationReducer } from '../Redux/Reducers/authReducer';
import http from '../Redux/services/http-common';


function Pharmacy(props) {
	const dispatch = useDispatch();
	const { pharmacyData } = useSelector((state) => state.pharmalist);
	const isLoading = useSelector((state) => state.pharmalist.isLoading);
	const [currentPinCode, setCurrentPincode] = useState("");
    const [isFetchingPinCode, setIsFetchingPinCode] = useState(false)
	const [position, setPosition] = useState({})
	const {coords} = useSelector(state => state.authReducer);

	const history = useHistory();
	const redirectTo = (event, pharma) => {
		event.preventDefault();
		if(!props.ePrescription) {
		history.push({
			pathname: APP_ROUTES.PHARMACY_CATEGOTY,
			state: {
				storeId: pharma.hospitalCode,
				locationId: pharma.code,
				name: pharma.hospitalName,
			}
		});
		} else{
			console.log(pharma , "pharma")
			props.pharmacySelected({
                storeId: pharma.hospitalCode,
                locationId: pharma.code,
                ePrescription: true
            })
		}
	};


	useEffect(() => {
		if(sessionStorage.getItem('customPinCode')){
            setIsFetchingPinCode(false);
			dispatch(getPharmacyList({ location: null, pincode: sessionStorage.getItem('customPinCode') }))

		}
	}, [sessionStorage.getItem('customPinCode')]);

	return (
		<>

			<br />
			<div className="flex flex-col m-auto p-auto mx-4">
				<SectionContainer link={APP_ROUTES.DOCTOR_SEARCH} title={'Pharmacy near you'} subtitle={'Get the best Pharmacists in your location'} seeAll={'hide'} />
				<div className="w-full lg:max-w-full lg:flex ">
					<div className="flex overflow-x-scroll pb-10 hide-scroll-bar mt-4">
						<div className="flex flex-nowrap   space-x-6">
							{pharmacyData.length > 0 && pharmacyData.map(pharma => (
								<div key={pharma.id} className="lg:p-4 p-4 bg-white lg:shadow-md shadow-sm lg:rounded-md rounded-2xl m-auto lg:w-96 w-80 md:w-96 flex-none bg-cover  lg:rounded-t-none lg:rounded-l  overflow-hidden ">
									<div className="flex items-center">
										<div>
											<img src={pharma.photoName ? process.env.REACT_APP_IMG_BASEURL + pharma.photoName : pillss} alt="pill" className={'lg:w-14 w-16 lg:h-14 w-16 rounded-md'} />
										</div>
										<div className="pl-4 lg:w-3/4">
											<p className="lg:text-sm text-md  text-gray-primary font-medium ">{pharma.hospitalName}</p>
											<p className="lg:block text-xs  text-gray-primary">Chemist</p>
											<p className="lg:text-xs text-base  font-medium text-brand-atomictangerine ">Closes soon<span className="text-xs text-brand-gunsmoke">: 11:30PM</span> </p>
										</div>
									</div>
									<p className="lg:text-xs text-md w-full lg:  lg:text-gray-500 text-brand-manatee my-3 ">{pharma.address1}, {pharma.address1 ?? ""} <br />{pharma.city}, {pharma.state} {pharma.pinCode}</p>
									{/* <p className="lg:text-xs text-md lg:  mt-1 lg:text-gray-500 lg:w-full w-72 text-brand-manatee">In-store shopping . Curbside pickup . Delivery</p> */}


									<hr className="lg:block  mt-4 mb-3" />
									<div className="lg:flex ">
										{/*<button className="text-sm font-medium text-brand-secondary">View On Map</button>*/}
										<button
											onClick={(e) => redirectTo(e, pharma)}
											className=" float-right bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3">
											Buy Medicines
										</button>
									</div>
								</div>
							))}
							{!isLoading && pharmacyData.length === 0 &&
								<div className="flex flex-wrap justify-center">
									<div className="float-center text-center" > No Pharmacy Available Nearby</div>
								</div>}
						</div>
					</div>

				</div>
				{isLoading && pharmacyData.length === 0 &&
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

export default connect(null, mapDispatchToProps,)(Pharmacy);
