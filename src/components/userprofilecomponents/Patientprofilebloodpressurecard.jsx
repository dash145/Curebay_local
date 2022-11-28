/* This example requires Tailwind CSS v2.0+ */

import { useDispatch, useSelector } from 'react-redux';
import more from '../../Assets/Images/More .svg';
import hearts from '../../Assets/Images/heart.svg';
import analytics from '../../Assets/Images/analytics.png';
import { Bar } from 'react-chartjs-2'

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
import BloodPressureIcon from "../../Assets/Images/bloodPressure.png"
function Patientprofilebloodpressurecard(props) {

    const history = useHistory();
    const location = useLocation();

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }


    const [showviewall, setshowviewall] = useState(false);
    const [showentervitals, setshowentervitals] = useState(false);
    const [showremovevitals, setshowremovevitals] = useState(false);
    const [data, setData] = useState()
    const [graphPop, setGraphPop] = useState(false);

    const viewDetails = (event, det) => {
        event.preventDefault();
        console.log(det)
        setData(det)
        setshowviewall(true)
        setshowentervitals(false)
        setshowremovevitals(false)
    }


    const addvitals = (event, det) => {
        event.preventDefault();
        console.log(det)
        setData(det)
        setshowviewall(false)
        setshowremovevitals(false)
        setshowentervitals(true)


    }


    const removevitals = (event, det) => {
        event.preventDefault();
        console.log(det)
        setData(det)
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
                <div class=" border p-4 mt-3" style={{borderRadius:"7px"}}> 

                    



                        <div class="flex justify-between mb-2">

                            <p class="text-sm font-semibold text-neutral-800">Blood Pressure</p>
                            <div class="flex justify-end space-x-2">
                                <div className="cursor-pointer" onClick={
                                    () => setGraphPop(true)
                                }>
                                    <img src={analytics} alt="more" className="w-6" />
                                </div>

                                {/* <img onClick={Edit} src={more} alt="more" /> */}
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
                                                                        (e) => viewDetails(e, user)

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
                                                                        (e) => addvitals(e, user)

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

                                                        {/* <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    to="#"
                                                                    onClick={
                                                                        (e) => removevitals(e, user)

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
                        <div className="flex justify-around  mt-4">
                        <div className='flex justify-center items-center' style ={{backgroundColor:"#FFFCEE", border: "1px solid #F4ECC8", borderRadius:"50%",height:"69px",width:"69px"}}>
                                <img height="40px"  width="40px" src ={BloodPressureIcon} />
                            </div>
                            <div className='text-center'>
                                <p className='font-semibold text-xs mb-2'>SYS</p>
                                <p className='font-semibold text-xl'>{user.systolic}</p>
                                <p className='font-normal text-xs '>mmHg</p>
                            </div>
                            <div>
                                <p className='font-semibold text-xs mb-2'>DIA</p>
                                <p className=' font-semibold text-xl'>{user.diastolic}</p>
                                <p className='font-normal text-xs'>mmHg</p>
                            </div>


                        </div>

                    </div>
                </>
            ))
            }
            {
                showviewall ? <Allvitalspopup data={data} title={'Blood Pressure'} closePopup={() => setshowviewall(!showviewall)}></Allvitalspopup> : null
            }

            {
                showentervitals ? <Addvitalspopup title={'Blood Pressure'} data={props.data[0]} closePopup={saveSuccess}></Addvitalspopup> : null

            }

 
            {
                showremovevitals? <Removevitalspopup title={'Blood Pressure'} closePopup={() => setshowremovevitals(!showremovevitals)}></Removevitalspopup> : null

            }
            {
                graphPop ? <VitalChart title = {'Blood Pressure Graph'} data={props.data} types={["diastolic", "systolic"]} closePopup={()=> setGraphPop(false)} /> : null
            }
        </>
    )
}
export default Patientprofilebloodpressurecard;
