import CovidEssentials from '../Assets/Images/Covid Essentials.png';
import BabayProducts from '../Assets/Images/Babay Products.png';
import Fitnessessentials from '../Assets/Images/Fitness essentials.png';
import Skincareproducts from '../Assets/Images/Skin care products.png';
import { connect } from 'react-redux';
import { setLoginModal, } from '../Redux/Actions/userActions';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import SectionContainer from './SectionContainer';
function CategoryShop() {
	const data = [
		{ img: CovidEssentials },
		{ img: BabayProducts },
		{ img: Fitnessessentials },
		{ img: Skincareproducts },
	]
	return (
		<>
			<div className="flex flex-col mt-10 m-auto p-auto mx-4">
				<SectionContainer link={APP_ROUTES.DOCTOR_SEARCH} title={'Shop by Category'} subtitle={'Browse categories based on your needs'} seeAll={'hide'} />
				<div className="w-full lg:max-w-full lg:flex ">
					<div className="flex overflow-x-scroll pb-10 hide-scroll-bar mt-4">
						<div className="flex flex-nowrap  space-x-6">
							{data.map((res, i) => (

								<div key={i} className="lg:p-2 p-3 bg-white lg:shadow-md shadow-sm lg:rounded-md rounded-xl m-auto h-auto lg:h-auto lg:w-auto w-80 flex-none bg-cover  overflow-hidden ">
									<div className="flex justify-center py-2">
										<div >
											<img src={res.img} alt="lab0" className={'w-15 h-15 rounded-md'} />
										</div>
									</div>
									<div className="py-2">
										<p className="break-words lg:text-sm text-2xl font-normal text-gray-primary lg:font-medium pt-3 ">{'Covid Essentials'}</p>
										<p className="text-brand-manatee pt-2 lg:text-xs   font-thin   " >{'We will fight with covid together.'}</p>
										<button className="py-2 lg:text-xs text-lg font-medium text-brand-secondary float-right">View All</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

const mapDispatchToProps = (dispatch) => ({
	setLoginModal: () => dispatch(setLoginModal()),

});

export default connect(null, mapDispatchToProps,)(CategoryShop);

