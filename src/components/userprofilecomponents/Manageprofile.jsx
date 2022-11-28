import React, { useState, useEffect } from 'react'
import Userprofilesidebar from '../userprofilesidebar';
import steth from '../../Assets/Images/avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientfamilymembers, onPatientfamilyMembersDelete } from '../../Redux/Actions/UserprofileActions';
import Addmemberpopup from './addmemberpopup';
import { memberColor } from '../../config/constant'
import moment from 'moment';
function Manageprofile(props) {

    const dispatch = useDispatch();
    const userData = useSelector(state => state.authReducer.patientData)
    const patientinfo = useSelector((state) => state.patientinfo);
    const { patientinfoData } = patientinfo;

    const familymemberinfo = useSelector((state) => state.familymembers);
    const { FamilymembersData, isLoading } = familymemberinfo;
    const [Editmember, setEditmember] = useState();
    const [showaddmemberpopup, setshowaddmemberpopup] = useState(false);


    const editmembers = (e, user) => {
        e.preventDefault();
        setshowaddmemberpopup(true);
        setEditmember(user);
    };


    const deleteMembers = (e, user) => {
        e.preventDefault();
        console.log('isssss', JSON.stringify(user))

        //setEditmember(user);

        //onPatientfamilyMembersDelete

        dispatch(onPatientfamilyMembersDelete(user?.code)).then((res) => {
            dispatch(getPatientfamilymembers(userData.code));

        });
    };

    useEffect(() => {
        dispatch(getPatientfamilymembers(userData.code)).then((res) => {
            console.log('is memebership response', JSON.stringify(res))
        });
    }, [showaddmemberpopup, patientinfoData]);

    return (
        <>
            {/* breadcrumbs */}
            <ul className="lg:flex hidden  text-brand-secondary  text-sm lg:text-base my-8">
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
                    <a href="/profile/mydetails">Profile</a>
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
                    <a  className='text-brand-secondary'>Manage Profile</a>
                </li>
            </ul>
            <div className="md:flex justify-between " style={{ background: "#F8F8F8" }}>
                <div className="lg:block hidden w-3/12 ml-6 mt-3">
                    <Userprofilesidebar></Userprofilesidebar>
                </div>

                <div className="lg:w-7/12 xl:w-8/12 md:w-full lg:mx-auto xl:mr-12 mt-5 pb-20">
                    <div>
                        <div className="flex justify-between items-center mb-5 ">
                            <p className="text-medium text-gray-900 font-bold text-2xl  ">Manage Profile</p>

                        </div>
                        {
                            !isLoading && !FamilymembersData.length && <div className="rounded-lg bg-white-600 w-full h-112 p-5 antialiased justify-between border border-gray-200 mt-12 text-center">
                                <h2 className='text-gray-400'>No Family Member Available</h2>
                            </div>
                        }
                        <div className="border border-gray-200" style={{ background: "white" }}>
                            <div className="w-full flex justify-end ">
                            <div onClick={(e) => editmembers(e, '')} className="flex justify-center items-center cursor-pointer border border-gray-800 rounded-lg w-36 py-2 mt-3 mr-7" >
                                <p  className="text-sm  text-gray-900 font-semibold"> + Add Members</p>
                            </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 pb-4 space-y-3 gap-2">


                                {FamilymembersData.map((user, i) => (
                                    <div className=" bg-white w-11/12 h-112 p-2 antialiased justify-between border border-gray-200 mt-2 mx-auto lg:mx-3 rounded-lg" key={i}>
                                        <div className="lg:flex w-full lg:flex lg:flex-col  ">

                                            <div className="flex gap-3 items-center lg:gap-0">

                                                <img src={user?.photoName ? `${user.photoName}` : steth} alt="profile" className="w-12 h-12 mt-lg:ml-4 rounded-full border" />
                                                <div className="w-full">
                                                    <div className="flex flex-col lg:flex-row justify-between lg:ml-2">
                                                        <div className="lg:flex lg:flex-col justify-center ">
                                                            {/* <span className={`text-sm pl-2 text-white font-bold bg-brand-${memberColor[user.relation]} rounded-full lg:shadow-lg w-auto lg:my-4  px-2 text-center`}>{user.relation}</span> */}
                                                            <p className=" pt-1 text-medium font-bold text-sm  my-1 ">{user.name}</p>
                                                            <div className=" flex ">
                                                                <p className="text-xs  text-center  font-medium "><span className="font-semibold">Patient ID:</span>{" "}{user.code}</p>
                                                            </div>
                                                        </div>
                                                        <div className='flex gap-2 lg:gap-0 mt-2 ld:mt-0'>
                                                            <p onClick={(e) => editmembers(e, user)} className="text-xs cursor-pointer text-white font-medium lg:pr-2 px-4 lg:my-4 flex items-center rounded-md lg:mx-1 lg:pl-2 lg:py-1" style={{background:"#66B889"}}>Edit</p>
                                                            <p onClick={(e) => deleteMembers(e, user)} className="text-xs cursor-pointer text-gray-700 font-medium pr-2 lg:my-4 border border-gray-500 rounded-md mx-1 pl-2 py-1">Delete</p>
                                                        </div>

                                                    </div>


                                                </div>

                                            </div>

                                            <hr className="mt-2"></hr>
                                            <div className="flex justify-between mt-2">

                                                <p className=" lg:ml-5  text-sm text-gray-500   font-medium  my-1"><span className="text-gray-900 font-semibold">DOB : </span>{moment(user.dob).format("DD/MM/yyyy")}</p>
                                                <p className=" lg:ml-2 text-sm text-gray-500   font-medium  my-1"><span className="text-gray-900 font-semibold">Blood group : </span>{user.bloodGroup}</p>

                                            </div>

                                            <div className="flex justify-between">
                                                <p className=" lg:ml-5  text-sm text-gray-500   font-medium  my-1"><span className="text-gray-900 font-semibold">Relation : </span>{user.relation}</p>
                                                <p className=" lg:ml-2  text-sm text-gray-500   font-medium my-1 "><span className="text-gray-900 font-semibold">Gender : </span>{user.gender === "F" ? "Female" : (user.gender === "M" ? "Male" : "Others")}</p>
                                                {/* <p className="text-sm ml-5 text-sm text-gray-600   font-medium  my-1">Health Condition : Healthy</p> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                    {
                        showaddmemberpopup ?
                            <Addmemberpopup editmembers={Editmember} closePopup={() => setshowaddmemberpopup(!showaddmemberpopup)} ></Addmemberpopup> : null
                    }

                </div>
            </div>
        </>
    );
}
export default Manageprofile;
