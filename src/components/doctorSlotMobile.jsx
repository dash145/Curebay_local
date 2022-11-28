import { useState } from 'react'
import { useHistory, useLocation,useParams } from 'react-router-dom';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import { useEffect } from 'react';
import moment from 'moment';
import arroww from '../Assets/Images/arrowdown.svg';
import { gethospitalclinicList } from '../Redux/Actions/doctorAction';
import { XIcon } from '@heroicons/react/outline'
import lodash from 'lodash';
import { data } from 'autoprefixer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function DoctorSlots(props) {
    const history = useHistory();
    const location = useLocation();
    const params = useParams()
    const dispatch=useDispatch();
    const { userData, doctorsAppointment, doctorData } = props;
    const redirectTo = (data) => {
        if (userData?.id) {
            history.push({ pathname: APP_ROUTES.PAYMENT, state: data });
        }
        else {
            history.push({ pathname: APP_ROUTES.LOGIN, state: { background: location, login: true } });
        }
    };
    // const [currentDate, setCurrentDate] = useState(moment('05/01/2021', 'MM/DD/yyyy'));
    const [currentDate, setCurrentDate] = useState(moment());
    const [days, setDays] = useState([]);
    const [timeSlots, setTimeSlots] = useState({});
    const [sortedSlots, setSortedSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(moment().format("MM/DD/yyyy"));
    const hospitalcliniclist = useSelector((state) => state.particulardoctor);
    const { hospitalcliniclistData } = hospitalcliniclist;
    const [slot, setSelectedSlot] = useState({});
    const [isShow, setShowTimeSlots] = useState(false);
    const [hospitalId, sethospitalId] = useState('');
    const [locationId, setLocationId] = useState('');
    const [timeIndex, selectTimeIndex] = useState({})
    const [appointmentType, setAppointmentType] = useState("V");
    const [hideModal, setHideModal] = useState(false);
    const [open, setOpen] = useState(1);

    const { isLoading } = useSelector(state => state.doctorsslot);
    const getDays = () => {
        let days = [];
        let daysRequired = 4
        for (let i = 0; i < daysRequired; i++) {
            days.push({
                vis: moment(currentDate).add(i, 'days').format('ddd,DD'),
                date: moment(currentDate).add(i, 'days').format('MM/DD/yyyy'),
            })
        }
        setDays(days);
    }

    useEffect(() => {
        sortSlots();
    }, [props.slots])

    useEffect(() => {
        dispatch(gethospitalclinicList(params.doctid))
    }, [])

    const divideTimeSlot = (selectSlot, selectDate) => {
        if (selectSlot.length > 0) {
            var m_Stops = [];
            var a_Stops = [];
            var e_Stops = [];
            for (var i in selectSlot) {
                console.log("selectSlot", selectSlot)
                var startTime = moment(selectSlot[i].fromTime, 'hh:mm A');
                var endTime = moment(selectSlot[i].toTime, 'hh:mm A');
                var interval = parseInt(selectSlot[i].consultationDuration ? selectSlot[i].consultationDuration : 30);
                var day = moment(selectDate, 'MM/DD/yyyy').format('dddd');
                if (selectSlot[i][day.toLowerCase()] !== "N") {
                    // setShowTimeSlots(false);
                    // setHideModal(true);
                    setShowTimeSlots(true);
                    setHideModal(false);
                    while (startTime <= endTime) {
                        let checkIsAppointed = doctorsAppointment.find((x => {
                            return (moment(x.whenAppointment, 'MM/DD/yyyy').isSame(selectDate) && moment(x.fromTime, 'hh:mm').isSame(startTime));
                        }));
                        console.log("checkIsAppointed", checkIsAppointed)
                        if (startTime < moment("12: 00", 'hh:mm A')) {
                            m_Stops.push({ time: new moment(startTime).format('hh:mm A'), isBooked: checkIsAppointed ? true : false, hospital: selectSlot[i].hospitalName, hospitalId: selectSlot[i].hospitalId, inPerson: selectSlot[i].inPerson, video: selectSlot[i].video, interval: interval });
                            startTime.add(interval, 'minutes');
                        }
                        if (startTime >= moment("12: 00", 'hh:mm A') && startTime < moment("17: 00", 'hh:mm A')) {
                            a_Stops.push({ time: new moment(startTime).format('hh:mm A'), isBooked: checkIsAppointed ? true : false, hospital: selectSlot[i].hospitalName, hospitalId: selectSlot[i].hospitalId, inPerson: selectSlot[i].inPerson, video: selectSlot[i].video, interval: interval });
                            startTime.add(interval, 'minutes');
                        }
                        if (startTime >= moment("17: 00", 'hh:mm A')) {
                            e_Stops.push({ time: new moment(startTime).format('hh:mm A'), isBooked: checkIsAppointed ? true : false, hospital: selectSlot[i].hospitalName, hospitalId: selectSlot[i].hospitalId, inPerson: selectSlot[i].inPerson, video: selectSlot[i].video, interval: interval });
                            startTime.add(interval, 'minutes');
                        }
                    }
                }
            }

            let mSlots = lodash.uniqBy(m_Stops, 'time').sort((a, b) => moment(a.time) - moment(b.time));
            let aSlots = lodash.uniqBy(a_Stops, 'time');
            let eSlots = lodash.uniqBy(e_Stops, 'time');
            console.log("hello", mSlots)
            setTimeSlots({ "morning": mSlots, "afternoon": aSlots, "evening": eSlots })
        }
        else {
            setShowTimeSlots(false);
            setHideModal(true);
        }
    }

    const sortSlots = () => {
        const { slots } = props;
        var sortData = slots?.sort((a, b) => moment(b.modifiedDate) - moment(a.modifiedDate));
        setSortedSlots(sortData);
    }
    const changeWeek = (val) => {
        setShowTimeSlots(false);
        setHideModal(false);
        setSelectedDate('');
        if (val === 'forward') {
            var newDate = moment(days[3].date).add(1, 'days');
            setCurrentDate(newDate);
        }
        if (val === 'backward') {
            var newDate = moment(days[0].date).subtract(4, 'days');
            setCurrentDate(newDate);
        }
    }

    const goToPayment = () => {
        console.log("timeIndex", doctorData)
        let dataObj = {
            consultationsReason: "Fever",
            consultationsType: appointmentType ? 'V' : 'I',
            createdBy: userData.id,
            fromTime: moment(timeIndex.time, 'hh:mm A').format('HH:mm'),
            hospitalId: hospitalId,
            locationId: locationId,
            modifiedBy: userData.code,
            patientEmail: userData.email,
            patientId: userData.code,
            patientMobileNo: userData.mobile,
            patientName: userData.firstName,
            status: 1,
            toTime: moment(timeIndex.time, 'hh:mm A').add(timeIndex.interval, 'minutes').format('HH:mm'),
            userEmail: doctorData.email,
            userId: doctorData.code,
            userMobile: doctorData.mobile,
            userName: doctorData.firstName + "" + doctorData.lastName,
            userQualification: doctorData.qualification,
            userSalutation: doctorData.salutation,
            whenAppointment: selectedDate,
            amount: appointmentType === "I" && props?.fees?.inPersonConsFee ? props?.fees.inPersonConsFee : props?.fees?.videoConsFee ? props?.fees?.videoConsFee : 0
        }
        console.log("dataObj", dataObj)
        redirectTo(dataObj)
    }


    useEffect(() => {
        getDays();
    }, [currentDate])

    const getselectedSlot = (date) => {
        selectTimeIndex({})
        setSelectedDate(date);
        var arr = [];
        for (var i in sortedSlots) {
            if (moment(date).isBetween(moment(sortedSlots[i].fromDate, "MM/DD/yyyy"), moment(sortedSlots[i].toDate, "MM/DD/yyyy"), null, '[]')) {
                // setSelectedSlot(sortedSlots[i]);
                // divideTimeSlot(sortedSlots[i], date)
                arr.push(sortedSlots[i]);
                console.log("sortedSlots[i]", sortedSlots[i])
                // return
            } else {
                setSelectedSlot({});
                setShowTimeSlots(false)
                setHideModal(true);
            }
        }
        divideTimeSlot(arr, date)
    }

    const onSelectHosptial = (e) => {
        let value = JSON.parse(e.target.value);
        console.log("value", value)
        setLocationId(value.locationId)
        sethospitalId(value.hospitalId)
    }

    useEffect(() => {
        if (hospitalcliniclistData.length > 0) {
            setLocationId(hospitalcliniclistData[0].locationId)
            sethospitalId(hospitalcliniclistData[0].hospitalId)
        }
    }, [hospitalcliniclistData.length])


    useEffect(() => {
        getselectedSlot(selectedDate);
    }, [sortedSlots, doctorsAppointment])

    if (!sortedSlots.length && isLoading) {

        return (
            <div className="flex flex-wrap justify-center">
                <div className="loader float-center ease-linear text-center rounded-full border-2 border-t-2 border-gray-200 h-20 w-20" />
            </div>
        )
    }

    // if (!sortedSlots.length && !isLoading) {
    //     return (
    //         <p>No Data found</p>
    //     )
    // }

    return (
        <div className="mt-4 mb-20" >
            <p className=" font-medium">Select a Slot to Book an Appointment</p>
            <div className="mt-8 xl:flex" style={{ fontSize: '12px', textAlign: 'left' }}>
                <div className="flex ">
                    <div onClick={() => setAppointmentType("V")} className={appointmentType === "V" ? "bg-green-500 rounded-lg  z-10" : " border border-r-0 left-3 rounded-lg  relative"}>
                        <button className={`h-10 w-24 text-base  ${appointmentType === "V" ? 'text-white' : 'text-brand-primary'} font-medium`}>Online</button>
                    </div>
                    <div className={appointmentType === "V" ? 'border-r border-t border-b rounded-lg  relative right-3' : "bg-green-500 rounded-lg  z-10"}>
                        <button onClick={() => setAppointmentType("I")} className={`h-10 w-24 text-base font-medium ${appointmentType === "V" ? 'text-brand-primary bg-white-500' : 'text-white'}`}>In Person</button>
                    </div>

                    {(slot.inPerson === 'Y' && appointmentType)
                        ? <div className="ml-8 mt-2 w-36 h-8 border border-gray-300 rounded-md flex justify-between px-3">
                            <p className=" text-sm text-gray-400 pl-2 pt-1">  {slot.hospitalName}</p>
                            <img src={arroww} alt="arrow" className="w-4 " />
                        </div> : ''
                    }
                </div>
                <select className="border rounded-lg mx-2 h-10 pl-2 mt-1 pr-2  text-gray-primary text-sm" onChange={onSelectHosptial} >
                    {hospitalcliniclistData.map((res, i) => (
                        <option value={JSON.stringify(res)}>{res.hospitalName}</option>
                    ))}
                </select>
            </div>


            <div className="my-6 flex items-center  pb-4 ">
              <div>
                <button onClick={() => changeWeek('backward')} disabled={days[0]?.date === moment().format('MM/DD/yyyy')} type="button" className="disabled:opacity-50  rounded-lg w-20 h-12 " >
                    <i className="pt-1 fa fa-angle-left" aria-hidden="true" style={{ fontSize: '32px' }}></i>
                </button>
                </div>

                <div className="grid grid-cols-1 gap-2">
                {days.map((res, i) => (

                    <button onClick={() => { getselectedSlot(res.date, i) }} key={i} type="button" className={`${selectedDate === res.date ? 'bg-green-500' : 'border border-brand-biscay2'} rounded-lg border w-28 h-12 mx-2`} >
                        <p className={` ${selectedDate !== res.date ? 'text-brand-biscay2' : 'text-white'}  pt-1 font-medium  text-sm`} >{res?.date === moment().format('MM/DD/yyyy') ? 'Today' : res?.vis.split(',')[0]}</p>
                        <p className={` ${selectedDate !== res.date ? 'text-brand-biscay2' : 'text-white'} font-medium text-sm px-2 pb-2`}>{moment(res?.date, 'MM/DD/yyyy').format('DD,MMM')}</p>
                    </button>

                ))}
               </div>
                 <div>
                <button onClick={() => changeWeek('forward')} type="button" className="rounded-lg w-20 h-12 " >
                    <i className="pt-1 fa fa-angle-right" aria-hidden="true" style={{ fontSize: '32px' }}></i>
                </button>
                </div>
            </div>
            {isShow ?
                <>
                    <div className="my-6 flex flex-wrap  justify-around px-2  pb-4">
                        <div className="text-left  flex gap-10 border-b-2 mb-2">
                            <div onClick={() => setOpen(1)} className={`${open===1 ?'border-b-2 border-brand-secondary':' '} text-gray-primary `}>Morning</div>
                            <div onClick={() => setOpen(2)} className={`${open===2 ?'border-b-2 border-brand-secondary':' '} text-gray-primary `}>Afternoon </div>
                            <div onClick={() => setOpen(3)} className={`${open===3 ?'border-b-2 border-brand-secondary':' '} text-gray-primary `}>Evening</div>
                        </div>
                        {open === 1 ? <div className="text-left w-full ml-3">
                            {timeSlots?.morning?.filter(x => x.hospitalId === hospitalId).map((res, i) => {
                                if ((res.inPerson === "Y" && appointmentType === "I") || (res.video === "Y" && appointmentType === "V")) {
                                    return (
                                        <button key={i} type="button" disabled={res.isBooked} onClick={() => selectTimeIndex({ m: true, index: i, time: res.time, hospital: res.hospital, hospitalId: res.hospitalId, interval: res.interval })} className={`${timeIndex.m && timeIndex.index === i ? ' bg-green-500 text-white ' : 'border text-brand-biscay '} disabled:opacity-50 ${res.isBooked && ' cursor-not-allowed '} py-1 w-24 mr-1 my-1  rounded text-base font-medium`} >
                                            {res.time}</button>
                                    )
                                }
                            })}
                        </div> : ""}
                        {open === 2 ? <div className="text-left w-full ml-3">
                            {timeSlots?.afternoon?.filter(x => x.hospitalId === hospitalId).map((res, i) => {
                                if ((res.inPerson === "Y" && appointmentType === "I") || (res.video === "Y" && appointmentType === "V")) {
                                    return (
                                        <button key={i} type="button" disabled={res.isBooked} onClick={() => selectTimeIndex({ a: true, index: i, time: res.time, hospital: res.hospital, hospitalId: res.hospitalId, interval: res.interval })} className={`${timeIndex.a && timeIndex.index === i ? ' bg-green-500 text-white ' : 'border text-brand-biscay '} disabled:opacity-50 ${res.isBooked && ' cursor-not-allowed '} py-1 w-24 mr-1 my-1  rounded text-base font-medium`} >
                                            {res.time}</button>
                                    )
                                }
                            })}
                        </div> : ""}
                        {open === 3 ? <div className="text-left w-full ml-3">
                            {timeSlots?.evening?.filter(x => x.hospitalId === hospitalId).map((res, i) => {
                                if ((res.inPerson === "Y" && appointmentType === "I") || (res.video === "Y" && appointmentType === "V")) {
                                    return (
                                        <button key={i} type="button" disabled={res.isBooked} onClick={() => selectTimeIndex({ e: true, index: i, time: res.time, hospital: res.hospital, hospitalId: res.hospitalId, interval: res.interval })} className={`${timeIndex.e && timeIndex.index === i ? ' bg-green-500 text-white ' : 'border text-brand-biscay '} disabled:opacity-50 ${res.isBooked && ' cursor-not-allowed '} py-1 w-24 mr-1 my-1  rounded text-base font-medium`} >
                                            {res.time}</button>
                                    )
                                }
                            })}
                        </div> : ""}
                    </div>
                    <div className="text-right pb-4">
                        <button disabled={!timeIndex.time} onClick={goToPayment} className={`disabled:opacity-50 ${!timeIndex.time && ' cursor-not-allowed '} bg-brand-secondary text-white px-5 py-3 text-sm  font-medium rounded-xl`}><b>Proceed to Payment</b></button>
                    </div>
                </>
                :
                hideModal ?
                    <div className="justify-center mb-4 items-center bg-gray-600 opacity-80 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl ">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="rounded-lg shadow-lg bg-white-600 w-full h-112 p-5 antialiased justify-between border border-gray-200">
                                    <div className="flex justify-between">
                                        <h1 className="text-medium font-medium text-2xl text-blue-900 ">No slots available</h1>
                                        <XIcon onClick={() => setHideModal(false)} className="h-5 cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : <div className="mb-4"></div>
            }
        </div>
    )
}
export default DoctorSlots;
