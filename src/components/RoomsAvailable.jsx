import React from 'react'
import right from '../Assets/Images/right.svg';
import left from '../Assets/Images/left.svg';
import rooms1 from '../Assets/Images/room1.svg';
import star from '../Assets/Images/starr.svg';
import { useHistory } from 'react-router-dom';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import SectionContainer from './SectionContainer';

function RoomsAvailable() {
    const history = useHistory();
    const redirectTo = (event, location) => {
        event.preventDefault();
        history.push(location)
    }
    return (
        <>
            <div className="w-full px-3 pt-5 ">
                <SectionContainer link={APP_ROUTES.DOCTOR_SEARCH} title={'Rooms Available Hospital'} subtitle={'Get treatment from the best hospitals'} seeAll={'Rooms'} />
                <div className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                    <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200">
                        <div>
                            <img className="w-full p-4" src={rooms1} alt="rooms1" />
                            {/* <div className="absolute bottom-0 right-0 h-16 w-16">₹ 1500/bed</div> */}
                        </div>
                        <div className="px-6 py-2">
                            <div className="font-normal text-brand-primary  text-base mb-2">
                                <p>Single Occupancy room <span className="font-normal text-green-500  text-sm">( Recommended)</span></p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-400 text-base ">Thane, Mumbai </p>
                                {/*<div className="flex">
                                    <img src={star} alt="star" />
                                    <p className="text-gray-400 text-base  pl-2">4.8 (456 Reviews)</p>
                                </div>*/}
                            </div>

                        </div>
                        <div className="px-6 pt-4 pb-2 float-right space-x-3">
                            <button onClick={(e) => redirectTo(e, APP_ROUTES.SINGLE_OCCUPANCY)} className="bg-transparent  font-medium text-brand-secondary py-2 px-4 border border-brand-secondary hover:border-transparent rounded-xl">View Details</button>
                            <button className="bg-brand-secondary font-medium text-white py-2 px-4 rounded-xl">Book Bed</button>
                        </div>
                    </div>
                    {/* <!--Card 2--> */}
                    <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200">
                        <div>
                            <img className="w-full p-4" src={rooms1} alt="rooms1" />
                            {/* <div className="absolute bottom-0 right-0 h-16 w-16">₹ 1500/bed</div> */}
                        </div>
                        <div className="px-6 py-2">
                            <div className="font-normal text-brand-primary  text-base mb-2">
                                <p>General Bed</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-400 text-base ">Thane, Mumbai </p>
                                {/*<div className="flex">
                                    <img src={star} alt="star" />
                                    <p className="text-gray-400 text-base  pl-2">4.8 (456 Reviews)</p>
                                </div>*/}
                            </div>

                        </div>
                        <div className="px-6 pt-4 pb-2 float-right space-x-3">
                            <button className="bg-transparent  font-medium text-brand-secondary py-2 px-4 border border-brand-secondary hover:border-transparent rounded-xl">View Details</button>
                            <button className="bg-brand-secondary font-medium text-white py-2 px-4 rounded-xl">Book Bed</button>
                        </div>
                    </div>

                    {/* <!--Card 3--> */}
                    <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200">
                        <div>
                            <img className="w-full p-4" src={rooms1} alt="rooms1" />
                            {/* <div className="absolute bottom-0 right-0 h-16 w-16">₹ 1500/bed</div> */}
                        </div>
                        <div className="px-6 py-2">
                            <div className="font-normal text-brand-primary  text-base mb-2">
                                <p>A/C Double occupancy</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-400 text-base ">Thane, Mumbai </p>
                                {/*<div className="flex">
                                    <img src={star} alt="star" />
                                    <p className="text-gray-400 text-base  pl-2">4.8 (456 Reviews)</p>
                                </div>*/}
                            </div>

                        </div>
                        <div className="px-6 pt-4 pb-2 float-right space-x-3">
                            <button className="bg-transparent  font-medium text-brand-secondary py-2 px-4 border border-brand-secondary hover:border-transparent rounded-xl">View Details</button>
                            <button className="bg-brand-secondary font-medium text-white py-2 px-4 rounded-xl">Book Bed</button>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}
export default RoomsAvailable;