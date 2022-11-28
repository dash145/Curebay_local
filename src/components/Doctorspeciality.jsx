import { useEffect } from 'react'
import akshay from '../Assets/Images/akshay.png';
import Chat from '../Assets/Images/chat.svg';
import Video from '../Assets/Images/videocall.svg';
import filter from '../Assets/Images/filter.svg';
import sort from '../Assets/Images/sort.svg';
import locat from '../Assets/Images/Locat.svg';
import close from '../Assets/Images/close.svg';
import SearchBar from './navbarSearch';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorforparticularspeciaity, getDoctorslist } from '../Redux/Actions/doctorAction';

import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import { useHistory, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Doctorspeciality(props) {

    const params = useParams()
    const history = useHistory();
    const dispatch = useDispatch();
    const { coords } = useSelector((state) => state.authReducer);

    const doctorspecialitylist = useSelector((state) => state.particulardoctorspeciality);
    const { specialityData } = doctorspecialitylist;


    const viewprofile = (e, doct) => {
		e.preventDefault();
		history.push(`/doctors/${doct.userId}`);
	}

    useEffect(() => {
        console.log(params)
        let role = "PROV"
        console.log("doctspecialitydata", coords)
        dispatch(getDoctorforparticularspeciaity(params.spectdoct))
        dispatch(getDoctorslist(coords,role, "600100",1,20));
    }, [dispatch, props]);








    return (
        <>

            <div className="">
                <div className="lg:block hidden ">
                    <SearchBar />
                </div>
                <ul className="lg:flex hidden text-brand-secondary text-sm lg:text-base px-3  pt-5">
                    <li className="inline-flex items-center">
                        <a href="/">Home</a>
                        <svg
                            className="h-5 w-auto text-brand-secondary"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </li>
                    <li className="inline-flex items-center">
                        <a href="/components">Doctor</a>
                        <svg
                            className="h-5 w-auto text-brand-secondary"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </li>
                    <li className="inline-flex items-center">
                        <a href="/components">General physician</a>
                        <svg
                            className="h-5 w-auto text-brand-secondary"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </li>
                    <li className="inline-flex items-center">
                        <a href="/components">Akshay Shetty</a>
                    </li>

                </ul>
                <div className="lg:block hidden text-gray-primary font-medium text-lg px-3 my-1  my-4">
                    72+ General Physicians in your locality
                </div>
                <div className='px-3 bg-white rounded-lg '>
                    <div className="lg:flex hidden  justify-between w-full my-2">
                        <div className="flex gap-4">
                            <div className="h-6 w-auto pl-1 pt-1 bg-green-500 rounded-2xl">
                                <div className="flex justify-around">
                                    <p className="text-xs  text-white">Online</p>
                                    <img src={close} alt="close" />
                                </div>
                            </div>
                            <div className="h-6 w-auto pl-1 pt-1 bg-green-500 rounded-2xl">
                                <div className="flex justify-around">
                                    <p className="text-xs text-white">Location</p>
                                    <img src={close} alt="close" />
                                </div>
                            </div>
                            <div className="h-6 w-auto pl-1 pt-1 bg-green-500 rounded-2xl">
                                <div className="flex justify-around">
                                    <p className="text-xs text-white">₹500 - ₹750</p>
                                    <img src={close} alt="close" />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
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
                    <hr />
                    {/* mobileView */}
                    <div className="flex justify-center sticky top-0 z-150  shadow-md lg:hidden " >
                        <div className="m-5 w-1/2 border-0 border-r-2">
                            <div className="flex  justify-center content-center pl-4" >
                                <img src={filter} alt="filter" />
                                <p className="text-lg  font-thin text-brand-secondary pl-2">Filter</p>
                            </div>
                        </div>
                        <div className="m-5 w-1/2 ">
                            <div className="flex  justify-center content-center pl-4" >
                                <img src={sort} alt="sort" />
                                <p className="text-lg  font-thin text-brand-secondary pl-2">Sort by</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:hidden flex-none m-4 p-1 bg-white shadow-sm  border-brand-graynurse rounded-2xl  text-center overflow-hidden">
                        <div className="flex justify-start">
                            <div >
                                <img src={akshay} alt="" className={'w-24 h-24'} />
                            </div>
                            <div className="flex">
                                <div className="px-2">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-lg  mt-2">{'Mr'} {'Akshay Shetty'}</p>
                                        </div>
                                        <div className="flex relative mt-1 left-6  flex-wrap justify-end content-between">
                                            <div className="w-8 mr-2 h-8 flex flex-wrap  bg-green-200  content-center  rounded-lg justify-center">
                                                <img src={Chat} className="h-5 w-5" alt="" />
                                            </div>
                                            <div className="w-8 ml-1 h-8 flex flex-wrap  content-center  bg-blue-200 rounded-lg justify-center">
                                                <img src={Video} className="h-5 w-5" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-brand-gunsmoke text-md font-thin pr-20 ">{'General Physician'}</p>
                                        <p className="text-brand-gunsmoke text-lg flex font-thin mt-1 " >
                                            <img src={locat} className="h-6 w-6 mr-1" alt="" />{'Ahmedabad'} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="justify-start mt-4">
                            <div className="flex flex-wrap justify-between mt-1 mx-1 py-1">
                                <p className="text-green-500  text-lg flex font-thin " >Charges:₹500</p>
                                <p className="text-lg font-medium  text-brand-secondary rounded-md  mr-2">View Profile</p>
                            </div>
                        </div>
                        <div className="mt-1">
                            <button className="bg-brand-secondary w-full  text-lg text-white font-normal rounded-xl py-3">Book Appointment</button>
                        </div>
                    </div>
                    {/* mobileView over */}
                    {specialityData.map((data, i) => (
                        <div className="lg:block hidden">
                            <div className="p-2 h-48">
                                <div className="flex justify-between">
                                    <div className="p-4 mr-2 bg-teal-600">
                                        <div className="flex">
                                            <img src={data.userPhoto ? `data:image/jpeg;base64,${data.userPhoto}` : akshay} alt="akshay" style={{ width: '70px', height: '70px' }} />
                                            <div className="pl-4">
                                                <p className="text-sm">{data.userSalutation} {data.userName ? data.userName : `Dr Akshay Shetty`} ({data.userGender ? data.userGender : `M`})</p>
                                                <p className="text-xs text-gray-400 pt-1">{data.speciality}</p>
                                                <div className="flex">
                                                    <img src={locat} alt="location" className="pt-1" />
                                                    <p className="text-xs pt-1 pl-2 text-gray-400">{data.userAddress1}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <div className="flex gap-4 justify-end" >
                                            <div className="h-8 w-8 rounded-lg p-2 bg-green-100">
                                                <img src={Chat} alt="chaticon" />
                                            </div>
                                            <div className="h-8 w-8 rounded-lg p-2 bg-blue-100">
                                                <img src={Video} alt="videoicon" />
                                            </div>
                                        </div>
                                        <div className="w-full my-2">
                                            <p className="text-xs  tracking-widest mt-1">Regular charges: ₹500</p>
                                        </div>
                                    </div>
                                </div>
                                <hr className="font-thin mx-3 my-2" />
                                <div className="float-right">
                                    <div className="flex gap-4 ">
                                        <button onClick={(e) => viewprofile(e, data)}   className="bg-transparent hover:bg-blue-900 text-brand-secondary font-semibold hover:text-white py-1 px-2 border border-brand-secondary hover:border-transparent rounded-md text-sm">View Profile</button>
                                        <button onClick={(e) => viewprofile(e, data)}  className="bg-brand-secondary hover:bg-brand-secondary text-white font-medium py-2 px-4 rounded-md text-sm">Book Appointment</button>
                                    </div>
                                </div>
                            </div>
                            <hr className="font-normal border-1" />
                        </div>
                    ))}
                </div>
                <br />
            </div>

        </>
    );
}

export default Doctorspeciality;