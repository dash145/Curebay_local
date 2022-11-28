import akshay from '../Assets/Images/akshay.png';
import Chat from '../Assets/Images/person.svg';
import Video from '../Assets/Images/videocall.svg';
import Location from '../Assets/Images/Location.svg';
import { Link, useHistory, } from 'react-router-dom';
import { useEffect } from 'react'
import { connect } from 'react-redux';
import { setLoginModal, } from '../Redux/Actions/userActions';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { getElasticDoctorslist } from '../Redux/Actions/doctorAction';
import SectionContainer from './SectionContainer';
import lodash from 'lodash';
import { useState } from 'react';

function HospitalDoctors(props) {
    const [doctorList, setDoctorList] = useState([]);
    const [beds, setBeds] = useState(0);
    const viewprofile = (e, doct) => {
        e.preventDefault();
        // history.push(`/doctors/${doct.code}`);
        history.push(`/doctors/${"TESTDOCTOR"}`);
    }

    const bedsNo = (no) => {
        props.noOfBeds(no);
    }

    const bookappointment = (e, doct) => {
        e.preventDefault();
        console.log("doctad", doct);

        // history.push(`/doctors/${doct.code}`);
        history.push(`/doctors/${"TESTDOCTOR"}`);
    }
    const history = useHistory();
    const { data } = props;

    const concatDoctors = () => {
        let doctArr = [];
        let beds = 0
        if (data?.locations && data?.locations.length > 0) {
            for (var i in data?.locations) {
                beds += data?.locations[i]?.noOfBed;
                if (data?.locations[i]?.doctors && data?.locations[i].doctors.length > 0) {
                    for (var j in data?.locations[i].doctors) {
                        data.locations[i].doctors[j].address = data?.locations[i].address;
                        doctArr.push(data?.locations[i].doctors[j]);
                    }
                }
            }
        }
        console.log("doctArr", beds)
        let newArr = lodash.uniqBy(doctArr, 'doctorId');
        setDoctorList(newArr);
        bedsNo(beds);
    }

    useEffect(() => {
        concatDoctors()
            ;
    }, [data])

    return (
        <>
            {doctorList.length > 0 ?
                <div className="flex flex-col px-3 ">
                    <SectionContainer link={APP_ROUTES.DOCTOR_SEARCH} title={`Top Doctors in ${props.data?.name}`} subtitle={''} seeAll={'Doctors'} />
                    <div className="w-full lg:max-w-full lg:flex ">
                        <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                            <div className="lg:flex hidden flex-nowrap space-x-8">
                                {doctorList && doctorList.length > 0 && doctorList.map((doct, i) => {
                                    let link = doct;
                                    return (
                                        <div className="p-5 bg-white border border-gray-200 rounded-2xl m-auto h-auto lg:h-auto lg:w-auto flex-none bg-cover  text-center overflow-hidden">
                                            <div className="flex justify-start">
                                                <div>
                                                    <img src={link.userPhoto ? `data:image/jpeg;base64,${link.userPhoto}` : akshay} alt="" className={'w-15 h-15'} />
                                                </div>
                                                <div className="flex">
                                                    <div className="px-3 text-left">
                                                        <span className="text-md text-left ">{link.salutation} {link.firstName} {link.lastName}</span><br />
                                                        <span className="text-brand-gunsmoke text-left text-xs font-thin mt-1 ">{link.speciality ? link.speciality : 'General Physician'}</span>

                                                        <span className="text-brand-gunsmoke text-xs flex font-thin mt-2  w-24 truncate" >
                                                            <img src={Location} className="h-4 w-4 mr-2" alt="" />{link.address ? link.address : 'NA'}
                                                        </span>
                                                    </div>
                                                    <div className="justify-end ml-8">
                                                        <div className="flex flex-wrap justify-end content-between">
                                                            <div className="w-7 mr-1 h-7 flex flex-wrap   content-center  rounded-lg justify-center">
                                                                <img src={Chat} className="h-7 w-7" alt="" />
                                                            </div>
                                                            <div className="w-7 mr-1 h-7 flex flex-wrap  content-center  bg-blue-200 rounded-lg justify-center">
                                                                <img src={Video} className="h-4 w-4" alt="" />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap">
                                                            <p className="text-green-500  text-xs flex font-thin mt-3" >Charges: ₹{link.inPersonCharges ? link.inPersonCharges : `500`}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="mt-4 mb-3" />
                                            <div className="mt-1 justify-end flex">
                                                <button onClick={(e) => viewprofile(e, link)} className="border border-brand-secondary  text-sm font-medium  text-brand-secondary rounded-md py-2 px-6 mr-6">View Profile</button>
                                                <button onClick={(e) => bookappointment(e, link)} className="bg-brand-secondary  text-sm text-white font-normal rounded-md py-2 px-4 ">Book Appointment</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="lg:hidden flex flex-nowrap space-x-6">
                                {doctorList && doctorList.length > 0 && doctorList.slice(0, 10).map((doct, i) => {
                                    let link = doct;
                                    return (
                                        <div className="p-4 bg-white shadow-sm border border-brand-graynurse rounded-2xl  flex-none  text-center overflow-hidden">
                                            <div className="flex justify-start">
                                                <div >
                                                    <img src={link.userPhoto ? `data:image/jpeg;base64,${link.userPhoto}` : akshay} alt="" className={'w-24 h-24'} />
                                                </div>
                                                <div className="flex">
                                                    <div className="px-3">
                                                        <div className="flex relative left-2  flex-wrap justify-end content-between">
                                                            <div className="w-8 mr-2 h-8 flex flex-wrap   content-center  rounded-lg justify-center">
                                                                <img src={Chat} className="h-8 w-8" alt="" />
                                                            </div>
                                                            <div className="w-8 ml-1 h-8 flex flex-wrap  content-center  bg-blue-200 rounded-lg justify-center">
                                                                <img src={Video} className="h-5 w-5" alt="" />
                                                            </div>
                                                        </div>
                                                        <p className="text-lg  mt-2">{link.salutation} {link.firstName} {link.lastName}</p>
                                                        <p className="text-brand-gunsmoke text-md font-thin pr-5 ">{'General Physician'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="justify-start mt-4">
                                                <div>
                                                    <p className="text-brand-gunsmoke text-lg flex font-thin mt-1 " >
                                                        <img src={Location} className="h-6 w-6 mr-1" alt="" />{link.city ? link.city : 'NA'} </p>
                                                </div>
                                                <div className="flex flex-wrap justify-between mt-1 mx-1 py-1">
                                                    <p className="text-green-500  text-lg flex font-thin " >Charges:₹500</p>
                                                    <p onClick={(e) => viewprofile(e, link)} className="text-lg font-medium  text-brand-secondary rounded-md  mr-2">View Profile</p>
                                                </div>
                                            </div>
                                            <div className="mt-1">
                                                <button onClick={(e) => bookappointment(e, link)} className="bg-brand-secondary w-full  text-md text-white font-normal rounded-xl py-2">Book Appointment</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div> : ''}

        </>



    );
}

const mapDispatchToProps = (dispatch) => ({
    setLoginModal: () => dispatch(setLoginModal()),

});

export default connect(null, mapDispatchToProps,)(HospitalDoctors);