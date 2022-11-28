import React from 'react'
import dettol from '../Assets/Images/dettol.svg';
import savlon from '../Assets/Images/savlon.svg';
import dettolserum from '../Assets/Images/dettolserum.svg';
import dettollimefresh from '../Assets/Images/dettollimefresh.svg';
import savlonfresh from '../Assets/Images/savlonfresh.svg';
import star from '../Assets/Images/star.svg';
import minus from '../Assets/Images/minus.svg';
import plus from '../Assets/Images/plus.svg';
import close from '../Assets/Images/close.svg';
import filter from '../Assets/Images/filter.svg';
import sort from '../Assets/Images/sort.svg';
import SectionContainer from './SectionContainer';

function CartItem() {
  return (
    <>
      
      <SectionContainer link={''} title={'Or Get the best price for the items in your cart'} subtitle={'Complete cart from one pharmacy'} seeAll={'hide'} />
      {/* <div className=" border border-gray-200 pl-10 pr-10 pt-5 pb-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5"> */}
      <div className="p-10 rounded-xl overflow-hidden  mt-3">
        <div className="flex justify-between">
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

        {/* card 1 */}
        <div className="mt-2 w-full lg:max-w-full lg:flex border-t-2 border-b-2 border-gray-200 p-5 ">
          <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" >
            <img src={dettol} alt="savlon" />
          </div>
          <div className="pl-16 w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <p className="text-sm text-gray-800 flex items-center font-medium">
                Dettol Liquid Disinfectant for Multi-Purpose Germ Protection, Menthol Cool
              </p>
              <div className="flex">
                <img src={star} alt="star" className="w-3" />
                <p className="text-xs pl-2">4.8</p>
              </div>
              <hr className="mt-2 pb-2 " />
              <div className="text-blue-500  text-xs font-medium mb-2">Bottle of 500 ml </div>
              <p className="text-gray-500 text-xs">Manfacuture :  Reckitt Benckiser</p>
              <p className="text-gray-500 text-xs pt-2">Seller:&nbsp;<span className="text-blue-500">Wellness Forever</span> &nbsp;. 2km away  </p>
              <hr className="mt-2" />
            </div>
            <div className=" ">
              <div className="flex justify-between">
                <div className=" flex ">
                  <p className="text-gray-900 leading-none text-xs pt-1">Price :  </p>
                  <p className="text-black font-medium text-sm pl-2">₹ 295.00</p>
                  <p className="text-xs line-through text-gray-500  pl-4">₹ 250.00</p>
                </div>

                <div className="flex">
                  <p className="text-xs pt-1 pr-4">Quantity :</p>
                  <p className="text-gray-700 text-base">
                    <button className=" flex space-x-2 bg-transparent  text-blue-700 py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                      <img src={minus} alt="minus" className="w-3 mt-2 " />
                      <p className="text-xs w-5 h-4 bg-green-500 rounded text-white" > 01</p>
                      <img src={plus} alt="plus" className="w-3 pt-1 " />
                    </button>
                  </p>
                  <button className="bg-brand-secondary  text-white text-xs py-1 px-2 ml-3 rounded">
                    Add to Cart
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* card 2 */}
        <div className=" w-full lg:max-w-full lg:flex border-b-2 border-gray-200 p-5 ">
          <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" >
            <img src={savlon} alt="savlon" />
          </div>
          <div className="pl-16 w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <p className="text-sm text-gray-800 flex items-center font-medium">
                Savlon Antiseptic Disinfectant Liquid for First Aid, Personal Hygiene, and Home Hygiene
              </p>
              <div className="flex">
                <img src={star} alt="star" className="w-3" />
                <p className="text-xs pl-2">4.8</p>
              </div>
              <hr className="mt-2 pb-2 " />
              <div className="text-blue-500  text-xs font-medium mb-2">Boottle of 1000 ml  </div>
              <p className="text-gray-500 text-xs">Manfacuture :  ITC</p>
              <p className="text-gray-500 text-xs pt-2">Seller:&nbsp;<span className="text-blue-500">Wellness Forever</span> &nbsp;. 2km away  </p>
              <hr className="mt-2" />
            </div>
            <div className=" ">
              <div className="flex justify-between">
                <div className=" flex ">
                  <p className="text-gray-900 leading-none text-xs pt-1">Price :  </p>
                  <p className="text-black font-medium text-sm pl-2">₹ 288.00</p>
                  <p className="text-xs line-through text-gray-500  pl-4">₹ 899.00</p>
                </div>

                <div className="flex">
                  <p className="text-xs pt-1 pr-4">Quantity :</p>
                  <p className="text-gray-700 text-base">
                    <button className=" flex space-x-2 bg-transparent  text-blue-700 py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                      <img src={minus} alt="minus" className="w-3 mt-2 " />
                      <p className="text-xs w-5 h-4 bg-green-500 rounded text-white" > 01</p>
                      <img src={plus} alt="plus" className="w-3 pt-1 " />
                    </button>
                  </p>
                  <button className="bg-brand-secondary  text-white text-xs py-1 px-2 ml-3 rounded">
                    Add to Cart
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* card 3 */}
        <div className=" w-full lg:max-w-full lg:flex border-b-2 border-gray-200 p-5 ">
          <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" >
            <img src={dettolserum} alt="dettolserum" />
          </div>
          <div className="pl-16 w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <p className="text-sm text-gray-800 flex items-center font-medium">
                Dettol Original Germ Protection Alcohol based Hand Sanitizer Refill Bottle
              </p>
              <div className="flex">
                <img src={star} alt="star" className="w-3" />
                <p className="text-xs pl-2">4.8</p>
              </div>
              <hr className="mt-2 pb-2 " />
              <div className="text-blue-500  text-xs font-medium mb-2">Bottle of 500 ml </div>
              <p className="text-gray-500 text-xs">Manfacuture :  Reckitt Benckiser</p>
              <p className="text-gray-500 text-xs pt-2">Seller:&nbsp;<span className="text-blue-500">Wellness Forever</span> &nbsp;. 2km away  </p>
              <hr className="mt-2" />
            </div>
            <div className=" ">
              <div className="flex justify-between">
                <div className=" flex ">
                  <p className="text-gray-900 leading-none text-xs pt-1">Price :  </p>
                  <p className="text-black font-medium text-sm pl-2">₹ 295.00</p>
                  <p className="text-xs line-through text-gray-500  pl-4">₹ 250.00</p>
                </div>

                <div className="flex">
                  <p className="text-xs pt-1 pr-4">Quantity :</p>
                  <p className="text-gray-700 text-base">
                    <button className=" flex space-x-2 bg-transparent  text-blue-700 py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                      <img src={minus} alt="minus" className="w-3 mt-2 " />
                      <p className="text-xs w-5 h-4 bg-green-500 rounded text-white" > 01</p>
                      <img src={plus} alt="plus" className="w-3 pt-1 " />
                    </button>
                  </p>
                  <button className="bg-brand-secondary  text-white text-xs py-1 px-2 ml-3 rounded">
                    Add to Cart
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* card 4 */}
        <div className=" w-full lg:max-w-full lg:flex border-b-2 border-gray-200 p-5 ">
          <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" >
            <img src={dettollimefresh} alt="dettol" />
          </div>
          <div className="pl-16 w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <p className="text-sm text-gray-800 flex items-center font-medium">
                Dettol Liquid Disinfectant Cleaner for Home, Lime Fresh
              </p>
              <div className="flex">
                <img src={star} alt="star" className="w-3" />
                <p className="text-xs pl-2">4.8</p>
              </div>
              <hr className="mt-2 pb-2 " />
              <div className="text-blue-500  text-xs font-medium mb-2">Boottle of 1L  </div>
              <p className="text-gray-500 text-xs">Manfacuture :  Reckitt Benckiser</p>
              <p className="text-gray-500 text-xs pt-2">Seller:&nbsp;<span className="text-blue-500">Wellness Forever</span> &nbsp;. 2km away  </p>
              <hr className="mt-2" />
            </div>
            <div className=" ">
              <div className="flex justify-between">
                <div className=" flex ">
                  <p className="text-gray-900 leading-none text-xs pt-1">Price :  </p>
                  <p className="text-black font-medium text-sm pl-2">₹ 295.00</p>
                  <p className="text-xs line-through text-gray-500  pl-4">₹ 346.00</p>
                </div>

                <div className="flex">
                  <p className="text-xs pt-1 pr-4">Quantity :</p>
                  <p className="text-gray-700 text-base">
                    <button className=" flex space-x-2 bg-transparent  text-blue-700 py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                      <img src={minus} alt="minus" className="w-3 mt-2 " />
                      <p className="text-xs w-5 h-4 bg-green-500 rounded text-white" > 01</p>
                      <img src={plus} alt="plus" className="w-3 pt-1 " />
                    </button>
                  </p>
                  <button className="bg-brand-secondary  text-white text-xs py-1 px-2 ml-3 rounded">
                    Add to Cart
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className=" w-full lg:max-w-full lg:flex border-b-2 border-gray-200 p-5 ">
          <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" >
            <img src={savlonfresh} alt="dettol" />
          </div>
          <div className="pl-16 w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <p className="text-sm text-gray-800 flex items-center font-medium">
                Savlon Multipurpose Disinfectant Cleaner Liquid,Citrus Fresh Fragrance
              </p>
              <div className="flex">
                <img src={star} alt="star" className="w-3" />
                <p className="text-xs pl-2">4.8</p>
              </div>
              <hr className="mt-2 pb-2 " />
              <div className="text-blue-500  text-xs font-medium mb-2">Bottle of 500 ml   </div>
              <p className="text-gray-500 text-xs">Manfacuture :  Reckitt Benckiser</p>
              <p className="text-gray-500 text-xs pt-2">Seller:&nbsp;<span className="text-blue-500">Wellness Forever</span> &nbsp;. 2km away  </p>
              <hr className="mt-2" />
            </div>
            <div className=" ">
              <div className="flex justify-between">
                <div className=" flex ">
                  <p className="text-gray-900 leading-none text-xs pt-1">Price :  </p>
                  <p className="text-black font-medium text-sm pl-2">₹ 149.00</p>
                  <p className="text-xs line-through text-gray-500  pl-4">	₹ 193.00</p>
                </div>

                <div className="flex">
                  <p className="text-xs pt-1 pr-4">Quantity :</p>
                  <p className="text-gray-700 text-base">
                    <button className=" flex space-x-2 bg-transparent  text-blue-700 py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                      <img src={minus} alt="minus" className="w-3 mt-2 " />
                      <p className="text-xs w-5 h-4 bg-green-500 rounded text-white" > 01</p>
                      <img src={plus} alt="plus" className="w-3 pt-1 " />
                    </button>
                  </p>
                  <button className="bg-brand-secondary  text-white text-xs py-1 px-2 ml-3 rounded">
                    Add to Cart
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>






      {/* </div> */}
      <br />
    </>
  );
}
export default CartItem;