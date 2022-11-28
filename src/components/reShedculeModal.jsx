import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { APP_ROUTES } from '../application/Router/constants/AppRoutes';
import { useEffect } from 'react';
import moment from 'moment';
import arroww from '../Assets/Images/arrowdown.svg';
import { XIcon } from '@heroicons/react/outline'
import lodash from 'lodash';
import { data } from 'autoprefixer';
import { getDoctorsslots, getParticularDoctors, getDoctorsAppointment, updateDoctorAppointment, removeSuccess } from '../Redux/Actions/doctorAction';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Dialog } from "primereact/dialog";
function RescheduleModal(props) {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { data } = props;
    const { errMsg, isError, success } = useSelector(state => state.doctorAppointment);
    const { slotData } = useSelector(state => state.doctorsslot);
    const doctorsAppointment = useSelector((state) => state.doctorAppointmentList);
    const { doctorappointmentList } = doctorsAppointment;
    const [starDoctor, setIsStarDoctor] = useState(null)
    const userData = useSelector((state) => state.authReducer.patientData);
    console.log(data, "sdivsoiduvbsduohsud");
    const [currentDate, setCurrentDate] = useState(moment());
    const [days, setDays] = useState([]);
    const [timeSlots, setTimeSlots] = useState({});
    const [sortedSlots, setSortedSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState();
    const [slot, setSelectedSlot] = useState({});
    const [isShow, setShowTimeSlots] = useState(false);
    const [timeIndex, selectTimeIndex] = useState({})
    const [appointmentType, setAppointmentType] = useState("V");
    const [hideModal, setHideModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        dispatch(getParticularDoctors(data.userId)).then(res =>{
            if((res?.starDoctor == "1" || res?.starDoctor == 1)){
                setIsStarDoctor(res.starDoctor);
                setCurrentDate(moment().add(1 , "days"))
            sortSlots(moment().add(1 , "days").format("MM/DD/yyyy"), moment().add(1 , "days").format("MM/DD/yyyy"))
                 setSelectedDate(moment().add(1 , "days").format("MM/DD/yyyy"))
                dispatch(getDoctorsslots(data.userId, moment().add(1 , "days").format("MM/DD/yyyy"), moment().add(1 , "days").format("MM/DD/yyyy")))
            } else{
                setCurrentDate(moment());
            sortSlots(moment().format("MM/DD/yyyy"), moment().format("MM/DD/yyyy"))

                 setSelectedDate(moment().format("MM/DD/yyyy"))
                dispatch(getDoctorsslots(data.userId, moment().format("MM/DD/yyyy"), moment().format("MM/DD/yyyy")))
            }
        })
        dispatch(getDoctorsAppointment(data.doctid))
    }, [dispatch, data?.userId]);

    const getDays = () => {
        let days = [];
        let daysRequired = 7
        for (let i = 0; i < daysRequired; i++) {
            days.push({
                vis: moment(currentDate).add(i, 'days').format('ddd,DD'),
                date: moment(currentDate).add(i, 'days').format('MM/DD/yyyy'),
            })
        }
        setDays(days);
    }


    const updateAppointemnt = () => {
        setLoading(true);
        setUpdate(false);
        let obj = data;
        obj.whenAppointment = selectedDate;
        obj.fromTime = moment(timeIndex.time, ["h:mm A"]).format('HH:mm');
        obj.createdBy = obj.patientId
        obj.patientMobileNo = userData.mobile
        obj.email = userData.email
        obj.modifiedBy = obj.patientId
        obj.toTime = moment(timeIndex.time, ["h:mm A"]).add(slot.consultationDuration, 'minutes').format('HH:mm');
        console.log(obj,  "djsnojbcjdcjf")
        dispatch(updateDoctorAppointment(obj)).then(res =>{
            if(res == 1){
                // props.onClose();
                setUpdate(true);
                setLoading(false);
            }
        }).catch(res =>{
            setLoading(false);
            setUpdate(false)
        })
    }



    const divideTimeSlot = (selectSlot, selectDate) => {
        if (selectSlot.length > 0) {
            var m_Stops = [];
            var a_Stops = [];
            var e_Stops = [];
            for (var i in selectSlot) {
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
                        let checkIsAppointed = doctorappointmentList.find((x => {
                            return (moment(x.whenAppointment, 'MM/DD/yyyy').isSame(selectDate) && moment(x.fromTime, 'hh:mm').isSame(startTime));
                        }));
                        console.log("checkIsAppointed", checkIsAppointed)
                        if (startTime < moment("12: 00", 'hh:mm A')) {
                            m_Stops.push({ time: new moment(startTime).format('hh:mm A'), isBooked: checkIsAppointed ? true : false, hospital: selectSlot[i].hospitalName, hospitalId: selectSlot[i].hospitalId, inPerson: selectSlot[i].inPerson, video: selectSlot[i].video });
                            startTime.add(interval, 'minutes');
                        }
                        if (startTime >= moment("12: 00", 'hh:mm A') && startTime < moment("17: 00", 'hh:mm A')) {
                            a_Stops.push({ time: new moment(startTime).format('hh:mm A'), isBooked: checkIsAppointed ? true : false, hospital: selectSlot[i].hospitalName, hospitalId: selectSlot[i].hospitalId, inPerson: selectSlot[i].inPerson, video: selectSlot[i].video });
                            startTime.add(interval, 'minutes');
                        }
                        if (startTime >= moment("17: 00", 'hh:mm A')) {
                            e_Stops.push({ time: new moment(startTime).format('hh:mm A'), isBooked: checkIsAppointed ? true : false, hospital: selectSlot[i].hospitalName, hospitalId: selectSlot[i].hospitalId, inPerson: selectSlot[i].inPerson, video: selectSlot[i].video });
                            startTime.add(interval, 'minutes');
                        }
                    }
                }
            }

            let mSlots = lodash.uniqBy(m_Stops, 'time').sort((a, b) => moment(a.time) - moment(b.time));
            let aSlots = lodash.uniqBy(a_Stops, 'time');
            let eSlots = lodash.uniqBy(e_Stops, 'time');
            setTimeSlots({ "morning": mSlots, "afternoon": aSlots, "evening": eSlots })
        }
        else {
            setShowTimeSlots(false);
            setHideModal(true);
        }
    }

    const sortSlots = (to, from) => {

        dispatch(getDoctorsslots(data.userId, to, from)).then(res =>{
            if(res){
                let sortData = res?.sort((a, b) => moment(b.modifiedDate) - moment(a.modifiedDate));
                setSortedSlots(sortData);
            }
        })
        // var sortData = slotData?.sort((a, b) => moment(b.modifiedDate) - moment(a.modifiedDate));
        // setSortedSlots(sortData);
    }

    // useEffect(() => {
    //     sortSlots();
    // }, [slotData.length])
    const changeWeek = (val) => {
        setShowTimeSlots(false);
        setHideModal(false);
        setSelectedDate('');
        if (val === 'forward') {
            var newDate = moment(days[6].date).add(1, 'days');
            setCurrentDate(newDate);
        }
        if (val === 'backward') {
            var newDate = moment(days[0].date).subtract(7, 'days');
            setCurrentDate(newDate);
        }
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
                // return
            } else {
                setSelectedSlot({});
                setShowTimeSlots(false)
                setHideModal(true);
            }
        }
        divideTimeSlot(arr, date)
    }


    const onClose = () => {
        props.onClose();
        dispatch(removeSuccess())
    }

    useEffect(() => {
        if((starDoctor == "1" || starDoctor == 1)){
            if(sortedSlots && selectedDate){
                getselectedSlot(selectedDate);
            }
            
        } else{
            if(sortedSlots && selectedDate){
                getselectedSlot(selectedDate);
            }
        }
    }, [sortedSlots, doctorappointmentList])

    const onDateChange = (date) =>{
        sortSlots(date , date)
    }

    // if (!sortedSlots.length) {
    //     return (
    //         <p>Loading</p>
    //     )
    // }
    console.log("sortedSlots", data)
    return (
        <Dialog
          visible={true}
          modal={false}
          onHide={() => onClose()}
        >
            <div className="m-4 p-4 rounded-lg bg-white w-full" >
                <div className="justify-between flex">
                    <p className=" font-medium">Select a Slot to Reschedule an Appointment - {data.userName}</p>
                    {/* <XIcon onClick={onClose} className=" cursor-pointer font-medium w-8" /> */}
                </div>

                <div className="my-6 flex flex-wrap pb-4 ">
                    <button onClick={() => changeWeek('backward')} disabled={days[0]?.date === (starDoctor == "1" || starDoctor == 1) ? moment().add(1 , "days").format('MM/DD/yyyy') : moment().format('MM/DD/yyyy')} type="button" className="disabled:opacity-50 border rounded-lg w-20 h-12 mr-3" >
                        <i className="pt-1 fa fa-angle-left" aria-hidden="true" style={{ fontSize: '32px' }}></i>
                    </button>
                    {days.map((res, i) => (
                        <button onClick={() => { getselectedSlot(res.date, i); onDateChange(res.date) }} key={i} type="button" className={`${selectedDate === res.date ? 'bg-green-500' : 'border border-brand-biscay2'} rounded-lg border w-28 h-12 mx-3`} >
                            <p className={` ${selectedDate !== res.date ? 'text-brand-biscay2' : 'text-white'}  pt-1 font-medium  text-sm`} >{res?.date === moment().format('MM/DD/yyyy') ? 'Today' : res?.vis.split(',')[0]}</p>
                            <p className={` ${selectedDate !== res.date ? 'text-brand-biscay2' : 'text-white'} font-medium text-sm  pb-2`}>{moment(res?.date, 'MM/DD/yyyy').format('DD,MMM,yyyy')}</p>
                        </button>
                    ))}
                    <button onClick={() => changeWeek('forward')} type="button" className="rounded-lg border w-20 h-12 ml-3" >
                        <i className="pt-1 fa fa-angle-right" aria-hidden="true" style={{ fontSize: '32px' }}></i>
                    </button>
                </div>
                {isShow ?
                    <>
                        <div className="my-6 flex flex-wrap  justify-around px-10  pb-4">
                            <div className="text-left w-full md:w-3/12">
                                {timeSlots?.morning?.length > 0 && <p className="text-left text-brand-primary">Morning - {timeIndex.m && timeIndex.hospital}</p>}
                                {timeSlots?.morning?.map((res, i) => {
                                    if (((res.inPerson === "Y" && appointmentType === "I") || (res.video === "Y" && appointmentType === "V")) && data.hospitalId === res.hospitalId) {
                                        return (
                                            <button key={i} type="button" disabled={res.isBooked||  moment(
                                                `${selectedDate} ${res.time}`,
                                                "MM/DD/yyyy hh:mm A"
                                              ).isBefore(moment())}  onClick={() => selectTimeIndex({ m: true, index: i, time: res.time, hospital: res.hospital, hospitalId: res.hospitalId })} className={`${timeIndex.m && timeIndex.index === i ? ' bg-green-500 text-white ' : 'border text-brand-biscay '} disabled:opacity-50 ${res.isBooked && ' cursor-not-allowed '} p-1 m-1  rounded text-xs font-medium`} >
                                                {res.time}</button>
                                        )
                                    }
                                })}
                            </div>
                            <div className="text-left w-full md:w-3/12">
                                {timeSlots?.afternoon?.length > 0 && <p className="text-left text-brand-primary" >Afternoon - {timeIndex.a && timeIndex.hospital}</p>}

                                {timeSlots?.afternoon?.map((res, i) => {
                                    if (((res.inPerson === "Y" && appointmentType === "I") || (res.video === "Y" && appointmentType === "V")) && data.hospitalId === res.hospitalId) {
                                        return (
                                            <button key={i} type="button" disabled={res.isBooked ||  moment(
                                                `${selectedDate} ${res.time}`,
                                                "MM/DD/yyyy hh:mm A"
                                              ).isBefore(moment())} onClick={() => selectTimeIndex({ a: true, index: i, time: res.time, hospital: res.hospital, hospitalId: res.hospitalId })} className={`${timeIndex.a && timeIndex.index === i ? ' bg-green-500 text-white ' : 'border text-brand-biscay '} disabled:opacity-50 ${res.isBooked && ' cursor-not-allowed '} p-1 m-1  rounded text-xs font-medium`} >
                                                {res.time}</button>
                                        )
                                    }
                                })}
                            </div>
                            <div className="text-left w-full md:w-3/12">
                                {timeSlots?.evening?.length > 0 && <p className="text-left text-brand-primary" >Evening - {timeIndex.e && timeIndex.hospital}</p>}
                                {timeSlots?.evening?.map((res, i) => {
                                    if (((res.inPerson === "Y" && appointmentType === "I") || (res.video === "Y" && appointmentType === "V")) && data.hospitalId === res.hospitalId) {
                                        return (
                                            <button key={i} type="button" disabled={res.isBooked ||  moment(
                                                `${selectedDate} ${res.time}`,
                                                "MM/DD/yyyy hh:mm A"
                                              ).isBefore(moment())} onClick={() => selectTimeIndex({ e: true, index: i, time: res.time, hospital: res.hospital, hospitalId: res.hospitalId })} className={`${timeIndex.e && timeIndex.index === i ? ' bg-green-500 text-white ' : 'border text-brand-biscay '} disabled:opacity-50 ${res.isBooked && ' cursor-not-allowed '} p-1 m-1  rounded text-xs font-medium`} >
                                                {res.time}</button>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                        {update && <p className="text-green-600">Your appointment has been successsfully updated.</p>}
                        {isError && <p className="text-red-600">{errMsg}</p>}
                        <div className="text-right pb-4">
                            <Button disabled={!timeIndex.time} loading = {loading} onClick={updateAppointemnt} className={`disabled:opacity-50 ${!timeIndex.time && ' cursor-not-allowed '} bg-brand-secondary text-white px-5 py-3 text-sm  font-medium rounded-xl`}><b>Update</b></Button>
                            
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
        </Dialog>

    )
}
export default RescheduleModal;