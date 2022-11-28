import dettol from '../Assets/Images/img1.svg';
import img2 from '../Assets/Images/img2.svg';
import img3 from '../Assets/Images/img3.svg';
import img4 from '../Assets/Images/img4.svg';
import img5 from '../Assets/Images/img5.svg';
import img6 from '../Assets/Images/img6.svg';
import greenstar from '../Assets/Images/greenstar.svg';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLoginModal, } from '../Redux/Actions/userActions';
import DefaultMed from '../Assets/Images/defaultMedicine.jpeg'
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import { useSelector } from 'react-redux';
import SectionContainer from './SectionContainer';

function SimilarProducts() {
	const userData = useSelector(state => state.authReducer.patientData);
	const history = useHistory();

	const redirectTo = (event) => {
		event.preventDefault();
		history.push(APP_ROUTES.Lab_BIO);
	};
	return (
		<>

		 	<div className="flex flex-col  m-auto p-auto mb-20">
			<SectionContainer link={APP_ROUTES.PHARMACY_CATEGOTY} title={'Similar Products'} subtitle={'We have some product recommendation '} seeAll={'Products'} />
				<div className="w-full lg:max-w-full lg:flex ">
					<div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
					<div className="flex flex-nowrap lg:ml-10 md:ml-20 ml-10  space-x-6">
					{/* card 1 */}
					<div className="p-4 bg-white shadow-md rounded-md m-auto h-auto lg:h-auto lg:w-48 flex-none bg-cover overflow-hidden ">
						<div className="flex">

								<img src={DefaultMed} alt="lab0" className="h-44 w-44" />
						</div>
                         <p className=" text-xs ">Zincovit Tablet 15\'s <br/> Composition details</p>
						 <div className="flex justify-between">
						 <p className="text-brand-gunsmoke text-xs  mt-2  " >{'15 Tablet in 1 Strip'}</p>
						 <div className="flex pt-1">
						 <img src={greenstar} alt="star" className="w-3" />
						 <p className="text-xs pt-1 pl-1">4.8</p>
						 </div>
						 </div>

                        <div className=" flex justify-between mt-3">
							<div>
							<div className="flex">
                            <p className="text-xs line-through text-gray-500">₹150.00</p>
                            <p className="text-xs text-green-500"> (40%off)</p>
							</div>
							<p className=" text-xs ">₹ 150.00</p>
							</div>
							
							<div>
							<button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-1 px-2">Add</button>
                       		</div>
					    </div>	
						<div>
                            
							</div>
					</div>

                   {/* card 2 */}
					<div className="p-4 bg-white shadow-md rounded-md m-auto h-auto lg:h-auto lg:w-48 flex-none bg-cover overflow-hidden ">
						<div className="flex">
							
								<img src={img2} alt="img-2"  />
							
						</div>
						<div className="flex justify-between">
							<div>
                         <p className=" text-xs ">Zincovit Tablet 15\'s <br/> Composition details</p>
                         
						 </div>
						 <div className="flex">
						 <img src={greenstar} alt="star" className="w-3" />
						 <p className="text-xs pt-2">4.8</p>
						 </div>
                         </div>
						 <p className="text-brand-gunsmoke text-xs  mt-2  " >{'15 Tablet in 1 Strip'}</p>
                        <div className=" flex justify-between mt-3">
							<div>
							<div className="flex">
                            <p className="text-xs line-through text-gray-500">₹150.00</p>
                            <p className="text-xs text-green-500"> (40%off)</p>
							</div>
							<p className="text-xs ">₹ 150.00</p>
							</div>
							
							<div>
							<button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-1 px-2">Add</button>
                       		</div>
					    </div>	
						<div>
                            
							</div>
					</div>
                   {/* card 3*/}
					<div className="p-4 bg-white shadow-md rounded-md m-auto h-auto lg:h-auto lg:w-48 flex-none bg-cover overflow-hidden ">
						<div className="flex">
							
								<img src={img3} alt="img3"  />
							
						</div>
						<div className="flex justify-between">
							<div>
                         <p className=" text-xs ">Zincovit Tablet 15\'s <br/> Composition details</p>
                         
						 </div>
						 <div className="flex">
						 <img src={greenstar} alt="star" className="w-3" />
						 <p className="text-xs pt-2">4.8</p>
						 </div>
                         </div>
						 <p className="text-brand-gunsmoke text-xs  mt-2  " >{'15 Tablet in 1 Strip'}</p>
                        <div className=" flex justify-between mt-3">
							<div>
							<div className="flex">
                            <p className="text-xs line-through text-gray-500">₹150.00</p>
                            <p className="text-xs text-green-500"> (40%off)</p>
							</div>
							<p className=" text-xs ">₹ 150.00</p>
							</div>
							
							<div>
							<button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-1 px-2">Add</button>
                       		</div>
					    </div>	
						<div>
                            
							</div>
					</div>
                   {/* card 4 */}
					<div className="p-4 bg-white shadow-md rounded-md m-auto h-auto lg:h-auto lg:w-48 flex-none bg-cover overflow-hidden ">
						<div className="flex">
							
								<img src={img4} alt="img4" />
							
						</div>
						<div className="flex justify-between">
							<div>
                         <p className=" text-xs ">Zincovit Tablet 15\'s <br/> Composition details</p>
                         
						 </div>
						 <div className="flex">
						 <img src={greenstar} alt="star" className="w-3" />
						 <p className="text-xs pt-2">4.8</p>
						 </div>
                         </div>
						 <p className="text-brand-gunsmoke text-xs  mt-2  " >{'15 Tablet in 1 Strip'}</p>
                        <div className=" flex justify-between mt-3">
							<div>
							<div className="flex">
                            <p className="text-xs line-through text-gray-500">₹150.00</p>
                            <p className="text-xs text-green-500"> (40%off)</p>
							</div>
							<p className=" text-xs ">₹ 150.00</p>
							</div>
							
							<div>
							<button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-1 px-2">Add</button>
                       		</div>
					    </div>	
						<div>
                            
							</div>
					</div>
                    {/* card 5*/}
					<div className="p-4 bg-white shadow-md rounded-md m-auto h-auto lg:h-auto lg:w-48 flex-none bg-cover overflow-hidden ">
						<div className="flex">
							
								<img src={img5} alt="img5"  />
							
						</div>
						<div className="flex justify-between">
							<div>
                         <p className=" text-xs ">Zincovit Tablet 15\'s <br/> Composition details</p>
                         
						 </div>
						 <div className="flex">
						 <img src={greenstar} alt="star" className="w-3" />
						 <p className="text-xs pt-2">4.8</p>
						 </div>
                         </div>
						 <p className="text-brand-gunsmoke text-xs  mt-2  " >{'15 Tablet in 1 Strip'}</p>
                        <div className=" flex justify-between mt-3">
							<div>
							<div className="flex">
                            <p className="text-xs line-through text-gray-500">₹150.00</p>
                            <p className="text-xs text-green-500"> (40%off)</p>
							</div>
							<p className=" text-xs ">₹ 150.00</p>
							</div>
							
							<div>
							<button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-1 px-2">Add</button>
                       		</div>
					    </div>	
						<div>
                            
							</div>
					</div>
                   {/* card 6 */}
					<div className="p-4 bg-white shadow-md rounded-md m-auto h-auto lg:h-auto lg:w-48 flex-none bg-cover overflow-hidden ">
						<div className="flex">
							
								<img src={img6} alt="img6" />
							
						</div>
						<div className="flex justify-between">
							<div>
                         <p className=" text-xs ">Zincovit Tablet 15\'s <br/> Composition details</p>
                         
						 </div>
						 <div className="flex">
						 <img src={greenstar} alt="star" className="w-3" />
						 <p className="text-xs pt-2">4.8</p>
						 </div>
                         </div>
						 <p className="text-brand-gunsmoke text-xs  mt-2  " >{'15 Tablet in 1 Strip'}</p>
                        <div className=" flex justify-between mt-3">
							<div>
							<div className="flex">
                            <p className="text-xs line-through text-gray-500">₹150.00</p>
                            <p className="text-xs text-green-500"> (40%off)</p>
							</div>
							<p className="text-black text-xs ">₹ 150.00</p>
							</div>
							
							<div>
							<button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-1 px-2">Add</button>
                       		</div>
					    </div>	
						<div>
                            
							</div>
					</div>

                
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

export default connect(null, mapDispatchToProps,)(SimilarProducts);

