import dettolspray from '../Assets/Images/dettolspray.svg';
import mask from '../Assets/Images/mask.svg';
import dettolwater from '../Assets/Images/dettolwater.svg';
import img4 from '../Assets/Images/img4.svg';
import carex from '../Assets/Images/carex.svg';
import tharmameter from '../Assets/Images/tharmameter.svg';
import savelonn from '../Assets/Images/savelonn.svg';
import lifeboy from '../Assets/Images/lifeboy.svg';
import savelonwater from '../Assets/Images/savelonwater.svg';
import honey from '../Assets/Images/honey.svg';
import oxy from '../Assets/Images/oxy.svg';
import savelonspray from '../Assets/Images/savelonspray.svg';
import diagno from '../Assets/Images/Prescriptionicon.svg';
import { connect } from 'react-redux';
import { setLoginModal, } from '../Redux/Actions/userActions';
import right from '../Assets/Images/right.svg';
import left from '../Assets/Images/left.svg';
import greenstar from '../Assets/Images/greenstar.svg';
import filter from '../Assets/Images/filter.svg';
import sort from '../Assets/Images/sort.svg';
import close from '../Assets/Images/close.svg';

function Ordered_med() {
	return (
		<>
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
                <div className="flex justify-between py-4 px-8">
          <div className="flex">
            <div className="h-6 w-16 pl-1 pt-1 bg-green-500 rounded-2xl">
              <div className="flex justify-around ">
                <p className="text-xs  text-white">Online</p>
                <img src={close} alt="close" />
              </div>
            </div>
            <div className="h-6 w-20 pl-1 pt-1 bg-green-500 rounded-2xl ml-3">
              <div className="flex justify-around">
                <p className="text-xs text-white">Location</p>
                <img src={close} alt="close" />
              </div>
            </div>
            <div className="h-6 w-24 pl-1 pt-1 bg-green-500 rounded-2xl ml-3">
              <div className="flex justify-around ">
                <p className="text-xs text-white">₹500 - ₹750</p>
                <img src={close} alt="close" />
              </div>
            </div>
          </div>

          <div className="flex">
            <div className=" flex justify-items-auto " >

              <div className="">
                <div className="flex justify-items-auto" >
                  <img src={filter} alt="filter" />
                  <p className="text-xs pl-2">Filter</p>
                </div>
              </div>
              <div className="">
                <div className="flex justify-items-auto pl-4" >
                  <img src={sort} alt="sort" />
                  <p className="text-xs pl-2">Sort by: Popular</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="pl-10 pr-10 pb-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {/* <!--Card 1--> */}
          <div className=" overflow-hidden shadow-sm border border-gray-200 rounded-xl p-5 ">
          <img src={diagno} alt="prescription" className="float-right" />
                    <div className="flex flex-wrap justify-center">
                    <img src={img4} alt="img4" />
                   
                    </div>
                  
                <p className=" text-sm  pt-4 text-gray-700">Dettol Liquid Disinfectant Menthol Cool</p>

                <div className="flex justify-between">
                <p className="text-brand-gunsmoke text-xs  mt-2  " > Bottle of 500ml</p>
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
                <p className=" text-sm font-medium ">₹ 295</p>
                </div>

                <div>
                <button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3">Add</button>
                </div>
                </div>	
                <div>

                </div>
          </div>
          {/* <!--Card 2--> */}
        
           <div className=" overflow-hidden shadow-sm border border-gray-200 rounded-xl p-5 ">
          
                    <div className="flex flex-wrap justify-center">
                    <img src={dettolspray} alt="dettolspray" className="w-36" />
                   
                    </div>
                  
                <p className=" text-sm  pt-5 text-gray-700">Dettol Liquid Disinfectant Menthol Cool</p>

                <div className="flex justify-between">
                <p className="text-brand-gunsmoke text-xs  mt-2  " > Bottle of 500ml</p>
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
                <p className=" text-sm font-medium ">₹ 295</p>
                </div>

                <div>
                <button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3">Add</button>
                </div>
                </div>	
                <div>

                </div>
          </div>
          {/* <!--Card 3--> */}
        
           <div className=" overflow-hidden shadow-sm border border-gray-200 rounded-xl p-5  ">
          <img src={diagno} alt="prescription" className="float-right" />
                    <div className="flex flex-wrap justify-center">
                    <img src={mask} alt="mask" className="w-36" />
                   
                    </div>
                  
                <p className=" text-sm  pt-5 text-gray-700">Dettol Liquid Disinfectant Menthol Cool</p>

                <div className="flex justify-between">
                <p className="text-brand-gunsmoke text-xs  mt-2  " > Bottle of 500ml</p>
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
                <p className=" text-sm font-medium ">₹ 295</p>
                </div>

                <div>
                <button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3">Add</button>
                </div>
                </div>	
                <div>

                </div>
          </div>

          {/* <!--Card 4--> */}
           
           <div className=" overflow-hidden shadow-sm border border-gray-200 rounded-xl p-5 ">
          <img src={diagno} alt="prescription" className="float-right" />
                    <div className="flex flex-wrap justify-center">
                    <img src={dettolwater} alt="dettolwater" className="w-36"/>
                   
                    </div>
                  
                <p className=" text-sm  pt-5 text-gray-700">Dettol Liquid Disinfectant Menthol Cool</p>

                <div className="flex justify-between">
                <p className="text-brand-gunsmoke text-xs  mt-2  " > Bottle of 500ml</p>
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
                <p className=" text-sm font-medium ">₹ 295</p>
                </div>

                <div>
                <button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3">Add</button>
                </div>
                </div>	
                <div>

                </div>
          </div>

           {/* <!--Card 5--> */}
           <div className=" overflow-hidden shadow-sm border border-gray-200 rounded-xl p-5 ">
          <img src={diagno} alt="prescription" className="float-right" />
                    <div className="flex flex-wrap justify-center">
                    <img src={carex} alt="carex" className="w-36" />
                   
                    </div>
                  
                <p className=" text-sm  pt-5 text-gray-700">Dettol Liquid Disinfectant Menthol Cool</p>

                <div className="flex justify-between">
                <p className="text-brand-gunsmoke text-xs  mt-2  " > Bottle of 500ml</p>
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
                <p className=" text-sm font-medium ">₹ 295</p>
                </div>

                <div>
                <button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3">Add</button>
                </div>
                </div>	
                <div>

                </div>
          </div>
          {/* <!--Card 6--> */}
        
           <div className=" overflow-hidden shadow-sm border border-gray-200 rounded-xl p-5 ">
          
                    <div className="flex flex-wrap justify-center">
                    <img src={tharmameter} alt="tharmameter" className="w-36" />
                   
                    </div>
                  
                <p className=" text-sm  pt-5 text-gray-700">Dettol Liquid Disinfectant Menthol Cool</p>

                <div className="flex justify-between">
                <p className="text-brand-gunsmoke text-xs  mt-2  " > Bottle of 500ml</p>
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
                <p className=" text-sm font-medium ">₹ 295</p>
                </div>

                <div>
                <button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3">Add</button>
                </div>
                </div>	
                <div>

                </div>
          </div>
          {/* <!--Card 7--> */}
        
           <div className=" overflow-hidden shadow-sm border border-gray-200 rounded-xl p-5  ">
          <img src={diagno} alt="prescription" className="float-right" />
                    <div className="flex flex-wrap justify-center">
                    <img src={savelonn} alt="savelonn" className="w-36" />
                   
                    </div>
                  
                <p className=" text-sm  pt-5 text-gray-700">Dettol Liquid Disinfectant Menthol Cool</p>

                <div className="flex justify-between">
                <p className="text-brand-gunsmoke text-xs  mt-2  " > Bottle of 500ml</p>
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
                <p className=" text-sm font-medium ">₹ 295</p>
                </div>

                <div>
                <button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3">Add</button>
                </div>
                </div>	
                <div>

                </div>
          </div>

          {/* <!--Card 8--> */}
           
           <div className=" overflow-hidden shadow-sm border border-gray-200 rounded-xl p-5 ">
          <img src={diagno} alt="prescription" className="float-right" />
                    <div className="flex flex-wrap justify-center">
                    <img src={lifeboy} alt="lifeboy" className="w-36"/>
                   
                    </div>
                  
                <p className=" text-sm  pt-5 text-gray-700">Dettol Liquid Disinfectant Menthol Cool</p>

                <div className="flex justify-between">
                <p className="text-brand-gunsmoke text-xs  mt-2  " > Bottle of 500ml</p>
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
                <p className=" text-sm font-medium ">₹ 295</p>
                </div>

                <div>
                <button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3">Add</button>
                </div>
                </div>	
                <div>

                </div>
          </div>

 {/* <!--Card 9--> */}
 <div className=" overflow-hidden shadow-sm border border-gray-200 rounded-xl p-5 ">
          <img src={diagno} alt="prescription" className="float-right" />
                    <div className="flex flex-wrap justify-center">
                    <img src={savelonwater} alt="savelonwater" className="w-36" />
                   
                    </div>
                  
                <p className=" text-sm  pt-5 text-gray-700">Dettol Liquid Disinfectant Menthol Cool</p>

                <div className="flex justify-between">
                <p className="text-brand-gunsmoke text-xs  mt-2  " > Bottle of 500ml</p>
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
                <p className=" text-sm font-medium ">₹ 295</p>
                </div>

                <div>
                <button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3">Add</button>
                </div>
                </div>	
                <div>

                </div>
          </div>
          {/* <!--Card 10--> */}
        
           <div className=" overflow-hidden shadow-sm border border-gray-200 rounded-xl p-5 ">
          
                    <div className="flex flex-wrap justify-center">
                    <img src={honey} alt="honey" className="w-36" />
                   
                    </div>
                  
                <p className=" text-sm  pt-5 text-gray-700">Dettol Liquid Disinfectant Menthol Cool</p>

                <div className="flex justify-between">
                <p className="text-brand-gunsmoke text-xs  mt-2  " > Bottle of 500ml</p>
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
                <p className=" text-sm font-medium ">₹ 295</p>
                </div>

                <div>
                <button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3">Add</button>
                </div>
                </div>	
                <div>

                </div>
          </div>
          {/* <!--Card 11--> */}
        
           <div className=" overflow-hidden shadow-sm border border-gray-200 rounded-xl p-5  ">
          <img src={diagno} alt="prescription" className="float-right" />
                    <div className="flex flex-wrap justify-center">
                    <img src={oxy} alt="oxy" className="w-36" />
                   
                    </div>
                  
                <p className=" text-sm  pt-5 text-gray-700">Dettol Liquid Disinfectant Menthol Cool</p>

                <div className="flex justify-between">
                <p className="text-brand-gunsmoke text-xs  mt-2  " > Bottle of 500ml</p>
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
                <p className=" text-sm font-medium ">₹ 295</p>
                </div>

                <div>
                <button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3">Add</button>
                </div>
                </div>	
                <div>

                </div>
          </div>

          {/* <!--Card 12--> */}
           
           <div className=" overflow-hidden shadow-sm border border-gray-200 rounded-xl p-5 ">
          <img src={diagno} alt="prescription" className="float-right" />
                    <div className="flex flex-wrap justify-center">
                    <img src={savelonspray} alt="savelonspray" className="w-36"/>
                   
                    </div>
                  
                <p className=" text-sm  pt-5 text-gray-700">Dettol Liquid Disinfectant Menthol Cool</p>

                <div className="flex justify-between">
                <p className="text-brand-gunsmoke text-xs  mt-2  " > Bottle of 500ml</p>
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
                <p className=" text-sm font-medium ">₹ 295</p>
                </div>

                <div>
                <button className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-3">Add</button>
                </div>
                </div>	
                <div>

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

export default connect(null, mapDispatchToProps,)(Ordered_med);

