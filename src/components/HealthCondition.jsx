import covid from '../Assets/Images/Covid.png';
import Dermatologist from '../Assets/Images/Dermatologist.png';
import SkinCare from '../Assets/Images/Skin Care.png';
import Weightloss from '../Assets/Images/Weight loss.png';
import Painrelief from '../Assets/Images/Pain relief.png';
import Coughandcold from '../Assets/Images/Cough and cold.png';
import Heartcare from '../Assets/Images/Heart care.png';
import Diabetes from '../Assets/Images/Diabetes.png';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLoginModal, } from '../Redux/Actions/userActions';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import { useSelector } from 'react-redux';
import SectionContainer from './SectionContainer';

function HealthCondition() {
	const userData = useSelector(state => state.authReducer.patientData);
	const history = useHistory();

	const redirectTo = (event) => {
		event.preventDefault();
		history.push(APP_ROUTES.Lab_BIO);
	};
	return (
		<>

			<div className="flex flex-col  m-auto p-auto mx-4">
				<SectionContainer link={APP_ROUTES.DOCTOR_SEARCH} title={'Shop by Health Condition'} subtitle={'Browse bsed on health concers'} seeAll={'hide'} />
				<div className="w-full lg:max-w-full lg:flex ">
					<div className="flex overflow-x-scroll pb-5 hide-scroll-bar">
						<div className="flex flex-nowrap   space-x-6">

							{/*circle 1  */}
							<div className=" rounded-md m-auto h-auto lg:h-auto lg:w-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden ">
								<div className="flex justify-start">
									<div >
										<img src={covid} alt="lab0" className={'w-32 h-32 rounded-md'} />
									</div>
								</div>

							</div>
							{/*circle 2 */}
							<div className=" rounded-md m-auto h-auto lg:h-auto lg:w-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden ">
								<div className="flex justify-start">
									<div >
										<img src={Diabetes} alt="lab1" className={'w-32 w-32 rounded-md'} />
									</div>
								</div>

							</div>

							{/*circle 3 */}
							<div className=" rounded-md m-auto h-auto lg:h-auto lg:w-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden ">
								<div className="flex justify-start">
									<div >
										<img src={Heartcare} alt="lab2" className={'w-32 w-32 rounded-md'} />
									</div>
								</div>

							</div>
							{/*circle 4 */}
							<div className="  rounded-md m-auto h-auto lg:h-auto lg:w-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden ">
								<div className="flex justify-start">
									<div >
										<img src={Coughandcold} alt="lab3" className={'w-32 w-32 rounded-md'} />
									</div>
								</div>

							</div>
							{/*circle 5 */}
							<div className=" rounded-md m-auto h-auto lg:h-auto lg:w-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden ">
								<div className="flex justify-start">
									<div >
										<img src={Painrelief} alt="lab4" className={'w-32 w-32 rounded-md'} />
									</div>
								</div>

							</div>
							{/*circle 6 */}
							<div className="  rounded-md m-auto h-auto lg:h-auto lg:w-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden ">
								<div className="flex justify-start">
									<div >
										<img src={Weightloss} alt="lab5" className={'w-32 w-32 rounded-md'} />
									</div>
								</div>

							</div>
							{/*circle 7*/}
							<div className=" rounded-md m-auto h-auto lg:h-auto lg:w-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden ">
								<div className="flex justify-start">
									<div >
										<img src={SkinCare} alt="lab5" className={'w-32 w-32 rounded-md'} />
									</div>
								</div>

							</div>
							{/*circle 8 */}
							<div className=" rounded-md m-auto h-auto lg:h-auto lg:w-auto flex-none bg-cover  text-center overflow-hidden ">
								<div className="flex justify-start">
									<div >
										<img src={Dermatologist} alt="lab5" className={'w-32 w-32 rounded-md'} />
									</div>
								</div>

							</div>

						</div>
					</div >

				</div>
			</div>
		</>



	);
}

const mapDispatchToProps = (dispatch) => ({
	setLoginModal: () => dispatch(setLoginModal()),

});

export default connect(null, mapDispatchToProps,)(HealthCondition);

