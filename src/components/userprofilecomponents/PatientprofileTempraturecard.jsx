
import more from '../../Assets/Images/More .svg';
import temp from '../../Assets/Images/temp.svg';

import { useSelector } from 'react-redux';
import analytics from '../../Assets/Images/analytics.png'
import hearts from '../../Assets/Images/heart.svg';

import { APP_ROUTES } from '../../application/Router/constants/AppRoutes';
import { Fragment, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, ShoppingCartIcon, MenuIcon, UserCircleIcon } from '@heroicons/react/outline'
import { USERPROFILE_ROUTES } from "../../application/Router/constants/UserProfileRoutes";
import Allvitalspopup from './Allvitalspopup';
import { Button } from 'react-bootstrap';
import Addvitalspopup from './Addvitalspopup';
import Removevitalspopup from './Removevitalspopup';
import VitalChart from './vitals/VitalsTrendChart';
import Tempreature from "../../Assets/Images/tempreature.png"

function PatientprofileTempraturecard(props) {


    const history = useHistory();
    const location = useLocation();

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }


    const [showviewall, setshowviewall] = useState(false);
    const [showentervitals, setshowentervitals] = useState(false);
    const [showremovevitals, setshowremovevitals] = useState(false);
    const [data, setData] = useState();
    const [graphPop, setGraphPop] = useState(false);

    const viewDetails = (event) => {
        event.preventDefault();
        setshowviewall(true)
        setshowentervitals(false)
        setshowremovevitals(false)
    }


    const addvitals = (event) => {
        event.preventDefault();
        setshowviewall(false)
        setshowremovevitals(false)
        setshowentervitals(true)


    }


    const removevitals = (event) => {
        event.preventDefault();
        setshowviewall(false)
        setshowentervitals(false)
        setshowremovevitals(true)

    }

    const saveSuccess = (e) => {
        console.log("save success");
        setshowentervitals(false);
        props.saveCallback(e);
      };


    return (

        <>
            {props?.data?.slice(0, 1).map((user, i) => (
                <>
                    <div class="w-4/8 p-4 border border-gray-200 rounded-xl justify-between">


                        <div class="flex justify-between mb-2">
                       

                            <p class="text-sm font-semibold text-neutral-800">Temperature</p>
                            <div class="flex justify-end space-x-2">
                            <div className="cursor-pointer" onClick={
                                    () => setGraphPop(true)
                                }>
                                    <img src={analytics} alt="more" className="w-6" />
                                </div>

                                {/* <img src={more} alt="more" /> */}

                                <>
                                    <Menu as="div" className="ml-3 relative">
                                        {({ open }) => (
                                            <>
                                                <div>
                                                    <Menu.Button className={` flex text-sm rounded-full focus:outline-none`}>

                                                        <img src={more} alt="more" />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items
                                                        static
                                                        className="origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                    >
                                                        {/* <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    onClick={
                                                                        (e) => viewDetails(e)

                                                                    }
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    View All
                                                                </Link>
                                                            )}
                                                        </Menu.Item> */}
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link

                                                                    onClick={
                                                                        (e) => addvitals(e)

                                                                    }
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    Update
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
{/* 
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    to="#"
                                                                    onClick={
                                                                        (e) => removevitals(e)

                                                                    }
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    Remove
                                                                </Link>
                                                            )}
                                                        </Menu.Item> */}
                                                    </Menu.Items>
                                                </Transition>
                                            </>
                                        )}
                                    </Menu>
                                </>
                            </div>
                        </div>
                        <hr/>
                        <div className='flex justify-around mt-4'>
                        <div className='flex justify-center items-center' style ={{backgroundColor:"#FFFCEE", border: "1px solid #F4ECC8", borderRadius:"50%",height:"69px",width:"69px"}}>
                                <img height="40px"  width="40px" src ={Tempreature} />
                            </div>
                            <div className='text-center'>
                                <p className='font-semibold text-xs mb-2'>Degree Farhenheit</p>
                                <p className='font-normal text-xs'>High</p>
                                <p className='font-semibold text-xl'>{user.temperature}°F</p>
                            </div>
                        </div>
                        {/* <div class="flex justify-between pt-5">
                            <p class="text-sm font-medium text-brand-secondary ">Degree Farhenheit</p>
                            <img src={temp} alt="temp" className="pr-2" />
                        </div>
                        <div class="flex justify-around mt-4 space-x-2 ">

                            <div class="text-center">
                                <p class="lg:text-lg font-medium text-brand-secondary ">High</p>
                                <span class="text-2xl text-brand-secondary text-center">{user.temperature} <span className="text-2xl text-brand-secondary text-center">°F</span></span>
                            </div>

                        </div> */}

                        {
                            showviewall ? <Allvitalspopup title={'Temperature'} closePopup={() => setshowviewall(!showviewall)}></Allvitalspopup> : null
                        }

                        {
                            showentervitals ? <Addvitalspopup title={'Temperature'} data={props.data[0]} closePopup={saveSuccess}></Addvitalspopup> : null

                        }


                        {
                            showremovevitals ? <Removevitalspopup title={'Temperature'} closePopup={() => setshowremovevitals(!showremovevitals)}></Removevitalspopup> : null

                        }

                        {
                            graphPop ? <VitalChart title = {'Temperature Graph'} data={props.data} type="temperature" closePopup={()=> setGraphPop(false)} /> : null
                        }

                    </div>
                </>
            ))
            }
        </>
    );
}

export default PatientprofileTempraturecard;