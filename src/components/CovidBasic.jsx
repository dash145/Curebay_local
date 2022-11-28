import covid from '../Assets/Images/Covid.png';
import Dermatologist from '../Assets/Images/Dermatologist.png';
import SkinCare from '../Assets/Images/Skin Care.png';
import Weightloss from '../Assets/Images/Weight loss.png';
import Painrelief from '../Assets/Images/Pain relief.png';
import Coughandcold from '../Assets/Images/Cough and cold.png';
import Heartcare from '../Assets/Images/Heart care.png';
import Diabetes from '../Assets/Images/Diabetes.png';
import { connect } from 'react-redux';
import { setLoginModal, } from '../Redux/Actions/userActions';
import right from '../Assets/Images/right.svg';
import left from '../Assets/Images/left.svg';

function CovidBasic() {
	return (
		<>
			<br />
			<div className="flex flex-col bg-white m-auto p-auto">
				<p className="text-xl font-medium text-gray-700 ml-10">Shop by Covid Basic Needs   </p>
				<div className="flex justify-between ml-10">
					<p className="text-sm text-gray-400">Browse medicine & wellness product  based on your needs</p>
					<div className="flex pb-3">
						<div className="flex pl-6">
							<img src={right} alt="right arrow" />
							<img src={left} alt="right left" className="pl-6" />
						</div>
					</div>
				</div>

				<div className="w-full lg:max-w-full lg:flex ">
					<div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
						<div className="flex flex-nowrap lg:ml-10 md:ml-20 ml-10  space-x-6">

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

export default connect(null, mapDispatchToProps,)(CovidBasic);

